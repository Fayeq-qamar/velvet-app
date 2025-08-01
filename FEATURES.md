# Velvet AI - Feature Status & Roadmap

> "Soft support for sharp minds" - A neurodivergent-friendly AI assistant with bulletproof stealth capabilities

## 🎯 **COMPLETED FEATURES** ✅

### **Core AI Assistant**
- [x] **Floating glassmorphism UI** with glass orb and expandable chat
- [x] **GPT-4 integration** with neurodivergent-optimized personality (70% English, 30% Hindi)
- [x] **Toggle voice input** (press to start/stop) with Hinglish support
- [x] **ElevenLabs TTS** with gentle voice settings and multi-language support
- [x] **Always-on-top transparent window** with proper positioning
- [x] **Complete visual state system** (normal, listening, speaking, thinking)
- [x] **Secure IPC architecture** with contextIsolation and API calls in main process
- [x] **Conversational AI personality** - curious, supportive, warm tone

### **🛡️ Bulletproof Stealth System** 
- [x] **Permanent stealth mode** - All windows invisible to screen capture
- [x] **5-layer protection system**:
  - [x] Layer 1: Electron content protection
  - [x] Layer 2: Dynamic window level cycling
  - [x] Layer 3: Micro-opacity cycling (invisible to capture, visible to human eye)
  - [x] Layer 4: Process masking with system service names
  - [x] Layer 5: Advanced window properties (skip taskbar, workspace control)
- [x] **All windows protected** - Main app, control panel, meeting assistant, checklist
- [x] **Auto-stealth for new windows** - Automatic protection on window creation
- [x] **macOS optimized** - Command line switches and NSWindow integration
- [x] **Zero detection delays** - Activates immediately on startup
- [x] **Invisible to**: Discord, Google Meet, Zoom, Teams, OBS, screen recording

### **🎯 Screen Intelligence & Pattern Recognition**
- [x] **Active window tracking** (which app is focused)
- [x] **Tab switching pattern analysis**
- [x] **Mouse movement and idle time detection**
- [x] **Application usage timing**
- [x] **Pattern detection** for:
  - [x] Task avoidance (opening/closing documents repeatedly)
  - [x] Hyperfocus sessions (>45 min in single app)
  - [x] Distraction spirals (rapid tab switching)
  - [x] Procrastination patterns
  - [x] Anxiety behaviors (repetitive actions)

### **🎨 4-Type Nudge System**
- [x] **Visual nudges** - Soft color shifts, breathing guides
- [x] **Audio nudges** - Whispered reminders via earpiece
- [x] **Haptic nudges** - Desktop vibration alternative (orb micro-pulses)
- [x] **Text nudges** - Corner widgets with encouragement
- [x] **Smart interventions**:
  - [x] Focus Protection: "You're in the zone! I'll hold notifications."
  - [x] Distraction Redirect: "Lots of tabs open. Save them for later?"
  - [x] Task Breakdown: "Big task detected. Let's chunk it!"
  - [x] Celebration: "YOU DID IT! 🎉"
  - [x] Grounding: "Let's breathe together..."

### **📋 Intention-Based Task System**
- [x] **Automatic task declaration detection** from chat input and voice
- [x] **AI-powered task breakdown** into 2-5 minute micro-steps with expected apps
- [x] **Auto-updating checklist widget** showing real-time progress
- [x] **Intent monitoring vs actual behavior** tracking user deviations
- [x] **Contextual whisper guidance** when users deviate from stated intentions
- [x] **Auto-completion detection** based on time spent in expected apps
- [x] **Dopamine reward system** for completed tasks with celebrations
- [x] **Visual progress tracking** celebrating small wins

### **🎤 Meeting Assistant**
- [x] **Real-time transcription** with OpenAI Whisper
- [x] **AI coaching suggestions** during meetings
- [x] **Auto-launch detection** for meeting apps (Zoom, Teams, Meet, Discord)
- [x] **Meeting context awareness**
- [x] **Draggable interface** with auto-resizing based on content
- [x] **Voice recording** with press-to-speak functionality
- [x] **Question/Answer display** with smooth animations

