// Minimal test to find exactly what's broken in the streaming architecture
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

async function testStreamingConnection() {
    console.log('🔍 MINIMAL STREAMING CONNECTION TEST');
    console.log('===================================');
    
    // Test 1: Can we load the proto file?
    console.log('\n📋 1. Testing proto file loading...');
    try {
        const protoPath = path.join(__dirname, 'proto/velvet_capture.proto');
        console.log('Proto path:', protoPath);
        
        const packageDefinition = protoLoader.loadSync(protoPath, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
        
        console.log('✅ Proto file loaded successfully');
        
        const velvetCapture = grpc.loadPackageDefinition(packageDefinition).velvet_capture;
        console.log('✅ gRPC package definition loaded');
        
        // Test 2: Can we create a gRPC client?
        console.log('\n📋 2. Testing gRPC client creation...');
        const client = new velvetCapture.VelvetCaptureService(
            '127.0.0.1:50051',
            grpc.credentials.createInsecure()
        );
        console.log('✅ gRPC client created');
        
        // Test 3: Can we connect to the server?
        console.log('\n📋 3. Testing server connection...');
        
        // Simple connectivity test
        const deadline = Date.now() + 5000; // 5 second timeout
        const state = client.getChannel().getConnectivityState(true);
        console.log('Initial connection state:', state);
        
        return new Promise((resolve) => {
            client.waitForReady(deadline, (error) => {
                if (error) {
                    console.error('❌ Connection failed:', error.message);
                    console.log('🔧 This means:');
                    console.log('   - Rust service might not be running on port 50051');
                    console.log('   - Or there\'s a networking issue');
                    console.log('   - Or the gRPC server isn\'t accepting connections');
                } else {
                    console.log('✅ Successfully connected to Rust service!');
                    
                    // Test 4: Can we make a simple call?
                    console.log('\n📋 4. Testing brain context stream...');
                    
                    const request = {
                        include_audio: false,
                        include_patterns: false,
                        confidence_threshold: 0.5
                    };
                    
                    try {
                        const stream = client.streamBrainContext(request);
                        
                        stream.on('data', (contextUpdate) => {
                            console.log('🚨 RECEIVED DATA FROM RUST SERVICE:');
                            console.log('   Screen text length:', contextUpdate.screen_text.length);
                            console.log('   Screen text preview:', contextUpdate.screen_text.substring(0, 100));
                            console.log('   OCR confidence:', contextUpdate.ocr_confidence);
                            console.log('✅ STREAMING ARCHITECTURE IS WORKING!');
                        });
                        
                        stream.on('error', (error) => {
                            console.error('❌ Stream error:', error);
                        });
                        
                        stream.on('end', () => {
                            console.log('🔚 Stream ended');
                        });
                        
                        console.log('✅ Stream request sent, waiting for data...');
                        
                    } catch (streamError) {
                        console.error('❌ Stream creation failed:', streamError);
                    }
                }
                resolve();
            });
        });
        
    } catch (error) {
        console.error('❌ Test failed:', error);
        console.log('\n🔧 DEBUGGING HINTS:');
        console.log('   - Check if proto file exists at:', path.join(__dirname, 'proto/velvet_capture.proto'));
        console.log('   - Check if @grpc/grpc-js is installed: npm list @grpc/grpc-js');
        console.log('   - Make sure you\'re running from the velvet-app directory');
    }
}

// Run the test
testStreamingConnection().then(() => {
    console.log('\n===================================');
    console.log('🔍 Test complete');
    console.log('If you see "STREAMING ARCHITECTURE IS WORKING!" above,');
    console.log('then the issue is in Electron\'s integration, not the services.');
    console.log('If you see connection errors, the Rust service isn\'t running.');
}).catch(console.error);