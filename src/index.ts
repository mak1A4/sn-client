import * as R from "ramda";
import snlogin, { AuthInfo } from "sn-login";
import execScript from "./lib/script-exec";
import evalScript, { EvalScriptData, EvalScriptResponse } from "./lib/script-eval";
import glideAjax, { GlideAjaxData } from "./lib/glide-ajax";
import xmlExport, { IExportXmlInput } from "./lib/xml-export";
import xmlImport, { IXmlImportInput } from "./lib/xml-import";

export interface IRequestFunctions {
    execScript(scope: string, rollback: boolean, timeout: boolean): Promise<any>
    evalScript(script: EvalScriptData): Promise<EvalScriptResponse>
    glideAjax(data: GlideAjaxData): Promise<string>
    xmlExport(xml: IExportXmlInput): Promise<string>
    xmlImport(xml: IXmlImportInput): Promise<number>
}

export async function snRequest(snInstanceName: string, userName: string, auth?: AuthInfo): Promise<IRequestFunctions> {

    let login = await snlogin(snInstanceName, userName, auth);

    return {
        execScript: R.curry(execScript)(login),
        evalScript: R.curry(evalScript)(login),
        glideAjax: R.curry(glideAjax)(login),
        xmlExport: R.curry(xmlExport)(login),
        xmlImport: R.curry(xmlImport)(login)
    };
}
export default snRequest;