import { match } from 'assert';
import { App, Editor, MarkdownPostProcessor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

const ALL_EMOJIS: Record<string, string> = {
	":+1:": "👍",
	":sunglasses:": "😎",
	":smile:": "😄",
};

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		let initLoaded = true;
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!2');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

		const nameDict: { [key: string]: string } = {};
		this.registerMarkdownPostProcessor((el, ctx) => {
			// Get all text nodes in el
			const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
			let node;

			// Create a dictionary to store the mappings from "name" to the actual name
			const regex = /\{(\w+)\|(\w+)\}/g;

			// Walk through all text nodes
			while (node = walker.nextNode()) {
				let match;
				while ((match = regex.exec(node.nodeValue ?? '')) !== null) {
					// if (!initLoaded) {
					// 	// console.log("refreshing");
					// 	// this.app.commands.executeCommandById('app:open-settings');
					// }
					const variable = match[1];
					const value = match[2];
					node.nodeValue = node.nodeValue?.replace(match[0], `${variable}=${value}`) ?? node.nodeValue;

					nameDict[variable] = value;
					// Reset the regex index to start from the beginning of the string
					regex.lastIndex = 0;
				}
			}
			// console.log(nameDict);
			initLoaded = false;
		});

		this.registerMarkdownPostProcessor((el, ctx) => {
			// Get all text nodes in el
			const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
			let node;

			// Walk through all text nodes
			while (node = walker.nextNode()) {
				// console.log(node.nodeValue);
				for (const key in nameDict) {
					// node.nodeValue = node.nodeValue?.replace(new RegExp(`\\{${key}\\}`, 'g'), nameDict[key]) ?? node.nodeValue;
					// node.nodeValue = node.nodeValue?.replace(new RegExp(`\\{${key}(\\+\\d+)?\\}`, 'g'), (match, num) => nameDict[key] + (num ? num : '')) ?? node.nodeValue;
					node.nodeValue = node.nodeValue?.replace(new RegExp(`\\{${key}(\\+\\d+)?\\}`, 'g'), (match, num) => {
						console.log(match, num);
						const parsedNum = num ? parseInt((num as string).substring(1)) : null;
						const replacement = (parsedNum && parsedNum !== null && !isNaN(parsedNum) ? (parseInt(nameDict[key]) || nameDict[key]) + parsedNum : nameDict[key] + (num ?? ''));
						return replacement.toString();
					}) ?? node.nodeValue;
				}
			}
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
