export class Component {
  sorting = "name";

  constructor(options) {
    this.document = options.shadowDom;
    this.overlay = this.document.getElementById("overlay");
    this.arrow = this.document.getElementById("arrow");
    this.name = this.document.getElementById("name");
    this.date = this.document.getElementById("date");

    this.name.addEventListener("click", () => {
      this.sorting = "name";
      this.sortChange();
      this.name.setAttribute("type", "contained");
      this.date.setAttribute("type", "text");
    });

    this.date.addEventListener("click", () => {
      this.sorting = "date";
      this.sortChange();
      this.date.setAttribute("type", "contained");
      this.name.setAttribute("type", "text");
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

  sortChange() {}
}
