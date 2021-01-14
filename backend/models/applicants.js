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
    skills: {
        type: Array,
        required: false,
    },
});

module.exports = Applicant = mongoose.model("Applicants", ApplicantSchema);