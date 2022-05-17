import { NowSession } from "sn-login";
export interface EvalScriptData {
    script: string;
    scope: string;
    rollback: boolean;
    timeout: boolean;
}
export interface EvalScriptResponse {
    response: string;
    rollbackLink: string;
}
export default function (session: NowSession, data: EvalScriptData): Promise<EvalScriptResponse>;
