# Beautiful Mermaid Obsidian Plugin Installation Script for Windows

Write-Host "🎨 Installing Beautiful Mermaid Plugin for Obsidian..." -ForegroundColor Cyan

# Detect Obsidian vault path
$obsidianPath = "$env:APPDATA\obsidian"
$pluginDir = "$obsidianPath\plugins\beautiful-mermaid"

# Check if Obsidian directory exists
if (-not (Test-Path $obsidianPath)) {
    Write-Host "❌ Error: Obsidian directory not found at $obsidianPath" -ForegroundColor Red
    Write-Host "Please make sure Obsidian is installed and has been run at least once." -ForegroundColor Yellow
    exit 1
}

# Create plugin directory
Write-Host "📁 Creating plugin directory..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path $pluginDir | Out-Null

# Copy plugin files
Write-Host "📦 Copying plugin files..." -ForegroundColor Green
Copy-Item -Path "manifest.json" -Destination "$pluginDir\manifest.json" -Force
Copy-Item -Path "main.js" -Destination "$pluginDir\main.js" -Force
if (Test-Path "styles.css") {
    Copy-Item -Path "styles.css" -Destination "$pluginDir\styles.css" -Force
}

# Copy additional files if they exist
if (Test-Path "assets") {
    Write-Host "🎨 Copying assets..." -ForegroundColor Green
    Copy-Item -Path "assets\*" -Destination "$pluginDir\assets\" -Recurse -Force
}

# Check if data.json exists
if (-not (Test-Path "$pluginDir\data.json")) {
    @'
{
  "theme": "tokyo-night",
  "useDefaultMermaid": false
}
'@ | Out-File -FilePath "$pluginDir\data.json" -Encoding utf8
    Write-Host "✅ Created default configuration file" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Open Obsidian"
Write-Host "   2. Go to Settings → Community Plugins"
Write-Host "   3. Ensure 'Community Plugins' is turned on"
Write-Host "   4. Find 'Beautiful Mermaid' in plugin list"
Write-Host "   5. Enable the plugin"
Write-Host "   6. Configure the theme in Settings → Beautiful Mermaid"
Write-Host ""
Write-Host "🎨 Available themes:" -ForegroundColor Cyan
Write-Host "   • Tokyo Night"
Write-Host "   • Catppuccin (Mocha/Latte)"
Write-Host "   • Nord (Dark/Light)"
Write-Host "   • Dracula"
Write-Host "   • GitHub (Dark/Light)"
Write-Host "   • Solarized (Dark/Light)"
Write-Host "   • One Dark"
Write-Host "   • Zinc (Dark/Light)"
Write-Host ""
