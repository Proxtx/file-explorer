import { auth } from "./meta.js";
import * as manager from "../private/manager.js";

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

export const command = async (pwd, command, cwd) => {
  let authentication = auth(pwd);
  if (!authentication.success) return authentication;
  await manager.execute(command, cwd);
};
