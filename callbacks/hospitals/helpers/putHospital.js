const validate = require("./validate");
const {v4: uuidv4} = require("uuid");

module.exports = function (request, response) {
  const {body} = request;
  const {hospitals} = global.db;
  const uuid = uuidv4();
  const created_timestamp = parseInt(Date.now() / 1000);
  const hospitalData = {
    ...body,
    id: uuid,
  }
  const validation = validate(hospitalData);

  if (validation.error) {
    return response.status(400).json(validation.error);
  }

  hospitals.insert(hospitalData, (err, newDoc) => {
    if (err) {
      console.error("There was error creating new hospital.")
      return response.status(500).json({
        error: "There was error creating new hospital.",
        status: 500
      });
    }

    return response.status(200).json({
      id: newDoc.id,
      success: true
    })
  })
}
