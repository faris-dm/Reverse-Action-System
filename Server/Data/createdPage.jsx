import React, { useState, useEffect } from "react";
import {
  Gavel,
  History,
  Settings,
  Bell,
  Search,
  Clock,
  ShieldCheck,
  TrendingDown,
  User,
  LogOut,
  Menu,
  X,
  ShoppingBag,
  Heart,
  Filter,
  ArrowUpDown,
  Maximize2,
  AlertCircle,
  Plus,
  CheckCircle2,
  CreditCard,
  Truck,
  ExternalLink,
  Package,
  Trash2,
  FileText,
  Star,
  Download,
  Printer,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldAlert,
  Save,
  ChevronRight,
  MessageSquare,
  Send,
  MoreVertical,
  Paperclip,
  Award,
  Zap,
} from "lucide-react";

const App = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Mock Data for Messages
  const [conversations] = useState([
    {
      id: 1,
      sender: "Ethio Tools & Hardware",
      lastMessage:
        "The shipment for the Jackhammer is scheduled for tomorrow morning.",
      time: "14:20",
      unread: true,
      item: "Heavy Duty Jackhammer (ORD-4492-BX)",
      avatar: "ET",
      messages: [
        {
          id: 1,
          type: "received",
          text: "Hello Faris, thank you for the prompt payment.",
          time: "10:00 AM",
        },
        {
          id: 2,
          type: "sent",
          text: "Thank you! When can I expect the delivery tracking?",
          time: "11:15 AM",
        },
        {
          id: 3,
          type: "received",
          text: "The shipment for the Jackhammer is scheduled for tomorrow morning.",
          time: "2:20 PM",
        },
      ],
    },
    {
      id: 2,
      sender: "Zemen Metal Works",
      lastMessage:
        "Please confirm the delivery address for the 50 Roofing Sheets.",
      time: "Yesterday",
      unread: false,
      item: "Roofing Sheet Batch (ORD-3312-ZM)",
      avatar: "ZM",
      messages: [
        {
          id: 1,
          type: "received",
          text: "Please confirm the delivery address for the 50 Roofing Sheets.",
          time: "Yesterday",
        },
      ],
    },
  ]);

  // Mock Data for Won Items
  const wonItems = [
    {
      id: "ORD-4492-BX",
      title: "Heavy Duty Jackhammer",
      price: "18,200 ETB",
      seller: "Ethio Tools & Hardware",
      status: "Shipped",
      date: "Sept 14, 2025",
      image: "JH",
    },
    {
      id: "ORD-3312-ZM",
      title: "Roofing Sheet (Batch of 50)",
      price: "65,000 ETB",
      seller: "Zemen Metal Works",
      status: "Processing",
      date: "Aug 28, 2025",
      image: "RS",
    },
  ];

  // Settings States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Theme Colors
  const colors = {
    bg: "bg-[#0F1115]",
    card: "bg-[#1C1F26]",
    sidebar: "bg-[#090B0E]",
    silverMain: "bg-[#C0C0C0]",
    silverLight: "bg-[#E5E7EB]",
    silverDark: "bg-[#9CA3AF]",
    textPrimary: "text-[#F8FAFC]",
    textSecondary: "text-[#94A3B8]",
    border: "border-[#334155]/40",
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const SidebarItem = ({ id, icon: Icon, label, badge }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if (window.innerWidth < 1024) setSidebarOpen(false);
      }}
      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${
        activeTab === id
          ? `${colors.silverMain} text-[#0F1115] shadow-lg shadow-white/5 font-bold`
          : `text-[#94A3B8] hover:bg-[#2D333F] hover:text-[#F8FAFC]`
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon size={18} />
        <span className="text-xs lg:text-sm uppercase tracking-wider">
          {label}
        </span>
      </div>
      {badge && activeTab !== id && (
        <span className="bg-[#C0C0C0] text-[#0F1115] text-[10px] font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center">
          {badge}
        </span>
      )}
    </button>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "browse":
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase text-white">
                  Ethio Auction
                </h2>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em] mt-1">
                  Global Sourcing • Real-time Bidding
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[280px]">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569]"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search high-value assets..."
                    className="w-full bg-[#1C1F26] border border-[#334155] rounded-xl py-3 pl-11 pr-4 text-xs focus:outline-none focus:border-[#C0C0C0] transition-all text-white placeholder:text-[#475569]"
                  />
                </div>
                <button className="bg-[#2D333F] text-white p-3 rounded-xl border border-[#334155] hover:border-white/20 transition-all">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                {
                  title: "Reinforcement Steel Bar",
                  price: "45,000 ETB",
                  time: "04:22:10",
                  bids: 12,
                  loc: "Addis Ababa",
                },
                {
                  title: "Portland Cement Grade 42.5",
                  price: "1,200 ETB",
                  time: "12:05:45",
                  bids: 8,
                  loc: "Bishoftu",
                },
                {
                  title: "Industrial Generator 50kW",
                  price: "420,000 ETB",
                  time: "22:10:05",
                  bids: 3,
                  loc: "Mekelle",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`${colors.card} rounded-3xl border ${colors.border} overflow-hidden group hover:border-[#C0C0C0]/50 transition-all duration-500`}
                >
                  <div className="h-48 bg-[#13161D] relative flex items-center justify-center border-b border-[#334155]/30">
                    <ShoppingBag
                      size={48}
                      className="text-[#2D333F] group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#C0C0C0] text-[8px] font-black text-[#0F1115] px-2 py-1 rounded-sm uppercase italic">
                      {item.loc}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-bold text-white bg-black/40 backdrop-blur-md p-2 rounded-lg border border-white/5">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-[#C0C0C0]" />{" "}
                        {item.time}
                      </span>
                      <span className="uppercase tracking-widest">
                        {item.bids} Bids active
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-black text-white text-lg italic tracking-tighter uppercase mb-6 truncate">
                      {item.title}
                    </h3>
                    <div className="flex justify-between items-end border-t border-[#334155]/20 pt-6">
                      <div>
                        <p className="text-[9px] font-black text-[#64748B] uppercase tracking-widest mb-1">
                          Target Ceiling
                        </p>
                        <p className="text-xl font-black text-white italic tracking-tighter">
                          {item.price}
                        </p>
                      </div>
                      <button
                        className={`${colors.silverMain} text-[#0F1115] px-6 py-2.5 rounded-xl font-black text-[10px] uppercase shadow-xl shadow-white/5 active:scale-95 transition-all`}
                      >
                        Place Bid
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "won":
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase text-white">
                  Acquisitions
                </h2>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em] mt-1">
                  Successful Bids & Inventory Intake
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {wonItems.map((item) => (
                <div
                  key={item.id}
                  className={`${colors.card} border ${colors.border} rounded-3xl p-8 group hover:border-[#C0C0C0]/40 transition-all relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Award size={120} className="text-white" />
                  </div>

                  <div className="flex gap-6 items-start relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#0F1115] border border-white/5 flex items-center justify-center font-black text-[#C0C0C0]">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[8px] font-black text-[#C0C0C0] bg-white/5 px-2 py-1 rounded border border-white/5 uppercase tracking-widest">
                          {item.id}
                        </span>
                        <span
                          className={`text-[8px] font-black uppercase px-2 py-1 rounded ${
                            item.status === "Shipped"
                              ? "bg-green-500/10 text-green-500 border border-green-500/20"
                              : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-4">
                        {item.title}
                      </h3>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-[8px] font-black text-[#64748B] uppercase tracking-widest mb-1">
                            Final Bid
                          </p>
                          <p className="text-sm font-black text-white">
                            {item.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-[#64748B] uppercase tracking-widest mb-1">
                            Vendor
                          </p>
                          <p className="text-sm font-black text-white">
                            {item.seller}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setActiveTab("messages");
                            setSelectedConversation(
                              conversations.find(
                                (c) => c.sender === item.seller
                              )
                            );
                          }}
                          className={`${colors.silverMain} text-[#0F1115] flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2`}
                        >
                          <MessageSquare size={14} /> Message Seller
                        </button>
                        <button className="bg-[#2D333F] text-white p-3 rounded-xl border border-[#334155] hover:border-white/20 transition-all">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "messages":
        return (
          <div className="h-[calc(100vh-12rem)] flex gap-6 animate-in slide-in-from-right-4 duration-500">
            {/* Conversations List */}
            <div
              className={`flex-1 lg:flex-[0.4] flex flex-col ${
                selectedConversation ? "hidden lg:flex" : "flex"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">
                  Inbox
                </h2>
                <div className="bg-[#1C1F26] px-3 py-1 rounded-lg border border-[#334155] text-[10px] font-black text-[#C0C0C0] uppercase">
                  2 Unread
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                      selectedConversation?.id === conv.id
                        ? "bg-[#2D333F] border-[#C0C0C0]/40 shadow-xl"
                        : "bg-[#1C1F26] border-[#334155]/30 hover:border-white/20"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#334155] to-[#0F1115] flex items-center justify-center font-black text-[#C0C0C0] border border-white/5 flex-shrink-0">
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-xs font-black text-white uppercase italic truncate">
                            {conv.sender}
                          </h4>
                          <span className="text-[8px] font-bold text-[#64748B] uppercase tracking-tighter">
                            {conv.time}
                          </span>
                        </div>
                        <p
                          className={`text-[10px] truncate ${
                            conv.unread
                              ? "text-white font-bold"
                              : "text-[#64748B]"
                          }`}
                        >
                          {conv.lastMessage}
                        </p>
                        <div className="mt-2 text-[8px] font-black text-[#C0C0C0]/40 uppercase tracking-widest italic truncate border-t border-white/5 pt-2">
                          RE: {conv.item}
                        </div>
                      </div>
                      {conv.unread && (
                        <div className="w-2 h-2 rounded-full bg-[#C0C0C0] mt-1 shadow-[0_0_8px_rgba(192,192,192,0.6)]"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation View */}
            <div
              className={`flex-1 bg-[#1C1F26] rounded-[2.5rem] border border-[#334155]/40 flex flex-col overflow-hidden ${
                !selectedConversation
                  ? "hidden lg:flex items-center justify-center text-center p-20"
                  : "flex"
              }`}
            >
              {selectedConversation ? (
                <>
                  {/* Header */}
                  <div className="px-8 py-6 border-b border-[#334155]/40 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setSelectedConversation(null)}
                        className="lg:hidden p-2 text-[#64748B] hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-black text-[#C0C0C0] text-xs">
                        {selectedConversation.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white uppercase italic tracking-tighter">
                          {selectedConversation.sender}
                        </h3>
                        <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{" "}
                          Online
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2.5 text-[#64748B] hover:text-white bg-[#0F1115] rounded-xl border border-[#334155]/40 transition-all">
                        <Phone size={16} />
                      </button>
                      <button className="p-2.5 text-[#64748B] hover:text-white bg-[#0F1115] rounded-xl border border-[#334155]/40 transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-[#13161D]/50">
                    <div className="text-center py-4">
                      <span className="text-[8px] font-black text-[#475569] uppercase tracking-[0.4em] bg-[#0F1115] px-4 py-1.5 rounded-full border border-white/5">
                        Secure End-to-End Encryption
                      </span>
                    </div>

                    {selectedConversation.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.type === "sent" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                            msg.type === "sent"
                              ? `${colors.silverMain} text-[#0F1115] rounded-tr-none font-medium`
                              : "bg-[#2D333F] text-white rounded-tl-none border border-white/5"
                          }`}
                        >
                          {msg.text}
                          <div
                            className={`text-[8px] mt-2 font-bold uppercase tracking-tighter ${
                              msg.type === "sent"
                                ? "text-black/40"
                                : "text-[#64748B]"
                            }`}
                          >
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="p-6 bg-[#1C1F26] border-t border-[#334155]/40">
                    <div className="bg-[#0F1115] rounded-2xl border border-[#334155] p-2 flex items-center gap-2">
                      <button className="p-3 text-[#64748B] hover:text-white transition-colors">
                        <Paperclip size={18} />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type encrypted message..."
                        className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder:text-[#475569] py-2 px-1"
                      />
                      <button
                        className={`${colors.silverMain} text-[#0F1115] p-3 rounded-xl hover:scale-105 active:scale-95 transition-all`}
                      >
                        <Send size={18} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6 animate-pulse">
                  <div className="w-24 h-24 bg-white/5 rounded-full mx-auto flex items-center justify-center">
                    <MessageSquare size={48} className="text-[#2D333F]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">
                      Communications Hub
                    </h3>
                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em] mt-2">
                      Select a thread to initialize contact
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "history":
        return (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase text-white">
                  Purchase History
                </h2>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em] mt-1">
                  Validated Procurement Records
                </p>
              </div>
              <button className="bg-[#1C1F26] border border-[#334155] text-[#94A3B8] px-5 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:text-white hover:border-white/20 transition-all">
                <Download size={14} /> Export CSV
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Heavy Duty Jackhammer",
                  id: "ORD-4492-BX",
                  price: "18,200 ETB",
                  date: "Sep 14, 2025",
                  seller: "Ethio Tools & Hardware",
                  desc: "Professional 1500W electric breaker, including 3-point chisel set.",
                  rating: 5,
                },
                {
                  title: "Roofing Sheet (Batch of 50)",
                  id: "ORD-3312-ZM",
                  price: "65,000 ETB",
                  date: "Aug 28, 2025",
                  seller: "Zemen Metal Works",
                  desc: "Galvanized iron sheets, 0.4mm thickness, 3m length.",
                  rating: 0,
                },
              ].map((order, idx) => (
                <div
                  key={idx}
                  className={`${colors.card} border ${colors.border} rounded-3xl p-6 lg:p-10 group hover:border-[#C0C0C0]/30 transition-all duration-300`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex gap-8 flex-1">
                      <div className="w-24 h-24 bg-[#13161D] rounded-2xl flex items-center justify-center border border-[#334155]/30 group-hover:border-[#C0C0C0]/20 transition-all">
                        <FileText
                          size={40}
                          className="text-[#475569] group-hover:text-[#C0C0C0] transition-colors"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-xl font-black text-white italic tracking-tighter uppercase">
                            {order.title}
                          </h4>
                          <span className="text-[9px] font-bold text-[#475569] bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest">
                            {order.id}
                          </span>
                        </div>
                        <p className="text-xs text-[#94A3B8] mt-2 max-w-xl leading-relaxed">
                          {order.desc}
                        </p>
                        <div className="flex flex-wrap gap-x-10 gap-y-4 mt-6">
                          <div>
                            <p className="text-[8px] font-black text-[#475569] uppercase tracking-[0.2em] mb-1">
                              Vendor
                            </p>
                            <p className="text-xs font-bold text-white uppercase italic tracking-tighter">
                              {order.seller}
                            </p>
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-[#475569] uppercase tracking-[0.2em] mb-1">
                              Execution Date
                            </p>
                            <p className="text-xs font-bold text-white uppercase italic tracking-tighter">
                              {order.date}
                            </p>
                          </div>
                          <div>
                            <p className="text-[8px] font-black text-[#475569] uppercase tracking-[0.2em] mb-1">
                              Final Settlement
                            </p>
                            <p className="text-xs font-bold text-[#C0C0C0] uppercase italic tracking-tighter">
                              {order.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
                      <button
                        onClick={() => {
                          setActiveTab("messages");
                          setSelectedConversation(conversations[idx]);
                        }}
                        className={`${colors.silverMain} text-[#0F1115] w-full py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-white/5 hover:scale-[1.02] transition-all`}
                      >
                        <MessageSquare size={16} /> Contact Seller
                      </button>

                      <button className="bg-[#2D333F] text-white w-full py-3 rounded-xl font-black uppercase text-[10px] tracking-widest border border-[#334155] flex items-center justify-center gap-2 hover:bg-[#3d4554] transition-all">
                        <Printer size={16} /> Print Invoice
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="max-w-4xl space-y-8 pb-20 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase text-white">
                  Security & Identity
                </h2>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em] mt-1">
                  Profile Matrix & Access Control
                </p>
              </div>
              {saveSuccess && (
                <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20 animate-bounce">
                  <CheckCircle2 size={16} />
                  <span className="text-[10px] font-black uppercase italic">
                    Changes Saved
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                {/* Personal Info */}
                <div
                  className={`${colors.card} border ${colors.border} rounded-[2rem] p-8 lg:p-10`}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[#C0C0C0]">
                      <User size={24} />
                    </div>
                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">
                      Biometric Identity
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] ml-1">
                        Full Legal Name
                      </label>
                      <div className="relative group">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] group-focus-within:text-[#C0C0C0] transition-colors"
                          size={18}
                        />
                        <input
                          type="text"
                          defaultValue="Faris Nasir"
                          className="w-full bg-[#0F1115] border border-[#334155] rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-[#C0C0C0] outline-none transition-all shadow-inner"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] ml-1">
                        Email Node
                      </label>
                      <div className="relative group">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] group-focus-within:text-[#C0C0C0] transition-colors"
                          size={18}
                        />
                        <input
                          type="email"
                          defaultValue="faris.nasir@procure.et"
                          className="w-full bg-[#0F1115] border border-[#334155] rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-[#C0C0C0] outline-none transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div
                  className={`${colors.card} border ${colors.border} rounded-[2rem] p-8 lg:p-10`}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[#C0C0C0]">
                      <Lock size={24} />
                    </div>
                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">
                      Authentication Layer
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] ml-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full bg-[#0F1115] border border-[#334155] rounded-2xl py-4 px-4 text-sm text-white focus:border-[#C0C0C0] outline-none transition-all"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-white transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] ml-1">
                          New Secure Key
                        </label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full bg-[#0F1115] border border-[#334155] rounded-2xl py-4 px-4 text-sm text-white focus:border-[#C0C0C0] outline-none transition-all"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleSave}
                      className="bg-[#2D333F] border border-[#334155] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#3d4554] hover:border-[#C0C0C0]/50 transition-all flex items-center gap-2"
                    >
                      Update Authentication
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <button
                  onClick={handleSave}
                  className={`${colors.silverMain} text-[#0F1115] w-full py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-white/5 hover:scale-[1.02] active:scale-95 transition-all`}
                >
                  <Save size={18} strokeWidth={3} /> Global Save
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-10 text-center text-[#64748B] font-bold italic uppercase tracking-[0.5em] animate-pulse">
            Initializing Interface...
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen ${colors.bg} flex font-sans antialiased text-[#F8FAFC]`}
    >
      {/* Modal Overlay */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80 animate-in fade-in duration-300">
          <div className="bg-[#1C1F26] border border-red-900/40 max-w-md w-full rounded-[2.5rem] p-10 shadow-[0_25px_50px_-12px_rgba(220,38,38,0.25)]">
            <div className="flex items-center gap-4 text-red-500 mb-8">
              <ShieldAlert size={40} />
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">
                Termination
              </h3>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed mb-10 font-medium">
              This will purge your identity from the{" "}
              <span className="text-white italic font-black">SILVERBID</span>{" "}
              network. Type{" "}
              <span className="text-white font-mono bg-white/5 px-2 py-1 rounded italic uppercase text-xs tracking-widest border border-white/10">
                DELETE
              </span>{" "}
              to authorize.
            </p>
            <input
              type="text"
              placeholder="CONFIRMATION KEY"
              className="w-full bg-[#0F1115] border border-red-900/30 rounded-2xl py-4 px-5 text-sm text-white focus:border-red-500 outline-none mb-10 placeholder:text-red-900/50 uppercase font-black tracking-widest"
            />
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-[#2D333F] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-[#334155] hover:bg-[#3d4554] transition-all"
              >
                Abnormal Abort
              </button>
              <button className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-900/40">
                Authorize Purge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-40 lg:hidden backdrop-blur-md"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 ${
          colors.sidebar
        } border-r ${
          colors.border
        } transition-transform duration-500 lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="p-10 flex items-center space-x-3 group cursor-pointer"
          onClick={() => setActiveTab("browse")}
        >
          <div
            className={`${colors.silverMain} p-2.5 rounded-xl shadow-[0_0_20px_rgba(192,192,192,0.2)] group-hover:scale-110 transition-all`}
          >
            <Gavel size={24} className="text-[#0F1115]" />
          </div>
          <span className="text-2xl font-black text-white italic tracking-tighter">
            SILVER<span className="text-[#C0C0C0]">BID</span>
          </span>
        </div>
        <nav className="flex-1 px-6 mt-10 space-y-2">
          <SidebarItem id="browse" icon={Search} label="Marketplace" />
          <SidebarItem id="bids" icon={TrendingDown} label="Active Bids" />
          <SidebarItem id="won" icon={CheckCircle2} label="Acquisitions" />
          <SidebarItem
            id="messages"
            icon={MessageSquare}
            label="Inbox"
            badge="2"
          />
          <SidebarItem id="history" icon={History} label="History" />
          <SidebarItem id="watchlist" icon={Heart} label="Watchlist" />
          <div className="my-10 border-t border-[#334155]/30 mx-4"></div>
          <SidebarItem id="settings" icon={Settings} label="Identity Control" />
        </nav>

        <div className="p-8 mt-auto border-t border-[#334155]/20">
          <button className="flex items-center space-x-3 text-[#64748B] hover:text-red-400 transition-colors w-full px-4 py-2 group">
            <LogOut
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-xs font-black uppercase tracking-widest">
              Disconnect
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 lg:h-24 border-b border-[#334155]/40 flex items-center justify-between px-8 lg:px-12 bg-[#0F1115]/80 backdrop-blur-xl sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-3 text-white bg-white/5 rounded-xl"
          >
            <Menu size={20} />
          </button>

          <div className="hidden lg:flex items-center bg-white/5 border border-white/5 rounded-2xl px-4 py-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#64748B] italic">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              Network Stable
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div
              className="relative cursor-pointer group"
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare
                size={22}
                className={`${
                  activeTab === "messages" ? "text-white" : "text-[#64748B]"
                } group-hover:text-white transition-colors`}
              />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C0C0C0] rounded-full border-2 border-[#0F1115]"></div>
            </div>

            <div className="flex items-center space-x-5 pl-8 border-l border-[#334155]">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-white uppercase italic tracking-widest leading-none">
                  Faris Nasir
                </p>
                <p className="text-[9px] font-bold text-[#C0C0C0] uppercase tracking-widest mt-1.5 opacity-60">
                  Procure ID: 4920
                </p>
              </div>
              <div
                className="relative group cursor-pointer"
                onClick={() => setActiveTab("settings")}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#E5E7EB] to-[#9CA3AF] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
                  <User size={24} className="text-[#0F1115]" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0F1115]"></div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-14 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default App;
