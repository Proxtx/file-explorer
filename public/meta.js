import config from "@proxtx/config";

export const auth = (pwd) => {
  if (config.pwd != pwd) return { success: false, error: 1 };
  return { success: true };
};
