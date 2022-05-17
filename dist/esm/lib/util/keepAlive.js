export default function (session) {
    return new Promise(function (resolve, reject) {
        session.httpClient.get("/cancel_my_transaction.do?status=true&sysparm_output=json", {
            "headers": {
                "X-UserToken": session.userToken,
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
