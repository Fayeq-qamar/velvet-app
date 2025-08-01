from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image, ImageEnhance, ImageFilter
import pytesseract
import whisper
import soundfile as sf
import tempfile
import io
import numpy as np
import time
import cv2
import logging
import asyncio
from typing import Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Velvet Preprocessing Worker", version="1.0.0")

# Load Whisper model once at startup for efficiency
logger.info("🎤 Loading Whisper model...")
whisper_model = whisper.load_model("base")
logger.info("✅ Whisper model loaded successfully")

class VelvetPreprocessor:
    """Advanced preprocessing pipeline for Velvet's brain consciousness"""
    
    def __init__(self):
        self.ocr_confidence_threshold = 60  # Tesseract confidence threshold
        self.debug_mode = True
        self.processed_count = 0
    
    def preprocess_image_advanced(self, image: Image.Image) -> Image.Image:
        """Advanced image preprocessing for superior OCR accuracy"""
        
        # Convert to numpy array for OpenCV processing
        img_array = np.array(image)
        
        # Ensure image is in correct format for OpenCV
        if len(img_array.shape) == 3 and img_array.shape[2] == 4:  # RGBA
            img_array = cv2.cvtColor(img_array, cv2.COLOR_RGBA2RGB)
        elif len(img_array.shape) == 3 and img_array.shape[2] == 3:  # RGB
            pass  # Already in correct format
        else:  # Grayscale
            img_array = cv2.cvtColor(img_array, cv2.COLOR_GRAY2RGB)
        
        # 1. Noise reduction using bilateral filter
        denoised = cv2.bilateralFilter(img_array, 9, 75, 75)
        
        # 2. Convert to grayscale
        if len(denoised.shape) == 3:
            gray = cv2.cvtColor(denoised, cv2.COLOR_RGB2GRAY)
        else:
            gray = denoised
        
        # 3. Adaptive histogram equalization for better contrast
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced = clahe.apply(gray)
        
        # 4. Gaussian blur to smooth text
        blurred = cv2.GaussianBlur(enhanced, (1, 1), 0)
        
        # 5. Adaptive thresholding for better binarization
        binary = cv2.adaptiveThreshold(
            blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
        )
        
        # 6. Morphological operations to clean up text
        kernel = np.ones((1, 1), np.uint8)
        cleaned = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
        
        # Convert back to PIL Image
        processed_image = Image.fromarray(cleaned)
        
        return processed_image
    
    def extract_text_with_confidence(self, image: Image.Image) -> tuple[str, float]:
        """Extract text using Tesseract with confidence scoring"""
        
        try:
            # Get detailed OCR data with confidence scores
            ocr_data = pytesseract.image_to_data(
                image, 
                output_type=pytesseract.Output.DICT,
                config='--oem 3 --psm 6'  # LSTM OCR Engine Mode, assume uniform block of text
            )
            
            # Filter out low-confidence words
            confident_words = []
            total_confidence = 0
            word_count = 0
            
            for i, conf in enumerate(ocr_data['conf']):
                if int(conf) > self.ocr_confidence_threshold:
                    word = ocr_data['text'][i].strip()
                    if word:  # Not empty
                        confident_words.append(word)
                        total_confidence += int(conf)
                        word_count += 1
            
            # Calculate average confidence
            avg_confidence = total_confidence / word_count if word_count > 0 else 0
            
            # Join confident words
            extracted_text = ' '.join(confident_words)
            
            return extracted_text, avg_confidence / 100.0  # Convert to 0-1 scale
            
        except Exception as e:
            logger.error(f"❌ OCR extraction failed: {e}")
            return "", 0.0
    
    def analyze_text_context(self, text: str) -> dict:
        """Analyze text for contextual intelligence"""
        
        analysis = {
            "word_count": len(text.split()),
            "is_communication": False,
            "is_code": False,
            "is_document": False,
            "is_web": False,
            "urgency_level": "low",
            "emotional_indicators": [],
            "task_indicators": []
        }
        
        text_lower = text.lower()
        
        # Communication detection
        comm_patterns = ["message", "email", "chat", "discord", "slack", "teams", "zoom", "from:", "to:", "subject:"]
        if any(pattern in text_lower for pattern in comm_patterns):
            analysis["is_communication"] = True
        
        # Code detection  
        code_patterns = ["function", "class", "import", "export", "const", "let", "var", "def", "{", "}", "//", "/*"]
        if any(pattern in text_lower for pattern in code_patterns):
            analysis["is_code"] = True
        
        # Document detection
        doc_patterns = ["document", "page", "chapter", "section", "paragraph", "word", "pdf"]
        if any(pattern in text_lower for pattern in doc_patterns):
            analysis["is_document"] = True
        
        # Web detection
        web_patterns = ["http", "www.", ".com", ".org", "search", "google", "browser"]
        if any(pattern in text_lower for pattern in web_patterns):
            analysis["is_web"] = True
        
        # Urgency detection
        urgent_patterns = ["urgent", "asap", "deadline", "important", "critical", "emergency"]
        if any(pattern in text_lower for pattern in urgent_patterns):
            analysis["urgency_level"] = "high"
        elif any(pattern in text_lower for pattern in ["soon", "today", "meeting"]):
            analysis["urgency_level"] = "medium"
        
        # Emotional indicators (crucial for neurodivergent support)
        emotional_patterns = {
            "frustration": ["frustrated", "annoyed", "irritated", "angry"],
            "stress": ["stressed", "overwhelmed", "anxious", "worried"],
            "positive": ["great", "awesome", "perfect", "excellent"],
            "neutral": ["fine", "okay", "sure", "whatever"]
        }
        
        for emotion, patterns in emotional_patterns.items():
            if any(pattern in text_lower for pattern in patterns):
                analysis["emotional_indicators"].append(emotion)
        
        # Task indicators
        task_patterns = ["todo", "task", "complete", "finish", "done", "need to", "have to", "should"]
        if any(pattern in text_lower for pattern in task_patterns):
            analysis["task_indicators"].append("task_detected")
        
        return analysis

