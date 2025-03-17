const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(userRouter);

app.use("/api", productRoutes);

//Test route
app.get("/", (req, res) => {
  res.send("Hello FOOZ ! ");
});
module.exports = app;
