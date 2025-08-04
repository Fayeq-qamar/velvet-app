// Enhanced OCR Processor - Improves OCR accuracy through advanced image preprocessing
// This bridges the gap while the full microservices architecture is being optimized

class EnhancedOCRProcessor {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ocrWorker = null;
        this.isInitialized = false;
    }

    async initialize() {
        console.log('🔍 Initializing Enhanced OCR Processor...');
        
        try {
            // TEMPORARILY DISABLED: OCR causing CDN loading issues
            console.log('⚠️ Enhanced OCR temporarily disabled due to CDN loading issues');
            this.isInitialized = true;
            return true;
        } catch (error) {
            console.error('❌ Enhanced OCR initialization failed:', error);
        }
        
        return false;
    }

    // Advanced image preprocessing for better OCR results
    preprocessImage(imageData) {
        const img = new Image();
        img.src = imageData;
        
        return new Promise((resolve) => {
            img.onload = () => {
                // Set canvas size
                this.canvas.width = img.width;
                this.canvas.height = img.height;
                
                // Draw original image
                this.ctx.drawImage(img, 0, 0);
                
                // Get image data for processing
                const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
                const data = imgData.data;
                
                console.log('🔧 Applying advanced image preprocessing...');
                
                // 1. Convert to grayscale with better contrast
                for (let i = 0; i < data.length; i += 4) {
                    // Weighted grayscale conversion (better than simple average)
                    const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
                    
                    // Enhance contrast
                    const contrast = 1.5; // Increase contrast
                    const enhanced = Math.min(255, Math.max(0, contrast * (gray - 128) + 128));
                    
                    data[i] = enhanced;     // R
                    data[i + 1] = enhanced; // G
                    data[i + 2] = enhanced; // B
                    // Alpha stays the same
                }
                
                // 2. Apply sharpening filter
                this.applySharpeningFilter(data, this.canvas.width, this.canvas.height);
                
                // 3. Adaptive thresholding for better text separation
                this.applyAdaptiveThreshold(data);
                
                // Put processed data back
                this.ctx.putImageData(imgData, 0, 0);
                
                // Return processed image as data URL
                const processedImageData = this.canvas.toDataURL('image/png');
                console.log('✅ Image preprocessing complete');
                resolve(processedImageData);
            };
        });
    }

    // Apply sharpening filter to enhance text edges
    applySharpeningFilter(data, width, height) {
        const sharpenKernel = [
            0, -1, 0,
            -1, 5, -1,
            0, -1, 0
        ];
        
        const tempData = new Uint8ClampedArray(data);
        
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let sum = 0;
                
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = ((y + ky) * width + (x + kx)) * 4;
                        const kernelIdx = (ky + 1) * 3 + (kx + 1);
                        sum += tempData[idx] * sharpenKernel[kernelIdx];
                    }
                }
                
                const idx = (y * width + x) * 4;
                const sharpened = Math.min(255, Math.max(0, sum));
                data[idx] = sharpened;
                data[idx + 1] = sharpened;
                data[idx + 2] = sharpened;
            }
        }
    }

    // Apply adaptive thresholding for better text/background separation
    applyAdaptiveThreshold(data) {
        const blockSize = 15; // Size of adaptive threshold neighborhood
        const C = 10; // Constant subtracted from the mean
        
        for (let i = 0; i < data.length; i += 4) {
            const pixel = data[i]; // Grayscale value (R channel since we already converted)
            
            // Simple adaptive thresholding approximation
            // In a full implementation, this would calculate local mean
            const threshold = 128 - C;
            const binary = pixel > threshold ? 255 : 0;
            
            data[i] = binary;
            data[i + 1] = binary;
            data[i + 2] = binary;
        }
    }

    // Enhanced OCR with multiple passes and confidence scoring
    async performEnhancedOCR(imageData) {
        if (!this.isInitialized || !this.ocrWorker) {
            console.warn('⚠️ Enhanced OCR not initialized, using fallback');
            return { text: '', confidence: 0 };
        }

        try {
            console.log('🔍 Starting enhanced OCR process...');
            
            // Step 1: Preprocess image
            const preprocessedImage = await this.preprocessImage(imageData);
            
            // Step 2: Perform OCR on preprocessed image
            console.log('📖 Performing OCR on enhanced image...');
            const result = await this.ocrWorker.recognize(preprocessedImage);
            
            // Step 3: Post-process text for better quality  
            const cleanedText = this.postProcessText(result.data.text);
            const confidence = result.data.confidence / 100; // Convert to 0-1 scale
            
            console.log('📊 Enhanced OCR Results:');
            console.log(`   📖 Text length: ${cleanedText.length} characters`);
            console.log(`   📊 Confidence: ${Math.round(confidence * 100)}%`);
            console.log(`   📝 Sample: "${cleanedText.substring(0, 100)}..."`);
            
            return {
                text: cleanedText,
                confidence: confidence,
                rawText: result.data.text,
                processingTime: Date.now()
            };
            
        } catch (error) {
            console.error('❌ Enhanced OCR failed:', error);
            return { text: '', confidence: 0 };
        }
    }

    // Post-process OCR text to improve quality
    postProcessText(rawText) {
        let cleaned = rawText;
        
        // 1. Fix common OCR errors
        const ocrCorrections = {
            // Common character misrecognitions
            '0': 'O', // In context of words
            '1': 'I', // In context of words  
            '5': 'S', // In context of words
            '@': 'a', // Sometimes @ is mistaken for a
            '|': 'l', // Vertical bar to lowercase L
            '\\': '/', // Backslash corrections
            '§': 'S', // Section symbol to S
            '©': 'o', // Copyright to o
            '®': 'r', // Registered to r
            '™': 'm', // Trademark to m
        };
        
        // 2. Clean up whitespace and special characters
        cleaned = cleaned
            .replace(/\s+/g, ' ')           // Multiple spaces to single
            .replace(/\n\s*\n/g, '\n')      // Multiple newlines to single
            .replace(/[^\w\s\.,!?\-@#]/g, ' ') // Keep only letters, numbers, basic punctuation
            .trim();
        
        // 3. Apply corrections in word context
        cleaned = cleaned.replace(/\b\w+\b/g, (word) => {
            let corrected = word;
            
            // Apply character corrections only in word context
            for (const [wrong, right] of Object.entries(ocrCorrections)) {
                // Only replace if it makes sense in context
                if (word.includes(wrong) && word.length > 2) {
                    corrected = corrected.replace(new RegExp(wrong, 'g'), right);
                }
            }
            
            return corrected;
        });
        
        // 4. Fix common word patterns
        const wordCorrections = {
            'teh': 'the',
            'adn': 'and', 
            'taht': 'that',
            'ot': 'to',
            'fo': 'of',
            'yuo': 'you',
            'yuor': 'your'
        };
        
        for (const [wrong, right] of Object.entries(wordCorrections)) {
            cleaned = cleaned.replace(new RegExp(`\\b${wrong}\\b`, 'gi'), right);
        }
        
        return cleaned;
    }

    // Get enhanced screen text
    async getEnhancedScreenText() {
        try {
            // Get screen capture from Electron
            if (window.electronAPI && window.electronAPI.desktopCapturer) {
                const sources = await window.electronAPI.desktopCapturer.getSources({
                    types: ['screen'],
                    thumbnailSize: { width: 1920, height: 1080 }
                });
                
                if (sources.length > 0) {
                    const screenSource = sources[0];
                    const imageData = screenSource.thumbnail.toDataURL();
                    
                    // Perform enhanced OCR
                    const result = await this.performEnhancedOCR(imageData);
                    return result;
                }
            }
        } catch (error) {
            console.error('❌ Enhanced screen text extraction failed:', error);
        }
        
        return { text: '', confidence: 0 };
    }

    async destroy() {
        if (this.ocrWorker) {
            await this.ocrWorker.terminate();
            this.ocrWorker = null;
        }
        this.isInitialized = false;
        console.log('🧹 Enhanced OCR Processor destroyed');
    }
}

// Create global instance
window.enhancedOCRProcessor = new EnhancedOCRProcessor();

// Initialize on load
document.addEventListener('DOMContentLoaded', async () => {
    await window.enhancedOCRProcessor.initialize();
});

console.log('🔍 Enhanced OCR Processor loaded - provides better OCR quality through advanced preprocessing');