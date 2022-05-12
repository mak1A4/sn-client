export default function (login) {
    return new Promise(function (resolve, reject) {
        login.wclient.get("/cancel_my_transaction.do?status=true&sysparm_output=json", {
            "headers": {
                "X-UserToken": login.token,
                "Accept": "application/json, text/plain, */*",
                "Connection": "keep-alive",
                "X-WantSessionNotificationMessages": "true"
            }
        }).then(function (response) {
            resolve(response.data.status);
        }).catch(function (err) {
            reject(err);
        });
    });
}
;
