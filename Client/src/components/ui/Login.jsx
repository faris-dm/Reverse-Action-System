// LoginPage.jsx
import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ChevronRight,
  Briefcase,
  Facebook,
  Apple,
  Chrome,
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login attempt:", { email, password, rememberMe });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Header - Exact Upwork style */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Left side with back button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Logo - Exact Upwork style */}
              <div className="flex items-center">
                <span className="text-2xl font-bold text-[#14a800]">Bid</span>
                <span className="text-2xl font-bold text-gray-900">Smart</span>
              </div>
            </div>

            {/* Right side - Help */}
            <button className="text-sm text-gray-600 hover:text-[#14a800] transition-colors font-medium">
              Help
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          {/* Welcome Text - Upwork style */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-2">
              Log in to BidSmart
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field - Upwork style */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  className={`w-full px-4 py-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:border-[#14a800] focus:ring-1 focus:ring-[#14a800] transition-colors text-base`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field - Upwork style */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors({ ...errors, password: null });
                  }}
                  className={`w-full px-4 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:border-[#14a800] focus:ring-1 focus:ring-[#14a800] transition-colors text-base pr-12`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-gray-600"
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

            {/* Forgot Password Link - Upwork style */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#14a800] hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button - Exact Upwork green */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#14a800] hover:bg-[#108700] text-white font-medium py-3.5 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Don't have an account link - Moved below login button */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button className="text-[#14a800] hover:underline font-medium">
                  Sign up
                </button>
              </p>
            </div>
          </form>

          {/* Divider - Upwork style */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm text-gray-500">or</span>
            </div>
          </div>

          {/* Social Login Buttons - Upwork style */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-gray-700 font-medium">
              <Chrome className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-gray-700 font-medium">
              <Facebook className="w-5 h-5 text-blue-600" />
              <span>Continue with Facebook</span>
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-gray-700 font-medium">
              <Apple className="w-5 h-5" />
              <span>Continue with Apple</span>
            </button>
          </div>

          {/* Terms - Upwork style */}
          <p className="text-xs text-gray-500 text-center mt-8 leading-relaxed">
            By signing in, you agree to our{" "}
            <button className="text-[#14a800] hover:underline">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-[#14a800] hover:underline">
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </main>

      {/* Footer - Clean and minimal */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-6">
          <div className="flex justify-center">
            <div className="text-sm text-gray-400">Powered by BidSmart</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
