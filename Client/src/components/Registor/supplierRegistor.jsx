import React, { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white md:bg-[#f2f7f2] flex items-center justify-center p-4">
        <div className="bg-white p-8 md:rounded-2xl md:shadow-sm md:border border-[#d5e0d5] max-w-md w-full text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-[#14a800]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-[#14a800]" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#001e00] mb-2">
            Registration Successful!
          </h2>
          <p className="text-[#5e6d55] mb-8">
            Welcome to BidSmart, <strong>{formData.fullName}</strong>. You can
            now access your dashboard.
          </p>
          <button className="w-full py-4 bg-[#14a800] text-white rounded-full font-bold hover:bg-[#108a00] transition-all text-lg shadow-md">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white md:bg-[#f2f7f2] font-sans text-[#001e00]">
      {/* Navbar */}
      <header className="bg-white border-b border-[#d5e0d5] py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="bg-[#14a800] p-1.5 rounded-md">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#14a800]">
              BidSmart
            </span>
          </div>
          <div className="hidden md:block">
            <ShieldCheck size={20} className="text-[#14a800] opacity-60" />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto py-6 md:py-12 px-4">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-[#5e6d55] hover:text-[#14a800] font-bold mb-6 transition-colors">
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="bg-white md:rounded-2xl md:border md:border-[#d5e0d5] md:shadow-sm overflow-hidden">
          <div className="p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#001e00] mb-2">
              Supplier Registration
            </h1>
            <p className="text-[#5e6d55] mb-8">
              Create your account to start bidding on projects.
            </p>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Section 1: Basic Account Info */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                  <User className="w-5 h-5 text-[#14a800]" />
                  <h2 className="text-xl font-bold">Basic Account Info</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1.5">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className={`w-full p-3 rounded-lg border-2 outline-none transition-all text-base ${
                        errors.fullName
                          ? "border-red-500 bg-red-50"
                          : "border-[#d5e0d5] focus:border-[#14a800]"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 mt-1 font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@company.com"
                        className={`w-full p-3 rounded-lg border-2 outline-none transition-all text-base ${
                          errors.email
                            ? "border-red-500 bg-red-50"
                            : "border-[#d5e0d5] focus:border-[#14a800]"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full p-3 rounded-lg border-2 border-[#d5e0d5] focus:border-[#14a800] outline-none transition-all text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-bold mb-1.5">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border-2 outline-none transition-all text-base ${
                          errors.password
                            ? "border-red-500 bg-red-50"
                            : "border-[#d5e0d5] focus:border-[#14a800]"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[38px] text-gray-400 hover:text-[#14a800]"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1.5">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg border-2 outline-none transition-all text-base ${
                          errors.confirmPassword
                            ? "border-red-500 bg-red-50"
                            : "border-[#d5e0d5] focus:border-[#14a800]"
                        }`}
                      />
                    </div>
                  </div>
                  {(errors.password || errors.confirmPassword) && (
                    <p className="text-xs text-red-600 font-medium">
                      {errors.password || errors.confirmPassword}
                    </p>
                  )}
                </div>
              </section>

              {/* Section 2: Basic Business Info */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                  <Building2 className="w-5 h-5 text-[#14a800]" />
                  <h2 className="text-xl font-bold">Basic Business Info</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1.5">
                      Business Name
                    </label>
                    <input
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Acme Corp LLC"
                      className={`w-full p-3 rounded-lg border-2 outline-none transition-all text-base ${
                        errors.businessName
                          ? "border-red-500 bg-red-50"
                          : "border-[#d5e0d5] focus:border-[#14a800]"
                      }`}
                    />
                    {errors.businessName && (
                      <p className="text-xs text-red-600 mt-1 font-medium">
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1.5">
                      Business Type
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full p-3.5 rounded-lg border-2 border-[#d5e0d5] focus:border-[#14a800] outline-none bg-white text-base appearance-none cursor-pointer"
                    >
                      <option value="Individual">Individual</option>
                      <option value="Company">Company / LLC</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Combined Verification */}
              <section className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="agreementsAccepted"
                    checked={formData.agreementsAccepted}
                    onChange={handleInputChange}
                    className="w-5 h-5 mt-1 accent-[#14a800] rounded"
                  />
                  <span className="text-sm md:text-base text-[#5e6d55] leading-relaxed">
                    I accept the{" "}
                    <span className="text-[#14a800] font-bold hover:underline">
                      Terms & Conditions
                    </span>{" "}
                    and acknowledge the{" "}
                    <span className="text-[#14a800] font-bold hover:underline">
                      Privacy Policy
                    </span>
                    .
                  </span>
                </label>
                {errors.agreementsAccepted && (
                  <p className="text-xs text-red-600 mt-1 font-medium ml-8">
                    Please accept the agreements to continue.
                  </p>
                )}
              </section>

              {/* Action Button & Sign In Link */}
              <div className="pt-4 space-y-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#14a800] text-white font-bold rounded-full hover:bg-[#108a00] shadow-lg hover:shadow-xl transition-all disabled:opacity-50 text-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Register Now <ChevronRight size={22} />
                    </>
                  )}
                </button>

                <div className="flex flex-col items-center justify-center gap-1">
                  <p className="text-[#5e6d55] text-base">
                    Already have an account?
                  </p>
                  <button
                    type="button"
                    className="text-[#14a800] font-bold text-lg hover:underline transition-all"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 mb-10 text-center px-6 text-[#5e6d55]">
          <div className="flex justify-center items-center gap-6 opacity-60">
            <ShieldCheck size={20} />
            <div className="h-4 w-[1px] bg-gray-300"></div>
            <p className="text-xs font-bold uppercase tracking-widest">
              BidSmart Inc.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
