import { LoginData } from "sn-login";
import evalScript from "./eval";

export default async function (login: LoginData, scope: string, rollback: boolean, timeout: boolean): Promise<any> {
  return async function (execFn: Function, inputObject: any = {}): Promise<any> {
    let execScript =
      `var inputObj = JSON.parse('${JSON.stringify(inputObject)}');
       var result = (${execFn.toString()})(inputObj);
       if (!result) result = {};
       gs.debug("=####" + JSON.stringify(result) + "####=")`;

    let evalResult = await evalScript(login, {
      "script": execScript,
      "scope": scope,
      "rollback": rollback,
      "timeout": timeout
    });
    let jsonResultMatch = evalResult.response.match(/=####.*?####=/g);
    if (jsonResultMatch) {
      let resultMatchStr = jsonResultMatch.map((s: any) => s)[0];
      let jsonResultStr = resultMatchStr.replace("####=", "").replace("=####", "");
      let resultObj = {};
      try { resultObj = JSON.parse(jsonResultStr) } catch (err) { }
      let responseStr = evalResult.response.replace("*** Script: [DEBUG] " + resultMatchStr, "")

      return {
        "result": resultObj,
        "response": responseStr,
        "rollbackLink": evalResult.rollbackLink
      }
    }
  };
}