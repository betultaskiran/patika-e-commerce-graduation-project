const express = require("express");
const authController = require("../controllers/auth"); // Import without destructuring

const router = express.Router();

router.post("/login", authController.login); //login yolunda gelen POST isteğini yakalar
router.post("/register", authController.register);

module.exports = router;
