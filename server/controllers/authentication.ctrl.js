"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const Models = require("../models");
const { checkPassword, hashPassword } = require("../utils/password");

class AuthenticationController {
  path = "/authentication";
  router = express.Router();

  users = {
    "app-user": { model: Models.User, name: "App user" },
  };

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post("/register/:type", this.register);
    this.router.post("/login/:type", this.logIn);
    this.router.post("/update-password/:type/:id", this.updatePassword);
  }

  register = async (req, res) => {
    const type = req.params.type;
    const attributesToCreate = req.body;

    attributesToCreate.password = hashPassword(attributesToCreate.password);

    try {
      const existingUser = await this.users[type].model.getByEmail(
        attributesToCreate.email
      );
      if (existingUser) {
        return res.status(409).send({
          result: false,
          message: "Email is already used",
        });
      }
      const user = await this.users[type].model.add(attributesToCreate);
      const token = jwt.sign({ user: { id: user.id } }, process.env.SEED, {
        expiresIn: process.env.TIME_TOKEN,
      });
      attributesToCreate.token = token;

      res.status(200).send({
        result: true,
        message: "User successfully created",
        data: {
          user: user,
          token: token,
        },
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        const value = error.errors[0].value;
        const param = error.errors[0].path;
        const name = param[0].toUpperCase() + param.slice(1);

        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [
            {
              value: value,
              msg: name + " already in use",
              param: param,
              location: "body",
            },
          ],
        });

        return;
      }

      res.status(500).send({
        result: false,
        message: "Troubles in backend, API Error",
      });
    }
  };

  logIn = async (req, res) => {
    const type = req.params.type;
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await this.users[type].model.getByEmail(email);

      if (user === null) {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [
            {
              msg: "There are one or more incorrect attributes",
              location: "body",
            },
          ],
        });

        return;
      } else if (!checkPassword(password, user.password)) {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [
            {
              msg: "There are one or more incorrect attributes",
              location: "body",
            },
          ],
        });

        return;
      }

      const token = jwt.sign({ user: { id: user.id } }, process.env.SEED, {
        expiresIn: process.env.TIME_TOKEN,
      });
      await this.users[type].model.updateById(user.id, { token: token });

      res.status(200).send({
        result: true,
        message: "Successfully authenticated",
        data: {
          user: user,
          token: token,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        result: false,
        message: "Troubles in backend, API Error",
      });
    }
  };

  updatePassword = async (req, res) => {
    const type = req.params.type;
    const id = req.params.id;
    const actualPassword = req.body.actualPassword;
    const newPassword = req.body.newPassword;

    try {
      const user = await this.users[type].model.getById(id);

      if (user === null) {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [
            { value: id, msg: "ID not found", param: "id", location: "params" },
          ],
        });

        return;
      } else if (!checkPassword(actualPassword, user.passwordHash)) {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [
            {
              value: actualPassword,
              msg: "Passwords don't match",
              param: "actualPassword",
              location: "body",
            },
          ],
        });

        return;
      }

      await this.users[type].model.updateById(id, {
        passwordHash: hashPassword(newPassword),
      });

      res.status(200).send({
        result: true,
        message: "Password successfully updated",
        data: {
          user: user,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        result: false,
        message: "Troubles in backend, API Error",
      });
    }
  };
}

module.exports = { AuthenticationController };
