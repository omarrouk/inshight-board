const { body, validationResult } = require("express-validator");

/**
 * Validation middleware wrapper
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Registration validation rules
 */
const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  validate,
];

/**
 * Login validation rules
 */
const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

/**
 * Update preferences validation
 */
const preferencesValidation = [
  body("categories")
    .optional()
    .isArray()
    .withMessage("Categories must be an array"),
  body("categories.*")
    .optional()
    .isIn([
      "technology",
      "business",
      "science",
      "health",
      "entertainment",
      "sports",
      "general",
    ])
    .withMessage("Invalid category"),
  body("theme")
    .optional()
    .isIn(["light", "dark"])
    .withMessage("Theme must be either light or dark"),
  body("language")
    .optional()
    .isIn(["en", "es", "fr", "de"])
    .withMessage("Invalid language code"),
  validate,
];

/**
 * Add favorite validation
 */
const favoriteValidation = [
  body("articleId").notEmpty().withMessage("Article ID is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("url").isURL().withMessage("Valid URL is required"),
  body("source").notEmpty().withMessage("Source is required"),
  validate,
];

module.exports = {
  registerValidation,
  loginValidation,
  preferencesValidation,
  favoriteValidation,
};
