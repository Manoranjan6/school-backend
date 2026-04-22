const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: Number,
  gender: String,
  qualification: String,
  bedStatus: String,
  experience: Number,
  currentlyWorking: String,
  experienceDetails: String,
  message: String,

  resume: String,

  status: {
    type: String,
    enum: ["new", "reviewed", "selected", "rejected"],
    default: "new"
  }

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);