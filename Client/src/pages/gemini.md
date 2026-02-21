import React, { useState, useEffect } from "react";
import {
Gavel,
History,
Settings,
Clock,
TrendingDown,
User,
LogOut,
Menu,
X,
CheckCircle2,
MessageSquare,
Plus,
BarChart3,
Calendar,
ChevronRight,
ArrowDownCircle,
ShieldCheck,
Building2,
Trophy,
ArrowRight,
MonitorDot,
FileText,
Upload,
ShoppingBag,
Star,
Trash2,
Bell,
MapPin,
Info,
Search,
Filter,
Eye,
Edit3,
MoreVertical,
AlertTriangle,
Download,
Check,
Truck,
Box,
MessageCircle,
ThumbsUp,
} from "lucide-react";

const App = () => {
const [activeTab, setActiveTab] = useState("dashboard");
const [isSidebarOpen, setSidebarOpen] = useState(false);
const [selectedAuction, setSelectedAuction] = useState(null);
const [selectedContract, setSelectedContract] = useState(null);
const [showCreateRFQ, setShowCreateRFQ] = useState(false);
const [showAwardModal, setShowAwardModal] = useState(null);
const [notifications, setNotifications] = useState(2);
const [searchQuery, setSearchQuery] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [bidSort, setBidSort] = useState("price-low");

// Theme Colors
const colors = {
bg: "bg-[#0F1115]",
card: "bg-[#1C1F26]",
sidebar: "bg-[#090B0E]",
silverMain: "bg-[#C0C0C0]",
textPrimary: "text-[#F8FAFC]",
textSecondary: "text-[#94A3B8]",
border: "border-[#334155]/40",
};

const [auctions, setAuctions] = useState([
{
id: "RFQ-2025-001",
title: "Grade 1 Reinforcement Steel (12mm)",
description:
"Standard Grade 1 reinforcement bars for foundation work. Must be corrosion-resistant and meet ISO-9001 standards.",
category: "Metal Works",
quantity: "500 Quintals",
ceilingPrice: 55000,
currentLowest: 48200,
bidsCount: 14,
timeLeft: "02:45:12",
status: "Open",
location: "Jimma Site A",
dateCreated: "2025-05-10",
awardedTo: null,
history: [
{
bidder: "Abyssinia Steel",
amount: 48200,
time: "2 mins ago",
rank: 1,
rating: 4.8,
delivery: "3 Days",
note: "Includes site delivery.",
date: "May 12",
},
{
bidder: "Zuqualla Steel",
amount: 49500,
time: "10 mins ago",
rank: 2,
rating: 4.5,
delivery: "5 Days",
note: "Standard warranty.",
date: "May 11",
},
],
},
{
id: "RFQ-2025-004",
title: "High Tensile Bolts (Pack of 1000)",
description: "M12 High tensile bolts for structural assembly.",
category: "Hardware",
quantity: "10 Packs",
ceilingPrice: 8000,
currentLowest: 7200,
bidsCount: 21,
timeLeft: "Completed",
status: "Awarded",
deliveryStatus: "Shipped",
location: "Adama Project",
dateCreated: "2025-04-15",
awardedTo: {
supplier: "Fastener Hub Ltd",
amount: 7200,
date: "April 18, 2025",
promisedDelivery: "April 22, 2025",
rating: 4.7,
},
history: [],
},
{
id: "RFQ-2025-005",
title: "Solar Panels 400W Monocrystalline",
description:
"High efficiency solar panels for office rooftop installation.",
category: "Electrical",
quantity: "25 Units",
ceilingPrice: 120000,
currentLowest: 112500,
bidsCount: 6,
timeLeft: "Completed",
status: "Awarded",
deliveryStatus: "Delivered",
location: "Addis HQ",
dateCreated: "2025-03-10",
awardedTo: {
supplier: "Green Energy Solutions",
amount: 112500,
date: "March 15, 2025",
promisedDelivery: "March 20, 2025",
rating: 4.9,
},
history: [],
},
]);

const handleAward = (auctionId, bid) => {
setAuctions((prev) =>
prev.map((auc) => {
if (auc.id === auctionId) {
return {
...auc,
status: "Awarded",
deliveryStatus: "Pending",
awardedTo: {
supplier: bid.bidder,
amount: bid.amount,
date: new Date().toLocaleDateString(),
promisedDelivery: bid.delivery,
rating: bid.rating,
},
};
}
return auc;
})
);
setShowAwardModal(null);
setSelectedAuction(null);
setActiveTab("awarded");
};

const markAsReceived = (id) => {
setAuctions((prev) =>
prev.map((auc) =>
auc.id === id ? { ...auc, deliveryStatus: "Delivered" } : auc
)
);
if (selectedContract) {
setSelectedContract((prev) => ({ ...prev, deliveryStatus: "Delivered" }));
}
};

const SidebarItem = ({ id, icon: Icon, label, badge }) => (
<button
onClick={() => {
setActiveTab(id);
setSelectedAuction(null);
setSelectedContract(null);
if (window.innerWidth < 1024) setSidebarOpen(false);
}}
className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${
        activeTab === id
          ? `${colors.silverMain} text-[#0F1115] shadow-lg font-bold`          :`text-[#94A3B8] hover:bg-[#2D333F] hover:text-[#F8FAFC]`
      }`} >
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

const getStatusBadge = (status) => {
const styles = {
Open: "bg-green-500/10 text-green-500 border-green-500/20",
Awarded: "bg-blue-500/10 text-blue-500 border-blue-500/20",
Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
Shipped: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
Delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
Ended: "bg-white/5 text-[#64748B] border-white/10",
};
return (
<span
className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border tracking-widest ${
          styles[status] || "bg-white/5 text-[#64748B]"
        }`} >
{status}
</span>
);
};

