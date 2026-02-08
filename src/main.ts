import { Plugin, PluginSettingTab, Setting, MarkdownPostProcessorContext, App } from 'obsidian';
import { renderBeautifulMermaid } from './renderer';

interface BeautifulMermaidSettings {
    theme: string;
    useDefaultMermaid: boolean;
}

const DEFAULT_SETTINGS: BeautifulMermaidSettings = {
    theme: 'tokyo-night',
    useDefaultMermaid: false
};

export default class BeautifulMermaidPlugin extends Plugin {
    settings: BeautifulMermaidSettings;

    async onload() {
        await this.loadSettings();

        // Register markdown post processor
        this.registerMarkdownCodeBlockProcessor(
            'mermaid',
            async (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
                // If user wants to use default Mermaid, skip this processor
                if (this.settings.useDefaultMermaid) {
                    return;
                }

                try {
                    await renderBeautifulMermaid(source, el, this.settings.theme);
                } catch (error) {
                    console.error('Beautiful Mermaid error:', error);
                    const errorDiv = document.createElement("div");
                    errorDiv.classList.add("error");
                    errorDiv.textContent = `Failed to render Mermaid diagram: ${String(error)}`;
                    el.appendChild(errorDiv);
                }
            }
        );

        // Add settings tab
        this.addSettingTab(new BeautifulMermaidSettingTab(this.app, this));
    }

    async loadSettings() {
        const loaded = (await this.loadData()) as Partial<BeautifulMermaidSettings> | null;
        this.settings = { ...DEFAULT_SETTINGS, ...(loaded ?? {}) };
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class BeautifulMermaidSettingTab extends PluginSettingTab {
    plugin: BeautifulMermaidPlugin;

    constructor(app: App, plugin: BeautifulMermaidPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName('Use default Mermaid')
            .setDesc('Disable beautiful Mermaid and use Obsidian\'s built-in Mermaid renderer.')
            .addToggle((toggle: import('obsidian').ToggleComponent) => toggle
                .setValue(this.plugin.settings.useDefaultMermaid)
                .onChange(async (value: boolean) => {
                    this.plugin.settings.useDefaultMermaid = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Theme')
            .setDesc('Select a theme for beautiful Mermaid diagrams.')
            .addDropdown((dropdown: import('obsidian').DropdownComponent) => dropdown
                .addOption('tokyo-night', 'Tokyo night')
                .addOption('tokyo-night-storm', 'Tokyo night storm')
                .addOption('catppuccin-mocha', 'Catppuccin mocha')
                .addOption('catppuccin-latte', 'Catppuccin latte')
                .addOption('nord', 'Nord')
                .addOption('nord-light', 'Nord light')
                .addOption('dracula', 'Dracula')
                .addOption('github-dark', 'GitHub dark')
                .addOption('github-light', 'GitHub light')
                .addOption('solarized-dark', 'Solarized dark')
                .addOption('solarized-light', 'Solarized light')
                .addOption('one-dark', 'One dark')
                .addOption('zinc-dark', 'Zinc dark')
                .addOption('zinc-light', 'Zinc light')
                .setValue(this.plugin.settings.theme)
                .onChange(async (value: string) => {
                    this.plugin.settings.theme = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('About')
            .setDesc('Render diagrams with enhanced aesthetics and more than 15 built-in themes.')
            .setHeading();

        new Setting(containerEl)
            .setName('Reload required')
            .setDesc('After changing settings, reload note for changes to take effect.')
            .setClass('mod-warning');
    }
}
