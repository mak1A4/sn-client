import { NowSession } from "sn-login";
export interface ICreateRecordOptions {
    withDisplayValue?: boolean;
    fields?: string;
}
export default function createRecord(session: NowSession, table: string, data: any, options?: ICreateRecordOptions): Promise<any>;
