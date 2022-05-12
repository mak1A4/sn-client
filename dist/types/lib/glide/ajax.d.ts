import { LoginData } from "sn-login";
import { IXmlHttpOptions } from "../util/xmlHttp";
export interface GlideAjaxData extends IXmlHttpOptions {
    sysparm_name: string;
    sysparm_scope: string;
}
export default function (login: LoginData, data: GlideAjaxData): Promise<string>;
