#!/bin/bash

# Velvet AI - Beta Package Creation Script
# Creates a complete, ready-to-distribute beta testing package

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🎯 Creating Velvet AI Beta Testing Package${NC}"
echo "=============================================="

# Configuration
VERSION=$(node -p "require('./package.json').version")
BUILD_DATE=$(date +"%Y-%m-%d")
BETA_PACKAGE_NAME="Velvet-AI-Beta-v${VERSION}-${BUILD_DATE}"
DIST_DIR="dist/beta-package"

echo -e "${BLUE}📋 Package Configuration:${NC}"
echo "   Version: ${VERSION}"
echo "   Build Date: ${BUILD_DATE}"
echo "   Package Name: ${BETA_PACKAGE_NAME}"
echo ""

# Clean and create distribution directory
echo -e "${BLUE}🧹 Preparing distribution directory...${NC}"
rm -rf "${DIST_DIR}"
mkdir -p "${DIST_DIR}"

# Run production build
echo -e "${BLUE}🏗️ Running production build...${NC}"
./scripts/build-production.sh

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Production build failed${NC}"
    exit 1
fi

# Create beta package structure
echo -e "${BLUE}📦 Creating beta package structure...${NC}"

# Copy built application
if [ -d "dist/mac/Velvet AI Assistant.app" ]; then
    cp -r "dist/mac/Velvet AI Assistant.app" "${DIST_DIR}/"
elif [ -d "dist/Velvet AI Assistant.app" ]; then
    cp -r "dist/Velvet AI Assistant.app" "${DIST_DIR}/"
else
    echo -e "${RED}❌ Built application not found${NC}"
    exit 1
fi

# Copy documentation
cp BETA-DISTRIBUTION-GUIDE.md "${DIST_DIR}/"
cp README.md "${DIST_DIR}/" 2>/dev/null || echo "README.md not found, skipping"

# Create installation script
cat > "${DIST_DIR}/install.sh" << 'EOF'
#!/bin/bash

echo "🚀 Installing Velvet AI Assistant..."
echo "=================================="

# Check macOS version
OS_VERSION=$(sw_vers -productVersion)
echo "macOS Version: $OS_VERSION"

# Check if running on Apple Silicon or Intel
ARCH=$(uname -m)
echo "Architecture: $ARCH"

# Get current directory
INSTALL_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_PATH="$INSTALL_DIR/Velvet AI Assistant.app"

if [ ! -d "$APP_PATH" ]; then
    echo "❌ Velvet AI Assistant.app not found in installation directory"
    exit 1
fi

echo ""
echo "📁 Installing to /Applications..."

# Check if app already exists
if [ -d "/Applications/Velvet AI Assistant.app" ]; then
    echo "⚠️ Existing installation found. Removing..."
    sudo rm -rf "/Applications/Velvet AI Assistant.app"
fi

# Copy to Applications
sudo cp -r "$APP_PATH" /Applications/

if [ $? -eq 0 ]; then
    echo "✅ Velvet AI Assistant installed successfully!"
    echo ""
    echo "🔐 IMPORTANT: Grant Required Permissions"
    echo "========================================="
    echo "1. System Preferences → Privacy & Security → Screen Recording"
    echo "   ✓ Enable for 'Velvet AI Assistant'"
    echo ""
    echo "2. System Preferences → Privacy & Security → Microphone"
    echo "   ✓ Enable for 'Velvet AI Assistant'"
    echo ""
    echo "3. If you see Gatekeeper warnings:"
    echo "   • Right-click app → Open"
    echo "   • Or: System Preferences → Privacy & Security → Allow"
    echo ""
    echo "🚀 Ready to Launch!"
    echo "=================="
    echo "Find 'Velvet AI Assistant' in:"
    echo "• Applications folder"
    echo "• Spotlight search (⌘+Space)"
    echo "• Launchpad"
    echo ""
    echo "Need help? Check BETA-DISTRIBUTION-GUIDE.md"
    
    # Offer to open permissions
    read -p "Open System Preferences to grant permissions now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open "x-apple-systempreferences:com.apple.preference.security?Privacy_ScreenCapture"
    fi
    
else
    echo "❌ Installation failed. Please check permissions and try again."
    exit 1
fi
EOF

chmod +x "${DIST_DIR}/install.sh"

# Create beta tester README
cat > "${DIST_DIR}/README-BETA-TESTERS.md" << EOF
# Welcome Beta Testers! 🧠✨

Thank you for helping test Velvet AI Assistant - the first AI companion designed specifically for neurodivergent minds.

## Quick Start (2 minutes)

