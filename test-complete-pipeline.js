// COMPREHENSIVE PIPELINE TEST
// Place this file in the project root and run: node test-complete-pipeline.js

const axios = require('axios');
const fs = require('fs');

async function testCompletePipeline() {
    console.log('🔍 TESTING COMPLETE VELVET PIPELINE');
    console.log('===================================');
    
    // 1. Test Python Preprocessing Worker
    console.log('\n📋 1. TESTING PYTHON PREPROCESSING WORKER...');
    
    try {
        // Health check
        const health = await axios.get('http://127.0.0.1:8001/health');
        console.log('✅ Python Worker Health:', health.data);
        
        // Test with a simple image
        console.log('🖼️ Testing image preprocessing...');
        
        // Create a simple 100x100 white PNG with black text "TEST"
        const testImagePath = '/tmp/test_velvet_image.png';
        
        // Use ImageMagick to create test image (if available)
        const { exec } = require('child_process');
        await new Promise((resolve, reject) => {
            exec(`convert -size 100x50 xc:white -pointsize 20 -fill black -gravity center -annotate +0+0 "VELVET TEST" ${testImagePath}`, 
                (error) => {
                    if (error) {
                        console.log('⚠️ ImageMagick not available, using screencapture instead');
                        // Fallback: take a screenshot
                        exec(`screencapture -x ${testImagePath}`, resolve);
                    } else {
                        resolve();
                    }
                });
        });
        
        // Read the image and send to preprocessing worker
        const imageBuffer = fs.readFileSync(testImagePath);
        
        const FormData = require('form-data');
        const form = new FormData();
        form.append('image', imageBuffer, 'test.png');
        
        const response = await axios.post('http://127.0.0.1:8001/velvet/analyze/', form, {
            headers: form.getHeaders()
        });
        
        console.log('📊 OCR Response:', {
            screenText: response.data.screenText.substring(0, 100) + '...',
            textLength: response.data.screenText.length,
            ocrConfidence: response.data.ocrConfidence,
            processingTime: response.data.processingTime
        });
        
        // Clean up
        fs.unlinkSync(testImagePath);
        
    } catch (error) {
        console.error('❌ Python Worker Test Failed:', error.message);
    }
    
    // 2. Test Rust Capture Service (if running)
    console.log('\n📋 2. TESTING RUST CAPTURE SERVICE...');
    
    try {
        // We can't easily test gRPC from Node.js without setting up a client
        // But we can check if the service is running on port 50051
        const net = require('net');
        const isPortOpen = await new Promise((resolve) => {
            const socket = new net.Socket();
            socket.setTimeout(1000);
            socket.on('connect', () => {
                socket.destroy();
                resolve(true);
            });
            socket.on('timeout', () => {
                socket.destroy();
                resolve(false);
            });
            socket.on('error', () => {
                resolve(false);
            });
            socket.connect(50051, '127.0.0.1');
        });
        
        if (isPortOpen) {
            console.log('✅ Rust Capture Service is running on port 50051');
        } else {
            console.log('❌ Rust Capture Service not responding on port 50051');
        }
        
    } catch (error) {
        console.error('❌ Rust Service Test Failed:', error.message);
    }
    
    // 3. Check service integration
    console.log('\n📋 3. CHECKING SERVICE INTEGRATION...');
    
    console.log('Services Status:');
    console.log('  • Python Worker (8001):', await checkPort(8001) ? '✅ Running' : '❌ Down');
    console.log('  • Rust Capture (50051):', await checkPort(50051) ? '✅ Running' : '❌ Down');
    
    console.log('\n📋 4. TESTING INDIVIDUAL COMPONENTS...');
    
    // Test if npm dependencies are installed
    try {
        require('@grpc/grpc-js');
        console.log('✅ gRPC dependencies available');
    } catch (error) {
        console.log('❌ gRPC dependencies missing - run: npm install');
    }
    
    console.log('\n===================================');
    console.log('🔍 Pipeline test complete');
    console.log('\nNEXT STEPS:');
    console.log('1. Start services: ./start-velvet-services.sh');
    console.log('2. Open Electron app and check console logs');
    console.log('3. Run debug script in browser: node debug-data-flow.js');
}

async function checkPort(port) {
    const net = require('net');
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(1000);
        socket.on('connect', () => {
            socket.destroy();
            resolve(true);
        });
        socket.on('timeout', () => {
            socket.destroy();
            resolve(false);
        });
        socket.on('error', () => {
            resolve(false);
        });
        socket.connect(port, '127.0.0.1');
    });
}

// Run the test
testCompletePipeline().catch(console.error);