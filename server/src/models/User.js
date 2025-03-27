const mongoose = require("mongoose");

const { Schema } = mongoose; // Extract Schema from mongoose

const FarmerSchema = new Schema(
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
    farmLocation: {
      type: String,
      required: true,
    },
    farmSizeInAcres: {
      type: Number,
      required: true,
    },
    certificate: {
      type: new Schema({
        fileName: String,
        fileData: Buffer, // Store the file data
        contentType: String, // Store the MIME type
      }),
      required: true,
    },
    products: {
      type: [String],
      required: true,
      minLength: 1,
    },
  },
  { timestamps: true }
);

const Farmer = mongoose.model("Farmer", FarmerSchema);

module.exports = { Farmer };
