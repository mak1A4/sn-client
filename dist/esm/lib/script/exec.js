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
import * as fs from "fs";
import * as path from "path";
import evalScript from "./eval";
import { randomUUID } from "crypto";
import attachmentUpload, { UploadType } from "../attachment/upload";
import attachmentRetrieve from "../attachment/retrieve";
import attachmentDelete from "../attachment/delete";
export default function (session, scope, rollback, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, function (snExecFn, inputObject) {
                    if (inputObject === void 0) { inputObject = {}; }
                    return __awaiter(this, void 0, void 0, function () {
                        var fakeSysId, inputAttachmentSysId, assetPath, getInputObjFnStr, getOutputObjFnStr, execScript, evalResult, jsonResultMatch, resultAttachmentSysId, resultObjPath, resultObjStr, resultObj, buff;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    fakeSysId = randomUUID().replace(/-/g, "");
                                    return [4 /*yield*/, attachmentUpload(session, UploadType.JsonString, "temp", fakeSysId, JSON.stringify(inputObject), fakeSysId + ".json")];
                                case 1:
                                    inputAttachmentSysId = _a.sent();
                                    if (__dirname.indexOf("/cjs/") >= 0) {
                                        assetPath = path.join(__dirname, "..", "..", "..", "assets");
                                    }
                                    else {
                                        assetPath = path.join(__dirname, "..", "..", "assets");
                                    }
                                    getInputObjFnStr = fs.readFileSync(path.join(assetPath, "getInputObj.js"), "utf8");
                                    getOutputObjFnStr = fs.readFileSync(path.join(assetPath, "getOutputObj.js"), "utf8");
                                    execScript = "var inputObj = (".concat(getInputObjFnStr, ")('").concat(inputAttachmentSysId, "');\n             var result = (").concat(snExecFn.toString(), ")(inputObj);\n             var outAttachmentSysId = (").concat(getOutputObjFnStr, ")(result);\n             gs.debug(\"=####\" + outAttachmentSysId + \"####=\")");
                                    return [4 /*yield*/, evalScript(session, {
                                            "script": execScript,
                                            "scope": scope,
                                            "rollback": rollback,
                                            "timeout": timeout
                                        })];
                                case 2:
                                    evalResult = _a.sent();
                                    jsonResultMatch = evalResult.response.match(/=####.*?####=/g);
                                    if (!jsonResultMatch) return [3 /*break*/, 4];
                                    resultAttachmentSysId = jsonResultMatch.map(function (s) { return s; })[0].replace("####=", "").replace("=####", "");
                                    return [4 /*yield*/, attachmentRetrieve(session, resultAttachmentSysId)];
                                case 3:
                                    resultObjPath = _a.sent();
                                    resultObjStr = fs.readFileSync(resultObjPath, "utf8");
                                    resultObj = {};
                                    try {
                                        resultObj = JSON.parse(resultObjStr);
                                    }
                                    catch (err) {
                                        buff = Buffer.from(resultObjStr, "base64");
                                        resultObj = JSON.parse(buff.toString("utf8"));
                                    }
                                    attachmentDelete(session, inputAttachmentSysId);
                                    attachmentDelete(session, resultAttachmentSysId);
                                    return [2 /*return*/, {
                                            "result": resultObj,
                                            "rollbackLink": evalResult.rollbackLink
                                        }];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                }];
        });
    });
}