### **⚙️ Technical Infrastructure**
- [x] **Electron-based desktop app** with transparency and always-on-top
- [x] **Environment variable management** with dotenv
- [x] **IPC handlers** for OpenAI Whisper transcription and ElevenLabs TTS
- [x] **Smart container system** - Only interferes with other apps when open
- [x] **Click-through behavior** when containers are closed
- [x] **Global hotkeys** for manual control
- [x] **Process masking** as system services for additional stealth
- [x] **Command line switches** for macOS content protection compatibility

---

## 🚧 **PLANNED FEATURES** (Roadmap)

### **🎭 Enhanced Voice Assistant ("Velvet Voice")**
- [ ] **Multiple personality modes**: Friend, Coach, Calm
- [ ] **Context-aware responses** understanding emotional state
- [ ] **Sub-vocal activation** option
- [ ] **Wake word detection** for always-on functionality
- [ ] **Emotional tone detection** in user speech

### **🫥 Advanced Stealth Mode**
- [ ] **Panic vanish hotkey** (Ctrl+Shift+V)
- [ ] **Disguise modes** (appear as notepad/calculator)
- [ ] **Voice-only mode** for meetings
- [ ] **Network traffic camouflage**
- [ ] **Smart capture detection** with real-time alerts

### **🔧 Architecture Migration**
- [ ] **Frontend**: Migrate from vanilla JS to React + TypeScript + Tailwind CSS
- [ ] **Animation**: Add Framer Motion for smooth transitions
- [ ] **State**: Implement Zustand for state management
- [ ] **Database**: Add local SQLite with encryption for user data
- [ ] **Security**: Implement end-to-end encryption, local-first approach

### **👁️ Comprehensive Context Awareness** (HIGH PRIORITY)
- [ ] **Screen OCR Monitoring** - Real-time text extraction from entire screen
  - [ ] Continuous screen text reading using Tesseract.js or similar
  - [ ] Context-aware text analysis (emails, documents, websites, apps)
  - [ ] Smart filtering to focus on relevant content
  - [ ] Integration with current window tracking for targeted OCR
- [ ] **Audio Environment Monitoring** - Complete audio context awareness
  - [ ] Song recognition and music taste analysis
  - [ ] Call participant identification and conversation content
  - [ ] Background audio analysis (TV, podcasts, ambient sounds)
  - [ ] Speaker separation and voice identification
  - [ ] Real-time transcription of all audio streams
- [ ] **Unified Context Engine** - Combine screen + audio for intelligent assistance
  - [ ] Cross-reference screen content with audio context
  - [ ] Intelligent assistance based on complete environmental awareness
  - [ ] Predictive suggestions based on screen text + audio patterns
  - [ ] Smart interruption timing based on context importance

### **🧠 Viral Neurodivergent Features** (HIGH PRIORITY)
- [ ] **Social Decoder System** - NeuroTranslator++ with real-time analysis
  - [ ] Real-time social cue detection from audio monitoring (tone, pace, word choice)
  - [ ] Neurotypical translation engine for ambiguous communications
  - [ ] Suggested response templates for tricky social situations
  - [ ] Emotional subtext analysis ("fine" vs "FINE" detection)
  - [ ] Pre-meeting social context briefing based on participant history
  - [ ] Post-interaction analysis with learning suggestions
- [ ] **Executive Dysfunction Emergency Mode** - Crisis detection and micro-interventions
  - [ ] Pattern recognition for executive dysfunction episodes
    - Document/app opened/closed repeatedly (>10 times in 30 min)
    - Rapid music/video switching without engagement
    - Mouse hovering without clicking for extended periods
    - Task switching spiral patterns
  - [ ] Emergency micro-interventions system
    - 2-minute rule suggestions with hyper-specific first steps
    - "Body reset" prompts (stretch, breathe, water)
    - Choice architecture: "Pick ONE: Email Sarah, OR Review document, OR Take break"
    - Grounding exercises with countdown timers
  - [ ] Crisis escalation prevention
    - Early warning detection before full shutdown
    - Gentle energy preservation suggestions
    - Auto-simplification of current tasks
