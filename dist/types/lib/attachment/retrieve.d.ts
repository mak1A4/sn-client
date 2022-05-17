/// <reference types="node" />
import { NowSession } from "sn-login";
export default function (session: NowSession, attachmentSysId: string, outPath?: string, encoding?: BufferEncoding): Promise<string>;
