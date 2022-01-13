const express = require("express");
/* Controllers */
const appController = require("../controllers/app");
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
  router.post("/api/set_type", appController.setType);
  router.post("/api/set_interests", appController.setInterests);
  router.post("/api/add_meeting", appController.addAvailableMeeting);
  router.post("/api/meetings/available", appController.getAvailableMeetings);
  router.post("/api/meetings/request", appController.meetingRequest);
  router.get("/api/meetings/get_requested", appController.getRequestedMeetings);
  router.get("/api/meetings/past", appController.getPastMeetings);
  router.get("/api/meetings/offered", appController.getOfferedMeetings);
  app.use("/", router);
};
