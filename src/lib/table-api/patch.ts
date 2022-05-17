import { NowSession } from "sn-login";

export interface IUpdateRecordOptions {
  withDisplayValue?: boolean
  fields?: string
}

export default async function updateRecord(
  session: NowSession, table: string, sysId: string, data: any, options?: IUpdateRecordOptions
): Promise<any> {
  let url = `/api/now/table/${table}/${sysId}`;
  let urlParmObj: any = {};
  if (options) {
    if (options.fields) urlParmObj.sysparm_fields = options.fields;
    if (options.withDisplayValue) urlParmObj.sysparm_display_value = "all";
  }
  var response = await session.httpClient.patch(url, data, {
    headers: {
      "X-UserToken": session.userToken,
      "Accept": "application/json"
    },
    "params": urlParmObj
  });
  return response.data.result;
}