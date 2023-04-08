import { auth } from "../public/meta.js";

export const uploadRequest = async (req, res) => {
  if (!auth(req.cookies.pwd)) return res.status(500).send();
  req.files.file.mv(req.query.path + "/" + req.files.file.name);
  res.status(200).send();
};
