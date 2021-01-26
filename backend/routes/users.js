var express = require("express");
var router = express.Router();

// Load User model
const auth = require("../auth/Auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const Applicant = require("../models/applicants");
const Recruiter = require("../models/recruiters");

// POST request
// Add a user to db
router.post("/register", async (req, res) => {
  var today = new Date();
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    type: req.body.type,
    gender: req.body.gender,
    password: req.body.password,
    date: req.body.date ? req.body.date : today,
  });
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const typeUser =
    newUser.type == "applicant"
      ? new Applicant({
          username: newUser.username,
          num_jobs: 0,
        })
      : new Recruiter({
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
router.post("/login", async (req, res) => {
  const userid = req.body.userid;
  const pass = req.body.password;

  // Find user by email or username
  // [{email}, {username}] same as [{'email':email}, {'username':username}]
  let user = await User.findOne({
    $or: [{ email: userid }, { username: userid }],
  });
  // Check if user email exists
  if (!user) {
    return res.status(401).json({
      error: "Email not found",
    });
  } else {
    const isAuthorized = await bcrypt.compare(pass, user.password);
    if (pass === user.password || isAuthorized) {
      const token = jwt.sign({ user }, "JWT_TOKEN_SECRET");
      console.log(token);
      res.status(200).json({
        token,
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

// GET request
// Get Current User Details
router.get("/getMyUser", auth, async (req, res) => {
  let curUser = req.user;
  return res.status(200).json({ user: curUser });
});

// GET request
// Get Current UserApplicant Details
router.get("/getMyUserApplicant", auth, async (req, res) => {
  let curUser = req.user;
  let curApplicant = await Applicant.findOne({ username: curUser.username });
  console.log(curApplicant);
  return res.status(200).send({ applicant: curApplicant });
});

// GET request
// Get Current UserApplicant Details
router.get("/getMyUserRecruiter", auth, async (req, res) => {
  let curUser = req.user;
  let curRecruiter = await Recruiter.findOne({ username: curUser.username });
  console.log(curRecruiter);
  return res.status(200).send({ recruiter: curRecruiter });
});

// POST request
// Token Validation
// router.post("/tokenIsValid", async (req, res) => {
//   try {
//     const token = req.header("x-auth-token");
//     if (!token) return res.json(false);
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     if (!verified) return res.json(false);
//     const user = await User.findById(verified.id);
//     if (!user) return res.json(false);
//     return res.json(true);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// POST request
// Login
// router.post("/logout", (req, res) => {
//   if (!req.session.user)
//     return res.status(500).json({ status: "No User Logged in" });
//   req.session.destroy((err) => {
//     res.status(500).json(err);
//   });
//   res.status(200).json({ status: "Logged Out successfully" });
// });

// POST request
// Update Name
router.post("/updateName", auth, (req, res) => {
  const username = req.user.username;
  const name = req.body.name;
  console.log(username, name);

  User.findOneAndUpdate({ username }, { name }, (err, result) => {
    err ? res.status(500).json({ err }) : res.status(200).json({ result });
  });
});

// POST request
// Update email
router.post("/updateEmail", auth, (req, res) => {
  const username = req.user.username;
  const email = req.body.email;
  console.log(username, email);
  User.findOneAndUpdate({ username }, { email }, (err, result) => {
    err ? res.status(500).json({ err }) : res.status(200).json({ result });
  });
});

// POST request
// Update number
router.post("/updateNumber", auth, (req, res) => {
  const username = req.user.username;
  const contact_number = req.body.number;
  console.log(username, contact_number);
  User.findOneAndUpdate({ username }, { contact_number }, (err, result) => {
    err ? res.status(500).json({ err }) : res.status(200).json({ result });
  });
});

module.exports = router;
