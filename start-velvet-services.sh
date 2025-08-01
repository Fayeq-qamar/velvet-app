#!/bin/bash

# Velvet Services Startup Script
# Starts all microservices in the correct order

echo "🚀 Starting Velvet Streaming Brain Architecture..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to wait for service to be ready
wait_for_service() {
    local port=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    echo -e "${YELLOW}⏳ Waiting for $service_name to be ready on port $port...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if check_port $port; then
            echo -e "${GREEN}✅ $service_name is ready!${NC}"
            return 0
        fi
        
        echo -n "."
        sleep 1
        ((attempt++))
    done
    
    echo -e "${RED}❌ $service_name failed to start within 30 seconds${NC}"
    return 1
}

# Kill existing processes on required ports
echo -e "${BLUE}🧹 Cleaning up existing processes...${NC}"
if check_port 8001; then
    echo "Killing process on port 8001..."
    lsof -ti:8001 | xargs kill -9 2>/dev/null
fi

if check_port 50051; then
    echo "Killing process on port 50051..."
    lsof -ti:50051 | xargs kill -9 2>/dev/null
fi

# Check prerequisites
echo -e "${BLUE}🔍 Checking prerequisites...${NC}"

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is required but not installed${NC}"
    exit 1
fi

# Check if Rust/Cargo is available
if ! command -v cargo &> /dev/null; then
    echo -e "${RED}❌ Rust/Cargo is required but not installed${NC}"
    echo "Install with: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs/ | sh"
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is required but not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites found${NC}"

# Start preprocessing worker
echo -e "${BLUE}🐍 Starting Python Preprocessing Worker...${NC}"
cd services/preproc-worker/

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and install dependencies
echo "Installing Python dependencies..."
source venv/bin/activate
pip install -r requirements.txt

echo "Starting preprocessing worker..."
# Start the preprocessing worker in background with venv activated
bash -c "cd $(pwd) && source venv/bin/activate && python main.py" &
PREPROC_PID=$!
echo -e "${GREEN}🐍 Preprocessing worker started (PID: $PREPROC_PID)${NC}"

# Wait for preprocessing worker to be ready
cd ../..
if ! wait_for_service 8001 "Preprocessing Worker"; then
    kill $PREPROC_PID 2>/dev/null
    exit 1
fi

# Start capture service
echo -e "${BLUE}🦀 Starting Rust Capture Service...${NC}"
cd services/capture-service/

# Build the capture service
echo "Building Rust capture service..."
cargo build --release >/dev/null 2>&1

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to build Rust capture service${NC}"
    kill $PREPROC_PID 2>/dev/null
    exit 1
fi

# Start the capture service in background
./target/release/velvet-capture-service &
CAPTURE_PID=$!
echo -e "${GREEN}🦀 Capture service started (PID: $CAPTURE_PID)${NC}"

# Wait for capture service to be ready
cd ../..
if ! wait_for_service 50051 "Capture Service"; then
    kill $PREPROC_PID $CAPTURE_PID 2>/dev/null
    exit 1
fi

# Install Node.js dependencies if needed
echo -e "${BLUE}📦 Installing Node.js dependencies...${NC}"
npm install >/dev/null 2>&1

# Start Velvet Electron app
echo -e "${BLUE}🧠 Starting Velvet Brain...${NC}"
npm run dev &
VELVET_PID=$!

echo ""
echo -e "${GREEN}🎉 ALL SERVICES STARTED SUCCESSFULLY!${NC}"
echo "=================================================="
echo -e "${GREEN}🐍 Preprocessing Worker:${NC} http://127.0.0.1:8001"
echo -e "${GREEN}🦀 Capture Service:${NC} gRPC on 127.0.0.1:50051"
echo -e "${GREEN}🧠 Velvet Brain:${NC} Electron app with streaming consciousness"
echo ""
echo -e "${YELLOW}💡 Services are running in background${NC}"
echo -e "${YELLOW}📊 Check logs in terminal or Electron DevTools${NC}"
echo ""
echo -e "${BLUE}🛑 To stop all services:${NC}"
echo "   kill $PREPROC_PID $CAPTURE_PID $VELVET_PID"
echo "   or press Ctrl+C and run: ./stop-velvet-services.sh"
echo ""

# Save PIDs for cleanup script
echo "$PREPROC_PID $CAPTURE_PID $VELVET_PID" > .velvet-services.pid

# Wait for user interrupt
trap 'echo -e "\n${YELLOW}🛑 Stopping all services...${NC}"; kill $PREPROC_PID $CAPTURE_PID $VELVET_PID 2>/dev/null; rm -f .velvet-services.pid; exit 0' INT

echo -e "${GREEN}✅ All services running. Press Ctrl+C to stop.${NC}"
wait