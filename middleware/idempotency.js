const db = require("../config/db");

const idempotencyMiddleware = (req, res, next) => {
  const key = req.headers["idempotency-key"];

  if (!key) {
    return res.status(400).json({ message: "Idempotency-Key required" });
  }

  const sql = "SELECT * FROM idempotency_keys WHERE idempotency_key = ?";

  db.query(sql, [key], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length > 0) {
      return res.json(JSON.parse(results[0].response));
    }

    req.idempotencyKey = key;
    next();
  });
};

module.exports = idempotencyMiddleware;

