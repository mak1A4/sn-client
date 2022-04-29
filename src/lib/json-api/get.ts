// SnRequest.prototype.JSONv2API = function (table) {
//   var self = this;
//   var executeRequest = async function (method, params, payload) {
//       var requestOptions = {
//           json: true,
//           uri: self.uri + "/" + table + ".do?JSONv2=&"
//       };
//       var requestHeaders = {
//           'Content-Type': 'application/json',
//           'Accepts': 'application/json'
//       };
//       if (method) requestOptions.method = method;
//       if (payload) requestOptions.body = payload;
//       if (params) requestOptions.uri += querystring.stringify(params);
//       return self.executeRequest(requestOptions, requestHeaders);
//   };

//   return {
//       getKeys: async function (query) {
//           if (!query) {
//               throw "You must provide a query for getKeys";
//           }
//           var result = await executeRequest("GET", {
//               "sysparm_action": "getKeys",
//               "sysparm_query": query
//           });
//           return result;
//       },
//       get: async function (sysId) {
//           if (!sysId) {
//               throw "You must provide a sysId for get";
//           }
//           var result = await executeRequest("GET", {
//               "sysparm_action": "get",
//               "sysparm_sys_id": sysId
//           });
//           return result;
//       },
//       getRecords: async function (query) {
//           if (!query) {
//               throw "You must provide a query for getRecords";
//           }
//           var result = await executeRequest("GET", {
//               "sysparm_action": "getRecords",
//               "sysparm_query": query
//           });
//           return result;
//       },
//       update: async function (record, query) {
//           if (!record || !query) {
//               throw "You must provide a record and a query for update";
//           }
//           var result = await executeRequest("POST", {
//               "sysparm_action": "update",
//               "sysparm_query": query,
//               "displayvalue": "all"
//           }, record);
//           return result;
//       },
//       insert: async function (record) {
//           if (!record) {
//               throw "You must provide a record for insert";
//           }
//           var result = await executeRequest("POST", {
//               "sysparm_action": "insert",
//               "displayvalue": "all"
//           }, record);
//           return result;
//       },
//       insertMultiple: async function (recordArray) {
//           if (!recordArray) {
//               throw "You must provide a recordArray for insertMultiple";
//           }
//           var result = await executeRequest("POST", {
//               "sysparm_action": "insertMultiple"
//           }, recordArray);
//           return result;
//       },
//       deleteRecord: async function (sysId) {
//           if (!sysId) {
//               throw "You must provide a sysId for deleteRecord";
//           }
//           var result = await executeRequest("POST", {
//               "sysparm_action": "deleteRecord"
//           }, {
//               "sysparm_sys_id": sysId
//           });
//           return result;
//       },
//       deleteMultiple: async function (query) {
//           if (!query) {
//               throw "You must provide a query for deleteMultiple";
//           }
//           var result = await executeRequest("POST", {
//               "sysparm_action": "deleteMultiple",
//               "sysparm_query": query
//           });
//           return result;
//       }
//   }
// };