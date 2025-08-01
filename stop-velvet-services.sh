#!/bin/bash

# Velvet Services Cleanup Script
# Stops all microservices gracefully

echo "🛑 Stopping Velvet Streaming Brain Services..."
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to kill process by PID
kill_process() {
    local pid=$1
    local name=$2
    
    if kill -0 $pid 2>/dev/null; then
        echo -e "${YELLOW}🛑 Stopping $name (PID: $pid)...${NC}"
        kill $pid 2>/dev/null
        
        # Wait for graceful shutdown
        sleep 2
        
        # Force kill if still running
        if kill -0 $pid 2>/dev/null; then
            echo -e "${RED}💥 Force killing $name...${NC}"
            kill -9 $pid 2>/dev/null
        fi
        
        echo -e "${GREEN}✅ $name stopped${NC}"
    else
        echo -e "${YELLOW}⚠️ $name was not running${NC}"
    fi
}

# Read PIDs from file if it exists
if [ -f ".velvet-services.pid" ]; then
    read PREPROC_PID CAPTURE_PID VELVET_PID < .velvet-services.pid
    
    kill_process $PREPROC_PID "Preprocessing Worker"
    kill_process $CAPTURE_PID "Capture Service"
    kill_process $VELVET_PID "Velvet Brain"
    
    rm -f .velvet-services.pid
else
    echo -e "${YELLOW}⚠️ No PID file found, attempting to kill by port...${NC}"
    
    # Kill by port
    if lsof -ti:8001 >/dev/null 2>&1; then
        echo -e "${YELLOW}🛑 Stopping service on port 8001...${NC}"
        lsof -ti:8001 | xargs kill -9 2>/dev/null
    fi
    
    if lsof -ti:50051 >/dev/null 2>&1; then
        echo -e "${YELLOW}🛑 Stopping service on port 50051...${NC}"
        lsof -ti:50051 | xargs kill -9 2>/dev/null
    fi
    
    # Kill any remaining Electron processes
    pkill -f "velvet-app" 2>/dev/null
    pkill -f "electron" 2>/dev/null
fi

# Clean up any remaining Python processes
pkill -f "preproc-worker" 2>/dev/null
pkill -f "velvet-capture-service" 2>/dev/null

echo ""
echo -e "${GREEN}✅ All Velvet services stopped successfully!${NC}"
echo -e "${GREEN}🧹 Cleanup complete${NC}"