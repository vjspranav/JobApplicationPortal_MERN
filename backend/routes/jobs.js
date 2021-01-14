var express = require("express");
var router = express.Router();

// Load Job model
const Job = require("../models/jobs");

// POST request
// Add a job to db
router.post("/createJob", (req, res) => {
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

module.exports = router;