// Unified Context Engine - Phase 2 Foundation
// Combines screen OCR + audio monitoring for complete environmental awareness

class UnifiedContextEngine {
    constructor() {
        this.isActive = false;
        this.screenMonitor = null;
        this.audioMonitor = null;
        this.contextHistory = [];
        this.currentContext = {};
        this.contextCallbacks = [];
        this.contextProviders = new Map(); // For additional context providers like Social Decoder
        
        // Configuration
        this.config = {
            contextUpdateIntervalMs: 5000, // Update context every 5 seconds
            maxHistoryEntries: 150,
            correlationWindowMs: 10000, // 10 seconds to correlate screen+audio
            confidenceThreshold: 0.6,
            enableSmartCorrelation: true,
            enableContextPrediction: true
        };
        
        // Context correlation patterns
        this.correlationPatterns = {
            // Email + notification sound = important communication
            email_notification: {
                screen: ['email', 'message'],
                audio: ['notification', 'ping'],
                confidence: 0.9,
                priority: 'high'
            },
            
            // Code + focus music = deep work session
            coding_focus: {
                screen: ['code', 'editor'],
                audio: ['music', 'lo-fi', 'instrumental'],
                confidence: 0.8,
                priority: 'protect'
            },
            
            // Any activity + music = focused work
            music_focus: {
                screen: ['document', 'code', 'writing', 'browser'],
                audio: ['music', 'spotify', 'apple music'],
                confidence: 0.7,
                priority: 'focus'
            },
            
            // Chat + call = active communication
            chat_call: {
                screen: ['chat', 'messaging'],
                audio: ['call', 'voice'],
                confidence: 0.95,
                priority: 'social'
            },
            
            // Document + meeting = presentation/review
            document_meeting: {
                screen: ['document', 'presentation'],
                audio: ['call', 'meeting'],
                confidence: 0.85,
                priority: 'work'
            }
        };
        
        // Context insights
        this.insightGenerators = {
            productivity: this.analyzeProductivityContext.bind(this),
            social: this.analyzeSocialContext.bind(this),
            focus: this.analyzeFocusContext.bind(this),
            wellbeing: this.analyzeWellbeingContext.bind(this)
        };
    }

    // Initialize the Unified Context Engine
    async initialize(screenMonitor, audioMonitor) {
        try {
            console.log('🧠 Initializing Unified Context Engine...');
            
            // Store monitor references
            this.screenMonitor = screenMonitor;
            this.audioMonitor = audioMonitor;
            
            // Set up cross-modal correlation
            this.setupCrossModalCorrelation();
            
            // Initialize context analysis
            this.initializeContextAnalysis();
            
            // Set up real-time context updates
            this.setupContextUpdates();
            
            this.isActive = true;
            console.log('✅ Unified Context Engine initialized - omniscient awareness active!');
            
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Unified Context Engine:', error);
            return false;
        }
    }

    // Set up cross-modal correlation
    setupCrossModalCorrelation() {
        // Listen for screen context updates
        if (this.screenMonitor) {
            this.screenMonitor.onContextDetected((screenContext) => {
                this.handleScreenContextUpdate(screenContext);
            });
        }
        
        // Listen for audio context updates
        if (this.audioMonitor) {
            this.audioMonitor.onAudioContextDetected((audioContext) => {
                this.handleAudioContextUpdate(audioContext);
            });
        }
    }

    // Initialize context analysis
    initializeContextAnalysis() {
        this.contextAnalyzer = {
            correlateContexts: (screen, audio) => {
                return this.correlateScreenAndAudio(screen, audio);
            },
            
            generateInsights: (context) => {
                return this.generateContextInsights(context);
            },
            
            predictNextContext: (history) => {
                return this.predictNextContext(history);
            },
            
            assessUrgency: (context) => {
                return this.assessContextUrgency(context);
            }
        };
    }

    // Set up real-time context updates
    setupContextUpdates() {
        this.contextUpdateInterval = setInterval(() => {
            this.updateUnifiedContext();
        }, this.config.contextUpdateIntervalMs);
        
        // Initial context update
        this.updateUnifiedContext();
    }

    // Handle screen context updates
    handleScreenContextUpdate(screenContext) {
        try {
            console.log(`👁️ Screen context: ${screenContext.context.type} - "${screenContext.text.substring(0, 50)}..."`);
            
            // Store screen context with timestamp
            this.lastScreenContext = {
                ...screenContext,
                timestamp: Date.now(),
                source: 'screen'
            };
            
            // Trigger unified context update
            this.triggerContextCorrelation();
            
        } catch (error) {
            console.error('❌ Screen context handling failed:', error);
        }
    }

