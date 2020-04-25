const express = require("express");

module.exports = (models) => {
  /**
   * Controller Logic
   */
  const createUser = (req, res) => {
    console.log("About to create user");
    console.log(req.body.user_name);

    return models.users
      .create({
        user_name: req.body.user_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        email: req.body.email,
      })
      .then((user) => res.status(201).json(user.serialize()))
      .catch((err) => {
        if (err.message === "That username already exists") {
          return models.users
            .get({ username: req.body.username })
            .then((user) => res.status(200).json(user.serialize()));
        }

        return res.status(400).send(err.message);
      });
  };

  const listUsers = (req, res) =>
    models.users
      .list()
      .then((users) => users.map((user) => user.serialize()))
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(400).send(err.message));

  /**
   * Routes
   */
  const router = express.Router();
  router.post("/", createUser);
  router.get("/", listUsers);

  return router;
}