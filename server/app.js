const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
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
// var request = require("request");

// let your_app_client_id = "cUTZWT6nRdKEagbfEYu6dg";
// let your_app_client_secret = "kPZluEhXfn4Mo9uFhV7hwGuR29lvxCKm";
// var options = {
//   method: "POST",
//   url: "https://zoom.us/oauth/token?grant_type=code",
//   headers: {
//     /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
//      **/
//     Authorization:
//       "Basic " +
//       Buffer.from(your_app_client_id + ":" + your_app_client_secret).toString(
//         "base64"
//       ),
//   },
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });
module.exports = app;
