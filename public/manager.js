import { auth } from "./meta.js";
import * as manager from "../private/manager.js";

export const listDirectory = async (pwd, folder, sorting = "name") => {
  let authentication = auth(pwd);
  if (!authentication.success) return authentication;
  return await manager.listDirectory(folder, sorting);
};
