const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ADD DESTINATION (Admin)
router.post("/destinations", (req, res) => {
  const { name, location, price } = req.body;

  const sql =
    "INSERT INTO destinations (name, location, price) VALUES (?, ?, ?)";

  db.query(sql, [name, location, price], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Destination added" });
  });
});

// DELETE DESTINATION
router.delete("/destinations/:id", (req, res) => {
  const sql = "DELETE FROM destinations WHERE id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Deleted successfully" });
  });
});

module.exports = router;