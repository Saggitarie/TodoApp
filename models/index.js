module.exports = (knex) => {
  return {
    users: require("./users")(knex),
    events: require("./todoEvent")(knex),
  };
};
