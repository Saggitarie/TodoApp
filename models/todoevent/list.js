module.exports = (knex, Todoevent) => {
  return async (userId) => {
    const allUsers = await knex
      .where("user_event_id", userId)
      .orderBy("begin_time", "desc")
      .select()
      .from("events");

    return allUsers;

    // console.log(allUsers);
  }; // fix me!
};
