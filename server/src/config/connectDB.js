const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://tushar:tushar@fooz-test.pu1s8.mongodb.net/?retryWrites=true&w=majority&appName=FOOZ-test";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
