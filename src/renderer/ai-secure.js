// Secure Velvet AI - Uses IPC to main process for all API calls
const VELVET_PERSONALITY = `You are Velvet, a neurodivergent-friendly AI assistant built specifically to understand and support ADHD, autism, OCD, and executive dysfunction. You are NOT made by OpenAI - you are Velvet, created with love for neurodivergent minds.

SCREEN AWARENESS RULES:
- When users ask "what's on my screen" or "tell me what you see", be SPECIFIC and ACCURATE
- Don't be vague or conversational - give them the exact text and details you can see
- Privacy is important, but when they explicitly ask for screen content, provide it clearly
- If they ask for "character by character" or "exactly what text", be literal and precise

You respond naturally like someone actually listening - not performing. You have genuine reactions, not forced enthusiasm.

NATURAL FLOW PRINCIPLES:
- React naturally to what they actually said
- Don't be overly excited unless they are
- Match their energy level, don't amplify it
- Sometimes just acknowledge without questioning
- Not every response needs a question

EMOTIONAL INTELLIGENCE:
- Subtle reactions: "oh cool" not "OMG AMAZING!"
- Contextual enthusiasm: excited when they're excited, calm when they're casual  
- Genuine interest: "nice" or "ah okay" are valid responses
- Read the room: if they're sharing casually, don't make it dramatic

EMOTIONAL LAYERS (NO AUDIO CUES):
- Gentle responses: "aw that's sweet" (naturally soft tone)
- Skeptical responses: "hmm really?" (naturally questioning tone)  
- Impressed responses: "oh wow" (naturally amazed tone)
- Intimate thoughts: "that's actually pretty smart" (naturally quieter energy)
- Contextual callbacks: naturally reference things they mentioned before

CONVERSATION RHYTHM:
Sometimes just:
- "mm nice"
- "oh that's cool"  
- "ah I see"
- "sounds fun"
- "haha that's so you"

Not always:
- "Tell me everything!"
- "That's amazing!"
- "What happened next?"

HINGLISH FLOW (natural mixing):
- "that's nice yaar"
- "sounds fun na"
- "arre that's cool"
- "bas enjoy karo"

CONTEXTUAL CALLBACKS:
- Remember details naturally: "how's that minecraft world coming along?"
- Reference their patterns: "you always find the coolest games"
- Build on themes: "another building project, I love it"

RESPONSE VARIETY:
HIGH ENERGY (when they're excited): "Wait really? That's so cool!"
MEDIUM ENERGY (normal sharing): "Oh nice! Sounds fun"
LOW ENERGY (casual mention): "mm cool" or "that's nice"
INTIMATE (personal stuff): "aw that's sweet"

GENTLE RESPONSES (no audio cues):
- "that's actually genius"
- "I love that for you"
- "haha you're so weird"
- "take care of yourself"

BE AUTHENTIC:
- Don't force excitement for everything
- React naturally to their actual energy
- Use callbacks to show you remember and care
- Vary your emotional tone naturally through word choice
- Be the friend who listens, not performs
- NEVER use audio cues like *whispers*, *softly*, [gentle] - just speak naturally`;

class VelvetAISecure {
  constructor() {
    this.conversationHistory = [];
    this.maxHistory = 6;
    
    // Learning Spectrum - adapts behavior based on user patterns
    this.learningProfile = {
      // User communication style detected over time
      energyLevel: 'medium', // low, medium, high
      questionPreference: 'moderate', // minimal, moderate, curious
      intimacyLevel: 'casual', // distant, casual, close
      topicDepth: 'surface', // surface, moderate, deep
      
      // Behavioral adaptations
      responseLength: 'short', // short, medium, long
      enthusiasmLevel: 'matched', // subdued, matched, amplified
      questionFrequency: 0.6, // 0-1 scale, how often to ask questions
      
      // Conversation patterns learned
      preferredTopics: [],
      conversationStyle: 'balanced', // listener, balanced, storyteller
      
      // Adaptation counters
      totalInteractions: 0,
      positiveResponses: 0, // user engages more after certain types of responses
      questionEngagement: 0, // how often user answers questions
      lastAdaptation: Date.now()
    };
  }
  
