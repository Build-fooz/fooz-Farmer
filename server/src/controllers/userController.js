const { Farmer } = require("../models/User");
const jwt = require("jsonwebtoken");
const { generateOTP, verifyOTP } = require("../utils/sms");

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

    // TODO: Implement cloud storage for certificate file
    // 1. Upload the certificate to cloud storage (AWS S3, Google Cloud Storage, etc.)
    // 2. Get the URL of the uploaded file
    // 3. Store the URL in the database instead of the file buffer


    const newFarmer = new Farmer({
      fullName,
      phoneNumber: phone,
      email,
      // Password field removed
      farmLocation: location,
      farmSizeInAcres: farmSize,
      certificate: {
        fileName: certificate.originalname,
        fileUrl: "placeholder-url-for-cloud-storage", // This will be replaced with actual cloud URL
        contentType: certificate.mimetype,
      },
      products: JSON.parse(products),
    });

    // Save the farmer details to the database
    const newFarmerDocument = await newFarmer.save();

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
