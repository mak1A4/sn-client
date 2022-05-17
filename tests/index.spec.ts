import snrequest, { NowClient } from "../src/index";
import keepAlive from "../src/lib/util/keepAlive";
let instance = process.env.SN_INSTANCE as string;
let user = process.env.SN_USER as string;
let pass = process.env.SN_PASS as string;

let _client: NowClient;
async function getNowClient(): Promise<NowClient> {
    if (!_client) _client = await snrequest(instance, user, pass);
    return _client;
}

describe("script module", () => {

    test("executeFn function", async () => {
        let snclient = await getNowClient();
        let execFn = await snclient.script.executeFn("global", true, true);
        let execResult = await execFn(function (inputObj: any) {
            //@ts-ignore
            var testProp = gs.getProperty("sn_appclient.instance_type");
            return {
                "input": inputObj.xyz,
                "instance_type": testProp
            };
        }, { "xyz": "zyx" });
        let foundScriptInput = execResult.result.input === "zyx";
        let foundScriptResult = execResult.result.instance_type !== undefined;
        expect(foundScriptResult).toBe(true);
        expect(foundScriptInput).toBe(true);
    });

    test("executeFnQuick function", async () => {
        let snclient = await getNowClient();
        let execFn = await snclient.script.executeFnQuick("global", true, true);
        let execResult = await execFn(function (inputObj: any) {
            //@ts-ignore
            var testProp = gs.getProperty("sn_appclient.instance_type");
            return {
                "input": inputObj.xyz,
                "instance_type": testProp
            };
        }, { "xyz": "zyx" });
        let foundScriptInput = execResult.result.input === "zyx";
        let foundScriptResult = execResult.result.instance_type !== undefined;
        expect(foundScriptResult).toBe(true);
        expect(foundScriptInput).toBe(true);
    });

    test("eval function", async () => {
        let snclient = await getNowClient();
        let evalResult = await snclient.script.eval({
            "script": "gs.print('$$TEST_PASSED$$')",
            "scope": "global",
            "rollback": true,
            "timeout": true
        });
        let foundScriptResponse = evalResult.response.indexOf("$$TEST_PASSED$$") >= 0;
        expect(foundScriptResponse).toBe(true);
    });
});

describe("application module", () => {
    test("getCurrentList function", async () => {
        let snclient = await getNowClient();
        let result = await snclient.application.getCurrentList();

        let applicationsFound = result.list && result.list.length > 0;
        expect(applicationsFound).toBe(true);
        //expect(foundScriptInput).toBe(true);
    });

    test("switch function", async () => {

        let snclient = await getNowClient();
        await snclient.application.switch("global");
        let gresult = await snclient.application.getCurrentList();
        let firstSwitchWorked = gresult.current == "global";

        await snclient.application.switch("ecc30875db950110ecec1a4813961929");

        let result = await snclient.application.getCurrentList();
        let secondSwitchWorked = result.current == "ecc30875db950110ecec1a4813961929";

        expect(firstSwitchWorked).toBe(true);
        expect(secondSwitchWorked).toBe(true);
    });
});

describe("glide module", () => {
    test("glideAjax function", async () => {
        let snclient = await getNowClient();
        var parms = new Map<string, string>();
        parms.set("sysparm_table", "sys_script_include");
        parms.set("sysparm_sys_id", "59af71769368501079f4dc2a767ffb36");
        parms.set("sysparm_field_name", "name");

        let result = await snclient.glide.glideAjax({
            "sysparm_processor": "RecordFieldGetter",
            "sysparm_name": "getValue",
            "sysparm_scope": "global",
            "sysparm_xyz": parms
        });
        expect(result).toBe("RecordFieldGetter");
    });
});

describe("util module", () => {

    test("clearCache function", async () => {
        let snclient = await getNowClient();
        let result = await snclient.util.clearCache(true);
        let cacheCleared = result.indexOf("Servlet Memory") >= 0;
        expect(cacheCleared).toBe(true);
    });
    test("xmlExport function", async () => {
        let snclient = await getNowClient();
        let result = await snclient.util.xmlExport({
            "table": "incident",
            "query": "number=INC0010001"
        })
        let resultXmlFound = result !== "";
        expect(resultXmlFound).toBe(true);
    });
    test("xmlImport function", async () => {
        let filePath = "/Users/mak/Development/Node/servicenow/sn-client/tests/sys_script_include_c773513c870b0550b8210f6c8bbb35fc.xml"
        let snclient = await getNowClient();
        let response = await snclient.util.xmlImport({
            "target": "sys_script_include",
            "filePath": filePath
        });
        let success = response == 200;
        expect(success).toBe(true);
    });
    test("keepAlive function", async () => {
        let snclient = await getNowClient();
        let response = await keepAlive(snclient.getNowSession());
        let success = response === "complete";
        expect(success).toBe(true);
    });
    test("getTableSchema function", async () => {
        let snclient = await getNowClient();
        let incidentTableSchema = await snclient.util.getTableSchema("incident");
        let success = incidentTableSchema && incidentTableSchema.length > 0;
        expect(success).toBe(true);
    });
    test("xmlHttpRequest function", async () => {
        let snclient = await getNowClient();
        
        var parms = new Map<string, string>();
        parms.set("sysparm_name", "createCleanName");
        parms.set("sysparm_label", "TestSuccessful");
        parms.set("sysparm_scope", "global");
        
        let result = await snclient.util.xmlHttpRequest({
            "sysparm_processor": "CleanTemplateInputName",
            "sysparm_xyz": parms
        });
        expect(result).toBe("testsuccessful");
    });
});

describe("attachment module", () => {
    test("upload function", async () => {
    });
    test("retrieve function", async () => {
    });
    test("delete function", async () => {
    });
});

describe("table-api module", () => {
    test("retrieveRecord function", async () => {
    });
    test("retrieveRecords function", async () => {
    });
    test("streamRecordsToFile function", async () => {
    });
});

describe("update-set module", () => {
    test("create function", async () => {
    });
    test("getCurrentList function", async () => {
    });
    test("exportToXml function", async () => {
    });
    test("preview function", async () => {
    });
    test("switch function", async () => {
    });
    test("validate function", async () => {
    });
    test("commit function", async () => {
    });
});