# Beautiful Mermaid for Obsidian

[![Release](https://img.shields.io/github/v/release/chinaphp/beautiful-mermaid-obsidian?display_name=tag&style=flat-square)](https://github.com/chinaphp/beautiful-mermaid-obsidian/releases)
[![License](https://img.shields.io/github/license/chinaphp/beautiful-mermaid-obsidian?style=flat-square)](LICENSE)

Beautiful Mermaid rendering plugin for Obsidian using [lukilabs/beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid).

## ✨ Features

- 🎨 **15+ Beautiful Themes** - Tokyo Night, Catppuccin, Nord, Dracula, and more
- ✨ **Enhanced Aesthetics** - Professional-looking diagrams with better colors and styling
- 🔄 **Easy Theme Switching** - Change themes via plugin settings
- 🎯 **Seamless Integration** - Works with existing Mermaid code blocks
- ⚡ **Fast Rendering** - Optimized for performance

## 📦 Installation

### Method 1: BRAT Plugin (Recommended)

1. Install the [BRAT (Beta Tester's Auto-update Tool)](https://github.com/TfTHacker/obsidian42-brat) plugin from Community Plugins
2. Open BRAT settings
3. Click "Add a beta plugin"
4. Enter the repository URL:
   ```
   https://github.com/chinaphp/beautiful-mermaid-obsidian
   ```
5. Click "Add Plugin"
6. Enable "Beautiful Mermaid" in Community Plugins

### Method 2: Manual Installation

1. Download the latest release from [GitHub Releases](https://github.com/chinaphp/beautiful-mermaid-obsidian/releases/latest)
2. Extract the files to your Obsidian vault's `.obsidian/plugins/beautiful-mermaid/` directory
3. Enable the plugin in Obsidian settings

### Method 3: From Source

```bash
# Clone this repository
git clone https://github.com/chinaphp/beautiful-mermaid-obsidian.git
cd beautiful-mermaid-obsidian

# Install dependencies
bun install

# Build the plugin
bun run build

# Copy files to your vault
mkdir -p ~/.obsidian/plugins/beautiful-mermaid
cp manifest.json main.js styles.css ~/.obsidian/plugins/beautiful-mermaid/

# Enable the plugin in Obsidian settings
```

## 🚀 Usage

### Basic Usage

Just use Mermaid code blocks as usual:

````mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[End]
````

The plugin will automatically render it with the selected theme.

### Changing Themes

1. Go to Settings → Beautiful Mermaid
2. Select a theme from the dropdown
3. Reload your note to see the changes

## 🎨 Available Themes

| Theme | Type | Preview |
|-------|------|---------|
| Tokyo Night | Dark | Blue/Purple accents |
| Tokyo Night Storm | Dark | Muted blue/purple |
| Catppuccin Mocha | Dark | Warm pastel |
| Catppuccin Latte | Light | Soft pastel |
| Nord | Dark | Cool blue/gray |
| Nord Light | Light | Light gray/blue |
| Dracula | Dark | Pink/purple |
| GitHub Dark | Dark | GitHub's dark theme |
| GitHub Light | Light | GitHub's light theme |
| Solarized Dark | Dark | Classic solarized |
| Solarized Light | Light | Classic solarized |
| One Dark | Dark | Atom's One Dark |
| Zinc Dark | Dark | Monochromatic |
| Zinc Light | Light | Monochromatic |

## 🔧 Development

This project uses [Bun](https://bun.sh/) as the package manager and build tool.

```bash
# Install dependencies
bun install

# Build for development (watch mode)
bun run dev

# Build for production
bun run build

# Type check
bun run type-check
```

## 🚢 Releasing

This project uses GitHub Actions to automatically build and create releases when pushing version tags.

Obsidian requires the GitHub release tag to match the `version` in `manifest.json` exactly (no `v` prefix).

```bash
# Bump version in package.json (do NOT create a tag)
bun pm version patch --no-git-tag-version  # or minor/major

# Sync manifest.json and versions.json to match package.json
node version-bump.mjs
git add package.json manifest.json versions.json
git commit -m "Release X.Y.Z"

# Create and push tag (triggers GitHub Actions)
# IMPORTANT: tag must be exactly X.Y.Z (no "v" prefix)
git tag X.Y.Z
git push origin main --follow-tags
```

The workflow will:
1. Build the plugin using Bun
2. Generate `main.js` and `versions.json`
3. Create a GitHub Release with a ZIP package
4. Upload all necessary files

## 📚 Dependencies

- [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) - Core rendering library
- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api) - Plugin framework

## 📄 License

MIT

## 🙏 Credits

- [lukilabs/beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) - Beautiful Mermaid rendering
- [Obsidian](https://obsidian.md/) - The note-taking app

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

If you encounter any issues, please report them on the [GitHub Issues](https://github.com/chinaphp/beautiful-mermaid-obsidian/issues) page.
