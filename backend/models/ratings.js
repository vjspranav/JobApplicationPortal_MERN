const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./users");

// Create Job Rating Schema
const JobRatingSchema = new Schema({
  applicant: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

// Create User Rating Schema
const ApplicantRatingSchema = new Schema({
  applicant: {
    type: String,
    required: true,
  },
  recruiter: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = JobRating = mongoose.model("JobRatings", JobRatingSchema);
module.exports = ApplicantRating = mongoose.model(
  "ApplicantRatings",
  ApplicantRatingSchema
);
