var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    orm.all("user", function(res) {
      cb(res);
    });
  },
  create: function(name, cb) {
    orm.create("user", [ "user_name", "food", "calories", "serving", "input_date" ], [ name, false ], cb);
  },
  update: function(id, cb) {
    var condition = "id=" + id;
    orm.update("user", {
      devoured: true
    }, condition, cb);
  }
};

module.exports = burger;
