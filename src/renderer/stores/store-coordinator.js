// Store Coordinator - Manages state synchronization and cross-feature coordination
// Ensures all viral features work together seamlessly with optimized performance

import { useVelvetStore } from './velvet-state-simple.js';

/**
 * StoreCoordinator
 * 
 * Manages the integration between the new Zustand stores and existing features:
 * - Coordinates state updates across all viral features
 * - Manages cross-feature interactions and priorities
 * - Optimizes performance through selective updates
 * - Provides unified API for existing features to integrate with stores
 */
class StoreCoordinator {
    constructor() {
        console.log('🎯 Initializing Store Coordinator...');
        
        this.isInitialized = false;
        this.activeSubscriptions = new Map();
        this.updateQueue = [];
        this.processingQueue = false;
        
        // Performance tracking
        this.performanceMetrics = {
            totalUpdates: 0,
            averageUpdateTime: 0,
            crossFeatureInteractions: 0,
            optimizationsApplied: 0
        };
        
        // Feature integration status
        this.integrationStatus = {
            socialDecoder: false,
            executiveDysfunction: false,
            maskingFatigue: false,
            velvetBrain: false
        };
        
        // Update debouncing
        this.debouncedUpdates = new Map();
        this.debounceDelay = 100; // 100ms debounce
        
        console.log('🎯 Store Coordinator core initialized');
    }
    
