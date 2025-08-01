use tonic::{transport::Server, Request, Response, Status};
use velvet_capture::{BrainContextRequest, BrainContextUpdate, ScreenRequest, ScreenFrame, AudioRequest, AudioChunk};
use futures_core::Stream;
use tokio_stream::wrappers::ReceiverStream;
use tokio::sync::mpsc;
use std::pin::Pin;
use std::time::{SystemTime, UNIX_EPOCH};
use reqwest;
use serde_json;
use std::process::Command;
use std::fs;
use std::io;
use std::sync::{Arc, Mutex};

pub mod velvet_capture {
    tonic::include_proto!("velvet_capture");
}

use velvet_capture::velvet_capture_service_server::{VelvetCaptureService, VelvetCaptureServiceServer};

type ScreenStream = Pin<Box<dyn Stream<Item = Result<ScreenFrame, Status>> + Send>>;
type AudioStream = Pin<Box<dyn Stream<Item = Result<AudioChunk, Status>> + Send>>;
type BrainContextStream = Pin<Box<dyn Stream<Item = Result<BrainContextUpdate, Status>> + Send>>;

struct VelvetCaptureServiceImpl;

#[tonic::async_trait]
impl VelvetCaptureService for VelvetCaptureServiceImpl {
    type StreamScreenStream = ScreenStream;
    type StreamAudioStream = AudioStream;
    type StreamBrainContextStream = BrainContextStream;
    type StreamPatternsStream = Pin<Box<dyn Stream<Item = Result<velvet_capture::PatternDetection, Status>> + Send>>;

    async fn stream_screen(
        &self,
        _request: Request<ScreenRequest>,
    ) -> Result<Response<Self::StreamScreenStream>, Status> {
        let (tx, rx) = mpsc::channel(4);
        
        tokio::spawn(async move {
            println!("🎥 Starting screen capture stream...");
            
            loop {
                match capture_screen_to_png().await {
                    Ok(png_bytes) => {
                        let timestamp = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_millis() as i64;
                        let frame_msg = ScreenFrame {
                            data: png_bytes,
                            timestamp,
                            width: 1920, // Default, could be dynamic
                            height: 1080,
                        };
                        
                        if tx.send(Ok(frame_msg)).await.is_err() {
                            break;
                        }
                    }
                    Err(e) => {
                        eprintln!("❌ Screen capture failed: {}", e);
                    }
                }
                
                // 10 FPS
                tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;
            }
        });
        
        Ok(Response::new(Box::pin(ReceiverStream::new(rx)) as Self::StreamScreenStream))
    }

    async fn stream_audio(
        &self,
        _request: Request<AudioRequest>,
    ) -> Result<Response<Self::StreamAudioStream>, Status> {
        let (tx, rx) = mpsc::channel(8);
        
        tokio::spawn(async move {
            println!("🎤 Audio streaming not yet implemented");
            // TODO: Implement audio capture
        });

        Ok(Response::new(Box::pin(ReceiverStream::new(rx)) as Self::StreamAudioStream))
    }

    async fn stream_brain_context(
        &self,
        request: Request<BrainContextRequest>,
    ) -> Result<Response<Self::StreamBrainContextStream>, Status> {
        let req = request.into_inner();
        let confidence_threshold = req.confidence_threshold;
        
        let (tx, rx) = mpsc::channel(4);
        
        tokio::spawn(async move {
            println!("🧠 Starting unified brain context streaming...");
            
            loop {
                match capture_screen_to_png().await {
                    Ok(png_bytes) => {
                        // Send to preprocessing worker
                        match send_to_preproc_worker(png_bytes).await {
                            Ok((screen_text, _transcript, ocr_confidence)) => {
                                println!("🔍 RUST DEBUG: OCR Result - Text: '{}', Confidence: {}", 
                                    screen_text.chars().take(100).collect::<String>(), 
                                    ocr_confidence);
                                
                                if ocr_confidence >= confidence_threshold {
                                    let context_update = BrainContextUpdate {
                                        screen_text: screen_text.clone(),
                                        audio_transcript: String::new(), // TODO: Audio
                                        patterns: vec![],
                                        ocr_confidence,
                                        asr_confidence: 0.0,
                                        timestamp: SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_millis() as i64,
                                        metadata: Some(extract_metadata("unknown")),
                                    };
                                    
                                    println!("✅ RUST DEBUG: Sending brain context update to Electron - Text length: {}", screen_text.len());
                                    
                                    if tx.send(Ok(context_update)).await.is_err() {
                                        println!("❌ RUST DEBUG: Failed to send context update to stream");
                                        break;
                                    }
                                } else {
                                    println!("⚠️ RUST DEBUG: OCR confidence {} below threshold {}", ocr_confidence, confidence_threshold);
                                }
                            }
                            Err(e) => {
                                eprintln!("❌ Preprocessing failed: {}", e);
                            }
                        }
                    }
                    Err(e) => {
                        eprintln!("❌ Screen capture failed: {}", e);
                    }
                }
                
                tokio::time::sleep(tokio::time::Duration::from_millis(1000)).await;
            }
        });

        Ok(Response::new(Box::pin(ReceiverStream::new(rx))))
    }

