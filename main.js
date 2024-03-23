/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MyPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  mySetting: "default"
};
var MyPlugin = class extends import_obsidian.Plugin {
  async onload() {
    let initLoaded = true;
    await this.loadSettings();
    const ribbonIconEl = this.addRibbonIcon("dice", "Sample Plugin", (evt) => {
      new import_obsidian.Notice("This is a notice!2");
    });
    ribbonIconEl.addClass("my-plugin-ribbon-class");
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("Status Bar Text");
    this.addCommand({
      id: "open-sample-modal-simple",
      name: "Open sample modal (simple)",
      callback: () => {
        new SampleModal(this.app).open();
      }
    });
    this.addCommand({
      id: "sample-editor-command",
      name: "Sample editor command",
      editorCallback: (editor, view) => {
        console.log(editor.getSelection());
        editor.replaceSelection("Sample Editor Command");
      }
    });
    this.addCommand({
      id: "open-sample-modal-complex",
      name: "Open sample modal (complex)",
      checkCallback: (checking) => {
        const markdownView = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
        if (markdownView) {
          if (!checking) {
            new SampleModal(this.app).open();
          }
          return true;
        }
      }
    });
    this.addSettingTab(new SampleSettingTab(this.app, this));
    this.registerDomEvent(document, "click", (evt) => {
      console.log("click", evt);
    });
    this.registerInterval(window.setInterval(() => console.log("setInterval"), 5 * 60 * 1e3));
    const nameDict = {};
    this.registerMarkdownPostProcessor((el, ctx) => {
      var _a, _b, _c;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let node;
      const regex = /\{(\w+)\|(\w+)\}/g;
      while (node = walker.nextNode()) {
        let match;
        while ((match = regex.exec((_a = node.nodeValue) != null ? _a : "")) !== null) {
          const variable = match[1];
          const value = match[2];
          node.nodeValue = (_c = (_b = node.nodeValue) == null ? void 0 : _b.replace(match[0], `${variable}=${value}`)) != null ? _c : node.nodeValue;
          nameDict[variable] = value;
          regex.lastIndex = 0;
        }
      }
      initLoaded = false;
    });
    this.registerMarkdownPostProcessor((el, ctx) => {
      var _a, _b;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let node;
      while (node = walker.nextNode()) {
        for (const key in nameDict) {
          node.nodeValue = (_b = (_a = node.nodeValue) == null ? void 0 : _a.replace(new RegExp(`\\{${key}(\\+\\d+)?\\}`, "g"), (match, num) => {
            console.log(match, num);
            const parsedNum = num ? parseInt(num.substring(1)) : null;
            const replacement = parsedNum && parsedNum !== null && !isNaN(parsedNum) ? (parseInt(nameDict[key]) || nameDict[key]) + parsedNum : nameDict[key] + (num != null ? num : "");
            return replacement.toString();
          })) != null ? _b : node.nodeValue;
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
};
var SampleModal = class extends import_obsidian.Modal {
  constructor(app) {
    super(app);
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.setText("Woah!");
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};
var SampleSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("Setting #1").setDesc("It's a secret").addText((text) => text.setPlaceholder("Enter your secret").setValue(this.plugin.settings.mySetting).onChange(async (value) => {
      this.plugin.settings.mySetting = value;
      await this.plugin.saveSettings();
    }));
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgbWF0Y2ggfSBmcm9tICdhc3NlcnQnO1xyXG5pbXBvcnQgeyBBcHAsIEVkaXRvciwgTWFya2Rvd25Qb3N0UHJvY2Vzc29yLCBNYXJrZG93blZpZXcsIE1vZGFsLCBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcclxuXHJcbi8vIFJlbWVtYmVyIHRvIHJlbmFtZSB0aGVzZSBjbGFzc2VzIGFuZCBpbnRlcmZhY2VzIVxyXG5cclxuaW50ZXJmYWNlIE15UGx1Z2luU2V0dGluZ3Mge1xyXG5cdG15U2V0dGluZzogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBNeVBsdWdpblNldHRpbmdzID0ge1xyXG5cdG15U2V0dGluZzogJ2RlZmF1bHQnXHJcbn1cclxuXHJcbmNvbnN0IEFMTF9FTU9KSVM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcblx0XCI6KzE6XCI6IFwiXHVEODNEXHVEQzREXCIsXHJcblx0XCI6c3VuZ2xhc3NlczpcIjogXCJcdUQ4M0RcdURFMEVcIixcclxuXHRcIjpzbWlsZTpcIjogXCJcdUQ4M0RcdURFMDRcIixcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15UGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcclxuXHRzZXR0aW5nczogTXlQbHVnaW5TZXR0aW5ncztcclxuXHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0bGV0IGluaXRMb2FkZWQgPSB0cnVlO1xyXG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuXHJcblx0XHQvLyBUaGlzIGNyZWF0ZXMgYW4gaWNvbiBpbiB0aGUgbGVmdCByaWJib24uXHJcblx0XHRjb25zdCByaWJib25JY29uRWwgPSB0aGlzLmFkZFJpYmJvbkljb24oJ2RpY2UnLCAnU2FtcGxlIFBsdWdpbicsIChldnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuXHRcdFx0Ly8gQ2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBpY29uLlxyXG5cdFx0XHRuZXcgTm90aWNlKCdUaGlzIGlzIGEgbm90aWNlITInKTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8gUGVyZm9ybSBhZGRpdGlvbmFsIHRoaW5ncyB3aXRoIHRoZSByaWJib25cclxuXHRcdHJpYmJvbkljb25FbC5hZGRDbGFzcygnbXktcGx1Z2luLXJpYmJvbi1jbGFzcycpO1xyXG5cclxuXHRcdC8vIFRoaXMgYWRkcyBhIHN0YXR1cyBiYXIgaXRlbSB0byB0aGUgYm90dG9tIG9mIHRoZSBhcHAuIERvZXMgbm90IHdvcmsgb24gbW9iaWxlIGFwcHMuXHJcblx0XHRjb25zdCBzdGF0dXNCYXJJdGVtRWwgPSB0aGlzLmFkZFN0YXR1c0Jhckl0ZW0oKTtcclxuXHRcdHN0YXR1c0Jhckl0ZW1FbC5zZXRUZXh0KCdTdGF0dXMgQmFyIFRleHQnKTtcclxuXHJcblx0XHQvLyBUaGlzIGFkZHMgYSBzaW1wbGUgY29tbWFuZCB0aGF0IGNhbiBiZSB0cmlnZ2VyZWQgYW55d2hlcmVcclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnb3Blbi1zYW1wbGUtbW9kYWwtc2ltcGxlJyxcclxuXHRcdFx0bmFtZTogJ09wZW4gc2FtcGxlIG1vZGFsIChzaW1wbGUpJyxcclxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHtcclxuXHRcdFx0XHRuZXcgU2FtcGxlTW9kYWwodGhpcy5hcHApLm9wZW4oKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHQvLyBUaGlzIGFkZHMgYW4gZWRpdG9yIGNvbW1hbmQgdGhhdCBjYW4gcGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvbiB0aGUgY3VycmVudCBlZGl0b3IgaW5zdGFuY2VcclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnc2FtcGxlLWVkaXRvci1jb21tYW5kJyxcclxuXHRcdFx0bmFtZTogJ1NhbXBsZSBlZGl0b3IgY29tbWFuZCcsXHJcblx0XHRcdGVkaXRvckNhbGxiYWNrOiAoZWRpdG9yOiBFZGl0b3IsIHZpZXc6IE1hcmtkb3duVmlldykgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVkaXRvci5nZXRTZWxlY3Rpb24oKSk7XHJcblx0XHRcdFx0ZWRpdG9yLnJlcGxhY2VTZWxlY3Rpb24oJ1NhbXBsZSBFZGl0b3IgQ29tbWFuZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdC8vIFRoaXMgYWRkcyBhIGNvbXBsZXggY29tbWFuZCB0aGF0IGNhbiBjaGVjayB3aGV0aGVyIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBhcHAgYWxsb3dzIGV4ZWN1dGlvbiBvZiB0aGUgY29tbWFuZFxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6ICdvcGVuLXNhbXBsZS1tb2RhbC1jb21wbGV4JyxcclxuXHRcdFx0bmFtZTogJ09wZW4gc2FtcGxlIG1vZGFsIChjb21wbGV4KScsXHJcblx0XHRcdGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xyXG5cdFx0XHRcdC8vIENvbmRpdGlvbnMgdG8gY2hlY2tcclxuXHRcdFx0XHRjb25zdCBtYXJrZG93blZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xyXG5cdFx0XHRcdGlmIChtYXJrZG93blZpZXcpIHtcclxuXHRcdFx0XHRcdC8vIElmIGNoZWNraW5nIGlzIHRydWUsIHdlJ3JlIHNpbXBseSBcImNoZWNraW5nXCIgaWYgdGhlIGNvbW1hbmQgY2FuIGJlIHJ1bi5cclxuXHRcdFx0XHRcdC8vIElmIGNoZWNraW5nIGlzIGZhbHNlLCB0aGVuIHdlIHdhbnQgdG8gYWN0dWFsbHkgcGVyZm9ybSB0aGUgb3BlcmF0aW9uLlxyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHRuZXcgU2FtcGxlTW9kYWwodGhpcy5hcHApLm9wZW4oKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBUaGlzIGNvbW1hbmQgd2lsbCBvbmx5IHNob3cgdXAgaW4gQ29tbWFuZCBQYWxldHRlIHdoZW4gdGhlIGNoZWNrIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBUaGlzIGFkZHMgYSBzZXR0aW5ncyB0YWIgc28gdGhlIHVzZXIgY2FuIGNvbmZpZ3VyZSB2YXJpb3VzIGFzcGVjdHMgb2YgdGhlIHBsdWdpblxyXG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTYW1wbGVTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XHJcblxyXG5cdFx0Ly8gSWYgdGhlIHBsdWdpbiBob29rcyB1cCBhbnkgZ2xvYmFsIERPTSBldmVudHMgKG9uIHBhcnRzIG9mIHRoZSBhcHAgdGhhdCBkb2Vzbid0IGJlbG9uZyB0byB0aGlzIHBsdWdpbilcclxuXHRcdC8vIFVzaW5nIHRoaXMgZnVuY3Rpb24gd2lsbCBhdXRvbWF0aWNhbGx5IHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXIgd2hlbiB0aGlzIHBsdWdpbiBpcyBkaXNhYmxlZC5cclxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJywgKGV2dDogTW91c2VFdmVudCkgPT4ge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnY2xpY2snLCBldnQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gV2hlbiByZWdpc3RlcmluZyBpbnRlcnZhbHMsIHRoaXMgZnVuY3Rpb24gd2lsbCBhdXRvbWF0aWNhbGx5IGNsZWFyIHRoZSBpbnRlcnZhbCB3aGVuIHRoZSBwbHVnaW4gaXMgZGlzYWJsZWQuXHJcblx0XHR0aGlzLnJlZ2lzdGVySW50ZXJ2YWwod2luZG93LnNldEludGVydmFsKCgpID0+IGNvbnNvbGUubG9nKCdzZXRJbnRlcnZhbCcpLCA1ICogNjAgKiAxMDAwKSk7XHJcblxyXG5cdFx0Y29uc3QgbmFtZURpY3Q6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuXHRcdHRoaXMucmVnaXN0ZXJNYXJrZG93blBvc3RQcm9jZXNzb3IoKGVsLCBjdHgpID0+IHtcclxuXHRcdFx0Ly8gR2V0IGFsbCB0ZXh0IG5vZGVzIGluIGVsXHJcblx0XHRcdGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoZWwsIE5vZGVGaWx0ZXIuU0hPV19URVhUKTtcclxuXHRcdFx0bGV0IG5vZGU7XHJcblxyXG5cdFx0XHQvLyBDcmVhdGUgYSBkaWN0aW9uYXJ5IHRvIHN0b3JlIHRoZSBtYXBwaW5ncyBmcm9tIFwibmFtZVwiIHRvIHRoZSBhY3R1YWwgbmFtZVxyXG5cdFx0XHRjb25zdCByZWdleCA9IC9cXHsoXFx3KylcXHwoXFx3KylcXH0vZztcclxuXHJcblx0XHRcdC8vIFdhbGsgdGhyb3VnaCBhbGwgdGV4dCBub2Rlc1xyXG5cdFx0XHR3aGlsZSAobm9kZSA9IHdhbGtlci5uZXh0Tm9kZSgpKSB7XHJcblx0XHRcdFx0bGV0IG1hdGNoO1xyXG5cdFx0XHRcdHdoaWxlICgobWF0Y2ggPSByZWdleC5leGVjKG5vZGUubm9kZVZhbHVlID8/ICcnKSkgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdC8vIGlmICghaW5pdExvYWRlZCkge1xyXG5cdFx0XHRcdFx0Ly8gXHQvLyBjb25zb2xlLmxvZyhcInJlZnJlc2hpbmdcIik7XHJcblx0XHRcdFx0XHQvLyBcdC8vIHRoaXMuYXBwLmNvbW1hbmRzLmV4ZWN1dGVDb21tYW5kQnlJZCgnYXBwOm9wZW4tc2V0dGluZ3MnKTtcclxuXHRcdFx0XHRcdC8vIH1cclxuXHRcdFx0XHRcdGNvbnN0IHZhcmlhYmxlID0gbWF0Y2hbMV07XHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IG1hdGNoWzJdO1xyXG5cdFx0XHRcdFx0bm9kZS5ub2RlVmFsdWUgPSBub2RlLm5vZGVWYWx1ZT8ucmVwbGFjZShtYXRjaFswXSwgYCR7dmFyaWFibGV9PSR7dmFsdWV9YCkgPz8gbm9kZS5ub2RlVmFsdWU7XHJcblxyXG5cdFx0XHRcdFx0bmFtZURpY3RbdmFyaWFibGVdID0gdmFsdWU7XHJcblx0XHRcdFx0XHQvLyBSZXNldCB0aGUgcmVnZXggaW5kZXggdG8gc3RhcnQgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmdcclxuXHRcdFx0XHRcdHJlZ2V4Lmxhc3RJbmRleCA9IDA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKG5hbWVEaWN0KTtcclxuXHRcdFx0aW5pdExvYWRlZCA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5yZWdpc3Rlck1hcmtkb3duUG9zdFByb2Nlc3NvcigoZWwsIGN0eCkgPT4ge1xyXG5cdFx0XHQvLyBHZXQgYWxsIHRleHQgbm9kZXMgaW4gZWxcclxuXHRcdFx0Y29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihlbCwgTm9kZUZpbHRlci5TSE9XX1RFWFQpO1xyXG5cdFx0XHRsZXQgbm9kZTtcclxuXHJcblx0XHRcdC8vIFdhbGsgdGhyb3VnaCBhbGwgdGV4dCBub2Rlc1xyXG5cdFx0XHR3aGlsZSAobm9kZSA9IHdhbGtlci5uZXh0Tm9kZSgpKSB7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2cobm9kZS5ub2RlVmFsdWUpO1xyXG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIG5hbWVEaWN0KSB7XHJcblx0XHRcdFx0XHQvLyBub2RlLm5vZGVWYWx1ZSA9IG5vZGUubm9kZVZhbHVlPy5yZXBsYWNlKG5ldyBSZWdFeHAoYFxcXFx7JHtrZXl9XFxcXH1gLCAnZycpLCBuYW1lRGljdFtrZXldKSA/PyBub2RlLm5vZGVWYWx1ZTtcclxuXHRcdFx0XHRcdC8vIG5vZGUubm9kZVZhbHVlID0gbm9kZS5ub2RlVmFsdWU/LnJlcGxhY2UobmV3IFJlZ0V4cChgXFxcXHske2tleX0oXFxcXCtcXFxcZCspP1xcXFx9YCwgJ2cnKSwgKG1hdGNoLCBudW0pID0+IG5hbWVEaWN0W2tleV0gKyAobnVtID8gbnVtIDogJycpKSA/PyBub2RlLm5vZGVWYWx1ZTtcclxuXHRcdFx0XHRcdG5vZGUubm9kZVZhbHVlID0gbm9kZS5ub2RlVmFsdWU/LnJlcGxhY2UobmV3IFJlZ0V4cChgXFxcXHske2tleX0oXFxcXCtcXFxcZCspP1xcXFx9YCwgJ2cnKSwgKG1hdGNoLCBudW0pID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cobWF0Y2gsIG51bSk7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHBhcnNlZE51bSA9IG51bSA/IHBhcnNlSW50KChudW0gYXMgc3RyaW5nKS5zdWJzdHJpbmcoMSkpIDogbnVsbDtcclxuXHRcdFx0XHRcdFx0Y29uc3QgcmVwbGFjZW1lbnQgPSAocGFyc2VkTnVtICYmIHBhcnNlZE51bSAhPT0gbnVsbCAmJiAhaXNOYU4ocGFyc2VkTnVtKSA/IChwYXJzZUludChuYW1lRGljdFtrZXldKSB8fCBuYW1lRGljdFtrZXldKSArIHBhcnNlZE51bSA6IG5hbWVEaWN0W2tleV0gKyAobnVtID8/ICcnKSk7XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXBsYWNlbWVudC50b1N0cmluZygpO1xyXG5cdFx0XHRcdFx0fSkgPz8gbm9kZS5ub2RlVmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG9udW5sb2FkKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNhbXBsZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwKSB7XHJcblx0XHRzdXBlcihhcHApO1xyXG5cdH1cclxuXHJcblx0b25PcGVuKCkge1xyXG5cdFx0Y29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XHJcblx0XHRjb250ZW50RWwuc2V0VGV4dCgnV29haCEnKTtcclxuXHR9XHJcblxyXG5cdG9uQ2xvc2UoKSB7XHJcblx0XHRjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcclxuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgU2FtcGxlU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xyXG5cdHBsdWdpbjogTXlQbHVnaW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE15UGx1Z2luKSB7XHJcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXkoKTogdm9pZCB7XHJcblx0XHRjb25zdCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdTZXR0aW5nICMxJylcclxuXHRcdFx0LnNldERlc2MoJ0l0XFwncyBhIHNlY3JldCcpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignRW50ZXIgeW91ciBzZWNyZXQnKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5teVNldHRpbmcpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MubXlTZXR0aW5nID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblx0fVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQSxzQkFBbUg7QUFRbkgsSUFBTSxtQkFBcUM7QUFBQSxFQUMxQyxXQUFXO0FBQ1o7QUFRQSxJQUFxQixXQUFyQixjQUFzQyx1QkFBTztBQUFBLEVBRzVDLE1BQU0sU0FBUztBQUNkLFFBQUksYUFBYTtBQUNqQixVQUFNLEtBQUssYUFBYTtBQUd4QixVQUFNLGVBQWUsS0FBSyxjQUFjLFFBQVEsaUJBQWlCLENBQUMsUUFBb0I7QUFFckYsVUFBSSx1QkFBTyxvQkFBb0I7QUFBQSxJQUNoQyxDQUFDO0FBRUQsaUJBQWEsU0FBUyx3QkFBd0I7QUFHOUMsVUFBTSxrQkFBa0IsS0FBSyxpQkFBaUI7QUFDOUMsb0JBQWdCLFFBQVEsaUJBQWlCO0FBR3pDLFNBQUssV0FBVztBQUFBLE1BQ2YsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sVUFBVSxNQUFNO0FBQ2YsWUFBSSxZQUFZLEtBQUssR0FBRyxFQUFFLEtBQUs7QUFBQSxNQUNoQztBQUFBLElBQ0QsQ0FBQztBQUVELFNBQUssV0FBVztBQUFBLE1BQ2YsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sZ0JBQWdCLENBQUMsUUFBZ0IsU0FBdUI7QUFDdkQsZ0JBQVEsSUFBSSxPQUFPLGFBQWEsQ0FBQztBQUNqQyxlQUFPLGlCQUFpQix1QkFBdUI7QUFBQSxNQUNoRDtBQUFBLElBQ0QsQ0FBQztBQUVELFNBQUssV0FBVztBQUFBLE1BQ2YsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sZUFBZSxDQUFDLGFBQXNCO0FBRXJDLGNBQU0sZUFBZSxLQUFLLElBQUksVUFBVSxvQkFBb0IsNEJBQVk7QUFDeEUsWUFBSSxjQUFjO0FBR2pCLGNBQUksQ0FBQyxVQUFVO0FBQ2QsZ0JBQUksWUFBWSxLQUFLLEdB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