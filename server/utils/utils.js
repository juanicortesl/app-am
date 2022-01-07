"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  hashPassword(password, saltRounds) {
    return bcrypt.hashSync(password, saltRounds);
  },
  checkPassword(bodyPass, userPass) {
    return bcrypt.compareSync(bodyPass, userPass);
  },
};
