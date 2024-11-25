const express = require("express");
const router = express.Router();

// Simulated database for admins
let admins = [
  { id: "AP-001", name: "Carl Bismar", email: "cbismar@gmail.com", phone: "09654871365", address: "Brgy. Fatima", dateCreated: "01/04/2024", dateUpdated: "04/01/2024" },
];

// Get all admins
router.get("/", (req, res) => {
  res.json(admins);
});

// Add an admin
router.post("/", (req, res) => {
  const newAdmin = { ...req.body, id: `AP-${Date.now()}` };
  admins.push(newAdmin);
  res.status(201).json(newAdmin);
});

// Delete an admin
router.delete("/:id", (req, res) => {
  admins = admins.filter((admin) => admin.id !== req.params.id);
  res.status(200).json({ message: "Admin deleted successfully" });
});

module.exports = router;
