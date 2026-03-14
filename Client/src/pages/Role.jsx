// RoleSelection.jsx
import React from "react";
import {
  Briefcase,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  Shield,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";

const Role = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-medium">Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BidSmart
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Join thousands of businesses and find your next opportunity
          </p>
        </div>

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
            Choose Your Role
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Select how you want to participate in our marketplace
          </p>
        </div>

        {/* Role Cards - Mobile first grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Supplier Card */}
          <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative p-6 sm:p-8">
              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                I'm a Supplier
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                List your products, reach thousands of buyers, and grow your
                business
              </p>

              {/* Features */}
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {[
                  "Create auctions in minutes",
                  "Reach qualified buyers",
                  "Secure payments",
                  "Analytics dashboard",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-xs sm:text-sm text-gray-600"
                  >
                    <Sparkles className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base">
                Join as Supplier
              </button>
            </div>
          </div>

          {/* Buyer Card */}
          <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative p-6 sm:p-8">
              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                I'm a Buyer
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Find unique products, place bids, and win amazing deals
              </p>

              {/* Features */}
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {[
                  "Browse thousands of listings",
                  "Real-time bidding",
                  "Secure transactions",
                  "Saved searches",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-xs sm:text-sm text-gray-600"
                  >
                    <Sparkles className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base">
                Join as Buyer
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[
              { icon: Users, label: "Active Users", value: "10K+" },
              { icon: TrendingUp, label: "Monthly Bids", value: "50K+" },
              { icon: Clock, label: "Avg. Response", value: "< 2hrs" },
              { icon: Shield, label: "Secure Deals", value: "100%" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-3 sm:p-4 bg-gray-50 rounded-xl"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1 sm:mb-2" />
                  <div className="font-bold text-sm sm:text-base lg:text-lg text-gray-800">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <p className="text-xs sm:text-sm text-gray-500">
            Already have an account?{" "}
            <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Role;
