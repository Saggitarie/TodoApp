module.exports = (knex, User) => {
  return async () => {
    const result = [];
    const allUsers = await knex.select().from("users");

    let newUser = new User(allUsers[0]);
    let newUser2 = new User(allUsers[1]);
    result.push(newUser);
    result.push(newUser2);
    return result;
  }; // fix me!
};
