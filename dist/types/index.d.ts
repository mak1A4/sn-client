import { LoginData, AuthInfo } from "sn-login";
import { TexecFn } from "./lib/script/exec";
import { GlideAjaxData } from "./lib/glide/ajax";
import { IExportXmlInput } from "./lib/util/exportXml";
import { IXmlImportInput } from "./lib/util/importXml";
import { IXmlHttpOptions } from "./lib/util/xmlHttp";
import { EvalScriptData, EvalScriptResponse } from "./lib/script/eval";
import { IRetrieveRecordOptions, IRetrieveRecordsOptions, IRetrieveRecordsToFileOptions } from "./lib/table-api/get";
import { UploadType } from "./lib/attachment/upload";
export interface IScriptInterface {
    eval(script: EvalScriptData): Promise<EvalScriptResponse>;
    executeFn(scope: string, rollback: boolean, timeout: boolean): Promise<TexecFn>;
    executeFnQuick(scope: string, rollback: boolean, timeout: boolean): Promise<TexecFn>;
}
export interface IGlide {
    glideAjax(data: GlideAjaxData): Promise<string>;
}
export interface ITableApi {
    retrieveRecord(table: string, sysId: string, options?: IRetrieveRecordOptions): Promise<any>;
    retrieveRecords(table: string, options?: IRetrieveRecordsOptions): Promise<any[]>;
    streamRecordsToFile(table: string, options: IRetrieveRecordsToFileOptions): Promise<string>;
}
export interface IUtil {
    clearCache(invalidate?: boolean): Promise<string>;
    getTableSchema(tableName: string): Promise<any>;
    xmlHttpRequest(options: IXmlHttpOptions): Promise<string>;
    xmlExport(xml: IExportXmlInput): Promise<string>;
    xmlImport(xml: IXmlImportInput): Promise<number>;
}
export interface IApplication {
    getCurrentList(): Promise<any>;
    switch(applicationSysId: string): Promise<any>;
}
export interface IAttachment {
    retrieve(attachmentSysId: string): Promise<string>;
    delete(attachmentSysId: string): Promise<number>;
    upload(uploadType: UploadType, table: string, sysId: string, input: string, fileName?: string): Promise<string>;
}
export interface IUpdateSet {
    create(name: string, scope: string): Promise<any>;
    switch(updateSetSysId: string): Promise<any>;
    getCurrentList(): Promise<any>;
    exportToXml(updateSetSysId: string, scope: string): Promise<any>;
    preview(remoteUpdateSetSysId: string, scope: string): Promise<any>;
    validate(remoteUpdateSetSysId: string, scope: string): Promise<any>;
    commit(remoteUpdateSetSysId: string, scope: string): Promise<any>;
}
export interface IRequestFunctions {
    getLoginData(): LoginData;
    util: IUtil;
    glide: IGlide;
    script: IScriptInterface;
    tableApi: ITableApi;
    application: IApplication;
    attachment: IAttachment;
    updateSet: IUpdateSet;
}
export declare function snRequest(snInstanceName: string, userName: string, auth?: AuthInfo): Promise<IRequestFunctions>;
export default snRequest;
