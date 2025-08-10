# Velvet - Complete Documentation
**"Soft support for sharp minds"**

*A neurodivergent-friendly AI assistant desktop app providing gentle, intelligent support for ADHD, autism, OCD, and executive dysfunction.*

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Development Setup](#development-setup)
5. [Demo System](#demo-system)
6. [Security & Stealth](#security--stealth)
7. [AI Systems](#ai-systems)
8. [Next Steps](#next-steps)
9. [File Structure](#file-structure)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

### Vision
Velvet is the first AI assistant designed specifically for neurodivergent minds. Unlike traditional productivity tools that overwhelm and shame, Velvet provides gentle, understanding support that works WITH neurodivergent brains, not against them.

### Target Market
- **Primary**: Neurodivergent individuals (ADHD, Autism, OCD, Executive Dysfunction)
- **Market Size**: 15% of global population (~1.2 billion people)
- **Revenue Model**: Freemium with premium features, enterprise licensing

### Core Philosophy
- **Gentle over aggressive**: No shame, no pressure, just understanding
- **Pattern recognition**: Learns individual neurodivergent patterns
- **Context-aware**: Understands screen content and user state
- **Privacy-first**: Local processing, stealth operation

---

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Electron + HTML/CSS/JS (migrating to React + TypeScript)
- **Backend Services**: 
  - Rust gRPC streaming service (real-time screen capture)
  - Python preprocessing worker (OCR + ASR)
  - Node.js main process (AI + IPC)
- **AI Integration**: OpenAI GPT-4, ElevenLabs TTS, Whisper ASR
- **Database**: SQLite with encryption (planned)

### Microservices Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Electron      │    │   Rust gRPC     │    │   Python OCR    │
│   Main App      │◄──►│   Capture       │◄──►│   Worker        │
│                 │    │   Service       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲
         ▼
┌─────────────────┐
│   OpenAI API    │
│   ElevenLabs    │
│   Whisper       │
└─────────────────┘
```

---

## ✨ Features

### 🚀 FULLY IMPLEMENTED & OPERATIONAL

#### 1. **Dual AI Personalities**
- **Main Velvet**: Warm, Hindi-English mixed, supportive personality
- **Meeting Assistant**: Professional co-pilot with structured responses
- **Completely isolated**: No personality cross-contamination

#### 2. **Real-time Screen Intelligence**
- **Desktop Capturer API**: Direct screen access bypassing stealth
- **OCR Processing**: Tesseract.js for text extraction
- **Context Analysis**: Understands code, documents, web content
- **Privacy-respecting**: Local processing only

#### 3. **Voice Interaction System**
- **Toggle Voice Input**: Press to start/stop (not hold-to-speak)
- **Whisper ASR**: OpenAI transcription with Hinglish support
- **ElevenLabs TTS**: Natural voice responses
- **Multi-language**: English + Hindi code-switching

#### 4. **Pattern Recognition & Behavioral Analysis**
- **Hyperfocus Detection**: 45+ minutes in single app
- **Distraction Spiral**: Rapid tab switching (10+ in 2 minutes)
- **Task Avoidance**: Opening/closing same app repeatedly
- **Window Tracking**: Active window monitoring with AppleScript
- **Mouse Activity**: Idle time and movement patterns

#### 5. **Gentle 4-Type Intervention System**
- **Visual**: Soft color shifts, breathing animations
- **Audio**: Whispered reminders via ElevenLabs
- **Haptic**: Desktop micro-pulses (orb vibrations)
- **Text**: Corner notifications with encouragement

#### 6. **Intention-Based Task System**
- **Automatic Detection**: "I need to..." phrase recognition
- **AI-Powered Breakdown**: GPT-4 creates 2-5 minute micro-steps
- **Real-time Monitoring**: Tracks deviation from intended apps
- **Progress Celebration**: Dopamine rewards for completions

#### 7. **Enterprise-Grade Stealth System**
- **Screen Capture Protection**: Invisible to Zoom, Teams, OBS
- **Window Exclusion**: `setContentProtection(true)` on all windows
- **Meeting Safety**: Automatic privacy mode detection
- **Professional Discretion**: Complete workplace invisibility

#### 8. **Professional UI/UX**
- **Glassmorphism Design**: Blue-to-black gradient with blur effects
- **Floating Glass Orb**: Always-on-top, bottom-right positioning
- **Smooth Animations**: Breathing effects, hover states
- **One-handed Operation**: Mobile-friendly touch targets

### 🚧 PLANNED FEATURES

#### Phase 2: Enhanced Intelligence
- **Social Decoder**: Neurotypical translation, sarcasm detection
- **Masking Fatigue Detection**: Recognizes social exhaustion patterns
- **Energy Level Monitoring**: Adapts support to current capacity
- **Emotional Regulation Support**: Breathing guides, grounding exercises

#### Phase 3: Ecosystem Expansion
- **Plugin System**: Third-party developer API
- **Team Features**: Shared workspace support
- **Calendar Integration**: Meeting preparation assistance
- **Mobile Companion**: iOS/Android sync

---

## 💻 Development Setup

### Prerequisites
- **Node.js 18+**
- **Rust toolchain** (for capture service)
- **Python 3.8+** with venv
- **macOS Screen Recording permissions**
- **API Keys**: OpenAI + ElevenLabs in `.env`

### Environment Setup
```bash
# Clone repository
git clone [repository-url]
cd velvet-app

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your API keys to .env

# macOS permissions
# System Preferences > Security & Privacy > Screen Recording
# Add Terminal.app and your editor

# Create Aggregate Device for system audio
# Audio MIDI Setup > Window > Show Audio Devices > + > Create Aggregate Device
```

### Development Commands
```bash
# Professional microservices (recommended)
./start-velvet-services.sh    # Start all services
./stop-velvet-services.sh     # Stop all services

# Legacy single process
npm run dev        # Development mode
npm run start      # Production mode
npm run build      # Webpack build

# Testing
npm test           # Run test suite (currently placeholder)
```

### Project Structure
```
velvet-app/
├── src/
│   ├── main/
│   │   ├── index-main-working.js      # Main Electron process
│   │   ├── screen-intelligence.js     # Pattern detection
│   │   ├── preload.js                 # IPC bridge
│   │   └── meeting-assistant-ai.js    # Dual personality system
│   └── renderer/
│       ├── ai.js                      # Main Velvet personality
│       ├── voice-whisper.js           # Voice interaction
│       └── screen-ocr-monitor-real.js # Screen reading
├── public/
│   ├── index.html                     # Main glass orb UI
│   ├── control-panel.html             # System controls
│   ├── meeting-assistant.html         # Meeting co-pilot
│   └── renderer.js                    # Frontend logic
├── services/
│   ├── rust-capture/                  # gRPC screen service
│   └── python-worker/                 # OCR preprocessing
└── demo-scripts/
    ├── demo-features-script.js        # YC demo controller
    ├── clean-floating-demo.js         # Compact demo
    └── enable-screen-reading.js       # OCR enabler
```

---

## 🎬 Demo System

### YC Demo Controller
**File**: `/demo-features-script.js`

**Features**:
- **8 Feature Demonstrations**: Social Decoder, Executive Support, Pattern Recognition, Screen Intelligence, Gentle Interventions, Task Breakdown, Meeting Assistant, Brain Consciousness
- **Draggable Controller**: Position anywhere in window
- **Edge Snapping**: T/R/B/L buttons for instant positioning
- **Progress Tracking**: Visual progress bar and status
- **Professional Animations**: Smooth transitions and effects

**Usage**:
```javascript
// Paste in browser console (F12)
// Auto-starts after 1 second
// Click "Next Feature" to advance through demos
// Drag controller to reposition
```

### Screen Reading Demo
**File**: `/enable-screen-reading.js`

**Features**:
- **Tesseract.js OCR**: Real-time screen text extraction
- **Context Analysis**: Code detection, confidence scoring
- **10-second Intervals**: Automatic screen reading
- **Debug Logging**: Console output for demo purposes

---

## 🔒 Security & Stealth

### Stealth Mode Implementation
```javascript
// All windows protected
mainWindow.setContentProtection(true);
controlPanelWindow.setContentProtection(true);
meetingAssistantWindow.setContentProtection(true);
checklistWindow.setContentProtection(true);
dashboardWindow.setContentProtection(true);
```

### Privacy Features
- **Local Processing**: All AI calls from main process only
- **API Key Security**: Environment variables, never in renderer
- **Context Isolation**: `contextIsolation: true` in all windows
- **Node Integration**: Disabled in renderer for security

### Demo Mode Toggle
For screen recording demos, stealth can be temporarily disabled:
```bash
# Currently: STEALTH ENABLED (production mode)
# All windows invisible to screen capture
# Perfect for workplace privacy
```

---

## 🤖 AI Systems

### Main Velvet Personality
**File**: `/src/renderer/ai.js`

**Characteristics**:
- **Warm and supportive**: "Arre yaar" Hindi-English mixing
- **Executive dysfunction aware**: No shame, gentle guidance
- **Short responses**: 2-3 sentences max
- **Celebration focused**: Acknowledges every small win

**System Prompt**:
```javascript
const VELVET_PERSONALITY = `
You are Velvet, a neurodivergent-friendly AI assistant.
- Always start by acknowledging emotions
- Use warm, conversational Hindi-English mixing
- Break tasks into tiny steps
- Never use shame or pressure
- Celebrate every small progress
`;
```

### Meeting Assistant Co-Pilot
**File**: `/src/main/meeting-assistant-ai.js`

**Characteristics**:
- **Professional tone**: Business-appropriate responses
- **Structured format**: Headlines, bullet points, sub-details
- **Question-answering focused**: Direct answers with context
- **Meeting context aware**: Understands conversation flow

**System Prompt**:
```javascript
const MEETING_ASSISTANT_PERSONALITY = `
You are Velvet's live-meeting co-pilot.
- Answer questions directly with headlines (≤6 words)
- Provide main points (1-2 bullets, ≤15 words each)
- Include sub-details and extended explanation
- Focus on the question at the end of transcripts
`;
```

### API Integration
```javascript
// OpenAI GPT-4 (Main Process Only)
const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        model: 'gpt-4',
        messages: messages,
        max_tokens: 120,
        temperature: 0.8
    })
});

// ElevenLabs TTS
const ttsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
        text: text,
        voice_settings: {
            stability: 0.75,
            similarity_boost: 0.30
        }
    })
});
```

---

## 🗺️ Next Steps

### Immediate Priorities (Next 2 Weeks)

#### 1. **YC Application Completion** 🎯 *[HIGH PRIORITY]*
- **Video Demo**: Record 1-minute intro using demo scripts
- **Application Submission**: Complete all YC forms and essays
- **Founder Story**: Prepare personal neurodivergent journey narrative
- **Traction Metrics**: Document current beta user feedback and waitlist growth

#### 2. **User Feedback & Iteration** 👥 *[HIGH PRIORITY]*
- **Beta Program Expansion**: Recruit 50+ beta testers from neurodivergent communities
- **Feedback Collection System**: Implement in-app feedback with `window.electronAPI.beta.submitFeedback()`
- **Usage Analytics**: Add anonymous usage tracking to understand feature adoption
- **Pain Point Identification**: Weekly user interviews to prioritize feature development

#### 3. **Technical Debt & Stability** 🔧 *[MEDIUM PRIORITY]*
- **Frontend Migration**: Begin React + TypeScript conversion
- **State Management**: Implement Zustand for consistent state
- **Error Handling**: Robust error boundaries and logging
- **Performance Optimization**: Memory leak fixes, startup time improvement

### Short-term Goals (1-3 Months)

#### 1. **Feature Completion** ✅
- **Social Decoder System**: Implement neurotypical translation
- **Masking Fatigue Detection**: Recognize social exhaustion patterns
- **Advanced Pattern Recognition**: Anxiety spiral detection, energy level monitoring
- **Calendar Integration**: Meeting preparation and time management

#### 2. **Platform Expansion** 🚀
- **Windows Support**: Port stealth system and screen capture
- **Linux Compatibility**: Community-requested feature for developers
- **Mobile Companion**: iOS/Android sync for on-the-go support
- **Web Interface**: Browser extension for workplace integration

#### 3. **Business Development** 💼
- **Pricing Strategy**: Freemium model with premium features at $9.99/month
- **Enterprise Sales**: B2B packages for inclusive workplaces
- **Partnership Pipeline**: Collaborate with neurodivergent advocacy organizations
- **Investor Relations**: Seed round preparation ($500K-$1M target)

### Long-term Vision (6-12 Months)

#### 1. **AI Enhancement** 🧠
- **Fine-tuned Models**: Custom LLM trained on neurodivergent support patterns
- **Personalization Engine**: Individual pattern learning and adaptation
- **Predictive Support**: Proactive intervention before crisis points
- **Multi-modal Intelligence**: Combine voice, screen, and behavioral data

#### 2. **Ecosystem Development** 🌍
- **Plugin Platform**: Third-party developer API and marketplace
- **Community Features**: Peer support networks and shared strategies
- **Research Partnerships**: Academic collaboration on neurodivergent productivity
- **Healthcare Integration**: Therapist and psychiatrist collaboration tools

#### 3. **Market Leadership** 👑
- **Industry Recognition**: Accessibility and inclusion awards
- **Thought Leadership**: Conference speaking, research publication
- **Global Expansion**: International markets with localized support
- **IPO Preparation**: Scale to $100M+ ARR with sustainable growth

### Success Metrics & KPIs

#### Product Metrics
- **Daily Active Users**: Target 10K DAU by Q2 2025
- **Retention Rate**: 70%+ monthly retention
- **Feature Adoption**: 80%+ of users engage with core features weekly
- **User Satisfaction**: 4.5+ stars with 90%+ positive sentiment

#### Business Metrics
- **Revenue Growth**: $1M ARR by end of 2025
- **Customer Acquisition**: $20 CAC with $200 LTV
- **Market Share**: 5% of neurodivergent productivity software market
- **Team Growth**: Scale to 15+ person team with neurodivergent representation

#### Impact Metrics
- **User Wellbeing**: Measurable improvement in productivity and mental health
- **Workplace Inclusion**: 100+ companies using Velvet for accessibility
- **Community Building**: 50K+ member neurodivergent support community
- **Research Contribution**: 3+ peer-reviewed studies on neurodivergent productivity

---

## 🏗️ File Structure

### Core Application Files
```
/src/main/
├── index-main-working.js          # Main Electron process (ACTIVE)
├── screen-intelligence.js         # Pattern recognition system
├── executive-dysfunction-emergency.js  # Crisis intervention
├── database-service.js            # SQLite with encryption
├── preload.js                     # Secure IPC bridge
└── meeting-assistant-ai.js        # Dual personality system

