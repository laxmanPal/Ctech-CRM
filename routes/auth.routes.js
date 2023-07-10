const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/auth.controllers")
const authMiddleware = require("../middleware/auth.middleware");
const { loginValidation } = require("../utils/validations");

router.get("/" , authMiddleware.isLogedIn , authController.getLogin )

router.post("/login" , loginValidation , authController.login)

router.get("/logout", authController.getLogout);


module.exports = router;