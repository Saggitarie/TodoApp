exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_name: "Georgio",
          first_name: "Georgi",
          last_name: "Facello",
          password: "test1234!",
          email: "georgio@abc.com",
        },
        {
          user_name: "Bagel",
          first_name: "Bezalel",
          last_name: "Simmel",
          password: "test1234!",
          email: "bagel@email.com",
        },
        {
          user_name: "Saggitarie",
          first_name: "Parto",
          last_name: "Bamford",
          password: "test1234!",
          email: "star@gmail.com",
        },
        {
          user_name: "Taurus",
          first_name: "Chirstian",
          last_name: "Koblick",
          password: "test1234!",
          email: "taurus@yahoo.com",
        },
        {
          user_name: "Neptune",
          first_name: "Kyoichi",
          last_name: "Maliniak",
          password: "test1234!",
          email: "galaxy@yahoo.com",
        },
        {
          user_name: "Lightbolt",
          first_name: "Anneke",
          last_name: "Preusig",
          password: "test1234!",
          email: "test@gmail.com",
        },
        {
          user_name: "First_Penguin",
          first_name: "Tzvetan",
          last_name: "Zielinski",
          password: "test1234!",
          email: "test2@yahoo.com",
        },
        {
          user_name: "Hedgehog",
          first_name: "Saniya",
          last_name: "Kalloufi",
          password: "test1234!",
          email: "animal@gmail.com",
        },
        {
          user_name: "Peacock",
          first_name: "Sumant",
          last_name: "Peac",
          password: "test1234!",
          email: "bird@gmail.com",
        },
        {
          user_name: "DP",
          first_name: "Duangkaew",
          last_name: "Piveteau",
          password: "test1234!",
          email: "dp@gmail.com",
        },
      ]);
    });
};