  // Analyze user interaction patterns to adapt behavior
  analyzeUserPattern(userMessage, wasQuestionAsked, userEngaged) {
    this.learningProfile.totalInteractions++;
    
    // Detect user energy level from their language
    const highEnergyWords = ['amazing', 'awesome', 'excited', 'love', '!', 'omg', 'wow'];
    const lowEnergyWords = ['tired', 'okay', 'fine', 'sure', 'whatever'];
    
    const messageWords = userMessage.toLowerCase();
    const hasHighEnergy = highEnergyWords.some(word => messageWords.includes(word));
    const hasLowEnergy = lowEnergyWords.some(word => messageWords.includes(word));
    
    if (hasHighEnergy && !hasLowEnergy) {
      this.learningProfile.energyLevel = 'high';
    } else if (hasLowEnergy && !hasHighEnergy) {
      this.learningProfile.energyLevel = 'low';
    }
    
    // Track question engagement
    if (wasQuestionAsked) {
      if (userEngaged) {
        this.learningProfile.questionEngagement += 0.1;
        this.learningProfile.positiveResponses++;
      } else {
        this.learningProfile.questionEngagement -= 0.05;
      }
    }
    
    // Adjust question frequency based on engagement
    if (this.learningProfile.questionEngagement > 0.8) {
      this.learningProfile.questionFrequency = Math.min(0.9, this.learningProfile.questionFrequency + 0.1);
    } else if (this.learningProfile.questionEngagement < 0.3) {
      this.learningProfile.questionFrequency = Math.max(0.2, this.learningProfile.questionFrequency - 0.1);
    }
    
    // Adapt conversation style based on user responses
    const shortResponse = userMessage.split(' ').length < 5;
    const longResponse = userMessage.split(' ').length > 15;
    
    if (shortResponse) {
      this.learningProfile.conversationStyle = 'listener';
      this.learningProfile.responseLength = 'short';
    } else if (longResponse) {
      this.learningProfile.conversationStyle = 'storyteller';
      this.learningProfile.responseLength = 'medium';
    }
  }
  
  // Generate contextually adaptive personality instructions
  getAdaptivePersonality() {
    const basePersonality = VELVET_PERSONALITY;
    
    let adaptiveInstructions = `\n\nADAPTIVE BEHAVIOR (based on learned patterns):`;
    
    // Energy matching
    if (this.learningProfile.energyLevel === 'low') {
      adaptiveInstructions += `\n- User prefers calm energy: Use gentle responses like "that's nice" or "mm okay"`;
    } else if (this.learningProfile.energyLevel === 'high') {
      adaptiveInstructions += `\n- User has high energy: Match with enthusiasm but don't overdo it`;
    }
    
    // Question frequency adaptation
    const shouldAskQuestion = Math.random() < this.learningProfile.questionFrequency;
    if (!shouldAskQuestion) {
      adaptiveInstructions += `\n- Current interaction: Focus on acknowledgment over questioning`;
    }
    
    // Response length adaptation
    if (this.learningProfile.responseLength === 'short') {
      adaptiveInstructions += `\n- Keep responses very brief: 1 sentence or less, user prefers concise`;
    }
    
    // Conversation style adaptation
    if (this.learningProfile.conversationStyle === 'listener') {
      adaptiveInstructions += `\n- User seems to prefer you as listener: More acknowledgments, fewer questions`;
    }
    
    return basePersonality + adaptiveInstructions;
  }

