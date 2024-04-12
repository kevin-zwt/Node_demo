const router = require("express").Router();
const { authController } = require("../controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/resend-otp", authController.forgotPassword);

module.exports = router;
