import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as stream from 'stream';
import { promisify } from 'util';
import { NowSession } from "sn-login";

export interface IExportXmlInput {
    table: string,
    query?: string,
    outputFile?: string
}

/*export default async function (session: NowSession, input: IExportXmlInput): Promise<string> {

    let url = `/${input.table}.do?UNL`;
    if (input.query) url += `&sysparm_query=${input.query}`;
    let response = await session.httpClient.get(url, {
        headers: {
            "X-UserToken": session.userToken,
            "Connection": "keep-alive",
            "Cache-Control": "max-age=0",
        }
    });
    if (input.filePath) {
        fs.writeFileSync(input.filePath, response.data, "utf8");
    }
    return response.data;
}*/

export default async function (session: NowSession, input: IExportXmlInput): Promise<string> {

    let outputFile = input.outputFile;
    if (!outputFile) {
        let randomStr = Math.random().toString(36).substring(2);
        outputFile = path.join(os.tmpdir(), `${input.table}_${randomStr}.xml`);
    }

    const finished = promisify(stream.finished);
    const writer = fs.createWriteStream(outputFile);

    let url = `/${input.table}.do?UNL`;
    if (input.query) url += `&sysparm_query=${input.query}`;
    let response = await session.httpClient.get(url, {
        responseType: "stream",
        headers: {
            "X-UserToken": session.userToken,
            "Connection": "keep-alive",
            "Cache-Control": "max-age=0",
        }
    });
    response.data.pipe(writer);
    await finished(writer);
    return outputFile;
}