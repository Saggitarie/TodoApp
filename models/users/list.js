module.exports = (knex, User) => {
  return async (id) => {
    console.log("id is,,,,", id);
    const targetUser = await knex
      .where({ id })
      .select()
      .from("users")
      .then((user) => {
        if (user.length) return new User(user.pop());

        throw new Error(`Error finding user ${user}`);
      });

    console.log("targetUser", targetUser);

    return targetUser;
  }; // fix me!
};
