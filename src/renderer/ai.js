// Velvet AI - Casual English-Dominant Personality
// 70% English, 30% Hindi sprinkled in naturally

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

class VelvetAI {
  constructor() {
    this.conversationHistory = [];
    this.maxHistory = 6; // Keep history short for better responses
  }

  async callOpenAI(userMessage) {
    try {
      console.log('🤖 Direct OpenAI API request');
      
      const messages = [
        { role: "system", content: VELVET_PERSONALITY },
        ...this.conversationHistory.slice(-this.maxHistory),
        { role: "user", content: userMessage }
      ];

      // Direct OpenAI API call
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: messages,
          max_tokens: 120,
          temperature: 0.8,
          frequency_penalty: 0.5,
          presence_penalty: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();

    } catch (error) {
      console.error('OpenAI API Error:', error);
      return "Something went wrong, but I'm still here for you!";
    }
  }

  async getResponse(userMessage) {
    try {
      const response = await this.callOpenAI(userMessage);
      
      // Update conversation history
      this.conversationHistory.push(
        { role: "user", content: userMessage },
        { role: "assistant", content: response }
      );
      
      // Keep history manageable
      if (this.conversationHistory.length > this.maxHistory * 2) {
        this.conversationHistory = this.conversationHistory.slice(-this.maxHistory * 2);
      }
      
      return response;
      
    } catch (error) {
      console.error('Error getting Velvet response:', error);
      return "I'm having a little trouble right now, but I'm still here with you!";
    }
  }
}

// Create global instance
const velvetAI = new VelvetAI();

// Export function for use in main app
async function getVelvetResponse(message) {
  return await velvetAI.getResponse(message);
}

// Make it available globally
if (typeof window !== 'undefined') {
  window.getVelvetResponse = getVelvetResponse;
}

module.exports = { getVelvetResponse };