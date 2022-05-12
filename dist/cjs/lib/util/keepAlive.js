"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(login) {
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
exports.default = default_1;
;
