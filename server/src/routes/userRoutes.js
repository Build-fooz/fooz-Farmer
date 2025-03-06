const userRouter = require("express").Router();
const { createFarmer } = require("../controllers/userController");

const multer = require("multer");
const upload = multer();

userRouter.post("/farmer/register", upload.single("certificate"), createFarmer);

module.exports = userRouter;
