import { NowSession } from "sn-login";
export interface IExecFnResponse {
    result: any;
    rollbackLink: string;
}
declare function snfn(inputObj?: any): any;
export declare type TsnExecFn = typeof snfn;
declare function execute(execFn: Function, input?: any): Promise<any>;
export declare type TexecFn = typeof execute;
export default function (session: NowSession, scope: string, rollback: boolean, timeout: boolean): Promise<TexecFn>;
export {};
