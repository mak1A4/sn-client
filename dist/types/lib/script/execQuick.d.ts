import { LoginData } from "sn-login";
import { TexecFn, IExecFnResponse } from "./exec";
export interface IExecFnQuickResponse extends IExecFnResponse {
    "rawOutput": string;
}
export default function (login: LoginData, scope: string, rollback: boolean, timeout: boolean): Promise<TexecFn>;
