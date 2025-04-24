const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    userId: { 
      type: String, 
      required: true 
    },
    productsListed: { 
      type: Number, 
      default: 0 
    },
    totalSales: { 
      type: Number, 
      default: 0 
    },
    activeOrders: { 
      type: Number, 
      default: 0 
    },
    cancelledOrders: { 
      type: Number, 
      default: 0 
    },
    draftListings: { 
      type: Number, 
      default: 0 
    },
    trendingProducts: [
      {
        name: { type: String },
        status: { type: String },
        demand: { type: String, enum: ['High', 'Medium', 'Low'] }
      }
    ],
    salesTrend: {
      labels: [String], // Time periods (e.g. months, weeks)
      data: [Number]    // Sales figures
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;


