import { LoginData } from "sn-login";
import * as fs from "fs";
import * as path from "path";
import * as request from "request";

export interface IXmlImportInput {
    target: string,
    filePath: string
}

export default async function (login: LoginData, input: IXmlImportInput): Promise<number> {

    let defaultHeader = {
        "Accept": "*/*",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "User-Agent": "Mozilla/sncmder",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    };

    let baseURL = login.wclient.defaults.baseURL as string;
    let xjar = request.jar();
    if (login.cookieJar) {
        login.cookieJar.getCookiesSync(baseURL).forEach((c) => {
            xjar.setCookie(c.cookieString(), baseURL);
        });
    }

    let filename = path.basename(input.filePath);
    return new Promise<number>((resolve, reject) => {
        request(login.wclient.defaults.baseURL + "/sys_upload.do", {
            "method": "POST",
            "headers": defaultHeader, 
            "followAllRedirects": true,
            "gzip": true,
            "jar": xjar,
            "formData": {
                "sysparm_ck": login.token,
                "sysparm_target": input.target,
                "file": {
                    "value": fs.createReadStream(input.filePath),
                    "options": {
                        "filename": filename,
                        "contentType": "application/xml"
                    }
                }
            }
        }, (error, response) => {
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
    formData.append("sysparm_ck", login.token);
    formData.append("sysparm_target", input.target);
    formData.append("attachFile", fs.createReadStream(input.filePath), {
        "knownLength": fs.statSync(input.filePath).size
    });

    const headers = {
        ...formData.getHeaders(),
        "Content-Length": formData.getLengthSync()
    };
    var importXmlResponse = await login.wclient.post("/sys_upload.do", formData, { headers });
    return importXmlResponse.status;*/
}