const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicantSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  education: {
    type: Object,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  skills: {
    type: Array,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  num_jobs: {
    type: Number,
    required: true,
  },
});

module.exports = Applicant = mongoose.model("Applicants", ApplicantSchema);
