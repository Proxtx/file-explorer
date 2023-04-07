import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";

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

export const deleteAction = async (path) => {
  console.log("Would have deleted", path);
  return;

  await fs.rm(path, { recursive: true, force: true });
};

export const copyAction = async (file, targetDir) => {
  console.log("Would have copied", file, "to", targetDir);
  return;

  await fs.cp(file, targetDir, { recursive: true });
};

export const execute = async (command, cwd) => {
  console.log("Would have executed", command, "in", cwd);
  return;

  exec(command, { cwd });
};
