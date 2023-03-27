import fs from "fs/promises";
import path from "path";

export const listDirectory = async (folder, sorting) => {
  if (folder[folder.length - 1] != "/") folder += "/";
  try {
    let directory = await (
      await fs.readdir(folder, { withFileTypes: true })
    ).map((d) => {
      return {
        name: d.name,
        isFolder: !d.isFile(),
        path: path.resolve(folder + d.name).replaceAll("\\", "/"),
      };
    });

    for (let file of directory)
      try {
        file.date = (await fs.stat(file.path)).mtime.getTime();
      } catch (e) {
        file.date = -Infinity;
      }

    directory.sort((a, b) => {
      if (sorting == "name") return a.name.localeCompare(b.name);
      else if (sorting == "date") return b.date - a.date;
    });

    return {
      success: true,
      directory,
    };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};
