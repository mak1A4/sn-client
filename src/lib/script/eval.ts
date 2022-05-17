import { NowSession } from "sn-login";
import keepAlive from "../util/keepAlive";
import * as cheerio from "cheerio";
const h2p = require("html2plaintext");

export interface EvalScriptData {
  script: string,
  scope: string,
  rollback: boolean,
  timeout: boolean
}

export interface EvalScriptResponse {
  response: string,
  rollbackLink: string
}

export default async function (session: NowSession, data: EvalScriptData): Promise<EvalScriptResponse> {

  let postFormData = new URLSearchParams({
    "script": data.script,
    "sysparm_ck": session.userToken,
    "sys_scope": data.scope,
    "runscript": "Run script",
    "quota_managed_transaction": (data.timeout) ? "on" : "off",
    "record_for_rollback": (data.rollback) ? "on" : "off"
  } as any).toString();

  let keepAliveInterval: NodeJS.Timer;
  let keepAliveTimeout = setTimeout(() => {
    keepAliveInterval = setInterval(() => {
      keepAlive(session);
    }, 1000);
  }, 15000);

  return new Promise<EvalScriptResponse>((resolve, reject) => {
    session.httpClient.post("/sys.scripts.do", postFormData, {
      headers: {
        "X-UserToken": session.userToken,
        "Connection": "keep-alive",
        "Cache-Control": "max-age=0",
        "User-Agent": "SN-Node Client",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      if (keepAliveInterval) clearInterval(keepAliveInterval);
      else clearTimeout(keepAliveTimeout);

      let res = {} as EvalScriptResponse;
      if (data.rollback) {
        const $ = cheerio.load(response.data);
        res.rollbackLink = $("a").attr("href") as string;
      }
      res.response = h2p(response.data);
      res.response = res.response.replace("and recovery", "");
      res.response = res.response.replace("available here", "");
      res.response = res.response.replace("scriptScript execution history", "");
      res.response = res.response.replace("Script execution history and recovery", "");
      resolve(res);
    });
  });
}