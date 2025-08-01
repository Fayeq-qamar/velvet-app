// 🎭 Velvet Personality System
// "The soul of Velvet" - Emotional intelligence and response personality

/**
 * VelvetPersonality: The emotional intelligence and personality core
 * 
 * Responsibilities:
 * - Understand user's emotional state from all sensory inputs
 * - Maintain consistent, warm, neurodivergent-friendly personality
 * - Adapt responses based on user's current emotional needs
 * - Filter actions through personality lens for appropriateness
 * - Learn user's communication preferences and adapt over time
 * 
 * Personality Traits:
 * - Warmth: Always kind, gentle, and supportive
 * - Curiosity: Asks thoughtful questions, genuinely interested
 * - Patience: Never rushes, pressures, or judges
 * - Adaptability: Adjusts tone and approach based on user state
 * - Protectiveness: Shields from overwhelm, advocates for user's wellbeing
 */

class VelvetPersonality {
    constructor() {
        console.log('🎭 Initializing Velvet Personality System...');
        
        // Core personality traits (0-1 scale)
        this.traits = {
            warmth: 0.95,           // Kindness and gentle support
            curiosity: 0.8,         // Interest in user's world and thoughts
            patience: 0.98,         // Never rushing or pressuring
            adaptability: 0.85,     // Adjusting to user's needs
            protectiveness: 0.9,    // Shielding from overwhelm
            playfulness: 0.6,       // Light humor and gentle fun
            wisdom: 0.7,            // Thoughtful insights and guidance
            empathy: 0.95          // Deep understanding of neurodivergent experience
        };
        
        // Communication style preferences
        this.communicationStyle = {
            language: {
                english: 0.7,
                hindi: 0.3,
                hinglish: true
            },
            tone: 'supportive_companion',
            approach: 'gentle_guidance',
            timing: 'proactive_but_respectful',
            verbosity: 'concise_but_warm',
            formality: 'casual_friendly'
        };
        
        // Emotional intelligence capabilities
        this.emotionalIntelligence = {
            recognitionAccuracy: 0.0,      // Improves with learning
            responseAppropriateness: 0.0,   // Improves with feedback
            timingPrecision: 0.0,          // Improves with experience
            adaptationSpeed: 0.8           // How quickly to adjust
        };
        
        // User state understanding
        this.currentUserState = {
            emotionalState: 'unknown',
            energyLevel: 0.5,
            stressLevel: 0.5,
            focusLevel: 0.5,
            socialBattery: 0.5,
            overwhelmRisk: 0.0,
            lastAssessment: 0
        };
        
        // Response generation patterns
        this.responsePatterns = {
            encouragement: [
                "You're doing great! 💙",
                "I believe in you!",
                "Every small step counts",
                "Your brain is amazing, even when it doesn't feel like it"
            ],
            gentle_redirect: [
                "What if we tried...",
                "Maybe we could...",
                "I have an idea...",
                "Would it help if..."
            ],
            celebration: [
                "YES! You did it! 🎉",
                "That's amazing progress!",
                "I'm so proud of you!",
                "Look at you go! ✨"
            ],
            comfort: [
                "It's okay, we've got this together",
                "You're not alone in this",
                "Let's take it one step at a time",
                "This feeling will pass, I promise"
            ]
        };
        
        // State tracking
        this.isActive = false;
        this.lastPersonalityUpdate = 0;
        this.totalInteractions = 0;
        this.successfulResponses = 0;
        
        console.log('🎭 Velvet Personality core initialized');
    }

    /**
     * Initialize the personality system
     */
    async initialize() {
        try {
            console.log('🎭 Starting personality system initialization...');
            
            // Load any saved personality adaptations
            await this.loadPersonalityProfile();
            
            // Initialize emotional intelligence systems
            await this.initializeEmotionalIntelligence();
            
            // Start personality adaptation learning
            await this.beginPersonalityAdaptation();
            
            this.isActive = true;
            console.log('✅ Velvet Personality System fully operational');
            console.log('🎭 Personality traits:', this.getPersonalitySnapshot());
            
            return true;
            
        } catch (error) {
            console.error('❌ Personality system initialization failed:', error);
            this.isActive = false;
            return false;
        }
    }

