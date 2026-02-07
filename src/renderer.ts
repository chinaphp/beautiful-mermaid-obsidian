// Beautiful Mermaid renderer for Obsidian
// This module provides a wrapper around beautiful-mermaid library

interface BeautifulMermaidTheme {
    bg: string;
    fg: string;
    line?: string;
    accent?: string;
    muted?: string;
    surface?: string;
    border?: string;
}

// Theme definitions from beautiful-mermaid
const THEMES: Record<string, BeautifulMermaidTheme> = {
    'tokyo-night': { bg: '#1a1b26', fg: '#a9b1d6', accent: '#7aa2f7' },
    'tokyo-night-storm': { bg: '#24283b', fg: '#a9b1d6', accent: '#7aa2f7' },
    'tokyo-night-light': { bg: '#d5d6db', fg: '#34548a', accent: '#34548a' },
    'catppuccin-mocha': { bg: '#1e1e2e', fg: '#cdd6f4', accent: '#cba6f7' },
    'catppuccin-latte': { bg: '#eff1f5', fg: '#4c4f69', accent: '#8839ef' },
    'nord': { bg: '#2e3440', fg: '#d8dee9', accent: '#88c0d0' },
    'nord-light': { bg: '#eceff4', fg: '#2e3440', accent: '#5e81ac' },
    'dracula': { bg: '#282a36', fg: '#f8f8f2', accent: '#bd93f9' },
    'github-dark': { bg: '#0d1117', fg: '#c9d1d9', accent: '#4493f8' },
    'github-light': { bg: '#ffffff', fg: '#24292f', accent: '#0969da' },
    'solarized-dark': { bg: '#002b36', fg: '#839496', accent: '#268bd2' },
    'solarized-light': { bg: '#fdf6e3', fg: '#657b83', accent: '#268bd2' },
    'one-dark': { bg: '#282c34', fg: '#abb2bf', accent: '#c678dd' },
    'zinc-dark': { bg: '#18181b', fg: '#a1a1aa', accent: '#27272a' },
    'zinc-light': { bg: '#ffffff', fg: '#27272a', accent: '#27272a' }
};

// Apply theme colors to SVG
function applyThemeToSvg(svgElement: SVGElement, theme: BeautifulMermaidTheme): void {
    svgElement.style.setProperty('--bg', theme.bg);
    svgElement.style.setProperty('--fg', theme.fg);

    if (theme.line) svgElement.style.setProperty('--line', theme.line);
    if (theme.accent) svgElement.style.setProperty('--accent', theme.accent);
    if (theme.muted) svgElement.style.setProperty('--muted', theme.muted);
    if (theme.surface) svgElement.style.setProperty('--surface', theme.surface);
    if (theme.border) svgElement.style.setProperty('--border', theme.border);

    // Set background color
    svgElement.style.backgroundColor = theme.bg;

    // Set text color
    const textElements = svgElement.querySelectorAll('text, tspan');
    textElements.forEach(el => {
        (el as SVGTextElement).style.fill = theme.fg;
    });

    // Set stroke colors for paths and lines
    const strokeElements = svgElement.querySelectorAll('path, line, rect, circle, ellipse, polygon, polyline');
    strokeElements.forEach(el => {
        const currentStroke = (el as SVGElement).getAttribute('stroke');
        if (currentStroke && currentStroke !== 'none' && !currentStroke.startsWith('#')) {
            (el as SVGElement).style.stroke = theme.line || theme.fg;
        }
    });

    // Set fill colors (lighter background for nodes)
    const fillElements = svgElement.querySelectorAll('rect[fill^="white"], circle[fill^="white"]');
    fillElements.forEach(el => {
        const fillValue = theme.surface || mixColor(theme.bg, theme.fg, 0.03);
        (el as SVGElement).setAttribute('fill', fillValue);
    });
}

// Helper function to mix colors (simplified)
function mixColor(bg: string, fg: string, ratio: number): string {
    // Very simplified color mixing - in production use proper color manipulation
    return ratio > 0.5 ? fg : bg;
}

/**
 * Render a beautiful Mermaid diagram
 * @param source - The Mermaid source code
 * @param container - The container element to render into
 * @param themeName - The theme name to use
 */
