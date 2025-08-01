// OPTIMIZED Enhanced OCR Processor v2 - Superior OCR accuracy with advanced preprocessing
// Fixes the garbled OCR output issues with multi-approach recognition and smart filtering

class OptimizedOCRProcessor {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ocrWorker = null;
        this.isInitialized = false;
        this.processingCount = 0;
    }

    async initialize() {
        console.log('🔍 Initializing OPTIMIZED OCR Processor v2...');
        
        try {
            // Initialize Tesseract with optimized settings
            if (typeof Tesseract !== 'undefined') {
                this.ocrWorker = await Tesseract.createWorker();
                await this.ocrWorker.loadLanguage('eng');
                await this.ocrWorker.initialize('eng');
                
                // OPTIMIZED configuration for superior accuracy
                await this.ocrWorker.setParameters({
                    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?@#$%^&*()_+-=[]{}|;:\'"<>?/~` \n\r\t',
                    tessedit_pageseg_mode: Tesseract.PSM.AUTO,
                    preserve_interword_spaces: '1',
                    tessedit_write_images: '0',  // Don't write debug images
                    user_defined_dpi: '150',     // Higher DPI for better recognition
                    tessedit_do_invert: '0'      // Don't invert images
                });
                
                console.log('✅ OPTIMIZED OCR initialized with superior parameters');
                this.isInitialized = true;
                return true;
            } else {
                console.error('❌ Tesseract.js not available');
                return false;
            }
        } catch (error) {
            console.error('❌ OPTIMIZED OCR initialization failed:', error);
            return false;
        }
    }

    // SUPERIOR image preprocessing for maximum OCR accuracy
    async preprocessImageSuperior(imageData) {
        const img = new Image();
        img.src = imageData;
        
        return new Promise((resolve) => {
            img.onload = () => {
                // Scale up canvas for better OCR (2x)
                const scaleFactor = 2;
                this.canvas.width = img.width * scaleFactor;
                this.canvas.height = img.height * scaleFactor;
                
                // Enable high-quality image smoothing
                this.ctx.imageSmoothingEnabled = true;
                this.ctx.imageSmoothingQuality = 'high';
                
                // Draw scaled image
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
                
                // Get image data for advanced processing
                const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
                const data = imgData.data;
                
                console.log('🔧 Applying SUPERIOR image preprocessing...');
                
                // 1. Convert to grayscale with enhanced contrast
                for (let i = 0; i < data.length; i += 4) {
                    // Weighted grayscale conversion (luminance formula)
                    const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
                    
                    // SUPERIOR contrast enhancement
                    const contrast = 2.2; // More aggressive contrast
                    const brightness = 15; // Brightness boost for text clarity
                    const enhanced = Math.min(255, Math.max(0, contrast * (gray - 128) + 128 + brightness));
                    
                    data[i] = enhanced;     // R
                    data[i + 1] = enhanced; // G
                    data[i + 2] = enhanced; // B
                    // Alpha stays the same
                }
                
                // 2. Apply superior sharpening filter
                this.applySuperiorSharpening(data, this.canvas.width, this.canvas.height);
                
                // 3. OTSU-style adaptive thresholding
                this.applyOptimalThreshold(data);
                
                // Put processed data back
                this.ctx.putImageData(imgData, 0, 0);
                
                // Return processed image as data URL
                const processedImageData = this.canvas.toDataURL('image/png');
                console.log('✅ SUPERIOR image preprocessing complete');
                resolve(processedImageData);
            };
        });
    }

    // Apply superior sharpening filter optimized for text
    applySuperiorSharpening(data, width, height) {
        // Optimized sharpening kernel for text clarity
        const sharpenKernel = [
            -0.25, -1, -0.25,
            -1,     6,    -1,
            -0.25, -1, -0.25
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

    // Apply optimal thresholding for text/background separation
    applyOptimalThreshold(data) {
        // Calculate histogram for OTSU algorithm
        const histogram = new Array(256).fill(0);
        const totalPixels = data.length / 4;
        
        for (let i = 0; i < data.length; i += 4) {
            histogram[data[i]]++;
        }
        
        // OTSU algorithm to find optimal threshold
        let sum = 0;
        for (let t = 0; t < 256; t++) {
            sum += t * histogram[t];
        }
        
        let sumB = 0, wB = 0, wF = 0, max = 0.0, between = 0.0;
        let threshold1 = 0, threshold2 = 0;
        
        for (let t = 0; t < 256; t++) {
            wB += histogram[t];
            if (wB === 0) continue;
            wF = totalPixels - wB;
            if (wF === 0) break;
            
            sumB += t * histogram[t];
            const mB = sumB / wB;
            const mF = (sum - sumB) / wF;
            between = wB * wF * (mB - mF) * (mB - mF);
            
            if (between >= max) {
                threshold1 = t;
                if (between > max) {
                    threshold2 = t;
                }
                max = between;
            }
        }
        
        const optimalThreshold = (threshold1 + threshold2) / 2;
        
        // Apply the optimal threshold
        for (let i = 0; i < data.length; i += 4) {
            const binary = data[i] > optimalThreshold ? 255 : 0;
            data[i] = binary;
            data[i + 1] = binary;
            data[i + 2] = binary;
        }
        
        console.log(`🎯 OTSU optimal threshold: ${optimalThreshold.toFixed(1)}`);
    }

    // MULTI-APPROACH OCR with intelligent result selection
    async performMultiApproachOCR(imageData) {
        if (!this.isInitialized || !this.ocrWorker) {
            console.warn('⚠️ OPTIMIZED OCR not initialized');
            return { text: '', confidence: 0 };
        }

        try {
            this.processingCount++;
            console.log(`🔍 Starting MULTI-APPROACH OCR #${this.processingCount}...`);
            
            // Step 1: Superior preprocessing
            const preprocessedImage = await this.preprocessImageSuperior(imageData);
            
            // Step 2: Multiple OCR approaches with different PSM modes
            const approaches = [
                { psm: Tesseract.PSM.AUTO, name: 'Automatic Page Segmentation', weight: 1.0 },
                { psm: Tesseract.PSM.SINGLE_BLOCK, name: 'Single Text Block', weight: 1.2 },
                { psm: Tesseract.PSM.SINGLE_COLUMN, name: 'Single Column', weight: 1.1 },
                { psm: Tesseract.PSM.SINGLE_WORD, name: 'Single Word (fallback)', weight: 0.5 }
            ];
            
            let bestResult = { 
                text: '', 
                confidence: 0, 
                rawText: '', 
                approach: 'none',
                wordCount: 0,
                readabilityScore: 0
            };
            
            for (const approach of approaches) {
                try {
                    console.log(`📖 Testing: ${approach.name}...`);
                    
                    // Configure OCR worker for this approach
                    await this.ocrWorker.setParameters({
                        tessedit_pageseg_mode: approach.psm
                    });
                    
                    const result = await this.ocrWorker.recognize(preprocessedImage);
                    
                    // Advanced post-processing
                    const processedText = this.advancedPostProcessing(result.data.text);
                    const confidence = (result.data.confidence / 100) * approach.weight;
                    
                    // Calculate readability metrics
                    const metrics = this.calculateReadabilityMetrics(processedText);
                    
                    console.log(`   📊 ${approach.name}: ${metrics.wordCount} words, ${(confidence * 100).toFixed(1)}% conf, ${metrics.readabilityScore.toFixed(2)} readability`);
                    
                    // Select best result based on comprehensive scoring
                    const totalScore = confidence * 0.4 + metrics.readabilityScore * 0.6;
                    const currentBestScore = bestResult.confidence * 0.4 + bestResult.readabilityScore * 0.6;
                    
                    if (totalScore > currentBestScore && metrics.wordCount > 0) {
                        bestResult = {
                            text: processedText,
                            confidence: confidence,
                            rawText: result.data.text,
                            approach: approach.name,
                            wordCount: metrics.wordCount,
                            readabilityScore: metrics.readabilityScore,
                            totalScore: totalScore
                        };
                    }
                    
                } catch (approachError) {
                    console.warn(`⚠️ OCR approach ${approach.name} failed:`, approachError);
                }
            }
            
            console.log('📊 MULTI-APPROACH OCR Results:');
            console.log(`   🏆 Best approach: ${bestResult.approach}`);
            console.log(`   📝 Text length: ${bestResult.text.length} characters`);
            console.log(`   🔤 Word count: ${bestResult.wordCount} words`);
            console.log(`   📊 Confidence: ${Math.round(bestResult.confidence * 100)}%`);
            console.log(`   📈 Readability: ${bestResult.readabilityScore.toFixed(2)}`);
            console.log(`   📄 Sample: "${bestResult.text.substring(0, 200)}..."`);
            
            return {
                text: bestResult.text,
                confidence: bestResult.confidence,
                rawText: bestResult.rawText,
                approach: bestResult.approach,
                wordCount: bestResult.wordCount,
                readabilityScore: bestResult.readabilityScore,
                processingTime: Date.now()
            };
            
        } catch (error) {
            console.error('❌ MULTI-APPROACH OCR failed:', error);
            return { text: '', confidence: 0 };
        }
    }

    // Calculate readability metrics for result selection
    calculateReadabilityMetrics(text) {
        if (!text || typeof text !== 'string') {
            return { wordCount: 0, readabilityScore: 0, avgWordLength: 0 };
        }
        
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const validWords = words.filter(w => /^[a-zA-Z0-9]/.test(w) && w.length > 1);
        const avgWordLength = validWords.length > 0 ? 
            validWords.reduce((sum, w) => sum + w.length, 0) / validWords.length : 0;
        
        // Readability score based on:
        // - Percentage of valid words (alphabetic/numeric)
        // - Average word length (not too short, not too long)
        // - Presence of common English patterns
        
        const validWordRatio = words.length > 0 ? validWords.length / words.length : 0;
        const lengthScore = avgWordLength > 2 && avgWordLength < 15 ? 1 : 0.5;
        const patternScore = this.calculatePatternScore(text);
        
        const readabilityScore = (validWordRatio * 0.5 + lengthScore * 0.3 + patternScore * 0.2);
        
        return {
            wordCount: validWords.length,
            readabilityScore: readabilityScore,
            avgWordLength: avgWordLength,
            validWordRatio: validWordRatio
        };
    }

    // Calculate pattern score based on common English/code patterns
    calculatePatternScore(text) {
        const lowerText = text.toLowerCase();
        let score = 0.5; // Base score
        
        // Common English words
        const commonWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'man', 'may', 'put', 'run', 'say', 'she', 'too', 'use'];
        const foundCommonWords = commonWords.filter(word => lowerText.includes(word)).length;
        score += Math.min(foundCommonWords / 10, 0.3);
        
        // Code patterns
        if (lowerText.includes('function') || lowerText.includes('class') || lowerText.includes('import')) {
            score += 0.2;
        }
        
        // Email/communication patterns
        if (lowerText.includes('@') || lowerText.includes('email') || lowerText.includes('message')) {
            score += 0.2;
        }
        
        // Web patterns
        if (lowerText.includes('http') || lowerText.includes('www.') || lowerText.includes('.com')) {
            score += 0.1;
        }
        
        return Math.min(score, 1.0);
    }

    // ADVANCED post-processing with intelligent error correction
    advancedPostProcessing(rawText) {
        if (!rawText || typeof rawText !== 'string') {
            return '';
        }
        
        let processed = rawText;
        
        // 1. Normalize whitespace
        processed = processed.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n').trim();
        
        // 2. INTELLIGENT character corrections
        const corrections = {
            // Number-to-letter corrections in word context
            '0': 'O', '1': 'I', '5': 'S', '8': 'B', '6': 'G',
            // Symbol corrections
            '@': 'a', '|': 'l', '¥': 'Y', '§': 'S', '©': 'C', '®': 'R', '™': 'TM'
        };
        
        // Apply corrections intelligently
        const words = processed.split(/\s+/);
        const correctedWords = words.map(word => {
            if (word.length < 2) return word;
            
            let corrected = word;
            for (const [wrong, right] of Object.entries(corrections)) {
                if (word.includes(wrong)) {
                    const testCorrection = corrected.replace(new RegExp(wrong, 'g'), right);
                    // Only apply if it increases alphabetic character ratio
                    const originalAlpha = (corrected.match(/[a-zA-Z]/g) || []).length;
                    const correctedAlpha = (testCorrection.match(/[a-zA-Z]/g) || []).length;
                    if (correctedAlpha >= originalAlpha) {
                        corrected = testCorrection;
                    }
                }
            }
            return corrected;
        });
        
        processed = correctedWords.join(' ');
        
        // 3. Fix common word patterns
        const wordFixes = {
            'teh': 'the', 'adn': 'and', 'taht': 'that', 'wiht': 'with',
            'yuo': 'you', 'cna': 'can', 'woudl': 'would', 'hte': 'the'
        };
        
        for (const [wrong, right] of Object.entries(wordFixes)) {
            processed = processed.replace(new RegExp(`\\b${wrong}\\b`, 'gi'), right);
        }
        
        // 4. Remove obvious OCR artifacts
        processed = processed.replace(/[^\w\s.,!?@#$%^&*()_+\-=\[\]{}|;:"<>?/~`]{3,}/g, ' ');
        
        // 5. Final cleanup
        return processed.replace(/\s+/g, ' ').trim();
    }

    // Get enhanced screen text with superior processing
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
                    
                    // Perform multi-approach OCR
                    const result = await this.performMultiApproachOCR(imageData);
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
        console.log('🧹 OPTIMIZED OCR Processor destroyed');
    }
}

// Create global instance
window.optimizedOCRProcessor = new OptimizedOCRProcessor();

// Initialize on load
document.addEventListener('DOMContentLoaded', async () => {
    await window.optimizedOCRProcessor.initialize();
});

console.log('🔍 OPTIMIZED Enhanced OCR Processor v2 loaded - SUPERIOR OCR accuracy with multi-approach recognition');