"use strict";

const path = require("path");
const dotenv = require("dotenv");

console.log("load node process env", process.env.NODE_ENV);

const loadConfig = () => {
  if (process.env.NODE_ENV === "prod") {
    dotenv.config({ path: path.join(__dirname, "./.env-prod") });
  } else if (process.env.NODE_ENV === "staging") {
    dotenv.config({ path: path.join(__dirname, "./.env-staging") });
  } else {
    dotenv.config({ path: require("find-config")(".env") });
  }
};

module.exports = {
  loadConfig,
};
