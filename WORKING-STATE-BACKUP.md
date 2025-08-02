# WORKING STATE BACKUP - DO NOT MODIFY

This documents the exact working state of Velvet's main interface as of 2025-08-02.

## ✅ WORKING FILES:

### Main Process:
- **File**: `src/main/index-main-working.js` 
- **Command**: `npm run dev-main`
- **Status**: FULLY WORKING - chat, voice, ElevenLabs TTS, all IPC handlers

### Frontend:
- **File**: `public/index-main-working.html`
- **Status**: PERFECT glass orb interface with original Velvet personality

## ✅ WORKING FEATURES:

1. **Glass Orb Interface**: Clean, no auto-popups, click-to-expand chat
2. **Voice Input**: Fixed - shows correct transcription, not "[object object]"
3. **Voice Output**: Working ElevenLabs TTS with voice ID `m7GHBtY0UEqljrKQw2JH` (v2 model)
4. **AI Personality**: Original Hinglish personality from `ai.js` - chill, natural, "yaar", "arre", "bas"
5. **Control Panel**: Gear icon works, opens control panel for advanced features
6. **All Modal Windows**: Have close buttons (X)
7. **No Auto-Starting**: Onboarding, beta feedback, masking demos all disabled

## 🎭 VELVET'S PERSONALITY:

Using the ORIGINAL personality from `src/renderer/ai.js`:
- Chill Indian friend who listens, not performs
- Natural Hinglish: "that's nice yaar", "arre that's cool", "bas enjoy karo"
- Energy matching: calm when casual, excited when excited
- Authentic responses: "mm nice", "oh cool", "ah I see"
- No forced enthusiasm or audio cues

## ⚙️ USER FLOW:

1. **Main Interface**: Glass orb → chat interface (this backup)
2. **Advanced Features**: Control panel → all other features we built
3. **Clean Separation**: Main interface stays simple, features in dashboard

## 🚫 WHAT'S DISABLED:

- Auto-showing onboarding system
- Auto-starting beta feedback
- Auto-starting masking fatigue demos
- Social Decoder auto-initialization
- Any blocking modal windows

## 🔧 TO RUN:

```bash
npm run dev-main
```

This loads the EXACT working state. Use this as the main interface, and build the dashboard/features separately without touching these files.

## ⚠️ CRITICAL:

**DO NOT MODIFY THESE BACKUP FILES**:
- `src/main/index-main-working.js`
- `public/index-main-working.html`

These are the golden master copies of the working interface.