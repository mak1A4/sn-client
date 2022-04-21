import { LoginData } from "sn-login";
export interface EvalScriptData {
    script: string;
    scope: string;
    rollback: boolean;
}
export default function (login: LoginData, script: EvalScriptData): Promise<string>;
