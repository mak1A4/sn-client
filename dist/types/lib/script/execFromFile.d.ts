import { NowSession } from "sn-login";
export interface IExecFnResponse {
    result: any;
    rollbackLink: string;
}
export default function (session: NowSession, scope: string, rollback: boolean, timeout: boolean, fnFilePath: string, inputObject: any): Promise<IExecFnResponse>;
