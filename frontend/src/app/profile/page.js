"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { userAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FiUser, FiMail, FiCalendar, FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to view your profile");
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const { data: profileData, isLoading } = useQuery(
    ["profile"],
    async () => {
      const response = await userAPI.getProfile();
      return response.data;
    },
    {
      enabled: isAuthenticated,
      onSuccess: (data) => {
        const userData = data.data?.user;
        setFormData({
          name: userData?.name || "",
          email: userData?.email || "",
        });
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userAPI.updateProfile(formData);
      if (response.data.status === "success") {
        updateUser(response.data.data.user);
        toast.success("Profile updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
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

  const userData = profileData?.data?.user;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="card">
          {/* Avatar Section */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-dark-border">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              {userData?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {userData?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {userData?.email}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-gray-200 dark:border-dark-border">
            <div className="text-center">
              <FiHeart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {userData?.favoritesCount || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Saved Articles
              </p>
            </div>
            <div className="text-center">
              <FiCalendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Member Since
              </p>
            </div>
            <div className="text-center">
              <FiUser className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {userData?.lastLogin
                  ? new Date(userData.lastLogin).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last Login
              </p>
            </div>
          </div>

          {/* Edit Profile Form */}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="pt-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: userData?.name || "",
                      email: userData?.email || "",
                    });
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="pt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
