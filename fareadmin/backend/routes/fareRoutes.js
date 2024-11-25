const express = require("express");
const router = express.Router();

// Simulated fare setting
let fare = { pricePerKM: 2.0, lastUpdated: new Date().toLocaleDateString() };

// Get current fare
router.get("/", (req, res) => {
  res.json(fare);
});

// Update fare
router.post("/", (req, res) => {
  fare = { ...req.body, lastUpdated: new Date().toLocaleDateString() };
  res.status(200).json(fare);
});

module.exports = router;
