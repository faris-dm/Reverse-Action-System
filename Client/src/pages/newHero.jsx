import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Gavel,
  CheckCircle2,
  Star,
  Users,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Search,
  ArrowRight,
  MessageSquare,
  Globe,
  PlusCircle,
  ChevronDown,
} from "lucide-react";

const NewHero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#001e00] font-sans selection:bg-[#108a00] selection:text-white">
      {/* Navigation - Upwork Clean Style */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white border-b border-gray-200 py-2" : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Gavel className="text-[#108a00] w-7 h-7" />
              <span className="text-2xl font-bold tracking-tight text-[#001e00]">
                BidSmart
              </span>
            </div>
            <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="hover:text-[#108a00]"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection("buyers")}
                className="hover:text-[#108a00]"
              >
                Find Talent
              </button>
              <button
                onClick={() => scrollToSection("suppliers")}
                className="hover:text-[#108a00]"
              >
                Find Work
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center relative mr-4">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for services..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#108a00] w-64"
              />
            </div>
            <button className="text-sm font-bold hover:text-[#108a00] hidden sm:block">
              Log In
            </button>
            <button className="bg-[#108a00] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#14a800] transition-colors">
              Sign Up
            </button>
            <button
              className="lg:hidden p-1 text-[#001e00]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Upwork Marketplace Style */}
      <section className="pt-24 lg:pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] tracking-tight text-[#001e00]">
              How work <br className="hidden lg:block" /> should work
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-xl mx-auto lg:mx-0">
              Forget manual negotiations. Join the world's work marketplace
              where buyers post and suppliers bid in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-[#108a00] text-white rounded-xl font-bold text-lg hover:bg-[#14a800] shadow-sm flex items-center justify-center gap-2">
                I need something <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 border-2 border-[#108a00] text-[#108a00] rounded-xl font-bold text-lg hover:bg-green-50">
                I want to supply
              </button>
            </div>
            <div className="pt-8 flex flex-col items-center lg:items-start">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Trusted by 5,000+ businesses
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-50 grayscale">
                <div className="text-xl font-black">MICROSOFT</div>
                <div className="text-xl font-black">AIRBNB</div>
                <div className="text-xl font-black">GODADDY</div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="bg-[#f2f7f2] rounded-3xl p-8 relative overflow-hidden">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-100 rounded"></div>
                  </div>
                  <div className="h-6 w-16 bg-[#eef7ee] text-[#108a00] font-bold text-xs flex items-center justify-center rounded">
                    BID $450
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between translate-x-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="h-4 w-32 bg-gray-50 rounded mb-1"></div>
                      <div className="h-3 w-20 bg-gray-50 rounded"></div>
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-green-50 text-[#108a00] font-bold text-xs flex items-center justify-center rounded">
                    BID $390
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-[#108a00] text-white p-6 rounded-2xl">
                <div className="text-sm opacity-80 mb-1">
                  Market Floor Found
                </div>
                <div className="text-3xl font-bold">$385.00</div>
                <div className="mt-4 flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#108a00] bg-gray-200"
                    ></div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-[#108a00] bg-white text-[#108a00] text-[10px] flex items-center justify-center font-bold">
                    +12
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Two Column Marketplace Style */}
      <section
        id="how-it-works"
        className="py-20 bg-[#f9fbf9] border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001e00] mb-4">
              A marketplace built for efficiency
            </h2>
            <p className="text-gray-600 font-medium">
              Whether you're buying or supplying, we've optimized the workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* For Buyers Card */}
            <div className="bg-white p-8 lg:p-12 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-8">
                <PlusCircle className="text-[#108a00]" size={32} />
                <h3 className="text-2xl font-bold">For Buyers</h3>
              </div>
              <div className="space-y-8">
                {[
                  {
                    n: "1",
                    t: "Post a request",
                    d: "Tell us exactly what you need and your target budget.",
                  },
                  {
                    n: "2",
                    t: "Suppliers compete",
                    d: "Watch real-time bids drive the price to market floor.",
                  },
                  {
                    n: "3",
                    t: "Award & pay",
                    d: "Choose the best provider and pay securely through the platform.",
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <span className="text-xl font-bold text-[#108a00]">
                      {step.n}.
                    </span>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{step.t}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-10 w-full py-3 bg-[#108a00] text-white rounded-full font-bold hover:bg-[#14a800]">
                Start Posting
              </button>
            </div>

            {/* For Suppliers Card */}
            <div className="bg-white p-8 lg:p-12 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-[#108a00]" size={32} />
                <h3 className="text-2xl font-bold">For Suppliers</h3>
              </div>
              <div className="space-y-8">
                {[
                  {
                    n: "1",
                    t: "Browse requests",
                    d: "Filter active auctions that match your specialized skills.",
                  },
                  {
                    n: "2",
                    t: "Place your bid",
                    d: "Bid competitively to win the contract instantly.",
                  },
                  {
                    n: "3",
                    t: "Deliver & grow",
                    d: "Complete the job, get paid, and build your platform reputation.",
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <span className="text-xl font-bold text-[#108a00]">
                      {step.n}.
                    </span>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{step.t}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-10 w-full py-3 border-2 border-[#108a00] text-[#108a00] rounded-full font-bold hover:bg-green-50">
                Find Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Marketplace Preview - Social Proof */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Live Requests */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <h3 className="text-2xl font-bold">Recently Posted</h3>
              <button className="text-[#108a00] text-sm font-bold flex items-center hover:underline">
                View all <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Custom Packaging (500 units)",
                  budget: "$1.2k - $1.8k",
                  bids: 14,
                  time: "2h ago",
                },
                {
                  title: "Corporate Logo Redesign",
                  budget: "$400 - $600",
                  bids: 8,
                  time: "45m ago",
                },
                {
                  title: "Bulk Office Supplies Sourcing",
                  budget: "$3k+",
                  bids: 22,
                  time: "5h ago",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold group-hover:text-[#108a00]">
                      {item.title}
                    </h4>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1 font-bold text-[#001e00]">
                      {item.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={14} /> {item.bids} Bids
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Suppliers */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <h3 className="text-2xl font-bold">Top-Rated Providers</h3>
              <button className="text-[#108a00] text-sm font-bold flex items-center hover:underline">
                Browse talent <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "Global Print Masters",
                  category: "Manufacturing",
                  rating: "4.9",
                  projects: 142,
                },
                {
                  name: "Creative Edge Studio",
                  category: "Design",
                  rating: "5.0",
                  projects: 89,
                },
                {
                  name: "SourcePro Logistics",
                  category: "Sourcing",
                  rating: "4.8",
                  projects: 210,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 border border-gray-100 rounded-2xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-xs text-gray-500">
                        {item.category} • {item.projects} projects
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#108a00] font-bold">
                    <Star size={16} fill="currentColor" /> {item.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verified / Trust Section */}
      <section className="py-20 bg-[#001e00] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-12 text-center lg:text-left">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold mb-6">Safe and Secure</h2>
              <p className="text-gray-400 font-medium">
                We verify every user and secure every transaction, so you can
                focus on work.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {[
                {
                  icon: <ShieldCheck size={40} className="text-[#108a00]" />,
                  title: "Verified Identity",
                  desc: "All suppliers undergo a rigorous multi-step document verification process.",
                },
                {
                  icon: <TrendingUp size={40} className="text-[#108a00]" />,
                  title: "Market Floor Pricing",
                  desc: "Reverse auctions ensure you never overpay for high-quality services.",
                },
                {
                  icon: <CheckCircle2 size={40} className="text-[#108a00]" />,
                  title: "Secure Escrow",
                  desc: "Payments are held in secure escrow until you approve the final delivery.",
                },
                {
                  icon: <Globe size={40} className="text-[#108a00]" />,
                  title: "Global Network",
                  desc: "Access specialized providers from every corner of the globe instantly.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 text-left">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Clean Accordion */}
      <section className="py-24 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Questions? We have answers.
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Is it really free to post an auction?",
              a: "Yes, it is completely free to sign up and post your requirements. We only collect a small success fee from the final contract amount upon successful delivery.",
            },
            {
              q: "How do I know the bids are legitimate?",
              a: "Only verified suppliers who have passed our compliance checks are allowed to participate in live auctions. Their reputation is tied to every bid they place.",
            },
            {
              q: "What if I'm not happy with the quality?",
              a: "Our platform includes a built-in dispute resolution center and secure payment escrow. Funds are not released to the supplier until you mark the project as complete.",
            },
            {
              q: "Can I communicate with suppliers directly?",
              a: "Absolutely. Once a supplier places a bid, you can open a secure message thread to discuss project specifics, deadlines, and revisions.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full p-6 text-left flex justify-between items-center font-bold text-lg hover:bg-gray-50 transition-colors"
              >
                {item.q}
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="p-6 pt-0 text-gray-600 font-medium leading-relaxed animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer - Minimal & Pro */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-20">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center space-x-1">
                <Gavel className="text-[#108a00] w-6 h-6" />
                <span className="text-xl font-bold tracking-tight text-[#001e00]">
                  BidSmart
                </span>
              </div>
              <p className="text-gray-500 max-w-xs text-sm font-medium">
                The world's leading reverse auction marketplace for professional
                services and industrial sourcing.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-sm">For Buyers</h5>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li className="hover:text-[#108a00] cursor-pointer">
                  Find Talent
                </li>
                <li className="hover:text-[#108a00] cursor-pointer">
                  Post a Job
                </li>
                <li className="hover:text-[#108a00] cursor-pointer">
                  Success Stories
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-sm">For Suppliers</h5>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li className="hover:text-[#108a00] cursor-pointer">
                  Find Work
                </li>
                <li className="hover:text-[#108a00] cursor-pointer">
                  Platform Fees
                </li>
                <li className="hover:text-[#108a00] cursor-pointer">
                  Verification
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-sm">Company</h5>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li className="hover:text-[#108a00] cursor-pointer">
                  About Us
                </li>
                <li className="hover:text-[#108a00] cursor-pointer">Careers</li>
                <li className="hover:text-[#108a00] cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-400 font-bold flex gap-4 uppercase tracking-widest">
              <span>© 2026 BidSmart Inc.</span>
              <span className="hover:text-gray-600 cursor-pointer">
                Privacy
              </span>
              <span className="hover:text-gray-600 cursor-pointer">Terms</span>
            </div>
            <div className="text-xs text-gray-300 font-bold uppercase tracking-[0.2em] cursor-pointer hover:text-gray-500 transition-colors">
              Admin Portal Access
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div
        className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] transition-transform duration-500 ${
          scrolled ? "translate-y-0" : "translate-y-24"
        }`}
      >
        <button className="w-full bg-[#108a00] text-white py-4 rounded-full font-bold shadow-xl flex items-center justify-center gap-2">
          Join the Marketplace <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default NewHero;
