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

type MermaidInitializeConfig = Record<string, unknown>;
type MermaidRenderResult = { svg: string };

type MermaidApi = {
    initialize: (config: MermaidInitializeConfig) => void | Promise<void>;
    render: (id: string, source: string) => Promise<MermaidRenderResult>;
};

type BeautifulMermaidApi = {
    renderMermaid: (source: string, theme: BeautifulMermaidTheme) => Promise<string>;
};

function clearElement(element: HTMLElement): void {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function getGlobalProperty(name: string): unknown {
    return (window as unknown as Record<string, unknown>)[name];
}

function hasFunctionProperty(value: unknown, prop: string): value is Record<string, (...args: never[]) => unknown> {
    if (typeof value !== "object" || value === null) return false;
    const record = value as Record<string, unknown>;
    return typeof record[prop] === "function";
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

    svgElement.style.setProperty('--line', theme.line || mixColor(theme.bg, theme.fg, 0.3));
    svgElement.style.setProperty('--accent', theme.accent || mixColor(theme.bg, theme.fg, 0.5));
    svgElement.style.setProperty('--muted', theme.muted || mixColor(theme.bg, theme.fg, 0.6));
    svgElement.style.setProperty('--surface', theme.surface || mixColor(theme.bg, theme.fg, 0.03));
    svgElement.style.setProperty('--border', theme.border || mixColor(theme.bg, theme.fg, 0.2));

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
    clearElement(container);

    // Check if beautiful-mermaid is available
    const beautifulMermaidCandidate = getGlobalProperty("beautifulMermaid");
    if (hasFunctionProperty(beautifulMermaidCandidate, "renderMermaid")) {
        try {
            // Use beautiful-mermaid if available via CDN
            const beautifulMermaid = beautifulMermaidCandidate as BeautifulMermaidApi;
            const svg = await beautifulMermaid.renderMermaid(source, theme);

            // Parse SVG string and apply theme
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svg, 'image/svg+xml');
            const svgElement = svgDoc.querySelector("svg");
            if (!svgElement) throw new Error("Failed to parse SVG from beautiful-mermaid");

            applyThemeToSvg(svgElement, theme);
            container.appendChild(svgElement);
            svgElement.classList.add("beautiful-mermaid-svg");

            return;

        } catch (error) {
            console.error('Beautiful Mermaid rendering failed:', error);
        }
    }

    // Fallback: Try to use mermaid.js directly with theme
    const mermaidCandidate = getGlobalProperty("mermaid");
    if (hasFunctionProperty(mermaidCandidate, "initialize") && hasFunctionProperty(mermaidCandidate, "render")) {
        try {
            // Clean the source
            const cleanSource = source.trim();

            // Generate unique ID
            const id = "mermaid-" + Math.random().toString(36).slice(2, 11);

            // Initialize mermaid with theme
            const mermaid = mermaidCandidate as MermaidApi;

            // Map theme name to mermaid theme
            const mermaidTheme = themeName.includes('light') ? 'default' : 'dark';

            await mermaid.initialize({
                theme: mermaidTheme,
                securityLevel: 'loose',
                startOnLoad: false
            });

            // Render the diagram
            const { svg } = await mermaid.render(id, cleanSource);
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svg, "image/svg+xml");
            const svgElement = svgDoc.querySelector("svg");
            if (!svgElement) throw new Error("Failed to parse SVG from mermaid");
            container.appendChild(svgElement);

            // Apply our beautiful theme
            applyThemeToSvg(svgElement, theme);
            svgElement.classList.add("beautiful-mermaid-svg");

            return;
        } catch (error) {
            console.error('Mermaid.js fallback failed:', error);
        }
    }

    // If neither is available, show message
    const wrapper = document.createElement("div");
    wrapper.classList.add("beautiful-mermaid-missing");
    wrapper.style.setProperty("--bg", theme.bg);
    wrapper.style.setProperty("--fg", theme.fg);
    wrapper.style.setProperty("--border", theme.border || mixColor(theme.bg, theme.fg, 0.2));

    const p1 = document.createElement("p");
    p1.textContent = "Beautiful Mermaid plugin requires Mermaid to be enabled.";

    const p2 = document.createElement("p");
    p2.textContent = "Enable Obsidian's built-in Mermaid plugin in settings, or load Mermaid from an online source.";

    wrapper.appendChild(p1);
    wrapper.appendChild(p2);
    container.appendChild(wrapper);
}

/**
 * Load beautiful-mermaid from CDN
 */
export function loadBeautifulMermaid(): void {
    // Check if already loaded
    const beautifulMermaidCandidate = getGlobalProperty("beautifulMermaid");
    if (beautifulMermaidCandidate !== undefined) {
        return;
    }

    // Load beautiful-mermaid from CDN
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/beautiful-mermaid/dist/beautiful-mermaid.browser.global.js';
    script.onload = () => {
        console.debug('Beautiful Mermaid loaded successfully');
    };
    script.onerror = () => {
        console.error('Failed to load Beautiful Mermaid from CDN');
    };
    document.head.appendChild(script);
}
