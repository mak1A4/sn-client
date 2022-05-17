import * as R from "ramda";
import snlogin, { NowSession } from "sn-login";
import execScript, { TexecFn } from "./lib/script/exec";
import execQuick from "./lib/script/execQuick";
import glideAjax, { GlideAjaxData } from "./lib/glide/ajax";
import xmlExport, { IExportXmlInput } from "./lib/util/exportXml";
import xmlImport, { IXmlImportInput } from "./lib/util/importXml";
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
import createRecord, { ICreateRecordOptions } from "./lib/table-api/post";
import updateRecord, { IUpdateRecordOptions } from "./lib/table-api/patch";
import deleteRecord from "./lib/table-api/delete";
import { UploadType } from "./lib/attachment/upload";
import getCurrentAppList from "./lib/application/getCurrentList";
import switchApp from "./lib/application/switch";
import retrieveAttachment from "./lib/attachment/retrieve";
import deleteAttachment from "./lib/attachment/delete";
import uploadAttachment from "./lib/attachment/upload";
import createUpdateSet from "./lib/update-set/create";
import commitUpdateSet from "./lib/update-set/commit";
import exportUpdateSetToXml from "./lib/update-set/exportToXml";
import previewUpdateSet from "./lib/update-set/preview";
import validateUpdateSet from "./lib/update-set/validate";
import switchUpdateSet from "./lib/update-set/switch";
import getCurrentUpdateSetList from "./lib/update-set/getCurrentList";

export interface IScriptInterface {
    eval(script: EvalScriptData): Promise<EvalScriptResponse>
    executeFn(scope: string, rollback: boolean, timeout: boolean): Promise<TexecFn>
    executeFnQuick(scope: string, rollback: boolean, timeout: boolean): Promise<TexecFn>
}

export interface IGlide {
    glideAjax(data: GlideAjaxData): Promise<string>
}

export interface ITableApi {
    createRecord(table: string, dataObj: any, options?: ICreateRecordOptions): Promise<any>
    updateRecord(table: string, sysId: string, dataObj: any, options?: IUpdateRecordOptions): Promise<any>
    retrieveRecord(table: string, sysId: string, options?: IRetrieveRecordOptions): Promise<any>
    retrieveRecords(table: string, options?: IRetrieveRecordsOptions): Promise<any[]>
    streamRecordsToFile(table: string, options: IRetrieveRecordsToFileOptions): Promise<string>
    deleteRecord(table: string, sysId: string): Promise<number>
}

export interface IUtil {
    clearCache(invalidate?: boolean): Promise<string>
    getTableSchema(tableName: string): Promise<any>
    xmlHttpRequest(options: IXmlHttpOptions): Promise<string>
    xmlExport(xml: IExportXmlInput): Promise<string>
    xmlImport(xml: IXmlImportInput): Promise<number>
}

export interface IApplication {
    getCurrentList(): Promise<any>
    switch(applicationSysId: string): Promise<any>
}

export interface IAttachment {
    retrieve(attachmentSysId: string): Promise<string>
    delete(attachmentSysId: string): Promise<number>
    upload(
        uploadType: UploadType, table: string, sysId: string,
        input: string, fileName?: string
    ): Promise<string>
}

export interface IUpdateSet {
    create(name: string, scope: string): Promise<any>
    switch(updateSetSysId: string): Promise<any>
    getCurrentList(): Promise<any>
    exportToXml(updateSetSysId: string, scope: string): Promise<any>
    preview(remoteUpdateSetSysId: string, scope: string): Promise<any>
    validate(remoteUpdateSetSysId: string, scope: string): Promise<any>
    commit(remoteUpdateSetSysId: string, scope: string): Promise<any>
}

export interface IRequestFunctions {
    getNowSession(): NowSession
    util: IUtil
    glide: IGlide
    script: IScriptInterface
    tableApi: ITableApi
    application: IApplication
    attachment: IAttachment
    updateSet: IUpdateSet
}

export async function snRequest(snInstanceName: string, userName: string, password?: string): Promise<IRequestFunctions> {

    let nowSession = await snlogin(snInstanceName, userName, password);
    let getNowSession = function (): NowSession {
        return nowSession;
    }

    return {
        "getNowSession": getNowSession,
        "script": {
            "eval": R.curry(evalScript)(nowSession),
            "executeFn": R.curry(execScript)(nowSession),
            "executeFnQuick": R.curry(execQuick)(nowSession)
        },
        "application": {
            "getCurrentList": async function (): Promise<any> {
                return getCurrentAppList(nowSession);
            },
            "switch": async function (applicationSysId: string): Promise<any> {
                return switchApp(nowSession, applicationSysId);
            }
        },
        "attachment": {
            "retrieve": R.curry(retrieveAttachment)(nowSession),
            "delete": R.curry(deleteAttachment)(nowSession),
            "upload": async (uploadType: UploadType, table: string, sysId: string,
                input: string, fileName?: string): Promise<string> => {
                return uploadAttachment(nowSession, uploadType, table, sysId, input, fileName);
            }
        },
        "glide": {
            "glideAjax": R.curry(glideAjax)(nowSession)
        },
        "tableApi": {
            "createRecord": async function (
                table: string, dataObj: any, options?: ICreateRecordOptions
            ): Promise<any> {
                return createRecord(nowSession, table, dataObj, options);
            },
            "updateRecord": async function (
                table: string, sysId: string, dataObj: any, options?: IUpdateRecordOptions
            ): Promise<any> {
                return updateRecord(nowSession, table, sysId, dataObj, options);
            },
            "retrieveRecord": async function (
                table: string, sysId: string, options?: IRetrieveRecordOptions
            ): Promise<any> {
                return retrieveRecord(nowSession, table, sysId, options);
            },
            "retrieveRecords": async function (
                table: string, options?: IRetrieveRecordsOptions
            ): Promise<any[]> {
                return retrieveRecords(nowSession, table, options);
            },
            "streamRecordsToFile": R.curry(streamRecordsToFile)(nowSession),
            "deleteRecord": R.curry(deleteRecord)(nowSession)
        },
        "util": {
            "xmlImport": R.curry(xmlImport)(nowSession),
            "xmlExport": R.curry(xmlExport)(nowSession),
            "xmlHttpRequest": R.curry(xmlHttp)(nowSession),
            "getTableSchema": R.curry(getTableSchema)(nowSession),
            "clearCache": async function (invalidate?: boolean): Promise<string> {
                return clearCache(nowSession, invalidate);
            }
        },
        "updateSet": {
            "create": R.curry(createUpdateSet)(nowSession),
            "getCurrentList": async function () {
                return getCurrentUpdateSetList(nowSession);
            },
            "exportToXml": R.curry(exportUpdateSetToXml)(nowSession),
            "preview": R.curry(previewUpdateSet)(nowSession),
            "switch": R.curry(switchUpdateSet)(nowSession),
            "validate": R.curry(validateUpdateSet)(nowSession),
            "commit": R.curry(commitUpdateSet)(nowSession)
        }
    };
}
export default snRequest;