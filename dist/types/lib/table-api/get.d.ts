import { NowSession } from "sn-login";
export interface IRetrieveRecordOptions {
    withDisplayValue?: boolean;
    fields?: string;
}
export interface IRetrieveRecordsOptions extends IRetrieveRecordOptions {
    encodedQuery?: string;
    limit?: number;
    offset?: number;
}
export interface IRetrieveRecordsToFileOptions extends IRetrieveRecordOptions {
    encodedQuery?: string;
    filePath?: string;
    chunkSize?: number;
}
export declare function retrieveRecord(session: NowSession, table: string, sysId: string, options?: IRetrieveRecordOptions): Promise<any>;
export declare function retrieveRecords(session: NowSession, table: string, options?: IRetrieveRecordsOptions): Promise<any[]>;
export declare function streamRecordsToFile(session: NowSession, table: string, options: IRetrieveRecordsToFileOptions): Promise<string>;
