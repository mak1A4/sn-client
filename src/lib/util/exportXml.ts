import { LoginData } from "sn-login";

export interface IExportXmlInput {
    table: string,
    query: string
}

export default async function (login: LoginData, input: IExportXmlInput): Promise<string> {

    let url = `/${input.table}.do?UNL&sysparm_query=${input.query}`;
    let response = await login.wclient.get(url, {
        headers: {
            "X-UserToken": login.token,
            "Connection": "keep-alive",
            "Cache-Control": "max-age=0",
        }
    });
    return response.data;
}