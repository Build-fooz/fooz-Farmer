const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const deliveryRouter = require("./routes/deliveryRoutes");  // Import delivery routes
const orderRouter = require("./routes/orderRoutes");        // Import order routes



const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(userRouter);         // Users API
app.use("/api/deliveries", deliveryRouter); // Deliveries API
app.use("/api/orders", orderRouter);       // Orders API

// Test route
app.get("/", (req, res) => {
  res.send("Hello FOOZ!");
});

module.exports = app;