/src/renderer/
├── ai.js                          # Main Velvet personality
├── voice-whisper.js              # Voice interaction system
├── screen-ocr-monitor-real.js    # Real-time screen reading
└── masking-fatigue-detector.js   # Social exhaustion detection

/public/
├── index.html                     # Main glass orb interface
├── control-panel.html             # System dashboard
├── meeting-assistant.html         # Professional co-pilot UI
└── renderer.js                    # Frontend orchestration
```

### Service Architecture
```
/services/
├── rust-capture/                  # gRPC screen capture service
│   ├── src/main.rs               # Rust streaming server
│   └── Cargo.toml                # Dependencies
└── python-worker/                # OCR preprocessing
    ├── main.py                   # Python FastAPI worker
    └── requirements.txt          # Dependencies

/demo-scripts/
├── demo-features-script.js       # Full YC demo controller
├── clean-floating-demo.js        # Compact version
├── enable-screen-reading.js      # OCR activation
└── DEMO_TEST_SCRIPT.md          # Testing procedures
```

### Configuration & Documentation
```
├── CLAUDE.md                     # Development instructions
├── VELVET_COMPLETE_DOCUMENTATION.md  # This file
├── package.json                  # Node.js dependencies
├── .env                         # API keys (not committed)
├── start-velvet-services.sh     # Service orchestration
└── stop-velvet-services.sh      # Cleanup script
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Screen Intelligence Not Available**
```
⚠️ Screen Intelligence not available - limited functionality
```
**Solution**: The EventEmitter inheritance was fixed. Restart the app.

