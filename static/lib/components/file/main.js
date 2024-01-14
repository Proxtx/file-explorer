export class Component {
  highlighted = false;

  constructor(options) {
    this.document = options.shadowDom;
    this.img = this.document.getElementById("image");
    this.name = this.document.getElementById("name");
    this.wrap = this.document.getElementById("wrap");
    this.wrap.addEventListener("click", () => {
      if (!this.content.isFolder) {
        let r = new URL(window.location.href);
        r.pathname = "/edit/";
        r.searchParams.set("path", encodeURIComponent(this.content.path));
        window.location.href = r.href;
      }
    });
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