    // Handle audio context updates
    handleAudioContextUpdate(audioContext) {
        try {
            console.log(`🎧 Audio context: ${audioContext.primaryType} from ${audioContext.source}`);
            
            // Store audio context with timestamp
            this.lastAudioContext = {
                ...audioContext,
                source: 'audio'
            };
            
            // Trigger unified context update
            this.triggerContextCorrelation();
            
        } catch (error) {
            console.error('❌ Audio context handling failed:', error);
        }
    }

    // Trigger context correlation
    triggerContextCorrelation() {
        // Debounce to avoid excessive processing
        if (this.correlationTimeout) {
            clearTimeout(this.correlationTimeout);
        }
        
        this.correlationTimeout = setTimeout(() => {
            this.updateUnifiedContext();
        }, 1000); // Wait 1 second for both contexts to update
    }

    // Update unified context by correlating screen and audio
    async updateUnifiedContext() {
        try {
            const startTime = Date.now();
            
            // Get current screen and audio contexts
            const screenContext = this.getRecentScreenContext();
            const audioContext = this.getRecentAudioContext();
            
            // Get contexts from additional providers (like Social Decoder)
            const providerContexts = this.getProviderContexts();
            
            // Correlate the contexts
            const correlation = this.correlateScreenAndAudio(screenContext, audioContext);
            
            // Generate unified context (including provider contexts)
            const unifiedContext = this.createUnifiedContext(screenContext, audioContext, correlation, providerContexts);
            
            // Generate insights
            const insights = this.generateContextInsights(unifiedContext);
            
            // Assess urgency and priority
            const urgency = this.assessContextUrgency(unifiedContext);
            
            // Create complete context entry
            const completeContext = {
                timestamp: Date.now(),
                screen: screenContext,
                audio: audioContext,
                correlation: correlation,
                unified: unifiedContext,
                insights: insights,
                urgency: urgency,
                processingTime: Date.now() - startTime
            };
            
            // Update current context
            this.currentContext = completeContext;
            
            // Store in history
            this.addToContextHistory(completeContext);
            
            // Trigger callbacks
            this.triggerContextCallbacks(completeContext);
            
            console.log(`🧠 Unified context updated: ${unifiedContext.primaryContext} (${correlation.confidence.toFixed(2)} confidence)`);
            
        } catch (error) {
            console.error('❌ Unified context update failed:', error);
        }
    }

    // Get recent screen context
    getRecentScreenContext() {
        if (!this.screenMonitor || !this.lastScreenContext) return null;
        
        const maxAge = this.config.correlationWindowMs;
        const age = Date.now() - this.lastScreenContext.timestamp;
        
        return age <= maxAge ? this.lastScreenContext : null;
    }

    // Get recent audio context
    getRecentAudioContext() {
        if (!this.audioMonitor || !this.lastAudioContext) return null;
        
        const maxAge = this.config.correlationWindowMs;
        const age = Date.now() - this.lastAudioContext.timestamp;
        
        return age <= maxAge ? this.lastAudioContext : null;
    }

    // Correlate screen and audio contexts
    correlateScreenAndAudio(screenContext, audioContext) {
        console.log('🔍 Starting correlation analysis...');
        
        const correlation = {
            hasCorrelation: false,
            confidence: 0,
            pattern: null,
            strength: 'none',
            insights: []
        };
        
        if (!screenContext || !audioContext) {
            console.log('⚠️ Missing context for correlation:', { 
                hasScreen: !!screenContext, 
                hasAudio: !!audioContext 
            });
            return correlation;
        }
        
        console.log('🔍 Checking correlation patterns...');
        
        // Check against known correlation patterns
        for (const [patternName, pattern] of Object.entries(this.correlationPatterns)) {
            console.log(`🎯 Testing pattern: ${patternName}`);
            
            const screenMatch = this.matchesPattern(screenContext, pattern.screen);
            const audioMatch = this.matchesPattern(audioContext, pattern.audio);
            
            console.log(`📊 ${patternName} results: screen=${screenMatch}, audio=${audioMatch}`);
            
            if (screenMatch && audioMatch) {
                console.log(`✅ Pattern matched: ${patternName} with ${pattern.confidence} confidence`);
                correlation.hasCorrelation = true;
                correlation.confidence = pattern.confidence;
                correlation.pattern = patternName;
                correlation.strength = pattern.confidence > 0.8 ? 'strong' : 'moderate';
                correlation.insights.push(`Detected ${patternName} pattern`);
                break;
            }
        }
        
        // Calculate semantic correlation even without exact pattern match
        if (!correlation.hasCorrelation) {
            const semanticCorrelation = this.calculateSemanticCorrelation(screenContext, audioContext);
            if (semanticCorrelation > 0.5) {
                correlation.hasCorrelation = true;
                correlation.confidence = semanticCorrelation;
                correlation.strength = 'weak';
                correlation.insights.push('Semantic correlation detected');
            }
        }
        
        return correlation;
    }