    async fn stream_patterns(
        &self,
        _request: Request<velvet_capture::PatternRequest>,
    ) -> Result<Response<Self::StreamPatternsStream>, Status> {
        let (tx, rx) = mpsc::channel(4);
        
        tokio::spawn(async move {
            println!("🔍 Pattern detection streaming...");
            
            loop {
                tokio::time::sleep(tokio::time::Duration::from_secs(10)).await;
                
                let pattern = velvet_capture::PatternDetection {
                    pattern_type: "focus_session".to_string(),
                    confidence: 0.8,
                    description: "User focused session detected".to_string(),
                    timestamp: SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_millis() as i64,
                    evidence: vec!["Screen activity".to_string()],
                };
                
                if tx.send(Ok(pattern)).await.is_err() {
                    break;
                }
            }
        });

        Ok(Response::new(Box::pin(ReceiverStream::new(rx))))
    }
}

// Simple screen capture using macOS screencapture
async fn capture_screen_to_png() -> io::Result<Vec<u8>> {
    let tmp_path = "/tmp/velvet_screencap.png";
    
    let status = tokio::process::Command::new("screencapture")
        .arg("-x") // no UI
        .arg("-t")
        .arg("png")
        .arg(tmp_path)
        .status()
        .await?;
        
    if !status.success() {
        return Err(io::Error::new(io::ErrorKind::Other, "screencapture failed"));
    }
    
    let png_bytes = tokio::fs::read(tmp_path).await?;
    let _ = tokio::fs::remove_file(tmp_path).await;
    
    Ok(png_bytes)
}

// Send to preprocessing worker (simplified)
async fn send_to_preproc_worker(png_bytes: Vec<u8>) -> Result<(String, String, f32), Box<dyn std::error::Error + Send + Sync + 'static>> {
    let client = reqwest::Client::new();
    
    let form = reqwest::multipart::Form::new()
        .part("image", reqwest::multipart::Part::bytes(png_bytes)
            .file_name("frame.png")
            .mime_str("image/png")?);
    
    let resp = client
        .post("http://127.0.0.1:8001/velvet/analyze/")
        .multipart(form)
        .send()
        .await?;
    
    let json: serde_json::Value = resp.json().await?;
    
    let screen_text = json.get("screenText").and_then(|v| v.as_str()).unwrap_or("").to_string();
    let transcript = json.get("transcript").and_then(|v| v.as_str()).unwrap_or("").to_string();
    let confidence = json.get("ocrConfidence").and_then(|v| v.as_f64()).unwrap_or(0.0) as f32;
    
    Ok((screen_text, transcript, confidence))
}

// Extract context metadata
fn extract_metadata(_text: &str) -> velvet_capture::ContextMetadata {
    velvet_capture::ContextMetadata {
        active_app: "unknown".to_string(),
        active_window_title: "unknown".to_string(),
        word_count: 0,
        is_communication: false,
        is_code: false,
        is_document: false,
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "127.0.0.1:50051".parse()?;
    let service = VelvetCaptureServiceImpl;
    
    println!("🚀 Velvet Capture Service starting on {}", addr);
    println!("🎥 Screen capture ready");
    println!("🧠 Brain context streaming ready");
    
    Server::builder()
        .add_service(VelvetCaptureServiceServer::new(service))
        .serve(addr)
        .await?;
        
    Ok(())
}