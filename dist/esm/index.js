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
import * as R from "ramda";
import { createInterface } from "readline";
import snlogin from "sn-login";
import execScript from "./lib/script/exec";
import execQuick from "./lib/script/execQuick";
import glideAjax from "./lib/glide/ajax";
import xmlExport from "./lib/util/exportXml";
import xmlImport from "./lib/util/importXml";
import xmlHttp from "./lib/util/xmlHttp";
import getTableSchema from "./lib/util/tableSchema";
import clearCache from "./lib/util/clearCache";
import evalScript from "./lib/script/eval";
import { retrieveRecord, retrieveRecords, streamRecordsToFile } from "./lib/table-api/get";
import getCurrentAppList from "./lib/application/getCurrentList";
import switchApp from "./lib/application/switch";
import retrieveAttachment from "./lib/attachment/retrieve";
import deleteAttachment from "./lib/attachment/delete";
import uploadAttachment from "./lib/attachment/upload";
import createUpdateSet from "./lib/update-set/create";
import commitUpdateSet from "./lib/update-set/commit";
import exportUpdateSetToXml from "./lib/update-set/exportToXml";
import previewUpdateSet from "./lib/update-set/preview";
import validateUpdateSet from "./lib/update-set/validate";
import switchUpdateSet from "./lib/update-set/switch";
import getCurrentUpdateSetList from "./lib/update-set/getCurrentList";
export function snRequest(snInstanceName, userName, auth) {
    return __awaiter(this, void 0, void 0, function () {
        var login, e_1, rl_1, questionText_1, mfaToken, authObj, getLoginData;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 5]);
                    return [4 /*yield*/, snlogin(snInstanceName, userName, auth)];
                case 1:
                    login = _a.sent();
                    return [3 /*break*/, 5];
                case 2:
                    e_1 = _a.sent();
                    rl_1 = createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });
                    questionText_1 = "Login failed, try again with new MFA Token: ";
                    return [4 /*yield*/, new Promise(function (resolve) { return rl_1.question(questionText_1, resolve); })
                            .finally(function () { return rl_1.close(); })];
                case 3:
                    mfaToken = _a.sent();
                    authObj = { "mfaToken": mfaToken };
                    if (auth && auth.password)
                        authObj.password = auth.password;
                    return [4 /*yield*/, snlogin(snInstanceName, userName, authObj)];
                case 4:
                    login = _a.sent();
                    return [3 /*break*/, 5];
                case 5:
                    if (!login)
                        throw "Login has failed ...";
                    getLoginData = function () {
                        return login;
                    };
                    return [2 /*return*/, {
                            "getLoginData": getLoginData,
                            "script": {
                                "eval": R.curry(evalScript)(login),
                                "executeFn": R.curry(execScript)(login),
                                "executeFnQuick": R.curry(execQuick)(login)
                            },
                            "application": {
                                "getCurrentList": function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, getCurrentAppList(login)];
                                        });
                                    });
                                },
                                "switch": function (applicationSysId) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, switchApp(login, applicationSysId)];
                                        });
                                    });
                                }
                            },
                            "attachment": {
                                "retrieve": R.curry(retrieveAttachment)(login),
                                "delete": R.curry(deleteAttachment)(login),
                                "upload": function (uploadType, table, sysId, input, fileName) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, uploadAttachment(login, uploadType, table, sysId, input, fileName)];
                                    });
                                }); }
                            },
                            "glide": {
                                "glideAjax": R.curry(glideAjax)(login)
                            },
                            "tableApi": {
                                "retrieveRecord": function (table, sysId, options) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, retrieveRecord(login, table, sysId, options)];
                                        });
                                    });
                                },
                                "retrieveRecords": function (table, options) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, retrieveRecords(login, table, options)];
                                        });
                                    });
                                },
                                "streamRecordsToFile": R.curry(streamRecordsToFile)(login)
                            },
                            "util": {
                                "xmlImport": R.curry(xmlImport)(login),
                                "xmlExport": R.curry(xmlExport)(login),
                                "xmlHttpRequest": R.curry(xmlHttp)(login),
                                "getTableSchema": R.curry(getTableSchema)(login),
                                "clearCache": function (invalidate) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, clearCache(login, invalidate)];
                                        });
                                    });
                                }
                            },
                            "updateSet": {
                                "create": R.curry(createUpdateSet)(login),
                                "getCurrentList": function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, getCurrentUpdateSetList(login)];
                                        });
                                    });
                                },
                                "exportToXml": R.curry(exportUpdateSetToXml)(login),
                                "preview": R.curry(previewUpdateSet)(login),
                                "switch": R.curry(switchUpdateSet)(login),
                                "validate": R.curry(validateUpdateSet)(login),
                                "commit": R.curry(commitUpdateSet)(login)
                            }
                        }];
            }
        });
    });
}
export default snRequest;
