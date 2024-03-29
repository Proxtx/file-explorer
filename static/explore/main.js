import { manager } from "../lib/apiLoader.js";
import * as _ from "/lib/guiLoader.js";

let path = "/";

let u = new URL(location.href);
if (u.searchParams.get("path"))
  path = decodeURIComponent(u.searchParams.get("path"));

const filesWrap = document.getElementById("filesWrap");
const topBar = document.getElementById("topBar");
const overlay = document.getElementById("overlay");

topBar.setAttribute("subtitle", path);

await window.uiBuilder.ready(overlay);

let highlightedFiles = [];

const refreshFiles = async () => {
  highlightedFiles.length = 0;
  overlay.component.highlightedFilesUpdate(highlightedFiles);

  filesWrap.innerHTML = "";

  if (!path.endsWith("/")) path += "/";

  overlay.component.path = path;

  let files = (
    await manager.listDirectory(cookie.pwd, path, overlay.component.sorting)
  ).directory;
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

  file.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    highlightFile(file);
  });
  return file;
};

const highlightFile = (file) => {
  if (file.component.highlighted) {
    file.component.highlight(false);
    highlightedFiles.splice(highlightedFiles.indexOf(file), 1);
  } else {
    file.component.highlight(true);
    highlightedFiles.push(file);
  }

  overlay.component.highlightedFilesUpdate(highlightedFiles);
};

overlay.component.refresh = () => {
  refreshFiles();
};

const changePath = async (newPath) => {
  path = newPath;
  topBar.setAttribute("subtitle", newPath);
  await refreshFiles();
};

refreshFiles();
