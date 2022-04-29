import { LoginData } from "sn-login";
import { XMLParser } from "fast-xml-parser";

export default async function (login: LoginData, tableName: string): Promise<any> {
  let response = await login.wclient.get(`/${tableName}.do?SCHEMA`, {
    "headers": {
      "X-UserToken": login.token,
      "Accept": "application/xml, text/plain, */*",
      "Connection": "keep-alive"
    }
  });
  return new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
  }).parse(response.data);
};