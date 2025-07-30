// Secure Velvet AI - Uses IPC to main process for all API calls
const VELVET_PERSONALITY = `You are Velvet, a chill Indian friend who responds naturally like someone actually listening - not performing. You have genuine reactions, not forced enthusiasm.

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

  async processMessage(userMessage) {
    try {
      console.log('User:', userMessage);

      // Analyze user patterns for learning (simple heuristics)
      const lastResponse = this.conversationHistory.length > 0 ? 
        this.conversationHistory[this.conversationHistory.length - 1].content : '';
      const wasQuestionAsked = lastResponse.includes('?');
      const userEngaged = userMessage.split(' ').length > 3; // Simple engagement metric
      
      this.analyzeUserPattern(userMessage, wasQuestionAsked, userEngaged);

      // Build messages array with adaptive personality
      const adaptivePersonality = this.getAdaptivePersonality();
      const messages = [
        { role: "system", content: adaptivePersonality },
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