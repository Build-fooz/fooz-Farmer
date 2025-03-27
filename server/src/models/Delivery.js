const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
  product: String,
  quantity: String,
  buyer: String,
  price: String,
  statuses: [
    {
      name: String,
      date: String,
    },
  ],
  recentDeliveries: [
    {
      id: String,
      date: String,
      status: String,
    },
  ],
});

const Delivery = mongoose.model("Delivery", DeliverySchema);

module.exports = Delivery;
