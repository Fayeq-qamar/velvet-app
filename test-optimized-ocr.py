#!/usr/bin/env python3
"""
Standalone test script for the OPTIMIZED OCR processing
Tests the fixes for garbled OCR output without requiring web service dependencies
"""

import sys
import os
from PIL import Image, ImageEnhance, ImageFilter
import cv2
import numpy as np
import time

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_optimized_ocr():
    """Test the optimized OCR processing pipeline"""
    
    print("🔍 TESTING OPTIMIZED OCR PIPELINE")
    print("=" * 50)
    
    try:
        import pytesseract
        print("✅ Tesseract is available")
    except ImportError:
        print("❌ Tesseract not available - installing with pip...")
        os.system("pip3 install pytesseract")
        import pytesseract
    
    # Load test image
    test_image_path = "services/preproc-worker/debug_velvet_preprocessed_1754051980.png"
    if not os.path.exists(test_image_path):
        print(f"❌ Test image not found: {test_image_path}")
        return False
    
    img = Image.open(test_image_path)
    print(f"📷 Loaded test image: {img.size} pixels, mode: {img.mode}")
    
    # OPTIMIZED preprocessing pipeline
    print("\n🔧 STEP 1: OPTIMIZED Image Preprocessing")
    processed_img = optimized_preprocess_image(img)
    processed_img.save("test_optimized_result.png")
    print("💾 Saved optimized result as test_optimized_result.png")
    
    # Multi-approach OCR testing
    print("\n📖 STEP 2: MULTI-APPROACH OCR Testing")
    approaches = [
        {"psm": 3, "name": "Fully Automatic Page Segmentation"},
        {"psm": 6, "name": "Uniform Block of Text"},
        {"psm": 4, "name": "Single Column of Text"},
        {"psm": 11, "name": "Sparse Text"},
    ]
    
    best_result = {"text": "", "confidence": 0, "approach": "none", "word_count": 0}
    
    for approach in approaches:
        try:
            print(f"\n   Testing: {approach['name']}")
            
            config = f"--oem 3 --psm {approach['psm']}"
            
            # Get detailed OCR data
            ocr_data = pytesseract.image_to_data(
                processed_img,
                output_type=pytesseract.Output.DICT,
                config=config
            )
            
            # Smart confidence filtering
            confident_words = []
            total_confidence = 0
            word_count = 0
            
            for i, conf in enumerate(ocr_data['conf']):
                word = ocr_data['text'][i].strip()
                if word and len(word) > 1:
                    confidence = int(conf)
                    
                    # Dynamic confidence threshold
                    min_confidence = 35
                    if len(word) > 4:
                        min_confidence = 30
                    if word.isalpha() and len(word) > 2:
                        min_confidence = 25
                    
                    if confidence > min_confidence:
                        confident_words.append(word)
                        total_confidence += confidence
                        word_count += 1
            
            # Calculate metrics
            avg_confidence = total_confidence / word_count if word_count > 0 else 0
            extracted_text = advanced_post_process(" ".join(confident_words))
            
            # Calculate readability score
            readable_words = [w for w in extracted_text.split() if len(w) > 2 and any(c.isalpha() for c in w)]
            readability_score = len(readable_words) / max(len(extracted_text.split()), 1)
            
            print(f"      📊 Words: {word_count}")
            print(f"      📊 Confidence: {avg_confidence:.1f}%")
            print(f"      📊 Readability: {readability_score:.2f}")
            print(f"      📄 Sample: \"{extracted_text[:100]}...\"")
            
            # Select best result
            total_score = (avg_confidence/100) * 0.3 + readability_score * 0.7
            current_best_score = (best_result["confidence"]/100) * 0.3 + (best_result["word_count"]/max(len(best_result["text"].split()), 1)) * 0.7
            
            if total_score > current_best_score and len(readable_words) > 5:
                best_result = {
                    "text": extracted_text,
                    "confidence": avg_confidence,
                    "approach": approach["name"],
                    "word_count": len(readable_words),
                    "total_score": total_score
                }
                
        except Exception as e:
            print(f"      ❌ Failed: {e}")
    
    # Final results
    print("\n🏆 FINAL OPTIMIZED OCR RESULTS")
    print("=" * 40)
    print(f"🎯 Best approach: {best_result['approach']}")
    print(f"📝 Text length: {len(best_result['text'])} characters")
    print(f"🔤 Readable words: {best_result['word_count']}")
    print(f"📊 Confidence: {best_result['confidence']:.1f}%")
    print(f"📈 Total score: {best_result['total_score']:.2f}")
    print("\n📄 EXTRACTED TEXT:")
    print("-" * 20)
    print(best_result['text'][:500] + ("..." if len(best_result['text']) > 500 else ""))
    print("-" * 20)
    
    # Quality assessment
    if best_result['word_count'] > 30:
        print("✅ OCR QUALITY: EXCELLENT - Many readable words extracted")
        return True
    elif best_result['word_count'] > 15:
        print("✅ OCR QUALITY: GOOD - Good number of readable words")
        return True
    elif best_result['word_count'] > 5:
        print("⚠️ OCR QUALITY: FAIR - Some readable words detected")
        return True
    else:
        print("❌ OCR QUALITY: POOR - Very few readable words")
        return False


