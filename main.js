import { listen } from "@proxtx/framework";
import config from "@proxtx/config";
import { setConfig } from "@proxtx/framework/static.js";
import router from "express-fileupload";
import { uploadRequest } from "./private/upload.js";

setConfig({
  ignoreParseHtml: ["/lib/components", "/offline"],
});

let res = await listen(config.port);
res.app.use(router());

res.app.post(uploadRequest);

console.log("Server started. Port:", config.port);
