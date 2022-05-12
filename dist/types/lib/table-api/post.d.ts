import { LoginData } from "sn-login";
export interface ICreateRecordOptions {
    withDisplayValue?: boolean;
    fields?: string;
}
export default function createRecord(login: LoginData, table: string, data: any, options?: ICreateRecordOptions): Promise<any>;
