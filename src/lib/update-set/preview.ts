import { NowSession } from "sn-login";
import glideAjax, { GlideAjaxData } from "../glide/ajax";

export default async function (
  session: NowSession, remoteUpdateSetSysId: string, scope: string
): Promise<any> {

  var parms = new Map<string, string>();
  parms.set("sysparm_ajax_processor_function", "preview");
  parms.set("sysparm_ajax_processor_sys_id", remoteUpdateSetSysId);

  let ajaxOptions = {
    "sysparm_processor": "UpdateSetPreviewAjax",
    "sysparm_scope": scope,
    "sysparm_xyz": parms
  } as GlideAjaxData
  return await glideAjax(session, ajaxOptions);
}