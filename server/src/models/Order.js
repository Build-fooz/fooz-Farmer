const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    customerName: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    deliveryAddress: { type: String },
    notes: { type: String },
    paymentStatus: { 
      type: String,
      enum: ['Unpaid', 'Paid', 'Refunded'],
      default: 'Unpaid'
    }
  },
  { timestamps: true }
);

// Prevent re-registration using mongoose.models
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
