const express = require("express");
const { getOrdersByFarmer, createOrder, getOrderById } = require("../controllers/orderController");
const router = express.Router();

router.get("/", getOrdersByFarmer); // Get orders for a farmer
router.post("/", createOrder); // Create new order
router.get("/:orderId", getOrderById); // Get specific order

module.exports = router;
