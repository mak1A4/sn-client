import { NowSession } from "sn-login";
import execQuick from "../script/execQuick";

export interface IUpdateSetExportResult {
  fileName: string
  exportXml: string
}

export default async function (
  session: NowSession, updateSetSysId: string, scope: string
): Promise<IUpdateSetExportResult> {

  let exportSysId = await (async function () {
    let qex = await execQuick(session, scope, false, true);
    let resultObj = await qex(function (inputObj) {
      //@ts-ignore
      var grUpdateSet = new GlideRecord("sys_update_set");
      if (grUpdateSet.get(inputObj.updateSetSysId)) {
        //@ts-ignore
        var exportUtil = new UpdateSetExport();
        var exportSysId = exportUtil.exportUpdateSet(grUpdateSet);
        return { "exportSysId": exportSysId };
      }
    }, { "updateSetSysId": updateSetSysId });
    return resultObj.result.exportSysId
  })() as string;

  let url = `/export_update_set.do`;
  let urlParms = {
    "sysparm_sys_id": exportSysId,
    "sysparm_delete_when_done": "true"
  };
  let response = await session.httpClient.get(url, {
    params: urlParms,
    headers: {
      "X-UserToken": session.userToken,
      "Connection": "keep-alive"
    }
  });
  var regPatt = /filename=(.*)/;
  var contentDisposition = response.headers['content-disposition'];
  var fileName = regPatt.exec(contentDisposition)[1].replace(/['"]+/g, '');
  return {
    "fileName": fileName,
    "exportXml": response.data
  };
}