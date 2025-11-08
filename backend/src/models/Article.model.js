const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    articleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    source: {
      id: String,
      name: String,
    },
    author: String,
    title: {
      type: String,
      required: true,
    },
    description: String,
    url: {
      type: String,
      required: true,
    },
    urlToImage: String,
    publishedAt: {
      type: Date,
      required: true,
    },
    content: String,
    category: {
      type: String,
      enum: [
        "technology",
        "business",
        "science",
        "health",
        "entertainment",
        "sports",
        "general",
      ],
      default: "general",
    },
    summary: {
      type: String,
      default: null,
    },
    summaryGeneratedAt: Date,
    metadata: {
      fetchedAt: {
        type: Date,
        default: Date.now,
      },
      views: {
        type: Number,
        default: 0,
      },
      saves: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
articleSchema.index({ publishedAt: -1 });
articleSchema.index({ category: 1, publishedAt: -1 });
articleSchema.index({ title: "text", description: "text" });

// Virtual for age of article
articleSchema.virtual("age").get(function () {
  const now = new Date();
  const published = new Date(this.publishedAt);
  const diff = now - published;
  const hours = Math.floor(diff / 3600000);

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return published.toLocaleDateString();
});

// Method to increment views
articleSchema.methods.incrementViews = function () {
  this.metadata.views += 1;
  return this.save();
};

// Method to increment saves
articleSchema.methods.incrementSaves = function () {
  this.metadata.saves += 1;
  return this.save();
};

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
