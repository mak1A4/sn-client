/// <reference types="node" />
import { LoginData } from "sn-login";
export default function (login: LoginData, attachmentSysId: string, outPath?: string, encoding?: BufferEncoding): Promise<string>;
