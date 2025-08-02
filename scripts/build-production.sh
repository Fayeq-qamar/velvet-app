#!/bin/bash

# Velvet AI - Production Build Script
# Creates a production-ready build with all services and dependencies

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Building Velvet AI Assistant for Production${NC}"
echo "=================================================="

# Check prerequisites
echo -e "${BLUE}🔍 Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is required but not installed${NC}"
    exit 1
fi

if ! command -v cargo &> /dev/null; then
    echo -e "${RED}❌ Rust/Cargo is required but not installed${NC}"
    echo "Install with: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs/ | sh"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is required but not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites found${NC}"

# Clean previous build
echo -e "${BLUE}🧹 Cleaning previous build...${NC}"
rm -rf dist/ build/ node_modules/.cache/

# Install Node.js dependencies
echo -e "${BLUE}📦 Installing Node.js dependencies...${NC}"
npm ci --production=false

# Build Rust capture service
echo -e "${BLUE}🦀 Building Rust capture service...${NC}"
cd services/capture-service/
cargo build --release

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to build Rust capture service${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Rust capture service built successfully${NC}"
cd ../..

# Setup Python preprocessing worker
echo -e "${BLUE}🐍 Setting up Python preprocessing worker...${NC}"
cd services/preproc-worker/

# Create clean virtual environment
rm -rf venv/
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Verify Python setup
python -c "import tesseract; import whisper; import fastapi" 2>/dev/null
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to verify Python dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Python preprocessing worker ready${NC}"
deactivate
cd ../..

# Build Electron application
echo -e "${BLUE}🔧 Building Electron application...${NC}"

# Use production main process
cp src/main/index.prod.js src/main/index.js.prod.backup
mv src/main/index.js src/main/index.js.dev.backup
cp src/main/index.prod.js src/main/index.js

# Build with webpack
npm run build:electron

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to build Electron application${NC}"
    # Restore original files
    mv src/main/index.js.dev.backup src/main/index.js
    exit 1
fi

# Create app icon (placeholder)
echo -e "${BLUE}🎨 Creating app icon...${NC}"
if [ ! -f "assets/icon.icns" ]; then
    echo -e "${YELLOW}⚠️ No icon found, creating placeholder${NC}"
    # This would normally convert a PNG to ICNS
    # For now, we'll skip this step
fi

# Build distributable
echo -e "${BLUE}📦 Creating distributable package...${NC}"
npm run dist:mac

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to create distributable package${NC}"
    exit 1
fi

# Restore original files
echo -e "${BLUE}🔄 Restoring development files...${NC}"
mv src/main/index.js.dev.backup src/main/index.js
rm -f src/main/index.js.prod.backup

# Create installer package
echo -e "${BLUE}📋 Creating installer package...${NC}"
mkdir -p dist/installer/

# Copy built app
if [ -d "dist/mac/Velvet AI Assistant.app" ]; then
    cp -r "dist/mac/Velvet AI Assistant.app" dist/installer/
elif [ -d "dist/Velvet AI Assistant.app" ]; then
    cp -r "dist/Velvet AI Assistant.app" dist/installer/
else
    echo -e "${RED}❌ Built app not found${NC}"
    exit 1
fi

# Create installer scripts
cat > dist/installer/install.sh << 'EOF'
#!/bin/bash

echo "🚀 Installing Velvet AI Assistant..."

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This installer is for macOS only"
    exit 1
fi

# Get app bundle path
APP_PATH="$(dirname "$0")/Velvet AI Assistant.app"

if [ ! -d "$APP_PATH" ]; then
    echo "❌ Velvet AI Assistant.app not found"
    exit 1
fi

# Copy to Applications
echo "📁 Installing to /Applications..."
sudo cp -r "$APP_PATH" /Applications/

if [ $? -eq 0 ]; then
    echo "✅ Velvet AI Assistant installed successfully!"
    echo ""
    echo "🔐 IMPORTANT: Grant permissions for proper functionality:"
    echo "1. System Preferences → Privacy & Security → Screen Recording"
    echo "2. System Preferences → Privacy & Security → Microphone"
    echo ""
    echo "🚀 Launch Velvet from Applications folder or Spotlight"
else
    echo "❌ Installation failed. Please check permissions."
    exit 1
fi
EOF

chmod +x dist/installer/install.sh

# Create README for beta testers
cat > dist/installer/README.md << 'EOF'
# Velvet AI Assistant - Beta Release

Welcome to the Velvet AI Assistant beta! Thank you for helping us test this neurodivergent-friendly AI companion.

## Quick Install

1. **Run installer**: Double-click `install.sh` and enter your password when prompted
2. **Grant permissions**: Open System Preferences and allow Screen Recording + Microphone access
3. **Launch Velvet**: Find "Velvet AI Assistant" in Applications or Spotlight

## What to Test

### 🧠 Social Decoder
- Join a video call and watch for neurotypical translation hints
- Test with different communication styles and contexts

### 📺 Screen Intelligence  
- Try different applications and workflows
- Look for helpful nudges and pattern recognition

### 🎤 Voice Assistant
- Use voice commands to interact with Velvet
- Test the conversational AI personality

### ✨ Task Coaching
- Declare intentions and see AI-powered task breakdown
- Experience real-time progress monitoring

## Known Issues

- First launch may take 30-60 seconds to start services
- Requires macOS 10.15+ with Screen Recording permissions
- Some antivirus software may flag the app (it's safe!)

## Feedback

Your feedback is crucial! Use the built-in feedback system or contact us at:
- Email: feedback@velvet-ai.app
- Discord: [Join our beta community]

## Privacy

- All processing happens locally on your device
- No data is sent to external servers without your consent
- Screen/audio data is processed in real-time and not stored

---

Thank you for being part of the Velvet journey! 🚀
EOF

# Create quick start guide
cat > dist/installer/BETA-TESTING-GUIDE.md << 'EOF'
# Velvet Beta Testing Guide

## Test Scenarios

### 1. Social Decoder Testing
**Goal**: Verify accuracy of neurotypical communication translation

**Steps**:
1. Join a video call (Zoom, Teams, etc.)
2. Engage in conversation with neurotypical colleagues
3. Watch for Velvet's translation hints in the overlay
4. Note accuracy of sarcasm detection and implicit meaning

**What to Test**:
- [ ] Sarcasm detection ("This is fine" when clearly frustrated)
- [ ] Implicit requests ("It would be nice if..." = please do this)
- [ ] Social cues ("We should wrap up" = meeting is ending)
- [ ] Emotional subtext recognition

### 2. ADHD Pattern Recognition
**Goal**: Test distraction and hyperfocus detection

**Steps**:
1. Open multiple tabs and switch rapidly between them
2. Work on a single task for 45+ minutes
3. Repeatedly open/close the same document
4. Leave computer idle for various periods

**What to Test**:
- [ ] Distraction spiral detection (rapid tab switching)
- [ ] Hyperfocus warnings (45+ min single app)
- [ ] Task avoidance patterns (document open/close)
- [ ] Gentle intervention timing and tone

### 3. Voice Assistant Quality
**Goal**: Evaluate conversational AI personality

**Steps**:
1. Click the voice button and describe your current task
2. Ask for help with executive function challenges
3. Share frustrations and see empathetic responses
4. Test mixed English/Hindi understanding

**What to Test**:
- [ ] Empathetic, non-patronizing tone
- [ ] Practical, actionable advice
- [ ] Cultural sensitivity (Hindi/English mix)
- [ ] Response length (2-3 sentences max)

### 4. Task Coaching System
**Goal**: Test intention monitoring and breakdown

**Steps**:
1. Say "I need to write a report" or similar task
2. Watch Velvet break it into micro-steps
3. Work on the task and observe progress monitoring
4. Deviate from expected apps and note guidance

**What to Test**:
- [ ] Intelligent task breakdown (2-5 min steps)
- [ ] Real-time progress tracking
- [ ] Helpful deviation guidance
- [ ] Celebration of completed steps

## Feedback Categories

### Critical Issues
- App crashes or won't start
- Services fail to connect
- Major privacy concerns
- Permissions not working

### Enhancement Requests
- Feature accuracy improvements
- UI/UX suggestions
- New pattern recognition needs
- Voice personality adjustments

### Positive Feedback
- "Finally, someone gets it!" moments
- Particularly helpful interventions
- Accurate pattern detection
- Emotional support quality

## Privacy & Safety

This beta version:
- ✅ Processes everything locally (no cloud)
- ✅ Excludes itself from screen recordings
- ✅ Uses system-level privacy protections
- ✅ Stores minimal data (only for functionality)

You can review all code at: [GitHub repo link]

## Getting Help

If you encounter issues:
1. Check Console app for error logs
2. Use the built-in feedback system
3. Join our Discord beta community
4. Email: beta@velvet-ai.app

Thank you for helping create better tools for neurodivergent minds! 🧠✨
EOF

echo ""
echo -e "${GREEN}🎉 BUILD COMPLETE!${NC}"
echo "=================================================="
echo -e "${GREEN}📁 Installer package:${NC} dist/installer/"
echo -e "${GREEN}💿 DMG file:${NC} $(find dist/ -name "*.dmg" | head -1)"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Test the installer on a clean macOS system"
echo "2. Verify all services start correctly"
echo "3. Test permissions setup flow"
echo "4. Distribute to beta testers"
echo ""
echo -e "${YELLOW}📋 Beta Testing Package Contents:${NC}"
echo "- Velvet AI Assistant.app"
echo "- install.sh (automated installer)"
echo "- README.md (user guide)"
echo "- BETA-TESTING-GUIDE.md (testing scenarios)"
echo ""
echo -e "${GREEN}✅ Ready for beta distribution!${NC}"