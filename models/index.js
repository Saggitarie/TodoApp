module.exports = (knex) => {
  return {
    users: require("./users")(knex),
  };
};
