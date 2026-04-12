const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Received:", username, password);

    // find admin
    const admin = await Admin.findOne({ username, password });

    console.log("Found admin:", admin);

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;