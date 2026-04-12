const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  studentName: String,
  classSeeking: String,
  dob: String,
  parentName: String,
  phone: String,
  email: String,
  presentSchool: String,
  message: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Admission", admissionSchema);