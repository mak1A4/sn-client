var result = [];
for (var i = 0; i < 372826; i++) {
  result.push({
    "sys_id": gs.generateGUID()
  });
}
var str = JSON.stringify(result);
gs.debug(result.length);
//33554432 //MAX SIZE OF ServiceNow JSON.stringify

//=================================== Input ============================
var attachment = new GlideSysAttachment();
//var attachmentSysID = '6188a7eadbc7cd10bc96827813961906'; //small
//var attachmentSysID = '1f58653edb4b4150bc968278139619b9'; //medium
var attachmentSysID = '3c7169f6db4b4150bc96827813961962'; //large
//var attachmentContentStream = attachment.getContentStream(attachmentSysID);
//var xmlDoc = new XMLDocument2(attachmentContentStream);
//var result = gs.xmlToJSON(xml.toString())
//xmlDoc.parseXML("<test>123</test>")
//xmlDoc.getDocumentElement();

var attachment = new GlideSysAttachment();
var attachmentSysID = '129eb07adb4f0150bc968278139619f6'; //small
//var attachmentSysID = '1f58653edb4b4150bc968278139619b9'; //medium
//var attachmentSysID = '3c7169f6db4b4150bc96827813961962'; //large
//var attachmentContentStream = attachment.getContentStream(attachmentSysID);
//var xmlDoc = new XMLDocument2(attachmentContentStream);
//var result = gs.xmlToJSON(xml.toString())
//xmlDoc.parseXML("<test>123</test>")
//xmlDoc.getDocumentElement();

var gsa = GlideSysAttachmentInputStream(attachmentSysID);
var baos = new Packages.java.io.ByteArrayOutputStream();
gsa.writeTo(baos);
baos.close();
var binData = baos.toByteArray();

var StringUtil = new GlideStringUtil();
var base64EncodedData = StringUtil.base64Encode(binData);
//base64EncodedData.length();

/*var attachment = new GlideSysAttachment();
var aguid = gs.generateGUID();
var rec = new GlideRecord('ecc_queue');
rec.get(aguid);
var fileName = aguid + '_test.json';
var contentType = 'text/plain';

var agr = attachment.write(rec, fileName, contentType, base64EncodedData);
agr;
*/
JSON.parse(StringUtil.base64Decode(base64EncodedData)).length

// ======================= OUTPUT ===============================
var result = [];
for (var i = 0; i < 382826; i++) {
//for (var i = 0; i < 5; i++) {
  result.push({
    "sys_id": gs.generateGUID()
  });
}
var StringUtil = new GlideStringUtil();
//StringUtil.base64Encode(str).length()

//.fromBytes()
//.toBytes()
//.toStringArray()
//.fromStringArray()
//.getStringFromStream()
//.join
//.joinCollection

//NativeJSON.stringify(result)
var json = new JSON();
var text = StringUtil.base64Encode(json.encode(result));
text.length();

var attachment = new GlideSysAttachment();
var aguid = gs.generateGUID();
var rec = new GlideRecord('ecc_queue');
rec.get(aguid);
var fileName = aguid + '_testEncode.json';
var contentType = 'text/plain';

var agr = attachment.write(rec, fileName, contentType, text);
agr;