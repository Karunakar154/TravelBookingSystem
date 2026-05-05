require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- RATE LIMITER ----------------
const limiter = require("./middleware/rateLimiter");
app.use(limiter);

// ---------------- ROUTES ----------------
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/destinations", destinationRoutes);
app.use("/bookings", bookingRoutes);

// ---------------- TEST ROUTE ----------------
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 🔥 OPTIONAL DEBUG (SAFE WAY)
console.log("🔥 SERVER STARTED");