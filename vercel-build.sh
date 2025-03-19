#!/bin/bash

# Log some debug info
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Python version: $(python3 --version || python --version)"
echo "Working directory: $(pwd)"
echo "Directory contents:"
ls -la

# Install Python dependencies
echo "Installing Python dependencies..."
pip3 install python-frontmatter || pip install python-frontmatter

# Run the build process
echo "Generating llms.txt file..."
python3 helpers/generate_llms.py || python helpers/generate_llms.py

echo "Building Docusaurus site..."
npm run docusaurus build

echo "Copying llms.txt to build directory..."
cp static/llms.txt build/llms.txt

echo "Build complete!" 