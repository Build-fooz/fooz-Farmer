const express = require("express");
const { getDeliveryById, getAllDeliveries } = require("../controllers/deliveryController");
const router = express.Router();

router.get("/", getAllDeliveries); // Get all deliveries
router.get("/:id", getDeliveryById); // Get delivery by ID

module.exports = router;
