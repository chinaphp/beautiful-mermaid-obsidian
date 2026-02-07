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
                    el.innerHTML = `<div class="error">Failed to render Mermaid diagram: ${error}</div>`;
                }
            }
        );

        // Add settings tab
        this.addSettingTab(new BeautifulMermaidSettingTab(this.app, this));
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
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
            .setName('Use Default Mermaid')
            .setDesc('Disable Beautiful Mermaid and use Obsidian\'s built-in Mermaid renderer')
            .addToggle((toggle: import('obsidian').ToggleComponent) => toggle
                .setValue(this.plugin.settings.useDefaultMermaid)
                .onChange(async (value: boolean) => {
                    this.plugin.settings.useDefaultMermaid = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Theme')
            .setDesc('Select a theme for Beautiful Mermaid diagrams')
            .addDropdown((dropdown: import('obsidian').DropdownComponent) => dropdown
                .addOption('tokyo-night', 'Tokyo Night')
                .addOption('tokyo-night-storm', 'Tokyo Night Storm')
                .addOption('catppuccin-mocha', 'Catppuccin Mocha')
                .addOption('catppuccin-latte', 'Catppuccin Latte')
                .addOption('nord', 'Nord')
                .addOption('nord-light', 'Nord Light')
                .addOption('dracula', 'Dracula')
                .addOption('github-dark', 'GitHub Dark')
                .addOption('github-light', 'GitHub Light')
                .addOption('solarized-dark', 'Solarized Dark')
                .addOption('solarized-light', 'Solarized Light')
                .addOption('one-dark', 'One Dark')
                .addOption('zinc-dark', 'Zinc Dark')
                .addOption('zinc-light', 'Zinc Light')
                .setValue(this.plugin.settings.theme)
                .onChange(async (value: string) => {
                    this.plugin.settings.theme = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('About')
            .setDesc('Beautiful Mermaid uses lukilabs/beautiful-mermaid to render beautiful diagrams with enhanced aesthetics and 15+ built-in themes.')
            .setHeading();

        new Setting(containerEl)
            .setName('Reload Required')
            .setDesc('After changing settings, reload note for changes to take effect.')
            .setClass('mod-warning');
    }
}
