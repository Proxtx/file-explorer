window.guiLoaded = [];

import { loadPack } from "/modules/uibuilder/main.js";

await loadPack("/modules/material/components/pack.json", {
  urlPrefix: "/modules/material/",
  customStyleSheets: ["../../lib/main.css"],
});

await loadPack("/lib/components/pack.json", {
  urlPrefix: "/lib/",
  customStyleSheets: ["../../lib/main.css"],
});

await Promise.all(window.uiBuilder.loadQueue);

document.body.style.opacity = 1;

for (let i of guiLoaded) {
  i();
}

window.guiLoaded = null;
