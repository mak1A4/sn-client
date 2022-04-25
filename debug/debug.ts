import snrequest from "../src/index";

(async function() {
    let $sn = await snrequest("devtwinformatics", "m.kirchweger@softpoint.at");
    let xmlStr = await $sn.xmlExport({
        "table": "incident",
        "query": "sys_id=de25e1be97590110b06ef3e3f153af84"
    });
    console.log(xmlStr);
    let exec = await $sn.execScript("global", true, true);
    let res = await exec(function() {
        return { "test": "xyz" };
    });
    console.log(res);
})();