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
  router.post("/api/set_type", appController.setType);
  app.use("/", router);
};
