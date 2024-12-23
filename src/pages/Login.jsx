import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services-api/authApi";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure form values match before navigation
      if (formData.username !== "admin" || formData.password !== "admin") {
        message.error("Invalid credentials");
        return;
      }
      const { token } = await login(formData);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 animate-fade-in">
      {/* Left Side Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img
          src="/logo.jpg"
          alt="Car Cleaning Service"
          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent" />
      </div>

      {/* Right Side Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8 animate-slide-up">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-card">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-secondary-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-secondary-600">
              Sign in to access your dashboard and manage your services.
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-error-50 p-4 animate-bounce-slow">
              <p className="text-sm text-error-500 font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="username" className="block text-sm font-medium text-secondary-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-102 active:scale-95"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-secondary-600">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