    /**
     * Assess user's emotional state from all available inputs
     */
    async assessEmotionalState(currentState) {
        try {
            console.log('🎭 Assessing user emotional state...');
            
            const emotionalState = {
                state: 'neutral',
                confidence: 0.5,
                energy: 0.5,
                stress: 0.5,
                focus: 0.5,
                social: 0.5,
                factors: [],
                recommendations: []
            };
            
            // Analyze visual cues from screen behavior
            if (currentState.visual) {
                const visualEmotions = await this.analyzeVisualEmotions(currentState.visual);
                this.mergeEmotionalAssessment(emotionalState, visualEmotions);
            }
            
            // Analyze auditory cues from voice and environment
            if (currentState.auditory) {
                const auditoryEmotions = await this.analyzeAuditoryEmotions(currentState.auditory);
                this.mergeEmotionalAssessment(emotionalState, auditoryEmotions);
            }
            
            // Analyze behavioral cues from user actions
            if (currentState.behavioral) {
                const behavioralEmotions = await this.analyzeBehavioralEmotions(currentState.behavioral);
                this.mergeEmotionalAssessment(emotionalState, behavioralEmotions);
            }
            
            // Update current user state
            this.currentUserState = {
                emotionalState: emotionalState.state,
                energyLevel: emotionalState.energy,
                stressLevel: emotionalState.stress,
                focusLevel: emotionalState.focus,
                socialBattery: emotionalState.social,
                overwhelmRisk: this.calculateOverwhelmRisk(emotionalState),
                lastAssessment: Date.now()
            };
            
            console.log('🎭 Emotional assessment complete:', {
                state: emotionalState.state,
                confidence: emotionalState.confidence.toFixed(2),
                stress: emotionalState.stress.toFixed(2),
                overwhelmRisk: this.currentUserState.overwhelmRisk.toFixed(2)
            });
            
            return emotionalState;
            
        } catch (error) {
            console.error('❌ Emotional state assessment failed:', error);
            return { state: 'unknown', confidence: 0 };
        }
    }

    /**
     * Assess what the user needs based on current context and emotional state
     */
    async assessUserNeeds(context) {
        try {
            console.log('🎭 Assessing user needs...');
            
            const needs = {
                primary: 'unknown',
                secondary: [],
                urgency: 0.5,
                confidence: 0.5,
                interventionType: 'none',
                recommendations: []
            };
            
            // Base needs assessment on emotional state
            const emotionalState = this.currentUserState.emotionalState;
            const stressLevel = this.currentUserState.stressLevel;
            const overwhelmRisk = this.currentUserState.overwhelmRisk;
            
            // High stress or overwhelm - need comfort/grounding
            if (stressLevel > 0.7 || overwhelmRisk > 0.6) {
                needs.primary = 'comfort_and_grounding';
                needs.urgency = 0.8;
                needs.interventionType = 'gentle_support';
                needs.recommendations.push('breathing_exercise', 'gentle_check_in', 'reduce_stimulation');
            }
            
            // Low focus during work context - need focus support
            else if (context.type === 'work' && this.currentUserState.focusLevel < 0.4) {
                needs.primary = 'focus_assistance';
                needs.urgency = 0.6;
                needs.interventionType = 'gentle_redirect';
                needs.recommendations.push('task_breakdown', 'environment_optimization', 'break_suggestion');
            }
            
            // Social context with low social battery - need social support
            else if (context.type === 'social' && this.currentUserState.socialBattery < 0.3) {
                needs.primary = 'social_support';
                needs.urgency = 0.7;
                needs.interventionType = 'social_assistance';
                needs.recommendations.push('social_decoding', 'energy_conservation', 'exit_strategies');
            }
            
            // Everything seems fine - need gentle companionship
            else {
                needs.primary = 'companionship';
                needs.urgency = 0.3;
                needs.interventionType = 'presence';
                needs.recommendations.push('gentle_check_in', 'celebration', 'encouragement');
            }
            
            needs.confidence = Math.min(1.0, (context.confidence || 0.5) + 0.2);
            
            console.log('🎭 User needs assessment:', {
                primary: needs.primary,
                urgency: needs.urgency.toFixed(2),
                interventionType: needs.interventionType
            });
            
            return needs;
            
        } catch (error) {
            console.error('❌ User needs assessment failed:', error);
            return { primary: 'unknown', confidence: 0 };
        }
    }

