const { expect, assert } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);

const forcePromiseReject = () => {
  throw new Error("This promise should have failed, but did not.");
};

describe("users", () => {
  describe("setup", () => {
    it("able to connect to database", () =>
      knex
        .raw("select * from users")
        .catch(() => assert.fail("unable to connect to db")));

    it("has run the initial migrations", () =>
      knex("users")
        .select()
        .catch(() => assert.fail("users table is not found.")));
  });
});
