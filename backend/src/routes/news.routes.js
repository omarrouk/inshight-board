const express = require("express");
const router = express.Router();
const {
  getNews,
  searchNews,
  getByCategory,
  getArticleSummary,
} = require("../controllers/news.controller");

// Public routes
router.get("/", getNews);
router.get("/search", searchNews);
router.get("/categories/:category", getByCategory);
router.post("/summary", getArticleSummary);

module.exports = router;
