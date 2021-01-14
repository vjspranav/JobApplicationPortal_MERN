const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact_number: {
        type: Number,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
});

module.exports = User = mongoose.model("Users", UserSchema);