var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/users");

// POST request
// Add a user to db
router.post("/register", (req, res) => {
    var today = new Date();
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date ? req.body.date : today,
    });

    newUser
        .save()
        .then((user) => {
            res.status(200).json(user);
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

module.exports = router;