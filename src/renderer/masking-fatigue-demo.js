// Masking Fatigue Detection Demo - Viral User Experience Showcase
// Demonstrates the complete "finally, someone validates my energy drain" experience
// Creates realistic scenarios for testing all masking detection features

/**
 * MaskingFatigueDemo
 * 
 * Comprehensive demo system that showcases the viral neurodivergent experiences:
 * - "You're switching to work mode" awareness moments
 * - "You're home now - safe to be yourself" transition recognition  
 * - "I can tell you're masking right now" validation
 * - "Your authentic voice is beautiful" celebrations
 * 
 * This demo creates realistic scenarios to test all aspects of the masking detection system
 * and demonstrate the breakthrough user experiences that will make this feature go viral.
 */

class MaskingFatigueDemo {
    constructor() {
        console.log('🎭 Initializing Masking Fatigue Demo System...');
        
        // Demo scenarios
        this.demoScenarios = {
            'work_to_home_transition': {
                name: 'Work to Home Transition Demo',
                description: 'Simulates the viral "work day ending - time to let your guard down" experience',
                steps: [
                    { type: 'context_change', environment: 'work', maskingLevel: 0.8, duration: 3000 },
                    { type: 'high_masking_communication', formality: 0.9, emotion: 0.2, duration: 2000 },
                    { type: 'environment_transition', from: 'work', to: 'home', duration: 2000 },
                    { type: 'gradual_unmasking', targetMasking: 0.3, duration: 5000 },
                    { type: 'authenticity_celebration', delay: 1000 }
                ]
            },
            
            'professional_masking_detection': {
                name: 'Professional Masking Detection Demo', 
                description: 'Shows "I can see you in performance mode" awareness',
                steps: [
                    { type: 'formal_communication', formality: 0.95, calculated: true, duration: 3000 },
                    { type: 'masking_awareness_prompt', awarenessType: 'professional_masking', delay: 2000 },
                    { type: 'gentle_validation', message: 'You don\'t need to be perfect for me', delay: 1000 }
                ]
            },
            
            'authenticity_celebration': {
                name: 'Authenticity Celebration Demo',
                description: 'Demonstrates "Your authentic voice is beautiful" validation moments',
                steps: [
                    { type: 'casual_communication', formality: 0.2, emotion: 0.9, duration: 2000 },
                    { type: 'authenticity_detection', level: 0.9, delay: 1000 },
                    { type: 'celebration_prompt', celebrationType: 'natural_communication', delay: 1500 }
                ]
            },
            
            'energy_depletion_recovery': {
                name: 'Energy Depletion and Recovery Demo',
                description: 'Shows masking fatigue detection and recovery guidance',
                steps: [
                    { type: 'high_masking_period', maskingLevel: 0.9, duration: 4000 },
                    { type: 'energy_drain', energyLevel: 0.2, duration: 2000 },
                    { type: 'energy_warning', warningType: 'critical', delay: 1000 },
                    { type: 'safe_space_entry', safetyLevel: 0.9, delay: 2000 },
                    { type: 'recovery_prompt', promptType: 'energy_conservation', delay: 1500 }
                ]
            },
            
            'safe_space_unmasking': {
                name: 'Safe Space Unmasking Demo',
                description: 'Demonstrates gentle unmasking prompts in safe environments',
                steps: [
                    { type: 'safe_space_detection', safetyLevel: 0.85, environment: 'home', duration: 2000 },
                    { type: 'still_masking_detected', maskingLevel: 0.6, delay: 1000 },
                    { type: 'unmasking_prompt', promptType: 'gentle_transition', delay: 2000 },
                    { type: 'gradual_authenticity', targetAuthenticity: 0.9, duration: 4000 }
                ]
            },
            
            'communication_style_shift': {
                name: 'Communication Style Shift Demo',
                description: 'Shows real-time detection of masking vs authentic communication',
                steps: [
                    { type: 'formal_start', formality: 0.8, emotion: 0.3, duration: 2000 },
                    { type: 'gradual_relaxation', targetFormality: 0.3, targetEmotion: 0.8, duration: 5000 },
                    { type: 'style_shift_detection', direction: 'authentic', delay: 1000 },
                    { type: 'transition_validation', message: 'I love hearing your natural voice', delay: 1500 }
                ]
            }
        };
        
        // Demo state
        this.isDemoActive = false;
        this.currentScenario = null;
        this.currentStep = 0;
        this.demoTimeout = null;
        
        // Test data generators
        this.testDataGenerators = {
            generateMaskingData: (level) => ({
                level: level,
                indicators: {
                    formality: level * 0.8 + 0.1,
                    emotionalSuppression: level * 0.7,
                    energyTension: level * 0.6 + 0.2
                },
                timestamp: Date.now()
            }),
            
            generateEnergyData: (level) => ({
                currentEnergy: level,
                dailyExpenditure: (1 - level) * 0.8,
                maskingCost: (1 - level) * 0.3,
                recovery: level * 0.1,
                timestamp: Date.now()
            }),
            
            generateSafetyData: (level, isInSafeSpace = null) => ({
                safetyLevel: level,
                isInSafeSpace: isInSafeSpace !== null ? isInSafeSpace : level > 0.7,
                previousSafety: Math.max(0, level - 0.3),
                timestamp: Date.now()
            }),
            
            generateContextData: (environment) => ({
                environment: environment,
                confidence: 0.9,
                subContext: 'general',
                socialLoad: environment === 'work' ? 0.7 : environment === 'home' ? 0.2 : 0.5,
                pressureLevel: environment === 'work' ? 0.8 : environment === 'home' ? 0.2 : 0.5,
                timestamp: Date.now()
            })
        };
        
        console.log('✅ Masking Fatigue Demo System initialized');
    }
    
