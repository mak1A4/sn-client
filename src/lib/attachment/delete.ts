import { NowSession } from "sn-login";

export default async function (session: NowSession, attachmentSysId: string): Promise<number> {

  let url = `/api/now/attachment/${attachmentSysId}`;
  let response = await session.httpClient.delete(url, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-UserToken": session.userToken
    }
  });
  return response.status;
}