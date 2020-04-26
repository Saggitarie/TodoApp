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

  describe("#create", () => {
    let params = {};
    context("when some params are missing", () => {
      before(() => {
        params = {
          user_name: "Georgio",
          first_name: null,
          last_name: "Facello",
          password: "test1234!",
          email: "georgio@abc.com",
        };
      });

      it("should not insert a record", () => {
        models.users
          .create(params)
          .then(forcePromiseReject)
          .catch((err) => {
            console.log("errrrrrrr", err);
            expect(err.message).to.equal(err);
          });
      });

      context("when there are all params", () => {
        before(() => {
          params = {
            user_name: "Saggitarie",
            first_name: "Kohki",
            last_name: "Shiga",
            password: "shiga1234!",
            email: "georgio@abc.com",
          };
        });

        afterEach(() => knex("users").del()); // delete all users after each spec

        it("creates a user", () =>
          models.users.create(params).then((user) => {
            console.log("userrrrrrr", user);
            expect(user).to.include({ user_name: params.user_name });
            expect(user.id).to.be.a("number");
          }));

        context("when a duplicate username is provided", () => {
          beforeEach(() => models.users.create(params));

          it("generates a sanitized error message", () =>
            models.users
              .create(params)
              .then(forcePromiseReject)
              .catch((err) => {
                expect(err.message).to.equal("That username already exists");
              }));
        });
      });
    });
  });

  describe("#event", () => {

  })
});
