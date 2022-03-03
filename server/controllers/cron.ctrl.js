"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const Models = require("../models");

class CronController {
  path = "/cron";
  router = express.Router();
  constructor() {
    this.initRoutes();
  }
  initRoutes() {
    // this.router.get("/reminder-emails", this.sendReminderEmails);
    this.router.get("/end-meetings", this.endMeetings);
  }

  async endMeetings(req, res) {
    try {
      console.log("end meetings");
      let now = new Date();
      const hourInMilliseconds = 1000 * 60 * 60;
      let availableMeetings = await Models.Meeting.getAll("available");
      availableMeetings.forEach(async (meeting) => {
        let meetingDate = new Date(meeting.dataValues.startTime);
        // meeting is finished 5 hours after startTime
        if (now.getTime() - meetingDate.getTime() >= 5 * hourInMilliseconds) {
          await Models.Meeting.updateById(meeting.dataValues.id, {
            status: "finished",
          });
        }
      });

      return res
        .status(200)
        .send({ result: true, message: "meetings finished" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ result: false, message: "API problem" });
    }
  }
}

module.exports = {
  CronController,
};
