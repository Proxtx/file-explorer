export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.title = this.document.getElementById("title");
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "title":
        this.title.innerText = newValue;
        break;
    }
  }
}
