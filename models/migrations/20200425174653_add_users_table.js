exports.up = function (knex) {
  // Create users table with 6 columns
  return knex.schema.createTable("users", (table) => {
    table.increments("id").index();

    table.string("user_name", 30).unique().notNullable();

    table.string("first_name", 30).notNullable();

    table.string("last_name", 30).notNullable();

    table.string("password", 30).notNullable();

    table.string("email", 50).notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function (knex) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("users");
};
