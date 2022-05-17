import { NowSession } from "sn-login";
import glideAjax, { GlideAjaxData } from "../glide/ajax";

export default async function (
  session: NowSession, remoteUpdateSetSysId: string, scope: string
): Promise<any> {

  var parms = new Map<string, string>();
  parms.set("sysparm_type", "validateCommitRemoteUpdateSet");
  parms.set("sysparm_remote_updateset_sys_id", remoteUpdateSetSysId);

  let ajaxOptions = {
    "sysparm_processor": "com.glide.update.UpdateSetCommitAjaxProcessor",
    "sysparm_scope": scope,
    "sysparm_xyz": parms
  } as GlideAjaxData;
  return await glideAjax(session, ajaxOptions);
}