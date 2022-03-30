import { LoginData } from "sn-login";
const h2p = require("html2plaintext");

export interface EvalScriptData {
    script: string,
    scope: string,
    rollback: boolean
}

export default async function (login: LoginData, script: EvalScriptData): Promise<string> {

    let postFormData = new URLSearchParams({
        "script": script.script,
        "sysparm_ck": login.token,
        "sys_scope": "global",
        "runscript": "Run script",
        "quota_managed_transaction": "on",
        "record_for_rollback": (script.rollback) ? "on" : "off"
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
    return h2p(evalScriptResponse.data);
}