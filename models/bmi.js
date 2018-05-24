var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    orm.all("bmi", function(res) {
      cb(res);
    });
  },
  create: function(name, cb) {
    orm.create("bmi", [ "user_name", "gender", "age", "weight", "height", "waistSize", "activityLevel", "fatPercentage", "RMR", "caloriesPerDay", "input_date" ], [ name, false ], cb);
  },
  update: function(id, cb) {
    var condition = "id=" + id;
    orm.update("user", {
      devoured: true
    }, condition, cb);
  }
};

module.exports = burger;
