import { LoginData } from "sn-login";
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

export default async function (login: LoginData, data: EvalScriptData): Promise<EvalScriptResponse> {

    let postFormData = new URLSearchParams({
        "script": data.script,
        "sysparm_ck": login.token,
        "sys_scope": "global",
        "runscript": "Run script",
        "quota_managed_transaction": (data.timeout) ? "on" : "off",
        "record_for_rollback": (data.rollback) ? "on" : "off"
    } as any).toString();

    var evalScriptResponse = await login.wclient.post("/sys.scripts.do", postFormData, {
        headers: {
            "X-UserToken": login.token,
            "Connection": "keep-alive",
            "Cache-Control": "max-age=0",
            "User-Agent": "SN-Node Client",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    let res = {} as EvalScriptResponse;
    if (data.rollback) {
        const $ = cheerio.load(evalScriptResponse.data);
        res.rollbackLink = $("a").attr("href") as string;
    }
    res.response = h2p(evalScriptResponse.data);
    res.response = res.response.replace("available here", "");
    res.response = res.response.replace("Script execution history and recovery", "");
    return res;
}