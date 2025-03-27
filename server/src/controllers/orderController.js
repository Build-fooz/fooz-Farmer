const Order = require("../models/Order");

// ✅ Get order history for a specific farmer
const getOrdersByFarmer = async (req, res) => {
  try {
    const { farmerId } = req.query;

    // Check if farmerId is provided
    if (!farmerId) {
      return res.status(400).json({ message: "Farmer ID is required" });
    }

    const orders = await Order.find({ farmerId });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this farmer" });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Create a new order
const createOrder = async (req, res) => {
  try {
    const { farmerId, buyerId, product, quantity, price, status } = req.body;

    // Validate request body
    if (!farmerId || !buyerId || !product || !quantity || !price || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get details of a specific order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getOrdersByFarmer, createOrder, getOrderById };
