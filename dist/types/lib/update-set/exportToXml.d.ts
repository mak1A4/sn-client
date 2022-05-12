import { LoginData } from "sn-login";
export interface IUpdateSetExportResult {
    fileName: string;
    exportXml: string;
}
export default function (login: LoginData, updateSetSysId: string, scope: string): Promise<IUpdateSetExportResult>;
