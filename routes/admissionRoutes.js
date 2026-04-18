const express = require("express");
const router = express.Router();

const {
  createAdmission,
  getAdmissions
} = require("../controllers/admissionController");

router.post("/", createAdmission);
router.get("/", getAdmissions);

module.exports = router;