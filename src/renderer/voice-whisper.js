// Velvet Voice with ElevenLabs Integration - Secure Version

class VelvetVoiceElevenLabs {
    constructor() {
        this.isListening = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.stream = null;
        this.isSpeaking = false;
    }

    async startListening() {
        try {
            // Get microphone access
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log('Microphone access granted');
            
            // Create MediaRecorder
            this.mediaRecorder = new MediaRecorder(this.stream, {
                mimeType: 'audio/webm'
            });
            
            this.audioChunks = [];
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };
            
            this.mediaRecorder.onstop = async () => {
                console.log('Recording stopped, processing...');
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                await this.transcribeAudio(audioBlob);
            };
            
            // Start recording
            this.mediaRecorder.start();
            this.isListening = true;
            console.log('Started recording audio...');
            
            // Auto-stop after 10 seconds
            setTimeout(() => {
                if (this.isListening) {
                    this.stopListening();
                }
            }, 10000);
            
            return true;
        } catch (error) {
            console.error('Error starting recording:', error);
            return false;
        }
    }

    stopListening() {
        if (this.mediaRecorder && this.isListening) {
            this.isListening = false;
            this.mediaRecorder.stop();
            
            // Stop all tracks
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
            }
            
            console.log('Stopped recording');
        }
    }

    async transcribeAudio(audioBlob) {
        try {
            console.log('Sending audio to Whisper...');
            
            // Convert blob to base64
            const base64Audio = await this.blobToBase64(audioBlob);
            
            // Send to main process for Whisper transcription via secure IPC
            const transcript = await window.electronAPI.transcribeAudio(base64Audio);
            
            if (transcript) {
                console.log('Transcript:', transcript);
                this.onTranscript(transcript);
            }
        } catch (error) {
            console.error('Transcription error:', error);
            this.onTranscript("I couldn't understand that. Could you try again?");
        }
    }

    async speak(text) {
        if (this.isSpeaking) {
            console.log('Already speaking, skipping...');
            return;
        }

        // Clean text for speech (remove emojis)
        let cleanText = text;
        cleanText = cleanText.replace(/[\u{1F000}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
        cleanText = cleanText.replace(/:[a-zA-Z0-9_]+:/g, '');
        cleanText = cleanText.replace(/\s+/g, ' ').trim();
        
        if (!cleanText) return Promise.resolve();
        
        try {
            this.isSpeaking = true;
            console.log('Generating speech with ElevenLabs:', cleanText);
            
            // Send to main process for ElevenLabs TTS via secure IPC
            const audioBase64 = await window.electronAPI.elevenLabsTTS(cleanText);
            
            if (audioBase64) {
                // Convert base64 to audio and play
                await this.playAudioFromBase64(audioBase64);
            }
            
        } catch (error) {
            console.error('Speech error:', error);
        } finally {
            this.isSpeaking = false;
            console.log('Finished speaking');
        }
    }

    async playAudioFromBase64(base64Audio) {
        return new Promise((resolve) => {
            // Convert base64 to blob
            const audioData = atob(base64Audio);
            const arrayBuffer = new ArrayBuffer(audioData.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            
            for (let i = 0; i < audioData.length; i++) {
                uint8Array[i] = audioData.charCodeAt(i);
            }
            
            const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(blob);
            
            const audio = new Audio(audioUrl);
            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
                resolve();
            };
            audio.onerror = () => {
                console.error('Audio playback error');
                resolve();
            };
            
            audio.play().catch(error => {
                console.error('Play error:', error);
                resolve();
            });
        });
    }

    blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    onTranscript(text) {
        console.log('Final transcript:', text);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = VelvetVoiceElevenLabs;
}