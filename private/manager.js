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
  //return;

  await fs.rm(path, { recursive: true, force: true });
};

export const copyAction = async (file, targetDir) => {
  let targetLocation = path.resolve(targetDir + "/" + path.basename(file));
  console.log("Would have copied", file, "to", targetLocation);
  //return;

  await fs.cp(file, targetLocation, { recursive: true });
};

export const execute = async (command, cwd) => {
  console.log("Would have executed", command, "in", cwd);
  //return;

  exec(command, { cwd });
};

export const moveAction = async (originalPath, newPath) => {
  console.log("Would have moved", originalPath, "to", newPath);
  //return;

  await fs.rename(originalPath, newPath);
};

export const loadFile = async (path) => {
  return await fs.readFile(path, "utf8");
};

export const writeFile = async (path, content) => {
  await fs.writeFile(path, content, "utf8");
};
