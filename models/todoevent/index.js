function Todoevent(dbEvent) {
  console.log("dbEventttttt>>>>>>>", dbEvent[0]);
  // this.id = dbEvent[0].id;
  this.title = dbEvent[0].title;
  this.startDate = dbEvent[0].start_date;
  this.endDate = dbEvent[0].end_date;
  this.beginTime = dbEvent[0].begin_time;
  this.endTime = dbEvent[0].end_time;
  this.location = dbEvent[0].location;
  this.description = dbEvent[0].description;
  this.userEventId = dbEvent[0].user_event_id;
}

Todoevent.prototype.serialize = function () {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    // id: this.id,
    title: this.title,
    startDate: this.start_date,
    endDate: this.end_date,
    beginTime: this.start_time,
    endTime: this.end_time,
    location: this.location,
    description: this.description,
    userEventId: this.user_event_id,
  };
};

module.exports = (knex) => {
  return {
    create: require("./create")(knex, Todoevent),
    delete: require("./delete")(knex, Todoevent),
    update: require("./update")(knex, Todoevent),
  };
};