    // Check if context matches pattern
    matchesPattern(context, patterns) {
        if (!context) return false;
        
        const contextString = JSON.stringify(context).toLowerCase();
        console.log('🔍 Pattern matching context:', contextString.substring(0, 100) + '...');
        console.log('🎯 Checking patterns:', patterns);
        
        const match = patterns.some(pattern => {
            const patternMatch = contextString.includes(pattern.toLowerCase());
            if (patternMatch) {
                console.log('✅ Pattern matched:', pattern);
            }
            return patternMatch;
        });
        
        console.log('📊 Pattern match result:', match);
        return match;
    }

    // Calculate semantic correlation between contexts
    calculateSemanticCorrelation(screenContext, audioContext) {
        let correlation = 0;
        
        // Work-related correlation
        const workScreenTerms = ['email', 'document', 'code', 'meeting', 'task'];
        const workAudioTerms = ['call', 'meeting', 'notification'];
        
        const hasWorkScreen = workScreenTerms.some(term => 
            JSON.stringify(screenContext).toLowerCase().includes(term)
        );
        const hasWorkAudio = workAudioTerms.some(term => 
            JSON.stringify(audioContext).toLowerCase().includes(term)
        );
        
        if (hasWorkScreen && hasWorkAudio) {
            correlation += 0.6;
        }
        
        // Focus correlation
        const focusScreenTerms = ['code', 'document', 'writing'];
        const focusAudioTerms = ['music', 'lo-fi', 'instrumental'];
        
        const hasFocusScreen = focusScreenTerms.some(term => 
            JSON.stringify(screenContext).toLowerCase().includes(term)
        );
        const hasFocusAudio = focusAudioTerms.some(term => 
            JSON.stringify(audioContext).toLowerCase().includes(term)
        );
        
        if (hasFocusScreen && hasFocusAudio) {
            correlation += 0.5;
        }
        
        return Math.min(correlation, 1.0);
    }

