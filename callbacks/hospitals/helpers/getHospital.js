module.exports = async function (request, response) {
  const {hospitals} = global.db;
  const hospitalId = request.params.id;

  if (!hospitalId) {
    return response.status(400).json({
      error: "Missing required parameter",
      status: 400
    });
  }

  hospitals.findOne({id: hospitalId}, (err, hospitalData) => {
    if (err) {
      console.error("There was error finding hospital data.")
      return response.status(500).json({
        error: "There was error finding hospital data.",
        status: 500
      });
    }

    delete hospitalData._id;
    return response.status(200).json(hospitalData);
  });
}
