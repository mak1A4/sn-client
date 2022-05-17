import { NowSession } from "sn-login";
import { XMLParser } from "fast-xml-parser";

export default async function (session: NowSession, tableName: string): Promise<any> {
  let response = await session.httpClient.get(`/${tableName}.do?SCHEMA`, {
    "headers": {
      "X-UserToken": session.userToken,
      "Accept": "application/xml, text/plain, */*",
      "Connection": "keep-alive"
    }
  });
  return new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
  }).parse(response.data);
};