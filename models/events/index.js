const moment = require("moment");

const Event = function (dbUser) {
  this.id = dbUser.id;
  this.title = dbUser.title;
  this.start_date = dbUser.start_date;
  this.end_date = dbUser.end_date;
  this.begin_time = dbUser.start_time;
  this.end_time = dbUser.end_time;
  this.location = dbUser.location;
  this.description = dbUser.description;
};

Event.prototype.serialize = function () {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    title: this.title,
    start_date: this.start_date,
    end_date: this.end_date,
    begin_time: this.start_time,
    end_time: this.end_time,
    location: this.location,
    description: this.description,
  };
};

module.exports = (knex) => {
  return {
    create: require("./create")(knex, Event),
    delete: require("./delete")(knex, Event),
  };
};
