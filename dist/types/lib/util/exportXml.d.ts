import { NowSession } from "sn-login";
export interface IExportXmlInput {
    table: string;
    query?: string;
    outputFile?: string;
}
export default function (session: NowSession, input: IExportXmlInput): Promise<string>;
