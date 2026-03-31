// LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../../Server/api/api";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ChevronRight,
  Facebook,
  ChevronLeft,
  Apple,
  Chrome,
} from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "This field is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "This field is required";
    }
    return newErrors;
  };

  // THIS IS THE ONLY PLACE THE API CALL SHOULD LIVE
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // No frontend validation – all validation happens on the backend (Zod)
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setIsSubmitting(true);

    try {
      // Send form data to backend registration endpoint
      const response = await fetch("/api/login", {
        // 👈 adjusted URL to match backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // ensures cookies are sent/received
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend returned an error (Zod validation or business logic)
        if (data.errors) {
          // Field‑specific errors (e.g., { email: "Invalid email" })
          setErrors(data.errors);
        } else {
          // General error message (e.g., "User already exists")
          setErrors({ server: data.message || "Registration failed" });
        }
        console.error("❌ Registration error:", data);
        return;
      }

      // ✅ Success: redirect to supplier dashboard
      console.log("🎉 Registration successful, redirecting to /supplier");
      navigate("/supplier");
    } catch (error) {
      // Network or unexpected error
      console.error("❌ Network error:", error);
      setErrors({ server: "Network error. Please check your connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-[#14a800]">Bid</span>
                <span className="text-2xl font-bold text-gray-900">Smart</span>
              </div>
            </div>
            <button className="text-sm text-gray-600 hover:text-[#14a800] font-medium">
              Help
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center text-sm font-bold text-gray-500 hover:text-[#108a00] mb-8"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </button>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-2">
              Log in to BidSmart
            </h1>
            {/* Server Error Message */}
            {errors.server && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 mb-4">
                {errors.server}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                className={`w-full px-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:border-[#14a800]`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors({ ...errors, password: null });
                  }}
                  className={`w-full px-4 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:border-[#14a800] pr-12`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#14a800] hover:bg-[#108700] text-white font-medium py-3.5 px-4 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                "Logging in..."
              ) : (
                <>
                  Log In <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          {/* ... Rest of your UI (Social buttons, etc) ... */}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
