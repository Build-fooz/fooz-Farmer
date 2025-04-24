const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    // Log auth header for debugging
    console.log("Auth header:", req.headers.authorization);
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.log("No token found in request");
      return res.status(401).json({ message: 'Authentication required' });
    }

    console.log("Verifying token...");
    const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    req.user = decoded;
    console.log("Token verified successfully for user:", decoded.userId || decoded.id);
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = { authenticateToken }; 