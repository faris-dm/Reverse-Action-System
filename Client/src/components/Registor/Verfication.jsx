
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Check,
  TrendingDown,
} from "lucide-react";

const BuyerRegistor = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  // Check whether the user is already logged in.
  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:21000/api/auth/status",
          { credentials: "include" }
        );

        if (!response.ok || cancelled) return;

        const data = await response.json();

        if (cancelled) return;

        if (data.role === "admin") {
          navigate("/admin", { replace: true });
        } else if (data.role === "buyer") {
          navigate("/buyer", { replace: true });
        } else if (data.role) {
          navigate("/supplier", { replace: true });
        }
      } catch (error) {
        // If the status endpoint is unavailable, keep the
        // registration form accessible.
        console.error("Authentication check failed:", error);
      }
    };

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // Handle all inputs, including the checkbox.
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      server: "",
    }));
  };

  // Validate before sending anything to the backend.
  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Register the buyer.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(
        "http://localhost:21000/api/BuyerRegistor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          // Do not send confirmPassword or termsAccepted
          // unless your backend specifically requires them.
          body: JSON.stringify({
            username: formData.username.trim(),
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      // Handle responses that are not JSON as well.
      let data = {};

      try {
        data = await response.json();
      } catch {
        // Leave data empty if the server returns no JSON.
      }

      if (!response.ok) {
        if (data.errors && typeof data.errors === "object") {
          setErrors(data.errors);
        } else {
          setErrors({
            server: data.message || "Registration failed. Please try again.",
          });
        }

        return;
      }

      // Registration succeeded. Carry the email to the email page.
      navigate("/email", {
        replace: true,
        state: {
          email: formData.email.trim(),
          userId: data.userId || data.user?.id || data.id || null,
        },
      });
    } catch (error) {
      console.error("Registration request failed:", error);

      setErrors({
        server:
          "Unable to connect to the server. Check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative font-sans text-[#001e00] overflow-x-hidden bg-[#f7faf7]">
      {/* Background Wave Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-[450px] opacity-40"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#108a00"
            fillOpacity="0.05"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,0L0,0Z"
          >
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
                M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,0L0,0Z;
                M0,120L48,140C96,160,192,200,288,180C384,160,480,80,576,85.3C672,91,768,181,864,197.3C960,213,1056,155,1152,133.3C1248,112,1344,128,1392,136L1440,144L1440,0L0,0Z;
                M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,0L0,0Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Navigation / Header */}
      <nav className="relative z-10 px-4 sm:px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-8">
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform">
              <TrendingDown className="text-white w-6 h-6" />
            </div>

            <span className="text-xl font-extrabold tracking-tighter text-slate-900">
              Bid<span className="text-blue-600">Smart</span>
            </span>
          </div>
        </div>

        <div className="hidden md:flex gap-4 text-sm font-medium">
          <span className="text-gray-600">Need help?</span>
          <button
            type="button"
            className="text-blue-600 font-bold hover:underline"
          >
            Contact Support
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-[700px] mx-auto py-8 sm:py-12 px-4 sm:px-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="group flex items-center text-sm font-bold text-gray-500 hover:text-[#108a00] mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* Main Form Container */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden mb-12">
          {/* Heading */}
          <div className="pt-8 sm:pt-12 pb-8 px-4 sm:px-10 text-center border-b border-gray-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 text-[#108a00] tracking-tight">
              Join as a <span className="text-blue-500">buyer</span>
            </h1>

            <p className="text-[12px] sm:text-[14px] text-gray-400 font-bold uppercase tracking-widest">
              Create Account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-8 md:p-10 space-y-8 sm:space-y-12"
          >
            {/* Account Information */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 shrink-0 rounded-full bg-[#108a00]/10 text-blue-600 flex items-center justify-center text-sm">
                  1
                </span>
                Basic Account Info
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {/* Username */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="username"
                    className="text-[13px] uppercase tracking-wider font-bold text-gray-500"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    type="text"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                    minLength={3}
                    maxLength={50}
                    className={`w-full min-w-0 px-4 py-3 border rounded-lg focus:ring-4 outline-none transition-all placeholder:text-gray-300 ${
                      errors.username
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-[#108a00] focus:ring-[#108a00]/5"
                    }`}
                    required
                  />

                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[13px] uppercase tracking-wider font-bold text-gray-500"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className={`w-full min-w-0 px-4 py-3 border rounded-lg focus:ring-4 outline-none transition-all placeholder:text-gray-300 ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-[#108a00] focus:ring-[#108a00]/5"
                    }`}
                    required
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2 relative">
                  <label
                    htmlFor="password"
                    className="text-[13px] uppercase tracking-wider font-bold text-gray-500"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="At least 8 characters"
                    minLength={8}
                    className={`w-full min-w-0 px-4 py-3 pr-12 border rounded-lg focus:ring-4 outline-none transition-all placeholder:text-gray-300 ${
                      errors.password
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-[#108a00] focus:ring-[#108a00]/5"
                    }`}
                    required
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-9 p-1 text-gray-400 hover:text-[#108a00]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-2 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="text-[13px] uppercase tracking-wider font-bold text-gray-500"
                  >
                    Confirm Password
                  </label>

                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Repeat your password"
                    className={`w-full min-w-0 px-4 py-3 border rounded-lg focus:ring-4 outline-none transition-all placeholder:text-gray-300 ${
                      errors.confirmPassword
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-[#108a00] focus:ring-[#108a00]/5"
                    }`}
                    required
                  />

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Server Error */}
            {errors.server && (
              <div
                role="alert"
                className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm"
              >
                {errors.server}
              </div>
            )}

            {/* Terms & Submit */}
            <section className="pt-2 sm:pt-6 space-y-6">
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="relative flex items-center pt-1 shrink-0">
                  <input
                    type="checkbox"
                    id="unifiedConsent"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="peer h-5 w-5 sm:h-6 sm:w-6 cursor-pointer appearance-none rounded-md border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 transition-all"
                  />

                  <Check className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" />
                </div>

                <div>
                  <label
                    htmlFor="unifiedConsent"
                    className="text-sm text-gray-600 font-medium leading-relaxed cursor-pointer"
                  >
                    I understand and agree to the{" "}
                    <span className="text-[#108a00] hover:underline font-bold">
                      BidSmart Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-[#108a00] hover:underline font-bold">
                      Privacy Policy
                    </span>
                    .
                  </label>

                  {errors.termsAccepted && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4 pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-4 bg-[#14a800] text-white font-bold rounded-full hover:bg-[#108a00] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed text-base sm:text-[18px] flex items-center justify-center gap-3 shadow-lg shadow-[#14a800]/20"
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    "Create my account"
                  )}
                </button>

                <div className="text-center">
                  <span className="text-sm text-gray-500">
                    Already have an account?{" "}
                  </span>

                  <Link
                    to="/login"
                    className="text-sm text-[#108a00] font-bold hover:underline"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-[#5e6d55] px-4 space-y-6">
          <p className="text-xs">© 2026 BidSmart® Global Inc.</p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-bold text-[13px]">
            <span className="hover:text-[#14a800] cursor-pointer">Terms</span>
            <span className="hover:text-[#14a800] cursor-pointer">Privacy</span>
            <span className="hover:text-[#14a800] cursor-pointer">Cookies</span>
            <span className="hover:text-[#14a800] cursor-pointer">
              Accessibility
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BuyerRegistor;