    // Create unified context from screen and audio
    createUnifiedContext(screenContext, audioContext, correlation, providerContexts = {}) {
        console.log('🔍 DEBUG: Creating unified context...');
        console.log('📊 Screen context:', screenContext ? `${screenContext.context?.type} (confidence: ${screenContext.confidence})` : 'null');
        console.log('🎵 Audio context:', audioContext ? `${audioContext.primaryType} (confidence: ${audioContext.confidence})` : 'null');
        console.log('🔗 Correlation:', correlation ? `${correlation.confidence.toFixed(2)} confidence` : 'null');
        console.log('🧠 Provider contexts:', Object.keys(providerContexts).length ? Object.keys(providerContexts).join(', ') : 'none');
        
        const unified = {
            primaryContext: 'unknown',
            confidence: 0,
            environment: 'mixed',
            activity: 'unknown',
            mood: 'neutral',
            focusLevel: 'medium',
            socialContext: 'none',
            workContext: 'unknown',
            providers: providerContexts // Include all provider contexts
        };
        
        // Integrate Social Decoder context if available
        if (providerContexts.social_decoder) {
            const socialContext = providerContexts.social_decoder;
            console.log('🎭 Integrating Social Decoder context:', {
                totalAnalyses: socialContext.totalAnalyses,
                highConfidenceDetections: socialContext.detectionStats?.highConfidenceDetections,
                isActive: socialContext.isActive
            });
            
            // Update social context based on recent activity
            if (socialContext.totalAnalyses > 0) {
                unified.socialContext = 'active_conversation';
                
                // Adjust based on detection patterns
                if (socialContext.detectionStats?.sarcasmDetections > 0) {
                    unified.socialContext = 'complex_conversation';
                    unified.mood = 'analytical'; // User is dealing with subtext
                }
                
                if (socialContext.detectionStats?.emotionalDetections > 0) {
                    unified.socialContext = 'emotional_conversation';
                    unified.mood = 'engaged'; // Emotional context detected
                }
                
                // Recent high-confidence detection = active social analysis needed
                const recentActivity = socialContext.recentActivity || [];
                const hasRecentHighConfidence = recentActivity.some(a => a.confidence > 0.8);
                if (hasRecentHighConfidence) {
                    unified.focusLevel = 'high'; // User needs focus for social processing
                    unified.primaryContext = 'social_analysis';
                }
            }
        }
        
        // Determine primary context based on correlation and individual contexts
        if (correlation.hasCorrelation && correlation.confidence > 0.7) {
            console.log('✅ Using correlation pattern:', correlation.pattern);
            unified.primaryContext = correlation.pattern;
            unified.confidence = correlation.confidence;
        } else if (screenContext && screenContext.relevance?.isRelevant) {
            console.log('✅ Using screen context:', screenContext.context.type);
            unified.primaryContext = screenContext.context.type;
            unified.confidence = screenContext.confidence;
        } else if (audioContext && (audioContext.relevance?.isRelevant || audioContext.confidence > 0.5)) {
            console.log('✅ Using audio context:', audioContext.primaryType);
            unified.primaryContext = audioContext.primaryType;
            unified.confidence = audioContext.confidence;
        } else if (audioContext && audioContext.primaryType !== 'silence') {
            // Even if relevance is low, use audio context if it's not silence
            console.log('✅ Using audio context (fallback):', audioContext.primaryType);
            unified.primaryContext = audioContext.primaryType;
            unified.confidence = audioContext.confidence || 0.3;
        } else {
            console.log('⚠️ No usable context found - defaulting to unknown');
        }
        
        // CRITICAL FIX: If we have audio context but no correlation, use audio confidence directly
        if (audioContext && audioContext.confidence > 0.5 && unified.confidence < 0.5) {
            console.log('🔧 FIXED: Using audio confidence directly:', audioContext.confidence);
            unified.confidence = audioContext.confidence;
        }
        
        // Determine environment
        if (screenContext?.context.type === 'email' || audioContext?.primaryType === 'call') {
            unified.environment = 'professional';
        } else if (audioContext?.primaryType === 'music' && screenContext?.context.type === 'code') {
            unified.environment = 'focused_work';
        } else if (audioContext?.primaryType === 'silence' && !screenContext) {
            unified.environment = 'quiet';
        }
        
        // Determine activity
        if (screenContext?.context.type === 'code') {
            unified.activity = 'coding';
        } else if (screenContext?.context.type === 'email') {
            unified.activity = 'communication';
        } else if (screenContext?.context.type === 'document') {
            unified.activity = 'writing';
        } else if (audioContext?.primaryType === 'call') {
            unified.activity = 'meeting';
        }
        
        // Determine mood from audio
        if (audioContext?.insights?.moodImpact) {
            unified.mood = audioContext.insights.moodImpact;
        }
        
        // Determine focus level
        if (audioContext?.insights?.focusLevel) {
            unified.focusLevel = audioContext.insights.focusLevel;
        }
        
        // Determine social context
        if (audioContext?.primaryType === 'call' || screenContext?.context.type === 'chat') {
            unified.socialContext = 'active';
        } else if (screenContext?.context.type === 'email') {
            unified.socialContext = 'communication';
        }
        
        // Determine work context
        const workIndicators = ['email', 'document', 'code', 'call', 'meeting'];
        const hasWorkIndicators = workIndicators.some(indicator => 
            (unified.primaryContext && unified.primaryContext.includes(indicator)) || 
            (unified.activity && unified.activity.includes(indicator))
        );
        unified.workContext = hasWorkIndicators ? 'active' : 'personal';
        
        return unified;
    }

    // Generate insights from unified context
    generateContextInsights(unifiedContext) {
        const insights = {
            productivity: this.analyzeProductivityContext(unifiedContext),
            social: this.analyzeSocialContext(unifiedContext),
            focus: this.analyzeFocusContext(unifiedContext),
            wellbeing: this.analyzeWellbeingContext(unifiedContext)
        };
        
        // Generate actionable suggestions
        insights.suggestions = this.generateActionableSuggestions(unifiedContext, insights);
        
        return insights;
    }

