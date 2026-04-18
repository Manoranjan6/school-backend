const Admission = require("../models/Admission");

// CREATE
exports.createAdmission = async (req, res) => {
  try {
    const data = new Admission(req.body);
    await data.save();

    res.status(201).json({
      success: true,
      message: "Admission submitted successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// GET ALL
exports.getAdmissions = async (req, res) => {
  try {
    const data = await Admission.find().sort({ submittedAt: -1 });

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};