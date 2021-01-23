var express = require("express");
var router = express.Router();

// Load User model
const auth = require("../auth/Auth");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Applicant = require("../models/applicants");
const Recruiter = require("../models/recruiters");
const JobRating = require("../models/ratings");
const ApplicantRating = require("../models/ratings");

/* POST Request for adding rating to user */
router.post("/rateApplicant", auth, function (req, res) {
  let curUser = req.user;
  let username = req.body.username;
  let rating = req.body.rating;

  if (!username || !rating) {
    return res.status(400).json({ msg: "Applicant/Rating not provided" });
  }
  // Making sure rating is between 1 and 5
  rating = rating < 1 ? 1 : rating > 5 ? 5 : rating;
  if (req.user.type != "recruiter") {
    return res.status(401).json({
      username: curUser.username,
      type: curUser.type,
      status: "Not a recruiter cannot rate applicant",
    });
  }
  Applicant.find({ username }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (!result) {
        return res.status(401).json("Applicant does not exist");
      }
    }
  }).then((result) => {
    if (result)
      ApplicantRating.findOneAndUpdate(
        { applicant: username, recruiter: curUser.username },
        {
          rating: rating,
        },
        (err, result) => {
          err ? res.status(500).json({ err }) : console.log({ result });
        }
      ).then((result) => {
        if (!result) {
          let appRating = new ApplicantRating(update);
          appRating
            .save()
            .then((applicant) =>
              res.status(200).json({ applicant, msg: "Created Rating" })
            );
        } else {
          res.status(200).json({ result, msg: "Updated Rating" });
        }
      });
  });
});

module.exports = router;
