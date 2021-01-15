var express = require("express");
var router = express.Router();

// Load Job model
const Job = require("../models/jobs");

// POST request
// Add a job to db
router.post("/createJob", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "No User Logged in" });
    }
    var curUser = req.session.user;
    if (req.session.user.type != "recruiter") {
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

module.exports = router;