var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send({ status: "API is working properly !" });
});

/* Protected GET home page. */
router.get("/protected", function (req, res) {
  if (!req.session.user)
    return res.status(200).json({ status: "Not logged in" });
  res.send({ status: "API atfer login is working properly !" });
});

module.exports = router;
