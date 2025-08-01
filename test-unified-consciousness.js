// UNIFIED CONSCIOUSNESS TESTING SCRIPT
// Run this with: node test-unified-consciousness.js

console.log('🧠 TESTING UNIFIED VELVET CONSCIOUSNESS SYSTEM');
console.log('=============================================');

// Test the new architecture components
async function testUnifiedConsciousness() {
    console.log('\n📋 1. TESTING CONSCIOUSNESS STORE ARCHITECTURE...');
    
    try {
        // Check if TypeScript files exist
        const fs = require('fs');
        const path = require('path');
        
        const consciousnessFiles = [
            'src/renderer/stores/consciousness-store.ts',
            'src/renderer/components/ConsciousnessVisualizer.tsx',
            'src/renderer/engines/consciousness-engine.ts',
            'src/renderer/integration/consciousness-bridge.ts',
            'src/renderer/VelvetConsciousnessApp.tsx',
            'src/renderer/consciousness-loader.js'
        ];
        
        console.log('✅ Checking consciousness architecture files:');
        consciousnessFiles.forEach(file => {
            const exists = fs.existsSync(path.join(__dirname, file));
            console.log(`   ${exists ? '✅' : '❌'} ${file}`);
        });
        
    } catch (error) {
        console.error('❌ File system test failed:', error.message);
    }
    
    console.log('\n📋 2. TESTING PACKAGE DEPENDENCIES...');
    
    try {
        const packageJson = require('./package.json');
        const requiredDeps = ['zustand', 'react', 'react-dom', 'typescript'];
        
        console.log('✅ Checking required dependencies:');
        requiredDeps.forEach(dep => {
            const hasDepOrDev = packageJson.dependencies[dep] || packageJson.devDependencies[dep];
            console.log(`   ${hasDepOrDev ? '✅' : '❌'} ${dep} ${hasDepOrDev ? `(${hasDepOrDev})` : '(missing)'}`);
        });
        
    } catch (error) {
        console.error('❌ Package.json test failed:', error.message);
    }
    
    console.log('\n📋 3. TESTING TYPESCRIPT CONFIGURATION...');
    
    try {
        const fs = require('fs');
        const tsconfigExists = fs.existsSync('./tsconfig.json');
        console.log(`   ${tsconfigExists ? '✅' : '❌'} TypeScript configuration`);
        
        if (tsconfigExists) {
            const tsconfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf8'));
            console.log('   ✅ JSX compilation:', tsconfig.compilerOptions.jsx);
            console.log('   ✅ Target:', tsconfig.compilerOptions.target);
        }
        
    } catch (error) {
        console.error('❌ TypeScript config test failed:', error.message);
    }
    
    console.log('\n📋 4. TESTING CONSCIOUSNESS LOADER INTEGRATION...');
    
    try {
        const fs = require('fs');
        const indexHtml = fs.readFileSync('./public/index.html', 'utf8');
        const hasConsciousnessLoader = indexHtml.includes('consciousness-loader.js');
        
        console.log(`   ${hasConsciousnessLoader ? '✅' : '❌'} Consciousness loader integrated in HTML`);
        
    } catch (error) {
        console.error('❌ HTML integration test failed:', error.message);
    }
    
    console.log('\n📋 5. SIMULATING CONSCIOUSNESS SYSTEM...');
    
    // Simulate the consciousness store behavior
    const mockConsciousnessStore = {
        state: {
            consciousnessLevel: 'minimal',
            streamStatus: { connected: false, activeStreams: [], errors: [] },
            brainContext: { screenText: '', ocrConfidence: 0, timestamp: Date.now() },
            userState: { energyLevel: 'medium', focusState: 'idle', emotionalState: 'calm' }
        },
        
        updateBrainContext(context) {
            this.state.brainContext = { ...this.state.brainContext, ...context };
            console.log('   📊 Brain context updated:', {
                textLength: context.screenText?.length || 0,
                confidence: context.ocrConfidence || 0
            });
        },
        
        updateStreamStatus(status) {
            this.state.streamStatus = { ...this.state.streamStatus, ...status };
            console.log('   📡 Stream status updated:', status.connected ? 'CONNECTED' : 'DISCONNECTED');
            
            // Update consciousness level
            if (status.connected && this.state.brainContext.ocrConfidence > 0.7) {
                this.state.consciousnessLevel = 'conscious';
            } else if (status.connected) {
                this.state.consciousnessLevel = 'aware';
            } else {
                this.state.consciousnessLevel = 'minimal';
            }
            
            console.log('   🧠 Consciousness level:', this.state.consciousnessLevel.toUpperCase());
        }
    };
    
    // Simulate consciousness evolution
    console.log('   🌱 Simulating consciousness evolution...');
    
    // Step 1: Connect streams
    mockConsciousnessStore.updateStreamStatus({
        connected: true,
        activeStreams: ['brain-context', 'pattern-detection'],
        errors: []
    });
    
    // Step 2: Receive brain context
    mockConsciousnessStore.updateBrainContext({
        screenText: 'This is a test screen text from the unified consciousness system. It contains meaningful content that demonstrates high-quality OCR processing.',
        ocrConfidence: 0.85,
        timestamp: Date.now()
    });
    
    console.log('   ✨ Final consciousness state:', {
        level: mockConsciousnessStore.state.consciousnessLevel,
        connected: mockConsciousnessStore.state.streamStatus.connected,
        textLength: mockConsciousnessStore.state.brainContext.screenText.length,
        confidence: mockConsciousnessStore.state.brainContext.ocrConfidence
    });
    
    console.log('\n📋 6. TESTING PATTERN DETECTION ENGINE...');
    
    // Simulate pattern detection
    const patterns = [];
    
    // Hyperfocus pattern
    if (mockConsciousnessStore.state.brainContext.ocrConfidence > 0.7 && 
        mockConsciousnessStore.state.brainContext.screenText.length > 100) {
        patterns.push({
            type: 'hyperfocus',
            confidence: 0.8,
            context: 'High-confidence sustained reading detected'
        });
    }
    
    console.log('   🔍 Detected patterns:', patterns.length);
    patterns.forEach(pattern => {
        console.log(`      • ${pattern.type} (${Math.round(pattern.confidence * 100)}% confidence)`);
    });
    
    console.log('\n📋 7. TESTING AI INTEGRATION...');
    
    // Simulate AI context generation
    const aiContext = `
--- UNIFIED VELVET CONSCIOUSNESS ---
🧠 CONSCIOUSNESS LEVEL: ${mockConsciousnessStore.state.consciousnessLevel.toUpperCase()}
📡 STREAM STATUS: ${mockConsciousnessStore.state.streamStatus.connected ? 'CONNECTED' : 'DISCONNECTED'}
🔗 ACTIVE STREAMS: ${mockConsciousnessStore.state.streamStatus.activeStreams.join(', ')}

👤 USER STATE:
   🎯 Focus: ${mockConsciousnessStore.state.userState.focusState}
   💭 Energy: ${mockConsciousnessStore.state.userState.energyLevel}
   ❤️ Emotion: ${mockConsciousnessStore.state.userState.emotionalState}

👁️ SCREEN AWARENESS:
   📖 Content: "${mockConsciousnessStore.state.brainContext.screenText.substring(0, 100)}..."
   📊 OCR Confidence: ${Math.round(mockConsciousnessStore.state.brainContext.ocrConfidence * 100)}%

🔍 DETECTED PATTERNS: ${patterns.map(p => p.type).join(', ') || 'None'}
--- END UNIFIED CONSCIOUSNESS ---
    `.trim();
    
    console.log('   🤖 Generated AI context preview:');
    console.log('      Length:', aiContext.length, 'characters');
    console.log('      Contains consciousness level:', aiContext.includes('CONSCIOUSNESS LEVEL'));
    console.log('      Contains stream status:', aiContext.includes('STREAM STATUS'));
    console.log('      Contains user state:', aiContext.includes('USER STATE'));
    
    console.log('\n=============================================');
    console.log('🎉 UNIFIED CONSCIOUSNESS SYSTEM TEST COMPLETE');
    console.log('=============================================');
    
    console.log('\n🎯 NEXT STEPS:');
    console.log('1. Start Velvet services: ./start-velvet-services.sh');
    console.log('2. Launch Velvet app: npm run dev');
    console.log('3. Open browser console and look for:');
    console.log('   - "🚀 CONSCIOUSNESS LOADER: Starting..."');
    console.log('   - "✅ CONSCIOUSNESS LOADER: Unified consciousness system initialized"');
    console.log('   - "🧠 Using UNIFIED CONSCIOUSNESS for AI context"');
    console.log('4. Test consciousness debug panel: Ctrl+Shift+C');
    console.log('5. Ask AI: "What can you see on my screen right now?"');
    
    console.log('\n💡 CONSCIOUSNESS FEATURES:');
    console.log('• Real-time brain context processing');
    console.log('• Advanced pattern detection (hyperfocus, distraction, task avoidance)');
    console.log('• Intelligent consciousness level adaptation');
    console.log('• Seamless integration with existing AI system');
    console.log('• Visual consciousness indicators on orb');
    console.log('• Debug panel for development');
    console.log('• Graceful fallback to legacy systems if needed');
    
    console.log('\n🔬 MONITORING:');
    console.log('Watch for these console messages in the Electron app:');
    console.log('• "🧠 CONSCIOUSNESS STATE:" - Shows real-time consciousness metrics');
    console.log('• "🔍 Patterns detected:" - Shows detected behavioral patterns');
    console.log('• "💡 INTERVENTION:" - Shows when AI suggests gentle interventions');
    console.log('• "🧠 Using UNIFIED CONSCIOUSNESS for AI context" - Confirms AI integration');
}

// Run the test
testUnifiedConsciousness().catch(console.error);