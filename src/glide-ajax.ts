import { LoginData } from "sn-login";
import { XMLParser } from "fast-xml-parser";

export interface GlideAjaxData {
    sysparm_processor: string,
    sysparm_name: string,
    sysparm_scope: string,
    sysparm_xyz: Map<string, string>
}

export default async function (login: LoginData, data: GlideAjaxData): Promise<string> {
    
    let postBodyObj = {
        "sysparm_processor": data.sysparm_processor,
        "sysparm_name": data.sysparm_name,
        "sysparm_scope": data.sysparm_scope
    } as any;
    for (let [key, value] of data.sysparm_xyz) {
        postBodyObj[key] = value;
    }
    let postFormData = new URLSearchParams(postBodyObj).toString();

    let response = await login.wclient.post("/xmlhttp.do", postFormData, {
        "headers": {
            "X-UserToken": login.token
        }
    });
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "_",
        allowBooleanAttributes: true
    });
    let xmlResponse = response.data;
    var jsonResponse = parser.parse(xmlResponse);
    return jsonResponse.xml._answer
}