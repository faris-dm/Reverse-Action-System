// RoleSelection.jsx
import React, { useState } from "react";
import {
  Search,
  Briefcase,
  Users,
  ChevronRight,
  Star,
  Shield,
  Clock,
  Globe,
  ArrowLeft,
} from "lucide-react";

const Role = () => {
  const [hoveredRole, setHoveredRole] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Upwork style */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo and Back */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <span className="text-xl font-bold text-gray-800">idSmart</span>
              </div>
            </div>

            {/* Right side - Sign in link */}
            <button className="text-green-600 hover:text-green-700 font-medium text-sm sm:text-base">
              Sign In →
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Heading Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-4">
            Join as a
            {/* <span className="text-green-600">Supplier</span> or{" "}
            <span className="text-blue-600">Buyer</span> */}
          </h1>
        </div>

        {/* Role Cards Grid - Upwork style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl  mb-5 mx-auto">
          {/* Supplier Card */}
          <div
            className={`relative bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer
              ${
                hoveredRole === "supplier"
                  ? "border-green-500 shadow-xl scale-[1.02]"
                  : "border-gray-200 hover:border-green-200 hover:shadow-lg"
              }`}
            onMouseEnter={() => setHoveredRole("supplier")}
            onMouseLeave={() => setHoveredRole(null)}
          >
            {/* Popular tag */}
            <div className="absolute -top-3 left-6">
              <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Supplier
                  </h2>
                  <p className="text-gray-500">Sell products & services</p>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {[
                  "Create unlimited auctions",
                  "Reach 10K+ active buyers",
                  "0% commission for first 3 months",
                  "Advanced analytics dashboard",
                  "Priority customer support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                    </div>
                    <span className="text-gray-600 text-sm sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Price and CTA */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-gray-800">$0</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] text-lg">
                  Join as Supplier
                  <ChevronRight className="inline ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Buyer Card */}
          <div
            className={`bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer
              ${
                hoveredRole === "buyer"
                  ? "border-blue-500 shadow-xl scale-[1.02]"
                  : "border-gray-200 hover:border-blue-200 hover:shadow-lg"
              }`}
            onMouseEnter={() => setHoveredRole("buyer")}
            onMouseLeave={() => setHoveredRole(null)}
          >
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Buyer
                  </h2>
                  <p className="text-gray-500">Find products & deals</p>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {[
                  "Browse 50K+ active auctions",
                  "Real-time bidding platform",
                  "Secure payment protection",
                  "Saved searches & alerts",
                  "Bulk purchase discounts",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    </div>
                    <span className="text-gray-600 text-sm sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Price and CTA */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-gray-800">Free</span>
                  <span className="text-gray-500">forever</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] text-lg">
                  Join as Buyer
                  <ChevronRight className="inline ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators - Upwork style */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="text-center mb-8">
            <p className="text-sm uppercase tracking-wider text-gray-400 font-semibold">
              Trusted by businesses worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Shield,
                label: "Secure Payments",
                value: "100% protection",
              },
              { icon: Star, label: "4.8/5 Rating", value: "From 10K+ reviews" },
              { icon: Clock, label: "Fast Response", value: "Avg. 2 hours" },
              { icon: Globe, label: "Global Reach", value: "50+ countries" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="font-semibold text-gray-800">
                    {item.label}
                  </div>
                  <div className="text-sm text-gray-500">{item.value}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Have questions?{" "}
            <button className="text-green-600 hover:text-green-700 font-medium hover:underline">
              Read our FAQ
            </button>{" "}
            or{" "}
            <button className="text-green-600 hover:text-green-700 font-medium hover:underline">
              Contact support
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Role;
