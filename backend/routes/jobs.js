var express = require("express");
var router = express.Router();
const auth = require("../auth/Auth");

// Load Job model
const Job = require("../models/jobs");
const Application = require("../models/applications");
const Applicant = require("../models/applicants");
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
        { type: jType },
        { duration: { $lt: maxMonths } },
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

// GET request
// Get all jobs of the recruiter from db
router.get("/getMyJobs", auth, async (req, res) => {
  let curUser = req.user;
  if (req.user.type != "recruiter") {
    return res.status(401).json({
      username: curUser.username,
      type: curUser.type,
      status: "Not a recruiter cannot post job",
    });
  }
  let author = {
    username: curUser.username,
    name: curUser.name,
    email: curUser.email,
  };
  Job.find({ author }, (err, jobs) => {
    var jobMap = {};

    jobs.forEach((job) => {
      jobMap[job._id] = job;
    });

    res.send(jobMap);
  });
});

// POST request
// Applyfor a job
router.post("/createApplication", auth, async (req, res) => {
  var curUser = req.user;
  if (req.user.type != "applicant") {
    return res.status(401).json({
      username: curUser.username,
      type: curUser.type,
      status: "Not an applicant cannot apply",
    });
  }

  let num_jobs = await Applicant.findOne({ username: curUser.username });
  num_jobs = num_jobs.num_jobs;
  if (num_jobs > 10) {
    return res.status(401).send({ msg: "Cannot apply to more than 10 jobs" });
  }
  let date = new Date();
  let job_id = req.body.job_id;
  let applicant = curUser.username;
  let recruiter = req.body.recruiter;
  let jobTitle = req.body.jobTitle;
  let sop = req.body.sop;

  const newApplication = new Application({
    recruiter,
    applicant,
    job_id,
    jobTitle,
    sop,
    date,
    status: "Applied",
  });

  newApplication
    .save()
    .then((application) => {
      num_jobs = num_jobs ? num_jobs + 1 : 1;
      Applicant.findOneAndUpdate(
        { username: applicant },
        { num_jobs },
        (err, result) => {
          err
            ? res.status(500).json({ err })
            : res.status(200).json({ application, result });
        }
      );
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
