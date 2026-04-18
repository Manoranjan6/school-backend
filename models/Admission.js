const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },

  classSeeking: {
    type: String,
    required: true
  },

  dob: {
    type: Date,
    required: true
  },

  parentName: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },

  email: {
    type: String,
    lowercase: true,
    trim: true
  },

  presentSchool: String,

  message: String,

  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Admission", admissionSchema);