module.exports = function (request, response) {
  if (request.method !== "GET") {
    return response.status(405).send("Method Not Allowed")
  }

  const {hospitals} = global.db;
  const {limit = 10} = request.query;
  let query = {};

  hospitals.find(query).limit(limit).exec((err, docs) => {
    if (err) {
      console.error("There was error listing hospitals.")
      return response.status(500).json({
        error: "There was error listing hospitals.",
        status: 500
      });
    }

    docs.map(item => {
      delete item._id
    });

    return response.status(200).json(docs);
  })
}
