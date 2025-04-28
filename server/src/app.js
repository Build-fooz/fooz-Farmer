const express = require("express");
const cors = require("cors");
const morgan = require('morgan'); // Add morgan for request logging
const helmet = require('helmet'); // Add helmet for security headers
const path = require('path'); // Add path module
const userRouter = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for simplicity in development
}));

// Request logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Middleware
app.use(express.json({ limit: '5mb' })); // Limit JSON payload size
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // React's default port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// API Routes
app.use("/api", userRouter);
app.use("/api", productRoutes);
app.use("/api", analyticsRoutes);

// Determine the client directory path - adjust for your project structure
const clientDistPath = path.resolve(__dirname, '../../client/dist');

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  console.log(`Serving static files from: ${clientDistPath}`);
  
  // Serve static files from the React app build directory
  app.use(express.static(clientDistPath));

  // Handle any requests that don't match the ones above
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // In development, handle non-API routes for testing SPA behavior
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next(); // Let API routes be handled by API handlers
    }
    res.redirect('http://localhost:5173' + req.path); // Redirect to Vite dev server
  });
}

// 404 handler for API routes only
app.use('/api/*', (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  // Set appropriate status code
  const statusCode = err.statusCode || 500;
  
  // Log the error (but not in test environment)
  if (process.env.NODE_ENV !== 'test') {
    console.error(`[${new Date().toISOString()}] ${err.stack}`);
  }
  
  // Send error response
  res.status(statusCode).json({ 
    success: false,
    message: statusCode === 500 && process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    error: process.env.NODE_ENV === 'production' ? undefined : err.name
  });
});

module.exports = app;
