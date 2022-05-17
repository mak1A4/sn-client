import { NowSession } from "sn-login";
export interface IUpdateSetExportResult {
    fileName: string;
    exportXml: string;
}
export default function (session: NowSession, updateSetSysId: string, scope: string): Promise<IUpdateSetExportResult>;
