const axios = require("axios");

class OpenRouterService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.baseURL = "https://openrouter.ai/api/v1";
    this.model = "meta-llama/llama-3.1-8b-instruct:free"; // Free model
  }

  /**
   * Generate AI summary for an article
   */
  async generateSummary(article) {
    try {
      if (!this.isConfigured()) {
        throw new Error("OpenRouter API key not configured");
      }

      const prompt = this.buildPrompt(article);

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: "system",
              content:
                "You are a professional news summarizer. Create concise, informative summaries of news articles in 2-3 sentences. Focus on the key facts and main points.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://insightboard.app",
            "X-Title": "InsightBoard",
          },
        }
      );

      const summary = response.data.choices[0].message.content.trim();
      return summary;
    } catch (error) {
      console.error("OpenRouter Error:", error.response?.data || error.message);

      // Fallback to basic summary if AI fails
      return this.generateFallbackSummary(article);
    }
  }

  /**
   * Build prompt for AI summarization
   */
  buildPrompt(article) {
    const content = article.content || article.description || "";
    return `Summarize this news article in 2-3 concise sentences:

Title: ${article.title}
Content: ${content.substring(0, 500)}

Provide a clear, informative summary focusing on the main points.`;
  }

  /**
   * Generate fallback summary when AI is unavailable
   */
  generateFallbackSummary(article) {
    if (article.description) {
      // Truncate description to approximately 2 sentences
      const sentences = article.description.split(". ");
      return (
        sentences.slice(0, 2).join(". ") + (sentences.length > 2 ? "..." : "")
      );
    }
    return "Summary not available.";
  }

  /**
   * Batch generate summaries for multiple articles
   */
  async generateBatchSummaries(articles, maxConcurrent = 3) {
    const results = [];

    for (let i = 0; i < articles.length; i += maxConcurrent) {
      const batch = articles.slice(i, i + maxConcurrent);
      const promises = batch.map((article) =>
        this.generateSummary(article).catch((err) => {
          console.error(
            `Failed to summarize article: ${article.title}`,
            err.message
          );
          return this.generateFallbackSummary(article);
        })
      );

      const batchResults = await Promise.all(promises);
      results.push(...batchResults);

      // Small delay between batches to avoid rate limits
      if (i + maxConcurrent < articles.length) {
        await this.delay(1000);
      }
    }

    return results;
  }

  /**
   * Helper delay function
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Validate API key
   */
  isConfigured() {
    return !!this.apiKey && this.apiKey !== "your_openrouter_api_key";
  }
}

module.exports = new OpenRouterService();
