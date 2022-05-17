function getInputObj(inputAttachmentSysId) {
  var gsa = GlideSysAttachmentInputStream(inputAttachmentSysId);
  var baos = new Packages.java.io.ByteArrayOutputStream();
  gsa.writeTo(baos);
  baos.close();
  var binData = baos.toByteArray();

  var StringUtil = new GlideStringUtil();
  var base64EncodedData = StringUtil.base64Encode(binData);
  return JSON.parse(StringUtil.base64Decode(base64EncodedData));
}