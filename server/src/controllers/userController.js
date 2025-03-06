const { Farmer } = require("../models/User");

/**
 * @author Tarang Patil
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<Farmer>}
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

module.exports = { createFarmer };
