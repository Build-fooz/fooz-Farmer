const { Farmer } = require("../models/User");
const crypto = require("crypto");
const jwtLib = require("jsonwebtoken");
const { verifyOTP } = require("../utils/sms");

/**
 * @author Tarang Patil
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
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

  const newFarmer = new Farmer({
    fullName,
    phoneNumber: phone,
    email,
    farmLocation: location,
    farmSizeInAcres: farmSize,
    certificate: {
      fileName: certificate.originalname,
      fileData: certificate.buffer,
      contentType: certificate.mimetype,
    },
    products: JSON.parse(products),
  });

  try {
    const newFarmerDocument = await newFarmer.save();
    newFarmerDocument.certificate.fileData = undefined;
    return res.json(newFarmerDocument);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }
}

/**
 * @author Tarang Patil
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
async function loginFarmer(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "invalid email" });

  const farmer = await Farmer.findOne({ email });
  delete farmer.certificate.fileData;
  farmer.certificate.fileData = undefined;

  if (!(await verifyOTP(farmer._id)))
    return res.status(400).json({ message: "invalid otp" });

  const jwt = jwtLib.sign(
    {
      email: farmer.email,
      phoneNumber: farmer.phoneNumber,
      fullName: farmer.fullName,
    },
    process.env.AUTH_TOKEN_SECRET,
    { expiresIn: "3 days" }
  );

  return res.json({ jwt });
}

module.exports = { createFarmer, loginFarmer };