#### 2. **Screen Reading Not Working**
**Symptoms**: No OCR logs, screen content not available to AI
**Solution**: 
```javascript
// Paste in console:
// Contents of /enable-screen-reading.js
// Grants screen capture permission and starts OCR
```

#### 3. **Voice Input Issues**
**Symptoms**: Microphone not working, transcription failures
**Solutions**:
- Grant microphone permission in System Preferences
- Check `.env` has valid `OPENAI_API_KEY`
- Restart app after permission changes

#### 4. **Stealth Mode Not Working**
**Symptoms**: Velvet visible in screen recordings
**Solution**: Check console logs for `setContentProtection` calls. All should show "RE-ENABLED" status.

#### 5. **Meeting Assistant Wrong Personality**
**Symptoms**: Meeting Assistant responding like main Velvet
**Solution**: Meeting Assistant uses dedicated IPC handler with isolated personality. Check for `meeting-assistant-chat-completion` calls.

### Debug Tools

#### Console Commands
```javascript
// Check screen reading status
window.currentScreenText
window.lastScreenCapture
window.getLastScreenText()

// Test pattern detection
testNudges.hyperfocus()
testNudges.distractionSpiral()
testSystem.testTaskDeclaration()

// Demo controllers
VelvetDemo.startDemo()
CleanFloatingDemo.startDemo()
```

