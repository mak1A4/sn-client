import { NowSession } from "sn-login";

export default async function deleteRecord(
  session: NowSession, table: string, sysId: string
): Promise<any> {
  let url = `/api/now/table/${table}/${sysId}`;
  
  var response = await session.httpClient.delete(url, {
    headers: {
      "X-UserToken": session.userToken,
      "Accept": "application/json"
    }
  });
  return response.data.result;
}