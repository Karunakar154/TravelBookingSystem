const express = require("express");
const router = express.Router();

const {
  addDestination,
  getDestinations,
} = require("../controllers/destinationController");

// ➤ ADD DESTINATION
router.post("/", addDestination);

// ➤ GET DESTINATIONS
router.get("/", getDestinations);

module.exports = router;