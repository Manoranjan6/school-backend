const router = require("express").Router();
const Admission = require("../models/Admission");
const auth = require("../middleware/auth");

// SUBMIT FORM (PUBLIC)
router.post("/", async (req, res) => {
  const data = new Admission(req.body);
  await data.save();
  res.json({ message: "Saved" });
});

// GET ALL (ADMIN ONLY)
router.get("/", auth, async (req, res) => {
  const data = await Admission.find().sort({ submittedAt: -1 });
  res.json(data);
});

module.exports = router;
const exportAdmissions = require("../utils/exportExcel");

// Export route (PROTECTED)
router.get("/export", auth, async (req, res) => {
  const data = await Admission.find().sort({ submittedAt: -1 });
  exportAdmissions(data, res);
});
