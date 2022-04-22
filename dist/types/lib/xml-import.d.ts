import { LoginData } from "sn-login";
export interface IXmlImportInput {
    target: string;
    filePath: string;
}
export default function (login: LoginData, input: IXmlImportInput): Promise<number>;
