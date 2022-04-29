import { LoginData } from "sn-login";
import xmlHttp, { IXmlHttpOptions } from "../util/xmlHttp";

export interface GlideAjaxData extends IXmlHttpOptions {
    sysparm_name: string,
    sysparm_scope: string
}

export default async function (login: LoginData, data: GlideAjaxData): Promise<string> {
    
    data.sysparm_xyz.set("sysparm_name", data.sysparm_name);
    data.sysparm_xyz.set("sysparm_scope", data.sysparm_scope);

    return await xmlHttp(login, {
      "sysparm_processor": data.sysparm_processor,
      "sysparm_xyz": data.sysparm_xyz
    });
}