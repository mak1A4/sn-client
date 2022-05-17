import { NowSession } from "sn-login";
export interface IXmlImportInput {
    target: string;
    filePath: string;
}
export default function (session: NowSession, input: IXmlImportInput): Promise<number>;
