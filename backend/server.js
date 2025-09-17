const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

// Body parser
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err)); // <-- remove any "node server.js" after this line

// Import auth routes
const authRoutes = require("./routes/auth"); // make sure path is correct

// Mount routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
