import { auth } from "../../public/meta.js";

export const server = async (document, options) => {
  if ((await auth(options.req.cookies.pwd)).success)
    return options.res.redirect("/explore");
  options.res.redirect("/login");
};
