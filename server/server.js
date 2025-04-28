// Load environment variables first
require('dotenv').config();

const app = require("./src/app");
const connectDB = require("./src/config/connectDB");

// Set environment-specific settings
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Validate essential environment variables
const requiredEnvVars = ['MONGODB_URI', 'AUTH_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

// Connect to MongoDB
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('✅ MongoDB connected successfully');

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running in ${NODE_ENV} mode on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('❌ UNHANDLED REJECTION! Shutting down...', err.name, err.message);
      console.error(err.stack);
      
      // Close server & exit process
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('❌ UNCAUGHT EXCEPTION! Shutting down...', err.name, err.message);
      console.error(err.stack);
      process.exit(1);
    });

    // Handle SIGTERM signal
    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
      server.close(() => {
        console.log('💤 Process terminated!');
      });
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