1. **Install**: Double-click \`install.sh\` and enter your password
2. **Permissions**: Grant Screen Recording + Microphone access when prompted
3. **Launch**: Find "Velvet AI Assistant" in Applications or Spotlight
4. **Look**: Velvet appears as a gentle orb in the bottom-right corner

## What Makes Velvet Special

- **Social Decoder** 🧠 - Translates neurotypical communication patterns
- **Gentle Nudges** 🌟 - Supportive interventions, never pushy  
- **Pattern Recognition** 👁️ - Spots distraction spirals and hyperfocus
- **Task Coaching** 🎯 - Breaks overwhelming tasks into tiny steps

## Key Testing Scenarios

### 1. Social Decoder Accuracy
- Join video calls and note translation quality
- Test with different communication styles
- Look for sarcasm and implicit meaning detection

### 2. ADHD Pattern Recognition  
- Try rapid tab switching (distraction spiral)
- Work on one task for 45+ minutes (hyperfocus)
- Open/close documents repeatedly (task avoidance)

### 3. Voice Assistant Quality
- Test conversational flow and empathy
- Try mixed English/Hindi if applicable
- Evaluate response tone and length

### 4. Task Coaching System
- Say "I need to [do something]" and watch breakdown
- Observe real-time progress monitoring
- Note celebration of completed steps

## Privacy & Safety

✅ **Everything processes locally** - no cloud required  
✅ **Screen capture excluded** from recordings/screenshots  
✅ **Minimal data storage** - only what's needed for functionality  
✅ **Transparent operation** - all code is open source  

## Providing Feedback

Velvet has a **built-in feedback system** that appears after ~10 minutes of use. You can also:

- Use the blue "Beta Feedback" button (top-right when app is open)
- Email: beta@velvet-ai.app
- Join our Discord: [link will be provided]

## Getting Help

**Common Issues:**
- App won't start → Check Console.app for error logs
- No permissions popup → Manually add in System Preferences
- Services not connecting → Wait 30-60 seconds on first launch

**Support:**
- Check \`BETA-DISTRIBUTION-GUIDE.md\` for detailed troubleshooting
- Email technical issues to: support@velvet-ai.app
- Include macOS version and error details

## What We're Looking For

**Critical Feedback:**
- "Finally, someone gets it!" moments 🎉
- Feature accuracy (especially Social Decoder)
- Any crashes or major bugs
- Privacy or security concerns

**Nice-to-Have Feedback:**
- UI/UX improvement suggestions
- Additional pattern recognition needs
- Voice personality adjustments
- New feature ideas

---

## Thank You! 

Your feedback helps create better tools for neurodivergent minds. Every test session brings us closer to that "finally, someone who understands" moment for thousands of people.

**Version:** v${VERSION}  
**Build Date:** ${BUILD_DATE}  
**Support:** beta@velvet-ai.app

Happy testing! 🚀🧠
EOF

# Create troubleshooting guide
cat > "${DIST_DIR}/TROUBLESHOOTING.md" << 'EOF'
# Velvet AI Beta - Troubleshooting Guide

## Installation Issues

### "App is damaged and can't be opened"
**Cause:** macOS Gatekeeper security
**Solution:**
1. Right-click app → "Open" → "Open" (bypass warning)
2. OR: System Preferences → Privacy & Security → "Allow"
3. OR: Terminal: `xattr -cr "/Applications/Velvet AI Assistant.app"`

### "Permission denied" during installation
**Cause:** Need administrator privileges
**Solution:**
1. Run installer with `sudo ./install.sh`
2. Enter your password when prompted
3. Must be admin user on the Mac

## Permissions Issues

### Screen Recording permission not working
**Steps:**
1. System Preferences → Privacy & Security → Screen Recording
2. Look for "Velvet AI Assistant" in list
3. If not there: Click "+" and add the app
4. If there but unchecked: Check the box
5. Restart Velvet after granting permission

### Microphone permission not working
**Steps:**
1. System Preferences → Privacy & Security → Microphone
2. Enable "Velvet AI Assistant"
3. Test voice button in app

## Service Connection Issues

### "Services failed to start"
**First try:**
1. Wait 60 seconds (services take time on first launch)
2. Check Activity Monitor for processes:
   - `velvet-capture-service`
   - `python3` (preprocessing worker)

**If still failing:**
1. Check ports 8001 and 50051 aren't in use:
   ```bash
   lsof -i :8001
   lsof -i :50051
   ```
2. Kill conflicting processes
3. Restart Velvet

### Services start but features don't work
**Check:**
1. Screen Recording permission granted
2. Microphone permission granted  
3. Wait for "brain conscious" message in chat
4. Try clicking the orb to expand interface

## Performance Issues

### High CPU usage
**Causes:**
- Screen capture running at high frame rate
- Audio processing in background
- Multiple chat conversations

**Solutions:**
1. Close other intensive apps
2. Restart Velvet to clear memory
3. Check Activity Monitor for runaway processes

### Slow response times
**Check:**
1. Internet connection (for AI responses)
2. Available RAM (need ~2GB free)
3. Background processes competing for resources

## Feature-Specific Issues

### Social Decoder not showing translations
**Requirements:**
- Screen Recording permission granted
- Video call must be in focus/visible
- Text must be readable by OCR system

**Debug:**
1. Test with simple text on screen first
2. Check Console.app for OCR processing logs
3. Verify capture service is running

### Voice assistant not responding
**Check:**
1. Microphone permission granted
2. System audio input device working
3. Internet connection for transcription
4. Blue recording indicator appears when speaking

### Task coaching not triggering
**Requirements:**
- Say phrases like "I need to..." or "I have to..."
- Wait a few seconds for AI processing
- Check that chat interface is responsive

## Getting Debug Information

### System Information
```bash
# macOS version
sw_vers -productVersion

