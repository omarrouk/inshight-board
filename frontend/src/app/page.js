import Link from "next/link";
import { FiTrendingUp, FiZap, FiLayers, FiArrowRight } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-6 animate-fade-in">
            <FiZap className="w-4 h-4" />
            <span className="text-sm font-medium">
              AI-Powered News Intelligence
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-up">
            Stay Ahead with InsightBoard
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up">
            Get personalized AI-powered summaries of the latest news in tech,
            business, and beyond. Never miss what matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              href="/dashboard"
              className="btn-primary px-8 py-3 text-lg inline-flex items-center gap-2 group"
            >
              Get Started
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/auth/login"
              className="btn-secondary px-8 py-3 text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="card hover:shadow-lg transition-shadow duration-300 animate-slide-up">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
              <FiTrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Access the latest news from trusted sources, updated in real-time
              across multiple categories.
            </p>
          </div>

          <div
            className="card hover:shadow-lg transition-shadow duration-300 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <FiZap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Summaries</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get concise, intelligent summaries of every article powered by
              advanced AI technology.
            </p>
          </div>

          <div
            className="card hover:shadow-lg transition-shadow duration-300 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <FiLayers className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Feed</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your experience with favorite topics, saved articles,
              and tailored preferences.
            </p>
          </div>
        </div>

        {/* Categories Preview */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {[
              "Technology",
              "Business",
              "Science",
              "Health",
              "Entertainment",
              "Sports",
            ].map((category) => (
              <Link
                key={category}
                href={`/dashboard?category=${category.toLowerCase()}`}
                className="category-badge bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-300 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-dark-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 InsightBoard. Built with Next.js, Express, and AI.</p>
        </div>
      </footer>
    </div>
  );
}
