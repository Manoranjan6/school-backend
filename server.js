// ======================
// ✅ LOAD ENV
// ======================
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// ======================
// ✅ MIDDLEWARE
// ======================
app.use(cors({
  origin: process.env.CLIENT_URL || "*", // 🔐 restrict in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" })); // 🔥 prevent payload abuse


// ======================
// ✅ DATABASE CONNECTION (ROBUST)
// ======================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "schooldb"
    });

    console.log("✅ MongoDB Connected");

  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1); // 🔥 stop server if DB fails
  }
};

connectDB();


// ======================
// ✅ ROUTES
// ======================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admissions", require("./routes/admissionRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));


// ======================
// ✅ HEALTH CHECK
// ======================
app.get("/", (req, res) => {
  res.send("🚀 School Server is Running");
});


// ======================
// ❌ 404 HANDLER (YOU MISSED THIS)
// ======================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


// ======================
// ❌ GLOBAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});


// ======================
// ✅ START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
  console.log(`🌐 https://school-backend-yk3x.onrender.com:${PORT}`);
});

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);
app.use("/uploads", express.static("uploads"));
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);