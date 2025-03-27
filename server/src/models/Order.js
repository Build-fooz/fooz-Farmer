const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  buyerId: { type: String, required: true },  // Ensure this field is present
  product: { type: String, required: true },  // Ensure this field is present
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
