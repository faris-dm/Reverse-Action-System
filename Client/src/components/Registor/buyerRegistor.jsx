import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Check,
  Globe,
  ExternalLink,
} from "lucide-react";

const BuyerRegistor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyType: "",
    industrySector: "",
    position: "",
    companyAddress: "",
    accountPurpose: "",
    termsAccepted: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) return;
    console.log("Account Created:", formData);
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
          <span className="text-[#108a00] text-2xl font-extrabold tracking-tight">
            BidSmart
          </span>
        </div>
        <div className="hidden md:flex gap-4 text-sm font-medium">
          <span className="text-gray-600">Need help?</span>
          <button className="text-[#108a00] font-bold hover:underline">
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
              Join as a buyer
            </h1>
            <p className="text-[14px] text-gray-400 font-bold uppercase tracking-widest">
              Create Account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-12">
            {/* Section 1: Basic Account Info */}
            <section>
              <h2 className="text-xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#108a00]/10 text-[#108a00] flex items-center justify-center text-sm">
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
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none transition-all placeholder:text-gray-300"
                    required
                  />
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
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none transition-all placeholder:text-gray-300"
                      required
                    />
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
                <span className="w-8 h-8 rounded-full bg-[#108a00]/10 text-[#108a00] flex items-center justify-center text-sm">
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
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:border-[#108a00] focus:ring-4 focus:ring-[#108a00]/5 outline-none bg-white transition-all appearance-none"
                    >
                      <option value="">Select type</option>
                      <option>Construction Company</option>
                      <option>Developer</option>
                      <option>Contractor</option>
                      <option>Government</option>
                      <option>Individual</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
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
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Basic Details */}
            <section>
              <h2 className="text-xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#108a00]/10 text-[#108a00] flex items-center justify-center text-sm">
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
                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-gray-300 checked:bg-[#108a00] checked:border-[#108a00] transition-all"
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
                  disabled={!formData.termsAccepted}
                  className="w-full bg-[#108a00] disabled:bg-gray-300 disabled:shadow-none text-white py-4 rounded-full font-bold text-xl hover:bg-[#14a800] transition-all shadow-lg shadow-[#108a00]/20 active:scale-[0.98]"
                >
                  Create an account
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
