const express = require("express");
const router = express.Router();

// Simulated database for users
let users = [
  { id: "US-001", name: "John Doe", email: "johndoe@gmail.com", phone: "09654871365", address: "Brgy. Fatima", dateCreated: "01/04/2024", dateUpdated: "04/01/2024" },
  { id: "US-002", name: "Jane Smith", email: "janes@gmail.com", phone: "09687451235", address: "Brgy. Fatima", dateCreated: "01/04/2024", dateUpdated: "04/01/2024" },
];

// Get all users
router.get("/", (req, res) => {
  res.json(users);
});

// Add a new user
router.post("/", (req, res) => {
  const newUser = { ...req.body, id: `US-${Date.now()}` };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Delete a user
router.delete("/:id", (req, res) => {
  users = users.filter(user => user.id !== req.params.id);
  res.status(200).json({ message: "User deleted successfully" });
});

module.exports = router;
