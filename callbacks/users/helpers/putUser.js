const validate = require("./validate");
const {v4: uuidv4} = require("uuid");

module.exports = function (request, response) {
  const {body} = request;
  const {users} = global.db;
  const uuid = uuidv4();
  const created_timestamp = parseInt(Date.now() / 1000);
  const userData = {
    ...body,
    id: uuid,
    created_at: created_timestamp
  }
  const validation = validate(userData);

  if (validation.error) {
    return response.status(400).json(validation.error);
  }

  if (userData.type === "doctor" && !userData.hospital_id) {
    return response.status(400).json({
      error: "hospital_id is required for doctors"
    })
  }

  users.insert(userData, (err, newDoc) => {
    if (err) {
      console.error("There was error creating new user.")
      return response.status(500).json({
        error: "There was error creating new user.",
        status: 500
      });
    }

    return response.status(200).json({
      id: newDoc.id,
      success: true
    })
  })
}
