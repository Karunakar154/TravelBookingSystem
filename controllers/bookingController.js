const db = require("../config/db");

// ---------------- CREATE BOOKING ----------------
exports.createBooking = (req, res) => {
  const { user_id, destination_id } = req.body;

  if (!user_id || !destination_id) {
    return res.status(400).json({ message: "Missing data" });
  }

  const sql =
    "INSERT INTO bookings (user_id, destination_id) VALUES (?, ?)";

  db.query(sql, [user_id, destination_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "DB error" });
    }

    res.json({
      message: "Booking successful",
      bookingId: result.insertId,
    });
  });
};

// ---------------- GET BOOKINGS (FIXED SAFELY) ----------------
exports.getBookings = (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).json({ message: "user_id required" });
  }

  const sql = `
    SELECT 
      b.id,
      b.user_id,
      d.name AS destination,
      d.location,
      d.price
    FROM bookings b
    LEFT JOIN destinations d
      ON b.destination_id = d.id
    WHERE b.user_id = ?
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching bookings" });
    }

    res.json({
      data: results,
    });
  });
};

// ---------------- DELETE BOOKING ----------------
exports.deleteBooking = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM bookings WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting booking" });
    }

    res.json({ message: "Booking deleted" });
  });
};