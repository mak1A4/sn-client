import snrequest from "./src/index";
import * as dotenv from 'dotenv';

dotenv.config();

var instance = process.env.SN_INSTANCE as string;
var user = process.env.SN_USER as string;
var pass = process.env.SN_PASS as string;

(async function() {
    let $sn = await snrequest(instance, user, {
        "password": pass
    });
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