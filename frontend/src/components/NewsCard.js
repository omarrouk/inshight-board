"use client";

import { useState } from "react";
import {
  formatRelativeTime,
  getCategoryColor,
  truncateText,
} from "@/lib/utils";
import { FiHeart, FiExternalLink, FiClock } from "react-icons/fi";
import Image from "next/image";

export default function NewsCard({
  article,
  onFavoriteToggle,
  isFavorited = false,
}) {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-300 animate-slide-up">
      {/* Image */}
      <div className="relative h-48 -mx-6 -mt-6 mb-4 rounded-t-xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-600">
        {article.urlToImage && !imageError ? (
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover"
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
            {article.source?.name || "News"}
          </div>
        )}

        {/* Favorite Button */}
        {onFavoriteToggle && (
          <button
            onClick={() => onFavoriteToggle(article)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm hover:scale-110 transition-transform"
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            <FiHeart
              className={`w-5 h-5 ${
                isFavorited
                  ? "fill-red-500 text-red-500"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Meta Info */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`category-badge ${getCategoryColor(article.category)}`}
          >
            {article.source?.name || article.category || "News"}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <FiClock className="w-4 h-4" />
            {formatRelativeTime(article.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
          {article.title}
        </h3>

        {/* Author */}
        {article.author && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By {article.author}
          </p>
        )}

        {/* Description */}
        {article.description && (
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
            {article.description}
          </p>
        )}

        {/* AI Summary */}
        {article.summary && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border-l-4 border-blue-500">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">
              AI Summary
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {isExpanded
                ? article.summary
                : truncateText(article.summary, 150)}
            </p>
            {article.summary.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}

        {/* Read More Link */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
        >
          Read full article
          <FiExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
