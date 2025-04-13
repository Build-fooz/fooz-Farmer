require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/connectDB");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
