import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Store,
  Gavel,
  MessageSquare,
  Menu,
  X,
  AlertCircle,
  Check,
  ArrowRight,
  Loader2,
  Send,
  ChevronLeft,
  Settings,
  Bell,
  Trash2,
  Save,
  Building2,
  TrendingUp,
  Clock,
  Search,
  DollarSign,
  Package,
  Calendar,
  FileText,
  BarChart3,
  Filter,
  Download,
  ExternalLink,
  ShieldCheck,
  Upload,
  User,
  Lock,
  Briefcase,
  Globe,
} from "lucide-react";

/**
 * BuildBid Supplier Hub
 * Updated: Settings View with Comprehensive Business Profile & Trust Builders.
 */
function Supplier() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  // --- Profile State ---
  const [profile, setProfile] = useState({
    businessName: "Ethio Build Ltd.",
    email: "contact@ethiobuild.com",
    phone: "+251 911 223 344",
    address: "Bole Road, Addis Ababa",
    taxId: "TIN-882910",
    regNumber: "EB-2024-AA",
    yearsInBusiness: "8",
    categories: ["Construction", "Hardware"],
    bio: "Leading supplier of premium building materials in East Africa.",
    notifications: {
      newRequests: true,
      outbid: true,
      messages: true,
      wins: true,
      weeklySummary: false,
    },
  });

  // --- Data State ---
  const [allRequests] = useState([
    {
      id: "req_1",
      title: "Grade 42.5 OPC Cement",
      category: "Construction",
      qty: "500 Bags",
      maxBudget: 450000,
      deadline: "2024-06-25",
      description:
        "High-quality OPC cement needed for a commercial foundation project.",
      buyerName: "Skyline Developers",
      currentLow: 435000,
    },
    {
      id: "req_2",
      title: "Reinforcement Bars 12mm",
      category: "Metal",
      qty: "15 Tons",
      maxBudget: 890000,
      deadline: "2024-06-22",
      description: "Standard 12mm rebar for residential slab reinforcement.",
      buyerName: "MetalWorks Co.",
      currentLow: 870000,
    },
    {
      id: "req_3",
      title: "River Sand (Washed)",
      category: "Aggregates",
      qty: "20 Trucks",
      maxBudget: 120000,
      deadline: "2024-06-30",
      description: "Fine washed river sand for plastering work.",
      buyerName: "Urban Pavements",
      currentLow: 115000,
    },
  ]);

  const [myBids, setMyBids] = useState([
    {
      id: "bid_101",
      requestId: "req_1",
      requestTitle: "Grade 42.5 OPC Cement",
      amount: 435000,
      status: "Winning",
      category: "Construction",
      date: "2024-06-18",
    },
  ]);

  const [conversations, setConversations] = useState([
    {
      id: "c1",
      buyerName: "Skyline Developers",
      relatedTitle: "Grade 42.5 OPC Cement",
      lastMessage: "Can you deliver by Monday?",
      lastUpdate: "2h ago",
      messages: [
        { id: 1, text: "Hello, regarding the cement request...", sender: "me" },
        { id: 2, text: "Can you deliver by Monday?", sender: "them" },
      ],
    },
  ]);

  const [activityLog] = useState([
    {
      id: 1,
      date: "2024-06-18 14:30",
      type: "Placed Bid",
      details: "Grade 42.5 OPC Cement",
      amount: "435,000 ETB",
      status: "Winning",
      category: "Bids",
    },
    {
      id: 2,
      date: "2024-06-17 09:15",
      type: "Won Contract",
      details: "Hand Tools Bulk Supply",
      amount: "85,000 ETB",
      status: "Completed",
      category: "Contracts",
    },
    {
      id: 3,
      date: "2024-06-16 11:00",
      type: "Sent Message",
      details: "To: Skyline Developers re: Cement",
      amount: "-",
      status: "Sent",
      category: "Messages",
    },
    {
      id: 4,
      date: "2024-06-15 16:45",
      type: "Placed Bid",
      details: "12mm Reinforcement Bars",
      amount: "880,000 ETB",
      status: "Outbid",
      category: "Bids",
    },
  ]);

  // --- UI Interactions ---
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amount = Number(formData.get("amount"));
    setIsSubmitting(true);
    setTimeout(() => {
      const newBid = {
        id: "bid_" + Math.random(),
        requestId: selectedRequest.id,
        requestTitle: selectedRequest.title,
        amount: amount,
        status: amount <= selectedRequest.currentLow ? "Winning" : "Outbid",
        category: selectedRequest.category,
        date: new Date().toISOString().split("T")[0],
      };
      setMyBids([newBid, ...myBids]);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setShowBidModal(false);
        setIsSubmitted(false);
      }, 1800);
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            lastMessage: newMessage,
            messages: [
              ...conv.messages,
              { id: Date.now(), text: newMessage, sender: "me" },
            ],
          };
        }
        return conv;
      })
    );
    setNewMessage("");
  };

  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-sans text-slate-900 overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 flex items-center justify-between h-24">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-100">
              <TrendingUp size={20} />
            </div>
            <span className="font-black text-xl tracking-tight">
              Supplier Dahs
            </span>
          </div>
          <button
            className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 px-6 space-y-2">
          {[
            { id: "Overview", icon: LayoutDashboard },
            { id: "Marketplace", icon: Store },
            { id: "My Bids", icon: Gavel },
            { id: "Messages", icon: MessageSquare },
            { id: "Reports", icon: BarChart3 },
            { id: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                  : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <item.icon size={20} />
              {item.id}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-24 bg-white/80 backdrop-blur-lg border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 bg-slate-50 rounded-xl text-slate-500 hover:text-blue-600 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest hidden sm:block">
              {activeTab}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900">
                  {profile.businessName}
                </p>
                <p className="text-[10px] text-blue-600 font-bold uppercase">
                  Verified Vendor
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black shadow-lg">
                {profile.businessName[0]}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 pb-24">
          {activeTab === "Overview" && (
            <OverviewView bids={myBids} onNavigate={setActiveTab} />
          )}
          {activeTab === "Marketplace" && (
            <MarketplaceView
              requests={allRequests}
              onBid={(r) => {
                setSelectedRequest(r);
                setShowBidModal(true);
              }}
              onMessage={() => {
                setActiveConversationId("c1");
                setActiveTab("Messages");
              }}
            />
          )}
          {activeTab === "My Bids" && (
            <MyBidsView
              bids={myBids}
              onUpdate={(b) => {
                setSelectedRequest({ ...b, title: b.requestTitle });
                setShowBidModal(true);
              }}
            />
          )}
          {activeTab === "Messages" && (
            <MessagesView
              conversations={conversations}
              activeId={activeConversationId}
              setActiveId={setActiveConversationId}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              onSend={handleSendMessage}
            />
          )}
          {activeTab === "Reports" && <ReportsView log={activityLog} />}
          {activeTab === "Settings" && (
            <SettingsView profile={profile} setProfile={setProfile} />
          )}
        </main>
      </div>

      {/* PROPOSAL MODAL */}
      {showBidModal && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative animate-in zoom-in duration-200 overflow-hidden max-h-[95vh] flex flex-col">
            <div className="p-8 pb-4 flex justify-between items-start shrink-0">
              <div>
                <h2 className="text-3xl font-black tracking-tight">
                  Submit Proposal
                </h2>
                <p className="text-slate-400 font-bold mt-1">
                  Project:{" "}
                  <span className="text-blue-600">
                    {selectedRequest?.title}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setShowBidModal(false)}
                className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 pt-4">
              {isSubmitted ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <Check size={48} strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-black">Success!</h3>
                  <p className="text-slate-400 font-bold max-w-xs mx-auto text-lg leading-snug">
                    Your proposal has been delivered.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBidSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-4 p-5 bg-blue-50/50 rounded-3xl border border-blue-100">
                    <div>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                        Target Budget
                      </p>
                      <p className="text-lg font-black text-blue-900">
                        {selectedRequest?.maxBudget?.toLocaleString()} ETB
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                        Current Low Bid
                      </p>
                      <p className="text-lg font-black text-emerald-600">
                        {selectedRequest?.currentLow?.toLocaleString()} ETB
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Total Quote (ETB)
                      </label>
                      <div className="relative">
                        <DollarSign
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                          size={18}
                        />
                        <input
                          name="amount"
                          required
                          type="number"
                          placeholder="0.00"
                          className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-black text-lg transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Delivery Lead Time
                      </label>
                      <div className="relative">
                        <Calendar
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                          size={18}
                        />
                        <select
                          name="delivery"
                          className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-black text-sm appearance-none cursor-pointer transition-all"
                        >
                          <option>Next Day Delivery</option>
                          <option>2-3 Business Days</option>
                          <option>Within 1 Week</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-slate-900 text-white rounded-[24px] font-black text-lg shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        Send Proposal <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Views ---

function SettingsView({ profile, setProfile }) {
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("business");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save logic
    setTimeout(() => {
      setIsSaving(false);
      // Logic for success message could go here
    }, 1200);
  };

  const sections = [
    { id: "business", label: "Business Profile", icon: Building2 },
    { id: "verification", label: "Trust & Verification", icon: ShieldCheck },
    { id: "security", label: "Account Security", icon: Lock },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Settings</h1>
          <p className="text-slate-400 font-bold mt-2">
            Manage your supplier identity and account preferences.
          </p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeSection === s.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                  : "text-slate-400 hover:text-slate-900"
              }`}
            >
              <s.icon size={14} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        <div className="lg:col-span-2 space-y-10">
          {/* Business Info Section */}
          {activeSection === "business" && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
              <section className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">
                      Essential Information
                    </h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      Required for active bidding
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField
                    label="Business Name"
                    required
                    value={profile.businessName}
                    onChange={(v) =>
                      setProfile({ ...profile, businessName: v })
                    }
                  />
                  <InputField
                    label="Contact Email"
                    required
                    type="email"
                    value={profile.email}
                    onChange={(v) => setProfile({ ...profile, email: v })}
                  />
                  <InputField
                    label="Phone Number"
                    type="tel"
                    value={profile.phone}
                    onChange={(v) => setProfile({ ...profile, phone: v })}
                  />
                  <InputField
                    label="Tax ID / VAT Number"
                    value={profile.taxId}
                    onChange={(v) => setProfile({ ...profile, taxId: v })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Business Address
                  </label>
                  <textarea
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    rows="3"
                    className="w-full p-5 bg-slate-50 rounded-[24px] font-bold border-2 border-transparent focus:border-blue-600 outline-none transition-all resize-none"
                    placeholder="Physical location for logistics..."
                  />
                </div>
              </section>

              <section className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">Professional Bio</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      How buyers see you
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Brief Introduction
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    rows="4"
                    className="w-full p-5 bg-slate-50 rounded-[24px] font-bold border-2 border-transparent focus:border-blue-600 outline-none transition-all resize-none"
                    placeholder="Tell buyers about your reliability, experience, and scale..."
                  />
                </div>
              </section>
            </div>
          )}

          {/* Verification Section */}
          {activeSection === "verification" && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
              <section className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">Trust Builders</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      Boost your win rate with credibility
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField
                    label="Registration Number"
                    value={profile.regNumber}
                    onChange={(v) => setProfile({ ...profile, regNumber: v })}
                  />
                  <InputField
                    label="Years in Business"
                    type="number"
                    value={profile.yearsInBusiness}
                    onChange={(v) =>
                      setProfile({ ...profile, yearsInBusiness: v })
                    }
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Core Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Construction",
                      "Hardware",
                      "Electrical",
                      "Sanitary",
                      "Metal",
                      "Wood",
                    ].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          const cats = profile.categories.includes(cat)
                            ? profile.categories.filter((c) => c !== cat)
                            : [...profile.categories, cat];
                          setProfile({ ...profile, categories: cats });
                        }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all border-2 ${
                          profile.categories.includes(cat)
                            ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100"
                            : "bg-white text-slate-400 border-slate-100 hover:border-blue-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Document Verification
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileUploadCard label="Trade License / Registration" />
                    <FileUploadCard label="Tax Clearance Certificate" />
                    <FileUploadCard label="ISO / Industry Certifications" />
                    <FileUploadCard label="Portfolio (PDF/Images)" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
              <section className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">Change Password</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      Keep your account secure
                    </p>
                  </div>
                </div>

                <div className="space-y-6 max-w-md">
                  <InputField
                    label="Current Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  <InputField
                    label="New Password"
                    type="password"
                    placeholder="Min 8 characters"
                  />
                  <InputField
                    label="Confirm New Password"
                    type="password"
                    placeholder="Repeat new password"
                  />
                </div>
              </section>

              <section className="bg-red-50/30 p-8 md:p-12 rounded-[40px] border border-red-100 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                    <Trash2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-red-900">
                      Danger Zone
                    </h3>
                    <p className="text-xs text-red-400 font-bold uppercase tracking-widest mt-0.5">
                      This action is permanent
                    </p>
                  </div>
                </div>
                <p className="text-sm font-bold text-red-800 leading-relaxed max-w-xl">
                  Once you delete your account, there is no going back. All your
                  bid history, won contracts, and communication will be
                  permanently removed.
                </p>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                >
                  Delete My Account
                </button>
              </section>
            </div>
          )}
        </div>

        {/* Sidebar Info & Save Button */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -mr-16 -mt-16 rounded-full"></div>

            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-white/10 rounded-3xl mx-auto flex items-center justify-center text-4xl font-black border border-white/10 shadow-inner">
                {profile.businessName[0]}
              </div>
              <div>
                <h4 className="text-xl font-black">{profile.businessName}</h4>
                <p className="text-xs font-black text-blue-400 uppercase tracking-widest mt-1">
                  Profile {activeSection === "verification" ? "85%" : "60%"}{" "}
                  Complete
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>Verification Status</span>
                <span className="text-emerald-400">Pending Docs</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: activeSection === "verification" ? "85%" : "60%",
                  }}
                ></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Save size={20} /> Save Changes
                </>
              )}
            </button>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">
              Helpful Tip
            </h5>
            <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
              "Suppliers with uploaded tax certifications and 3+ categories win
              bids 40% more often."
            </p>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10 text-center animate-in zoom-in duration-200">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Are you sure?
            </h3>
            <p className="text-slate-500 font-bold mt-3 leading-relaxed">
              This will permanently delete your account and all associated data.
              This action cannot be undone.
            </p>
            <div className="mt-8 space-y-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-100"
              >
                Yes, Delete Permanently
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FileUploadCard({ label }) {
  return (
    <div className="p-5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors cursor-pointer group text-center space-y-2">
      <div className="w-10 h-10 bg-white rounded-xl shadow-sm mx-auto flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
        <Upload size={18} />
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600">
        {label}
      </p>
    </div>
  );
}

function ReportsView({ log }) {
  const [filterType, setFilterType] = useState("All");
  const [dateRange, setDateRange] = useState("Last 30 Days");

  const filteredLog = log.filter(
    (item) => filterType === "All" || item.category === filterType
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            Performance Reports
          </h1>
          <p className="text-slate-400 font-bold mt-2">
            Historical activity log and key performance metrics.
          </p>
        </div>
        <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportStatCard
          label="Total Bids Placed"
          value="48"
          icon={<Gavel />}
          trend="+12% from last month"
        />
        <ReportStatCard
          label="Won Contracts"
          value="14"
          icon={<Check />}
          trend="+5% from last month"
        />
        <ReportStatCard
          label="Total Earnings"
          value="1.2M ETB"
          icon={<DollarSign />}
          trend="+240k this month"
        />
        <ReportStatCard
          label="Active Bids"
          value="06"
          icon={<Clock />}
          trend="Current open items"
        />
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-slate-900 font-black">
            <Filter size={18} className="text-blue-600" />
            <span>Activity Log</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 rounded-xl text-xs font-black outline-none border-2 border-transparent focus:border-blue-600 cursor-pointer"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>Last 30 Days</option>
              <option>Custom Range</option>
            </select>
            <div className="flex bg-slate-50 p-1 rounded-xl">
              {["All", "Bids", "Contracts", "Messages"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                    filterType === type
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Date / Time
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Action Type
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Details
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Amount
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLog.length > 0 ? (
                filteredLog.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/20 transition-colors group"
                  >
                    <td className="px-8 py-6 text-sm font-bold text-slate-500 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-6 py-6">
                      <span
                        className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                          item.category === "Bids"
                            ? "bg-blue-50 text-blue-600"
                            : item.category === "Contracts"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-purple-50 text-purple-600"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 max-w-xs truncate">
                        <span className="font-black text-slate-900 text-sm truncate">
                          {item.details}
                        </span>
                        <ExternalLink
                          size={12}
                          className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-6 font-black text-sm text-slate-900">
                      {item.amount}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span
                        className={`text-[10px] font-black uppercase ${
                          ["Winning", "Completed"].includes(item.status)
                            ? "text-emerald-500"
                            : item.status === "Outbid"
                            ? "text-amber-500"
                            : "text-slate-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <BarChart3 className="text-slate-200" size={48} />
                      <p className="text-slate-400 font-bold">
                        No activity found for the selected period.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReportStatCard({ label, value, icon, trend }) {
  return (
    <div className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
          {icon}
        </div>
        <div className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-tight">
          {trend}
        </div>
      </div>
      <p className="text-4xl font-black text-slate-900 leading-none mb-2">
        {value}
      </p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

function OverviewView({ bids, onNavigate }) {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Hub Overview</h1>
          <p className="text-slate-400 font-bold mt-2">
            Active market position and quick stats.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Live Market Feed
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Proposals Sent"
          value={bids.length}
          icon={<Gavel />}
          color="bg-blue-600"
        />
        <StatCard
          label="Live Requests"
          value="12"
          icon={<Store />}
          color="bg-emerald-500"
        />
        <StatCard
          label="Unread Messages"
          value="2"
          icon={<MessageSquare />}
          color="bg-purple-500"
        />
      </div>

      <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-slate-200">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-black leading-tight">
            New Building Material <br /> Inquiries Live.
          </h2>
          <p className="text-slate-400 font-bold">
            Competitive bidding open for structural steel and aggregates.
          </p>
        </div>
        <button
          onClick={() => onNavigate("Marketplace")}
          className="px-10 py-5 bg-blue-600 rounded-[20px] font-black flex items-center gap-3 hover:scale-105 transition-all whitespace-nowrap"
        >
          Open Marketplace <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

function MarketplaceView({ requests, onBid, onMessage }) {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-black">Live Inquiries</h2>
        <div className="relative flex-1 md:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            placeholder="Search materials..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none text-sm font-bold shadow-sm"
          />
        </div>
      </div>
      <div className="grid gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col lg:flex-row items-center gap-8"
          >
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
                  {req.category}
                </span>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Clock size={14} /> Expires {req.deadline}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black group-hover:text-blue-600 transition-colors">
                  {req.title}
                </h3>
                <p className="text-slate-500 font-medium mt-1 leading-relaxed">
                  {req.description}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-slate-50">
                <InfoItem label="Needed Qty" value={req.qty} />
                <InfoItem
                  label="Est. Budget"
                  value={req.maxBudget.toLocaleString() + " ETB"}
                />
                <InfoItem label="Lead Time" value="Within 4 Days" />
                <InfoItem
                  label="Low Bid"
                  value={req.currentLow.toLocaleString() + " ETB"}
                  color="text-emerald-500"
                />
              </div>
            </div>
            <div className="flex lg:flex-col gap-3 w-full lg:w-44">
              <button
                onClick={() => onBid(req)}
                className="flex-1 py-4 bg-slate-900 text-white rounded-[20px] font-black text-sm hover:bg-blue-600 transition-all shadow-lg"
              >
                Bid Proposal
              </button>
              <button
                onClick={() => onMessage(req)}
                className="p-4 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-[20px] transition-all"
              >
                <MessageSquare size={20} className="mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyBidsView({ bids, onUpdate }) {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <h2 className="text-3xl font-black">Submitted Proposals</h2>
      <div className="bg-white rounded-[36px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Project Item
              </th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                My Quote
              </th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                Rank
              </th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bids.map((bid) => (
              <tr
                key={bid.id}
                className="hover:bg-slate-50/30 transition-colors"
              >
                <td className="px-8 py-6">
                  <p className="font-black text-slate-900">
                    {bid.requestTitle}
                  </p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
                    {bid.category}
                  </p>
                </td>
                <td className="px-6 py-6 text-center font-black text-slate-900">
                  {bid.amount.toLocaleString()} ETB
                </td>
                <td className="px-6 py-6 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
                      bid.status === "Winning"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}
                  >
                    {bid.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button
                    onClick={() => onUpdate(bid)}
                    className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <EditIcon size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MessagesView({
  conversations,
  activeId,
  setActiveId,
  newMessage,
  setNewMessage,
  onSend,
}) {
  const activeChat = conversations.find((c) => c.id === activeId);
  return (
    <div className="h-[calc(100vh-14rem)] flex bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm max-w-7xl mx-auto">
      <div
        className={`w-full md:w-80 lg:w-96 flex flex-col border-r border-slate-100 ${
          activeId ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="p-8 font-black text-2xl border-b border-slate-50 flex items-center gap-3">
          <MessageSquare className="text-blue-600" size={24} /> Chats
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`w-full p-6 text-left border-b border-slate-50 transition-all ${
                activeId === c.id
                  ? "bg-blue-50/50 border-r-4 border-r-blue-600"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-black text-sm">{c.buyerName}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">
                  {c.lastUpdate}
                </span>
              </div>
              <p className="text-[10px] font-black text-blue-600 uppercase mb-1 truncate">
                {c.relatedTitle}
              </p>
              <p className="text-xs text-slate-400 truncate italic font-medium">
                "{c.lastMessage}"
              </p>
            </button>
          ))}
        </div>
      </div>
      <div
        className={`flex-1 flex flex-col bg-slate-50/20 ${
          !activeId ? "hidden md:flex" : "flex"
        }`}
      >
        {activeId ? (
          <>
            <div className="p-6 bg-white border-b flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveId(null)}
                  className="md:hidden p-2 bg-slate-100 rounded-xl"
                >
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h3 className="font-black">{activeChat.buyerName}</h3>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    {activeChat.relatedTitle}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {activeChat.messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-5 rounded-[24px] text-sm font-bold shadow-sm ${
                      m.sender === "me"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-slate-700 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={onSend}
              className="p-6 bg-white border-t flex gap-4 shrink-0"
            >
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Negotiate..."
                className="flex-1 bg-slate-50 p-5 rounded-[20px] outline-none font-bold text-sm"
              />
              <button
                type="submit"
                className="w-14 h-14 bg-slate-900 text-white rounded-[20px] flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-4">
            <MessageSquare size={48} className="opacity-20" />
            <span className="font-black text-xs uppercase tracking-[0.2em] opacity-50">
              Select dialogue
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Elements ---

function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div
        className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white mb-6 shadow-inner`}
      >
        {icon}
      </div>
      <p className="text-4xl font-black text-slate-900 leading-none mb-1">
        {value}
      </p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

function InfoItem({ label, value, color = "text-slate-900" }) {
  return (
    <div>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className={`text-sm font-black ${color}`}>{value}</p>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label} {required && <span className="text-blue-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full p-5 bg-slate-50 rounded-[20px] font-bold border-2 border-transparent focus:border-blue-600 outline-none transition-all"
      />
    </div>
  );
}

const EditIcon = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export default Supplier;
