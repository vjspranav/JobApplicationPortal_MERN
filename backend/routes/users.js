var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/users");
const Applicant = require("../models/applicants");
const Recruiter = require("../models/recruiters");

// POST request
// Add a user to db
router.post("/register", (req, res) => {
    var today = new Date();
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        type: req.body.type,
        password: req.body.password,
        date: req.body.date ? req.body.date : today,
    });
    const typeUser =
        newUser.type == "applicant" ?
        new Applicant({
            username: newUser.username,
        }) :
        new Recruiter({
            username: newUser.username,
        });
    newUser
        .save()
        .then((user) => {
            typeUser
                .save()
                .then((tu) => {
                    res.status(200).json(user);
                })
                .catch((err) => {
                    res.status(400).send(err);
                });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// POST request
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const pass = req.body.password;

    // Find user by email or username
    // [{email}, {username}] same as [{'email':email}, {'username':username}]
    User.findOne({ $or: [{ email }, { username }] }).then((user) => {
        // Check if user email exists
        if (!user) {
            return res.status(401).json({
                error: "Email not found",
            });
        } else {
            if (pass === user.password) {
                req.session.user = user;
                res.status(200).json({
                    details: "Login Successfull",
                });
                return user;
            } else {
                return res.status(401).json({
                    error: "Password wrong",
                });
            }
        }
    });
});

// POST request
// Login
router.post("/logout", (req, res) => {
    if (!req.session.user)
        return res.status(500).json({ status: "No User Logged in" });
    req.session.destroy((err) => {
        res.status(500).json(err);
    });
    res.status(200).json({ status: "Logged Out successfully" });
});

// POST request
// Update Contact Number
router.post("/updateNumber", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "No User Logged in" });
    }
    const username = req.body.username;
    const contact_number = req.body.contact_number;
    console.log(username, contact_number);
    if (req.session.user.username != username) {
        return res.status(401).json({ msg: "Unauthorized access" });
    }
    User.findOneAndUpdate({ username }, { contact_number }, (err, result) => {
        err ? res.status(500).json({ err }) : res.status(200).json({ result });
    });
});

module.exports = router;