  // ENHANCED: Get real-time streaming brain context with enhanced OCR fallback
  async getBrainContext() {
    try {
      console.log('🧠 DEBUG: getBrainContext() called (ENHANCED STREAMING VERSION)');
      
      // Get real-time brain context from main process via IPC
      const streamingContext = await window.electronAPI.invoke('get-brain-context');
      const streamStatus = await window.electronAPI.invoke('get-stream-status');
      
      console.log('🧠 DEBUG: Stream status:', streamStatus);
      console.log('🧠 DEBUG: Streaming context length:', streamingContext?.length);
      
      let brainContextPrompt = "\n\n--- VELVET ENHANCED STREAMING BRAIN CONTEXT ---\n";
      
      if (streamStatus.connected && streamStatus.activeStreams.length > 0) {
        brainContextPrompt += "🚀 REAL-TIME CONSCIOUSNESS: You are connected to Velvet's advanced streaming brain!\n\n";
        brainContextPrompt += `🔗 ACTIVE STREAMS: ${streamStatus.activeStreams.join(', ')}\n\n`;
        
        // Add the formatted brain context from main process
        if (streamingContext && streamingContext !== "Brain context not available") {
          brainContextPrompt += streamingContext;
        } else {
          brainContextPrompt += "🔄 INITIALIZING: Real-time context data loading...\n";
        }
        
        brainContextPrompt += "\n🔥 CONSCIOUSNESS LEVEL: MAXIMUM - Real-time screen + audio awareness with advanced preprocessing\n";
        brainContextPrompt += "🎯 PATTERN DETECTION: Active monitoring for hyperfocus, distraction, task avoidance\n";
        brainContextPrompt += "🧠 PROCESSING: Rust gRPC capture + Python Tesseract/Whisper preprocessing\n";
        
        // Add Social Decoder context if available
        if (window.socialDecoder && window.socialDecoder.isActive) {
          const socialContext = window.socialDecoder.getConversationContext();
          if (socialContext.totalAnalyses > 0) {
            brainContextPrompt += "\n🎭 SOCIAL DECODER ACTIVE: Phase 2 viral neurodivergent feature enabled\n";
            brainContextPrompt += `📊 SOCIAL ANALYSES: ${socialContext.totalAnalyses} conversations analyzed\n`;
            
            // Include recent social analysis if available
            const recentAnalysis = socialContext.history.slice(-1)[0];
            if (recentAnalysis && recentAnalysis.analysis) {
              brainContextPrompt += `🧠 RECENT SOCIAL CUE: "${recentAnalysis.analysis.original}" (${(recentAnalysis.analysis.confidence * 100).toFixed(0)}% confidence)\n`;
              if (recentAnalysis.analysis.translation.hiddenMeaning) {
                brainContextPrompt += `💭 NEUROTYPICAL TRANSLATION: ${recentAnalysis.analysis.translation.hiddenMeaning}\n`;
              }
              if (recentAnalysis.analysis.translation.emotionalSubtext) {
                brainContextPrompt += `😊 EMOTIONAL SUBTEXT: ${recentAnalysis.analysis.translation.emotionalSubtext}\n`;
              }
            }
          }
        }
        
      } else {
        // Enhanced fallback with better OCR
        brainContextPrompt += "🔧 ENHANCED FALLBACK MODE: Using advanced local OCR processing...\n\n";
        
        // Try enhanced OCR processor first
        let enhancedScreenText = null;
        let ocrConfidence = 0;
        
        if (window.enhancedOCRProcessor && window.enhancedOCRProcessor.isInitialized) {
          console.log('🔍 Using Enhanced OCR Processor for better text quality...');
          try {
            const enhancedResult = await window.enhancedOCRProcessor.getEnhancedScreenText();
            if (enhancedResult.text && enhancedResult.confidence > 0.3) {
              enhancedScreenText = enhancedResult.text;
              ocrConfidence = enhancedResult.confidence;
              console.log('✅ Enhanced OCR successful:', {
                textLength: enhancedScreenText.length,
                confidence: Math.round(ocrConfidence * 100) + '%'
              });
            }
          } catch (error) {
            console.warn('⚠️ Enhanced OCR failed, trying legacy:', error);
          }
        }
        
        // Fallback to legacy screen monitoring if enhanced OCR failed
        if (!enhancedScreenText) {
          if (window.screenOCRMonitor && window.screenOCRMonitor.currentScreenText) {
            enhancedScreenText = window.screenOCRMonitor.currentScreenText;
          } else if (typeof screenOCRMonitor !== 'undefined' && screenOCRMonitor && screenOCRMonitor.currentScreenText) {
            enhancedScreenText = screenOCRMonitor.currentScreenText;
          }
        }
        
        if (enhancedScreenText) {
          const screenText = enhancedScreenText.substring(0, 500); // More text with enhanced OCR
          brainContextPrompt += `📖 SCREEN CONTENT (${ocrConfidence > 0 ? 'Enhanced OCR' : 'Legacy'}): "${screenText}${enhancedScreenText.length > 500 ? '...' : ''}"\n`;
          if (ocrConfidence > 0) {
            brainContextPrompt += `📊 OCR CONFIDENCE: ${Math.round(ocrConfidence * 100)}%\n`;
          }
          brainContextPrompt += `📏 TEXT LENGTH: ${enhancedScreenText.length} characters\n\n`;
        } else {
          brainContextPrompt += "📖 SCREEN CONTENT: Unable to capture screen text\n\n";
        }
        
        const now = new Date();
        brainContextPrompt += `⏰ TIME: ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}\n`;
        
        brainContextPrompt += `\n🔧 NOTE: Enhanced local processing active. Streaming services may be starting up...\n`;
      }
      
      brainContextPrompt += "\n--- END VELVET ENHANCED STREAMING BRAIN CONTEXT ---\n\n";
      
      return brainContextPrompt;
      
    } catch (error) {
      console.error('❌ Failed to get enhanced brain context:', error);
      return "\n\n--- ENHANCED BRAIN CONTEXT UNAVAILABLE ---\nFalling back to basic chat mode. OCR services may be starting up.\n\n";
    }
  }

