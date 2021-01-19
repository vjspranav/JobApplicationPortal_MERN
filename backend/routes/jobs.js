var express = require("express");
var router = express.Router();
const auth = require("../auth/Auth");

// Load Job model
const Job = require("../models/jobs");

// POST request
// Add a job to db
router.post("/createJob", auth, (req, res) => {
  var curUser = req.user;
  if (req.user.type != "recruiter") {
    return res.status(401).json({
      username: curUser.username,
      type: curUser.type,
      status: "Not a recruiter cannot post job",
    });
  }
  var today = new Date();
  const newJob = new Job({
    title: req.body.title,
    numApplications: req.body.numApplications,
    numPositions: req.body.numPositions,
    date: today,
    deadline: req.body.deadline,
    skillset: req.body.skillset,
    type: req.body.type,
    duration: req.body.duration,
    salary: req.body.salary,
    author: {
      username: curUser.username,
      name: curUser.name,
      email: curUser.email,
    },
  });
  newJob
    .save()
    .then((job) => {
      res.status(200).json(job);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// GET request
// Get all jobs from db
router.get("/getJobs", (req, res) => {
  Job.find({}, (err, jobs) => {
    var jobMap = {};

    jobs.forEach((job) => {
      jobMap[job._id] = job;
    });

    res.send(jobMap);
  });
});

module.exports = router;
