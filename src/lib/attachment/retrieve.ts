import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as stream from "stream";
import * as util from "util";
import { NowSession } from "sn-login";
import keepAlive from "../util/keepAlive";

export default async function (session: NowSession, attachmentSysId: string, outPath?: string, encoding?: BufferEncoding): Promise<string> {
  if (!outPath) outPath = path.join(os.tmpdir(), Math.random().toString(36).substring(2));
  const writer = fs.createWriteStream(outPath, encoding || "utf8");
  const finished = util.promisify(stream.finished);
  // Attachment API Retrieve doesn't work for larger files, don't know why ...
  // So for now we will use the "normal" attachment download with keep alive requests
  // let url = `/api/now/attachment/${attachmentSysId}/file`;
  let url = `/sys_attachment.do?sys_id=${attachmentSysId}`;

  let keepAliveInterval: NodeJS.Timer;
  let keepAliveTimeout = setTimeout(() => {
    keepAliveInterval = setInterval(() => {
      keepAlive(session);
    }, 1000);
  }, 15000);

  return new Promise<any>((resolve, reject) => {
    session.httpClient.get(url, {
      headers: {
        "Accept": "*/*",
        "Connection": "keep-alive",
        "X-UserToken": session.userToken
      },
      responseType: "stream"
    }).then((response) => {
      response.data.pipe(writer);
      return finished(writer);
    }).then(() => {
      if (keepAliveInterval) clearInterval(keepAliveInterval)
      else clearTimeout(keepAliveTimeout);

      resolve(outPath)
    }).finally(() => {
      if (keepAliveInterval) clearInterval(keepAliveInterval)
      else clearTimeout(keepAliveTimeout);

      reject();
    });
  });
}