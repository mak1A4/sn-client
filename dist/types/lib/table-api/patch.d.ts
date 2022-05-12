import { LoginData } from "sn-login";
export interface IUpdateRecordOptions {
    withDisplayValue?: boolean;
    fields?: string;
}
export default function updateRecord(login: LoginData, table: string, data: any, options?: IUpdateRecordOptions): Promise<any>;
