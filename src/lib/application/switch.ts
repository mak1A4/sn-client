import { LoginData } from "sn-login";

export default async function (login: LoginData, applicationSysId: string): Promise<any> {

  let url = `/api/now/ui/concoursepicker/application`;
  let requestBody = { "app_id": applicationSysId };
  let response = await login.wclient.put(url, requestBody, {
    headers: {
      "X-UserToken": login.token,
      "Connection": "keep-alive",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-WantSessionNotificationMessages": "true"
    }
  });
  return response.data.result;
}