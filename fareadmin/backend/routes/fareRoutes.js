const express = require("express");
const router = express.Router();
const Fare = require("../models/Fare");

function generateFareId(logsLength) {
  return `FI-${String(logsLength + 1).padStart(3, "0")}`;
}

// Get current fare and logs
router.get("/", async (req, res) => {
  try {
    const fare = await Fare.findOne();
    if (!fare) {
      return res.json({ price: 0, updatedAt: "No data available", logs: [] });
    }
    res.json(fare);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fare data", error });
  }
});

// Update fare
router.post("/", async (req, res) => {
  try {
    const { price, updatedAt } = req.body;

    let fare = await Fare.findOne();
    if (!fare) {
      fare = new Fare({
        price,
        updatedAt,
        logs: [],
      });
    }

    const newLog = {
      previousFare: fare.price,
      newFare: price,
      timestamp: updatedAt,
      fareId: generateFareId(fare.logs.length),
    };

    fare.price = price;
    fare.updatedAt = updatedAt;
    fare.logs.push(newLog);

    const savedFare = await fare.save();
    res.status(201).json(savedFare);
  } catch (error) {
    res.status(500).json({ message: "Error updating fare", error });
  }
});

module.exports = router;
