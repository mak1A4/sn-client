import { LoginData } from "sn-login";

export default async function deleteRecord(
  login: LoginData, table: string, sysId: string
): Promise<any> {
  let url = `/api/now/table/${table}/${sysId}`;
  
  var response = await login.wclient.delete(url, {
    headers: {
      "X-UserToken": login.token,
      "Accept": "application/json"
    }
  });
  return response.data.result;
}