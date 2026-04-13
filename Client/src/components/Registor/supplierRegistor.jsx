import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Building2,
  ChevronRight,
  ShieldCheck,
  TrendingDown,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const App = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "Individual",
    agreementsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.businessName)
      newErrors.businessName = "Business name is required";
    if (!formData.agreementsAccepted) newErrors.agreementsAccepted = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ADD THESE LINES at the top of your component
  useEffect(() => {
    const loggedInOnly = async () => {
      try {
        const res = await fetch("http://localhost:21000/api/auth/status", {
          credentials: "include",
        });
        if (res.ok) window.location.href = "/supplier";
        setCheckingAuth(false);
      } catch (err) {
        setCheckingAuth(false);
        /* Not logged in, stay here */
      }
    };
    loggedInOnly();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.log("Supplier REgitration is not filled Proparly");
      return;
    }

    // Clear previous errors and start loading
    setErrors({});
    setIsSubmitting(true);

    try {
      // Send form data to the backend registration endpoint

      // const response = await fetch("http://localhost:21000/api/supplierRegistor"
      const response = await fetch(
        "http://localhost:21000/api/supplierRegistor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", // ensures cookies are sent/received
        }
      );

      const data = await response.json();
      console.log("=== FRONTEND DEBUG ===");
      console.log("Form data being sent:", formData);

      // Check if all required fields exist
      if (!formData.fullName) console.log("❌ Missing fullName");
      if (!formData.email) console.log("❌ Missing email");
      if (!formData.password) console.log("❌ Missing password");
      if (!formData.confirmPassword) console.log("❌ Missing confirmPassword");
      if (!formData.businessName) console.log("❌ Missing businessName");

      if (!response.ok) {
        // Backend returned an error (Zod validation or business logic)
        if (data.errors) {
          // Field‑specific errors (e.g., { email: "sInvalid email" })
          setErrors(data.errors);
        } else {
          // General error message (e.g., "User already exists")
          setErrors({ server: data.message || "Registration failed" });
        }
        return;
      }

      // Success: show success screen
      window.location.href = "/supplier";
    } catch (error) {
      // Network or unexpected error
      console.error("Network error:", error);
      setErrors({ server: "Network error. Please check your connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Static Ocean Wave Background
  const WaveBackground = () => (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#f9fdf9]">
      {/* Top Left Waves */}
      <div className="absolute top-0 left-0 w-full h-[25vh] md:h-[35vh] opacity-30 rotate-180 transform -scale-x-100">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#d1e9d1"
            d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,138.7C840,139,960,181,1080,192C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/* Bottom Right Waves */}
      <div className="absolute bottom-0 left-0 w-full h-[35vh] md:h-[45vh] opacity-40">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#e2f0e2"
            d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,138.7C840,139,960,181,1080,192C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative">
        <WaveBackground />
        <div className="bg-white p-8 md:rounded-2xl shadow-xl border border-[#e4ebe4] max-w-md w-full text-center animate-in zoom-in-95 duration-300 relative z-10">
          <div className="w-20 h-20 bg-[#14a800]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-[#14a800]" />
          </div>
          <h2 className="text-2xl font-bold text-[#001e00] mb-2">Success!</h2>
          <p className="text-[#5e6d55] mb-8">
            Welcome to BidSmart, <strong>{formData.fullName}</strong>. Your
            account is ready.
          </p>
          <button className="w-full py-4 bg-[#14a800] text-white rounded-full font-bold hover:bg-[#108a00] transition-all text-lg shadow-md">
            Get Started
          </button>
        </div>
      </div>
    );
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#14a800] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#5e6d55] font-bold">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-[#001e00] relative overflow-x-hidden pb-12 selection:bg-[#14a800]/20">
      <WaveBackground />

      {/* Navbar - Sticky & Responsive */}
      <header className="bg-white/90 backdrop-blur-md border-b border-[#e4ebe4] py-3 px-4 md:px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <div className="bg-[#14a800] p-1.5 rounded-md">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-[#14a800]">
              BidSmart
            </span>
          </div>
          <Link
            to="/login"
            className="text-[15px] font-bold text-[#14a800] hover:bg-[#14a800]/5 px-4 py-2 rounded-full transition-colors"
          >
            <button>Log In</button>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto py-6 md:py-12 px-4 relative z-10">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-[#5e6d55] hover:text-[#14a800] transition-colors mb-6 group active:scale-95 touch-manipulation"
        >
          <div className="p-1.5 rounded-full group-hover:bg-[#14a800]/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm">Back</span>
        </button>

        {/* Form Container - Mobile: No rounded corners/border, Desktop: Rounded/Shadow */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:shadow-xl md:border border-[#e4ebe4] overflow-hidden">
          <div className="p-6 md:p-12">
            {/* Responsive Heading */}
            <div className="mb-8 md:mb-12">
              <span className="text-[#5e6d55] text-xs md:text-sm font-extrabold uppercase tracking-widest block mb-2">
                Create your account
              </span>
              <h1 className="text-3xl md:text-5xl leading-tight font-black tracking-tight mb-3">
                Join as a{" "}
                <span className="bg-gradient-to-r from-[#14a800] to-[#006d00] bg-clip-text text-transparent">
                  supplier
                </span>
              </h1>
              <div className="h-1.5 w-16 md:w-24 bg-[#14a800] rounded-full opacity-80"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12">
              {/* Section: Personal Details */}
              <section className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-2 border-b border-[#e4ebe4] pb-2">
                  <h2 className="text-lg md:text-xl font-bold text-[#001e00]">
                    Personal Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 md:gap-6">
                  <div>
                    <label className="block text-[14px] font-bold mb-1.5 text-[#001e00]">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all text-[16px] placeholder:text-gray-400 ${
                        errors.fullName
                          ? "border-red-500 bg-red-50"
                          : "border-[#d5e0d5] focus:border-[#14a800] focus:ring-4 focus:ring-[#14a800]/10"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 mt-1.5 font-semibold px-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label className="block text-[14px] font-bold mb-1.5 text-[#001e00]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all text-[16px] placeholder:text-gray-400 ${
                          errors.email
                            ? "border-red-500 bg-red-50"
                            : "border-[#d5e0d5] focus:border-[#14a800] focus:ring-4 focus:ring-[#14a800]/10"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1.5 font-semibold px-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[14px] font-bold mb-1.5 text-[#001e00]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3.5 rounded-xl border border-[#d5e0d5] focus:border-[#14a800] focus:ring-4 focus:ring-[#14a800]/10 outline-none transition-all text-[16px] placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="relative">
                      <label className="block text-[14px] font-bold mb-1.5 text-[#001e00]">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Min. 8 characters"
                        className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all text-[16px] placeholder:text-gray-400 ${
                          errors.password
                            ? "border-red-500 bg-red-50"
                            : "border-[#d5e0d5] focus:border-[#14a800] focus:ring-4 focus:ring-[#14a800]/10"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[38px] text-gray-400 hover:text-[#14a800] h-10 w-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    <div>
                      <label className="block text-[14px] font-bold mb-1.5 text-[#001e00]">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all text-[16px] ${
                          errors.confirmPassword
                            ? "border-red-500 bg-red-50"
                            : "border-[#d5e0d5] focus:border-[#14a800] focus:ring-4 focus:ring-[#14a800]/10"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: Business Profile */}
              <section className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-2 border-b border-[#e4ebe4] pb-2">
                  <h2 className="text-lg md:text-xl font-bold text-[#001e00]">
                    Business Profile
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 md:gap-6">
                  <div>
                    <label className="block text-[14px] font-bold mb-1.5 text-[#001e00]">
                      Company Name
                    </label>
                    <input
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Organization or Legal Name"
                      className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all text-[16px] placeholder:text-gray-400 ${
                        errors.businessName
                          ? "border-red-500 bg-red-50"
                          : "border-[#d5e0d5] focus:border-[#14a800] focus:ring-4 focus:ring-[#14a800]/10"
                      }`}
                    />
                    {errors.businessName && (
                      <p className="text-xs text-red-600 mt-1.5 font-semibold px-1">
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold mb-1.5 text-[#001e00]">
                      Business Type
                    </label>
                    <div className="relative">
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#d5e0d5] focus:border-[#14a800] focus:ring-4 focus:ring-[#14a800]/10 outline-none bg-white text-[16px] appearance-none cursor-pointer"
                      >
                        <option value="Individual">
                          Individual / Freelancer
                        </option>
                        <option value="Company">Agency / LLC</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Enterprise">Corporation</option>
                      </select>
                      <div className="absolute right-4 top-[14px] pointer-events-none text-gray-400">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Terms Section */}
              <section className="pt-2">
                <label className="flex items-start gap-4 cursor-pointer group select-none">
                  <div className="mt-0.5">
                    <input
                      type="checkbox"
                      name="agreementsAccepted"
                      checked={formData.agreementsAccepted}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-[#14a800] rounded-md cursor-pointer border-[#d5e0d5] focus:ring-[#14a800]"
                    />
                  </div>
                  <span className="text-[14px] text-[#5e6d55] leading-relaxed">
                    I understand and agree to the{" "}
                    <span className="text-[#14a800] font-bold hover:underline">
                      BidSmart User Agreement
                    </span>{" "}
                    and{" "}
                    <span className="text-[#14a800] font-bold hover:underline">
                      Privacy Policy
                    </span>
                    .
                  </span>
                </label>
                {errors.agreementsAccepted && (
                  <p className="text-xs text-red-600 mt-2 font-bold px-1">
                    Please accept terms to continue.
                  </p>
                )}
              </section>

              {/* Action Buttons */}
              <div className="pt-4 space-y-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#14a800] text-white font-bold rounded-full hover:bg-[#108a00] active:scale-[0.98] transition-all disabled:opacity-50 text-[18px] flex items-center justify-center gap-2 shadow-lg shadow-[#14a800]/20 touch-manipulation"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Create my account"
                  )}
                </button>

                <div className="text-center">
                  <span className="text-[#5e6d55] text-[15px]">
                    Already have an account?{" "}
                  </span>
                  <Link to="/login">
                    <button
                      type="button"
                      className="text-[#14a800] font-extrabold text-[15px] hover:underline transition-all"
                    >
                      Log In
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Responsive Footer */}
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
      </main>
    </div>
  );
};

export default App;
