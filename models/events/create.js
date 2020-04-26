const validateEventTitle = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length >= 0;

module.exports = (knex, User) => {
  return (params) => {

    console.log("paramssssss >>>>>>", params.begin_time);

    if (!validateEventTitle(params.title)) {
      return Promise.reject(new Error("Username must be provided"));
    };


    return knex("events")
      .insert({
        title: params.title,
        start_date: params.start_date,
        end_date: params.end_date,
        begin_time: params.begin_time,
        end_time: params.end_time,
        location: params.location,
        description: params.description,
        user_event_id: params.user_event_id,
      })
      .then(() => {
        return knex("events").where({ title: params.title }).select();
      })
      .then((users) => {
        console.log("users", users);
        return new User(users.pop());
      }) // create a user model out of the plain database response
      .catch((err) => {
        // sanitize known errors
        console.log("Here is your error", err);
        if (
          err.severity.match("ERROR") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That username already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
