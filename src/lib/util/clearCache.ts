import { NowSession } from "sn-login";
import execQuick from "../script/execQuick";
import { convert } from "html-to-text";
//const h2p = require("html2plaintext");

export default async function clearCache(session: NowSession, invalidate?: boolean): Promise<string> {
    let response = await session.httpClient.get("/cache.do", {
        "headers": {
            "X-UserToken": session.userToken,
            "Connection": "keep-alive"
        }
    });
    let bodyStr = response.data as string;
    bodyStr = bodyStr.replaceAll("<br/><hr/>", "<br/>======================================================<br/>");
    bodyStr = convert(bodyStr, {
        "preserveNewlines": true
    });
    bodyStr = bodyStr.substring(bodyStr.indexOf("\n") + 1);

    if (invalidate === true) {
        let execFn = await execQuick(session, "global", false, true);
        await execFn(function () {
            //@ts-ignore
            gs.invalidateCache();
        });
    }
    return bodyStr;
};