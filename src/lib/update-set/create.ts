import { NowSession } from "sn-login";
import createRecord from "../table-api/post";

export default async function (session: NowSession, name: string, scope: string): Promise<any> {
  //TODO: switch to scope before creating record
  return await createRecord(session, "sys_update_set", {
    "name": name
  });
}