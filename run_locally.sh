#!/bin/bash

# Function to kill processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p) 2>/dev/null
}
trap cleanup EXIT

echo "🚀 Starting HomeHub Global Locally..."


# 1. Start Backend
echo "📦 Setting up Backend..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate

echo "Installing backend dependencies..."
pip install -r requirements.txt > /dev/null 2>&1

echo "🔥 Starting Backend Server on port 8000..."
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# 2. Start Frontend
echo "🎨 Setting up Frontend..."
cd ../frontend
# We already know node_modules exists from previous steps
echo "🔥 Starting Frontend Server..."
npm run dev &
FRONTEND_PID=$!

echo "✅ App is running!"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend: http://localhost:8000"
echo "   - API Docs: http://localhost:8000/docs"
echo "Press Ctrl+C to stop."

wait
