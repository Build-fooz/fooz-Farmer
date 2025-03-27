const mongoose = require("mongoose");
const Delivery = require("../models/Delivery");

// Get delivery details by ID
const getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔹 Check if `id` is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid delivery ID" });
    }

    const delivery = await Delivery.findById(id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.json(delivery);
  } catch (error) {
    console.error("Error fetching delivery:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Get all recent deliveries
const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getDeliveryById,
  getAllDeliveries,
};
