#!/bin/bash

# Install dependency
echo "Installing google-generativeai..."
pip3 install google-generativeai --upgrade

# Get absolute path to the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_PATH="$SCRIPT_DIR/gemini_chat.py"

# Add alias to .zshrc if it doesn't exist
if ! grep -q "alias gemini=" ~/.zshrc; then
    echo "Adding alias to ~/.zshrc..."
    echo "" >> ~/.zshrc
    echo "# Gemini CLI Alias" >> ~/.zshrc
    echo "alias gemini='python3 $SCRIPT_PATH'" >> ~/.zshrc
    echo "Alias added!"
else
    echo "Alias already exists in ~/.zshrc."
fi

echo "--------------------------------------------------"
echo "Setup complete!"
echo "Please run the following command to load the changes:"
echo "  source ~/.zshrc"
echo ""
echo "Then, ensure you have your API key set:"
echo "  export GEMINI_API_KEY='YOUR_API_KEY'"
echo ""
echo "Finally, try running: gemini"
