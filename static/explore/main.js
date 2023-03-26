import { manager } from "../lib/apiLoader.js";
import * as _ from "/lib/guiLoader.js";

let path = "/";

const filesWrap = document.getElementById("filesWrap");
const topBar = document.getElementById("topBar");

const refreshFiles = async () => {
  filesWrap.innerHTML = "";

  let files = (await manager.listDirectory(cookie.pwd, path)).directory;
  if (!files) files = [];

  let nP = path;
  nP = nP.substring(0, nP.length - 1);
  nP = nP.split("/");
  if (nP.length > 1) {
    nP.pop();
    nP = nP.join("/");
  } else nP = path;

  files.unshift({
    path: nP,
    isFolder: true,
    name: "..",
  });
  for (let file of files) filesWrap.appendChild(await createManagedFile(file));
};

const createManagedFile = async (content) => {
  let file = document.createElement("f-file");
  await uiBuilder.ready(file);
  file.component.setContent(content);
  file.addEventListener("click", () => {
    if (content.isFolder) {
      changePath(content.path);
    }
  });
  return file;
};

const changePath = async (newPath) => {
  path = newPath;
  topBar.setAttribute("subtitle", newPath);
  await refreshFiles();
};

refreshFiles();
