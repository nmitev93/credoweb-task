module.exports = function (request, response) {
  const {users} = global.db;
  const userId = request.params.id;

  if (!userId) {
    return response.status(400).json({
      error: "Missing required parameter",
      status: 400
    });
  }

  users.remove({id: userId}, {}, (err, count) => {
    if (err) {
      console.error("There was error deleting user.")
      return response.status(500).json({
        error: "There was error deleting user.",
        status: 500
      });
    }

    if (!count) {
      return response.status(404).send();
    }

    return response.status(204).send();
  })
}