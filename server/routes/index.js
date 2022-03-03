const express = require("express");
/* Controllers */
const { CronController } = require("../controllers/cron.ctrl");
const { ModelsController } = require("../controllers/models.ctrl");
const {
  AuthenticationController,
} = require("../controllers/authentication.ctrl");
const authController = new AuthenticationController();
const cronController = new CronController();
const controllers = [new ModelsController()];
// middleware
const middleware = require("../middleware/auth");
//routers
const router = express.Router();
router.use(middleware.checkToken);
const cronRouter = express.Router();
cronRouter.use(middleware.checkCronToken);
module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message:
        "Example project did not give you access to the api web services",
    })
  );

  // initialize controllers
  controllers.forEach((controller) =>
    router.use(controller.path, controller.router)
  );
  app.use(authController.path, authController.router);
  cronRouter.use(cronController.path, cronController.router);
  app.use("/cron-api/", cronRouter);
  app.use("/api/", router);
};
