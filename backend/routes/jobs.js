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
router.get("/getJobs", async (req, res) => {
  let jType = ["fulltime", "parttime", "wfh"];
  let maxMonths = await Job.find({})
    .sort({ duration: -1 })
    .limit(1)
    .then((jobs) => jobs[0].duration);
  let minSal = await Job.find({})
    .sort({ salary: 1 })
    .limit(1)
    .then((jobs) => jobs[0].salary);
  let maxSal = await Job.find({})
    .sort({ salary: -1 })
    .limit(1)
    .then((jobs) => jobs[0].salary);
  minSal = req.body.minSal ? req.body.minSal : minSal;
  maxSal = req.body.maxSal ? req.body.maxSal : maxSal;
  maxMonths = req.body.maxMonths ? req.body.maxMonths : maxMonths + 1;

  if (req.body.wfh == 0) jType = jType.filter((item) => item != "wfh");
  if (req.body.ptime == 0) jType = jType.filter((item) => item != "parttime");
  if (req.body.ftime == 0) jType = jType.filter((item) => item != "fulltime");

  console.log(jType);
  console.log(minSal, maxSal);
  Job.find(
    {
      $and: [
        { salary: { $lte: maxSal } },
        { salary: { $gte: minSal } },
        { $or: [{ type: jType }] },
        { $or: [{ duration: { $lt: maxMonths } }] },
      ],
    },
    (err, jobs) => {
      var jobMap = {};

      jobs.forEach((job) => {
        jobMap[job._id] = job;
      });

      res.send(jobMap);
    }
  );
});

module.exports = router;