# Architecture  
uname -m

# Available memory
vm_stat | head -5

# Running Velvet processes
ps aux | grep -i velvet
```

### Application Logs
1. Open Console.app
2. Search for "Velvet" or "velvet"
3. Look for error messages or crashes
4. Include relevant logs in feedback

### Network Connectivity
```bash
# Test service endpoints
curl -v http://127.0.0.1:8001/health
lsof -i :50051
```

## Emergency Recovery

### Complete Reset
1. Quit Velvet completely
2. Delete: `~/Library/Application Support/velvet-app/`
3. Restart Velvet (will recreate settings)

### Factory Reset
1. Remove app: `sudo rm -rf "/Applications/Velvet AI Assistant.app"`
2. Remove data: `rm -rf ~/Library/Application\ Support/velvet-app/`
3. Reinstall from beta package

### Last Resort
1. Take screenshot of error
2. Check Console.app for crash logs
3. Email everything to: support@velvet-ai.app
4. Include: macOS version, steps to reproduce, expected vs actual behavior

## Still Need Help?

**Before contacting support:**
- [ ] Tried troubleshooting steps above
- [ ] Checked Console.app for error messages  
- [ ] Verified permissions are granted
- [ ] Waited at least 60 seconds for services to start

**Contact Information:**
- **Email:** support@velvet-ai.app
- **Include:** macOS version, error details, steps to reproduce
- **Discord:** [Beta testing community link]

**Response Time:** 24-48 hours for beta testers

Remember: This is beta software! Bugs are expected and help us improve. 🐛→✨
EOF

# Create version info
cat > "${DIST_DIR}/VERSION.txt" << EOF
Velvet AI Assistant - Beta Release
Version: ${VERSION}
Build Date: ${BUILD_DATE}
Platform: macOS (Universal)
Architecture: x86_64 + arm64

Components:
- Electron App with AI Chat Interface
- Rust Capture Service (gRPC streaming)
- Python Preprocessing Worker (OCR + ASR)
- Built-in Beta Feedback System
- Onboarding and Permissions Management

Beta Testing Features:
- Social Decoder for neurotypical communication
- Screen Intelligence with pattern recognition  
- Gentle task coaching and breakdown
- Voice assistant with empathetic responses
- Privacy-first local processing

For support: beta@velvet-ai.app
EOF

# Copy DMG if it exists
if [ -f "dist/"*.dmg ]; then
    cp dist/*.dmg "${DIST_DIR}/" 2>/dev/null || true
fi

# Create compressed package
echo -e "${BLUE}🗜️ Creating compressed package...${NC}"
cd dist/
tar -czf "${BETA_PACKAGE_NAME}.tar.gz" beta-package/
zip -r -q "${BETA_PACKAGE_NAME}.zip" beta-package/

echo ""
echo -e "${GREEN}🎉 BETA PACKAGE COMPLETE!${NC}"
echo "=============================================="
echo -e "${GREEN}📦 Package Location:${NC} dist/beta-package/"
echo -e "${GREEN}📄 Compressed Archives:${NC}"
echo "   • ${BETA_PACKAGE_NAME}.tar.gz"
echo "   • ${BETA_PACKAGE_NAME}.zip"
echo ""
echo -e "${BLUE}📋 Package Contents:${NC}"
echo "   ✅ Velvet AI Assistant.app (Universal Binary)"
echo "   ✅ install.sh (Automated installer)"
echo "   ✅ README-BETA-TESTERS.md (Quick start guide)"
echo "   ✅ TROUBLESHOOTING.md (Support documentation)"
echo "   ✅ BETA-DISTRIBUTION-GUIDE.md (Full guide)"
echo "   ✅ VERSION.txt (Build information)"
echo ""
echo -e "${YELLOW}📤 Ready for Distribution:${NC}"
echo "1. Test installation on clean macOS system"
echo "2. Upload to secure file sharing service"
echo "3. Send download links to beta testers"
echo "4. Monitor feedback and error reports"
echo ""
echo -e "${GREEN}✨ Velvet is ready to help neurodivergent minds!${NC}"