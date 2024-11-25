const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const fareRoutes = require("./routes/fareRoutes");

// Use Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/fare", fareRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