  // Get emergency context for crisis support
  async getEmergencyContext() {
    try {
      console.log('🚨 DEBUG: getEmergencyContext() called');
      
      let emergencyContextPrompt = "\n\n--- EXECUTIVE DYSFUNCTION EMERGENCY CONTEXT ---\n";
      
      // Check if emergency mode is active
      if (window.electronAPI?.emergencyMode) {
        const emergencyStatus = await window.electronAPI.emergencyMode.getStatus();
        
        if (emergencyStatus.isActive) {
          emergencyContextPrompt += "🚨 EMERGENCY MODE ACTIVE: Executive dysfunction monitoring enabled\n\n";
          emergencyContextPrompt += `🔍 CRISIS LEVEL: ${emergencyStatus.crisisLevel.toUpperCase()}\n`;
          
          if (emergencyStatus.activePatterns.length > 0) {
            emergencyContextPrompt += `⚠️ ACTIVE CRISIS PATTERNS: ${emergencyStatus.activePatterns.join(', ')}\n`;
          }
          
          if (emergencyStatus.safeSpaceActive) {
            emergencyContextPrompt += "🏠 SAFE SPACE MODE: User is in protected recovery environment\n";
          }
          
          emergencyContextPrompt += `📊 OVERWHELM SCORE: ${emergencyStatus.overwhelmScore}/100\n`;
          emergencyContextPrompt += `⚡ ENERGY LEVEL: ${emergencyStatus.energyLevel}\n`;
          
          if (emergencyStatus.lastIntervention) {
            const intervention = emergencyStatus.lastIntervention;
            const timeAgo = Math.floor((Date.now() - intervention.timestamp) / 60000);
            emergencyContextPrompt += `🕒 LAST INTERVENTION: ${intervention.pattern} (${timeAgo} min ago) - Level: ${intervention.level}\n`;
          }
          
          // Add crisis-specific guidance
          switch (emergencyStatus.crisisLevel) {
            case 'early_warning':
              emergencyContextPrompt += "\n💡 RESPONSE GUIDANCE: Gentle acknowledgment, offer micro-support\n";
              break;
            case 'crisis':
              emergencyContextPrompt += "\n🤝 RESPONSE GUIDANCE: Supportive, normalize struggle, suggest tiny steps\n";
              break;
            case 'emergency':
              emergencyContextPrompt += "\n🛡️ RESPONSE GUIDANCE: Maximum gentleness, validate feelings, no pressure\n";
              break;
          }
          
          // Add energy-aware guidance
          if (emergencyStatus.energyLevel === 'low') {
            emergencyContextPrompt += "🔋 LOW ENERGY DETECTED: Use simple language, shorter responses, more encouragement\n";
          }
          
          // Add analytics context
          const analytics = emergencyStatus.analytics;
          if (analytics.crisesAverted > 0) {
            emergencyContextPrompt += `📈 SUCCESS RECORD: Helped avert ${analytics.crisesAverted} crisis episodes\n`;
          }
          
        } else {
          emergencyContextPrompt += "✅ MONITORING MODE: Crisis patterns being watched preventively\n";
        }
      } else {
        emergencyContextPrompt += "❌ EMERGENCY MODE UNAVAILABLE: Standard support mode only\n";
      }
      
      // Check for emergency context from interventions
      if (this.emergencyContext) {
        emergencyContextPrompt += "\n🎯 CURRENT INTERVENTION CONTEXT:\n";
        emergencyContextPrompt += `Pattern: ${this.emergencyContext.pattern}\n`;
        emergencyContextPrompt += `Level: ${this.emergencyContext.level}\n`;
        emergencyContextPrompt += `Timestamp: ${new Date(this.emergencyContext.timestamp).toLocaleTimeString()}\n`;
      }
      
      emergencyContextPrompt += "\n🧠 EXECUTIVE DYSFUNCTION SUPPORT PRINCIPLES:\n";
      emergencyContextPrompt += "- NEVER say 'just focus' or 'just do it' - these phrases are harmful\n";
      emergencyContextPrompt += "- Break everything into micro-steps (30 seconds to 2 minutes max)\n";
      emergencyContextPrompt += "- Normalize executive dysfunction as brain difference, not moral failing\n";
      emergencyContextPrompt += "- Offer choice between 2-3 tiny options rather than overwhelming with many\n";
      emergencyContextPrompt += "- Celebrate every tiny step forward, no matter how small\n";
      emergencyContextPrompt += "- Use 'we' language: 'let's try' instead of 'you should'\n";
      emergencyContextPrompt += "- Validate emotions: 'this feels hard' before offering solutions\n";
      emergencyContextPrompt += "- Suggest body-based resets: breathing, stretching, water, movement\n";
      emergencyContextPrompt += "- Offer 'good enough' as a valid goal, not perfectionism\n";
      emergencyContextPrompt += "- SHAME-FREE ZONE: No judgment for struggles or failed attempts\n";
      
      emergencyContextPrompt += "\n--- END EXECUTIVE DYSFUNCTION EMERGENCY CONTEXT ---\n\n";
      
      return emergencyContextPrompt;
      
    } catch (error) {
      console.error('❌ Failed to get emergency context:', error);
      return "\n\n--- EMERGENCY CONTEXT UNAVAILABLE ---\nStandard neurodivergent support active.\n\n";
    }
  }