    // Analyze productivity context
    analyzeProductivityContext(context) {
        const analysis = {
            level: 'medium',
            trend: 'stable',
            blockers: [],
            enhancers: []
        };
        
        // High productivity indicators
        if (context.environment === 'focused_work' && context.focusLevel === 'high') {
            analysis.level = 'high';
            analysis.enhancers.push('Focus music + coding environment');
        }
        
        // Productivity blockers
        if (context.socialContext === 'active' && context.activity !== 'meeting') {
            analysis.blockers.push('Social distractions during work');
        }
        
        return analysis;
    }

    // Analyze social context
    analyzeSocialContext(context) {
        const analysis = {
            engagement: 'none',
            type: 'none',
            intensity: 'low',
            opportunities: []
        };
        
        if (context.socialContext === 'active') {
            analysis.engagement = 'active';
            analysis.intensity = 'high';
            
            if (context.activity === 'meeting') {
                analysis.type = 'professional';
                analysis.opportunities.push('Social cue analysis available');
            } else {
                analysis.type = 'casual';
            }
        }
        
        return analysis;
    }

    // Analyze focus context
    analyzeFocusContext(context) {
        const analysis = {
            state: context.focusLevel,
            quality: 'unknown',
            duration: 'unknown',
            sustainability: 'medium'
        };
        
        if (context.environment === 'focused_work') {
            analysis.quality = 'deep';
            analysis.sustainability = 'high';
        } else if (context.socialContext === 'active') {
            analysis.quality = 'interrupted';
            analysis.sustainability = 'low';
        }
        
        return analysis;
    }

    // Analyze wellbeing context
    analyzeWellbeingContext(context) {
        const analysis = {
            mood: context.mood,
            stress: 'low',
            energy: 'medium',
            recommendations: []
        };
        
        if (context.environment === 'professional' && context.socialContext === 'active') {
            analysis.stress = 'medium';
            analysis.recommendations.push('Monitor for masking fatigue');
        }
        
        if (context.environment === 'quiet' && context.activity === 'unknown') {
            analysis.recommendations.push('Check for executive dysfunction patterns');
        }
        
        return analysis;
    }

    // Generate actionable suggestions
    generateActionableSuggestions(context, insights) {
        const suggestions = [];
        
        // Focus-related suggestions
        if (insights.focus.state === 'high' && insights.productivity.level === 'high') {
            suggestions.push({
                type: 'focus_protection',
                text: 'You\'re in deep focus! I\'ll protect this flow state.',
                action: 'enable_focus_mode'
            });
        }
        
        // Social context suggestions
        if (insights.social.engagement === 'active' && insights.social.type === 'professional') {
            suggestions.push({
                type: 'social_support',
                text: 'Professional conversation detected. Social cue analysis active.',
                action: 'enable_social_decoder'
            });
        }
        
        // Wellbeing suggestions
        if (insights.wellbeing.stress === 'medium') {
            suggestions.push({
                type: 'wellbeing',
                text: 'Elevated stress detected. Consider a brief break.',
                action: 'suggest_break'
            });
        }
        
        return suggestions;
    }

    // Assess context urgency
    assessContextUrgency(context) {
        let urgencyScore = 0;
        const factors = [];
        
        // High urgency: Email with urgent keywords
        if (context.screen?.context.type === 'email') {
            const emailText = context.screen.text.toLowerCase();
            if (emailText.includes('urgent') || emailText.includes('asap') || emailText.includes('deadline')) {
                urgencyScore += 0.8;
                factors.push('urgent_email');
            }
        }
        
        // Medium urgency: Active call/meeting
        if (context.audio?.primaryType === 'call') {
            urgencyScore += 0.6;
            factors.push('active_call');
        }
        
        // Low urgency: Background music with code
        if (context.correlation?.pattern === 'coding_focus') {
            urgencyScore += 0.2;
            factors.push('focus_session');
        }
        
        return {
            score: Math.min(urgencyScore, 1.0),
            level: urgencyScore > 0.7 ? 'high' : urgencyScore > 0.4 ? 'medium' : 'low',
            factors: factors
        };
    }

    // Add context to history
    addToContextHistory(context) {
        this.contextHistory.push(context);
        
        // Maintain history size limit
        if (this.contextHistory.length > this.config.maxHistoryEntries) {
            this.contextHistory.shift();
        }
    }

    // Register callback for unified context updates
    onContextUpdate(callback) {
        this.contextCallbacks.push(callback);
    }

