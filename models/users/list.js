module.exports = (knex, User) => {
  return async (name) => {
    console.log("name is,,,,", name);
    // eslint-disable-next-line no-return-await
    return await knex
      .where({ user_name: name })
      .select()
      .from("users")
      .then((user) => {
        console.log("userrrrr", user);
        return new User(user.pop());
      });

    // console.log("targetUser", targetUser);

    // return targetUser;
  }; // fix me!
};
