"use strict";

const express = require("express");
const Models = require("../models");
const utils = require("../utils/utils");

class ModelsController {
  path = "/models";
  router = express.Router();

  models = {
    meetings: { model: Models.Meeting, name: "Meeting" },
    users: { model: Models.User, name: "User" },
  };

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/:model/:status", this.getAll);
    this.router.get("/:model/:id/:mode", this.getById);
    this.router.post("/:model/", this.add);
    this.router.put("/:model/:id", this.updateById);
    this.router.put("/:model/:id/:mode", this.updateByIdCustom);
    this.router.delete("/:model/:id", this.deleteById);
  }

  getAll = async (req, res) => {
    const model = req.params.model;
    const status = req.params.status;
    console.log("getting all", status);
    try {
      let queryResult;
      // users logic
      if (model === "users") {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [{ msg: "Endpoint not available", location: "url" }],
        });
        return;
      }
      // meetings logic
      if (model === "meetings") {
        if (status === "offered") {
          queryResult = await this.models[model].model.getAllFromUser(
            "available",
            req.user.id
          );
        }
        if (status === "next") {
          queryResult = await this.models[model].model.getAllFromUserWithFull(
            "requested",
            req.user.id
          );
        }
        if (status === "past") {
          queryResult = await this.models[model].model.getAllFromUserWithFull(
            "finished",
            req.user.id
          );
        }
        if (status === "available") {
          queryResult = await this.models[model].model.getAllAvailableWithFull(
            req.user.id
          );
        }
      } else if (status === "simple") {
        queryResult = await this.models[model].model.getAll();
      } else if (status === "full") {
        queryResult = await this.models[model].model.getAllWithFull();
      }

      res.status(200).send({
        result: true,
        message: this.models[model].name + "s successfully obtained",
        data: {
          model: queryResult,
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

  getById = async (req, res) => {
    const model = req.params.model;
    const id = req.params.id;
    const mode = req.params.mode;

    try {
      let queryResult;
      // users logic
      if (model === "users") {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [{ msg: "Endpoint not available", location: "url" }],
        });
        return;
      }
      if (mode === "simple") {
        queryResult = await this.models[model].model.getById(id);
      } else if (mode === "full") {
        queryResult = await this.models[model].model.getByIdWithFull(id);
      }

      if (queryResult === null) {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [
            { value: id, msg: "ID not found", param: "id", location: "params" },
          ],
        });

        return;
      }

      res.status(200).send({
        result: true,
        message: this.models[model].name + " by ID successfully obtained",
        data: {
          model: queryResult,
        },
      });
    } catch (error) {
      res.status(500).send({
        result: false,
        message: "Troubles in backend, API Error",
      });
    }
  };

  add = async (req, res) => {
    const model = req.params.model;
    const attributesToCreate = req.body;
    try {
      // users logic
      if (model === "users") {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [{ msg: "Endpoint not available", location: "url" }],
        });
        return;
      }
      // new meeting logic
      if (model === "meetings") {
        attributesToCreate.offererId = req.user.id;
        attributesToCreate.status = "available";
      }

      const queryResult = await this.models[model].model.add(
        attributesToCreate
      );

      res.status(200).send({
        result: true,
        message: this.models[model].name + " successfully created",
        data: {
          model: queryResult,
        },
      });
    } catch (error) {
      console.log(error, "ERROR");
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

  updateById = async (req, res) => {
    const model = req.params.model;
    const id = parseInt(req.params.id);
    const attributesToUpdate = req.body;

    if (Object.keys(attributesToUpdate).length === 0) {
      res.status(200).send({
        result: false,
        message: "Something went wrong, please check the error section",
        errors: [{ msg: "Nothing to update", location: "body" }],
      });

      return;
    }

    try {
      // users logic
      if (model === "users") {
        // check that id is the same of token
        if (id !== req.user.id) {
          console.log(req.user.id, "ID");
          console.log(id, "ID");
          res.status(200).send({
            result: false,
            message: "Something went wrong, please check the error section",
            errors: [{ msg: "Cannot update other user", location: "url" }],
          });
          return;
        }
      }
      const [updatedRows, queryResults] = await this.models[
        model
      ].model.updateById(id, attributesToUpdate);

      if (updatedRows === 0) {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [
            { value: id, msg: "ID not found", param: "id", location: "params" },
          ],
        });

        return;
      }

      const queryResult = queryResults[0];

      res.status(200).send({
        result: true,
        message: this.models[model].name + " by ID successfully updated",
        data: {
          model: queryResult,
        },
      });
    } catch (error) {
      console.log(error);
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

  updateByIdCustom = async (req, res) => {
    const model = req.params.model;
    const id = req.params.id;
    const mode = req.params.mode;
    const attributesToUpdate = req.body;
    let updatedRows;
    let queryResults;
    if (Object.keys(attributesToUpdate).length === 0) {
      res.status(200).send({
        result: false,
        message: "Something went wrong, please check the error section",
        errors: [{ msg: "Nothing to update", location: "body" }],
      });

      return;
    }

    try {
      // users logic
      if (model === "users") {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [{ msg: "Endpoint not available", location: "url" }],
        });
        return;
      }
      const user = await Models.User.getById(req.user.id);
      if (mode === "request" && model === "meetings") {
        /* request meeting and generate zoom link */
        const meeting = await this.models[model].model.getByIdWithFull(
          req.params.id
        );
        // check if meeting exists and is available
        if (!meeting || meeting.dataValues.status !== "available") {
          res.status(200).send({
            result: false,
            message: "Something went wrong, please check the error section",
            errors: [
              {
                value: id,
                msg: "Meeting is not available",
                param: "id",
                location: "params",
              },
            ],
          });
          return;
        }
        // get meeting link
        const meetingObject = await utils.createMeetingLink(meeting);
        const meetingLink = meetingObject.data.join_url;
        // update meeting status
        const newMeetingAttributes = {
          searcherId: req.user.id,
          status: "requested",
          meetingLink: meetingLink,
        };
        [updatedRows, queryResults] = await this.models[model].model.updateById(
          id,
          newMeetingAttributes
        );
        // send emails
        await utils.sendConfirmationEmailSearcher(
          meeting.Offerer,
          user.dataValues,
          meeting.dataValues.date,
          meetingLink
        );
        await utils.sendConfirmationEmailOfferer(
          meeting.Offerer,
          user.dataValues,
          meeting.dataValues.date,
          meetingLink
        );
      } else {
        [updatedRows, queryResults] = await this.models[model].model.updateById(
          id,
          attributesToUpdate
        );
      }

      if (updatedRows === 0) {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [
            { value: id, msg: "ID not found", param: "id", location: "params" },
          ],
        });

        return;
      }

      const queryResult = queryResults[0];

      res.status(200).send({
        result: true,
        message: this.models[model].name + " by ID successfully updated",
        data: {
          model: queryResult,
        },
      });
    } catch (error) {
      console.log(error);
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

  deleteById = async (req, res) => {
    const model = req.params.model;
    const id = req.params.id;

    try {
      // users logic
      if (model === "users") {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [{ msg: "Endpoint not available", location: "url" }],
        });
        return;
      }
      const destroyedRows = await this.models[model].model.deleteById(id);

      if (destroyedRows === 0) {
        res.status(200).send({
          result: false,
          message: "Something went wrong, please check the error section",
          errors: [
            { value: id, msg: "ID not found", param: "id", location: "params" },
          ],
        });

        return;
      }

      res.status(200).send({
        result: true,
        message: this.models[model].name + " by ID successfully deleted",
        data: {},
      });
    } catch (error) {
      res.status(500).send({
        result: false,
        message: "Troubles in backend, API Error",
      });
    }
  };
}

module.exports = { ModelsController };