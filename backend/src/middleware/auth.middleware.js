const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

/**
 * Middleware to protect routes - requires valid JWT token
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Not authorized to access this route. Please login.",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          status: "error",
          message: "User not found. Token is invalid.",
        });
      }

      if (!req.user.isActive) {
        return res.status(401).json({
          status: "error",
          message: "User account is deactivated.",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        status: "error",
        message: "Not authorized. Token is invalid or expired.",
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Generate JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

module.exports = { protect, generateToken };
