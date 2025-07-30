# Changelog

All notable changes to Velvet AI will be documented in this file.

## [1.0.0] - 2025-01-31

### 🛡️ **BULLETPROOF STEALTH SYSTEM - MAJOR RELEASE**

#### Added
- **Permanent stealth mode** - All windows invisible to screen capture without detection delays
- **5-layer protection system** with content protection, window cycling, opacity cycling, process masking, and window properties
- **Universal window protection** - Main app, control panel, meeting assistant, and checklist all hidden from screen capture
- **Auto-stealth for new windows** - Automatic protection applied to any newly created window
- **macOS optimization** with command line switches and NSWindow integration
- **Smart container system** - Click-through behavior when closed, interactive when open
- **Process masking** - App disguises as system services (com.apple.coreaudio, etc.)

#### Fixed
- **Window flickering** in screen capture - eliminated rapid on/off switching
- **Container interference** - windows only interfere with other apps when actually open
- **Ugly square blocks** - proper window sizing and opacity restoration
- **Discord stream ending** - removed problematic setContentProtection calls that terminated streams
- **False detection triggers** - stealth no longer activates when opening Velvet's own windows

#### Technical Improvements
- **Stable detection system** with debouncing to prevent rapid state changes
- **Micro-opacity cycling** (0.985-1.0) - invisible to screenshots, visible to human eye
- **Dynamic window level rotation** confuses capture systems
- **Command line switches** for macOS content protection compatibility
- **Global hotkeys** for manual stealth control

---

## [0.9.0] - 2025-01-30

### 🎯 **CORE FEATURES COMPLETE**

#### Added
- **Complete floating glassmorphism UI** with glass orb and expandable chat
- **GPT-4 integration** with neurodivergent-optimized personality (70% English, 30% Hindi)
- **Toggle voice input** with OpenAI Whisper and Hinglish support
- **ElevenLabs TTS** with gentle voice settings and multi-language support
- **Screen Intelligence** monitoring active windows and behavioral patterns
- **4-Type Nudge System** with visual, audio, haptic, and text interventions
- **Intention-Based Task System** with AI task breakdown and real-time monitoring
- **Meeting Assistant** with real-time transcription and coaching suggestions
- **Always-on-top transparent window** with proper positioning
- **Secure IPC architecture** with contextIsolation

#### Technical Infrastructure
- **Electron-based desktop app** with transparency and always-on-top
- **Environment variable management** with dotenv
- **IPC handlers** for API calls in main process
- **Pattern detection algorithms** for ADHD/neurodivergent behaviors
- **Task breakdown AI** with expected app prediction
- **Auto-completion detection** based on app usage timing

---

## [0.1.0] - 2025-01-29

### 🌱 **INITIAL FOUNDATION**

#### Added
- **Basic Electron app structure**
- **Initial glassmorphism UI design**
- **OpenAI API integration**
- **Voice recording capabilities**
- **Basic window management**
- **Project documentation** (CLAUDE.md)

---

## Versioning Strategy

- **Major releases** (1.0.0) - Significant feature additions or architectural changes
- **Minor releases** (0.9.0) - New features and improvements
- **Patch releases** (0.1.1) - Bug fixes and small improvements

## Feature Status Legend

- ✅ **Completed** - Fully implemented and tested
- 🚧 **In Progress** - Currently being developed
- 📋 **Planned** - On the roadmap
- ❌ **Deprecated** - No longer supported
- 🐛 **Bug** - Known issue being tracked