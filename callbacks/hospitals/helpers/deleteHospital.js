module.exports = function (request, response) {
  const {hospitals} = global.db;
  const hospitalId = request.params.id;

  if (!hospitalId) {
    return response.status(400).json({
      error: "Missing required parameter",
      status: 400
    });
  }

  hospitals.remove({id: hospitalId}, {}, (err, count) => {
    if (err) {
      console.error("There was error deleting hospital.")
      return response.status(500).json({
        error: "There was error deleting hospital.",
        status: 500
      });
    }

    if (!count) {
      return response.status(404).send();
    }

    return response.status(204).send();
  })
}