const express = require("express");
const router = express.Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
  updatePreferences,
  getProfile,
  updateProfile,
} = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");
const {
  preferencesValidation,
  favoriteValidation,
} = require("../middleware/validation.middleware");

// All routes are protected
router.use(protect);

// Favorites
router.get("/favorites", getFavorites);
router.post("/favorites", favoriteValidation, addFavorite);
router.delete("/favorites/:articleId", removeFavorite);

// Preferences
router.put("/preferences", preferencesValidation, updatePreferences);

// Profile
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

module.exports = router;
