# 🚨 EMERGENCY RESTORE INSTRUCTIONS
## Unified Consciousness System v1.0

> **USE THIS IF ANYTHING BREAKS!**

## 🔥 QUICK RESTORE (5 Minutes)

### 1. Check System Status
```bash
cd /Users/fayeq/Desktop/velvet-app
node test-unified-consciousness.js
```

### 2. If Tests Fail, Restore Key Files
```bash
# Check if these files exist and have correct content:
ls -la src/renderer/stores/consciousness-store.ts          # Should be 309 lines
ls -la src/renderer/enhanced-ocr-processor.js             # Should be 263 lines
ls -la src/renderer/consciousness-loader.js               # Should be 236 lines
ls -la src/renderer/components/ConsciousnessVisualizer.tsx # Should exist
ls -la src/renderer/engines/consciousness-engine.ts       # Should exist
```

### 3. Verify Dependencies
```bash
npm list zustand react react-dom typescript
# If missing: npm install zustand react react-dom && npm install --save-dev typescript @types/react @types/react-dom
```

### 4. Check HTML Integration
```bash
grep -n "consciousness-loader.js" public/index.html
grep -n "enhanced-ocr-processor.js" public/index.html
# Should find both scripts loaded in correct order
```

### 5. Start Services & Test
```bash
./start-velvet-services.sh
npm run dev
# Ask AI: "What can you see on my screen?" 
# Should get enhanced consciousness context, NOT fallback mode
```

## 🆘 SIGNS SYSTEM IS BROKEN

### ❌ OCR Quality Degraded Again
- AI responses show garbled text like "Gump gb S @& | @ & |"
- OCR confidence < 40%
- AI says "based on the legacy screen content data"

### ❌ Consciousness System Not Loading
- No consciousness indicator dot on orb 
- Ctrl+Shift+C doesn't open debug panel
- Console missing "✅ CONSCIOUSNESS LOADER" messages

### ❌ Back in Fallback Mode
- AI mentions "FALLBACK MODE" in responses
- No streaming brain context
- Missing consciousness level information

## ✅ SIGNS SYSTEM IS WORKING

### ✅ OCR Quality Good
- AI can read screen text clearly
- OCR confidence 60-85%
- AI mentions "Enhanced OCR" or "UNIFIED CONSCIOUSNESS"

### ✅ Consciousness Active
- Small colored dot on orb (consciousness indicator)
- Debug panel works (Ctrl+Shift+C)
- Console shows consciousness state updates

### ✅ Streaming Architecture
- AI mentions "REAL-TIME CONSCIOUSNESS" 
- Stream status shows connected
- Pattern detection working

## 📞 EMERGENCY CONTACTS

### File Locations
- **Main Backup**: `/Users/fayeq/Desktop/velvet-app/BACKUP-UNIFIED-CONSCIOUSNESS-v1.0.md`
- **This File**: `/Users/fayeq/Desktop/velvet-app/RESTORE-INSTRUCTIONS.md`
- **Test Suite**: `/Users/fayeq/Desktop/velvet-app/test-unified-consciousness.js`

### Key Console Commands for Debugging
```javascript
// In browser console:
window.enhancedOCRProcessor?.isInitialized              // Should be true
window.VelvetConsciousness?.state?.consciousnessLevel   // Should show level
window.velvetAI?.getBrainContext()                      // Should return unified context
```

### Critical File Checksums (to verify integrity)
- `consciousness-store.ts`: Contains "useConsciousnessStore" and Zustand store
- `enhanced-ocr-processor.js`: Contains "EnhancedOCRProcessor" class  
- `consciousness-loader.js`: Contains "VelvetConsciousness" global object
- `ai-secure.js`: getBrainContext() method mentions "ENHANCED STREAMING"

## 🏥 RECOVERY STEPS

### If Consciousness System Completely Broken
1. Restart from `BACKUP-UNIFIED-CONSCIOUSNESS-v1.0.md`
2. Copy all file contents exactly as documented
3. Reinstall dependencies if needed
4. Run full test suite to verify

### If OCR Quality Only Degraded
1. Check if `enhanced-ocr-processor.js` is loaded
2. Verify Tesseract.js is available
3. Test enhanced OCR processor directly
4. Check image preprocessing functions

### If Services Won't Start
1. Check Python worker: `curl http://127.0.0.1:8001/health`
2. Check Rust service: `netstat -an | grep 50051`
3. Restart services manually if needed
4. Use enhanced fallback mode if services fail

---

**Remember**: This unified consciousness system is **bulletproof** with multiple fallback layers. Even if services fail, the enhanced OCR processor should provide good quality text. If everything fails, something is seriously wrong - restore from backup!

**Last Known Working State**: August 1, 2025 ✅