const renderContractDetail = (contract) => (
<div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-20">
<button
onClick={() => setSelectedContract(null)}
className="flex items-center gap-2 text-[10px] font-black uppercase text-[#64748B] hover:text-white transition-colors" >
<ChevronRight size={14} className="rotate-180" /> Back to Awarded
Contracts
</button>

      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-[2] space-y-6">
          {/* Header */}
          <div
            className={`${colors.card} border ${colors.border} rounded-[2.5rem] p-10`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">
                    Contract {contract.id}
                  </span>
                  {getStatusBadge(contract.deliveryStatus)}
                </div>
                <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                  {contract.title}
                </h2>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-white/5 border border-white/5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                  <MessageCircle size={14} /> Message Supplier
                </button>
                {contract.deliveryStatus !== "Delivered" && (
                  <button
                    onClick={() => markAsReceived(contract.id)}
                    className="px-6 py-3 bg-green-500 text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-green-500/10"
                  >
                    <Check size={14} /> Mark as Received
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-[#0F1115]/50 rounded-3xl border border-white/5">
              <div>
                <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mb-2">
                  Winning Supplier
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white italic uppercase">
                      {contract.awardedTo.supplier}
                    </p>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={10} fill="currentColor" />{" "}
                      <span className="text-[10px] font-bold">
                        {contract.awardedTo.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mb-2">
                  Final Award Amount
                </p>
                <p className="text-2xl font-black text-white italic">
                  {contract.awardedTo.amount.toLocaleString()} ETB
                </p>
                <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">
                  Escrow Locked
                </p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mb-2">
                  Award Date
                </p>
                <p className="text-sm font-black text-[#94A3B8] italic uppercase tracking-widest">
                  {contract.awardedTo.date}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-6">
                Fulfillment Timeline
              </h4>
              <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-[#1C1F26]"></div>
                  <p className="text-xs font-black text-white uppercase italic">
                    Contract Awarded
                  </p>
                  <p className="text-[10px] text-[#64748B] uppercase">
                    {contract.awardedTo.date}
                  </p>
                </div>
                <div className="relative">
                  <div
                    className={`absolute -left-[27px] top-1 w-4 h-4 rounded-full border-4 border-[#1C1F26] ${
                      ["Shipped", "Delivered"].includes(contract.deliveryStatus)
                        ? "bg-green-500"
                        : "bg-[#2D333F]"
                    }`}
                  ></div>
                  <p
                    className={`text-xs font-black uppercase italic ${
                      ["Shipped", "Delivered"].includes(contract.deliveryStatus)
                        ? "text-white"
                        : "text-[#64748B]"
                    }`}
                  >
                    Goods Shipped
                  </p>
                  <p className="text-[10px] text-[#64748B] uppercase">
                    {["Shipped", "Delivered"].includes(contract.deliveryStatus)
                      ? "Updated by Supplier"
                      : "Awaiting dispatch"}
                  </p>
                </div>
                <div className="relative">
                  <div
                    className={`absolute -left-[27px] top-1 w-4 h-4 rounded-full border-4 border-[#1C1F26] ${
                      contract.deliveryStatus === "Delivered"
                        ? "bg-green-500"
                        : "bg-[#2D333F]"
                    }`}
                  ></div>
                  <p
                    className={`text-xs font-black uppercase italic ${
                      contract.deliveryStatus === "Delivered"
                        ? "text-white"
                        : "text-[#64748B]"
                    }`}
                  >
                    Delivery Confirmed
                  </p>
                  <p className="text-[10px] text-[#64748B] uppercase">
                    {contract.deliveryStatus === "Delivered"
                      ? "Marked by You"
                      : "Awaiting receipt"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div
            className={`${colors.card} border ${colors.border} rounded-[2.5rem] p-8`}
          >
            <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-6">
              Original Request Info
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold text-[#64748B] uppercase">
                  Quantity
                </p>
                <p className="text-xs font-black text-white italic">
                  {contract.quantity}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#64748B] uppercase">
                  Location
                </p>
                <p className="text-xs font-black text-white italic">
                  {contract.location}
                </p>
              </div>
              <div className="pt-4 border-t border-white/5">
                <p className="text-[9px] font-bold text-[#64748B] uppercase mb-2">
                  Description
                </p>
                <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                  {contract.description}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-[2.5rem] p-8">
            <div className="flex gap-4 mb-4">
              <AlertTriangle size={20} className="text-amber-500 shrink-0" />
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest mt-1">
                Quality Assurance
              </h4>
            </div>
            <p className="text-[11px] text-amber-200/70 leading-relaxed mb-4">
              Do not mark as received until you have physically inspected the
              items. Once confirmed, payment will be released.
            </p>
            <button className="text-[9px] font-black text-amber-500 uppercase underline tracking-widest">
              Report Dispute
            </button>
          </div>
        </div>
      </div>
    </div>

);

const renderAwardedSection = () => {
const awarded = auctions.filter((a) => a.status === "Awarded");

    return (
      <div className="space-y-8 animate-in fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">
              Awarded Contracts
            </h2>
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] mt-1">
              Manage ongoing deliveries & confirmed deals
            </p>
          </div>
          <div className="flex bg-white/5 border border-white/5 rounded-2xl p-1">
            {["All", "Pending", "Shipped", "Delivered"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  statusFilter === s
                    ? `${colors.silverMain} text-[#0F1115]`
                    : "text-[#64748B] hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {awarded.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {awarded
              .filter(
                (a) =>
                  statusFilter === "All" || a.deliveryStatus === statusFilter
              )
              .map((contract) => (
                <div
                  key={contract.id}
                  onClick={() => setSelectedContract(contract)}
                  className={`${colors.card} border ${colors.border} rounded-[2.5rem] p-8 group hover:border-[#C0C0C0]/50 transition-all cursor-pointer`}
                >
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6 flex-1">
                      <div
                        className={`w-16 h-16 rounded-[2rem] flex items-center justify-center border transition-all ${
                          contract.deliveryStatus === "Delivered"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-white/5 text-[#C0C0C0] border-white/5"
                        }`}
                      >
                        {contract.deliveryStatus === "Delivered" ? (
                          <ThumbsUp size={28} />
                        ) : (
                          <Truck size={28} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[9px] font-black text-[#64748B] uppercase tracking-widest">
                            {contract.id}
                          </span>
                          {getStatusBadge(contract.deliveryStatus)}
                        </div>
                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase group-hover:text-[#C0C0C0] transition-colors">
                          {contract.title}
                        </h3>
                        <p className="text-[10px] font-bold text-[#64748B] uppercase mt-1">
                          Supplier:{" "}
                          <span className="text-[#94A3B8] italic">
                            {contract.awardedTo.supplier}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-12 text-center lg:text-right">
                      <div>
                        <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mb-1">
                          Final Price
                        </p>
                        <p className="text-lg font-black text-white italic">
                          {contract.awardedTo.amount.toLocaleString()} ETB
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mb-1">
                          Awarded On
                        </p>
                        <p className="text-xs font-black text-[#94A3B8] uppercase">
                          {contract.awardedTo.date}
                        </p>
                      </div>
                      <button className="p-4 bg-white/5 text-[#94A3B8] group-hover:text-white rounded-2xl border border-white/5 group-hover:border-white/10 transition-all">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShieldCheck size={40} className="text-[#2D333F]" />
            </div>
            <h3 className="text-xl font-black text-white italic uppercase mb-2">
              No Contracts Awarded
            </h3>
            <p className="text-sm text-[#64748B] max-w-sm mx-auto mb-10">
              Review your open requests and choose a winning supplier to start
              tracking contracts here.
            </p>
            <button
              onClick={() => setActiveTab("auctions")}
              className="px-10 py-4 bg-[#C0C0C0] text-[#0F1115] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
            >
              Browse My Requests
            </button>
          </div>
        )}
      </div>
    );

};

const renderDashboard = () => (
<div className="space-y-8 animate-in fade-in duration-500 pb-20">
<div className="flex justify-between items-end">
<div>
<h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase text-white">
Buyer Hub
</h2>
<p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em] mt-1">
Manage procurement & active bids
</p>
</div>
<button
onClick={() => setShowCreateRFQ(true)}
className={`${colors.silverMain} text-[#0F1115] px-8 py-4 rounded-2xl font-black text-[10px] uppercase flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-white/5`} >
<Plus size={16} /> Post New Request
</button>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className={`${colors.card} p-8 rounded-[2.5rem] border ${colors.border}`}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
              <Gavel size={24} />
            </div>
            <span className="text-[10px] font-black text-[#64748B] uppercase">
              Live
            </span>
          </div>
          <p className="text-4xl font-black text-white italic tracking-tighter">
            12
          </p>
          <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mt-2">
            Open Requests
          </p>
        </div>
        <div
          className={`${colors.card} p-8 rounded-[2.5rem] border ${colors.border}`}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-[10px] font-black text-[#64748B] uppercase">
              Pending Delivery
            </span>
          </div>
          <p className="text-4xl font-black text-white italic tracking-tighter">
            {
              auctions.filter(
                (a) =>
                  a.status === "Awarded" && a.deliveryStatus !== "Delivered"
              ).length
            }
          </p>
          <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mt-2">
            Awarded Contracts
          </p>
        </div>
        <div
          className={`${colors.card} p-8 rounded-[2.5rem] border ${colors.border}`}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-green-500/10 text-green-400 rounded-2xl">
              <TrendingDown size={24} />
            </div>
            <span className="text-[10px] font-black text-[#64748B] uppercase">
              Savings
            </span>
          </div>
          <p className="text-4xl font-black text-white italic tracking-tighter">
            45k+
          </p>
          <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mt-2">
            Total Savings (ETB)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {auctions
          .filter((a) => a.status === "Open")
          .slice(0, 4)
          .map((auc) => (
            <div
              key={auc.id}
              className={`${colors.card} rounded-[3rem] border ${colors.border} group hover:border-[#C0C0C0]/50 transition-all duration-500 overflow-hidden`}
            >
              <div className="p-8">
                <div className="flex justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black text-[#C0C0C0] bg-white/5 px-3 py-1 rounded-full border border-white/5 uppercase tracking-widest">
                        {auc.id}
                      </span>
                      {getStatusBadge(auc.status)}
                    </div>
                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mt-4">
                      {auc.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">
                      Time Left
                    </p>
                    <p className="text-xs font-black text-white font-mono">
                      {auc.timeLeft}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 py-4 border-t border-white/5">
                  <div>
                    <p className="text-[9px] font-bold text-[#64748B] uppercase">
                      Current Low
                    </p>
                    <p className="text-lg font-black text-green-400 italic">
                      {auc.currentLowest
                        ? `${auc.currentLowest.toLocaleString()} ETB`
                        : "No Bids"}
                    </p>
                  </div>
                  <div className="h-10 w-px bg-white/5"></div>
                  <div>
                    <p className="text-[9px] font-bold text-[#64748B] uppercase">
                      Bids Received
                    </p>
                    <p className="text-lg font-black text-white italic">
                      {auc.bidsCount}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedAuction(auc);
                    setActiveTab("auctions");
                  }}
                  className="w-full mt-4 bg-[#2D333F] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#3d4554] transition-all"
                >
                  View Bids & Award <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>

);

return (
<div
className={`min-h-screen ${colors.bg} flex font-sans antialiased text-[#F8FAFC]`} >
{isSidebarOpen && (
<div
className="fixed inset-0 bg-black/90 z-[60] lg:hidden backdrop-blur-md"
onClick={() => setSidebarOpen(false)}
/>
)}

      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-72 ${
          colors.sidebar
        } border-r ${
          colors.border
        } transition-transform duration-500 lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-10 flex items-center space-x-3">
          <div
            className={`${colors.silverMain} p-3 rounded-2xl shadow-[0_0_20px_rgba(192,192,192,0.15)]`}
          >
            <Gavel size={24} className="text-[#0F1115]" />
          </div>
          <span className="text-2xl font-black text-white italic tracking-tighter uppercase">
            SILVER<span className="text-[#C0C0C0]">BID</span>
          </span>
        </div>
        <nav className="flex-1 px-6 mt-10 space-y-2">
          <SidebarItem id="dashboard" icon={BarChart3} label="Dashboard" />
          <SidebarItem
            id="auctions"
            icon={Gavel}
            label="My Requests"
            badge={auctions.filter((a) => a.status === "Open").length}
          />
          <SidebarItem
            id="awarded"
            icon={ShieldCheck}
            label="Awarded Contracts"
            badge={auctions.filter((a) => a.status === "Awarded").length}
          />
          <SidebarItem id="history" icon={History} label="Order History" />
          <SidebarItem
            id="messages"
            icon={MessageSquare}
            label="Messages"
            badge={notifications}
          />
          <div className="my-10 border-t border-[#334155]/30 mx-4"></div>
          <SidebarItem id="settings" icon={Settings} label="Profile Settings" />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 lg:h-24 border-b border-[#334155]/40 flex items-center justify-between px-8 lg:px-14 bg-[#0F1115]/80 backdrop-blur-xl z-[40]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-3 text-white bg-white/5 rounded-xl"
          >
            <Menu size={20} />
          </button>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#64748B]">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Procurement Node: JIMMA_A
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
              <Bell size={20} className="text-[#C0C0C0]" />
              {notifications > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
              <User size={22} className="text-[#C0C0C0]" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-14 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {selectedAuction ? /* Render Auction Detail from previous step... */ null : selectedContract ? (
              renderContractDetail(selectedContract)
            ) : activeTab === "dashboard" ? (
              renderDashboard()
            ) : activeTab === "awarded" ? (
              renderAwardedSection()
            ) : (
              <div className="text-center py-20 text-[#64748B] uppercase font-black tracking-widest">
                Section Under Construction
              </div>
            )}
          </div>
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `,
        }}
      />
    </div>

);
};

export default App;
