import { LoginData } from "sn-login";
import * as fs from "fs";
import { tmpdir } from "os";
import { join } from "path";

export interface IRetrieveRecordOptions {
  withDisplayValue?: boolean
  fields?: string
}

export interface IRetrieveRecordsOptions extends IRetrieveRecordOptions {
  encodedQuery?: string
  limit?: number
  offset?: number
}

export interface IRetrieveRecordsToFileOptions extends IRetrieveRecordOptions {
  encodedQuery?: string
  filePath?: string
  chunkSize?: number
}

export async function retrieveRecord(
  login: LoginData, table: string, sysId: string, options?: IRetrieveRecordOptions
): Promise<any> {
  let urlParmObj: any = {};
  if (options) {
    if (options.fields) urlParmObj.sysparm_fields = options.fields;
    if (options.withDisplayValue) urlParmObj.sysparm_display_value = "all";
  }

  let url = `/api/now/table/${table}/${sysId}`;
  var response = await login.wclient.get(url, {
    headers: {
      "X-UserToken": login.token,
      "Accept": "application/json"
    },
    params: urlParmObj
  });
  return response.data.result;
}

// If you use the Table API, and have glide.invalid_query.returns_no_rows set to true.
// Rather than getting 0 results you'll get a 403 forbidden message if an invalid query is used
export async function retrieveRecords(
  login: LoginData, table: string, options?: IRetrieveRecordsOptions
): Promise<any> {
  let urlParmObj: any = {};
  if (options) {
    if (options.encodedQuery) urlParmObj.sysparm_query = options.encodedQuery;
    if (options.limit) urlParmObj.sysparm_limit = options.limit;
    if (options.offset) urlParmObj.sysparm_offset = options.offset;
    if (options.fields) urlParmObj.sysparm_fields = options.fields;
    if (options.withDisplayValue) urlParmObj.sysparm_display_value = "all";
  }

  var response = await login.wclient.get(`/api/now/table/${table}`, {
    headers: {
      "X-UserToken": login.token,
      "Accept": "application/json"
    },
    params: urlParmObj
  });
  return response.data.result;
}

export async function streamRecordsToFile(
  login: LoginData, table: string, options: IRetrieveRecordsToFileOptions
): Promise<string> {
  if (!options) options = {};
  let writePath = options.filePath;
  if (!writePath) writePath = join(tmpdir(), Math.random().toString(36).substring(2) + ".json");
  let encodedQueryWithOrderBy = options.encodedQuery + "^ORDERBYDESCsys_created_on";
  if (!options.encodedQuery) encodedQueryWithOrderBy = "ORDERBYDESCsys_created_on";

  let chunkSize = options.chunkSize;
  if (!chunkSize) chunkSize = 10000;

  let recursiveOptions = {
    "encodedQuery": encodedQueryWithOrderBy,
    "limit": chunkSize
  } as IRetrieveRecordsOptions;
  if (options.fields) recursiveOptions.fields = options.fields;
  if (options.withDisplayValue) recursiveOptions.withDisplayValue = options.withDisplayValue

  let writeStream = fs.createWriteStream(writePath, "utf8");
  try {

    writeStream.write("[");
    await (async function recursiveCall(offset: number) {
      recursiveOptions.offset = offset;
      let response = await retrieveRecords(login, table, recursiveOptions);
      for (let [idx, recObj] of response.entries()) {
        let jsonObjStr = JSON.stringify(recObj);
        if (offset === 0 && idx === 0) writeStream.write(jsonObjStr);
        else writeStream.write("," + jsonObjStr);
      }
      if (response.length > 0) {
        await recursiveCall(offset + chunkSize);
      }
    })(0);
    writeStream.write("]");

    return writePath;
  } finally {
    writeStream.close();
  }
}