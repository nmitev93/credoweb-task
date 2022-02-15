const express = require("express");
const app = express();
const port = 3000;
const Datastore = require("nedb");
const basicAuth = require('express-basic-auth')

global.db = {
  users: new Datastore({filename: "./db/users.db"}),
  hospitals: new Datastore({filename: "./db/hospitals.db"})
};
db.users.loadDatabase();
db.hospitals.loadDatabase();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use(express.json())
app.use(basicAuth({
  users: {
    "apiUser": "superSecurePassword"
  }
}))

const apiRoutes = require("./config/routing.json");
for (let apiRoute in apiRoutes)  {
  let routeData = apiRoutes[apiRoute];
  let callback = require(`./callbacks/${routeData.callback}`)

  app.use(routeData.path, (req, res) => callback(req, res))
}
