import { NowSession } from "sn-login";

export interface IExportXmlInput {
    table: string,
    query: string
}

export default async function (session: NowSession, input: IExportXmlInput): Promise<string> {

    let url = `/${input.table}.do?UNL&sysparm_query=${input.query}`;
    let response = await session.httpClient.get(url, {
        headers: {
            "X-UserToken": session.userToken,
            "Connection": "keep-alive",
            "Cache-Control": "max-age=0",
        }
    });
    return response.data;
}