import { NowSession } from "sn-login";

export default async function (session: NowSession, applicationSysId: string): Promise<any> {

  let url = `/api/now/ui/concoursepicker/application`;
  let requestBody = { "app_id": applicationSysId };
  let response = await session.httpClient.put(url, requestBody, {
    headers: {
      "X-UserToken": session.userToken,
      "Connection": "keep-alive",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-WantSessionNotificationMessages": "true"
    }
  });
  return response.data.result;
}