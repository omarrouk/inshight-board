const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updatePassword,
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validation.middleware");

// Public routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

// Protected routes
router.get("/me", protect, getMe);
router.put("/password", protect, updatePassword);

module.exports = router;
