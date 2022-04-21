import { LoginData } from "sn-login";
export interface GlideAjaxData {
    sysparm_processor: string;
    sysparm_name: string;
    sysparm_scope: string;
    sysparm_xyz: Map<string, string>;
}
export default function (login: LoginData, data: GlideAjaxData): Promise<string>;
