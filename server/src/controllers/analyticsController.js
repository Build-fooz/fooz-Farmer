const Analytics = require('../models/Analytics');
const Product = require('../models/Product');
const Draft = require('../models/Draft');
const Order = require('../models/Order');

// Get analytics for a specific user
exports.getUserAnalytics = async (req, res) => {
  try {
    console.log("Analytics API: Received request for user analytics", { userId: req.params.userId });
    const { userId } = req.params;
    
    if (!userId) {
      console.log("Analytics API: Missing userId parameter");
      return res.status(400).json({ message: 'User ID is required' });
    }

    console.log(`Analytics API: Looking for analytics for user ${userId}`);
    
    // Look for existing analytics or create new entry
    let analytics;
    try {
      analytics = await Analytics.findOne({ userId });
      console.log(`Analytics API: Analytics lookup result for ${userId}:`, analytics ? "Found" : "Not found");
    } catch (dbError) {
      console.error(`Analytics API: Database error looking up analytics for ${userId}`, dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    // If no analytics record exists, create one with default values
    if (!analytics) {
      console.log(`Analytics API: No analytics found for user ${userId}, creating default record`);
      
      // Set default values
      let defaultAnalytics = {
        userId,
        productsListed: 0,
        totalSales: 0,
        activeOrders: 0,
        cancelledOrders: 0,
        draftListings: 0,
        trendingProducts: [],
        salesTrend: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [0, 0, 0, 0]
        }
      };
      
      // Try to populate with real data if available
      try {
        // Get product count - only count active products
        const productsCount = await Product.countDocuments({ userId, status: 'active' });
        console.log(productsCount);
        if (productsCount) defaultAnalytics.productsListed = productsCount;
        
        // Get draft count
        const draftsCount = await Draft.countDocuments({ userId });
        if (draftsCount) defaultAnalytics.draftListings = draftsCount;
        
        // Try to get order data
        const orders = await Order.find({ userId });
        if (orders && orders.length > 0) {
          defaultAnalytics.activeOrders = orders.filter(order => 
            order.status === 'Pending' || order.status === 'Shipped'
          ).length;
          
          defaultAnalytics.cancelledOrders = orders.filter(order => 
            order.status === 'Cancelled'
          ).length;
          
          defaultAnalytics.totalSales = orders
            .filter(order => order.status === 'Delivered')
            .reduce((sum, order) => sum + (order.totalPrice || 0), 0);
        }
      } catch (dataError) {
        // Log error but continue with default values
        console.error('Analytics API: Error getting data for analytics:', dataError);
      }
      
      // Create and save the new analytics record
      try {
        analytics = new Analytics(defaultAnalytics);
        await analytics.save();
        console.log(`Analytics API: Created new analytics record for ${userId}`);
      } catch (saveError) {
        console.error(`Analytics API: Error saving new analytics for ${userId}:`, saveError);
        throw new Error(`Error saving analytics: ${saveError.message}`);
      }
    }

    console.log(`Analytics API: Successfully returning analytics for ${userId}`);
    return res.status(200).json(analytics);
  } catch (error) {
    console.error('Analytics API: Error in getUserAnalytics:', error);
    // Return a default structure even in case of error
    return res.status(200).json({
      userId: req.params.userId,
      productsListed: 0,
      totalSales: 0,
      activeOrders: 0,
      cancelledOrders: 0,
      draftListings: 0,
      trendingProducts: [],
      salesTrend: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [0, 0, 0, 0]
      },
      error: true,
      errorMessage: error.message || 'An error occurred while fetching analytics'
    });
  }
};

// Update analytics data (typically called by background job or after relevant events)
exports.updateAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Collect updated data from other collections
    const productsCount = await Product.countDocuments({ userId, status: 'active'  });
    const draftsCount = await Draft.countDocuments({ userId });

    // For orders, handle potential absence of Order model or empty collection
    let activeOrders = 0;
    let cancelledOrders = 0;
    let totalSales = 0;
    let trendingProducts = [];
    
    try {
      const orders = await Order.find({ userId });
      
      if (orders && orders.length > 0) {
        activeOrders = orders.filter(order => 
          order.status === 'Pending' || order.status === 'Shipped'
        ).length;
        
        cancelledOrders = orders.filter(order => 
          order.status === 'Cancelled'
        ).length;
        
        totalSales = orders
          .filter(order => order.status === 'Delivered')
          .reduce((sum, order) => sum + (order.totalPrice || 0), 0);
          
        // Create trending products data
        const productCounts = {};
        orders.forEach(order => {
          if (order.productName) {
            if (productCounts[order.productName]) {
              productCounts[order.productName]++;
            } else {
              productCounts[order.productName] = 1;
            }
          }
        });
        
        trendingProducts = Object.entries(productCounts)
          .map(([name, count]) => ({
            name,
            status: count > 5 ? 'High Demand' : count > 2 ? 'Trending' : 'Normal',
            demand: count > 5 ? 'High' : count > 2 ? 'Medium' : 'Low'
          }))
          .sort((a, b) => {
            const demandOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return demandOrder[b.demand] - demandOrder[a.demand];
          })
          .slice(0, 5);
      }
    } catch (error) {
      console.error('Error processing orders data:', error);
      // Continue with default values if Order model doesn't exist or other errors
    }

    // Update or create analytics
    const updatedAnalytics = await Analytics.findOneAndUpdate(
      { userId },
      { 
        productsListed: productsCount,
        totalSales,
        activeOrders,
        cancelledOrders,
        draftListings: draftsCount,
        trendingProducts,
        lastUpdated: new Date()
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: 'Analytics updated successfully',
      analytics: updatedAnalytics
    });
  } catch (error) {
    console.error('Error updating analytics:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


