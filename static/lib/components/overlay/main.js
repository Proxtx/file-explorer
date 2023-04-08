import { manager } from "../../apiLoader.js";

export class Component {
  sorting = "name";

  highlightedFiles = [];

  constructor(options) {
    this.document = options.shadowDom;
    this.overlay = this.document.getElementById("overlay");
    this.arrow = this.document.getElementById("arrow");
    this.name = this.document.getElementById("name");
    this.date = this.document.getElementById("date");
    this.copyButton = this.document.getElementById("copy");
    this.pasteButton = this.document.getElementById("paste");
    this.deleteButton = this.document.getElementById("delete");
    this.command = this.document.getElementById("command");
    this.sendCommand = this.document.getElementById("sendCommand");

    this.command.component.input.addEventListener("keyup", () => {
      if (this.command.component.value.length > 0) {
        this.sendCommand.component.component.values.disabled = false;
      } else this.sendCommand.component.component.values.disabled = true;
    });

    this.sendCommand.addEventListener("click", () => {
      if (this.sendCommand.component.component.values.disabled) return;
      manager.execute(cookie.pwd, this.command.component.value, this.path);
    });

    this.copyButton.addEventListener("click", () => {
      this.copy(this.highlightedFiles);
    });

    this.name.addEventListener("click", () => {
      this.sorting = "name";
      this.refresh();
      this.name.setAttribute("type", "contained");
      this.date.setAttribute("type", "text");
    });

    this.date.addEventListener("click", () => {
      this.sorting = "date";
      this.refresh();
      this.date.setAttribute("type", "contained");
      this.name.setAttribute("type", "text");
    });

    this.deleteButton.addEventListener("click", async () => {
      for (let file of this.highlightedFiles) {
        await manager.deleteAction(cookie.pwd, file.component.content.path);
      }

      this.refresh();
    });

    this.pasteButton.addEventListener("click", async () => {
      for (let file of this.filesInClipboard) {
        await manager.copyAction(
          cookie.pwd,
          file.component.content.path,
          this.path
        );
      }

      this.refresh();
    });

    this.overlay.addEventListener("click", (e) => {
      if (
        this.overlay.dataset.focused == "true" &&
        e.composedPath().includes(this.arrow)
      )
        this.overlay.dataset.focused = "false";
      else this.overlay.dataset.focused = "true";
    });

    document.addEventListener("click", (e) => {
      if (!e.composedPath().includes(this.overlay))
        this.overlay.dataset.focused = "false";
    });
  }

  refresh() {}

  highlightedFilesUpdate(highlightedFiles) {
    this.highlightedFiles = highlightedFiles;
    if (this.highlightedFiles.length == 0) {
      this.copyButton.component.funcs.disabled(true);
      this.deleteButton.component.funcs.disabled(true);
    } else {
      this.copyButton.component.funcs.disabled(false);
      this.deleteButton.component.funcs.disabled(false);
    }
  }

  copy(files) {
    this.filesInClipboard = [...files];
    if (this.filesInClipboard.length > 0) {
      this.pasteButton.component.funcs.disabled(false);
    } else this.pasteButton.component.funcs.disabled(true);
  }
}
