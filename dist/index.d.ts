import { EvalScriptData } from "./eval-script";
import { GlideAjaxData } from "./glide-ajax";
import { IExportXmlInput } from "./export-xml";
export interface IRequestFunctions {
    execScript(scope: string, rollback: boolean): Promise<any>;
    evalScript(script: EvalScriptData): Promise<string>;
    glideAjax(data: GlideAjaxData): Promise<string>;
    exportXml(xml: IExportXmlInput): Promise<string>;
}
declare function snRequest(snInstanceName: string, userName: string): Promise<IRequestFunctions>;
declare function snRequest(snInstanceName: string, userName: string, userPassword?: string): Promise<IRequestFunctions>;
export default snRequest;
