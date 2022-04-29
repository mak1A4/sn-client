import { LoginData } from "sn-login";
import evalScript from "./eval";
import { randomUUID } from "crypto";
import attachmentUpload, { UploadType } from "../attachment/upload";
import attachmentRetrieve from "../attachment/retrieve";
import attachmentDelete from "../attachment/delete";
import * as fs from "fs";

export default async function (login: LoginData, scope: string, rollback: boolean, timeout: boolean): Promise<any> {
  return async function (execFn: Function, inputObject: any = {}): Promise<any> {

    let fakeSysId = randomUUID().replace(/-/g, "")
    let inputAttachmentSysId = await attachmentUpload(
      login, UploadType.JsonString, "temp", fakeSysId, JSON.stringify(inputObject), fakeSysId + ".json");

    let getInputObjFnStr = fs.readFileSync("./asset/getInputObj.js", "utf8");
    let getOutputObjFnStr = fs.readFileSync("./asset/getOutputObj.js", "utf8");

    let execScript =
      `var inputObj = (${getInputObjFnStr})('${inputAttachmentSysId}');
       var result = (${execFn.toString()})(inputObj);
       var outAttachmentSysId = (${getOutputObjFnStr})(result);
       gs.debug("=####" + outAttachmentSysId + "####=")`;

    let evalResult = await evalScript(login, {
      "script": execScript,
      "scope": scope,
      "rollback": rollback,
      "timeout": timeout
    });

    let jsonResultMatch = evalResult.response.match(/=####.*?####=/g);
    if (jsonResultMatch) {
      let resultAttachmentSysId = jsonResultMatch.map((s) => s)[0].replace("####=", "").replace("=####", "");
      let resultObjPath = await attachmentRetrieve(login, resultAttachmentSysId);
      let resultObjStr = fs.readFileSync(resultObjPath, "utf8");
      let resultObj = {};
      try {
        resultObj = JSON.parse(resultObjStr);
      } catch(err) {
        let buff = Buffer.from(resultObjStr, "base64");
        resultObj = JSON.parse(buff.toString("utf8"));
      }
      attachmentDelete(login, inputAttachmentSysId)
      attachmentDelete(login, resultAttachmentSysId)

      return {
        "result": resultObj,
        "rollbackLink": evalResult.rollbackLink
      }
    }
  };
}