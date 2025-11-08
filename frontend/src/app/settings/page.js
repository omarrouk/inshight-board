"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { userAPI } from "@/lib/api";
import { useAuthStore, useThemeStore } from "@/lib/store";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FiSettings, FiSun, FiMoon, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";

const CATEGORIES = [
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
  { value: "entertainment", label: "Entertainment" },
  { value: "sports", label: "Sports" },
  { value: "general", label: "General" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [preferences, setPreferences] = useState({
    categories: [],
    theme: "light",
    language: "en",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to access settings");
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const { isLoading } = useQuery(
    ["profile"],
    async () => {
      const response = await userAPI.getProfile();
      return response.data;
    },
    {
      enabled: isAuthenticated,
      onSuccess: (data) => {
        const userPrefs = data.data?.user?.preferences;
        if (userPrefs) {
          setPreferences({
            categories: userPrefs.categories || [],
            theme: userPrefs.theme || "light",
            language: userPrefs.language || "en",
          });
        }
      },
    }
  );

  const handleCategoryToggle = (category) => {
    setPreferences((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await userAPI.updatePreferences(preferences);
      if (response.data.status === "success") {
        updateUser({ preferences: response.data.data.preferences });
        toast.success("Settings saved successfully");
      }
    } catch (error) {
      toast.error("Failed to save settings");
      console.error("Settings save error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
        <Header />
        <LoadingSpinner fullScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FiSettings className="w-8 h-8 text-gray-700 dark:text-gray-300" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Settings
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your InsightBoard experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Appearance
            </h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Theme
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      if (theme !== "light") toggleTheme();
                      setPreferences((prev) => ({ ...prev, theme: "light" }));
                    }}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      theme === "light"
                        ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-300 dark:border-dark-border hover:border-primary-400"
                    }`}
                  >
                    <FiSun className="w-6 h-6 mx-auto mb-2" />
                    <span className="block text-sm font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => {
                      if (theme !== "dark") toggleTheme();
                      setPreferences((prev) => ({ ...prev, theme: "dark" }));
                    }}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      theme === "dark"
                        ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-300 dark:border-dark-border hover:border-primary-400"
                    }`}
                  >
                    <FiMoon className="w-6 h-6 mx-auto mb-2" />
                    <span className="block text-sm font-medium">Dark</span>
                  </button>
                </div>
              </label>
            </div>
          </div>

          {/* Category Preferences */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Preferred Categories
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select the categories you're most interested in
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryToggle(category.value)}
                  className={`p-3 rounded-lg border-2 transition-colors flex items-center justify-between ${
                    preferences.categories.includes(category.value)
                      ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                      : "border-gray-300 dark:border-dark-border hover:border-primary-400 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="text-sm font-medium">{category.label}</span>
                  {preferences.categories.includes(category.value) && (
                    <FiCheck className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  )}
                </button>
              ))}
            </div>
            {preferences.categories.length === 0 && (
              <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                Please select at least one category
              </p>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading || preferences.categories.length === 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
