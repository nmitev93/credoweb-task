const validate = require("./validate");

module.exports = function (request, response) {
  const {body} = request;
  const {hospitals} = global.db;
  const hospitalId = request.params.id;
  const validation = validate(body);

  if (!hospitalId) {
    return response.status(400).json({
      error: "Missing required parameter",
      status: 400
    });
  }

  if (validation.error) {
    return response.status(400).json(validation.error);
  }

  delete body._id

  hospitals.update({id: body.id}, body, (err, numReplaced) => {
    if (err) {
      console.error("There was error updating hospital.", JSON.stringify(err))
      return response.status(500).json({
        error: "There was error updating hospital.",
        status: 500
      });
    }

    if (!numReplaced) {
      return response.status(500).send("Unspecified error");
    }

    return response.status(204).send();
  })
}