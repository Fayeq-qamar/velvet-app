#!/bin/bash

# Terminal Debug Commands for Velvet Monitoring Issues
echo "🔍 VELVET TERMINAL DEBUG COMMANDS"
echo "================================="

echo ""
echo "1. Check if Velvet is running with proper permissions:"
echo "   ps aux | grep -i electron"

echo ""
echo "2. Check screen recording permissions for Electron:"
echo "   tccutil reset ScreenCapture"
echo "   tccutil reset Camera"

echo ""
echo "3. Check system audio detection directly:"
echo "   osascript -e 'tell application \"System Events\" to get name of every application process whose background only is false'"

echo ""
echo "4. Test Spotify/Music detection:"
echo "   osascript -e 'tell application \"Spotify\" to get player state'"
echo "   osascript -e 'tell application \"Music\" to get player state'"

echo ""
echo "5. Check what's actually playing audio:"
echo "   sudo lsof -i :80 | grep LISTEN"
echo "   ps aux | grep -E '(Spotify|Music|Chrome|Safari|Firefox)' | grep -v grep"

echo ""
echo "6. Run Velvet with detailed logging:"
echo "   cd /Users/fayeq/Desktop/velvet-app"
echo "   DEBUG=* npm run dev"

echo ""
echo "7. Run Velvet with Electron debugging:"
echo "   cd /Users/fayeq/Desktop/velvet-app"
echo "   npm run dev -- --enable-logging --log-level=0"

echo ""
echo "8. Check macOS privacy settings:"
echo "   open 'x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture'"

echo ""
echo "9. Reset all privacy permissions:"
echo "   tccutil reset All com.github.Electron"
echo "   tccutil reset All org.electronjs.Electron"

echo ""
echo "10. Check system volume and audio routing:"
echo "    osascript -e 'get volume settings'"
echo "    system_profiler SPAudioDataType"

echo ""
echo "RECOMMENDED ORDER:"
echo "=================="
echo "1. Run command #6 (DEBUG=* npm run dev) in terminal"
echo "2. Keep terminal open and watch for errors"
echo "3. In another terminal, run command #8 to check privacy settings"
echo "4. If needed, run command #9 to reset permissions"
echo "5. Run command #3 to test audio detection directly"