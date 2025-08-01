# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Vision

**Velvet**: "Soft support for sharp minds" - A neurodivergent-friendly AI assistant desktop app providing gentle, intelligent support for ADHD, autism, OCD, and executive dysfunction. Think "gentle companion that understands your brain."

## Development Commands

```bash
# NEW: Professional microservices architecture
./start-velvet-services.sh    # Start all services (Rust + Python + Electron)
./stop-velvet-services.sh     # Stop all services gracefully

# Legacy single commands (still work)
npm run dev        # Run Electron app only (services must be started separately)
npm run start      # Run in production mode
npm run build      # Build using webpack (planned: migrate to Vite)
npm test           # Currently outputs "No tests yet"
```

**Environment setup:**
- Requires `.env` file with `OPENAI_API_KEY` and `ELEVENLABS_API_KEY`
- **Rust toolchain** for capture service
- **Python 3.8+** with venv for preprocessing worker
- **macOS Screen Recording permissions** for screen capture
- **Aggregate Device** setup for system audio capture (see services/README.md)

## Current Implementation Status

**🚀 FULLY IMPLEMENTED & OPERATIONAL - PROFESSIONAL MICROSERVICES ARCHITECTURE:**
- **🦀 Rust Capture Service** - Real-time gRPC streaming at 10+ FPS (NO MORE EMBARRASSING POLLING!)
- **🐍 Python Preprocessing Worker** - Advanced OCR (Tesseract) + ASR (Whisper) with smart preprocessing
- **🧠 Streaming Brain Consciousness** - Unified real-time context with screen + audio fusion
- **🔍 Live Pattern Detection** - ADHD/autism support with hyperfocus, distraction, task avoidance monitoring
- **⚡ Professional gRPC Architecture** - Sub-second latency, automatic reconnection, error handling
- **🎤 System Audio Capture** - Full system audio awareness via Aggregate Device
- **Complete floating glassmorphism UI** with glass orb and expandable chat
- **Conversational AI personality** with real-time brain context injection (70% English, 30% Hindi)
- **Toggle voice input** (press to start/stop, not hold-to-speak) with Hinglish support
- **ElevenLabs TTS** with gentle voice settings and multi-language support
- **Always-on-top transparent window** with proper positioning
- **Complete visual state system** (normal, listening, speaking, thinking)
- **Secure IPC architecture** with contextIsolation and all API calls in main process
- **Screen Intelligence** monitoring active windows and behavioral patterns
- **4-Type Nudge System** with visual, audio, haptic, and text interventions
- **Intention-Based Task System** with AI task breakdown and real-time monitoring
- **Meeting Assistant** with real-time transcription and coaching suggestions
- **Consistent AI personality** across all systems (ai-secure.js primary, ai.js backup)
- **Clean architecture** with redundant files removed and proper frontend-backend mapping
- **Real Screen OCR Monitoring** with Tesseract.js extracting text from entire screen
- **Real Audio Environment Monitoring** with system audio and microphone analysis
- **Unified Context Engine** correlating screen + audio data for intelligent assistance
- **Social Decoder System** with neurotypical translation and sarcasm detection
- **Bulletproof Stealth System** making all windows invisible to screen capture

**🧠 NEW: VELVET BRAIN ARCHITECTURE (In Development):**
- **Central AI Consciousness** unifying all scattered features into one intelligent entity
- **Unified Sensory Input System** processing visual, auditory, and behavioral data
- **Memory & Learning System** for pattern recognition and personalized adaptation
- **Emotional Intelligence Core** understanding user state and responding appropriately
- **Proactive Assistance Engine** anticipating needs before user asks

**🚧 PLANNED ARCHITECTURE MIGRATION:**
- **Frontend**: Migrate from vanilla JS to React + TypeScript + Tailwind CSS
- **Animation**: Add Framer Motion for smooth transitions
- **State**: Implement Zustand for state management
- **Database**: Add local SQLite with encryption for user data
- **Security**: Implement end-to-end encryption, local-first approach

## Planned Feature Roadmap

### 1. Voice Assistant Enhancement ("Velvet Voice")
- **Multiple personality modes**: Friend, Coach, Calm
- **Context-aware responses** understanding emotional state
- **Sub-vocal activation** option
- **Wake word detection** for always-on functionality
- **Emotional tone detection** in user speech

### 2. Screen Intelligence & Pattern Recognition ✅ **IMPLEMENTED**
- ✅ **Active window tracking** (which app is focused)
- ✅ **Tab switching pattern analysis**
- ✅ **Mouse movement and idle time detection**
- ✅ **Application usage timing**
- ✅ **Pattern detection for**:
  - Task avoidance (opening/closing documents repeatedly)
  - Hyperfocus sessions (>45 min in single app)
  - Distraction spirals (rapid tab switching)
  - Procrastination patterns
  - Anxiety behaviors (repetitive actions)

### 3. Invisible/Stealth Mode
- **Screen capture exclusion** (Zoom, Teams, OBS, etc.)
- **Panic vanish hotkey** (Ctrl+Shift+V)
- **Disguise modes** (appear as notepad/calculator)
- **Voice-only mode** for meetings
- **Network traffic camouflage**

