const Article = require("../models/Article.model");
const gnewsService = require("../services/gnews.service");
const openRouterService = require("../services/openrouter.service");

/**
 * @desc    Get news articles
 * @route   GET /api/news
 * @access  Public
 */
exports.getNews = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;

    // Fetch from GNews
    const newsData = await gnewsService.getTopHeadlines({
      category,
      page: parseInt(page),
      pageSize: parseInt(limit),
    });

    // Process articles and add summaries
    const articlesWithSummaries = await Promise.all(
      newsData.articles.map(async (article) => {
        // Check if article exists in DB with summary
        let dbArticle = await Article.findOne({ articleId: article.articleId });

        if (dbArticle && dbArticle.summary) {
          return { ...article, summary: dbArticle.summary };
        }

        // Generate summary if not exists
        try {
          const summary = await openRouterService.generateSummary(article);

          // Save or update article with summary
          if (dbArticle) {
            dbArticle.summary = summary;
            dbArticle.summaryGeneratedAt = new Date();
            await dbArticle.save();
          } else {
            dbArticle = await Article.create({
              ...article,
              category: category || "general",
              summary,
              summaryGeneratedAt: new Date(),
            });
          }

          return { ...article, summary };
        } catch (error) {
          console.error("Summary generation failed:", error.message);
          return { ...article, summary: article.description };
        }
      })
    );

    res.status(200).json({
      status: "success",
      results: articlesWithSummaries.length,
      totalResults: newsData.totalResults,
      page: parseInt(page),
      data: {
        articles: articlesWithSummaries,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search news articles
 * @route   GET /api/news/search
 * @access  Public
 */
exports.searchNews = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        status: "error",
        message: "Search query is required",
      });
    }

    // Search using GNews
    const newsData = await gnewsService.searchArticles(q, {
      page: parseInt(page),
      pageSize: parseInt(limit),
    });

    res.status(200).json({
      status: "success",
      results: newsData.articles.length,
      totalResults: newsData.totalResults,
      page: parseInt(page),
      data: {
        articles: newsData.articles,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get news by category
 * @route   GET /api/news/categories/:category
 * @access  Public
 */
exports.getByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const validCategories = [
      "technology",
      "business",
      "science",
      "health",
      "entertainment",
      "sports",
      "general",
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid category",
      });
    }

    const newsData = await newsAPIService.getByCategory(category, {
      page: parseInt(page),
      pageSize: parseInt(limit),
    });

    res.status(200).json({
      status: "success",
      results: newsData.articles.length,
      totalResults: newsData.totalResults,
      category,
      page: parseInt(page),
      data: {
        articles: newsData.articles,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get article summary
 * @route   POST /api/news/summary
 * @access  Public
 */
exports.getArticleSummary = async (req, res, next) => {
  try {
    const { articleId, title, content, description } = req.body;

    if (!articleId) {
      return res.status(400).json({
        status: "error",
        message: "Article ID is required",
      });
    }

    // Check if summary exists in DB
    let article = await Article.findOne({ articleId });

    if (article && article.summary) {
      return res.status(200).json({
        status: "success",
        data: {
          summary: article.summary,
          cached: true,
        },
      });
    }

    // Generate new summary
    const summary = await openRouterService.generateSummary({
      title,
      content,
      description,
    });

    // Update or create article
    if (article) {
      article.summary = summary;
      article.summaryGeneratedAt = new Date();
      await article.save();
    }

    res.status(200).json({
      status: "success",
      data: {
        summary,
        cached: false,
      },
    });
  } catch (error) {
    next(error);
  }
};
