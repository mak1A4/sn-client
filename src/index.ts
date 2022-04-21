import * as R from "ramda";
import snlogin from "sn-login";
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

async function snRequest(snInstanceName: string, userName: string): Promise<IRequestFunctions>;
async function snRequest(snInstanceName: string, userName: string, userPassword?: string): Promise<IRequestFunctions>;
async function snRequest(snInstanceName: string, userName: string, userPassword?: string): Promise<IRequestFunctions> {

    let login = null;
    if (userPassword) login = await snlogin(snInstanceName, userName, userPassword);
    else login = await snlogin(snInstanceName, userName);

    return {
        execScript: R.curry(execScript)(login),
        evalScript: R.curry(evalScript)(login),
        glideAjax: R.curry(glideAjax)(login),
        xmlExport: R.curry(xmlExport)(login),
        xmlImport: R.curry(xmlImport)(login)
    };
}
export default snRequest;