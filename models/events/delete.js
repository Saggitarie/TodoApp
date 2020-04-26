module.exports = (knex, Event) => {
  return (id) => {
    console.log("paramsssDeleteeeee", id);
    return knex("events")
      .where("id", id)
      .del()
      .then(() => {
        return knex("events").where("id", id).select();
      })
      .then(() => {
        return knex("events").where({ id }).select();
      })
      .catch((err) => {
        console.log(
          "Here is your error for events deleteeee>>>>>>>",
          err.message
        );
      });
  };
};
