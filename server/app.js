const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
// config
const { loadConfig } = require("./config/config");
loadConfig();
// This will be our application entry. We'll setup our server here.
const http = require("http");
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger("dev"));
app.use(cors());
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Angular stuff
const staticRoot = "./public/";
app.use(function (req, res, next) {
  var accept = req.accepts("html", "json", "xml");
  if (accept !== "html") {
    return next();
  }
  var ext = path.extname(req.path);
  if (ext !== "") {
    return next();
  }
  fs.createReadStream(staticRoot + "index.html").pipe(res);
});

app.use("/", express.static(staticRoot));
// Setup a default catch-all route that sends back a welcome message in JSON format.
require("./routes")(app);
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  })
);
const port = 8000;
app.set("port", port);
const server = http.createServer(app);
server.listen(process.env.PORT || 8000);

module.exports = app;
