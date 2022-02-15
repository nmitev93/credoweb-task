module.exports = function (request, response) {
  switch (request.method) {
    case "GET":
      return require("./helpers/getUser")(request, response);
    case "POST":
      return require("./helpers/postUser")(request, response);
    case "PUT":
      return require("./helpers/putUser")(request, response);
    case "DELETE":
      return require("./helpers/deleteUser")(request, response);
    default:
      return response.status(405).send("Method Not Allowed")
  }
}