import * as R from "ramda";
import snlogin from "sn-login";
import evalScript, { EvalScriptData } from "./eval-script";
import glideAjax, { GlideAjaxData } from "./glide-ajax";
import exportXml, { IExportXmlInput } from "./export-xml";

export interface IRequestFunctions {
    evalScript(script: EvalScriptData): Promise<string>,
    glideAjax(data: GlideAjaxData): Promise<string>
}

export default async function (snInstanceName: string, userName?: string, userPassword?: string) {

    var login = await snlogin(snInstanceName, userName, userPassword);

    return {
        evalScript: R.curry(evalScript)(login),
        glideAjax: R.curry(glideAjax)(login),
        exportXml: R.curry(exportXml)(login)
    };
}