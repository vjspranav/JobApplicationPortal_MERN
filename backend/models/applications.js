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
    type: Number,
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
});

module.exports = Application = mongoose.model(
  "Applications",
  ApplicationSchema
);
