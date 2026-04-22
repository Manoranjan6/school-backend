const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const multer = require("multer");

// 🔥 FILE FILTER (IMPORTANT)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only PDF/DOC allowed"));
    }

    cb(null, true);
  }
});


// =====================
// CREATE JOB
// =====================
router.post("/", upload.single("resume"), async (req, res) => {
  try {

    if (!req.body.name) {
      return res.status(400).json({ message: "Name required" });
    }

    const job = new Job({
      ...req.body,
      resume: req.file ? req.file.path : ""
    });

    await job.save();

    res.json({ message: "Application submitted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =====================
// GET JOBS
// =====================
router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});


// =====================
// UPDATE STATUS
// =====================
router.put("/:id", async (req, res) => {
  await Job.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.json({ message: "Updated" });
});


// =====================
// DELETE
// =====================
router.delete("/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;