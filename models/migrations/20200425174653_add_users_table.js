exports.up = function (knex) {
  // Create users table with 6 columns
  return knex.schema.createTable("users", (table) => {
    table.integer("user_id").index().primary();

    table.date("birth_date").notNullable();

    table.string("first_name", 14).notNullable();

    table.string("last_name", 16).notNullable();

    table.string("gender", 4).notNullable();

    table.string("others", 50);
  });
};

exports.down = function (knex) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("user");
};
