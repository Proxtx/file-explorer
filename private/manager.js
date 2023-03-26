import fs from "fs/promises";
import path from "path";

export const listDirectory = async (folder) => {
  if (folder[folder.length - 1] != "/") folder += "/";
  try {
    return {
      success: true,
      directory: await (
        await fs.readdir(folder, { withFileTypes: true })
      ).map((d) => {
        return {
          name: d.name,
          isFolder: !d.isFile(),
          path: path.resolve(folder + d.name).replaceAll("\\", "/"),
        };
      }),
    };
  } catch {
    return { success: false };
  }
};