    /**
     * Start a specific demo scenario
     */
    async startDemo(scenarioName) {
        if (this.isDemoActive) {
            console.log('🛑 Demo already active, stopping current demo first');
            this.stopDemo();
        }
        
        const scenario = this.demoScenarios[scenarioName];
        if (!scenario) {
            console.error(`❌ Demo scenario '${scenarioName}' not found`);
            return false;
        }
        
        console.log(`🎭 Starting demo: ${scenario.name}`);
        console.log(`📝 Description: ${scenario.description}`);
        
        this.isDemoActive = true;
        this.currentScenario = scenario;
        this.currentStep = 0;
        
        // Add demo message to chat
        if (typeof addMessage !== 'undefined') {
            addMessage(`🎭 Demo started: ${scenario.name}\n${scenario.description}`, 'velvet');
        }
        
        // Execute demo steps
        await this.executeScenario(scenario);
        
        return true;
    }
    
    /**
     * Execute a complete demo scenario
     */
    async executeScenario(scenario) {
        console.log(`🎬 Executing scenario: ${scenario.name}`);
        
        for (let i = 0; i < scenario.steps.length; i++) {
            if (!this.isDemoActive) {
                console.log('🛑 Demo stopped during execution');
                return;
            }
            
            this.currentStep = i;
            const step = scenario.steps[i];
            
            console.log(`▶️ Executing step ${i + 1}/${scenario.steps.length}: ${step.type}`);
            
            await this.executeStep(step);
            
            // Wait for step duration or delay
            const waitTime = step.duration || step.delay || 1000;
            await this.wait(waitTime);
        }
        
        console.log(`✅ Demo scenario completed: ${scenario.name}`);
        
        // Add completion message
        if (typeof addMessage !== 'undefined') {
            addMessage(`✅ Demo completed: ${scenario.name}. All masking detection features demonstrated!`, 'velvet');
        }
        
        this.isDemoActive = false;
        this.currentScenario = null;
    }
    
