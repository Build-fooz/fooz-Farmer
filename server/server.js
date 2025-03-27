require("dotenv").config(); // Load env variables
const express = require("express");
const connectDB = require("./src/config/connectDB"); // Import DB connection
const app = require("./src/app");

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