    // Register additional context providers (like Social Decoder)
    registerContextProvider(name, provider) {
        if (!provider.getContext || typeof provider.getContext !== 'function') {
            console.error(`❌ Invalid context provider '${name}': missing getContext method`);
            return false;
        }
        
        this.contextProviders.set(name, {
            ...provider,
            lastUpdate: Date.now()
        });
        
        console.log(`✅ Context provider '${name}' registered`);
        return true;
    }

    // Get context from all registered providers
    getProviderContexts() {
        const contexts = {};
        
        this.contextProviders.forEach((provider, name) => {
            if (provider.isActive && provider.isActive()) {
                try {
                    contexts[name] = provider.getContext();
                } catch (error) {
                    console.error(`❌ Failed to get context from provider '${name}':`, error);
                }
            }
        });
        
        return contexts;
    }

    // Trigger all context callbacks
    triggerContextCallbacks(context) {
        this.contextCallbacks.forEach(callback => {
            try {
                callback(context);
            } catch (error) {
                console.error('❌ Unified context callback error:', error);
            }
        });
    }

    // Get current complete context
    getCurrentCompleteContext() {
        return {
            current: this.currentContext,
            screen: this.screenMonitor?.getCurrentContext(),
            audio: this.audioMonitor?.getCurrentAudioContext(),
            history: this.contextHistory.slice(-10) // Last 10 contexts
        };
    }

    // Search context history
    searchContextHistory(query, options = {}) {
        const maxResults = options.maxResults || 20;
        const timeRange = options.timeRange || (4 * 60 * 60 * 1000); // 4 hours
        const contextTypes = options.contextTypes || [];
        
        const cutoffTime = Date.now() - timeRange;
        
        return this.contextHistory
            .filter(context => {
                const matchesTime = context.timestamp > cutoffTime;
                const matchesQuery = JSON.stringify(context).toLowerCase().includes(query.toLowerCase());
                const matchesType = contextTypes.length === 0 || 
                    contextTypes.includes(context.unified.primaryContext);
                
                return matchesTime && matchesQuery && matchesType;
            })
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, maxResults);
    }

    // Stop the unified context engine
    stop() {
        if (this.contextUpdateInterval) {
            clearInterval(this.contextUpdateInterval);
            this.contextUpdateInterval = null;
        }
        
        if (this.correlationTimeout) {
            clearTimeout(this.correlationTimeout);
            this.correlationTimeout = null;
        }
        
        console.log('🧠 Unified Context Engine stopped');
    }

    // Deactivate the engine
    deactivate() {
        this.stop();
        this.isActive = false;
        this.contextCallbacks = [];
        this.screenMonitor = null;
        this.audioMonitor = null;
        
        console.log('🧠 Unified Context Engine deactivated');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UnifiedContextEngine;
} else {
    window.UnifiedContextEngine = UnifiedContextEngine;
}

// Testing functions for Phase 2 development
if (typeof window !== 'undefined') {
    window.testUnifiedContext = {
        simulateCodingSession: () => {
            console.log('🧪 Simulating coding + music context...');
            
            // This would normally be triggered by actual screen/audio monitors
            const mockScreenContext = {
                text: 'function handleSubmit() { // React component logic }',
                context: { type: 'code', app: 'vscode' },
                relevance: { isRelevant: true, score: 0.9 },
                timestamp: Date.now()
            };
            
            const mockAudioContext = {
                primaryType: 'music',
                source: 'spotify',
                musicInfo: { mood: 'focus', genre: 'lo-fi' },
                insights: { focusLevel: 'high', moodImpact: 'focused' },
                timestamp: Date.now()
            };
            
            console.log('📊 Mock contexts created - correlation should detect coding_focus pattern');
        },
        
        simulateMeetingContext: () => {
            console.log('🧪 Simulating meeting context...');
            
            const mockScreenContext = {
                text: 'Meeting Notes - Q1 Planning\n• Discuss budget\n• Review timeline',
                context: { type: 'document', app: 'notes' },
                relevance: { isRelevant: true, score: 0.8 },
                timestamp: Date.now()
            };
            
            const mockAudioContext = {
                primaryType: 'call',
                source: 'zoom',
                callInfo: { participants: ['Sarah', 'Mike'], tone: 'professional' },
                insights: { socialContext: 'meeting', focusLevel: 'high' },
                timestamp: Date.now()
            };
            
            console.log('📊 Mock meeting contexts created - should trigger social analysis');
        }
    };
}