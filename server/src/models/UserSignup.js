const mongoose = require("mongoose");

const userSignupSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserSignup = mongoose.model("UserSignup", userSignupSchema);
module.exports = UserSignup;
