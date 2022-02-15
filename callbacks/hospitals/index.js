
// hospital = {
//   id: "unique hospital id",
//   name: "name",
//   address: "physical address",
//   phone: "phone number"
// }
module.exports = function (request, response) {
  switch (request.method) {
    case "GET":
      return require("./helpers/getHospital")(request, response);
    case "POST":
      return require("./helpers/postHospital")(request, response);
    case "PUT":
      return require("./helpers/putHospital")(request, response);
    case "DELETE":
      return require("./helpers/deleteHospital")(request, response);
    default:
      return response.status(405).send("Method Not Allowed")
  }
}