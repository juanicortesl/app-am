"use strict";

const bcrypt = require("bcryptjs");

const defaultSaltRounds = 12;

const hashPassword = (password, saltRounds = defaultSaltRounds) => {
  return bcrypt.hashSync(password, saltRounds);
};

const checkPassword = (bodyPass, userPass) => {
  return bcrypt.compareSync(bodyPass, userPass);
};

module.exports = { hashPassword, checkPassword };
