const { Farmer } = require("../models/User");
const jwt = require("jsonwebtoken");
const { generateOTP, verifyOTP } = require("../utils/sms");
const Analytics = require("../models/Analytics");
const { uploadCertificate } = require("../utils/fileUpload");

async function createFarmer(req, res) {
  const { fullName, phone, email, location, products, farmSize } = req.body;

  /** @type {Express.Multer.File | undefined} */
  const certificate = req.file;
  if (!certificate)
    return res.status(400).json({ message: "invalid farm certificate" });

  if (certificate.size > 5 * 1e6) {
    return res
      .status(400)
      .json({ message: "farm certificate must be less than 5MB" });
  }

  try {
    // Create a temporary ID to use for the certificate upload
    const tempId = Date.now().toString();
    
    // Upload certificate to cloud storage
    const certificateUrl = await uploadCertificate(certificate.buffer, tempId);
    console.log(`Certificate uploaded to: ${certificateUrl}`);

    const newFarmer = new Farmer({
      fullName,
      phoneNumber: phone,
      email,
      // Password field removed
      farmLocation: location,
      farmSizeInAcres: farmSize,
      certificate: {
        fileName: certificate.originalname,
        fileUrl: certificateUrl,
        contentType: certificate.mimetype,
      },
      products: JSON.parse(products),
    });

    // Save the farmer details to the database
    const newFarmerDocument = await newFarmer.save();
    
    // Now that we have the real farmer ID, we could update the certificate URL
    // with the real ID in a production implementation, but our mock doesn't need it

    // Create initial analytics record for the new farmer
    try {
      const initialAnalytics = new Analytics({
        userId: newFarmerDocument._id,
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
      });
      
      await initialAnalytics.save();
      console.log(`Analytics record created for farmer ${newFarmerDocument._id}`);
    } catch (analyticsError) {
      // Log the error but don't fail the registration
      console.error('Error creating analytics record:', analyticsError);
    }

    // Return the farmer document
    return res.json(newFarmerDocument);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }
}


async function loginFarmer(req, res) {
  const { phone } = req.body;

  try {
    const farmer = await Farmer.findOne({ phoneNumber: phone });
    if (!farmer) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      {
        userId: farmer._id,
        role: 'farmer'
      },
      process.env.AUTH_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: farmer._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // Store refresh token
    await Farmer.findByIdAndUpdate(farmer._id, { refreshToken });

    // Remove sensitive data
    const farmerData = farmer.toObject();
    delete farmerData.refreshToken;

    res.json({
      accessToken,
      refreshToken,
      user: farmerData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error" });
  }
}

async function sendOTP(req, res) {
  const { phone } = req.body;

  try {
    // Check if user exists
    const farmer = await Farmer.findOne({ phoneNumber: phone });
    if (!farmer) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate and send OTP
    const otp = generateOTP(phone);

    // In production, this would send an actual SMS
    console.log(`OTP for ${phone}: ${otp}`);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: "Server error" });
  }
}

async function handleOTPVerification(req, res) {
  const { phone, otp } = req.body;

  try {
    const isValid = verifyOTP(phone, otp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Find the user
    const farmer = await Farmer.findOne({ phoneNumber: phone });
    if (!farmer) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: farmer._id, role: 'farmer' },
      process.env.AUTH_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: farmer._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // Store refresh token
    await Farmer.findByIdAndUpdate(farmer._id, { refreshToken });

    // Remove sensitive data
    const farmerData = farmer.toObject();
    delete farmerData.refreshToken;
    // No need to delete fileData as we're using fileUrl now

    res.json({
      accessToken,
      refreshToken,
      user: farmerData
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: "Server error" });
  }
}

async function refreshToken(req, res) {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const farmer = await Farmer.findOne({
      _id: decoded.userId,
      refreshToken
    });

    if (!farmer) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { userId: farmer._id, role: 'farmer' },
      process.env.AUTH_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
}

module.exports = {
  createFarmer,
  loginFarmer,
  sendOTP,
  handleOTPVerification,
  refreshToken
};
