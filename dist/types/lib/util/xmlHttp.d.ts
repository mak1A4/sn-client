import { LoginData } from "sn-login";
export interface IXmlHttpOptions {
    sysparm_processor: string;
    sysparm_xyz: Map<string, string>;
}
export default function (login: LoginData, options: IXmlHttpOptions): Promise<string>;