- [ ] **Masking Fatigue Detection** - Behavioral authenticity monitoring
  - [ ] Professional vs authentic behavior pattern analysis
    - Communication style shifts (formal vs casual language)
    - Response time variations (delayed vs immediate)
    - Energy expenditure patterns during "performance" mode
    - Micro-expression detection through webcam (optional)
  - [ ] Safe space identification and unmasking prompts
    - Home environment = gentle unmasking reminders
    - Trusted app contexts (personal Discord, etc.)
    - End-of-workday transition support
  - [ ] Masking recovery assistance
    - Post-social battery recharge suggestions
    - Authenticity celebration ("You can be yourself now")
    - Energy restoration activity recommendations
- [ ] **Hyperfocus vs Procrastination AI** - Intent-behavior analysis engine
  - [ ] Productive vs avoidant hyperfocus classification
    - Cross-reference stated intentions with current activity
    - Progress measurement vs time investment analysis
    - Engagement quality assessment (deep vs surface-level)
  - [ ] Flow state protection system
    - Automatic "Do Not Disturb" activation during productive hyperfocus
    - Notification quarantining with intelligent filtering
    - Gentle transition management when hyperfocus naturally ends
  - [ ] Procrastination interrupt patterns
    - Research rabbit hole vs legitimate learning detection
    - Social media vs productive app usage analysis
    - Gentle redirection without shame or judgment

### **🤝 Community & Social Features** (MEDIUM PRIORITY)
- [ ] **Neurodivergent Study Buddy System** - Anonymous peer matching
  - [ ] Compatibility matching based on:
    - Focus music preferences and taste analysis
    - Work pattern timing (night owl vs morning person)
    - Communication style preferences (text vs voice vs minimal)
    - Executive function trading preferences (starter vs finisher)
  - [ ] Body doubling session management
    - Shared focus timers with gentle accountability
    - Ambient presence without pressure to interact
    - Optional shared playlist creation
    - Mutual hyperfocus protection ("Both in the zone!")
  - [ ] Task trading marketplace
    - "I'll help you start, you help me finish" matching
    - Skill exchange (organization vs creativity)
    - Dopamine sharing through celebration co-witnessing
- [ ] **Context-Aware Achievement System** - Neurodivergent-specific gamification
  - [ ] Meaningful achievement categories
    - "Flow State Master" - Sustained productive hyperfocus sessions
    - "Social Navigator" - Successfully decoded ambiguous communications
    - "Task Alchemist" - Broke overwhelming projects into manageable steps
    - "Authenticity Warrior" - Maintained boundaries during high-masking periods
    - "Crisis Avoider" - Used emergency interventions before full shutdown
  - [ ] Progress celebration that actually motivates ND brains
    - Visual progress with satisfying completion animations
    - Personalized rewards based on individual motivation patterns
    - Community recognition without comparison pressure
    - Achievement sharing with context ("I did this WHILE managing ADHD")

### **🎯 Advanced AI Features**
- [ ] **Ambient audio awareness** (understanding background sounds)
- [ ] **Proactive assistance** based on calendar and context
- [ ] **Learning user patterns** for personalized interventions
- [ ] **Integration with productivity tools** (Notion, Todoist, etc.)

---

## 🧪 **TESTING FUNCTIONS**

Built-in test functions available in browser console:

**Phase 1 - Pattern Detection Tests:**
```javascript
testNudges.hyperfocus()        // Test 45+ min focus detection
testNudges.distractionSpiral() // Test rapid tab switching detection
testNudges.taskAvoidance()     // Test app open/close pattern detection
testNudges.idle()              // Test idle time detection
```

