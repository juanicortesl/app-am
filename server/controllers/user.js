const Sequelize = require("sequelize");
const User = require("../models").User;
const utils = require("../utils/utils");
module.exports = {
  create(req, res) {
    return User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      address: req.body.address,
      birth_date: req.body.birth_date,
      password: utils.hashPassword(req.body.password),
    })
      .then((usuario) => res.status(200).send(usuario))
      .catch((error) => res.status(400).send(error));
  },
};
