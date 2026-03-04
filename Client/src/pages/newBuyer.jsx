import React, { useState, useEffect } from "react";
import {
  Gavel,
  Settings,
  User,
  LogOut,
  MessageSquare,
  Plus,
  BarChart3,
  Mail,
  Phone,
  Save,
  Building2,
  CheckCircle2,
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Clock,
  ChevronRight,
  ShieldCheck,
  TrendingDown,
  Briefcase,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

/**
 * FIXED INPUT COMPONENT
 */
const StableInput = ({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  id,
}) => {
  return (
    <div className="group space-y-2">
      <label
        htmlFor={id}
        className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none">
          <Icon size={18} />
        </div>
        <input
          id={id}
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 transition-all outline-none shadow-sm"
        />
      </div>
    </div>
  );
};

const NewBuyer = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Buyer State
  const [userProfile, setUserProfile] = useState({
    name: "Faris Naser",
    email: "EthioAuction-industries.com",
    phone: "+251-9-873-076-67",
    company: "solo Manufacturing Group",
    role: "Senior Procurement Manager",
  });

  const [formData, setFormData] = useState({ ...userProfile });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setUserProfile({ ...formData });
      setIsUpdating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  const BentoCard = ({ children, title, icon: Icon, className = "" }) => (
    <div
      className={`bg-white border border-slate-100 rounded-[24px] shadow-sm p-6 ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {title}
          </h3>
          {Icon && <Icon size={16} className="text-slate-300" />}
        </div>
      )}
      {children}
    </div>
  );

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center px-6 py-4 space-x-4 transition-all group relative ${
        activeTab === id
          ? `text-white bg-blue-600/10 rounded-xl`
          : `text-slate-400 hover:text-slate-200`
      }`}
    >
      <Icon size={20} className={activeTab === id ? "text-blue-500" : ""} />
      <span className="text-sm font-bold tracking-tight flex-1 text-left">
        {label}
      </span>
      {activeTab === id && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-full" />
      )}
    </button>
  );

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase italic">
            Buyer <span className="text-blue-600">Overview</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Managing your procurement lifecycle
          </p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <Plus size={16} /> Create New RFP
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoCard title="Active Auctions" icon={Gavel}>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-black italic">12</span>
            <span className="text-emerald-500 text-[10px] font-bold flex items-center gap-1">
              <TrendingDown size={14} /> -8% Cost
            </span>
          </div>
        </BentoCard>
        <BentoCard title="Pending RFPs" icon={FileText}>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-black italic">04</span>
            <span className="text-slate-400 text-[10px] font-bold italic">
              Waiting for bids
            </span>
          </div>
        </BentoCard>
        <BentoCard title="Total Spent" icon={ShoppingCart}>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-black italic">$1.2M</span>
            <span className="text-slate-400 text-[10px] font-bold italic">
              FY2024
            </span>
          </div>
        </BentoCard>
      </div>

      {/* List content omitted for brevity but functionally present */}
      <BentoCard title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["My Auctions", "RFPs", "Suppliers", "History"].map((item) => (
            <button
              key={item}
              className="p-4 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </BentoCard>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          {/* CRITICAL NAVIGATION BUTTON */}
          <button
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={16} /> Exit to Dashboard
          </button>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
              Buyer <span className="text-blue-600">Profile</span>
            </h2>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Update your procurement officer credentials
            </p>
          </div>
        </div>
        {showSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase animate-bounce shadow-sm">
            <CheckCircle2 size={14} /> Profile Synchronized
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <BentoCard className="flex flex-col items-center text-center py-10">
            <div className="relative mb-6">
              <div className="w-28 h-28 bg-slate-900 rounded-[40px] flex items-center justify-center text-white text-3xl font-black shadow-2xl overflow-hidden">
                {formData.name ? formData.name[0].toUpperCase() : "B"}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-2xl border-4 border-white">
                <ShieldCheck size={20} />
              </div>
            </div>
            <h4 className="font-black text-slate-900 uppercase tracking-tight">
              {formData.name}
            </h4>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
              {formData.role}
            </p>
          </BentoCard>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <BentoCard title="Account Settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StableInput
                id="name"
                label="Full Name"
                icon={User}
                value={formData.name}
                onChange={(val) => setFormData((p) => ({ ...p, name: val }))}
              />
              <StableInput
                id="company"
                label="Company"
                icon={Building2}
                value={formData.company}
                onChange={(val) => setFormData((p) => ({ ...p, company: val }))}
              />
              <StableInput
                id="email"
                label="Email"
                icon={Mail}
                value={formData.email}
                onChange={(val) => setFormData((p) => ({ ...p, email: val }))}
              />
              <StableInput
                id="phone"
                label="Phone"
                icon={Phone}
                value={formData.phone}
                onChange={(val) => setFormData((p) => ({ ...p, phone: val }))}
              />
            </div>
          </BentoCard>

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={handleUpdateProfile}
              className="px-12 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
            >
              {isUpdating ? (
                "Saving..."
              ) : (
                <>
                  <Save size={16} /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex font-sans antialiased text-slate-900 relative">
      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-[60] lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-72 bg-[#0f172a] transition-transform duration-300 transform lg:relative lg:translate-x-0 m-4 rounded-[32px] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[120%]"
        }`}
      >
        <div className="h-28 flex items-center px-10 justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Gavel size={22} className="text-white" />
            </div>
            <span className="text-xl font-black text-white italic uppercase tracking-tighter">
              BOND.ID
            </span>
          </div>
          <button
            className="lg:hidden text-slate-400"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem
            id="dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
          />
          <SidebarItem id="auctions" icon={Gavel} label="My Auctions" />
          <SidebarItem id="rfps" icon={FileText} label="RFPs & Bids" />
          <SidebarItem
            id="messages"
            icon={MessageSquare}
            label="Supplier Chat"
          />
          <div className="px-6 mt-8 mb-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Account
            </p>
          </div>
          <SidebarItem id="settings" icon={Settings} label="Settings" />
        </nav>

        <div className="p-8">
          <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-colors">
            <span className="text-[10px] font-black uppercase tracking-widest">
              Logout
            </span>
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-24 flex items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-3 bg-slate-100 rounded-xl text-slate-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Buyer Portal
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden sm:block text-right">
              <p className="text-[10px] font-black uppercase tracking-tight">
                {userProfile.name}
              </p>
              <p className="text-[9px] font-bold text-slate-400 uppercase italic leading-none">
                {userProfile.company}
              </p>
            </div>
            <div className="w-12 h-12 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center text-slate-900 font-black italic">
              {userProfile.name[0]}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 lg:px-12 pb-12 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {activeTab === "settings" ? (
              renderSettings()
            ) : activeTab === "dashboard" ? (
              renderDashboard()
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-slate-300">
                <div className="bg-slate-100 p-8 rounded-[40px] mb-6">
                  <Clock size={48} className="opacity-40" />
                </div>
                <p className="font-black uppercase tracking-[0.2em] text-xs">
                  Section Under Construction
                </p>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="mt-4 text-blue-600 font-black text-[10px] uppercase underline decoration-2 underline-offset-4"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; } 
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
};

export default NewBuyer;
