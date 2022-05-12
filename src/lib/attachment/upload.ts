import { LoginData } from "sn-login";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as mime from "mime-types";

export enum UploadType {
  File = "file",
  JsonString = "json_str",
  XmlString = "xml_str",
  PlainText = "plain_text"
}

export default async function (
  login: LoginData, uploadType: UploadType, table: string,
  sysId: string, input: string, fileName?: string
): Promise<string> {
  
  let contentType = "text/plain";
  switch (uploadType) {
    case UploadType.File:
      let fileext = path.extname(input);
      contentType = mime.lookup(fileext) as string;
      break;
    case UploadType.JsonString:
      contentType = "application/json";
      break;
    case UploadType.XmlString:
      contentType = "application/xml";
      break;
  }
  if (!fileName && uploadType == UploadType.File) fileName = path.basename(input);
  else if (!fileName) fileName = Math.random().toString(36).substring(2) + "." + mime.extension(contentType);

  let pathToFile = input;
  if (uploadType != UploadType.File) {
    pathToFile = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(pathToFile, input, "utf8");
  }
  const { size } = fs.statSync(pathToFile);

  let url = `/api/now/attachment/file?table_name=${table}&table_sys_id=${sysId}&file_name=${fileName}`
  let response = await login.wclient.post(url, fs.createReadStream(pathToFile), {
    headers: {
      "X-UserToken": login.token,
      "Content-Type": contentType,
      "Content-Length": size,
      "Accept": "application/json, text/plain, */*",
    },
    "maxBodyLength": Infinity,
    "maxContentLength": Infinity
  });
  return response.data.result.sys_id;
}