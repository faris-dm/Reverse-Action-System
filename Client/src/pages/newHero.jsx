import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Gavel,
  CheckCircle2,
  Users,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Search,
  ArrowRight,
  Globe,
  PlusCircle,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();
    const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling and hide body elements when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

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

 useEffect(() => {
   const loggedInOnly = async () => {
     try {
       const res = await fetch("http://localhost:21000/api/auth/status", {
         credentials: "include",
       });
       if (res.ok) {
         const data = await res.json(); // Assuming your backend sends { role: 'admin' }

         // Route them based on their power level
         if (data.role === "admin") {
           navigate("/admin", { replace: true });
         } else if (data.role === "buyer") {
           navigate("/buyer", { replace: true });
         } else {
           navigate("/supplier", { replace: true });
         }
       }
     } catch (err) {
       setCheckingAuth(false);
       /* Not logged in, stay here */
     }
   };
   loggedInOnly();
 }, []);


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
    <div className="min-h-screen bg-white text-[#001e00] font-sans selection:bg-[#108a00] selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
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
                className="hover:text-[#108a00] transition-colors"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="hover:text-[#108a00] transition-colors"
              >
                Find Talent
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="hover:text-[#108a00] transition-colors"
              >
                Find Work
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center relative mr-2">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#108a00] w-48 lg:w-64"
              />
            </div>

            <button className="text-sm font-bold hover:text-[#108a00] hidden lg:block transition-colors">
              Log In
            </button>
            <button className="bg-[#108a00] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#14a800] transition-all whitespace-nowrap shadow-sm">
              Sign Up
            </button>

            <button
              className="lg:hidden p-1 text-[#001e00] z-[110] ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-white transition-all duration-300 ease-in-out lg:hidden ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-full"
        }`}
      >
        <div className="flex flex-col h-full w-full pt-28 pb-10 px-6">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-3xl font-bold text-left py-4 border-b border-gray-100 flex justify-between items-center group active:bg-gray-50 rounded-lg px-2"
            >
              How it works <ChevronRight className="text-gray-300" />
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-3xl font-bold text-left py-4 border-b border-gray-100 flex justify-between items-center group active:bg-gray-50 rounded-lg px-2"
            >
              Find Talent <ChevronRight className="text-gray-300" />
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-3xl font-bold text-left py-4 border-b border-gray-100 flex justify-between items-center group active:bg-gray-50 rounded-lg px-2"
            >
              Find Work <ChevronRight className="text-gray-300" />
            </button>
          </div>

          <div className="mt-auto space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Start your journey
            </p>
            <button className="w-full py-5 bg-[#108a00] text-white rounded-2xl font-bold text-xl shadow-xl active:scale-95 transition-transform">
              Join BidSmart
            </button>
            <button className="w-full py-5 border border-gray-200 rounded-2xl font-bold text-xl active:bg-gray-50">
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section with Market Floor Grid */}
      <section className="pt-24 lg:pt-36 pb-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-7xl font-bold leading-[1.05] tracking-tight text-[#001e00]">
              How work <br className="hidden lg:block" /> should work
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-xl mx-auto lg:mx-0">
              The world's work marketplace where buyers post and suppliers bid
              in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-[#108a00] text-white rounded-xl font-bold text-lg hover:bg-[#14a800] shadow-sm flex items-center justify-center gap-2 transition-all">
                I need something <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 border-2 border-[#108a00] text-[#108a00] rounded-xl font-bold text-lg hover:bg-green-50 transition-all">
                I want to supply
              </button>
            </div>
            <div className="pt-8 flex flex-col items-center lg:items-start">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Trusted by industry leaders
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-40 grayscale">
                <div className="text-xl font-black italic">MICROSOFT</div>
                <div className="text-xl font-black italic">AIRBNB</div>
                <div className="text-xl font-black italic">NETFLIX</div>
              </div>
            </div>
          </div>

          {/* Market Floor Grid */}
          <div className="hidden lg:block relative">
            <div className="bg-[#f2f7f2] rounded-[3rem] p-10 relative overflow-hidden border border-green-100/50">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-100 rounded"></div>
                  </div>
                  <div className="h-6 w-20 bg-[#eef7ee] text-[#108a00] font-bold text-[10px] flex items-center justify-center rounded uppercase tracking-wider">
                    BID $450.00
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-center justify-between translate-x-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Users size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="h-3 w-32 bg-gray-100 rounded mb-1"></div>
                      <div className="h-2 w-20 bg-gray-50 rounded"></div>
                    </div>
                  </div>
                  <div className="h-6 w-20 bg-green-50 text-[#108a00] font-bold text-[10px] flex items-center justify-center rounded uppercase tracking-wider">
                    BID $390.00
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-[#108a00] text-white p-8 rounded-[2rem] shadow-xl shadow-green-900/10">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">
                    Market Floor Found
                  </div>
                  <TrendingUp size={20} className="opacity-80" />
                </div>
                <div className="text-5xl font-bold tracking-tight mb-4">
                  $385.00
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-[#108a00] bg-gray-200"
                      ></div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-[#108a00] bg-white text-[#108a00] text-[9px] flex items-center justify-center font-black">
                      +24
                    </div>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                    Active Bidders
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-24 bg-[#f9fbf9] border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#001e00] mb-4">
              How it works
            </h2>
            <p className="text-gray-600 font-medium max-w-2xl mx-auto text-lg">
              A simple, transparent process for high-speed procurement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white p-10 lg:p-14 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                <PlusCircle className="text-[#108a00]" size={40} />
                <h3 className="text-3xl font-bold">For Buyers</h3>
              </div>
              <div className="space-y-10">
                {[
                  {
                    n: "1",
                    t: "Post your project",
                    d: "Upload specs and set your starting auction ceiling.",
                  },
                  {
                    n: "2",
                    t: "Receive competitive bids",
                    d: "Watch suppliers lower their prices to win your contract.",
                  },
                  {
                    n: "3",
                    t: "Hire & get results",
                    d: "Release payment only when the milestone is approved.",
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-6">
                    <span className="text-2xl font-bold text-[#108a00] opacity-30">
                      {step.n}
                    </span>
                    <div>
                      <h4 className="font-bold text-xl mb-2">{step.t}</h4>
                      <p className="text-gray-500 leading-relaxed font-medium">
                        {step.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 lg:p-14 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                <Briefcase className="text-[#108a00]" size={40} />
                <h3 className="text-3xl font-bold">For Suppliers</h3>
              </div>
              <div className="space-y-10">
                {[
                  {
                    n: "1",
                    t: "Filter job boards",
                    d: "Find projects tailored to your specific service area.",
                  },
                  {
                    n: "2",
                    t: "Bid for contracts",
                    d: "Enter our live auction floors to capture new business.",
                  },
                  {
                    n: "3",
                    t: "Execute & earn",
                    d: "Delivered work is protected by our automated escrow.",
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-6">
                    <span className="text-2xl font-bold text-[#108a00] opacity-30">
                      {step.n}
                    </span>
                    <div>
                      <h4 className="font-bold text-xl mb-2">{step.t}</h4>
                      <p className="text-gray-500 leading-relaxed font-medium">
                        {step.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safe and Secure - Black Section */}
      <section className="py-24 bg-[#001e00] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
                Safe and Secure
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed text-lg mb-8">
                Trust is our primary product. We build the rails for
                professional commerce.
              </p>
              <button className="flex items-center gap-2 text-[#108a00] font-bold text-lg hover:underline">
                View our safety protocols <ChevronRight size={20} />
              </button>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-12">
              {[
                {
                  icon: <ShieldCheck size={40} className="text-[#108a00]" />,
                  title: "Identity Guard",
                  desc: "Rigorous verification for every user to prevent platform misuse.",
                },
                {
                  icon: <TrendingUp size={40} className="text-[#108a00]" />,
                  title: "Dynamic Discovery",
                  desc: "Our bidding engine finds the true market price every single time.",
                },
                {
                  icon: <CheckCircle2 size={40} className="text-[#108a00]" />,
                  title: "Escrow Logic",
                  desc: "Payments are only released upon mutually agreed milestone delivery.",
                },
                {
                  icon: <Globe size={40} className="text-[#108a00]" />,
                  title: "Global Scale",
                  desc: "Reliable dispute resolution and 24/7 support across all timezones.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 bg-white/5 p-4 rounded-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Questions & Answers
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "How are bidding fees handled?",
              a: "Posting is free. Suppliers pay a small percentage of the final contract value only when they win and get paid.",
            },
            {
              q: "Can I cancel an auction?",
              a: "Yes, you can cancel an auction before a bid is accepted. Once a contract starts, escrow rules apply.",
            },
            {
              q: "Is there a limit on project size?",
              a: "We handle projects ranging from $500 micro-tasks to multi-million dollar industrial sourcing contracts.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full p-6 text-left flex justify-between items-center font-bold text-lg hover:bg-gray-50 transition-colors"
              >
                <span className="pr-4">{item.q}</span>
                <ChevronDown
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="p-6 pt-0 text-gray-600 font-medium leading-relaxed border-t border-gray-50 animate-in fade-in slide-in-from-top-2">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Professional Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center space-x-1">
                <Gavel className="text-[#108a00] w-8 h-8" />
                <span className="text-2xl font-bold tracking-tight text-[#001e00]">
                  BidSmart
                </span>
              </div>
              <p className="text-gray-500 max-w-xs text-sm font-medium leading-relaxed">
                Reinventing professional procurement through real-time reverse
                auction technology.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">
                Products
              </h5>
              <ul className="space-y-4 text-sm text-gray-600 font-bold">
                <li className="hover:text-[#108a00] cursor-pointer">
                  Talent Pool
                </li>
                <li className="hover:text-[#108a00] cursor-pointer">
                  Auction Floor
                </li>
                <li className="hover:text-[#108a00] cursor-pointer">
                  Enterprise
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">
                Resources
              </h5>
              <ul className="space-y-4 text-sm text-gray-600 font-bold">
                <li className="hover:text-[#108a00] cursor-pointer">
                  Help Center
                </li>
                <li className="hover:text-[#108a00] cursor-pointer">
                  Market Data
                </li>
                <li className="hover:text-[#108a00] cursor-pointer">
                  Verification
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">
                Company
              </h5>
              <ul className="space-y-4 text-sm text-gray-600 font-bold">
                <li className="hover:text-[#108a00] cursor-pointer">About</li>
                <li className="hover:text-[#108a00] cursor-pointer">Legal</li>
                <li className="hover:text-[#108a00] cursor-pointer">Careers</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs text-gray-400 font-bold flex gap-6 uppercase tracking-widest">
              <span>© 2026 BidSmart Global</span>
              <span className="hover:text-[#108a00] cursor-pointer transition-colors">
                Privacy
              </span>
              <span className="hover:text-[#108a00] cursor-pointer transition-colors">
                Terms
              </span>
            </div>
            <div className="text-[10px] text-gray-300 font-black uppercase tracking-[0.3em] cursor-pointer hover:text-[#108a00] transition-colors">
              Market Authority Portal
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA - Hidden when menu is open */}
      <div
        className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] transition-all duration-500 ${
          scrolled && !isMenuOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0"
        }`}
      >
        <button className="w-full bg-[#108a00] text-white py-4 rounded-full font-bold shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
          Join the Marketplace <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default App;
