import { LoginData } from "sn-login";
import evalScript from "./script-eval";

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
        var jsonResultMatch = evalResult.response.match(/=####.*?####=/g);
        if (jsonResultMatch) {
            var jsonResultStr = jsonResultMatch.map((s) => s)[0].replace("####=", "").replace("=####", "");
            return {
                "result": JSON.parse(jsonResultStr),
                "rollbackLink": evalResult.rollbackLink
            }
        }
    };
}