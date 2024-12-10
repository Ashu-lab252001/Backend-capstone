const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    logoURL: {
        type: String,
        required: true,
    },
    jobPosition: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
        enum: ["full-time", "part-time", "contract", "internship", "freelance"],
    },
    remote: {
        type: Boolean,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    aboutCompany: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

module.exports = mongoose.model("Job", jobSchema);

