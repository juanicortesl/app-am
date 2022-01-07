const Sequelize = require("sequelize");
const User = require("../models").User;
const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");
module.exports = {
  signUp(req, res) {
    return User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      address: req.body.address,
      birth_date: req.body.birth_date,
      password: utils.hashPassword(req.body.password),
    })
      .then((user) => {
        console.log(process.env.SEED);
        let token = jwt.sign(
          {
            user: {
              id: user.id,
            },
          },
          process.env.SEED,
          { expiresIn: process.env.TIME_TOKEN }
        );
        console.log(user);
        res.status(200).send({ userEmail: user.email, token: token });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  setType(req, res) {
    allowedTypes = ["searcher", "offerer"];
    const user = User.update(
      {
        type: allowedTypes.includes(req.body.type) ? req.body.type : undefined,
      },
      {
        returning: true,
        where: { id: req.user.id },
      }
    )
      .then((user) => {
        res.status(200).send({ message: "SET TYPE" });
      })
      .catch((error) => res.status(400).send(error));
  },
  setInterests(req, res) {
    const user = User.update(
      {
        interests: req.body.interests ? req.body.interests : undefined,
      },
      {
        returning: true,
        where: { id: req.user.id },
      }
    )
      .then((user) => {
        res.status(200).send({ message: "SET INTERESTS" });
      })
      .catch((error) => res.status(400).send(error));
  },
};
