const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");
const routes = require("./routes");
const { promiseMiddleware } = require("./middleware");

express.application.prefix = express.Router.prefix = function (
  path,
  middleware,
  configure
) {
  var router = express.Router();
  this.use(path, middleware, router);
  configure(router);
  return router;
};
require("dotenv").config();

const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", promiseMiddleware);
routes(app);

const port = parseInt(process.env.PORT, 10) || 3000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;
