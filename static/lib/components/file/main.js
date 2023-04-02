export class Component {
  highlighted = false;

  constructor(options) {
    this.document = options.shadowDom;
    this.img = this.document.getElementById("image");
    this.name = this.document.getElementById("name");
    this.wrap = this.document.getElementById("wrap");
  }

  setContent(content) {
    this.content = content;
    this.name.innerText = content.name;
    if (content.isFolder) this.img.src = "/lib/img/folder.svg";
  }

  highlight(highlight) {
    this.highlighted = highlight;
    if (highlight) this.wrap.classList.add("highlight");
    else this.wrap.classList.remove("highlight");
  }
}
