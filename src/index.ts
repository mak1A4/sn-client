import * as R from "ramda";
import { createInterface } from "readline";
import snlogin, { LoginData, AuthInfo } from "sn-login";
import execScript from "./lib/script/exec";
import evalScript, { EvalScriptData, EvalScriptResponse } from "./lib/script/eval";
import glideAjax, { GlideAjaxData } from "./lib/glide/ajax";
import xmlExport, { IExportXmlInput } from "./lib/xml/export";
import xmlImport, { IXmlImportInput } from "./lib/xml/import";

export interface IRequestFunctions {
  getLoginData(): LoginData
  execScript(scope: string, rollback: boolean, timeout: boolean): Promise<any>
  evalScript(script: EvalScriptData): Promise<EvalScriptResponse>
  glideAjax(data: GlideAjaxData): Promise<string>
  xmlExport(xml: IExportXmlInput): Promise<string>
  xmlImport(xml: IXmlImportInput): Promise<number>
}

export async function snRequest(snInstanceName: string, userName: string, auth?: AuthInfo): Promise<IRequestFunctions> {

  let login: LoginData;
  try {
    login = await snlogin(snInstanceName, userName, auth);
  } catch (e: any) {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });
    let questionText = "Login failed, try again with new MFA Token: ";
    let mfaToken = await new Promise<string>(resolve => rl.question(questionText, resolve))
      .finally(() => rl.close());
    let authObj = { "mfaToken": mfaToken } as AuthInfo;
    if (auth && auth.password) authObj.password = auth.password;
    login = await snlogin(snInstanceName, userName, authObj);
  }
  if (!login) throw "Login has failed ...";

  let getLoginData = function (): LoginData {
    return login;
  }

  return {
    getLoginData: getLoginData,
    execScript: R.curry(execScript)(login),
    evalScript: R.curry(evalScript)(login),
    glideAjax: R.curry(glideAjax)(login),
    xmlExport: R.curry(xmlExport)(login),
    xmlImport: R.curry(xmlImport)(login)
  };
}
export default snRequest;