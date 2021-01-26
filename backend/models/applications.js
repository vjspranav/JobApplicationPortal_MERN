const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
  recruiter: {
    type: String,
    required: true,
  },
  applicant: {
    type: String,
    required: true,
  },
  job_id: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  sop: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
});

module.exports = Application = mongoose.model(
  "Applications",
  ApplicationSchema
);
