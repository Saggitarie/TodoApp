exports.up = function (knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments().index(); // Auto increments events id

    table.string("title", 50).notNullable();

    table.date("start_date").notNullable();
    table.date("end_date").notNullable();

    table.time("begin_time").notNullable();
    table.time("end_time").notNullable();

    table.string("location", 50).notNullable();
    table.string("description", 50).notNullable();

    table.integer("user_event_id");
    table.foreign("user_event_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("events");
};
