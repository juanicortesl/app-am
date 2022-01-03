"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  hashPassword(password, saltRounds) {
    return bcrypt.hashSync(password, saltRounds);
  },
};
