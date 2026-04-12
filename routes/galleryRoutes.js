const express = require("express");
const router = express.Router();

const Gallery = require("../models/Gallery");
const auth = require("../middleware/auth");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "school-gallery",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const upload = multer({ storage });


// 🔥 UPLOAD IMAGE
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { year, category } = req.body;

    const newImage = new Gallery({
      imageUrl: req.file.path,
      public_id: req.file.filename, // 🔥 IMPORTANT
      year,
      category
    });

    await newImage.save();
    res.json(newImage);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 GET ALL IMAGES
router.get("/", async (req, res) => {
  const data = await Gallery.find().sort({ year: -1, createdAt: -1 });
  res.json(data);
});


// 🔥 DELETE IMAGE (CLOUD + DB)
router.delete("/:id", auth, async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) return res.status(404).json({ message: "Not found" });

    // 🔥 DELETE FROM CLOUDINARY
    await cloudinary.uploader.destroy(image.public_id);

    // 🔥 DELETE FROM DB
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted from cloud + DB" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;