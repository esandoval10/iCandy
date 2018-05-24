var express = require("express");

var router = express.Router();
var user = require("../models/user.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/user");
});

router.get("/user", function(req, res) {
  // express callback response 
  user.all(function(userData) {
    // wrapper for orm.js that using MySQL query callback will return user_data, render to index with handlebar
    res.render("index", { user_data: userData });
  });
});

// post route -> back to index
router.post("/user/create", function(req, res) {
  // takes the request object using it as input 
  user.create(req.body.user_name, function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/user/:id", function(req, res) {
  user.update(req.params.id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

module.exports = router;
