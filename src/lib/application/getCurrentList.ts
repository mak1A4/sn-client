import { NowSession } from "sn-login";

export default async function (session: NowSession): Promise<any> {

  let url = `/api/now/ui/concoursepicker/application`;
  let response = await session.httpClient.get(url, {
    headers: {
      "X-UserToken": session.userToken,
      "Connection": "keep-alive",
      "Accept": "application/json"
    }
  });
  return response.data.result;
}