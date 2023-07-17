import * as _ from "/lib/guiLoader.js";
import { manager } from "../lib/apiLoader.js";

const input = document.getElementById("input");
const title = document.getElementById("title");
const save = document.getElementById("save");

await uiBuilder.ready(input);

input.component.wrap.style.width = "100%";
input.component.wrap.style.height = window.innerHeight + "px";

let url = new URL(location.href);
let path = decodeURIComponent(url.searchParams.get("path"));

title.setAttribute("subtitle", path);

let content = await manager.loadFile(cookie.pwd, path);
input.component.value = content;

save.addEventListener("click", () => {
  manager.writeFile(cookie.pwd, path, input.component.value);
  let u = new URL(location.href);
  let folderPath = path.split("/");
  folderPath.pop();
  folderPath = folderPath.join("/");
  u.searchParams.set("path", encodeURIComponent(folderPath));
  u.pathname = "/explore/";
  window.location = u;
});
