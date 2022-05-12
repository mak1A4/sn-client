"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snRequest = void 0;
var R = __importStar(require("ramda"));
var readline_1 = require("readline");
var sn_login_1 = __importDefault(require("sn-login"));
var exec_1 = __importDefault(require("./lib/script/exec"));
var execQuick_1 = __importDefault(require("./lib/script/execQuick"));
var ajax_1 = __importDefault(require("./lib/glide/ajax"));
var exportXml_1 = __importDefault(require("./lib/util/exportXml"));
var importXml_1 = __importDefault(require("./lib/util/importXml"));
var xmlHttp_1 = __importDefault(require("./lib/util/xmlHttp"));
var tableSchema_1 = __importDefault(require("./lib/util/tableSchema"));
var clearCache_1 = __importDefault(require("./lib/util/clearCache"));
var eval_1 = __importDefault(require("./lib/script/eval"));
var get_1 = require("./lib/table-api/get");
var getCurrentList_1 = __importDefault(require("./lib/application/getCurrentList"));
var switch_1 = __importDefault(require("./lib/application/switch"));
var retrieve_1 = __importDefault(require("./lib/attachment/retrieve"));
var delete_1 = __importDefault(require("./lib/attachment/delete"));
var upload_1 = __importDefault(require("./lib/attachment/upload"));
var create_1 = __importDefault(require("./lib/update-set/create"));
var commit_1 = __importDefault(require("./lib/update-set/commit"));
var exportToXml_1 = __importDefault(require("./lib/update-set/exportToXml"));
var preview_1 = __importDefault(require("./lib/update-set/preview"));
var validate_1 = __importDefault(require("./lib/update-set/validate"));
var switch_2 = __importDefault(require("./lib/update-set/switch"));
var getCurrentList_2 = __importDefault(require("./lib/update-set/getCurrentList"));
function snRequest(snInstanceName, userName, auth) {
    return __awaiter(this, void 0, void 0, function () {
        var login, e_1, rl_1, questionText_1, mfaToken, authObj, getLoginData;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 5]);
                    return [4 /*yield*/, (0, sn_login_1.default)(snInstanceName, userName, auth)];
                case 1:
                    login = _a.sent();
                    return [3 /*break*/, 5];
                case 2:
                    e_1 = _a.sent();
                    rl_1 = (0, readline_1.createInterface)({
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
                    return [4 /*yield*/, (0, sn_login_1.default)(snInstanceName, userName, authObj)];
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
                                "eval": R.curry(eval_1.default)(login),
                                "executeFn": R.curry(exec_1.default)(login),
                                "executeFnQuick": R.curry(execQuick_1.default)(login)
                            },
                            "application": {
                                "getCurrentList": function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, (0, getCurrentList_1.default)(login)];
                                        });
                                    });
                                },
                                "switch": function (applicationSysId) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, (0, switch_1.default)(login, applicationSysId)];
                                        });
                                    });
                                }
                            },
                            "attachment": {
                                "retrieve": R.curry(retrieve_1.default)(login),
                                "delete": R.curry(delete_1.default)(login),
                                "upload": function (uploadType, table, sysId, input, fileName) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, (0, upload_1.default)(login, uploadType, table, sysId, input, fileName)];
                                    });
                                }); }
                            },
                            "glide": {
                                "glideAjax": R.curry(ajax_1.default)(login)
                            },
                            "tableApi": {
                                "retrieveRecord": function (table, sysId, options) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, (0, get_1.retrieveRecord)(login, table, sysId, options)];
                                        });
                                    });
                                },
                                "retrieveRecords": function (table, options) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, (0, get_1.retrieveRecords)(login, table, options)];
                                        });
                                    });
                                },
                                "streamRecordsToFile": R.curry(get_1.streamRecordsToFile)(login)
                            },
                            "util": {
                                "xmlImport": R.curry(importXml_1.default)(login),
                                "xmlExport": R.curry(exportXml_1.default)(login),
                                "xmlHttpRequest": R.curry(xmlHttp_1.default)(login),
                                "getTableSchema": R.curry(tableSchema_1.default)(login),
                                "clearCache": function (invalidate) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, (0, clearCache_1.default)(login, invalidate)];
                                        });
                                    });
                                }
                            },
                            "updateSet": {
                                "create": R.curry(create_1.default)(login),
                                "getCurrentList": function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, (0, getCurrentList_2.default)(login)];
                                        });
                                    });
                                },
                                "exportToXml": R.curry(exportToXml_1.default)(login),
                                "preview": R.curry(preview_1.default)(login),
                                "switch": R.curry(switch_2.default)(login),
                                "validate": R.curry(validate_1.default)(login),
                                "commit": R.curry(commit_1.default)(login)
                            }
                        }];
            }
        });
    });
}
exports.snRequest = snRequest;
exports.default = snRequest;
