import { NowSession } from "sn-login";

export default function (session: NowSession): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    session.httpClient.get("/cancel_my_transaction.do?status=true&sysparm_output=json", {
      "headers": {
        "X-UserToken": session.userToken,
        "Accept": "application/json, text/plain, */*",
        "Connection": "keep-alive",
        "X-WantSessionNotificationMessages": "true"
      }
    }).then((response) => {
      resolve(response.data.status);
    }).catch((err) => {
      reject(err);
    });
  });
};