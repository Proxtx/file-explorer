import { auth } from "./meta.js";
import * as manager from "../private/manager.js";
import path from "path";

export const listDirectory = async (pwd, folder, sorting = "name") => {
  let authentication = auth(pwd);
  if (!authentication.success) return authentication;
  return await manager.listDirectory(folder, sorting);
};

export const deleteAction = async (pwd, path) => {
  let authentication = auth(pwd);
  if (!authentication.success) return authentication;
  await manager.deleteAction(path);
};

export const copyAction = async (pwd, original, targetDir) => {
  let authentication = auth(pwd);
  if (!authentication.success) return authentication;
  await manager.copyAction(original, targetDir);
};

export const execute = async (pwd, command, cwd) => {
  let authentication = auth(pwd);
  if (!authentication.success) return authentication;
  await manager.execute(command, cwd);
};

export const rename = async (pwd, originalPath, newName) => {
  let authentication = auth(pwd);
  if (!authentication.success) return authentication;
  let obj = path.parse(originalPath);
  obj.base = newName;
  let newPath = path.format(obj);
  manager.moveAction(originalPath, newPath);
};