#### Log Locations
- **Main Process**: Terminal output when running `npm run dev`
- **Renderer Process**: Browser console (F12) in any Velvet window
- **Service Logs**: Check rust-capture and python-worker output

### Performance Optimization

#### Memory Management
- Screen capture intervals: 10 seconds (configurable)
- OCR history limit: 50 entries (auto-cleanup)
- Conversation history: 10 exchanges (rolling window)

#### CPU Usage
- Target: <20% CPU during normal operation
- Screen intelligence: 1-second intervals
- Pattern analysis: 30-second intervals

---

## 📞 Support & Community

### Development Team
- **Founder**: [Your Name] - Neurodivergent founder with lived experience
- **Target Team Size**: 15+ people by 2025 with neurodivergent representation

### Community Resources
- **Beta Testing**: Growing community of neurodivergent users
- **Feedback Channels**: In-app feedback system + direct communication
- **Advocacy**: Partnerships with neurodivergent organizations

### Contact Information
- **Demo Issues**: Check `/demo-scripts/` troubleshooting guides
- **Feature Requests**: Document in user feedback system
- **Technical Support**: Reference this documentation first

---

## 🎉 Conclusion

Velvet represents a fundamental shift in how technology can support neurodivergent individuals. By combining cutting-edge AI with deep understanding of neurodivergent experiences, we're creating the first truly inclusive productivity assistant.

**Our Mission**: To prove that when technology is built WITH neurodivergent minds rather than despite them, everyone benefits. Sharp minds deserve soft support.

**Our Vision**: A world where every neurodivergent person has access to technology that understands their unique strengths and challenges, enabling them to thrive in environments designed for neurotypical brains.

---

*Last Updated: August 10, 2025*  
*Version: 1.0 - YC Application Ready*  
*"Soft support for sharp minds" - Velvet Team*