import { auth } from "../../public/meta.js";

export const server = async (document, options) => {
  if (!(await auth(options.req.cookies.pwd)).success)
    options.res.redirect("/login");
};
