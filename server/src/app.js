const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const productRoutes = require("./routes/productRoutes");



const app = express();

// ✅ Middleware
app.use(cors({ origin: "*" })); // Allow all origins for testing
app.use(express.json());

// ✅ Connect to Database
connectDB();

// ✅ Routes
app.use("/api", productRoutes);




module.exports = app;
