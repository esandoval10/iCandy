var express = require("express");

var router = express.Router();
var user = require("../models/bmi.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/bmi");
});

router.get("/bmi", function(req, res) {
  // express callback response 
  user.all(function(bmiData) {
    // wrapper for orm.js that using MySQL query callback will return user_data, render to index with handlebar
    res.render("index", { bmi_data: bmiData });
  });
});

// put route -> back to index
router.put("/bmi/:id", function(req, res) {
  user.update(req.params.id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

module.exports = router;
