import { NowSession } from "sn-login";

export interface ICreateRecordOptions {
  withDisplayValue?: boolean
  fields?: string
}

export default async function createRecord(
  session: NowSession, table: string, data: any, options?: ICreateRecordOptions
): Promise<any> {
  let url = `/api/now/table/${table}`;
  let urlParmObj: any = {};
  if (options) {
    if (options.fields) urlParmObj.sysparm_fields = options.fields;
    if (options.withDisplayValue) urlParmObj.sysparm_display_value = "all";
  }
  var response = await session.httpClient.post(url, data, {
    headers: {
      "X-UserToken": session.userToken,
      "Accept": "application/json"
    },
    "params": urlParmObj
  });
  return response.data.result;
}