export async function renderBeautifulMermaid(
    source: string,
    container: HTMLElement,
    themeName: string = 'tokyo-night'
): Promise<void> {
    // Get the theme
    const theme = THEMES[themeName] || THEMES['tokyo-night'];

    // Clear container
    container.innerHTML = '';

    // Check if beautiful-mermaid is available
    if ((window as any).beautifulMermaid) {
        try {
            // Use beautiful-mermaid if available via CDN
            const beautifulMermaid = (window as any).beautifulMermaid;
            const svg = await beautifulMermaid.renderMermaid(source, theme);

            // Parse SVG string and apply theme
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svg, 'image/svg+xml');
            const rootElement = svgDoc.documentElement;

            // Verify it's an SVG element before casting
            if (rootElement && rootElement.tagName.toLowerCase() === 'svg') {
                const svgElement = rootElement as unknown as SVGElement;
                applyThemeToSvg(svgElement, theme);

                // Add CSS for theme variables
                const style = document.createElement('style');
                style.textContent = `
                    .beautiful-mermaid-svg {
                        --bg: ${theme.bg};
                        --fg: ${theme.fg};
                        --line: ${theme.line || mixColor(theme.bg, theme.fg, 0.3)};
                        --accent: ${theme.accent || mixColor(theme.bg, theme.fg, 0.5)};
                        --muted: ${theme.muted || mixColor(theme.bg, theme.fg, 0.6)};
                        --surface: ${theme.surface || mixColor(theme.bg, theme.fg, 0.03)};
                        --border: ${theme.border || mixColor(theme.bg, theme.fg, 0.2)};
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    }
                    .beautiful-mermaid-svg text {
                        fill: var(--fg);
                    }
                    .beautiful-mermaid-svg path,
                    .beautiful-mermaid-svg line,
                    .beautiful-mermaid-svg rect,
                    .beautiful-mermaid-svg circle {
                        stroke: var(--line);
                    }
                    .beautiful-mermaid-svg .node rect {
                        fill: var(--surface);
                        stroke: var(--border);
                    }
                `;

                container.appendChild(style);
                container.appendChild(svgElement);
                svgElement.classList.add('beautiful-mermaid-svg');

                return;
            }
            throw new Error('Failed to parse SVG from beautiful-mermaid');

        } catch (error) {
            console.error('Beautiful Mermaid rendering failed:', error);
        }
    }

    // Fallback: Try to use mermaid.js directly with theme
    if ((window as any).mermaid) {
        try {
            // Clean the source
            const cleanSource = source.trim();

            // Generate unique ID
            const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);

            // Create temporary div
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = `<pre class="mermaid">${cleanSource}</pre>`;
            container.appendChild(tempDiv);

            // Initialize mermaid with theme
            const mermaid = (window as any).mermaid;

            // Map theme name to mermaid theme
            const mermaidTheme = themeName.includes('light') ? 'default' : 'dark';

            await mermaid.initialize({
                theme: mermaidTheme,
                securityLevel: 'loose',
                startOnLoad: false
            });

            // Render the diagram
            const { svg } = await mermaid.render(id, cleanSource);
            container.innerHTML = svg;

            // Apply our beautiful theme
            const svgElement = container.querySelector('svg');
            if (svgElement && svgElement.tagName === 'svg') {
                applyThemeToSvg(svgElement as SVGElement, theme);
                svgElement.classList.add('beautiful-mermaid-svg');
            }

            return;
        } catch (error) {
            console.error('Mermaid.js fallback failed:', error);
        }
    }

    // If neither is available, show message
    container.innerHTML = `
        <div style="padding: 20px; text-align: center; color: ${theme.fg}; background: ${theme.bg}; border-radius: 8px;">
            <p>⚠️ Beautiful Mermaid plugin requires mermaid.js to be loaded.</p>
            <p>Enable Obsidian's built-in Mermaid plugin in settings, or install via CDN.</p>
        </div>
    `;
}

/**
 * Load beautiful-mermaid from CDN
 */
export async function loadBeautifulMermaid(): Promise<void> {
    // Check if already loaded
    if ((window as any).beautifulMermaid) {
        return;
    }

    // Load beautiful-mermaid from CDN
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/beautiful-mermaid/dist/beautiful-mermaid.browser.global.js';
    script.onload = () => {
        console.log('Beautiful Mermaid loaded successfully');
    };
    script.onerror = () => {
        console.error('Failed to load Beautiful Mermaid from CDN');
    };
    document.head.appendChild(script);
}
