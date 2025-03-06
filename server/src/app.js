const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(userRouter);

//Test route
app.get("/", (req, res) => {
  res.send("Hello FOOZ ! ");
});
module.exports = app;
