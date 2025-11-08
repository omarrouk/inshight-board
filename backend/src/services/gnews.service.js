const axios = require("axios");

class GNewsService {
  constructor() {
    this.apiKey = process.env.GNEWS_API_KEY;
    this.baseURL = "https://gnews.io/api/v4";
  }

  /**
   * Fetch top headlines
   */
  async getTopHeadlines(options = {}) {
    try {
      const { category, country = "us", pageSize = 20, page = 1 } = options;

      const params = {
        apikey: this.apiKey,
        lang: "en",
        country,
        max: pageSize,
      };

      if (category) {
        params.category = category;
      }

      const response = await axios.get(`${this.baseURL}/top-headlines`, {
        params,
        headers: {
          "User-Agent": "InsightBoard/1.0",
          Accept: "application/json",
        },
        timeout: 10000,
      });

      return {
        status: "success",
        totalResults: response.data.totalArticles,
        articles: response.data.articles.map((article) =>
          this.formatArticle(article)
        ),
      };
    } catch (error) {
      console.error("GNews Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.errors?.[0] || "Failed to fetch news from GNews"
      );
    }
  }

  /**
   * Search for articles
   */
  async searchArticles(query, options = {}) {
    try {
      const { pageSize = 20, page = 1, sortBy = "publishedAt" } = options;

      const params = {
        apikey: this.apiKey,
        q: query,
        max: pageSize,
        lang: "en",
        sortby: sortBy,
      };

      const response = await axios.get(`${this.baseURL}/search`, {
        params,
        headers: {
          "User-Agent": "InsightBoard/1.0",
          Accept: "application/json",
        },
        timeout: 10000,
      });

      return {
        status: "success",
        totalResults: response.data.totalArticles,
        articles: response.data.articles.map((article) =>
          this.formatArticle(article)
        ),
      };
    } catch (error) {
      console.error(
        "GNews Search Error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.errors?.[0] || "Failed to search news from GNews"
      );
    }
  }

  /**
   * Format article to match our schema
   */
  formatArticle(article) {
    return {
      articleId: this.generateArticleId(article),
      source: {
        id: null,
        name: article.source.name,
      },
      author: article.source.name,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image,
      publishedAt: article.publishedAt,
      content: article.content,
    };
  }

  /**
   * Generate unique article ID
   */
  generateArticleId(article) {
    const str = `${article.title}-${article.publishedAt}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString();
  }
}

module.exports = new GNewsService();
