// https://gemini.google.com/app/3fbbbbb1dbfb2032

import React, { useState, useEffect } from "react";
import {
  Gavel,
  Settings,
  User,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
  SendHorizontal,
  Mail,
  Phone,
  Lock,
  Bell,
  FileText,
  Calendar,
  ArrowUpDown,
  Layers,
  ArrowRight,
  Sparkles,
  Eye,
  MessageCircle,
  Truck,
  Clock,
  X,
  Save,
  Building2,
  Filter,
  Search,
} from "lucide-react";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Dynamic User State
  const [userProfile, setUserProfile] = useState({
    name: "Alex Thompson",
    email: "alex.t@industrial-procure.com",
    phone: "+1 (555) 0123-4567",
    company: "Thompson Manufacturing",
    memberSince: "Jan 12, 2024",
  });

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("chat-1");
  const [messageInput, setMessageInput] = useState("");

  // Mock Data
  const [requests] = useState([
    {
      id: "RFQ-2025-001",
      title: "Grade 1 Reinforcement Steel",
      bids: 12,
      lowBid: 48200,
      status: "Awarded",
      deadline: "2025-04-10",
      category: "Construction",
    },
    {
      id: "RFQ-2025-004",
      title: "High Tensile Bolts (Pack of 1000)",
      bids: 8,
      lowBid: 7150,
      status: "Awarded",
      deadline: "2025-04-15",
      category: "Hardware",
    },
    {
      id: "RFQ-2025-009",
      title: "Modular Office Desks (x12)",
      bids: 5,
      lowBid: 15400,
      status: "Active",
      deadline: "2025-05-01",
      category: "Furniture",
    },
  ]);

  const [allBids] = useState([
    {
      id: "BID-990",
      requestId: "RFQ-2025-009",
      requestTitle: "Modular Office Desks (x12)",
      supplier: "Ethio-Furniture Hub",
      amount: 15400,
      delivery: "5 days",
      date: "2025-04-18",
      isLowest: true,
    },
    {
      id: "BID-988",
      requestId: "RFQ-2025-004",
      requestTitle: "High Tensile Bolts (Pack of 1000)",
      supplier: "Industrial Fasteners Ltd.",
      amount: 7150,
      delivery: "3 days",
      date: "2025-04-16",
      isLowest: true,
    },
    {
      id: "BID-987",
      requestId: "RFQ-2025-001",
      requestTitle: "Grade 1 Reinforcement Steel",
      supplier: "Steel Masters Co.",
      amount: 48200,
      delivery: "10 days",
      date: "2025-04-10",
      isLowest: true,
    },
  ]);

  const [contracts] = useState([
    {
      id: "CON-10293",
      title: "High Tensile Bolts",
      supplier: "Industrial Fasteners Ltd.",
      price: 7150,
      date: "2025-04-16",
      status: "Shipped",
    },
    {
      id: "CON-10294",
      title: "Grade 1 Reinforcement Steel",
      supplier: "Steel Masters Co.",
      price: 48200,
      date: "2025-04-12",
      status: "Delivered",
    },
  ]);

  // Messages State
  const [chats, setChats] = useState([
    {
      id: "chat-1",
      supplierName: "Industrial Fasteners Ltd.",
      lastMessage: "The shipment is on track for Friday delivery.",
      time: "2:30 PM",
      messages: [
        {
          id: 1,
          sender: "You",
          text: "Can you deliver by Friday?",
          time: "2:15 PM",
        },
        {
          id: 2,
          sender: "Supplier",
          text: "Yes, no problem. The shipment is on track for Friday delivery.",
          time: "2:30 PM",
        },
      ],
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: messageInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            lastMessage: messageInput,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      })
    );

    setMessageInput("");
  };

  const stats = [
    {
      label: "Open Requests",
      value: requests.filter((r) => r.status === "Active").length,
      icon: FileText,
      color: "text-blue-500",
      tab: "auctions",
    },
    {
      label: "Total Bids",
      value: allBids.length,
      icon: ArrowUpDown,
      color: "text-[#C0C0C0]",
      tab: "bids",
    },
    {
      label: "Awarded Pending",
      value: contracts.filter((c) => c.status !== "Delivered").length,
      icon: ShieldCheck,
      color: "text-emerald-500",
      tab: "awarded",
    },
    {
      label: "Unread Messages",
      value: 1,
      icon: MessageSquare,
      color: "text-purple-500",
      tab: "messages",
    },
  ];

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setActiveTab("dashboard");
  };

  const SidebarItem = ({ id, icon: Icon, label, badge }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if (window.innerWidth < 1024) setSidebarOpen(false);
      }}
      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${
        activeTab === id
          ? `bg-[#C0C0C0] text-[#0F1115] shadow-lg font-bold`
          : `text-[#94A3B8] hover:bg-[#2D333F] hover:text-[#F8FAFC]`
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon size={18} />
        <span className="text-xs lg:text-sm uppercase tracking-wider">
          {label}
        </span>
      </div>
      {badge && (
        <span className="bg-[#C0C0C0] text-[#0F1115] text-[10px] font-black px-1.5 py-0.5 rounded-md">
          {badge}
        </span>
      )}
    </button>
  );

  const renderDashboard = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-2">
            <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">
              Welcome back,{" "}
              <span className="text-[#C0C0C0]">
                {userProfile.name.split(" ")[0]}
              </span>
            </h1>
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.4em] flex items-center gap-2">
              <span className="text-[#C0C0C0]">●</span>{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(s.tab)}
                className="group bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] text-left hover:bg-white/[0.05] hover:border-white/10 transition-all"
              >
                <s.icon className={`${s.color} mb-4`} size={20} />
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-[9px] font-black text-[#64748B] uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="flex items-center justify-between p-6 bg-[#C0C0C0] rounded-[2rem] text-[#0F1115] hover:scale-[1.02] transition-all shadow-xl"
            >
              <div className="flex flex-col text-left">
                <span className="text-xs font-black uppercase tracking-widest">
                  Post New Request
                </span>
                <span className="text-[10px] font-bold opacity-70 uppercase mt-1">
                  Get custom quotes
                </span>
              </div>
              <Plus size={24} />
            </button>
            <button
              onClick={() => setActiveTab("bids")}
              className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-[2rem] text-white hover:bg-white/10 transition-all"
            >
              <div className="flex flex-col text-left">
                <span className="text-xs font-black uppercase tracking-widest">
                  Review Bids
                </span>
                <span className="text-[10px] font-bold text-[#64748B] uppercase mt-1">
                  View latest offers
                </span>
              </div>
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">
                Latest Activity
              </h3>
            </div>
            <div className="space-y-3">
              {allBids.slice(0, 3).map((bid) => (
                <div
                  key={bid.id}
                  className="group flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.03] transition-all"
                >
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-white uppercase tracking-tight">
                      {bid.requestTitle}
                    </p>
                    <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">
                      Quote from {bid.supplier}
                    </p>
                  </div>
                  <span className="text-sm font-black text-[#C0C0C0]">
                    ${bid.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 sticky top-28">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-24 h-24 bg-[#C0C0C0] rounded-[2rem] flex items-center justify-center mb-6">
                <User size={40} className="text-[#0F1115]" />
              </div>
              <h4 className="text-xl font-black text-white uppercase tracking-tighter">
                {userProfile.name}
              </h4>
              <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] mt-2">
                {userProfile.company}
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-[#334155] uppercase tracking-widest block">
                  Email
                </span>
                <span className="text-[11px] font-bold text-[#C0C0C0]">
                  {userProfile.email}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-[#334155] uppercase tracking-widest block">
                  Phone
                </span>
                <span className="text-[11px] font-bold text-[#C0C0C0]">
                  {userProfile.phone}
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("settings")}
              className="w-full mt-10 py-5 border border-white/5 rounded-2xl text-[10px] font-black text-[#64748B] uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Settings size={14} /> Account Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuctions = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            My Requests
          </h2>
          <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em]">
            Manage your active and historical RFQs
          </p>
        </div>
        <button
          onClick={() => setIsPostModalOpen(true)}
          className="px-8 py-4 bg-[#C0C0C0] text-[#0F1115] font-black text-xs uppercase tracking-widest rounded-xl flex items-center gap-2"
        >
          <Plus size={16} /> New RFQ
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.04] transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/5 rounded text-[9px] font-black text-[#64748B] uppercase tracking-widest">
                  {req.id}
                </span>
                <span
                  className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
                    req.status === "Active"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {req.status}
                </span>
              </div>
              <h4 className="text-xl font-black text-white uppercase tracking-tight">
                {req.title}
              </h4>
              <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
                {req.category} • Deadline: {req.deadline}
              </p>
            </div>
            <div className="flex items-center gap-10">
              <div className="text-right">
                <p className="text-[9px] font-black text-[#334155] uppercase tracking-widest mb-1">
                  Low Bid
                </p>
                <p className="text-lg font-black text-white">
                  ${req.lowBid.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-[#334155] uppercase tracking-widest mb-1">
                  Offers
                </p>
                <p className="text-lg font-black text-[#C0C0C0]">{req.bids}</p>
              </div>
              <button className="p-4 bg-white/5 rounded-2xl text-[#C0C0C0] hover:bg-[#C0C0C0] hover:text-[#0F1115] transition-all">
                <Eye size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBids = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="mb-12 space-y-2">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">
          Incoming Bids
        </h2>
        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em]">
          Quotes from your supplier network
        </p>
      </div>
      <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5">
              <th className="p-8 text-[9px] font-black text-[#334155] uppercase tracking-widest">
                Supplier
              </th>
              <th className="p-8 text-[9px] font-black text-[#334155] uppercase tracking-widest">
                Request
              </th>
              <th className="p-8 text-[9px] font-black text-[#334155] uppercase tracking-widest">
                Quote
              </th>
              <th className="p-8 text-[9px] font-black text-[#334155] uppercase tracking-widest">
                Lead Time
              </th>
              <th className="p-8"></th>
            </tr>
          </thead>
          <tbody>
            {allBids.map((bid) => (
              <tr
                key={bid.id}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-all group"
              >
                <td className="p-8 text-xs font-black text-white uppercase">
                  {bid.supplier}
                </td>
                <td className="p-8 text-[10px] font-bold text-[#64748B] uppercase">
                  {bid.requestTitle}
                </td>
                <td className="p-8 text-sm font-black text-[#C0C0C0]">
                  ${bid.amount.toLocaleString()}
                </td>
                <td className="p-8 text-xs font-bold text-white uppercase">
                  {bid.delivery}
                </td>
                <td className="p-8 text-right">
                  <button className="px-6 py-3 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-[#64748B] group-hover:bg-[#C0C0C0] group-hover:text-[#0F1115] transition-all">
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAwarded = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="mb-12 space-y-2">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">
          Awarded
        </h2>
        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em]">
          Track fulfillment and delivery
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contracts.map((con) => (
          <div
            key={con.id}
            className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] space-y-6"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-[#64748B] uppercase tracking-[0.2em]">
                  {con.id}
                </p>
                <h4 className="text-lg font-black text-white uppercase">
                  {con.title}
                </h4>
              </div>
              <span
                className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  con.status === "Delivered"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-orange-500/10 text-orange-400"
                }`}
              >
                {con.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
              <div>
                <p className="text-[8px] font-black text-[#334155] uppercase mb-1">
                  Supplier
                </p>
                <p className="text-xs font-bold text-[#C0C0C0]">
                  {con.supplier}
                </p>
              </div>
              <div>
                <p className="text-[8px] font-black text-[#334155] uppercase mb-1">
                  Value
                </p>
                <p className="text-xs font-bold text-[#C0C0C0]">
                  ${con.price.toLocaleString()}
                </p>
              </div>
            </div>
            <button className="w-full py-4 bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#64748B] hover:text-white transition-all flex items-center justify-center gap-2">
              <Truck size={14} /> Tracking Info
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => {
    const activeChat = chats.find((c) => c.id === selectedChatId) || chats[0];

    return (
      <div className="h-[70vh] flex bg-white/[0.01] border border-white/5 rounded-[3rem] overflow-hidden animate-in fade-in duration-500">
        <div className="w-80 border-r border-white/5 flex flex-col bg-black/20">
          <div className="p-8 border-b border-white/5 font-black uppercase text-xs tracking-widest text-white">
            Inbox
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`w-full p-8 text-left border-b border-white/5 transition-all ${
                  selectedChatId === chat.id
                    ? "bg-white/5"
                    : "hover:bg-white/[0.02]"
                }`}
              >
                <p className="text-xs font-black text-white uppercase mb-1">
                  {chat.supplierName}
                </p>
                <p className="text-[10px] font-medium text-[#64748B] truncate">
                  {chat.lastMessage}
                </p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <p className="text-sm font-black text-white uppercase tracking-widest">
              {activeChat.supplierName}
            </p>
          </div>
          <div className="flex-1 p-10 overflow-y-auto space-y-6 custom-scrollbar">
            {activeChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-6 rounded-[2rem] ${
                    msg.sender === "You"
                      ? "bg-[#C0C0C0] text-[#0F1115] rounded-tr-none"
                      : "bg-white/5 text-white rounded-tl-none"
                  }`}
                >
                  <p className="text-sm font-bold">{msg.text}</p>
                  <p className="text-[8px] font-black uppercase mt-2 opacity-50">
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSendMessage}
            className="p-8 border-t border-white/5 bg-black/10"
          >
            <div className="relative">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm text-white focus:outline-none focus:border-[#C0C0C0] transition-all"
              />
              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#C0C0C0] text-[#0F1115] rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                <SendHorizontal size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col gap-2 mb-12">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">
          Account Settings
        </h2>
        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em]">
          Manage your profile and organization
        </p>
      </div>
      <form onSubmit={handleUpdateProfile} className="space-y-10">
        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#334155]"
                  size={18}
                />
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-sm text-white focus:outline-none focus:border-[#C0C0C0]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest ml-1">
                Company
              </label>
              <div className="relative">
                <Building2
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#334155]"
                  size={18}
                />
                <input
                  type="text"
                  value={userProfile.company}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, company: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-sm text-white focus:outline-none focus:border-[#C0C0C0]"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest ml-1">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#334155]"
                  size={18}
                />
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-sm text-white focus:outline-none focus:border-[#C0C0C0]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest ml-1">
                Phone
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#334155]"
                  size={18}
                />
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, phone: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-sm text-white focus:outline-none focus:border-[#C0C0C0]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-10 py-6 bg-[#C0C0C0] text-[#0F1115] font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] transition-all flex items-center gap-3"
          >
            <Save size={18} /> Save Changes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dashboard")}
            className="px-10 py-6 bg-white/5 text-[#64748B] font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:text-white transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F1115] flex font-sans antialiased text-[#F8FAFC]">
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-72 bg-[#090B0E] border-r border-[#334155]/40 transition-transform duration-500 lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-10 flex items-center space-x-3">
          <div className="bg-[#C0C0C0] p-3 rounded-2xl">
            <Gavel size={24} className="text-[#0F1115]" />
          </div>
          <span className="text-2xl font-black text-white italic uppercase tracking-tighter">
            REVERSE<span className="text-[#C0C0C0]"> - AUCTION</span>
          </span>
        </div>
        <nav className="flex-1 px-6 mt-10 space-y-2">
          <SidebarItem id="dashboard" icon={BarChart3} label="Dashboard" />
          <SidebarItem id="auctions" icon={Gavel} label="My Requests" />
          <SidebarItem
            id="bids"
            icon={ArrowUpDown}
            label="Incoming Bids"
            badge={1}
          />
          <SidebarItem id="awarded" icon={ShieldCheck} label="Awarded" />
          <SidebarItem id="messages" icon={MessageSquare} label="Messages" />
          <div className="my-10 border-t border-[#334155]/30 mx-4"></div>
          <SidebarItem id="settings" icon={Settings} label="Settings" />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-24 border-b border-[#334155]/40 flex items-center justify-between px-14 bg-[#0F1115]/80 backdrop-blur-xl z-[40]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-3 text-white bg-white/5 rounded-xl"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-white uppercase tracking-widest">
                {userProfile.name}
              </p>
              <p className="text-[8px] font-bold text-[#64748B] uppercase tracking-widest">
                {userProfile.company}
              </p>
            </div>
            <div
              className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center cursor-pointer"
              onClick={() => setActiveTab("settings")}
            >
              <User size={22} className="text-[#C0C0C0]" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-14 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "auctions" && renderAuctions()}
            {activeTab === "bids" && renderBids()}
            {activeTab === "awarded" && renderAwarded()}
            {activeTab === "messages" && renderMessages()}
            {activeTab === "settings" && renderSettings()}
          </div>
        </div>
      </main>

      {isPostModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsPostModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-2xl bg-[#0F1115] border border-white/10 rounded-[3rem] p-10 shadow-2xl">
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="absolute top-8 right-8 text-[#64748B] hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-black italic uppercase text-white mb-6">
              Create Request
            </h2>
            <div className="space-y-4 mb-10">
              <input
                placeholder="Title"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-white focus:border-[#C0C0C0] outline-none"
              />
              <input
                placeholder="Budget"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-white focus:border-[#C0C0C0] outline-none"
              />
            </div>
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="w-full py-5 bg-[#C0C0C0] text-[#0F1115] font-black uppercase tracking-widest rounded-2xl"
            >
              Publish RFQ
            </button>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }`,
        }}
      />
    </div>
  );
};

export default App;
