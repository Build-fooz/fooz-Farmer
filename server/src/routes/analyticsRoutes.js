const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Debug route to check if analytics routes are accessible
router.get('/analytics-test', (req, res) => {
  res.json({ 
    message: 'Analytics routes are working correctly',
    timestamp: new Date().toISOString()
  });
});

// Get analytics for a specific user
router.get('/analytics/:userId', analyticsController.getUserAnalytics);

// Update analytics for a specific user
router.put('/analytics/:userId', analyticsController.updateAnalytics);

module.exports = router;

