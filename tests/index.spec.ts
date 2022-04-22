import snrequest from "../src/index";
var instance = process.env.SN_INSTANCE as string;
var user = process.env.SN_USER as string;
var pass = process.env.SN_PASS as string;

test("Test exportXml function", async () => {
    let snclient = await snrequest(instance, user, pass);
    let result = await snclient.xmlExport({
        "table": "incident",
        "query": "active=true"
    })
    console.log(result);
    expect(true).toBe(true);
});

test("Test importXml function", async () => {
    let filePath = "/Users/mak/Development/Node/servicenow/sn-request/tests/sys_script_include_c773513c870b0550b8210f6c8bbb35fc.xml"
    let snclient = await snrequest(instance, user, pass);
    let response  = await snclient.xmlImport({
        "target": "sys_script_include",
        "filePath": filePath
    });
    let success = response == 200;
    expect(success).toBe(true);
});

test("Test execScript function", async () => {
    let snclient = await snrequest(instance, user, pass);
    let execFn = await snclient.execScript("global", true, true);
    let execResult = await execFn(function(inputObj: any) {
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

test("Test evalScript function", async () => {
    let snclient = await snrequest(instance, user, pass);
    let evalResult = await snclient.evalScript({
        "script": "gs.print('$$TEST_PASSED$$')",
        "scope": "global",
        "rollback": true,
        "timeout": true
    });
    let foundScriptResponse = evalResult.response.indexOf("$$TEST_PASSED$$") >= 0;
    expect(foundScriptResponse).toBe(true);
});

test("Test GlideAjax function", async () => {
    let snclient = await snrequest(instance, user, pass);
    var parms = new Map<string, string>();
    parms.set("sysparm_table", "sys_script_include");
    parms.set("sysparm_sys_id", "59af71769368501079f4dc2a767ffb36");
    parms.set("sysparm_field_name", "name");
    
    let result = await snclient.glideAjax({
        "sysparm_processor": "RecordFieldGetter",
        "sysparm_name": "getValue",
        "sysparm_scope": "global",
        "sysparm_xyz": parms
    });
    expect(result).toBe("RecordFieldGetter");
});