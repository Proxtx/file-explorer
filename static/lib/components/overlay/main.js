export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.overlay = this.document.getElementById("overlay");
    this.arrow = this.document.getElementById("arrow");

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
}
