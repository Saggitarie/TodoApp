const express = require("express");

module.exports = (models) => {
  /**
   * Controller Logic
   */
  const createEvent = (req, res) => {
    console.log("About to add event");
    console.log(req.body.user_name);

    return models.events
      .create({
        user_name: req.body.user_name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        begin_time: req.body.begin_time,
        end_time: req.body.end_time,
        location: req.body.location,
        description: req.body.description,
        user_event_id: req.body.user_event_id,
      })
      .then((event) => res.status(201).json(event.serialize()))
      .catch((err) => {
        if (err.message === "That username already exists") {
          return models.events
            .get({ username: req.body.username })
            .then((user) => res.status(200).json(user.serialize()));
        }

        return res.status(400).send(err.message);
      });
  };

  const deleteEvent = (req, res) => {
    console.log("req.body.id", req.body.id);
    console.log("req.params.id", req.params.id);
    return models.events.delete(req.body.id);
  };

  const updateEvent = (req, res) => {
    console.log("updateEvent req", req.body);
  }

  const listEvents = (req, res) =>
    models.users
      .list()
      .then((users) => users.map((user) => user.serialize()))
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(400).send(err.message));

  /**
   * Routes
   */
  const router = express.Router();
  router.post("/", createEvent);
  router.get("/", listEvents);
  router.delete("/:id", deleteEvent);

  return router;
};