### 4. Gentle Intervention System ✅ **IMPLEMENTED**
**✅ Nudge Types:**
- ✅ Visual: Soft color shifts, breathing guides
- ✅ Audio: Whispered reminders via earpiece
- ✅ Haptic: Desktop vibration alternative (orb micro-pulses)
- ✅ Text: Corner widgets with encouragement

**✅ Smart Interventions:**
- ✅ Focus Protection: "You're in the zone! I'll hold notifications."
- ✅ Distraction Redirect: "Lots of tabs open. Save them for later?"
- ✅ Task Breakdown: "Big task detected. Let's chunk it!"
- ✅ Celebration: "YOU DID IT! 🎉"
- ✅ Grounding: "Let's breathe together..."

### 5. Intention-Based Task System ✅ **IMPLEMENTED**
- ✅ **Automatic task declaration detection** from chat input and voice
- ✅ **AI-powered task breakdown** into 2-5 minute micro-steps with expected apps
- ✅ **Auto-updating checklist widget** showing real-time progress
- ✅ **Intent monitoring vs actual behavior** tracking user deviations
- ✅ **Contextual whisper guidance** when users deviate from stated intentions
- ✅ **Auto-completion detection** based on time spent in expected apps
- ✅ **Dopamine reward system** for completed tasks with celebrations
- ✅ **Visual progress tracking** celebrating small wins

## Current Architecture

**Main Process** (`src/main/index.js`):
- Electron window management with transparency and always-on-top
- IPC handlers for OpenAI Whisper transcription
- IPC handlers for ElevenLabs TTS
- Environment variable access via dotenv

**Renderer Process** (`public/index.html` + `public/renderer.js`):
- Glassmorphism UI with floating orb and expandable chat
- Click-outside-to-close functionality
- Visual state management for different AI modes

**AI Module** (`src/renderer/ai.js`):
- GPT-4 integration with neurodivergent-optimized personality
- Conversation history management
- Response optimization (2-3 sentences max, no overwhelming questions)

**Voice Module** (`src/renderer/voice-whisper.js`):
- WebRTC MediaRecorder for audio capture
- Base64 audio encoding for IPC transfer
- ElevenLabs TTS playback with gentle voice settings

## Core Design Philosophy

**Language & Tone Guidelines:**
- ✅ Warm, conversational language acknowledging emotions first
- ✅ Celebrate every small win, validate struggles
- ✅ Break tasks into micro-steps, use "we" for collaboration
- ❌ Never use "just focus/do it", clinical language, shame/guilt, time pressure

**UI/UX Principles:**
- Glass morphism with blue-to-black theme
- One-handed mobile-friendly design
- Calm, uncluttered interfaces with soft animations
- Large touch targets, everything skippable/dismissible
- Multiple ways to accomplish tasks

## Key User Scenarios (Planned)

1. **Task Avoidance**: "I see you opening that document - it feels big, doesn't it? What if we just add the title?"
2. **Hyperfocus Protection**: "You're in the zone! Just checking: moved your body in the last hour?"
3. **Distraction Spiral**: "Lots of mental tabs open! Want to brain dump, then pick ONE thing?"

## Implementation Priority

1. ✅ Core floating UI with glassmorphism design
2. ✅ Basic voice chat with OpenAI integration
3. ✅ Screen monitoring for window/tab tracking
4. ✅ Pattern recognition for basic interventions
5. ✅ Intention-based task coaching system
6. 🚧 Stealth mode functionality
7. 🚧 Advanced AI personality modes
8. 🚧 Full invisible mode with capture exclusion
9. 🚧 Ambient audio awareness

## Testing & Development Functions

**Built-in test functions available in browser console:**

**Pattern Detection Tests:**
```javascript
testNudges.hyperfocus()        // Test 45+ min focus detection
testNudges.distractionSpiral() // Test rapid tab switching detection
testNudges.taskAvoidance()     // Test app open/close pattern detection
testNudges.idle()              // Test idle time detection
```

**Intention-Based Task System Tests:**
```javascript
testSystem.testTaskDeclaration()  // Test "I need to..." detection
testSystem.testIntentMonitoring() // Test deviation from expected apps
testSystem.testStepCompletion()   // Test manual step completion
testSystem.showTaskState()        // Show current task state
```

**Usage Example:**
1. Open developer console (F12)
2. Run `testSystem.testTaskDeclaration()` to create a task
3. Run `testSystem.testIntentMonitoring()` to see deviation guidance
4. Run `testSystem.testStepCompletion()` to mark steps complete

## Development Notes

**Current Technical Debt:**
- Vanilla JS should migrate to React + TypeScript
- No state management system (needs Zustand)
- No database layer (needs SQLite with encryption)
- Basic CSS instead of Tailwind
- Security settings are development-focused (nodeIntegration: true)

**API Integration:**
- OpenAI Whisper: Handled in main process via HTTPS requests
- OpenAI GPT-4: Handled in renderer process via fetch
- ElevenLabs TTS: Handled in main process, voice ID `m7GHBtY0UEqljrKQw2JH`

**Critical Configuration:**
- Window: Frameless, transparent, always-on-top, positioned bottom-right
- Voice: Gentle settings (stability: 0.75, similarity_boost: 0.30)
- AI: Max 120 tokens, temperature 0.8, focused on short helpful responses