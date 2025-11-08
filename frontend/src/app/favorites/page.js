"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { userAPI } from "@/lib/api";
import { useAuthStore, useNewsStore } from "@/lib/store";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FiHeart, FiExternalLink, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function FavoritesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { favorites, setFavorites, removeFavorite } = useNewsStore();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to view favorites");
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const { isLoading } = useQuery(
    ["favorites"],
    async () => {
      const response = await userAPI.getFavorites();
      return response.data;
    },
    {
      enabled: isAuthenticated,
      onSuccess: (data) => {
        setFavorites(data.data?.favorites || []);
      },
    }
  );

  const handleRemoveFavorite = async (articleId) => {
    try {
      await userAPI.removeFavorite(articleId);
      removeFavorite(articleId);
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error("Failed to remove favorite");
      console.error("Remove favorite error:", error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FiHeart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Your Favorites
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Articles you've saved for later
          </p>
        </div>

        {/* Favorites List */}
        {isLoading ? (
          <LoadingSpinner size="lg" />
        ) : favorites.length === 0 ? (
          <div className="text-center py-16">
            <FiHeart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start saving articles you want to read later
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="btn-primary"
            >
              Browse News
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div
                key={favorite.articleId}
                className="card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="space-y-3">
                  {/* Source Badge */}
                  <span className="category-badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                    {favorite.source}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-3">
                    {favorite.title}
                  </h3>

                  {/* Saved Date */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Saved {new Date(favorite.savedAt).toLocaleDateString()}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={favorite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-primary text-center flex items-center justify-center gap-2"
                    >
                      Read Article
                      <FiExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleRemoveFavorite(favorite.articleId)}
                      className="p-2 rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Count */}
        {favorites.length > 0 && (
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            {favorites.length} saved{" "}
            {favorites.length === 1 ? "article" : "articles"}
          </div>
        )}
      </main>
    </div>
  );
}
