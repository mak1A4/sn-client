import { NowSession } from "sn-login";
export interface IUpdateRecordOptions {
    withDisplayValue?: boolean;
    fields?: string;
}
export default function updateRecord(session: NowSession, table: string, sysId: string, data: any, options?: IUpdateRecordOptions): Promise<any>;
