#!/bin/bash

# Check if the frontend flag is set
if [ "$1" == "frontend" ]; then
  cd frontend
  npm run format
  cd ..
fi

# Check if the backend flag is set
if [ "$1" == "backend" ]; then
  cd backend
  npm run format
  cd ..
fi

# Check if the all flag is set
if [ "$1" == "all" ]; then
  cd frontend
  npm run format
  cd ..
  cd backend
  npm run format
  cd ..
fi
