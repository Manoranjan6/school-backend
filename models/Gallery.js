const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  imageUrl: String,
  year: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Gallery", gallerySchema);

const express = require("express");
const router = express.Router();

const Gallery = require("../models/Gallery");
const auth = require("../middleware/auth");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "school-gallery",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const upload = multer({ storage });


// 🔥 STEP 6 — UPLOAD IMAGE
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { year, category } = req.body;

    const newImage = new Gallery({
      imageUrl: req.file.path,
      year,
      category
    });

    await newImage.save();
    res.json(newImage);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 STEP 7 — GET IMAGES
router.get("/", async (req, res) => {
  const data = await Gallery.find().sort({ year: -1, createdAt: -1 });
  res.json(data);
});


// 🔥 STEP 8 — DELETE IMAGE
router.delete("/:id", auth, async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


module.exports = router;