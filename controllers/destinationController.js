const db = require("../config/db");
const crypto = require("crypto");

// ➤ ADD DESTINATION
exports.addDestination = (req, res) => {
  const { name, location, price } = req.body;

  const sql =
    "INSERT INTO destinations (name, location, price) VALUES (?, ?, ?)";

  db.query(sql, [name, location, price], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Destination added" });
  });
};

// ➤ GET DESTINATIONS (FIXED PAGINATION)
exports.getDestinations = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  const countSql = "SELECT COUNT(*) AS total FROM destinations";
  const dataSql = "SELECT * FROM destinations LIMIT ? OFFSET ?";

  db.query(countSql, (err, countResult) => {
    if (err) return res.status(500).json(err);

    const total = countResult[0].total;

    db.query(dataSql, [limit, offset], (err, results) => {
      if (err) return res.status(500).json(err);

      const etag = crypto
        .createHash("md5")
        .update(JSON.stringify(results))
        .digest("hex");

      res.setHeader("ETag", etag);

      if (req.headers["if-none-match"] === etag) {
        return res.status(304).end();
      }

      res.json({
        page,
        limit,
        total, // ✅ IMPORTANT FIX
        data: results,
      });
    });
  });
};
console.log("🔥 DESTINATION CONTROLLER ACTIVE");