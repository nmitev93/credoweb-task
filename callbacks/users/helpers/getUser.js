module.exports = async function (request, response) {
  const {users} = global.db;
  const userId = request.params.id;

  if (!userId) {
    return response.status(400).json({
      error: "Missing required parameter",
      status: 400
    });
  }

  users.findOne({id: userId}, (err, userData) => {
    if (err) {
      console.error("There was error finding user data.")
      return response.status(500).json({
        error: "There was error finding user data.",
        status: 500
      });
    }

    delete userData._id;
    return response.status(200).json(userData);
  });
}