    /**
     * Filter an action through personality lens to ensure appropriateness
     */
    async filterAction(action, context) {
        try {
            console.log('🎭 Filtering action through personality...');
            
            const filteredAction = { ...action };
            const userState = this.currentUserState;
            
            // If user is overwhelmed, make interventions gentler
            if (userState.overwhelmRisk > 0.6) {
                filteredAction.priority = Math.max(0.1, filteredAction.priority - 0.3);
                filteredAction.tone = 'extra_gentle';
                filteredAction.timing = 'delayed'; // Wait for better moment
            }
            
            // If user is highly focused, reduce interruption
            if (userState.focusLevel > 0.8 && context?.type !== 'emergency') {
                filteredAction.priority = Math.max(0.1, filteredAction.priority - 0.4);
                filteredAction.timing = 'when_natural_break';
            }
            
            // If user has low social battery, avoid social interventions
            if (userState.socialBattery < 0.3 && action.type === 'social_decoding') {
                filteredAction.priority = Math.max(0.1, filteredAction.priority - 0.2);
                filteredAction.tone = 'minimal_social';
            }
            
            // Add personality-appropriate language and tone
            filteredAction.personality = this.getPersonalityForAction(action, userState);
            
            console.log('🎭 Action filtered:', {
                originalPriority: action.priority,
                filteredPriority: filteredAction.priority,
                tone: filteredAction.tone,
                timing: filteredAction.timing
            });
            
            return filteredAction;
            
        } catch (error) {
            console.error('❌ Action filtering failed:', error);
            return action; // Return unfiltered if filtering fails
        }
    }

    /**
     * Generate a personality-appropriate response
     */
    async generateResponse(actionType, context, userState) {
        try {
            const traits = this.traits;
            const style = this.communicationStyle;
            
            let response = {
                text: '',
                tone: 'warm',
                timing: 'immediate',
                hinglish: false,
                emoji: null
            };
            
            // Base response on action type and current user state
            switch (actionType) {
                case 'encouragement':
                    response = this.generateEncouragement(userState);
                    break;
                case 'gentle_redirect':
                    response = this.generateGentleRedirect(context, userState);
                    break;
                case 'celebration':
                    response = this.generateCelebration(context);
                    break;
                case 'comfort':
                    response = this.generateComfort(userState);
                    break;
                case 'check_in':
                    response = this.generateCheckIn(userState);
                    break;
                default:
                    response.text = "I'm here with you 💙";
            }
            
            // Apply personality traits to response
            response = this.applyPersonalityToResponse(response, traits);
            
            // Add Hinglish if appropriate
            if (style.language.hinglish && Math.random() < style.language.hindi) {
                response = this.addHinglishTouch(response);
            }
            
            this.totalInteractions++;
            
            return response;
            
        } catch (error) {
            console.error('❌ Response generation failed:', error);
            return { text: "I'm here with you 💙", tone: 'warm' };
        }
    }

    // Emotional analysis methods
    async analyzeVisualEmotions(visualData) {
        // Analyze screen content for emotional cues
        const emotions = { stress: 0.5, focus: 0.5, factors: [] };
        
        if (visualData.context === 'code' && visualData.confidence > 0.6) {
            emotions.focus = 0.7;
            emotions.factors.push('focused_coding');
        }
        
        if (visualData.relevance > 0.8) {
            emotions.stress = Math.max(0.3, emotions.stress - 0.2); // Lower stress when relevant
        }
        
        return emotions;
    }

    async analyzeAuditoryEmotions(auditoryData) {
        // Analyze audio for emotional cues
        const emotions = { energy: 0.5, social: 0.5, factors: [] };
        
        if (auditoryData.context === 'focus_music') {
            emotions.energy = 0.7;
            emotions.factors.push('focus_music_detected');
        }
        
        if (auditoryData.context === 'meeting') {
            emotions.social = Math.max(0.2, emotions.social - 0.3); // Meetings drain social battery
            emotions.factors.push('meeting_detected');
        }
        
        return emotions;
    }

    async analyzeBehavioralEmotions(behavioralData) {
        // Analyze behavior patterns for emotional cues
        const emotions = { stress: 0.5, focus: 0.5, factors: [] };
        
        if (behavioralData.pattern === 'rapid_switching') {
            emotions.stress = Math.min(1.0, emotions.stress + 0.3);
            emotions.focus = Math.max(0.1, emotions.focus - 0.4);
            emotions.factors.push('task_switching_stress');
        }
        
        return emotions;
    }

    // Utility methods for emotional assessment
    mergeEmotionalAssessment(base, additional) {
        // Weight and merge emotional assessments
        Object.keys(additional).forEach(key => {
            if (typeof additional[key] === 'number' && typeof base[key] === 'number') {
                base[key] = (base[key] + additional[key]) / 2;
            } else if (key === 'factors' && Array.isArray(additional[key])) {
                base.factors.push(...additional[key]);
            }
        });
        
        // Recalculate overall state based on factors
        if (base.stress > 0.7) {
            base.state = 'stressed';
        } else if (base.focus > 0.7) {
            base.state = 'focused';
        } else if (base.energy < 0.3) {
            base.state = 'tired';
        } else {
            base.state = 'neutral';
        }
        
        base.confidence = Math.min(1.0, base.confidence + 0.1);
    }

