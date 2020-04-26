module.exports = (knex, Todoevent) => {
  return async (updatedParams) => {
    // We want to get the event from id
    console.log("updatedParams.iddddd", updatedParams.id);
    const result = {};
    const targetEvent = await knex
      .where("id", updatedParams.id)
      .from("events")
      .select();

    const todoEvent = new Todoevent(targetEvent);
    console.log("targetEventttttt", todoEvent);

    console.log("result", result);

    // Compare each field to check if there are any changes
    return knex("events")
      .where("id", updatedParams.id)
      .update("title", updatedParams.title)
      .update("begin_time", updatedParams.begin_time)
      .update("end_time", updatedParams.end_time)
      .then(() => {
        return knex("events").where("id", updatedParams.id).select();
      })
      .catch((err) => {
        console.log(
          "Here is your error for events deleteeee>>>>>>>",
          err.message
        );
      });
  };
};