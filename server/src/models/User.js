const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,  // URL to the file in cloud storage
  contentType: String,
});

const FarmerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 5,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: [10, "Phone number must be exactly 10 digits long"],
      maxlength: [10, "Phone number must be exactly 10 digits long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    // Password field removed as it's not needed
    farmLocation: {
      type: String,
      required: true,
    },
    farmSizeInAcres: {
      type: Number,
      required: true,
    },
    certificate: {
      type: CertificateSchema,
      required: true,
    },
    products: {
      type: [String],
      required: true,
      minLength: 1,
    },
    refreshToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Farmer = mongoose.model("Farmer", FarmerSchema);

module.exports = { Farmer };
