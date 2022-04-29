import { LoginData } from "sn-login";

export default async function (login: LoginData, attachmentSysId: string): Promise<number> {

  let url = `/api/now/attachment/${attachmentSysId}`;
  let response = await login.wclient.delete(url, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-UserToken": login.token
    }
  });
  return response.status;
}