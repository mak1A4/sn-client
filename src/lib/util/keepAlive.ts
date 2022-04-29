import { LoginData } from "sn-login";

export default function(login: LoginData): void {
  login.wclient.get("/cancel_my_transaction.do?status=true&sysparm_output=json", {
    "headers": {
      "X-UserToken": login.token,
      "Accept": "application/json, text/plain, */*",
      "Connection": "keep-alive",
      "X-WantSessionNotificationMessages": "true"
    }
  }).then((response) => {
    console.log(response.data.status);
  });
};