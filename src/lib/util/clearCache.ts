import { LoginData } from "sn-login";
import execQuick from "../script/execQuick";
const h2p = require("html2plaintext");

export default async function (login: LoginData, invalidate?: boolean): Promise<string> {
  let response = await login.wclient.get("/cache.do", {
    "headers": {
      "X-UserToken": login.token,
      "Connection": "keep-alive"
    }
  });
  let bodyStr = response.data as string;
  bodyStr = bodyStr.replaceAll("<br/><hr/>", "<br/>======================================================<br/>");
  bodyStr = h2p(bodyStr);
  bodyStr = bodyStr.substring(bodyStr.indexOf("\n") + 1);

  if (invalidate === true) {
    let execFn = await execQuick(login, "global", false, true);
    await execFn(function() {
      //@ts-ignore
      gs.invalidateCache();
    });
  }
  return bodyStr;
};