const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true, //Will make it true
  },
  numApplications: {
    type: Number,
    required: true,
  },
  numPositions: {
    type: Number,
    required: true,
  },
  curNumApplications: {
    type: Number,
    required: true,
  },
  curNumPositions: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  skillset: {
    type: Array,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
});

module.exports = Job = mongoose.model("Jobs", JobSchema);
