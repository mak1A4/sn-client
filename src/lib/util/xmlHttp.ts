import { LoginData } from "sn-login";
import { XMLParser } from "fast-xml-parser";

export interface IXmlHttpOptions {
  sysparm_processor: string,
  sysparm_xyz: Map<string, string>
}

export default async function (login: LoginData, options: IXmlHttpOptions): Promise<string> {

  let postBodyObj = {
    "sysparm_processor": options.sysparm_processor
  } as any;
  for (let [key, value] of options.sysparm_xyz) {
    postBodyObj[key] = value;
  }
  let postFormData = new URLSearchParams(postBodyObj).toString();

  let response = await login.wclient.post("/xmlhttp.do", postFormData, {
    "headers": {
      "X-UserToken": login.token
    }
  });
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    allowBooleanAttributes: true
  });
  let xmlResponse = response.data;
  var jsonResponse = parser.parse(xmlResponse);
  return jsonResponse.xml._answer
}