    /**
     * Execute a single demo step
     */
    async executeStep(step) {
        switch (step.type) {
            case 'context_change':
                await this.simulateContextChange(step);
                break;
                
            case 'high_masking_communication':
                await this.simulateHighMaskingCommunication(step);
                break;
                
            case 'environment_transition':
                await this.simulateEnvironmentTransition(step);
                break;
                
            case 'gradual_unmasking':
                await this.simulateGradualUnmasking(step);
                break;
                
            case 'authenticity_celebration':
                await this.simulateAuthenticityCelebration(step);
                break;
                
            case 'formal_communication':
                await this.simulateFormalCommunication(step);
                break;
                
            case 'masking_awareness_prompt':
                await this.simulateMaskingAwarenessPrompt(step);
                break;
                
            case 'gentle_validation':
                await this.simulateGentleValidation(step);
                break;
                
            case 'casual_communication':
                await this.simulateCasualCommunication(step);
                break;
                
            case 'authenticity_detection':
                await this.simulateAuthenticityDetection(step);
                break;
                
            case 'celebration_prompt':
                await this.simulateCelebrationPrompt(step);
                break;
                
            case 'high_masking_period':
                await this.simulateHighMaskingPeriod(step);
                break;
                
            case 'energy_drain':
                await this.simulateEnergyDrain(step);
                break;
                
            case 'energy_warning':
                await this.simulateEnergyWarning(step);
                break;
                
            case 'safe_space_entry':
                await this.simulateSafeSpaceEntry(step);
                break;
                
            case 'recovery_prompt':
                await this.simulateRecoveryPrompt(step);
                break;
                
            case 'safe_space_detection':
                await this.simulateSafeSpaceDetection(step);
                break;
                
            case 'still_masking_detected':
                await this.simulateStillMaskingDetected(step);
                break;
                
            case 'unmasking_prompt':
                await this.simulateUnmaskingPrompt(step);
                break;
                
            case 'gradual_authenticity':
                await this.simulateGradualAuthenticity(step);
                break;
                
            case 'formal_start':
                await this.simulateFormalStart(step);
                break;
                
            case 'gradual_relaxation':
                await this.simulateGradualRelaxation(step);
                break;
                
            case 'style_shift_detection':
                await this.simulateStyleShiftDetection(step);
                break;
                
            case 'transition_validation':
                await this.simulateTransitionValidation(step);
                break;
                
            default:
                console.warn(`⚠️ Unknown demo step type: ${step.type}`);
        }
    }
    
    // Demo step implementations
    
    async simulateContextChange(step) {
        console.log(`🏠 Simulating context change to ${step.environment}`);
        
        const contextData = this.testDataGenerators.generateContextData(step.environment);
        const maskingData = this.testDataGenerators.generateMaskingData(step.maskingLevel);
        
        // Update UI
        if (typeof updateMaskingLevelUI !== 'undefined') {
            updateMaskingLevelUI(maskingData);
        }
        
        // Trigger context awareness if available
        if (window.contextAwarenessSystem) {
            // Simulate context update
            console.log('📊 Context updated for demo');
        }
    }
    
    async simulateHighMaskingCommunication(step) {
        console.log('💬 Simulating high masking communication');
        
        const maskingData = this.testDataGenerators.generateMaskingData(step.formality);
        maskingData.indicators.formality = step.formality;
        maskingData.indicators.emotionalSuppression = 1 - step.emotion;
        
        if (typeof updateMaskingLevelUI !== 'undefined') {
            updateMaskingLevelUI(maskingData);
        }
        
        // Show in chat
        if (typeof addMessage !== 'undefined') {
            addMessage('I need to ensure all deliverables are completed according to specifications. Please let me know if you require any additional clarification.', 'user');
        }
    }
    
    async simulateEnvironmentTransition(step) {
        console.log(`🔄 Simulating transition from ${step.from} to ${step.to}`);
        
        const contextData = this.testDataGenerators.generateContextData(step.to);
        
        // Show transition message
        if (typeof addMessage !== 'undefined') {
            addMessage(`🏠 Environment changed: ${step.from} → ${step.to}`, 'velvet');
        }
    }
    
    async simulateGradualUnmasking(step) {
        console.log(`📉 Simulating gradual unmasking to ${step.targetMasking}`);
        
        const startMasking = 0.8;
        const targetMasking = step.targetMasking;
        const duration = step.duration;
        const steps = 10;
        
        for (let i = 0; i <= steps; i++) {
            const progress = i / steps;
            const currentMasking = startMasking - (startMasking - targetMasking) * progress;
            
            const maskingData = this.testDataGenerators.generateMaskingData(currentMasking);
            
            if (typeof updateMaskingLevelUI !== 'undefined') {
                updateMaskingLevelUI(maskingData);
            }
            
            await this.wait(duration / steps);
        }
    }
    
    async simulateAuthenticityCelebration(step) {
        console.log('✨ Simulating authenticity celebration');
        
        const celebration = {
            message: "There you are! I love seeing your authentic self. This is who you really are. ✨",
            type: 'authenticity_validation'
        };
        
        if (typeof showAuthenticityValidation !== 'undefined') {
            showAuthenticityValidation(celebration);
        }
        
        if (typeof addMessage !== 'undefined') {
            addMessage(celebration.message, 'velvet');
        }
    }
    
