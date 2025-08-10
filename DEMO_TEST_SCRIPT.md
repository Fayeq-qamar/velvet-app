# Velvet App Demo Test Script

## **Setup & Launch**
```bash
# Terminal commands
npm run dev
# Wait for app to load - look for glass orb in bottom-right corner
```

## **1. Core Voice Interaction (Main Velvet Personality)**
```javascript
// Test warm, neurodivergent-friendly personality
1. Click glass orb to expand chat
2. Say: "Velvet, I'm feeling overwhelmed with this big project"
3. Expected: Warm Hindi-English response like "Arre yaar, that sounds tough! Want to break it down into tiny steps?"
4. Type: "I need help focusing today"
5. Expected: Gentle, supportive response with actionable suggestions
```

## **2. Meeting Assistant (Professional Co-Pilot)**
```javascript
// Test professional meeting personality
1. Open Control Panel (Cmd/Ctrl + Shift + C)
2. Click "Meeting Assistant" 
3. Ask: "What is the capital of Uttar Pradesh and what is it famous for?"
4. Expected: Structured professional response with headlines and bullet points
5. Ask: "Can you give me steps to learn Rust language?"
6. Expected: Organized co-pilot response with actionable follow-ups
```

## **3. Screen Intelligence & Pattern Detection**
```javascript
// Test real-time screen monitoring
1. Open multiple browser tabs rapidly (5+ tabs in 30 seconds)
2. Expected: Console logs showing distraction spiral detection
3. Stay in one app for 45+ minutes continuously
4. Expected: Hyperfocus detection and gentle break suggestions
5. Open/close same document repeatedly (6+ times)
6. Expected: Task avoidance pattern detection
```

## **4. Executive Dysfunction Emergency Mode**
```javascript
// Test crisis intervention system
1. Open browser console (F12)
2. Run: testSystem.testTaskDeclaration()
3. Expected: AI task breakdown with micro-steps
4. Run: testSystem.testIntentMonitoring()
5. Expected: Deviation guidance when off-task
6. Run: testNudges.hyperfocus()
7. Expected: Focus protection and break suggestions
```

## **5. Real-Time OCR & Context Awareness**
```javascript
// Test screen text extraction
1. Open any text document or webpage
2. Check console for OCR logs: "📸 Capturing real screen..."
3. Expected: Text extraction and relevance analysis
4. Open code editor with technical content
5. Expected: Context classification (type: 'code', language detection)
```

## **6. Social Decoder System**
```javascript
// Test communication analysis (currently basic)
1. Open messaging app or email
2. Type communication with subtext (e.g., "Fine, whatever works")
3. Expected: Social context detection in console logs
4. Test with professional communication patterns
5. Expected: Neurotypical translation suggestions
```

## **7. Velvet Brain - Unified Intelligence**
```javascript
// Test central consciousness system
1. Check console for: "🧠 Thought cycle #X beginning..."
2. Expected: Regular brain activity logs showing awareness
3. Monitor correlation between screen activity and brain responses
4. Expected: Context-aware suggestions based on current activity
```

## **8. Voice Commands & TTS**
```javascript
// Test complete voice pipeline
1. Voice input: "Velvet, what's on my screen?"
2. Expected: Screen content description with TTS response
3. Voice: "Break down this task for me"
4. Expected: AI task analysis with spoken response
5. Test Hinglish: "Velvet yaar, help me focus"
6. Expected: Natural Hindi-English mixed response
```

## **9. Performance & System Integration**
```javascript
// Test system stability
1. Monitor CPU usage during operation
2. Expected: <20% CPU usage during normal operation
3. Test with multiple apps running
4. Expected: Smooth performance without system slowdown
5. Check memory usage over time
6. Expected: Stable memory footprint, no leaks
```

## **Success Criteria**
- ✅ All voice interactions work (transcription + AI + TTS)
- ✅ Both AI personalities respond appropriately (warm vs professional)
- ✅ Screen monitoring detects patterns without breaking other apps
- ✅ Real-time OCR extracts and classifies screen content
- ✅ System runs smoothly with <20% CPU usage
- ✅ Context awareness correlates screen + behavior + voice input

## **5-Minute Demo Flow**
1. **Show glass orb** → Voice chat with warm Velvet personality
2. **Open Meeting Assistant** → Professional co-pilot response
3. **Demonstrate pattern detection** → Rapid tab switching triggers intervention
4. **Screen intelligence** → OCR reading current content
5. **End with vision** → "This is neurodivergent support that actually understands our brains"

---

**Note**: Stealth mode temporarily disabled for demo recording. Remember to re-enable after demo (commit 43de264 has working stealth implementation).

This script demonstrates the complete ecosystem working together as intended for YC demo purposes.