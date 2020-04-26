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

        // afterEach(() => knex("users").del()); // delete all users after each spec

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

  describe.only("#event", () => {
    let params = {};
    let updateParams = {};
    const id = 4;
    before(() => {
      params = {
        title: "Eat Dinner",
        start_date: "2020-04-27",
        end_date: "2020-04-27",
        begin_time: "18:30",
        end_time: "19:30",
        location: "home",
        description: "Going to eat pizza today!!!",
        user_event_id: 93,
      };

      updateParams = {
        id: 6,
        title: "Join Nomikai on Zoom",
        begin_time: "18:30",
        end_time: "21:30",
      }
    });

    it("should be able to add new events", () => {
      models.events.create(params).then((event) => {
        expect(event).to.include({ title: params.title });
        expect(event).to.include({ start_date: params.start_date });
        expect(event).to.include({ end_date: params.end_date });
        expect(event).to.include({ begin_time: params.begin_time });
        expect(event).to.include({ end_time: params.end_time });
        expect(event).to.include({ location: params.location });
        expect(event).to.include({ description: params.description });
      });
    });

    it("should be able to delete events with a corresponding id", () => {
      models.events
        .delete(id)
        .then(() => {
          return knex("events").where({ id }).select();
        })
        .catch((err) => console.log(err));
    });

    it("should be able to update event with a corresponding id", () => {
      models.events.update(updateParams).then((event) => {
        // expect(event).to.not.include({ id: 6 });
        expect(event).to.not.include({ title: params.title });
        expect(event).to.not.include({ begin_time: params.begin_time });
        expect(event).to.not.include({ end_time: params.end_time });
      });
    });
  });
});
