const db = require("../config/db");

// ---------------- REGISTER ----------------
exports.register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(sql, [email, password], (err) => {
    if (err) return res.status(500).json({ message: "DB error" });

    res.json({ message: "User registered successfully" });
  });
};

// ---------------- LOGIN ----------------
exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔥 IMPORTANT FIX
    res.json({
      message: "Login successful",
      token: "dummy-jwt-token",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  });
};

// ---------------- FORGOT PASSWORD ----------------
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User exists. Reset allowed." });
  });
};

// ---------------- RESET PASSWORD ----------------
exports.resetPassword = (req, res) => {
  const { email, newPassword } = req.body;

  const sql = "UPDATE users SET password = ? WHERE email = ?";

  db.query(sql, [newPassword, email], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Password updated successfully" });
  });
};