const validate = require("./validate");

module.exports = function (request, response) {
  const {body} = request;
  const {users} = global.db;
  const userId = request.params.id;
  const validation = validate(body);

  if (!userId) {
    return response.status(400).json({
      error: "Missing required parameter",
      status: 400
    });
  }

  if (validation.error) {
    return response.status(400).json(validation.error);
  }

  if (body.type === "doctor" && !body.hospital_id) {
    return response.status(400).json({
      error: "hospital_id is required for doctors"
    })
  }
  delete body._id

  users.update({id: body.id}, body, (err, numReplaced) => {
    if (err) {
      console.error("There was error updating user.", JSON.stringify(err))
      return response.status(500).json({
        error: "There was error updating user.",
        status: 500
      });
    }

    if (!numReplaced) {
      return response.status(500).send("Unspecified error");
    }

    return response.status(204).send();
  })
}