    async simulateFormalCommunication(step) {
        console.log('💼 Simulating formal communication');
        
        const maskingData = this.testDataGenerators.generateMaskingData(step.formality);
        maskingData.indicators.formality = step.formality;
        
        if (typeof updateMaskingLevelUI !== 'undefined') {
            updateMaskingLevelUI(maskingData);
        }
        
        if (typeof addMessage !== 'undefined') {
            addMessage('Certainly, I would appreciate your guidance on this matter. Please let me know how you would like to proceed.', 'user');
        }
    }
    
    async simulateMaskingAwarenessPrompt(step) {
        console.log('👁️ Simulating masking awareness prompt');
        
        const awarenessMessage = "I can sense you're in performance mode right now. You don't need to be polished for me - your authentic thoughts are what I value.";
        
        if (typeof addMessage !== 'undefined') {
            addMessage(awarenessMessage, 'velvet');
        }
    }
    
    async simulateGentleValidation(step) {
        console.log('💜 Simulating gentle validation');
        
        if (typeof addMessage !== 'undefined') {
            addMessage(step.message, 'velvet');
        }
    }
    
    async simulateCasualCommunication(step) {
        console.log('😊 Simulating casual communication');
        
        const maskingData = this.testDataGenerators.generateMaskingData(step.formality);
        maskingData.indicators.formality = step.formality;
        maskingData.indicators.emotionalSuppression = 1 - step.emotion;
        
        if (typeof updateMaskingLevelUI !== 'undefined') {
            updateMaskingLevelUI(maskingData);
        }
        
        if (typeof addMessage !== 'undefined') {
            addMessage('Honestly, this is actually pretty cool! I\'m excited to see how this works out.', 'user');
        }
    }
    
    async simulateAuthenticityDetection(step) {
        console.log('🎯 Simulating authenticity detection');
        
        const maskingData = this.testDataGenerators.generateMaskingData(1 - step.level);
        
        if (typeof updateMaskingLevelUI !== 'undefined') {
            updateMaskingLevelUI(maskingData);
        }
    }
    
    async simulateCelebrationPrompt(step) {
        console.log('🎉 Simulating celebration prompt');
        
        const celebration = {
            message: "Your natural way of speaking is beautiful. No need to polish it.",
            type: 'authenticity_celebration'
        };
        
        if (typeof showAuthenticityValidation !== 'undefined') {
            showAuthenticityValidation(celebration);
        }
        
        if (typeof addMessage !== 'undefined') {
            addMessage(celebration.message, 'velvet');
        }
    }
    
    async simulateHighMaskingPeriod(step) {
        console.log('📈 Simulating high masking period');
        
        const maskingData = this.testDataGenerators.generateMaskingData(step.maskingLevel);
        
        if (typeof updateMaskingLevelUI !== 'undefined') {
            updateMaskingLevelUI(maskingData);
        }
    }
    
    async simulateEnergyDrain(step) {
        console.log('🔋 Simulating energy drain');
        
        const energyData = this.testDataGenerators.generateEnergyData(step.energyLevel);
        
        if (typeof updateEnergyLevelUI !== 'undefined') {
            updateEnergyLevelUI(energyData);
        }
    }
    
    async simulateEnergyWarning(step) {
        console.log('⚠️ Simulating energy warning');
        
        const warningMessage = "Energy critically low. Time for recovery and self-care.";
        
        if (typeof addMessage !== 'undefined') {
            addMessage(`⚡ ${warningMessage}`, 'velvet');
        }
    }
    
    async simulateSafeSpaceEntry(step) {
        console.log('🏠 Simulating safe space entry');
        
        const safetyData = this.testDataGenerators.generateSafetyData(step.safetyLevel, true);
        
        if (typeof updateSafeSpaceLevelUI !== 'undefined') {
            updateSafeSpaceLevelUI(safetyData);
        }
    }
    
    async simulateRecoveryPrompt(step) {
        console.log('🌱 Simulating recovery prompt');
        
        const recoveryMessage = "That was a lot of masking energy. Let's recover together.";
        
        const prompt = {
            prompt: { message: recoveryMessage },
            type: 'recovery_support'
        };
        
        if (typeof showUnmaskingPrompt !== 'undefined') {
            showUnmaskingPrompt(prompt);
        }
        
        if (typeof addMessage !== 'undefined') {
            addMessage(recoveryMessage, 'velvet');
        }
    }
    
