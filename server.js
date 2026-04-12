// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
// ======================
// ✅ MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// ✅ DATABASE CONNECTION
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// ======================
// ✅ ROUTES
// ======================
const admissionRoutes = require("./routes/admissionRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

app.use("/api/admissions", admissionRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/gallery", galleryRoutes);

// ======================
// ✅ DEFAULT ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("🚀 School Server is Running");
});

// ======================
// ✅ ERROR HANDLING
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// ======================
// ✅ START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});