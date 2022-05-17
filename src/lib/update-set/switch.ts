import { NowSession } from "sn-login";

export default async function (session: NowSession, updateSetSysId: string): Promise<any> {

  let url = `/api/now/ui/concoursepicker/updateset`;
  let requestBody = { "sysId": updateSetSysId };
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