const validateUsername = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length >= 0;
const validateFirstname = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length >= 0;
const validateLastname = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length >= 0;

module.exports = (knex, User) => {
  return (params) => {
    // console.log("parammssssss", params);
    const username = params.user_name;
    const first_name = params.first_name;
    const last_name = params.last_name;
    console.log("username", username);

    if (!validateUsername(username)) {
      return Promise.reject(new Error("Username must be provided"));
    }

    if (!validateFirstname(first_name)) {
      return Promise.reject(new Error("FirstName must be provided"));
    }

    if (!validateLastname(last_name)) {
      return Promise.reject(new Error("LastName must be provided"));
    }

    return knex("users")
      .insert({
        user_name: params.user_name,
        first_name: params.first_name,
        last_name: params.last_name,
        password: params.password,
        email: params.email,
      })
      .then(() => {
        // console.log(
        //   "error",
        //   knex("users").where({ user_name: username }).select()
        // );
        return knex("users").where({ user_name: username }).select();
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
