const router = require("express").Router();
const Notice = require("../models/Notice");
const auth = require("../middleware/auth");

// ➕ ADD NOTICE (ADMIN)
router.post("/", auth, async (req, res) => {
  const notice = new Notice(req.body);
  await notice.save();
  res.json(notice);
});

// 🔥 GET ACTIVE NOTICES (PUBLIC)
router.get("/", async (req, res) => {
  const now = new Date();

  const data = await Notice.find({
    startDate: { $lte: now },
    endDate: { $gte: now }
  }).sort({ createdAt: -1 });

  res.json(data);
});

// 🔒 GET ALL (ADMIN PANEL)
router.get("/all", auth, async (req, res) => {
  const data = await Notice.find().sort({ createdAt: -1 });
  res.json(data);
});

// ❌ DELETE
router.delete("/:id", auth, async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;