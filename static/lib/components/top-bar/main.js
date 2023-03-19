export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.title = this.document.getElementById("title");
    this.subtitle = this.document.getElementById("subheading");
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "title":
        this.title.innerText = newValue;
        break;
      case "subtitle":
        this.subtitle.innerText = newValue;
        break;
    }
  }
}
