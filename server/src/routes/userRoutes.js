const userRouter = require("express").Router();
const { createFarmer, loginFarmer } = require("../controllers/userController");

const multer = require("multer");
const upload = multer();

userRouter.post("/farmer/register", upload.single("certificate"), createFarmer);
userRouter.post("/farmer/login", loginFarmer);

module.exports = userRouter;