    async simulateSafeSpaceDetection(step) {
        console.log('🏠 Simulating safe space detection');
        
        const safetyData = this.testDataGenerators.generateSafetyData(step.safetyLevel, true);
        
        if (typeof updateSafeSpaceLevelUI !== 'undefined') {
            updateSafeSpaceLevelUI(safetyData);
        }
        
        if (typeof addMessage !== 'undefined') {
            addMessage(`🏠 Safe space detected: ${step.environment}`, 'velvet');
        }
    }
    
    async simulateStillMaskingDetected(step) {
        console.log('🎭 Simulating still masking detected');
        
        const maskingData = this.testDataGenerators.generateMaskingData(step.maskingLevel);
        
        if (typeof updateMaskingLevelUI !== 'undefined') {
            updateMaskingLevelUI(maskingData);
        }
    }
    
    async simulateUnmaskingPrompt(step) {
        console.log('💭 Simulating unmasking prompt');
        
        const promptMessage = "You're home now - safe to be yourself. Want to decompress?";
        
        const prompt = {
            prompt: { message: promptMessage },
            type: step.promptType
        };
        
        if (typeof showUnmaskingPrompt !== 'undefined') {
            showUnmaskingPrompt(prompt);
        }
        
        if (typeof addMessage !== 'undefined') {
            addMessage(promptMessage, 'velvet');
        }
    }
    
    async simulateGradualAuthenticity(step) {
        console.log('📈 Simulating gradual authenticity increase');
        
        const startAuthenticity = 0.3;
        const targetAuthenticity = step.targetAuthenticity;
        const duration = step.duration;
        const steps = 8;
        
        for (let i = 0; i <= steps; i++) {
            const progress = i / steps;
            const currentAuthenticity = startAuthenticity + (targetAuthenticity - startAuthenticity) * progress;
            const currentMasking = 1 - currentAuthenticity;
            
            const maskingData = this.testDataGenerators.generateMaskingData(currentMasking);
            
            if (typeof updateMaskingLevelUI !== 'undefined') {
                updateMaskingLevelUI(maskingData);
            }
            
            await this.wait(duration / steps);
        }
    }
    
    async simulateFormalStart(step) {
        console.log('💼 Simulating formal communication start');
        
        const maskingData = this.testDataGenerators.generateMaskingData(step.formality);
        maskingData.indicators.formality = step.formality;
        maskingData.indicators.emotionalSuppression = 1 - step.emotion;
        
        if (typeof updateMaskingLevelUI !== 'undefined') {
            updateMaskingLevelUI(maskingData);
        }
        
        if (typeof addMessage !== 'undefined') {
            addMessage('I would like to discuss this matter in a professional manner. Please advise on the appropriate course of action.', 'user');
        }
    }
    
    async simulateGradualRelaxation(step) {
        console.log('📉 Simulating gradual communication relaxation');
        
        const startFormality = 0.8;
        const targetFormality = step.targetFormality;
        const startEmotion = 0.3;
        const targetEmotion = step.targetEmotion;
        const duration = step.duration;
        const steps = 8;
        
        for (let i = 0; i <= steps; i++) {
            const progress = i / steps;
            const currentFormality = startFormality - (startFormality - targetFormality) * progress;
            const currentEmotion = startEmotion + (targetEmotion - startEmotion) * progress;
            
            const maskingData = this.testDataGenerators.generateMaskingData(currentFormality);
            maskingData.indicators.formality = currentFormality;
            maskingData.indicators.emotionalSuppression = 1 - currentEmotion;
            
            if (typeof updateMaskingLevelUI !== 'undefined') {
                updateMaskingLevelUI(maskingData);
            }
            
            // Add sample messages at certain points
            if (i === 3 && typeof addMessage !== 'undefined') {
                addMessage('Actually, this is pretty interesting. I\'m starting to see the benefits.', 'user');
            } else if (i === 6 && typeof addMessage !== 'undefined') {
                addMessage('Honestly, I\'m excited about this! It feels natural and genuine.', 'user');
            }
            
            await this.wait(duration / steps);
        }
    }
    
