function getOutputObj(resultObj) {
  var StringUtil = new GlideStringUtil();
  var resultObjStr = "";
  var contentType = "application/json";
  try {
    resultObjStr = JSON.stringify(resultObj);
  } catch (err) {
    var json = new JSON();
    resultObjStr = StringUtil.base64Encode(json.encode(resultObj));
    contentType = "text/plain";
  }
  var aguid = gs.generateGUID();
  var fileName = aguid + ".json";
  if (contentType == "text/plain") fileName = aguid + ".txt";
  
  var rec = new GlideRecord('ecc_queue');
  rec.get(aguid);
  return new GlideSysAttachment().write(rec, fileName, contentType, resultObjStr);
}