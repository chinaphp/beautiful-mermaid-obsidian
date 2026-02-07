#!/bin/bash

# Beautiful Mermaid Obsidian Plugin Installation Script

echo "🎨 Installing Beautiful Mermaid Plugin for Obsidian..."

# Detect Obsidian vault path
OBSIDIAN_VAULT_PATH="$HOME/Library/Application Support/obsidian"
PLUGIN_DIR="$OBSIDIAN_VAULT_PATH/plugins/beautiful-mermaid"

# Check if Obsidian directory exists
if [ ! -d "$OBSIDIAN_VAULT_PATH" ]; then
    echo "❌ Error: Obsidian directory not found at $OBSIDIAN_VAULT_PATH"
    echo "Please make sure Obsidian is installed and has been run at least once."
    exit 1
fi

# Create plugin directory
echo "📁 Creating plugin directory..."
mkdir -p "$PLUGIN_DIR"

# Copy plugin files
echo "📦 Copying plugin files..."
cp manifest.json "$PLUGIN_DIR/"
cp main.js "$PLUGIN_DIR/"

# Copy additional files if they exist
if [ -d "assets" ]; then
    echo "🎨 Copying assets..."
    cp -r assets "$PLUGIN_DIR/"
fi

# Check if data.json exists
if [ ! -f "$PLUGIN_DIR/data.json" ]; then
    echo '{"theme":"tokyo-night","useDefaultMermaid":false}' > "$PLUGIN_DIR/data.json"
    echo "✅ Created default configuration file"
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Open Obsidian"
echo "   2. Go to Settings → Community Plugins"
echo "   3. Ensure 'Community Plugins' is turned on"
echo "   4. Find 'Beautiful Mermaid' in the plugin list"
echo "   5. Enable the plugin"
echo "   6. Configure the theme in Settings → Beautiful Mermaid"
echo ""
echo "🎨 Available themes:"
echo "   • Tokyo Night"
echo "   • Catppuccin (Mocha/Latte)"
echo "   • Nord (Dark/Light)"
echo "   • Dracula"
echo "   • GitHub (Dark/Light)"
echo "   • Solarized (Dark/Light)"
echo "   • One Dark"
echo "   • Zinc (Dark/Light)"
echo ""
