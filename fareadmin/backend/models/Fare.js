const mongoose = require("mongoose");

const fareSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  updatedAt: { type: String, required: true },
  logs: [
    {
      previousFare: { type: Number, required: true },
      newFare: { type: Number, required: true },
      timestamp: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Fare", fareSchema);
