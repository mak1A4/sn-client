import snrequest from "../src/index";
var instance = process.env.SN_INSTANCE as string;
var user = process.env.SN_USER as string;
var pass = process.env.SN_PASS as string;

test("Test exportXml function", async () => {
    let snclient = await snrequest(instance, user, pass);
    let result = await snclient.exportXml({
        "table": "syslog",
        "query": ""
    })
    console.log(result);
    expect(true).toBe(true);
});

test("Test evalScript function", async () => {
    let snclient = await snrequest(instance, user, pass);
    let evalResult = await snclient.evalScript({
        "script": "gs.print('$$TEST_PASSED$$')",
        "scope": "global",
        "rollback": true
    });
    let foundScriptResponse = evalResult.indexOf("$$TEST_PASSED$$") >= 0;
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