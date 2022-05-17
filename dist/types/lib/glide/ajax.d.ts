import { NowSession } from "sn-login";
import { IXmlHttpOptions } from "../util/xmlHttp";
export interface GlideAjaxData extends IXmlHttpOptions {
    sysparm_name: string;
    sysparm_scope: string;
}
export default function (session: NowSession, data: GlideAjaxData): Promise<string>;
