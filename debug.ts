import snrequest from "./src/index";
import attachment, { UploadType } from "./src/lib/attachment/upload"
import getAttachment from "./src/lib/attachment/retrieve"
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { randomUUID } from "crypto";
import { StopWatch } from 'stopwatch-node'
import tableSchema from "./src/lib/util/tableSchema";
import execQuick from "./src/lib/script/execQuick";
import { retrieveRecords, streamRecordsToFile } from "./src/lib/table-api/get"
import createRecord from "./src/lib/table-api/post"
import clearCache from "./src/lib/util/clearCache"
import getUpdateSetList from "./src/lib/update-set/getCurrentList"
import exportUpdateSet from "./src/lib/update-set/exportToXml"

dotenv.config();

var instance = process.env.SN_INSTANCE as string;
var user = process.env.SN_USER as string;
var pass = process.env.SN_PASS as string;

(async function () {

  var sw = new StopWatch();
  let $sn = await snrequest(instance, user);
  let login = $sn.getLoginData();

  sw.start("request");
  // let res = await retrieveRecords(login, "incident", {
  //   "encodedQuery": "active=true"
  // });
  // console.log(res);

  // let res = await streamRecordsToFile(login, "incident", {
  //   "encodedQuery": "active=true",
  //   "chunkSize": 5
  // });
  // let res = await createRecord(login, "incident", {
  //   "short_description": "test"
  // });

  // let res = await clearCache(login, true);
  // console.log(res);

  // let res = await getUpdateSetList(login);

  let res = await exportUpdateSet(login, "761bd1cfdb190510ecec1a4813961962", "global");
  console.log(res);

  //let res = await tableSchema(login, "incident");
  //console.log(res);
  // var qe = await execQuick(login, "global", false, true);
  // var res = await qe(function(inputObj) {
  //   //@ts-ignore
  //   gs.debug(inputObj.test);
  //   return { "test": inputObj.test }
  // }, { "test": "xyz" })
  // console.log(res.response);
  sw.stop();
  sw.prettyPrint();


  // sw.start("script exec");
  // let exec = await $sn.execScript("global", true, true);
  // //let inputObjStr = fs.readFileSync("/Users/mak/Downloads/22819d36db0b4150bc96827813961930.json", "utf8");
  // var inputObjStr = JSON.stringify(["1","2","3"]);
  // let res = await exec(function (inputObj) {
  //   //make it possible to return simple values not only objects
  //   //@ts-ignore
  //   var result = [];
  //   for (var i = 0; i < 2; i++) {
  //     result.push({
  //       //@ts-ignore
  //       "sys_id": gs.generateGUID()
  //     });
  //   }
  //   return result;
  // }, JSON.parse(inputObjStr));
  // sw.stop();
  // sw.prettyPrint();
  // console.log(res);

})();


/*let xmlStr = await $sn.xmlExport({
      "table": "incident",
      "query": "sys_id=de25e1be97590110b06ef3e3f153af84"
  });
  console.log(xmlStr);
  */