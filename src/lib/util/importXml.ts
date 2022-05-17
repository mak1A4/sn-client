import { NowSession } from "sn-login";
import * as fs from "fs";
import * as path from "path";
import request from "request";

export interface IXmlImportInput {
    target: string,
    filePath: string
}

export default async function (session: NowSession, input: IXmlImportInput): Promise<number> {

    let defaultHeader = {
        "Accept": "*/*",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "User-Agent": "Mozilla/sncmder",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    };

    let baseURL = session.httpClient.defaults.baseURL as string;
    let xjar = request.jar();
    let sessionJar = session.getCookieJar();
    if (sessionJar) {
        sessionJar.getCookiesSync(baseURL).forEach((c) => {
            xjar.setCookie(c.cookieString(), baseURL);
        });
    }

    let filename = path.basename(input.filePath);
    return new Promise<number>((resolve, reject) => {
        request(session.httpClient.defaults.baseURL + "/sys_upload.do", {
            "method": "POST",
            "headers": defaultHeader, 
            "followAllRedirects": true,
            "gzip": true,
            "jar": xjar,
            "formData": {
                "sysparm_ck": session.userToken,
                "sysparm_target": input.target,
                "file": {
                    "value": fs.createReadStream(input.filePath),
                    "options": {
                        "filename": filename,
                        "contentType": "application/xml"
                    }
                }
            }
        }, (error: any, response: any) => {
            if (error) reject(error);
            else resolve(response.statusCode);
        });
    });

    //Unfortunately I can't get sys_upload.do to work with axios ...
    //It seems there are issues with MultipartFormData,
    //so we have to use the request library for now.

    //This is for future reference maybe at some point I have 
    //the time and will to make this function work with axios.

    /*import * as FormData from "form-data";

    let formData = new FormData();
    formData.append("sysparm_ck", session.userToken);
    formData.append("sysparm_target", input.target);
    formData.append("attachFile", fs.createReadStream(input.filePath), {
        "knownLength": fs.statSync(input.filePath).size
    });

    const headers = {
        ...formData.getHeaders(),
        "Content-Length": formData.getLengthSync()
    };
    var importXmlResponse = await session.httpClient.post("/sys_upload.do", formData, { headers });
    return importXmlResponse.status;*/
}