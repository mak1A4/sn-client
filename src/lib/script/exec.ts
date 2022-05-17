import { NowSession } from "sn-login";
import evalScript from "./eval";
import { randomUUID } from "crypto";
import attachmentUpload, { UploadType } from "../attachment/upload";
import attachmentRetrieve from "../attachment/retrieve";
import attachmentDelete from "../attachment/delete";
import * as fs from "fs";

export interface IExecFnResponse {
  result: any,
  rollbackLink: string
}

declare function snfn(inputObj?: any): any
export type TsnExecFn = typeof snfn;
declare function execute(execFn: Function, input?: any): Promise<any>
export type TexecFn = typeof execute;

export default async function (
  session: NowSession, scope: string, rollback: boolean, timeout: boolean
): Promise<TexecFn> {
  return async function (snExecFn: TsnExecFn, inputObject: any = {}): Promise<IExecFnResponse> {

    let fakeSysId = randomUUID().replace(/-/g, "")
    let inputAttachmentSysId = await attachmentUpload(
      session, UploadType.JsonString, "temp", fakeSysId, JSON.stringify(inputObject), fakeSysId + ".json");

    let getInputObjFnStr = fs.readFileSync("./asset/getInputObj.js", "utf8");
    let getOutputObjFnStr = fs.readFileSync("./asset/getOutputObj.js", "utf8");

    let execScript =
      `var inputObj = (${getInputObjFnStr})('${inputAttachmentSysId}');
       var result = (${snExecFn.toString()})(inputObj);
       var outAttachmentSysId = (${getOutputObjFnStr})(result);
       gs.debug("=####" + outAttachmentSysId + "####=")`;

    let evalResult = await evalScript(session, {
      "script": execScript,
      "scope": scope,
      "rollback": rollback,
      "timeout": timeout
    });

    let jsonResultMatch = evalResult.response.match(/=####.*?####=/g);
    if (jsonResultMatch) {
      let resultAttachmentSysId = jsonResultMatch.map((s) => s)[0].replace("####=", "").replace("=####", "");
      let resultObjPath = await attachmentRetrieve(session, resultAttachmentSysId);
      let resultObjStr = fs.readFileSync(resultObjPath, "utf8");
      let resultObj = {};
      try {
        resultObj = JSON.parse(resultObjStr);
      } catch (err) {
        let buff = Buffer.from(resultObjStr, "base64");
        resultObj = JSON.parse(buff.toString("utf8"));
      }
      attachmentDelete(session, inputAttachmentSysId)
      attachmentDelete(session, resultAttachmentSysId)

      return {
        "result": resultObj,
        "rollbackLink": evalResult.rollbackLink
      };
    }
  };
}