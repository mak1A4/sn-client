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
import snlogin from "sn-login";
import execScript from "./lib/script/exec";
import execFromFile from "./lib/script/execFromFile";
import execQuick from "./lib/script/execQuick";
import glideAjax from "./lib/glide/ajax";
import xmlExport from "./lib/util/exportXml";
import xmlImport from "./lib/util/importXml";
import xmlHttp from "./lib/util/xmlHttp";
import getTableSchema from "./lib/util/tableSchema";
import clearCache from "./lib/util/clearCache";
import evalScript from "./lib/script/eval";
import { retrieveRecord, retrieveRecords, streamRecordsToFile } from "./lib/table-api/get";
import createRecord from "./lib/table-api/post";
import updateRecord from "./lib/table-api/patch";
import deleteRecord from "./lib/table-api/delete";
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
export function snRequest(snInstanceName, userName, password) {
    return __awaiter(this, void 0, void 0, function () {
        var nowSession, getNowSession;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, snlogin(snInstanceName, userName, password)];
                case 1:
                    nowSession = _a.sent();
                    getNowSession = function () {
                        return nowSession;
                    };
                    return [2 /*return*/, {
                            "getNowSession": getNowSession,
                            "script": {
                                "eval": R.curry(evalScript)(nowSession),
                                "executeFn": R.curry(execScript)(nowSession),
                                "executeFnQuick": R.curry(execQuick)(nowSession),
                                "executeFnFromFile": R.curry(execFromFile)(nowSession)
                            },
                            "application": {
                                "getCurrentList": function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, getCurrentAppList(nowSession)];
                                        });
                                    });
                                },
                                "switch": function (applicationSysId) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, switchApp(nowSession, applicationSysId)];
                                        });
                                    });
                                }
                            },
                            "attachment": {
                                "retrieve": R.curry(retrieveAttachment)(nowSession),
                                "delete": R.curry(deleteAttachment)(nowSession),
                                "upload": function (uploadType, table, sysId, input, fileName) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, uploadAttachment(nowSession, uploadType, table, sysId, input, fileName)];
                                    });
                                }); }
                            },
                            "glide": {
                                "glideAjax": R.curry(glideAjax)(nowSession)
                            },
                            "tableApi": {
                                "createRecord": function (table, dataObj, options) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, createRecord(nowSession, table, dataObj, options)];
                                        });
                                    });
                                },
                                "updateRecord": function (table, sysId, dataObj, options) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, updateRecord(nowSession, table, sysId, dataObj, options)];
                                        });
                                    });
                                },
                                "retrieveRecord": function (table, sysId, options) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, retrieveRecord(nowSession, table, sysId, options)];
                                        });
                                    });
                                },
                                "retrieveRecords": function (table, options) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, retrieveRecords(nowSession, table, options)];
                                        });
                                    });
                                },
                                "streamRecordsToFile": R.curry(streamRecordsToFile)(nowSession),
                                "deleteRecord": R.curry(deleteRecord)(nowSession)
                            },
                            "util": {
                                "xmlImport": R.curry(xmlImport)(nowSession),
                                "xmlExport": R.curry(xmlExport)(nowSession),
                                "xmlHttpRequest": R.curry(xmlHttp)(nowSession),
                                "getTableSchema": R.curry(getTableSchema)(nowSession),
                                "clearCache": function (invalidate) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, clearCache(nowSession, invalidate)];
                                        });
                                    });
                                }
                            },
                            "updateSet": {
                                "create": R.curry(createUpdateSet)(nowSession),
                                "getCurrentList": function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, getCurrentUpdateSetList(nowSession)];
                                        });
                                    });
                                },
                                "exportToXml": R.curry(exportUpdateSetToXml)(nowSession),
                                "preview": R.curry(previewUpdateSet)(nowSession),
                                "switch": R.curry(switchUpdateSet)(nowSession),
                                "validate": R.curry(validateUpdateSet)(nowSession),
                                "commit": R.curry(commitUpdateSet)(nowSession)
                            }
                        }];
            }
        });
    });
}
export default snRequest;
