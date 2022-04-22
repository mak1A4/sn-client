import { AuthInfo } from "sn-login";
import { EvalScriptData, EvalScriptResponse } from "./lib/script-eval";
import { GlideAjaxData } from "./lib/glide-ajax";
import { IExportXmlInput } from "./lib/xml-export";
import { IXmlImportInput } from "./lib/xml-import";
export interface IRequestFunctions {
    execScript(scope: string, rollback: boolean, timeout: boolean): Promise<any>;
    evalScript(script: EvalScriptData): Promise<EvalScriptResponse>;
    glideAjax(data: GlideAjaxData): Promise<string>;
    xmlExport(xml: IExportXmlInput): Promise<string>;
    xmlImport(xml: IXmlImportInput): Promise<number>;
}
declare function snRequest(snInstanceName: string, userName: string, auth?: AuthInfo): Promise<IRequestFunctions>;
export default snRequest;
