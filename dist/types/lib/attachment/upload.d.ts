import { NowSession } from "sn-login";
export declare enum UploadType {
    File = "file",
    JsonString = "json_str",
    XmlString = "xml_str",
    PlainText = "plain_text"
}
export default function (session: NowSession, uploadType: UploadType, table: string, sysId: string, input: string, fileName?: string): Promise<string>;
