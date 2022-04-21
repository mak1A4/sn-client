import { LoginData } from "sn-login";
export interface IExportXmlInput {
    table: string;
    query: string;
}
export default function (login: LoginData, input: IExportXmlInput): Promise<string>;
