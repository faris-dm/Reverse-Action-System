import React, { useState, useEffect } from "react";

import CreateRfpModal from "./buyercomponts/create";
import {
  Gavel,
  Settings,
  LogOut,
  MessageSquare,
  Plus,
  MapPin,
  Package,
  DollarSign,
  LayoutDashboard,
  ShoppingCart,
  Clock,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Menu,
  X,
  Search,
  Star,
  Trophy,
  Bell,
  FileText,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  Building2,
  Users,
  Mail,
  Lock,
  Globe,
  Camera,
  SendHorizontal,
} from "lucide-react";

function App() {
  // --- CORE STATE ---
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const REandoumFun = async () => {
      try {
        const res = await fetch("http://localhost:21000/api/auth/status", {
          credentials: "include",
        });
        if (!res.ok) window.location.href = "/buyerform";
      } catch (err) {
        window.location.href = "/buyerform";
      }
    };
    REandoumFun();
  }, []);

  // the auth of the User before going to the dashboard
  useEffect(() => {
    const getBuyerData = async () => {
      try {
        const respond = await fetch("http://localhost:21000/api/me", {
          credentials: "include",
        });
        if (respond.status === 401) {
          window.location.href = "/BuyerRegistor";
          return;
        }

        if (!respond.ok) {
          throw new Error("could not load the data to biyrt profile");
        }

        const data = await respond.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getBuyerData();
  }, []);

  // Added the files

  //

  // --- DATA STATE ---
  const [newRfp, setNewRfp] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    quantity: "",
    location: "",
    expedet: "",
    priority: "",
  });

  const [myRequests, setMyRequests] = useState([
    {
      id: "REQ-9901",
      title: "1,000 Industrial Safety Helmets",
      bidsCount: 4,
      lowBid: 45000,
      budget: 55000,
      quantity: "10",
      location: "Jimma ,City center",
      deadline: "2025-05-20",
      status: "Open",
      category: "Safety",
    },
    {
      id: "REQ-9902",
      title: "Office Ventilation Upgrade",
      bidsCount: 2,
      lowBid: 120000,
      budget: 150000,
      quantity: "10",
      location: "Jimma ,City center",
      deadline: "2025-06-12",
      status: "Open",
      category: "Maintenance",
    },
    {
      id: "REQ-8842",
      title: "Fleet Maintenance Services",
      bidsCount: 8,
      lowBid: 8500,
      budget: 10000,
      quantity: "10",
      location: "Jimma ,City center",
      deadline: "2025-04-10",
      status: "Awarded",
      category: "Logistics",
    },
  ]);

  const [suppliers] = useState([
    {
      id: "S-01",
      name: "Global Safe Inc",
      rating: 4.8,
      projects: 12,
      category: "Safety",
      status: "Verified",
    },
    {
      id: "S-02",
      name: "TechBuild Solutions",
      rating: 4.5,
      projects: 28,
      category: "Construction",
      status: "Verified",
    },
    {
      id: "S-03",
      name: "EcoLogistics",
      rating: 4.9,
      projects: 5,
      category: "Logistics",
      status: "Pending",
    },
  ]);

  const [conversations] = useState([
    {
      id: "CHAT-001",
      buyer: "Global Safe Inc",
      itemTitle: "Industrial Safety Helmets",
      lastMessage: "Regarding the ANSI certification...",
      time: "10:30 AM",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: "buyer",
          text: "Hello, we saw your RFP for safety helmets.",
          time: "09:00 AM",
        },
        {
          id: 2,
          sender: "me",
          text: "Great! Do you have specific color requirements?",
          time: "09:15 AM",
        },
        {
          id: 3,
          sender: "buyer",
          text: "Regarding the ANSI certification, do they meet Z89.1 standards?",
          time: "10:30 AM",
        },
      ],
    },
  ]);

  // --- HANDLERS ---
  const resetForm = () => {
    setNewRfp({
      title: "",
      category: "Industrial",
      description: "",
      budget: "",
      deadline: "",
      priority: "Normal",
    });
    setFormStep(1);
    setIsCreateModalOpen(false);
  };

  const handlePublishRfp = () => {
    const rfpId = `REQ-${Math.floor(Math.random() * 9000) + 1000}`;
    const newEntry = {
      id: rfpId,
      title: newRfp.title,
      description: newRfp.description, // Added
      category: newRfp.category,
      priority: newRfp.priority, // Added
      budget: parseInt(newRfp.budget) || 0,
      quantity: newRfp.quantity, // Added
      location: newRfp.location, // Added
      deadline: newRfp.expedet, // Match this to your form state 'expedet'
      status: "Open",
      bidsCount: 0,
      lowBid: null,
    };
    setMyRequests([newEntry, ...myRequests]);
    resetForm();
    setActiveTab("requests");
  };

  const handleSignOut = () => {
    window.location.reload();
  };

  // --- REUSABLE COMPONENTS (Inside App to avoid hook context issues) ---
  const BentoCard = ({
    children,
    title,
    icon: Icon,
    className = "",
    noPadding = false,
  }) => (
    <div
      className={`bg-white border border-slate-100 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 overflow-hidden ${
        noPadding ? "" : "p-8"
      } ${className}`}
    >
      {title && (
        <div
          className={`flex items-center justify-between mb-6 ${
            noPadding ? "p-8 pb-0" : ""
          }`}
        >
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {title}
          </h3>
          {Icon && <Icon size={18} className="text-slate-300" />}
        </div>
      )}
      {children}
    </div>
  );

  const Badge = ({ children, status }) => {
    const styles = {
      Open: "bg-emerald-50 text-emerald-600 border-emerald-100",
      Awarded: "bg-amber-50 text-amber-600 border-amber-100",
      Verified: "bg-blue-50 text-blue-600 border-blue-100",
      Pending: "bg-slate-50 text-slate-500 border-slate-100",
    };
    return (
      <span
        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
          styles[status] || styles.Pending
        }`}
      >
        {children}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex font-sans antialiased text-slate-900 overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-[70] bg-[#0f172a] transition-all duration-500 lg:relative lg:translate-x-0 w-80 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-32 flex items-center px-10">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2.5 rounded-[16px] shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <ShoppingCart size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black text-white italic uppercase tracking-tighter">
              Buyer<span className="text-blue-500 px-1">hub</span>
            </span>
          </div>
        </div>
        <nav className="flex-1 px-4 mt-4 space-y-2">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
            { id: "requests", icon: Gavel, label: "My RFPs" },
            { id: "suppliers", icon: Building2, label: "Suppliers" },
            { id: "messages", icon: MessageSquare, label: "Messages" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-4 space-x-4 transition-all duration-300 relative group ${
                activeTab === item.id
                  ? `text-white`
                  : `text-slate-400 hover:text-slate-200`
              }`}
            >
              <item.icon
                size={20}
                className={activeTab === item.id ? "text-blue-500" : ""}
              />
              <span className="text-[11px] font-black uppercase tracking-widest flex-1 text-left">
                {item.label}
              </span>
              {activeTab === item.id && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full" />
              )}
            </button>
          ))}
        </nav>
        <div className="p-8 border-t border-slate-800/50 mt-auto">
          <button
            onClick={() => setIsSignOutModalOpen(true)}
            className="w-full flex items-center gap-4 text-slate-500 hover:text-red-400 transition-colors group"
          >
            <LogOut
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
            <span className="text-[11px] font-black uppercase tracking-widest">
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-24 border-b border-slate-100 flex items-center justify-between px-8 lg:px-14 bg-white/80 backdrop-blur-md z-[40]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-4 text-slate-900 bg-slate-50 rounded-[16px]"
          >
            <Menu size={22} />
          </button>
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
                size={18}
              />
              <input
                placeholder="Search market intelligence..."
                className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 pl-14 text-xs font-bold outline-none focus:bg-white focus:border-blue-600 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="p-4 text-slate-400 bg-slate-50 rounded-[18px] relative">
              <Bell size={22} />
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full border-2 border-white" />
            </button>
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => setActiveTab("settings")}
            >
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-tight">
                  {(profile?.fullName || "Lading .......").toUpperCase()}
                </p>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                  {profile?.role || "Buyer"}
                </p>
              </div>
              <div className="w-12 h-12 bg-slate-900 rounded-[18px] flex items-center justify-center text-white font-black text-sm shadow-xl hover:bg-blue-600 transition-colors">
                {profile?.fullName
                  ? profile.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "..."}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-14 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full pb-20">
            {/* VIEW SWITCHER */}
            {activeTab === "dashboard" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
                      Over<span className="text-blue-600">View </span>
                    </h1>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-4">
                      Geneal Report for Buyer chain
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-8 py-5 bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-[24px] shadow-2xl hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-3 w-fit"
                  >
                    <Plus size={18} /> Create Auction
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <BentoCard title="Active RFPs" icon={Gavel}>
                    <div className="text-4xl font-black text-slate-900">
                      {myRequests.filter((r) => r.status === "Open").length}
                    </div>
                  </BentoCard>
                  <BentoCard title="Suppliers" icon={Users}>
                    <div className="text-4xl font-black text-slate-900">
                      {suppliers.length}
                    </div>
                  </BentoCard>
                  <BentoCard title="Total Committed" icon={CreditCard}>
                    <div className="text-4xl font-black text-slate-900">
                      ₱842k
                    </div>
                  </BentoCard>
                  <BentoCard title="Avg Savings" icon={TrendingUp}>
                    <div className="text-4xl font-black text-blue-600">
                      14.2%
                    </div>
                  </BentoCard>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <BentoCard title="Recent Activity" icon={Clock} noPadding>
                    <div className="divide-y divide-slate-50">
                      {myRequests.slice(0, 3).map((req, i) => (
                        <div
                          key={i}
                          className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                              <FileText size={18} />
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase text-slate-900">
                                {req.title}
                              </p>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                Update received • 3m ago
                              </p>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-slate-300" />
                        </div>
                      ))}
                    </div>
                  </BentoCard>
                  <BentoCard title="Top Bidders" icon={Trophy} noPadding>
                    <div className="divide-y divide-slate-50">
                      {suppliers.slice(0, 3).map((s, i) => (
                        <div
                          key={i}
                          className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-[10px]">
                              {s.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase text-slate-900">
                                {s.name}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <Star
                                  size={10}
                                  className="fill-amber-400 text-amber-400"
                                />
                                <span className="text-[9px] font-black text-slate-500 uppercase">
                                  {s.rating} Rating
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge status={s.status}>{s.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </BentoCard>
                </div>
              </div>
            )}

            {activeTab === "requests" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter">
                      My <span className="text-blue-600">Requests</span>
                    </h2>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">
                      Manage your current RFPs and bidding cycles
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {myRequests.map((req) => (
                    <BentoCard
                      key={req.id}
                      noPadding
                      className="hover:border-blue-200 group"
                    >
                      {/* added  request here */}
                      <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        {/* added here */}
                        {/* Inside your myRequests.map((req) => ... */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge status={req.status}>{req.status}</Badge>

                            {/* NEW: Priority Badge */}
                            <span
                              className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${
                                req.priority === "Urgent"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {req.priority}
                            </span>

                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                              {req.id}
                            </span>
                          </div>

                          <h4 className="text-xl font-black uppercase text-slate-900">
                            {req.title}
                          </h4>

                          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                            {/* Budget */}
                            <div className="flex items-center gap-2">
                              <DollarSign size={14} className="text-blue-600" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                Budget: ETB {req.budget.toLocaleString()}
                              </span>
                            </div>

                            {/* NEW: Quantity */}
                            <div className="flex items-center gap-2">
                              <Package size={14} className="text-blue-600" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                Qty: {req.quantity}
                              </span>
                            </div>

                            {/* NEW: Location */}
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-blue-600" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                {req.location}
                              </span>
                            </div>

                            {/* Deadline */}
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-blue-600" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                Closes:{" "}
                                {new Date(req.deadline).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* added here */}
                        <div className="flex items-center gap-4">
                          <button className="px-6 py-3 bg-slate-900 text-white font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-colors">
                            View Bids
                          </button>
                          <button className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    </BentoCard>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "suppliers" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter">
                      Verified <span className="text-blue-600">Suppliers</span>
                    </h2>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">
                      Trusted partners in your supply network
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suppliers.map((s) => (
                    <BentoCard key={s.id} className="group">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-xl font-black">
                          {s.name.charAt(0)}
                        </div>
                        <Badge status={s.status}>{s.status}</Badge>
                      </div>
                      <h3 className="text-lg font-black uppercase text-slate-900">
                        {s.name}
                      </h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 mb-6">
                        {s.category} Specialist
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            Rating
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star
                              size={12}
                              className="fill-amber-400 text-amber-400"
                            />
                            <span className="text-xs font-black uppercase text-slate-900">
                              {s.rating}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            Projects
                          </p>
                          <p className="text-xs font-black uppercase text-slate-900 mt-1">
                            {s.projects}
                          </p>
                        </div>
                      </div>
                      <button className="w-full mt-8 py-4 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all text-[9px] font-black uppercase tracking-widest rounded-xl">
                        View Profile
                      </button>
                    </BentoCard>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="flex h-[calc(100vh-200px)] gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div
                  className={`${
                    selectedConversation ? "hidden lg:flex" : "flex"
                  } w-full lg:w-[400px] flex-col gap-6`}
                >
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
                      In<span className="text-blue-600">box</span>
                    </h2>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Supplier Communications
                    </p>
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`p-6 rounded-[24px] cursor-pointer transition-all border ${
                          selectedConversation?.id === conv.id
                            ? "bg-slate-900 border-slate-900 text-white shadow-xl translate-x-2"
                            : "bg-white border-slate-100 hover:border-blue-200"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4
                            className={`text-sm font-black uppercase tracking-tight ${
                              selectedConversation?.id === conv.id
                                ? "text-white"
                                : "text-slate-900"
                            }`}
                          >
                            {conv.buyer}
                          </h4>
                          <span
                            className={`text-[9px] font-black uppercase tracking-widest text-slate-400`}
                          >
                            {conv.time}
                          </span>
                        </div>
                        <p
                          className={`text-[10px] font-black uppercase tracking-widest mb-3 ${
                            selectedConversation?.id === conv.id
                              ? "text-blue-400"
                              : "text-blue-600"
                          }`}
                        >
                          {conv.itemTitle}
                        </p>
                        <div className="flex justify-between items-center">
                          <p
                            className={`text-xs truncate max-w-[200px] ${
                              selectedConversation?.id === conv.id
                                ? "text-slate-300"
                                : "text-slate-500 font-medium"
                            }`}
                          >
                            {conv.lastMessage}
                          </p>
                          {conv.unread > 0 &&
                            selectedConversation?.id !== conv.id && (
                              <span className="bg-blue-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                                {conv.unread}
                              </span>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className={`${
                    !selectedConversation ? "hidden lg:flex" : "flex"
                  } flex-1 flex-col bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden`}
                >
                  {selectedConversation ? (
                    <div className="flex flex-col h-full">
                      <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setSelectedConversation(null)}
                            className="lg:hidden p-2"
                          >
                            <ArrowLeft size={20} />
                          </button>
                          <div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                              {selectedConversation.buyer}
                            </h3>
                            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                              {selectedConversation.itemTitle}
                            </p>
                          </div>
                        </div>
                        <button className="px-6 py-3 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl">
                          Award Contract
                        </button>
                      </div>
                      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-slate-50/30">
                        {selectedConversation.messages.map((m) => (
                          <div
                            key={m.id}
                            className={`flex ${
                              m.sender === "me"
                                ? "justify-end"
                                : "justify-start"
                            } mb-6`}
                          >
                            <div
                              className={`p-5 rounded-2xl max-w-sm shadow-sm ${
                                m.sender === "me"
                                  ? "bg-blue-600 text-white rounded-tr-none"
                                  : "bg-white border border-slate-100 text-slate-900 rounded-tl-none"
                              }`}
                            >
                              <p className="text-sm font-bold leading-relaxed">
                                {m.text}
                              </p>
                              <p
                                className={`text-[8px] font-black uppercase mt-3 ${
                                  m.sender === "me"
                                    ? "text-blue-200"
                                    : "text-slate-400"
                                }`}
                              >
                                {m.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-8 bg-white border-t border-slate-50">
                        <div className="flex gap-4">
                          <input
                            placeholder="Type your negotiation message..."
                            className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold outline-none focus:border-blue-600"
                          />
                          <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all">
                            <SendHorizontal size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-200 text-center p-12">
                      <MessageSquare size={80} strokeWidth={1} />
                      <h3 className="text-2xl font-black uppercase text-slate-300 mt-6 tracking-tight italic">
                        No Conversation <br />
                        Selected
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-10 animate-in fade-in duration-500">
                {/* ✅ ADD THIS - Show loading spinner */}
                {loading && (
                  <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="mt-4 text-slate-500">
                        Loading your profile...
                      </p>
                    </div>
                  </div>
                )}

                {/* ✅ ADD THIS - Show error message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <p className="text-red-600 font-bold">Error: {error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl text-sm"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* ✅ ADD THIS - Show settings only when profile is loaded */}
                {!loading && !error && profile && (
                  <>{/* Your existing settings JSX goes here */}</>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-10 animate-in fade-in duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter">
                      Account <span className="text-blue-600">Settings</span>
                    </h2>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">
                      Manage your profile, security and preferences
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 space-y-8">
                    <BentoCard>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative group">
                          <div
                            key={profile?.companyName}
                            className="w-32 h-32 rounded-[40px] bg-slate-900 flex items-center justify-center text-white text-4xl font-black shadow-2xl"
                          >
                            {profile?.companyName}
                          </div>
                          <button className="absolute -bottom-2 -right-2 p-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                            <Camera size={18} />
                          </button>
                        </div>
                        <h3
                          key={profile?.fullName}
                          className="text-xl font-black uppercase text-slate-900 mt-6"
                        >
                          {(profile?.fullName || "Jone Done").toUpperCase()}
                        </h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Procurement Director
                        </p>
                        <div className="mt-8 pt-8 border-t border-slate-50 w-full space-y-4">
                          <div className="flex items-center gap-4 text-left">
                            <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
                              <Mail size={16} />
                            </div>
                            <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                Email Address
                              </p>
                              <p className="text-[10px] font-black uppercase text-slate-900">
                                {profile?.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-left">
                            <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
                              <Globe size={16} />
                            </div>
                            <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                Timezone
                              </p>
                              <p className="text-[10px] font-black uppercase text-slate-900">
                                Manila, PH (GMT+8)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </BentoCard>
                  </div>
                  <div className="lg:col-span-2 space-y-8">
                    <BentoCard title="General Information" icon={Users}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Full Name
                          </label>
                          <input
                            key={profile?.fullName}
                            defaultValue={(
                              profile?.fullName || "Jone Doe"
                            ).toUpperCase()}
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] p-4 text-xs font-bold outline-none focus:border-blue-600"
                          />
                        </div>
                        {/* phone */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Phone
                          </label>
                          <input
                            key={profile?.phone}
                            defaultValue={profile?.phone || "+251987307655"}
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] p-4 text-xs font-bold outline-none focus:border-blue-600"
                          />
                        </div>

                        {/* added new */}
                        {/* email */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            email
                          </label>
                          <input
                            key={profile?.email}
                            defaultValue={profile?.email || "solonan@gmail.com"}
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] p-4 text-xs font-bold outline-none focus:border-blue-600"
                          />
                        </div>

                        {/* business Name */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            business Name
                          </label>
                          <input
                            key={profile?.companyName}
                            defaultValue={profile?.companyName}
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] p-4 text-xs font-bold outline-none focus:border-blue-600"
                          />
                        </div>
                        {/* address */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Address
                          </label>
                          <input
                            key={
                              profile?.companyAddress ||
                              "Jimma City City Center"
                            }
                            defaultValue={
                              profile?.companyAddress ||
                              "City Center ,Jimmax City"
                            }
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] p-4 text-xs font-bold outline-none focus:border-blue-600"
                          />
                        </div>

                        {/* tax Id */}

                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Tin Number
                          </label>
                          <input
                            key={profile?.taxId}
                            defaultValue={profile?.taxId || "TDER4567TY"}
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] p-4 text-xs font-bold outline-none focus:border-blue-600"
                          />
                        </div>

                        {/* business express  */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Business Expreance
                          </label>
                          <input
                            key={profile?.yearsInBusiness}
                            defaultValue={
                              profile?.yearsInBusiness || "Bigginer "
                            }
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] p-4 text-xs font-bold outline-none focus:border-blue-600"
                          />
                        </div>

                        {/* catagores */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Buyer Catagories
                          </label>
                          <input
                            defaultValue="Construction"
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] p-4 text-xs font-bold outline-none focus:border-blue-600"
                          />
                        </div>

                        {/* added new componts in the form */}
                      </div>
                    </BentoCard>
                    <BentoCard title="Security & Authentication" icon={Lock}>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px]">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
                              <ShieldCheck size={20} />
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase text-slate-900">
                                Two-Factor Authentication
                              </p>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                Add extra security
                              </p>
                            </div>
                          </div>
                          <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                        <button className="w-full py-5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-[24px] hover:bg-blue-600 transition-colors">
                          Change Password
                        </button>
                      </div>
                    </BentoCard>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODALS */}
      {isSignOutModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsSignOutModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-[32px] p-10 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[30px] flex items-center justify-center mx-auto mb-6">
              <LogOut size={32} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
              Sign Out?
            </h3>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">
              Are you sure you want to end your session?
            </p>
            <div className="grid grid-cols-2 gap-4 mt-10">
              <button
                onClick={() => setIsSignOutModalOpen(false)}
                className="py-5 bg-slate-100 text-slate-500 font-black uppercase text-[10px] tracking-widest rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="py-5 bg-red-500 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* added here */}

      <CreateRfpModal
        isCreateModalOpen={isCreateModalOpen}
        resetForm={resetForm}
        newRfp={newRfp}
        setNewRfp={setNewRfp}
        formStep={formStep}
        setFormStep={setFormStep}
        handlePublishRfp={handlePublishRfp}
      />

      {/* added here */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; } 
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
}
export default App;
