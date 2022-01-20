const express = require("express");
/* Controllers */
const appController = require("../controllers/app");
const cronController = require("../controllers/cron");
// middleware
const middleware = require("../middleware/auth");
const router = express.Router();
router.use(middleware.checkToken);
module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message:
        "Example project did not give you access to the api web services",
    })
  );
  app.post("/api/sign_up", appController.signUp);
  app.post("/api/sign_in", appController.signIn);
  router.post("/set_type", appController.setType);
  router.post("/set_interests", appController.setInterests);
  router.post("/add_meeting", appController.addAvailableMeeting);
  router.post("/meetings/available", appController.getAvailableMeetings);
  router.post("/meetings/request", appController.meetingRequest);
  router.get("/meetings/get_requested", appController.getRequestedMeetings);
  router.get("/meetings/past", appController.getPastMeetings);
  router.get("/meetings/offered", appController.getOfferedMeetings);
  app.post("/cron/reminder_emails", cronController.sendReminderEmails);

  app.use("/api/", router);
};
