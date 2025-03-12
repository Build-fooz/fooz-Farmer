const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    uuid: {      type: String,     unique: true,    required: true    },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Ensure ObjectId format
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    size: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    specialNotes: { type: String },
    sellTo: { type: String, required: true },
    isDraft: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
