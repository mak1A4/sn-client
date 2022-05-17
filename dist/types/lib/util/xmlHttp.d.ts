import { NowSession } from "sn-login";
export interface IXmlHttpOptions {
    sysparm_processor: string;
    sysparm_xyz: Map<string, string>;
}
export default function (session: NowSession, options: IXmlHttpOptions): Promise<string>;