    async simulateStyleShiftDetection(step) {
        console.log('🔄 Simulating style shift detection');
        
        if (typeof addMessage !== 'undefined') {
            addMessage('I notice you\'re letting your natural voice come through - it\'s wonderful to hear.', 'velvet');
        }
    }
    
    async simulateTransitionValidation(step) {
        console.log('✨ Simulating transition validation');
        
        if (typeof addMessage !== 'undefined') {
            addMessage(step.message, 'velvet');
        }
    }
    
    /**
     * Stop the current demo
     */
    stopDemo() {
        if (!this.isDemoActive) {
            console.log('ℹ️ No demo currently active');
            return;
        }
        
        console.log('🛑 Stopping demo');
        
        this.isDemoActive = false;
        this.currentScenario = null;
        this.currentStep = 0;
        
        if (this.demoTimeout) {
            clearTimeout(this.demoTimeout);
            this.demoTimeout = null;
        }
        
        if (typeof addMessage !== 'undefined') {
            addMessage('🛑 Demo stopped', 'velvet');
        }
    }
    
    /**
     * Get available demo scenarios
     */
    getAvailableScenarios() {
        return Object.keys(this.demoScenarios).map(key => ({
            id: key,
            name: this.demoScenarios[key].name,
            description: this.demoScenarios[key].description
        }));
    }
    
    /**
     * Get demo status
     */
    getDemoStatus() {
        return {
            isActive: this.isDemoActive,
            currentScenario: this.currentScenario?.name || null,
            currentStep: this.currentStep,
            availableScenarios: this.getAvailableScenarios()
        };
    }
    
    /**
     * Utility method to wait for specified duration
     */
    wait(ms) {
        return new Promise(resolve => {
            this.demoTimeout = setTimeout(resolve, ms);
        });
    }
}

// Global demo functions for console testing
window.testMaskingFatigue = {
    // Start specific demo scenarios
    workToHome: () => {
        if (window.maskingDemo) {
            window.maskingDemo.startDemo('work_to_home_transition');
        } else {
            console.error('❌ Masking demo system not initialized');
        }
    },
    
    professionalMasking: () => {
        if (window.maskingDemo) {
            window.maskingDemo.startDemo('professional_masking_detection');
        } else {
            console.error('❌ Masking demo system not initialized');
        }
    },
    
    authenticityCelebration: () => {
        if (window.maskingDemo) {
            window.maskingDemo.startDemo('authenticity_celebration');
        } else {
            console.error('❌ Masking demo system not initialized');
        }
    },
    
    energyDepletion: () => {
        if (window.maskingDemo) {
            window.maskingDemo.startDemo('energy_depletion_recovery');
        } else {
            console.error('❌ Masking demo system not initialized');
        }
    },
    
    safeSpaceUnmasking: () => {
        if (window.maskingDemo) {
            window.maskingDemo.startDemo('safe_space_unmasking');
        } else {
            console.error('❌ Masking demo system not initialized');
        }
    },
    
    styleShift: () => {
        if (window.maskingDemo) {
            window.maskingDemo.startDemo('communication_style_shift');
        } else {
            console.error('❌ Masking demo system not initialized');
        }
    },
    
    // Utility functions
    stopDemo: () => {
        if (window.maskingDemo) {
            window.maskingDemo.stopDemo();
        }
    },
    
    showScenarios: () => {
        if (window.maskingDemo) {
            const scenarios = window.maskingDemo.getAvailableScenarios();
            console.log('🎭 Available Masking Fatigue Demo Scenarios:');
            scenarios.forEach(scenario => {
                console.log(`▶️ ${scenario.name}: ${scenario.description}`);
            });
        }
    },
    
    status: () => {
        if (window.maskingDemo) {
            const status = window.maskingDemo.getDemoStatus();
            console.log('🎭 Demo Status:', status);
        }
    }
};

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MaskingFatigueDemo;
} else if (typeof window !== 'undefined') {
    window.MaskingFatigueDemo = MaskingFatigueDemo;
}

console.log('🎭 Masking Fatigue Demo System loaded');
console.log('🧪 Test functions available: window.testMaskingFatigue');
console.log('📋 Available demos: workToHome, professionalMasking, authenticityCelebration, energyDepletion, safeSpaceUnmasking, styleShift');