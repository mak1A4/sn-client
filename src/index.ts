import * as R from "ramda";
import { createInterface } from "readline";
import snlogin, { LoginData, AuthInfo } from "sn-login";
import execScript, { TexecFn } from "./lib/script/exec";
import execQuick from "./lib/script/execQuick";
import glideAjax, { GlideAjaxData } from "./lib/glide/ajax";
import xmlExport, { IExportXmlInput } from "./lib/util/xml-export";
import xmlImport, { IXmlImportInput } from "./lib/util/xml-import";
import xmlHttp, { IXmlHttpOptions } from "./lib/util/xmlHttp";
import getTableSchema from "./lib/util/tableSchema";
import clearCache from "./lib/util/clearCache";
import evalScript, {
  EvalScriptData,
  EvalScriptResponse
} from "./lib/script/eval";
import { 
  IRetrieveRecordOptions,
  IRetrieveRecordsOptions,
  IRetrieveRecordsToFileOptions,
  retrieveRecord,
  retrieveRecords,
  streamRecordsToFile
} from "./lib/table-api/get"

export interface IScriptInterface {
  eval(script: EvalScriptData): Promise<EvalScriptResponse>
  executeFn(scope: string, rollback: boolean, timeout: boolean): Promise<TexecFn>
  executeFnQuick(scope: string, rollback: boolean, timeout: boolean): Promise<TexecFn>
}

export interface IGlide {
  glideAjax(data: GlideAjaxData): Promise<string>
}

export interface ITableApi {
  retrieveRecord(table: string, sysId: string, options?: IRetrieveRecordOptions): Promise<any>
  retrieveRecords(table: string, options?: IRetrieveRecordsOptions): Promise<any[]>
  streamRecordsToFile(table: string, options: IRetrieveRecordsToFileOptions): Promise<string>
}

export interface IUtil {
  clearCache(invalidate?: boolean): Promise<string>
  getTableSchema(tableName: string): Promise<any>
  xmlHttpRequest(options: IXmlHttpOptions): Promise<string>
  xmlExport(xml: IExportXmlInput): Promise<string>
  xmlImport(xml: IXmlImportInput): Promise<number>
}

export interface IRequestFunctions {
  getLoginData(): LoginData
  util: IUtil
  glide: IGlide
  script: IScriptInterface
  tableApi: ITableApi
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
    "getLoginData": getLoginData,
    "script": {
      "eval": R.curry(evalScript)(login),
      "executeFn": R.curry(execScript)(login),
      "executeFnQuick": R.curry(execQuick)(login)
    },
    "glide": {
      "glideAjax": R.curry(glideAjax)(login)
    },
    "tableApi": {
      "retrieveRecord": async function(
        table: string, sysId: string, options?: IRetrieveRecordOptions
      ): Promise<any> {
        return retrieveRecord(login, table, sysId, options);
      },      
      "retrieveRecords": async function(
        table: string, options?: IRetrieveRecordsOptions
      ): Promise<any[]> {
        return retrieveRecords(login, table, options);
      },
      "streamRecordsToFile": R.curry(streamRecordsToFile)(login)
    },
    "util": {
      "xmlImport": R.curry(xmlImport)(login),
      "xmlExport": R.curry(xmlExport)(login),
      "xmlHttpRequest": R.curry(xmlHttp)(login),
      "getTableSchema": R.curry(getTableSchema)(login),
      "clearCache": async function(invalidate?: boolean): Promise<string> {
        return clearCache(login, invalidate);
      }
    }
  };
}
export default snRequest;