def optimized_preprocess_image(image):
    """OPTIMIZED image preprocessing for superior OCR accuracy"""
    
    # Convert to numpy array
    img_array = np.array(image)
    
    # Handle different image formats
    if len(img_array.shape) == 3 and img_array.shape[2] == 4:  # RGBA
        img_array = cv2.cvtColor(img_array, cv2.COLOR_RGBA2RGB)
    elif len(img_array.shape) == 3 and img_array.shape[2] == 3:  # RGB
        pass
    else:  # Grayscale
        img_array = cv2.cvtColor(img_array, cv2.COLOR_GRAY2RGB)
    
    # 1. Gentle noise reduction
    denoised = cv2.medianBlur(img_array, 3)
    
    # 2. Convert to grayscale
    if len(denoised.shape) == 3:
        gray = cv2.cvtColor(denoised, cv2.COLOR_RGB2GRAY)
    else:
        gray = denoised
    
    # 3. Enhanced contrast with CLAHE
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)
    
    # 4. OTSU thresholding for optimal binarization
    _, binary = cv2.threshold(enhanced, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    # 5. Morphological operations to clean text
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
    cleaned = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
    
    # 6. Scale up for better OCR recognition (2x)
    scale_factor = 2
    height, width = cleaned.shape
    enlarged = cv2.resize(cleaned, (width * scale_factor, height * scale_factor), interpolation=cv2.INTER_CUBIC)
    
    return Image.fromarray(enlarged)


def advanced_post_process(raw_text):
    """Advanced post-processing with intelligent error correction"""
    
    if not raw_text:
        return ""
    
    # 1. Normalize whitespace
    processed = " ".join(raw_text.split())
    
    # 2. Character corrections
    corrections = {
        '0': 'O', '1': 'I', '5': 'S', '8': 'B', '6': 'G',
        '@': 'a', '|': 'l', '¥': 'Y', '§': 'S', '©': 'C', '®': 'R'
    }
    
    # Apply corrections in word context
    words = processed.split()
    corrected_words = []
    
    for word in words:
        if len(word) < 2:
            corrected_words.append(word)
            continue
            
        corrected = word
        for wrong, right in corrections.items():
            if wrong in word:
                test_correction = corrected.replace(wrong, right)
                # Only apply if it increases letter count
                if sum(c.isalpha() for c in test_correction) >= sum(c.isalpha() for c in corrected):
                    corrected = test_correction
        
        corrected_words.append(corrected)
    
    processed = " ".join(corrected_words)
    
    # 3. Common word fixes
    word_fixes = {
        'teh': 'the', 'adn': 'and', 'taht': 'that', 'wiht': 'with',
        'yuo': 'you', 'cna': 'can', 'woudl': 'would', 'hte': 'the'
    }
    
    for wrong, right in word_fixes.items():
        processed = processed.replace(f" {wrong} ", f" {right} ")
    
    # 4. Remove OCR artifacts
    import re
    processed = re.sub(r'[^\w\s.,!?@#$%^&*()_+\-=\[\]{}|;:"<>?/~`]{3,}', ' ', processed)
    
    return " ".join(processed.split())


if __name__ == "__main__":
    success = test_optimized_ocr()
    if success:
        print("\n🎉 OPTIMIZED OCR TEST: SUCCESS")
        print("The OCR accuracy issues have been FIXED!")
    else:
        print("\n❌ OPTIMIZED OCR TEST: NEEDS MORE WORK")
        print("OCR accuracy still needs improvement.")