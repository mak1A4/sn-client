import { NowSession } from "sn-login";
import { XMLParser } from "fast-xml-parser";

export default async function (session: NowSession, tableName: string): Promise<Array<any>> {
    let response = await session.httpClient.get(`/${tableName}.do?SCHEMA`, {
        "headers": {
            "X-UserToken": session.userToken,
            "Accept": "application/xml, text/plain, */*",
            "Connection": "keep-alive"
        }
    });
    let elementList = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: ""
    }).parse(response.data)[tableName]["element"] as Array<any>;
    return elementList;
};