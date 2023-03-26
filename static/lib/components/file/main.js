export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.img = this.document.getElementById("image");
    this.name = this.document.getElementById("name");
  }

  setContent(content) {
    this.content = content;
    this.name.innerText = content.name;
    if (content.isFolder) this.img.src = "/lib/img/folder.svg";
  }
}
