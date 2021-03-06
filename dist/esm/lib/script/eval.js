var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import keepAlive from "../util/keepAlive";
import * as cheerio from "cheerio";
//const h2p = require("html2plaintext");
import { convert } from "html-to-text";
export default function (session, data) {
    return __awaiter(this, void 0, void 0, function () {
        var postFormData, keepAliveInterval, keepAliveTimeout;
        return __generator(this, function (_a) {
            postFormData = new URLSearchParams({
                "script": data.script,
                "sysparm_ck": session.userToken,
                "sys_scope": data.scope,
                "runscript": "Run script",
                "quota_managed_transaction": (data.timeout) ? "on" : "off",
                "record_for_rollback": (data.rollback) ? "on" : "off"
            }).toString();
            keepAliveTimeout = setTimeout(function () {
                keepAliveInterval = setInterval(function () {
                    keepAlive(session);
                }, 1000);
            }, 15000);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    session.httpClient.post("/sys.scripts.do", postFormData, {
                        headers: {
                            "X-UserToken": session.userToken,
                            "Connection": "keep-alive",
                            "Cache-Control": "max-age=0",
                            "User-Agent": "SN-Node Client",
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(function (response) {
                        if (keepAliveInterval)
                            clearInterval(keepAliveInterval);
                        else
                            clearTimeout(keepAliveTimeout);
                        if (response.headers["server"].toLowerCase() === "snow_adc") {
                            var baseURL = session.httpClient.defaults.baseURL;
                            console.warn("ADCv2 (snow_adc) load balancer detected.");
                            console.warn("If this script runs longer than 5 minutes you will receive an error.");
                            console.warn("The transaction will not be cancelled and will continue to run in the background.");
                            console.warn("All active transactions link: ".concat(baseURL, "/v_transaction_list.do"));
                            console.warn("See Now Support PRB1537023 for more information.");
                        }
                        var res = {};
                        if (data.rollback) {
                            var $ = cheerio.load(response.data);
                            res.rollbackLink = $("a").attr("href");
                        }
                        res.response = convert(response.data, {
                            "preserveNewlines": true
                        });
                        res.response = res.response.replace("and recovery", "");
                        res.response = res.response.replace("available here", "");
                        res.response = res.response.replace("scriptScript execution history", "");
                        res.response = res.response.replace("Script execution history and recovery", "");
                        resolve(res);
                    });
                })];
        });
    });
}
