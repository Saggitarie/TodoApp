const express = require("express");

const router = express.Router();

const userRouter = require("./user");
const channelRouter = require("./event");

module.exports = (models) => {
  router.use("/users", userRouter(models));
  router.use("/event", channelRouter(models));

  return router;
};