**Phase 1 - Intention-Based Task System Tests:**
```javascript
testSystem.testTaskDeclaration()  // Test "I need to..." detection
testSystem.testIntentMonitoring() // Test deviation from expected apps
testSystem.testStepCompletion()   // Test manual step completion
testSystem.showTaskState()        // Show current task state
```

**Phase 2 - Viral Neurodivergent Feature Tests:**
```javascript
// Social Decoder System Tests
testSocial.detectSarcasm()           // Test "fine" vs "FINE" detection
testSocial.suggestResponse()         // Test neurotypical translation
testSocial.analyzeTone()             // Test emotional subtext analysis

// Executive Dysfunction Emergency Tests
testEmergency.triggerDocSpiral()     // Test document open/close pattern
testEmergency.triggerTaskSwitching() // Test rapid app switching detection
testEmergency.microIntervention()    // Test 2-minute rule suggestions

// Masking Fatigue Detection Tests
testMasking.detectProfessionalMode() // Test formal vs casual language shift
testMasking.identifySafeSpace()      // Test home vs work environment detection
testMasking.unmaskingReminder()      // Test authenticity celebration

// Hyperfocus vs Procrastination Tests
testFocus.classifyHyperfocus()       // Test productive vs avoidant classification
testFocus.flowStateProtection()      // Test "Do Not Disturb" activation
testFocus.gentleRedirection()        // Test procrastination interrupts
```

---

## 💻 **DEVELOPMENT COMMANDS**

```bash
npm run dev        # Run in development mode with --dev flag
npm run start      # Run in production mode
npm run build      # Build using webpack (planned: migrate to Vite)
npm test           # Currently outputs "No tests yet"
```

---

## 🎨 **DESIGN PHILOSOPHY**

- **Glass morphism** with blue-to-black theme
- **One-handed mobile-friendly** design
- **Calm, uncluttered interfaces** with soft animations
- **Large touch targets**, everything skippable/dismissible
- **Multiple ways** to accomplish tasks
- **Warm, conversational language** acknowledging emotions first
- **Celebrate every small win**, validate struggles
- **Break tasks into micro-steps**, use "we" for collaboration

---

## 🔒 **SECURITY & PRIVACY**

- **Local-first approach** - All data stays on your device
- **Secure IPC** with context isolation
- **Environment variable protection** - API keys never exposed to renderer
- **Process masking** - Appears as system services for stealth
- **Content protection** - Invisible to screen capture systems
- **No data collection** - Your conversations stay private
- **Enhanced monitoring consent** - Explicit user control over screen/audio monitoring
- **Selective monitoring** - Granular control over what content types to monitor
- **Data encryption** - All screen text and audio transcripts encrypted locally
- **Privacy modes** - Disable monitoring for sensitive apps/websites/calls

---

## 🎯 **TARGET SCENARIOS**

### **Current Capabilities:**
1. **Task Avoidance**: "I see you opening that document - it feels big, doesn't it? What if we just add the title?"
2. **Hyperfocus Protection**: "You're in the zone! Just checking: moved your body in the last hour?"
3. **Distraction Spiral**: "Lots of mental tabs open! Want to brain dump, then pick ONE thing?"
4. **Meeting Support**: Real-time coaching and transcription during video calls
5. **Stealth Operation**: Complete invisibility during screen sharing while maintaining full functionality

### **Enhanced Context Scenarios (Phase 2):**
6. **Email Context**: "I see you're reading an important email from Sarah - want me to help draft a thoughtful response?"
7. **Music Mood Detection**: "That's some intense focus music! You're in deep work mode - I'll hold all notifications."
8. **Call Intelligence**: "I notice John mentioned the deadline moved to Friday - should I update your task timeline?"
9. **Content Cross-Reference**: "You're researching React hooks while listening to a coding podcast - perfect focus synergy!"
10. **Emotional Context**: "I can hear frustration in the call - want me to suggest some grounding techniques for after?"

---

*Last updated: January 2025*
*Version: 1.0.0 - Bulletproof Stealth Edition*