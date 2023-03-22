import fs from "fs/promises";

export const listDirectory = async (folder) => {
  try {
    return {
      success: true,
      directory: await fs.readdir(folder, { withFileTypes: true }),
    };
  } catch {
    return { success: false };
  }
};
