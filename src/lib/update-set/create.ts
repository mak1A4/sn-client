import { LoginData } from "sn-login";
import createRecord from "../table-api/post";

export default async function (login: LoginData, name: string, scope: string): Promise<any> {
  //TODO: switch to scope before creating record
  return await createRecord(login, "sys_update_set", {
    "name": name
  });
}