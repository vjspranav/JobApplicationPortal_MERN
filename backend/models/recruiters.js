const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecruiterSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
});

module.exports = Recruiter = mongoose.model("Recruiters", RecruiterSchema);