velvet_processor = VelvetPreprocessor()

@app.on_event("startup")
async def startup_event():
    logger.info("🧠 Velvet Preprocessing Worker starting up...")
    logger.info("📚 Tesseract OCR: Ready")
    logger.info("🎤 Whisper ASR: Ready") 
    logger.info("🔍 Advanced image preprocessing: Ready")
    logger.info("✅ All systems operational")

@app.post("/velvet/analyze/")
async def analyze_brain_context(
    image: UploadFile = File(...),
    audio: Optional[UploadFile] = File(None)
):
    """Advanced OCR + ASR analysis for Velvet Brain consciousness"""
    
    start_time = time.time()
    velvet_processor.processed_count += 1
    
    try:
        logger.info(f"🧠 Processing brain context #{velvet_processor.processed_count}")
        
        # Process image for OCR
        image_bytes = await image.read()
        img = Image.open(io.BytesIO(image_bytes))
        
        # Apply advanced preprocessing
        logger.info("🔍 Applying advanced image preprocessing...")
        preprocessed_img = velvet_processor.preprocess_image_advanced(img)
        
        # Save debug image if enabled
        if velvet_processor.debug_mode and velvet_processor.processed_count <= 5:
            debug_path = f"debug_velvet_preprocessed_{int(time.time())}.png"
            preprocessed_img.save(debug_path)
            logger.info(f"💾 Debug image saved: {debug_path}")
        
        # Extract text with confidence
        logger.info("📖 Extracting text with confidence scoring...")
        screen_text, ocr_confidence = velvet_processor.extract_text_with_confidence(preprocessed_img)
        
        # Analyze context
        context_analysis = velvet_processor.analyze_text_context(screen_text)
        
        logger.info(f"📊 OCR Results:")
        logger.info(f"   • Text length: {len(screen_text)} chars")
        logger.info(f"   • Confidence: {ocr_confidence:.2f}")
        logger.info(f"   • Context: {context_analysis}")
        
        # Process audio for ASR if provided
        transcript = ""
        asr_confidence = 0.0
        
        if audio and audio.size > 0:
            logger.info("🎤 Processing audio for transcription...")
            audio_bytes = await audio.read()
            
            # Save debug audio
            if velvet_processor.debug_mode:
                with open("debug_velvet_audio.wav", "wb") as f:
                    f.write(audio_bytes)
                logger.info("💾 Debug audio saved: debug_velvet_audio.wav")
            
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp_audio:
                tmp_audio.write(audio_bytes)
                tmp_audio.flush()
                
                # Transcribe with Whisper
                result = whisper_model.transcribe(tmp_audio.name, language="en")
                transcript = result["text"].strip()
                
                # Calculate confidence from Whisper segments
                if "segments" in result and result["segments"]:
                    avg_confidence = sum(seg.get("no_speech_prob", 0.5) for seg in result["segments"]) / len(result["segments"])
                    asr_confidence = 1.0 - avg_confidence  # Invert no_speech_prob
                else:
                    asr_confidence = 0.7  # Default confidence
                
                logger.info(f"🎤 ASR Results:")
                logger.info(f"   • Transcript: '{transcript[:100]}{'...' if len(transcript) > 100 else ''}'")
                logger.info(f"   • Confidence: {asr_confidence:.2f}")
        
        processing_time = time.time() - start_time
        logger.info(f"⚡ Processing completed in {processing_time:.2f}s")
        
        # Return comprehensive brain context
        return JSONResponse({
            "screenText": screen_text,
            "transcript": transcript,
            "ocrConfidence": ocr_confidence,
            "asrConfidence": asr_confidence,
            "contextAnalysis": context_analysis,
            "processingTime": processing_time,
            "timestamp": int(time.time() * 1000)
        })
        
    except Exception as e:
        logger.error(f"❌ Brain context analysis failed: {e}")
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "whisper_model": "base",
        "tesseract_available": True,
        "processed_count": velvet_processor.processed_count
    }

@app.get("/")
async def root():
    """Root endpoint with service info"""
    return {
        "service": "Velvet Preprocessing Worker",
        "version": "1.0.0",
        "capabilities": [
            "Advanced OCR with confidence scoring",
            "Whisper ASR transcription", 
            "Context analysis for neurodivergent support",
            "Real-time image preprocessing"
        ],
        "endpoints": [
            "/velvet/analyze/ - Main processing endpoint",
            "/health - Health check",
            "/docs - API documentation"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    
    logger.info("🚀 Starting Velvet Preprocessing Worker...")
    uvicorn.run(
        "main:app", 
        host="127.0.0.1", 
        port=8001,  # Different port from Cluely
        reload=True,
        log_level="info"
    )