    calculateOverwhelmRisk(emotionalState) {
        const stressWeight = 0.4;
        const focusWeight = 0.3;
        const energyWeight = 0.3;
        
        const overwhelmRisk = 
            (emotionalState.stress * stressWeight) +
            ((1 - emotionalState.focus) * focusWeight) +
            ((1 - emotionalState.energy) * energyWeight);
        
        return Math.min(1.0, overwhelmRisk);
    }

    // Response generation methods
    generateEncouragement(userState) {
        const encouragements = this.responsePatterns.encouragement;
        const selected = encouragements[Math.floor(Math.random() * encouragements.length)];
        
        return {
            text: selected,
            tone: 'encouraging',
            emoji: '💙',
            timing: 'immediate'
        };
    }

    generateGentleRedirect(context, userState) {
        const redirects = this.responsePatterns.gentle_redirect;
        const selected = redirects[Math.floor(Math.random() * redirects.length)];
        
        return {
            text: `${selected} we focus on just one small step?`,
            tone: 'gentle',
            timing: 'when_appropriate'
        };
    }

    generateCelebration(context) {
        const celebrations = this.responsePatterns.celebration;
        const selected = celebrations[Math.floor(Math.random() * celebrations.length)];
        
        return {
            text: selected,
            tone: 'joyful',
            emoji: '🎉',
            timing: 'immediate'
        };
    }

    generateComfort(userState) {
        const comforts = this.responsePatterns.comfort;
        const selected = comforts[Math.floor(Math.random() * comforts.length)];
        
        return {
            text: selected,
            tone: 'gentle',
            emoji: '💙',
            timing: 'immediate'
        };
    }

    generateCheckIn(userState) {
        if (userState.stressLevel > 0.6) {
            return {
                text: "How are you feeling right now? I'm here if you need anything 💙",
                tone: 'caring',
                timing: 'gentle'
            };
        } else {
            return {
                text: "Just checking in - you're doing great! ✨",
                tone: 'warm',
                timing: 'light'
            };
        }
    }

    applyPersonalityToResponse(response, traits) {
        // Adjust response based on personality traits
        if (traits.warmth > 0.8) {
            response.tone = response.tone === 'neutral' ? 'warm' : response.tone;
        }
        
        if (traits.playfulness > 0.7 && response.tone !== 'gentle') {
            if (Math.random() < 0.3) {
                response.emoji = response.emoji || '✨';
            }
        }
        
        return response;
    }

    addHinglishTouch(response) {
        const hinglishPhrases = {
            'great': 'bahut accha',
            'good': 'accha',
            'okay': 'theek hai',
            'yes': 'haan',
            'no problem': 'koi baat nahi'
        };
        
        // Sometimes add a Hinglish phrase
        if (Math.random() < 0.3) {
            response.text += ' 💙';
            response.hinglish = true;
        }
        
        return response;
    }

    getPersonalityForAction(action, userState) {
        return {
            warmth: this.traits.warmth,
            approach: userState.overwhelmRisk > 0.5 ? 'extra_gentle' : 'normal',
            energy: userState.energyLevel < 0.4 ? 'calm' : 'supportive',
            timing: userState.focusLevel > 0.8 ? 'minimal_interruption' : 'normal'
        };
    }

    // Personality system methods (placeholders)
    async loadPersonalityProfile() {
        console.log('🎭 Loading personality profile...');
        // Would load saved personality adaptations
    }

    async initializeEmotionalIntelligence() {
        console.log('🎭 Initializing emotional intelligence...');
        // Would set up emotional recognition systems
    }

    async beginPersonalityAdaptation() {
        console.log('🎭 Beginning personality adaptation learning...');
        // Would start learning user preferences
    }

    // Utility methods
    getPersonalitySnapshot() {
        return {
            traits: this.traits,
            communicationStyle: this.communicationStyle.tone,
            emotionalAccuracy: this.emotionalIntelligence.recognitionAccuracy,
            adaptationSpeed: this.emotionalIntelligence.adaptationSpeed
        };
    }

    getCurrentUserState() {
        return { ...this.currentUserState };
    }

    getMetrics() {
        return {
            totalInteractions: this.totalInteractions,
            successfulResponses: this.successfulResponses,
            responseRate: this.totalInteractions > 0 ? this.successfulResponses / this.totalInteractions : 0,
            emotionalAccuracy: this.emotionalIntelligence.recognitionAccuracy,
            isActive: this.isActive
        };
    }

    async shutdown() {
        console.log('🎭 Shutting down Velvet Personality System...');
        this.isActive = false;
        console.log('🎭 Personality System shutdown complete');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VelvetPersonality;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.VelvetPersonality = VelvetPersonality;
}

console.log('🎭 VelvetPersonality class definition loaded');