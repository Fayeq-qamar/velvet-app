# 🏗️ Velvet App - Complete Architecture Guide

## 📋 Overview
Velvet is a neurodivergent-friendly AI assistant desktop app built with Electron. This document maps the complete architecture to prevent confusion and ensure consistent development.

## 🎯 App Vision
**"Soft support for sharp minds"** - A gentle, intelligent AI companion for ADHD, autism, OCD, and executive dysfunction support.

---

## 📁 File Structure & Responsibilities

### **Main Entry Point**
```
src/main/index.js - Main Electron process, window management, all API calls
├── Screen Intelligence System ✅
├── Meeting Assistant Management ✅
├── Task System Backend ✅
├── OpenAI Integration (GPT-4, Whisper) ✅
├── ElevenLabs TTS Integration ✅
└── IPC Communication Hub ✅
```

### **Security Layer**
```
src/main/preload.js - Secure IPC bridge between main and renderer
├── API Exposure via contextBridge ✅
├── All electronAPI methods ✅
└── Event listeners for real-time updates ✅
```

### **Frontend Applications**

#### **1. Main App (Primary Interface)**
```
public/index.html - Core floating glass orb interface
├── Imports: ai-secure.js + voice-whisper.js ✅
├── Features:
│   ├── Floating glass orb with chat ✅
│   ├── Voice input/output system ✅  
│   ├── Task declaration & breakdown ✅
│   ├── Screen intelligence integration ✅
│   ├── Nudge system (visual, audio, haptic, text) ✅
│   └── Real-time intent monitoring ✅
└── Status: FULLY FUNCTIONAL ✅
```

#### **2. Meeting Assistant**
```
public/meeting-assistant.html - Real-time meeting coaching
├── Imports: Inline JavaScript only
├── Features:
│   ├── Real-time transcription ✅
│   ├── AI coaching suggestions ✅
│   ├── Question detection ✅
│   ├── Demo mode for testing ✅
│   └── Expandable interface ✅
└── Status: FULLY FUNCTIONAL ✅
```

#### **3. Control Panel**
```
public/control-panel.html - Settings and controls
├── Features: App settings and management
└── Status: BASIC IMPLEMENTATION
```

#### **4. Task Checklist**
```
public/checklist.html - Standalone task tracking
├── Features: Task breakdown display
└── Status: FUNCTIONAL
```

### **AI System (FIXED & CONSISTENT)**

#### **Primary AI (Used by Main App)**
```
src/renderer/ai-secure.js - Secure IPC-based AI system ✅
├── Personality: Conversational, curious, English-dominant (70/30) ✅
├── Modes: Supportive, Casual, Auto-Sassy ✅
├── Communication: Via IPC to main process ✅
└── Status: ACTIVE & FIXED ✅
```

#### **Backup AI (Consistent)**
```
src/renderer/ai.js - Direct API AI system ✅  
├── Personality: SAME as ai-secure.js ✅
├── Communication: Direct OpenAI API calls ✅
└── Status: CONSISTENT BACKUP ✅
```

### **Voice System**
```
src/renderer/voice-whisper.js - OpenAI Whisper integration ✅
├── Features:
│   ├── MediaRecorder audio capture ✅
│   ├── Base64 encoding for IPC ✅
│   ├── Whisper transcription via main process ✅
│   ├── Hinglish language support ✅
│   └── Toggle-based recording (not hold-to-speak) ✅
└── Status: FULLY FUNCTIONAL ✅
```

### **Backend Intelligence**
```
src/main/screen-intelligence.js - Behavioral pattern detection ✅
├── Features:
│   ├── Active window tracking ✅
│   ├── App usage monitoring ✅
│   ├── Pattern detection (hyperfocus, distraction, etc.) ✅
│   └── Real-time notifications ✅
└── Status: FULLY FUNCTIONAL ✅
```

---

## 🔗 Frontend ↔ Backend Connections

### **IPC Communication Map**

#### **AI & Voice**
- `chat-completion` → GPT-4 API calls
- `transcribe-audio` → Whisper API calls
- `elevenlabs-tts` → ElevenLabs TTS calls

#### **Window Management**
- `meeting-assistant-show/hide/expand/close` → Meeting window controls
- `checklist-show/hide/update/close` → Task checklist controls
- `control-panel-show/hide/close` → Settings panel controls

#### **Intelligence Systems**
- `screen-intelligence-start/stop/stats` → Behavioral monitoring
- `pattern-detected` → Real-time pattern notifications
- `window-changed` → Active window updates

#### **Features**
- `set-click-through` → Stealth mode activation
- `detect-screen-sharing` → Privacy protection
- `check-audio-playing` → Audio environment detection

---

## 🧠 AI Personality System (FIXED)

### **Unified Personality Across All Systems**
```
Language: 70% English, 30% Hindi words
Tone: Curious friend who asks follow-up questions
Approach: "What happened?" not "It'll get better"

Response Modes:
🤗 Supportive: "Oh no, what happened?"
😊 Casual: "Ooh tell me more!"  
🔥 Sassy: "Wait, she said WHAT? Tell me everything!"
```

### **Auto-Detection Triggers**
- Bad day mentions → Ask for details
- People complaints → Activate sassy mode
- Emotional expressions → Validate and inquire

---

## ✅ System Health Check

### **All Components Status:**
- ✅ Main app interface (index.html)
- ✅ AI personality (both ai-secure.js & ai.js)
- ✅ Voice input/output (voice-whisper.js) 
- ✅ Screen intelligence (screen-intelligence.js)
- ✅ Meeting assistant (meeting-assistant.html)
- ✅ Task system (integrated in main app)
- ✅ IPC communication (preload.js)
- ✅ Backend API handling (main/index.js)

### **Cleaned Up:**
- ❌ Removed: voice.js, voice-native.js (unused)
- ✅ Fixed: AI personality consistency
- ✅ Fixed: Frontend-backend connections

---

## 🚀 Ready for Future Additions

### **Extension Points:**
1. **New UI Windows**: Add to main/index.js + preload.js IPC handlers
2. **New AI Features**: Extend personality in both ai files consistently  
3. **New Voice Features**: Extend voice-whisper.js or create new modules
4. **New Intelligence**: Add pattern detection to screen-intelligence.js
5. **New APIs**: Add handlers to main/index.js + expose via preload.js

### **Development Workflow:**  
1. Backend: Add IPC handler in main/index.js
2. Security: Expose via preload.js  
3. Frontend: Use via window.electronAPI
4. Testing: Use TEST_COACHING.md for meeting features

---

## 🔧 Quick Commands
```bash
npm run dev    # Development mode
npm run start  # Production mode  
npm run build  # Build for distribution
```

## 📝 Important Notes
- **NEVER** create inconsistent AI personalities again
- **ALWAYS** use ai-secure.js as the primary AI system
- **ALWAYS** update both AI files when changing personality
- **ALWAYS** use IPC for API calls (security)
- **ALWAYS** test with both voice and text input

---

*This architecture ensures no more "silly mistakes" and provides a clear roadmap for future development.* 🎯