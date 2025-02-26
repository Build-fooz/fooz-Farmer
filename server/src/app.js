const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//Test route
app.get('/', (req, res) => {
    res.send("Hello FOOZ ! ")
})
module.exports = app;
