const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 10,              // ONLY 3 requests

  message: {
    message: "Too many requests, slow down!",
  },
});
handler: (req, res) => {
  console.log("RATE LIMIT HIT");
  res.status(429).json({
    message: "Too many requests"
  });
}

module.exports = limiter;