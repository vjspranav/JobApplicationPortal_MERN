const auth = require("../auth/Auth");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send({ status: "API is working properly !" });
});

/* Protected GET home page. */
router.get("/protected", auth, function (req, res) {
  res.send({ status: "API atfer login is working properly !" });
});

module.exports = router;
