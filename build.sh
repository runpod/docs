#!/bin/bash

# Install Python dependencies
echo "Installing Python dependencies..."
pip3 install -r requirements.txt || pip install -r requirements.txt

# Run the build process
echo "Generating llms.txt file..."
python3 helpers/generate_llms.py

echo "Building Docusaurus site..."
npm run docusaurus build

echo "Copying llms.txt to build directory..."
cp static/llms.txt build/llms.txt

echo "Build complete!" 