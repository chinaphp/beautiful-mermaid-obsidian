# Beautiful Mermaid for Obsidian

Beautiful Mermaid rendering plugin for Obsidian using [lukilabs/beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid).

## Features

- 🎨 **15+ Beautiful Themes** - Tokyo Night, Catppuccin, Nord, Dracula, and more
- ✨ **Enhanced Aesthetics** - Professional-looking diagrams with better colors and styling
- 🔄 **Easy Theme Switching** - Change themes via plugin settings
- 🎯 **Seamless Integration** - Works with existing Mermaid code blocks
- ⚡ **Fast Rendering** - Optimized for performance

## Installation

### From Source

1. Clone this repository
2. Run `npm install`
3. Run `npm run build`
4. Copy the built files to your Obsidian vault's plugins directory:
   ```
   mkdir -p ~/.obsidian/plugins/beautiful-mermaid
   cp manifest.json main.js ~/.obsidian/plugins/beautiful-mermaid/
   ```
5. Enable the plugin in Obsidian settings

### From Community Plugins (Coming Soon)

Once published, you can install directly from Obsidian's community plugin browser.

## Usage

### Basic Usage

Just use Mermaid code blocks as usual:

\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[End]
\`\`\`

The plugin will automatically render it with the selected theme.

### Changing Themes

1. Go to Settings → Beautiful Mermaid
2. Select a theme from the dropdown
3. Reload your note to see the changes

## Available Themes

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

## Development

```bash
# Install dependencies
npm install

# Build for development
npm run dev

# Build for production
npm run build
```

## Dependencies

- [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) - Core rendering library
- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api) - Plugin framework

## License

MIT

## Credits

- [lukilabs/beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) - Beautiful Mermaid rendering
- [Obsidian](https://obsidian.md/) - The note-taking app

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues, please report them on the [GitHub Issues](https://github.com/yourusername/beautiful-mermaid-obsidian/issues) page.
