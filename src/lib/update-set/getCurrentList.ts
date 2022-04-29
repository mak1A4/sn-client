import { LoginData } from "sn-login";

export default async function (login: LoginData): Promise<any> {

  let url = `/api/now/ui/concoursepicker/updateset`;
  let response = await login.wclient.get(url, {
    headers: {
      "X-UserToken": login.token,
      "Connection": "keep-alive",
      "Accept": "application/json"
    }
  });
  return response.data.result;
}