const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },

  startDate: { type: Date, required: true }, // when it shows
  endDate: { type: Date, required: true },   // when it hides

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notice", noticeSchema);