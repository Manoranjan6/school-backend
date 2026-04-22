const express = require("express");
const router = express.Router();

const Admission = require("../models/Admission");
const Notice = require("../models/Notice");
const Gallery = require("../models/Gallery");

// GET dashboard stats
router.get("/stats", async (req, res) => {
  try {
    const totalAdmissions = await Admission.countDocuments();
    const totalNotices = await Notice.countDocuments();
    const totalImages = await Gallery.countDocuments();

    res.json({
      totalAdmissions,
      totalNotices,
      totalImages
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

module.exports = router;