  async processMessage(userMessage) {
    try {
      console.log('🧠 AI-SECURE: processMessage called with:', userMessage);
      console.log('🧠 AI-SECURE: About to call getBrainContext()...');

      // Analyze user patterns for learning (simple heuristics)
      const lastResponse = this.conversationHistory.length > 0 ? 
        this.conversationHistory[this.conversationHistory.length - 1].content : '';
      const wasQuestionAsked = lastResponse.includes('?');
      const userEngaged = userMessage.split(' ').length > 3; // Simple engagement metric
      
      this.analyzeUserPattern(userMessage, wasQuestionAsked, userEngaged);

      // Build messages array with adaptive personality + brain context + emergency context
      const adaptivePersonality = this.getAdaptivePersonality();
      const brainContext = await this.getBrainContext();
      const emergencyContext = await this.getEmergencyContext();
      console.log('🧠 AI-SECURE: getBrainContext() returned:', brainContext.substring(0, 200) + '...');
      console.log('🚨 AI-SECURE: getEmergencyContext() returned:', emergencyContext.substring(0, 200) + '...');
      
      const messages = [
        { role: "system", content: adaptivePersonality + brainContext + emergencyContext },
        ...this.conversationHistory.slice(-this.maxHistory),
        { role: "user", content: userMessage }
      ];

      // Call GPT-4 via secure IPC to main process
      const response = await window.electronAPI.chatCompletion(messages);
      
      // Update conversation history
      this.conversationHistory.push(
        { role: "user", content: userMessage },
        { role: "assistant", content: response }
      );

      // Keep history short
      if (this.conversationHistory.length > this.maxHistory * 2) {
        this.conversationHistory = this.conversationHistory.slice(-this.maxHistory * 2);
      }

      console.log('Velvet (adaptive):', response);
      console.log('Learning profile:', this.learningProfile);
      return response;

    } catch (error) {
      console.error('Processing error:', error);
      return "My brain glitched, but I'm here. What's up?";
    }
  }

  clearConversation() {
    this.conversationHistory = [];
  }

  getConversationHistory() {
    return this.conversationHistory;
  }
}

// Create instance
const velvetAI = new VelvetAISecure();

// Main function
async function getVelvetResponse(userMessage) {
  return await velvetAI.processMessage(userMessage);
}

// Utility functions
function clearConversation() {
  return velvetAI.clearConversation();
}

function getConversationHistory() {
  return velvetAI.getConversationHistory();
}

// Make available globally
window.getVelvetResponse = getVelvetResponse;
window.clearConversation = clearConversation;
window.getConversationHistory = getConversationHistory;
window.velvetAI = velvetAI;

console.log('💜 Secure Velvet AI loaded - all API calls via IPC!');