    /**
     * Initialize the store coordinator and set up integrations
     */
    async initialize() {
        try {
            console.log('🎯 Starting Store Coordinator initialization...');
            
            // Initialize store subscriptions
            this.setupStoreSubscriptions();
            
            // Set up cross-feature coordination
            this.setupCrossFeatureCoordination();
            
            // Initialize performance monitoring
            this.setupPerformanceMonitoring();
            
            // Set up existing feature integrations
            await this.integrateExistingFeatures();
            
            this.isInitialized = true;
            console.log('✅ Store Coordinator fully initialized');
            
            return true;
            
        } catch (error) {
            console.error('❌ Store Coordinator initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Set up store subscriptions for cross-feature coordination
     */
    setupStoreSubscriptions() {
        console.log('📡 Setting up store subscriptions...');
        
        const store = useVelvetStore.getState();
        
        // Subscribe to Social Decoder changes
        const unsubscribeSocial = useVelvetStore.subscribe(
            (state) => state.socialDecoder,
            (socialState, prevSocialState) => {
                this.handleSocialDecoderUpdate(socialState, prevSocialState);
            },
            { equalityFn: (a, b) => a.currentAnalysis?.timestamp === b.currentAnalysis?.timestamp }
        );
        this.activeSubscriptions.set('socialDecoder', unsubscribeSocial);
        
        // Subscribe to Executive Dysfunction changes
        const unsubscribeED = useVelvetStore.subscribe(
            (state) => state.executiveDysfunction,
            (edState, prevEDState) => {
                this.handleExecutiveDysfunctionUpdate(edState, prevEDState);
            },
            { equalityFn: (a, b) => a.currentCrisisLevel === b.currentCrisisLevel && a.energyLevel === b.energyLevel }
        );
        this.activeSubscriptions.set('executiveDysfunction', unsubscribeED);
        
        // Subscribe to Masking Fatigue changes
        const unsubscribeMasking = useVelvetStore.subscribe(
            (state) => state.maskingFatigue,
            (maskingState, prevMaskingState) => {
                this.handleMaskingFatigueUpdate(maskingState, prevMaskingState);
            },
            { equalityFn: (a, b) => Math.abs(a.currentMaskingLevel - b.currentMaskingLevel) < 0.1 }
        );
        this.activeSubscriptions.set('maskingFatigue', unsubscribeMasking);
        
        // Subscribe to Velvet Brain changes
        const unsubscribeBrain = useVelvetStore.subscribe(
            (state) => state.velvetBrain,
            (brainState, prevBrainState) => {
                this.handleVelvetBrainUpdate(brainState, prevBrainState);
            },
            { equalityFn: (a, b) => a.currentThoughtCycle.cycleNumber === b.currentThoughtCycle.cycleNumber }
        );
        this.activeSubscriptions.set('velvetBrain', unsubscribeBrain);
        
        // Subscribe to user context changes for cross-feature coordination
        const unsubscribeContext = useVelvetStore.subscribe(
            (state) => state.userContext,
            (contextState, prevContextState) => {
                this.handleUserContextUpdate(contextState, prevContextState);
            }
        );
        this.activeSubscriptions.set('userContext', unsubscribeContext);
        
        console.log('✅ Store subscriptions configured');
    }
    
    /**
     * Set up cross-feature coordination logic
     */
    setupCrossFeatureCoordination() {
        console.log('🔗 Setting up cross-feature coordination...');
        
        // Set up coordination rules
        this.coordinationRules = {
            // Social Decoder + Masking Fatigue
            social_masking: {
                trigger: (socialState, maskingState) => {
                    return socialState.isMeetingMode && maskingState.currentMaskingLevel > 0.6;
                },
                action: (socialState, maskingState) => {
                    this.coordinateSocialMasking(socialState, maskingState);
                }
            },
            
            // Executive Dysfunction + Masking Fatigue
            executive_masking: {
                trigger: (edState, maskingState) => {
                    return edState.currentCrisisLevel !== 'none' && maskingState.energyLevel < 0.4;
                },
                action: (edState, maskingState) => {
                    this.coordinateExecutiveMasking(edState, maskingState);
                }
            },
            
            // Social Decoder + Executive Dysfunction
            social_executive: {
                trigger: (socialState, edState) => {
                    return socialState.isMeetingMode && edState.currentCrisisLevel === 'crisis';
                },
                action: (socialState, edState) => {
                    this.coordinateSocialExecutive(socialState, edState);
                }
            },
            
            // Velvet Brain coordination with all features
            brain_coordination: {
                trigger: (brainState, allStates) => {
                    return brainState.isActive && brainState.consciousnessLevel > 0.7;
                },
                action: (brainState, allStates) => {
                    this.coordinateBrainWithAllFeatures(brainState, allStates);
                }
            }
        };
        
        console.log('✅ Cross-feature coordination configured');
    }
    
    /**
     * Set up performance monitoring
     */
    setupPerformanceMonitoring() {
        console.log('📊 Setting up performance monitoring...');
        
        // Monitor store update performance
        this.performanceMonitorInterval = setInterval(() => {
            this.updatePerformanceMetrics();
        }, 5000);
        
        // Monitor memory usage
        this.memoryMonitorInterval = setInterval(() => {
            this.monitorMemoryUsage();
        }, 30000);
        
        console.log('✅ Performance monitoring configured');
    }
    
    /**
     * Integrate existing features with the new store system
     */
    async integrateExistingFeatures() {
        console.log('🔧 Integrating existing features...');
        
        try {
            // Integrate Social Decoder
            await this.integrateSocialDecoder();
            
            // Integrate Executive Dysfunction
            await this.integrateExecutiveDysfunction();
            
            // Integrate Masking Fatigue
            await this.integrateMaskingFatigue();
            
            // Integrate Velvet Brain
            await this.integrateVelvetBrain();
            
            console.log('✅ All features integrated with store system');
            
        } catch (error) {
            console.error('❌ Feature integration failed:', error);
        }
    }
    
    /**
     * Integrate Social Decoder with store
     */
    async integrateSocialDecoder() {
        try {
            console.log('🎭 Integrating Social Decoder...');
            
            if (window.ViralSocialDecoder || window.viralSocialDecoder) {
                const decoder = window.viralSocialDecoder || window.ViralSocialDecoder;
                
                // Override key methods to use store
                if (decoder && typeof decoder.processEnhancedAnalysis === 'function') {
                    const originalProcessAnalysis = decoder.processEnhancedAnalysis.bind(decoder);
                    
                    decoder.processEnhancedAnalysis = (analysis) => {
                        // Call original method
                        originalProcessAnalysis(analysis);
                        
                        // Update store
                        useVelvetStore.getState().updateSocialAnalysis(analysis);
                    };
                }
                
                // Override meeting mode activation
                if (decoder && typeof decoder.activateMeetingMode === 'function') {
                    const originalActivateMeeting = decoder.activateMeetingMode.bind(decoder);
                    
                    decoder.activateMeetingMode = (meetingData) => {
                        // Call original method
                        originalActivateMeeting(meetingData);
                        
                        // Update store
                        useVelvetStore.getState().activateMeetingMode(meetingData);
                    };
                }
                
                // Override intervention triggering
                if (decoder && typeof decoder.triggerLiveIntervention === 'function') {
                    const originalTriggerIntervention = decoder.triggerLiveIntervention.bind(decoder);
                    
                    decoder.triggerLiveIntervention = (intervention, analysis) => {
                        // Call original method
                        originalTriggerIntervention(intervention, analysis);
                        
                        // Update store
                        useVelvetStore.getState().triggerSocialIntervention({
                            ...intervention,
                            analysis,
                            timestamp: Date.now()
                        });
                    };
                }
                
                // Initialize in store
                useVelvetStore.getState().initializeSocialDecoder();
                this.integrationStatus.socialDecoder = true;
                
                console.log('✅ Social Decoder integrated');
            }
            
        } catch (error) {
            console.error('❌ Social Decoder integration failed:', error);
        }
    }
    
    /**
     * Integrate Executive Dysfunction with store
     */
    async integrateExecutiveDysfunction() {
        try {
            console.log('🚨 Integrating Executive Dysfunction...');
            
            if (window.executiveDysfunctionUI) {
                const edUI = window.executiveDysfunctionUI;
                
                // Override crisis intervention handling
                if (edUI && typeof edUI.handleCrisisIntervention === 'function') {
                    const originalHandleCrisis = edUI.handleCrisisIntervention.bind(edUI);
                    
                    edUI.handleCrisisIntervention = (data) => {
                        // Call original method
                        originalHandleCrisis(data);
                        
                        // Update store
                        useVelvetStore.getState().triggerCrisisIntervention({
                            pattern: data.pattern,
                            intervention: data.intervention,
                            level: data.intervention.level,
                            timestamp: Date.now()
                        });
                    };
                }
                
                // Override safe space activation
                if (edUI && typeof edUI.activateSafeSpace === 'function') {
                    const originalActivateSafeSpace = edUI.activateSafeSpace.bind(edUI);
                    
                    edUI.activateSafeSpace = () => {
                        // Call original method
                        originalActivateSafeSpace();
                        
                        // Update store
                        useVelvetStore.getState().activateSafeSpace();
                    };
                }
                
                // Initialize in store
                useVelvetStore.getState().initializeExecutiveDysfunction();
                this.integrationStatus.executiveDysfunction = true;
                
                console.log('✅ Executive Dysfunction integrated');
            }
            
        } catch (error) {
            console.error('❌ Executive Dysfunction integration failed:', error);
        }
    }
    
    /**
     * Integrate Masking Fatigue with store
     */
    async integrateMaskingFatigue() {
        try {
            console.log('🎭 Integrating Masking Fatigue...');
            
            if (window.MaskingFatigueDetector) {
                const detector = window.MaskingFatigueDetector;
                
                // Create instance if needed
                if (!window.maskingFatigueDetector) {
                    window.maskingFatigueDetector = new detector();
                }
                
                const maskingDetector = window.maskingFatigueDetector;
                
                // Override masking level updates
                if (maskingDetector && typeof maskingDetector.emit === 'function') {
                    maskingDetector.on('maskingLevelChanged', (data) => {
                        useVelvetStore.getState().updateMaskingLevel(data);
                    });
                    
                    maskingDetector.on('unmaskingOpportunity', (data) => {
                        useVelvetStore.getState().triggerUnmaskingOpportunity(data);
                    });
                    
                    maskingDetector.on('energyLevelChanged', (data) => {
                        useVelvetStore.getState().updateEnergyTracking(data);
                    });
                }
                
                // Initialize in store
                useVelvetStore.getState().initializeMaskingFatigue();
                this.integrationStatus.maskingFatigue = true;
                
                console.log('✅ Masking Fatigue integrated');
            }
            
        } catch (error) {
            console.error('❌ Masking Fatigue integration failed:', error);
        }
    }
    
    /**
     * Integrate Velvet Brain with store
     */
    async integrateVelvetBrain() {
        try {
            console.log('🧠 Integrating Velvet Brain...');
            
            if (window.VelvetBrain) {
                const VelvetBrain = window.VelvetBrain;
                
                // Create instance if needed
                if (!window.velvetBrain) {
                    window.velvetBrain = new VelvetBrain();
                }
                
                const brain = window.velvetBrain;
                
                // Override consciousness callbacks
                if (brain && typeof brain.onConsciousnessUpdate === 'function') {
                    brain.onConsciousnessUpdate((data) => {
                        useVelvetStore.getState().updateThoughtCycle({
                            cycleNumber: data.cycle,
                            stage: 'completed',
                            duration: data.duration,
                            context: data.context,
                            action: data.action
                        });
                    });
                }
                
                // Override experience storage
                if (brain && typeof brain.learn === 'function') {
                    const originalLearn = brain.learn.bind(brain);
                    
                    brain.learn = async (currentState, context, action, outcome) => {
                        // Call original method
                        await originalLearn(currentState, context, action, outcome);
                        
                        // Store in unified state
                        useVelvetStore.getState().storeExperience({
                            timestamp: Date.now(),
                            state: currentState,
                            context,
                            action,
                            outcome,
                            success: outcome.success || false
                        });
                    };
                }
                
                // Initialize in store
                useVelvetStore.getState().initializeVelvetBrain();
                this.integrationStatus.velvetBrain = true;
                
                console.log('✅ Velvet Brain integrated');
            }
            
        } catch (error) {
            console.error('❌ Velvet Brain integration failed:', error);
        }
    }
    
    // ===========================================
    // STORE UPDATE HANDLERS
    // ===========================================
    
    /**
     * Handle Social Decoder state updates
     */
    handleSocialDecoderUpdate(socialState, prevSocialState) {
        if (!prevSocialState) return;
        
        console.log('🎭 Social Decoder state updated');
        
        // Check for meeting mode changes
        if (socialState.isMeetingMode !== prevSocialState.isMeetingMode) {
            this.handleMeetingModeChange(socialState.isMeetingMode, socialState);
        }
        
        // Check for new interventions
        if (socialState.activeIntervention && 
            socialState.activeIntervention !== prevSocialState.activeIntervention) {
            this.handleNewSocialIntervention(socialState.activeIntervention);
        }
        
        // Update performance metrics
        this.performanceMetrics.totalUpdates++;
    }
    
    /**
     * Handle Executive Dysfunction state updates
     */
    handleExecutiveDysfunctionUpdate(edState, prevEDState) {
        if (!prevEDState) return;
        
        console.log('🚨 Executive Dysfunction state updated');
        
        // Check for crisis level changes
        if (edState.currentCrisisLevel !== prevEDState.currentCrisisLevel) {
            this.handleCrisisLevelChange(edState.currentCrisisLevel, edState);
        }
        
        // Check for energy level changes
        if (Math.abs(edState.energyLevel - prevEDState.energyLevel) > 0.1) {
            this.handleEnergyLevelChange(edState.energyLevel, edState);
        }
        
        this.performanceMetrics.totalUpdates++;
    }
    
    /**
     * Handle Masking Fatigue state updates
     */
    handleMaskingFatigueUpdate(maskingState, prevMaskingState) {
        if (!prevMaskingState) return;
        
        console.log('🎭 Masking Fatigue state updated');
        
        // Check for significant masking level changes
        if (Math.abs(maskingState.currentMaskingLevel - prevMaskingState.currentMaskingLevel) > 0.2) {
            this.handleMaskingLevelChange(maskingState.currentMaskingLevel, maskingState);
        }
        
        // Check for context changes
        if (maskingState.contextAwareness.currentEnvironment !== 
            prevMaskingState.contextAwareness.currentEnvironment) {
            this.handleEnvironmentChange(maskingState.contextAwareness, maskingState);
        }
        
        this.performanceMetrics.totalUpdates++;
    }
    
    /**
     * Handle Velvet Brain state updates
     */
    handleVelvetBrainUpdate(brainState, prevBrainState) {
        if (!prevBrainState) return;
        
        console.log('🧠 Velvet Brain state updated');
        
        // Check for consciousness level changes
        if (Math.abs(brainState.consciousnessLevel - prevBrainState.consciousnessLevel) > 0.1) {
            this.handleConsciousnessChange(brainState.consciousnessLevel, brainState);
        }
        
        // Check for new thought cycles
        if (brainState.currentThoughtCycle.cycleNumber !== 
            prevBrainState.currentThoughtCycle.cycleNumber) {
            this.handleNewThoughtCycle(brainState.currentThoughtCycle);
        }
        
        this.performanceMetrics.totalUpdates++;
    }
    
    /**
     * Handle User Context updates for cross-feature coordination
     */
    handleUserContextUpdate(contextState, prevContextState) {
        if (!prevContextState) return;
        
        console.log('👤 User Context updated');
        
        // Update all features with new context
        this.propagateContextToFeatures(contextState, prevContextState);
        
        this.performanceMetrics.totalUpdates++;
    }
    
    // ===========================================
    // CROSS-FEATURE COORDINATION METHODS
    // ===========================================
    
    /**
     * Coordinate Social Decoder and Masking Fatigue during meetings
     */
    coordinateSocialMasking(socialState, maskingState) {
        console.log('🔗 Coordinating Social Decoder + Masking Fatigue');
        
        const coordination = {
            active: true,
            data: {
                meetingMaskingLevel: maskingState.currentMaskingLevel,
                socialTension: socialState.meetingContext.socialTension,
                energyImpact: maskingState.currentMaskingLevel * 0.1,
                recommendations: []
            },
            timestamp: Date.now()
        };
        
        // High masking during meetings = energy drain
        if (maskingState.currentMaskingLevel > 0.8) {
            coordination.data.recommendations.push('High masking detected in meeting - monitor energy');
            
            // Suggest unmasking if possible
            if (maskingState.safeSpaceDetection.currentSafetyLevel > 0.6) {
                coordination.data.recommendations.push('Consider more authentic expression');
            }
        }
        
        // Update coordination state
        useVelvetStore.getState().coordination.interactions.social_masking = coordination;
        this.performanceMetrics.crossFeatureInteractions++;
    }
    
    /**
     * Coordinate Executive Dysfunction and Masking Fatigue
     */
    coordinateExecutiveMasking(edState, maskingState) {
        console.log('🔗 Coordinating Executive Dysfunction + Masking Fatigue');
        
        const coordination = {
            active: true,
            data: {
                crisisLevel: edState.currentCrisisLevel,
                energyImpact: maskingState.energyLevel < 0.3 ? 0.3 : 0.1,
                maskingDrainRate: maskingState.currentMaskingLevel * 0.2,
                recommendations: []
            },
            timestamp: Date.now()
        };
        
        // Crisis + low energy = urgent intervention needed
        if (edState.currentCrisisLevel === 'crisis' && maskingState.energyLevel < 0.2) {
            coordination.data.recommendations.push('Critical: Masking is draining remaining energy during crisis');
            
            // Trigger unified intervention
            useVelvetStore.getState().triggerUnifiedIntervention({
                type: 'energy_crisis',
                priority: 'critical',
                source: 'coordination',
                intervention: {
                    message: 'Energy critically low during crisis. Immediate authenticity break needed.',
                    actions: ['activate_safe_space', 'reduce_masking', 'energy_recovery']
                },
                timestamp: Date.now()
            });
        }
        
        useVelvetStore.getState().coordination.interactions.executive_masking = coordination;
        this.performanceMetrics.crossFeatureInteractions++;
    }
    
    /**
     * Coordinate Social Decoder and Executive Dysfunction during crisis meetings
     */
    coordinateSocialExecutive(socialState, edState) {
        console.log('🔗 Coordinating Social Decoder + Executive Dysfunction');
        
        const coordination = {
            active: true,
            data: {
                meetingCrisis: true,
                priority: 'high',
                recommendations: []
            },
            timestamp: Date.now()
        };
        
        // Crisis during meeting = special handling
        coordination.data.recommendations.push('Crisis detected during meeting - prioritize user wellbeing');
        
        // Suggest meeting strategies
        if (socialState.currentAnalysis) {
            coordination.data.recommendations.push('Social support available for meeting navigation');
        }
        
        useVelvetStore.getState().coordination.interactions.social_executive = coordination;
        this.performanceMetrics.crossFeatureInteractions++;
    }
    
    /**
     * Coordinate Velvet Brain with all other features
     */
    coordinateBrainWithAllFeatures(brainState, allStates) {
        console.log('🔗 Coordinating Velvet Brain with all features');
        
        // Brain provides unified intelligence layer
        const unifiedContext = {
            consciousnessLevel: brainState.consciousnessLevel,
            socialContext: allStates.socialDecoder.isMeetingMode ? 'meeting' : 'none',
            crisisLevel: allStates.executiveDysfunction.currentCrisisLevel,
            maskingLevel: allStates.maskingFatigue.currentMaskingLevel,
            energyLevel: allStates.executiveDysfunction.energyLevel,
            timestamp: Date.now()
        };
        
        // Update brain with unified context for next thought cycle
        if (window.velvetBrain && typeof window.velvetBrain.updateContext === 'function') {
            window.velvetBrain.updateContext(unifiedContext);
        }
        
        this.performanceMetrics.crossFeatureInteractions++;
    }
    
    // ===========================================
    // CHANGE HANDLERS
    // ===========================================
    
    handleMeetingModeChange(isMeetingMode, socialState) {
        console.log(`📹 Meeting mode ${isMeetingMode ? 'activated' : 'deactivated'}`);
        
        if (isMeetingMode) {
            // Meeting started - increase masking awareness
            if (this.integrationStatus.maskingFatigue) {
                useVelvetStore.getState().updateCoordinationPriorities({
                    socialDecoder: 0.9,
                    maskingFatigue: 0.8
                });
            }
        } else {
            // Meeting ended - potential unmasking opportunity
            if (this.integrationStatus.maskingFatigue) {
                useVelvetStore.getState().updateCoordinationPriorities({
                    socialDecoder: 0.5,
                    maskingFatigue: 0.9 // Higher priority for recovery
                });
            }
        }
    }
    
    handleCrisisLevelChange(crisisLevel, edState) {
        console.log(`🚨 Crisis level changed to: ${crisisLevel}`);
        
        // Crisis = highest priority
        if (crisisLevel === 'crisis') {
            useVelvetStore.getState().updateCoordinationPriorities({
                executiveDysfunction: 1.0,
                socialDecoder: 0.3,
                maskingFatigue: 0.3
            });
        } else if (crisisLevel === 'none') {
            // Reset priorities
            useVelvetStore.getState().updateCoordinationPriorities({
                executiveDysfunction: 0.5,
                socialDecoder: 0.5,
                maskingFatigue: 0.5
            });
        }
    }
    
    handleEnergyLevelChange(energyLevel, edState) {
        console.log(`⚡ Energy level changed to: ${energyLevel.toFixed(2)}`);
        
        // Low energy affects all features
        if (energyLevel < 0.3) {
            // Reduce intervention frequency for all features
            this.coordinationRules.social_masking.trigger = () => false; // Temporarily disable
            this.performanceMetrics.optimizationsApplied++;
        } else if (energyLevel > 0.7) {
            // Re-enable full functionality
            this.setupCrossFeatureCoordination(); // Reset rules
        }
    }
    
    handleMaskingLevelChange(maskingLevel) {
        console.log(`🎭 Masking level changed to: ${maskingLevel.toFixed(2)}`);
        
        // High masking = prioritize authenticity support
        if (maskingLevel > 0.8) {
            useVelvetStore.getState().updateCoordinationPriorities({
                maskingFatigue: 0.9
            });
        }
    }
    
    handleEnvironmentChange(contextAwareness) {
        console.log(`🏠 Environment changed to: ${contextAwareness.currentEnvironment}`);
        
        // Update all features with new environment context
        useVelvetStore.getState().updateUserContext({
            environment: {
                type: contextAwareness.currentEnvironment,
                confidence: contextAwareness.environmentConfidence,
                lastUpdate: Date.now()
            }
        });
    }
    
    // ===========================================
    // PERFORMANCE MONITORING
    // ===========================================
    
    updatePerformanceMetrics() {
        const store = useVelvetStore.getState();
        
        this.performanceMetrics.averageUpdateTime = 
            store.system.performanceMetrics.averageUpdateTime;
        
        console.log('📊 Store Coordinator Performance:', {
            totalUpdates: this.performanceMetrics.totalUpdates,
            averageUpdateTime: this.performanceMetrics.averageUpdateTime.toFixed(2) + 'ms',
            crossFeatureInteractions: this.performanceMetrics.crossFeatureInteractions,
            optimizationsApplied: this.performanceMetrics.optimizationsApplied
        });
    }
    
    monitorMemoryUsage() {
        const store = useVelvetStore.getState();
        
        // Monitor store size
        const storeSize = JSON.stringify(store).length;
        const maxSize = 5 * 1024 * 1024; // 5MB limit
        
        if (storeSize > maxSize) {
            console.warn('⚠️ Store size approaching limit, cleaning up...');
            this.cleanupStoreData();
        }
    }
    
    cleanupStoreData() {
        const { resetFeature } = useVelvetStore.getState();
        
        // Clean up old data from each feature
        resetFeature('socialDecoder');
        resetFeature('executiveDysfunction');
        resetFeature('maskingFatigue');
        
        console.log('🧹 Store data cleanup completed');
        this.performanceMetrics.optimizationsApplied++;
    }
    
    // ===========================================
    // PUBLIC API
    // ===========================================
    
    /**
     * Get integration status
     */
    getIntegrationStatus() {
        return {
            coordinator: this.isInitialized,
            features: this.integrationStatus,
            performance: this.performanceMetrics
        };
    }
    
    /**
     * Manually trigger cross-feature coordination
     */
    triggerCoordination() {
        const state = useVelvetStore.getState();
        
        // Check all coordination rules
        Object.keys(this.coordinationRules).forEach(ruleKey => {
            const rule = this.coordinationRules[ruleKey];
            
            switch (ruleKey) {
                case 'social_masking':
                    if (rule.trigger(state.socialDecoder, state.maskingFatigue)) {
                        rule.action(state.socialDecoder, state.maskingFatigue);
                    }
                    break;
                case 'executive_masking':
                    if (rule.trigger(state.executiveDysfunction, state.maskingFatigue)) {
                        rule.action(state.executiveDysfunction, state.maskingFatigue);
                    }
                    break;
                case 'social_executive':
                    if (rule.trigger(state.socialDecoder, state.executiveDysfunction)) {
                        rule.action(state.socialDecoder, state.executiveDysfunction);
                    }
                    break;
                case 'brain_coordination':
                    if (rule.trigger(state.velvetBrain, state)) {
                        rule.action(state.velvetBrain, state);
                    }
                    break;
            }
        });
    }
    
    /**
     * Clean shutdown
     */
    async shutdown() {
        console.log('🛑 Shutting down Store Coordinator...');
        
        // Clear intervals
        if (this.performanceMonitorInterval) {
            clearInterval(this.performanceMonitorInterval);
        }
        if (this.memoryMonitorInterval) {
            clearInterval(this.memoryMonitorInterval);
        }
        
        // Unsubscribe from all store subscriptions
        this.activeSubscriptions.forEach((unsubscribe, key) => {
            unsubscribe();
            console.log(`📡 Unsubscribed from ${key}`);
        });
        this.activeSubscriptions.clear();
        
        this.isInitialized = false;
        console.log('✅ Store Coordinator shutdown complete');
    }
}

// Create global instance
const storeCoordinator = new StoreCoordinator();

// Make available globally
window.storeCoordinator = storeCoordinator;

export default storeCoordinator;

console.log('🎯 Store Coordinator loaded - ready for unified state management');