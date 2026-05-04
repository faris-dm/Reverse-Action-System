import React, { useState, useEffect } from "react"; // FIXED: Added useState import
import {
  Building2,
  Hash,
  ChevronRight,
  ChevronLeft,
  FileText,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  ThumbsUp,
  ThumbsDown,
  Clock, // FIXED: Added Clock import
} from "lucide-react";

function Proposal() {
  const [activeTab, setActiveTab] = useState("proposals");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [selectedProposal, setSelectedProposal] = useState(null);

  // --- DATA MOCKS ---
  const [proposals, setProposals] = useState([
    {
      id: "PROP-101",
      supplier: "Global Steel Works",
      rfpReference: "RFQ-2025-001",
      subject: "Participation Request: Grade 1 Reinforcement Steel",
      summary:
        "Tier 1 supplier offering specialized high-durability steel for coastal infrastructure projects.",
      status: "Pending",
      date: "20 Apr 2025",
      time: "14:30",
      details: {
        experience: "25 years in heavy industry",
        certifications: ["ISO 9001", "ASTM A615"],
        terms: "30% upfront, 70% upon delivery",
        note: "We can guarantee delivery within 14 days of contract signing.",
      },
    },
    {
      id: "PROP-102",
      supplier: "Nexus Hardware Solutions",
      rfpReference: "RFQ-2025-004",
      subject: "Inquiry: High Tensile Bolts Contract",
      summary:
        "Precision-engineered fastening solutions with integrated inventory management support.",
      status: "Pending",
      date: "21 Apr 2025",
      time: "09:15",
      details: {
        experience: "Supplying automotive sectors since 2010.",
        certifications: ["ASME B18.2.1"],
        terms: "Net 30 payment terms.",
        note: "Optimized logistics for local site delivery.",
      },
    },
  ]);

  useEffect(() => {
    const getProposal = async () => {
      try {
        const response = await fetch("http://localhost:21000/api/getProposal", {
          credentials: "include",
        });

        const result = await response.json();

        if (response.ok) {
          // 1. Get raw data or empty array
          const rawItems = result?.data || [];

          // 2. Filter and Hydrate in ONE step
          const processedData = rawItems
            .filter((item) => item.type === "proposal")
            .map((item, index) => ({
              // Start with backend data
              ...item,

              // Fix Naming Mismatches: UI expects 'supplier', backend might have 'fullName'
              supplier:
                item.supplier || item.fullName || `Supplier ${index + 1}`,

              // Fallback for ID
              id:
                item._id ||
                item.id ||
                `PROP-${Math.floor(Math.random() * 9000) + 1000}`,

              // Fallback for missing strings
              date: item.date || "Pending Date",
              time: item.time || "03:87",
              rfpReference: item.rfpReference || `REF-00${index + 1}`,
              subject: item.subject || "No Subject Provided",
              summary:
                item.summary || "No summary available for this proposal.",
              status: item.status || "Pending",

              // Ensure nested details object exists
              details: {
                experience:
                  item.details?.experience ||
                  `${Math.floor(Math.random() * 10) + 1} Years`,
                certifications: item.details?.certifications || [
                  "ISO Standard",
                  "Verified",
                ],
                terms: item.details?.terms || "Standard Commercial Terms",
                note:
                  item.details?.note || "System generated note for testing.",
              },
            }));

          // 3. Set state once!
          setProposals(processedData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setToastMsg("Server Error: Check Console");
        setShowToast(true);
      }
    };
    getProposal();
  }, []);

  const updateProposalStatus = (id, newStatus) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    if (selectedProposal && selectedProposal.id === id) {
      setSelectedProposal((prev) => ({ ...prev, status: newStatus }));
    }
    setToastMsg(`Status updated to ${newStatus}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const StatusChip = ({ status }) => {
    // Normalize status to handle any casing from backend
    const normalizedStatus = status
      ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      : "Pending";

    const styles = {
      Pending: "bg-amber-50 text-amber-600 border-amber-100",
      Accepted: "bg-emerald-50 text-emerald-600 border-emerald-100",
      Rejected: "bg-rose-50 text-rose-600 border-rose-100",
    };

    return (
      <span
        className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight border ${
          styles[normalizedStatus] || styles.Pending
        }`}
      >
        {normalizedStatus}
      </span>
    );
  };

  return (
    <div className="w-full">
      {" "}
      {/* Container adjusted for Buyer.jsx integration */}
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-top-4">
          {toastMsg}
        </div>
      )}
      <div className="p-6 lg:p-10">
        <div className="max-w-6xl mx-auto">
          {activeTab === "proposals" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {!selectedProposal ? (
                <div className="space-y-6">
                  <div className="flex items-end justify-between border-b border-slate-200 pb-6">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
                        Inbound <span className="text-blue-600">Proposals</span>
                      </h2>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">
                        Review requests for RFP participation
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
                        <Clock size={14} /> Waiting:{" "}
                        {proposals.filter((p) => p.status === "Pending").length}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {proposals.map((prop) => (
                      <div
                        key={prop.id}
                        className="group bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1 flex gap-5">
                            <div className="shrink-0 w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                              <Building2 size={28} />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <StatusChip status={prop.status} />
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                  Received {prop.date}
                                </span>
                              </div>
                              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                                {prop.supplier}
                              </h3>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 uppercase">
                                  <Hash size={12} /> {prop.rfpReference}
                                </div>
                                <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                <p className="text-[11px] font-medium text-slate-500 italic truncate max-w-sm">
                                  {prop.subject}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/3 border-t md:border-t-0 border-slate-50 pt-4 md:pt-0">
                            <div className="hidden lg:block text-right">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Priority
                              </p>
                              <p className="text-[11px] font-bold text-slate-700">
                                Standard
                              </p>
                            </div>
                            <button
                              onClick={() => setSelectedProposal(prop)}
                              className="w-full md:w-auto h-12 px-6 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-95"
                            >
                              See Proposal <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-400 space-y-6">
                  <button
                    onClick={() => setSelectedProposal(null)}
                    className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors"
                  >
                    <ChevronLeft size={16} /> Return to Listing
                  </button>

                  <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-900/5">
                    <div className="bg-slate-50 border-b border-slate-100 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-400">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                            Internal Reference
                          </p>
                          <h3 className="text-lg font-black text-slate-900 uppercase">
                            {selectedProposal.id}
                          </h3>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 hover:bg-slate-50">
                          <MessageCircle size={14} /> Open Chat
                        </button>
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 hover:bg-slate-50">
                          <ExternalLink size={14} /> Supplier Profile
                        </button>
                      </div>
                    </div>

                    <div className="p-8 lg:p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-10">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <StatusChip status={selectedProposal.status} />
                              <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">
                                {selectedProposal.rfpReference}
                              </span>
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-tight mb-4">
                              {selectedProposal.supplier}
                            </h2>
                            <p className="text-lg font-bold text-slate-600 leading-relaxed border-l-4 border-blue-100 pl-6">
                              {selectedProposal.subject}
                            </p>
                            <p className="text-slate-500 mt-6 leading-relaxed">
                              {selectedProposal.summary}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-slate-100">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <ShieldCheck size={14} /> Certifications
                              </div>
                              <p className="text-sm font-bold text-slate-800">
                                {selectedProposal?.details?.certifications?.join(
                                  ", "
                                ) || "No certifications listed"}
                              </p>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <CreditCard size={14} /> Commercial Terms
                              </div>
                              <p className="text-sm font-bold text-slate-800">
                                {selectedProposal.details.terms}
                              </p>
                            </div>
                          </div>

                          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                              Supplier Personal Note
                            </h5>
                            <p className="text-sm italic text-slate-600">
                              "{selectedProposal.details.note}"
                            </p>
                          </div>
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                          <div className="bg-slate-900 text-white p-8 rounded-[24px] space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                              Proposal Controls
                            </h4>
                            <div className="space-y-3">
                              <button
                                onClick={() =>
                                  updateProposalStatus(
                                    selectedProposal.id,
                                    "Accepted"
                                  )
                                }
                                className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95"
                              >
                                <ThumbsUp size={16} /> Approve Access
                              </button>
                              <button
                                onClick={() =>
                                  updateProposalStatus(
                                    selectedProposal.id,
                                    "Rejected"
                                  )
                                }
                                className="w-full h-14 bg-white/10 hover:bg-rose-500/20 hover:text-rose-400 border border-white/5 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95"
                              >
                                <ThumbsDown size={16} /> Decline
                              </button>
                            </div>
                            <div className="pt-6 border-t border-white/10 space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">
                                  Received
                                </span>
                                <span className="text-[11px] font-black uppercase">
                                  {selectedProposal.date}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">
                                  Timestamp
                                </span>
                                <span className="text-[11px] font-black uppercase">
                                  {selectedProposal.time} GMT
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">
                                  Supplier Score
                                </span>
                                <span className="text-[11px] font-black uppercase text-blue-400">
                                  92/100
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Proposal;
