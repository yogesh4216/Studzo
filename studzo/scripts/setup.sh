#!/bin/bash

# Setup script for HomeHub Global

echo "Setting up HomeHub Global..."

# Create .env from example if not exists
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "Created backend/.env"
fi

if [ ! -f frontend/.env ]; then
    echo "VITE_API_URL=http://localhost:8000" > frontend/.env
    echo "Created frontend/.env"
fi

# Build docker containers
echo "Building Docker containers..."
docker-compose build

echo "Setup complete! Run 'docker-compose up' to start the application."
