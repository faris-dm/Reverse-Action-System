import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff, Check, TrendingDown } from "lucide-react";

const BuyerRegistor = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyType: "",
    position: "",
    companyAddress: "",
    accountPurpose: "",
    termsAccepted: false, // ← CHANGE TO THIS
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

    // Section 1: Basic Account Info
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Section 2: Company Info
    if (!formData.companyName) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.companyType) {
      newErrors.companyType = "Please select a company type";
    }

    // Section 3: Basic Details
    if (!formData.position) {
      newErrors.position = "Position/Role is required";
    }

    if (!formData.accountPurpose) {
      newErrors.accountPurpose = "Please select account purpose";
    }

    if (!formData.companyAddress) {
      newErrors.companyAddress = "Company address is required";
    }

    // Terms and Conditions
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    // Set errors to state
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

    // Return true if no errors, false if there are errors
  };

  useEffect(() => {
    const loggedInOnly = async () => {
      try {
        const res = await fetch("http://localhost:21000/api/auth/status", {
          credentials: "include",
        });
        if (res.ok) window.location.href = "/buyer";
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
      console.log("Buyer Registration form  is not filled Proparly");
      return;
    }

    // Clear previous errors and start loading
    setErrors({});
    setIsSubmitting(true);

    try {
      // Send form data to the backend registration endpoint

      // const response = await fetch("http://localhost:21000/api/supplierRegistor"
      const response = await fetch("http://localhost:21000/api/BuyerRegistor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // ensures cookies are sent/received
      });

      const data = await response.json();
      if (!data.fullName) console.log("Missing");

      if (!response.ok) {
        // Backend returned an error (Zod validation or business logic)
        if (data.errors) {
          // Field‑specific errors (e.g., { email: "Invalid email" })
          setErrors(data.errors);
        } else {
          // General error message (e.g., "User already exists")
          setErrors({ server: data.message || "Registration failed" });
        }
        return;
      }

      // Success: show success screen
      if (response.ok) {
        console.log("🎉 Buyer Registered!");
        window.location.href = "/buyer";
      }
    } catch (error) {
      // Network or unexpected error
      console.error("Network error:", error);
      setErrors({ server: "Network error. Please check your connection." });
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
      <nav className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm">
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
          <button className="text-blue-600 font-bold hover:underline">
            Contact Support
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-[700px] mx-auto py-12 px-6">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="group flex items-center text-sm font-bold text-gray-500 hover:text-[#108a00] mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />{" "}
          Back
        </button>

        {/* Main Form Container */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden mb-12">
          {/* Heading Section */}
          <div className="pt-12 pb-8 px-10 text-center border-b border-gray-50">
            {/* Added font-black and tracking-tight for more impact */}
            <h1 className="text-4xl md:text-5xl font-black mb-2 text-[#108a00] tracking-tight">
              Join as a <span className="text-blue-500">buyer</span>
            </h1>
            <p className="text-[14px] text-gray-400 font-bold uppercase tracking-widest">
              Create Account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-12">
            {/* Section 1: Basic Account Info */}
            <section>
              <h2 className="text-xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#108a00]/10 text-blue-600 flex items-center justify-center text-sm">
                  1
                </span>
                Basic Account Info
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] uppercase tracking-wider font-bold text-gray-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`px-4 py-3 border rounded-lg focus:ring-4 outline-none transition-all placeholder:text-gray-300 ${
                      errors.fullName
                        ? "border-red-500 bg-red-50 focus:border-red-500"
                        : "border-gray-300 focus:border-[#108a00] focus:ring-[#108a00]/5"
                    }`}
                    required
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      className={`px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none transition-all placeholder:text-gray-300 ${
                        errors.email
                          ? "border-red-500 bg-red-50 focus:border-red-500"
                          : "border-gray-300 focus:border-[#108a00] focus:ring-[#108a00]/5"
                      } 
                         `}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {" "}
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-500">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-500">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="8+ characters"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none transition-all placeholder:text-gray-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-10 text-gray-400 hover:text-[#108a00]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-500">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Repeat password"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none transition-all placeholder:text-gray-300"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Company/Organization Info */}
            <section>
              <h2 className="text-xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#108a00]/10 text-blue-600 flex items-center justify-center text-sm">
                  2
                </span>
                Company Info
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] uppercase tracking-wider font-bold text-gray-500">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Legal company name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none transition-all placeholder:text-gray-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-500">
                      Company Type
                    </label>
                    <select
                      name="companyType"
                      value={formData.companyType}
                      onChange={handleInputChange}
                      className="px-10 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none bg-white transition-all appearance-none"
                    >
                      <option value="">Select type</option>
                      <option>Construction Company</option>
                      <option>Developer</option>
                      <option>Contractor</option>
                      <option>Government</option>
                      <option>Individual</option>
                    </select>
                  </div>
                  {/* <div className="flex flex-col gap-2">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-500">
                      Industry Sector
                    </label>
                    <select
                      name="industrySector"
                      value={formData.industrySector}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none bg-white transition-all appearance-none"
                    >
                      <option value="">Select sector</option>
                      <option>Real Estate</option>
                      <option>Infrastructure</option>
                      <option>Commercial</option>
                      <option>Residential</option>
                    </select>
                  </div> */}
                </div>
              </div>
            </section>

            {/* Section 3: Basic Details */}
            <section>
              <h2 className="text-xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#108a00]/10 text-blue-600 flex items-center justify-center text-sm">
                  3
                </span>
                Basic Details
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-500">
                      Position/Role
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="e.g. Project Manager"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] uppercase tracking-wider font-bold text-gray-500">
                      Account Purpose
                    </label>
                    <select
                      name="accountPurpose"
                      value={formData.accountPurpose}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none bg-white appearance-none"
                    >
                      <option value="">Select purpose</option>
                      <option>Personal Project</option>
                      <option>Small Business</option>
                      <option>Large Corporation</option>
                      <option>Government Agency</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] uppercase tracking-wider font-bold text-gray-500">
                    Company Address
                  </label>
                  <textarea
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Full street address, city, state"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none transition-all resize-none placeholder:text-gray-300"
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Consolidated Consent & Submit */}
            <section className="pt-6 space-y-6">
              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="relative flex items-center pt-1">
                  <input
                    type="checkbox"
                    id="unifiedConsent"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 transition-all"
                    onChange={handleInputChange}
                  />
                  <Check className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1" />
                </div>
                <label
                  htmlFor="unifiedConsent"
                  className="text-sm text-gray-600 font-medium leading-relaxed"
                >
                  I understand and agree to the
                  <span className="text-[#108a00] cursor-pointer hover:underline mx-1 font-bold">
                    BidSmart Terms of Service
                  </span>
                  and
                  <span className="text-[#108a00] cursor-pointer hover:underline ml-1 font-bold">
                    Privacy Policy
                  </span>
                  .
                </label>
              </div>

              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#14a800] text-white font-bold rounded-full hover:bg-[#108a00] active:scale-[0.98] transition-all disabled:opacity-70 text-[18px] flex items-center justify-center gap-3 shadow-lg shadow-[#14a800]/20"
                >
                  {isSubmitting ? (
                    <>
                      {/* 3. Added a dedicated text so they know WHAT is happening */}
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Create my account"
                  )}
                </button>

                <div className="text-center">
                  <span className="text-sm text-gray-500">
                    Already have an account?{" "}
                  </span>
                  <Link to="/login">
                    <button
                      type="button"
                      className="text-sm text-[#108a00] font-bold hover:underline"
                    >
                      Log in
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Enhanced Footer */}
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
