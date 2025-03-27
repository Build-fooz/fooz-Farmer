const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("❌ MongoDB URI is missing in .env file!");
    }

    await mongoose.connect(uri); // No need for deprecated options

    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Stop server on DB failure
  }
};

module.exports = connectDB;
