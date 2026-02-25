import React, { useState, useMemo, useEffect } from "react";
import {
  Users,
  Search,
  ShieldCheck,
  LayoutDashboard,
  GanttChart,
  Download,
  FileCheck,
  ArrowLeft,
  History,
  XCircle,
  CheckCircle,
  Network,
  Eye,
  Lock,
  Zap,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";

// --- INITIAL DATA ---
const INITIAL_SUPPLIERS = [
  {
    id: 1,
    businessName: "Global Logistics Ltd",
    email: "contact@global-log.com",
    status: "Pending",
    registeredDate: "2025-02-20",
    taxId: "TX-99882211",
    phone: "+1 555-010-9988",
    address: "123 Port Road, Logistics Hub, NY",
    documents: [
      { id: 101, type: "Business Registration", name: "cert_reg_2024.pdf" },
    ],
    history: [
      {
        id: 501,
        date: "2025-02-20",
        action: "Account Created",
        admin: "System",
      },
    ],
  },
  {
    id: 2,
    businessName: "Eco-Friendly Paper Co",
    email: "sales@ecopaper.biz",
    status: "Verified",
    registeredDate: "2025-02-15",
    taxId: "EB-772211",
    phone: "+1 555-012-3456",
    address: "45 Green Way, Eco Park, CA",
    documents: [{ id: 201, type: "ISO Certification", name: "iso_9001.pdf" }],
    history: [
      {
        id: 601,
        date: "2025-02-15",
        action: "Account Created",
        admin: "System",
      },
      {
        id: 602,
        date: "2025-02-16",
        action: "Verified",
        admin: "admin@pro.com",
      },
    ],
  },
  {
    id: 3,
    businessName: "Swift Tech Solutions",
    email: "ops@swifttech.io",
    status: "Pending",
    registeredDate: "2025-02-22",
    taxId: "ST-443322",
    phone: "+1 555-998-2211",
    address: "88 Innovation Blvd, SF, CA",
    documents: [{ id: 301, type: "Trade License", name: "license_v2.pdf" }],
    history: [
      {
        id: 701,
        date: "2025-02-22",
        action: "Account Created",
        admin: "System",
      },
    ],
  },
];

const AdminApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [rejectionModal, setRejectionModal] = useState({
    open: false,
    reason: "",
    supplierId: null,
  });

  const selectedSupplier = useMemo(
    () => suppliers.find((s) => s.id === selectedSupplierId),
    [suppliers, selectedSupplierId]
  );

  const pendingQueue = suppliers.filter((s) => s.status === "Pending");

  const handleUpdateStatus = (id, newStatus, reason = "") => {
    setSuppliers((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: newStatus,
            history: [
              ...s.history,
              {
                id: Date.now(),
                date: new Date().toISOString().split("T")[0],
                action: newStatus,
                admin: "admin@pro.com",
                reason,
              },
            ],
          };
        }
        return s;
      })
    );
    setRejectionModal({ open: false, reason: "", supplierId: null });
    setSelectedSupplierId(null);
  };

  // --- UI COMPONENTS ---

  const StatusBadge = ({ status }) => {
    const styles = {
      Verified: "bg-emerald-50 text-emerald-600 border-emerald-100",
      Pending: "bg-orange-50 text-orange-600 border-orange-100",
      Rejected: "bg-rose-50 text-rose-600 border-rose-100",
    };
    return (
      <span
        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Control Room" },
    {
      id: "queue",
      icon: ListChecksIcon,
      label: "Review Queue",
      badge: pendingQueue.length,
    },
    { id: "suppliers", icon: Users, label: "Supplier Hub" },
    { id: "bids", icon: GanttChart, label: "Trade Desk" },
  ];

  const BottomNav = () => (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 flex justify-between items-center z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setActiveTab(item.id);
            setSelectedSupplierId(null);
          }}
          className={`flex flex-col items-center justify-center w-1/4 gap-1 ${
            activeTab === item.id ? "text-blue-600" : "text-slate-400"
          }`}
        >
          <div className="relative">
            <item.icon
              size={20}
              strokeWidth={activeTab === item.id ? 2.5 : 2}
            />
            {item.badge > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                {item.badge}
              </span>
            )}
          </div>
          <span className="text-[8px] font-black uppercase tracking-tighter">
            {item.label.split(" ")[0]}
          </span>
        </button>
      ))}
    </nav>
  );

  const Sidebar = () => (
    <aside
      className={`hidden lg:flex flex-col fixed left-0 top-0 h-full bg-white border-r border-slate-100 z-40 transition-all duration-500 ${
        isSidebarOpen ? "w-72" : "w-24"
      }`}
    >
      <div
        className="p-8 flex items-center gap-4 cursor-pointer"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        {isSidebarOpen && (
          <span className="font-black text-2xl tracking-tighter text-slate-900">
            PRO.BASE
          </span>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSelectedSupplierId(null);
            }}
            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${
              activeTab === item.id
                ? "bg-blue-600 text-white shadow-2xl shadow-blue-200"
                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <item.icon size={20} />
              {isSidebarOpen && (
                <span className="font-black text-[10px] uppercase tracking-widest leading-none">
                  {item.label}
                </span>
              )}
            </div>
            {isSidebarOpen && item.badge > 0 && (
              <span
                className={`text-[9px] font-black px-2 py-1 rounded-lg ${
                  activeTab === item.id
                    ? "bg-white/20"
                    : "bg-rose-500 text-white"
                }`}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );

  const SupplierCard = ({ supplier, showActions = false }) => (
    <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-900 border border-slate-100">
            {supplier.businessName.charAt(0)}
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-none">
              {supplier.businessName}
            </h4>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase truncate max-w-[140px]">
              {supplier.email}
            </p>
          </div>
        </div>
        <StatusBadge status={supplier.status} />
      </div>

      <div className="flex items-center justify-between py-4 border-y border-slate-50 my-4">
        <div>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
            Registered
          </p>
          <p className="text-[10px] font-bold text-slate-900">
            {supplier.registeredDate}
          </p>
        </div>
        <div>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-right">
            Tax ID
          </p>
          <p className="text-[10px] font-bold text-slate-900 text-right">
            {supplier.taxId}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setSelectedSupplierId(supplier.id)}
          className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest"
        >
          Review Entity
        </button>
        {showActions && supplier.status === "Pending" && (
          <button
            onClick={() => handleUpdateStatus(supplier.id, "Verified")}
            className="w-12 h-12 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm shadow-emerald-100"
          >
            <CheckCircle size={18} />
          </button>
        )}
      </div>
    </div>
  );

  const SupplierDetailView = () => (
    <div className="pb-32 lg:pb-10 space-y-6">
      <div className="flex items-center gap-4 mb-2 lg:hidden">
        <button
          onClick={() => setSelectedSupplierId(null)}
          className="p-3 bg-white rounded-xl border border-slate-100"
        >
          <ArrowLeft size={20} className="text-slate-900" />
        </button>
        <span className="font-black text-xs uppercase tracking-widest text-slate-900">
          Reviewing Profile
        </span>
      </div>

      <div className="hidden lg:flex justify-between items-center mb-8">
        <button
          onClick={() => setSelectedSupplierId(null)}
          className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border border-slate-100 font-black text-[10px] uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Review
        </button>
        {selectedSupplier.status === "Pending" && (
          <div className="flex gap-4">
            <button
              onClick={() =>
                handleUpdateStatus(selectedSupplier.id, "Verified")
              }
              className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-emerald-100"
            >
              <CheckCircle size={16} /> Approve Access
            </button>
            <button
              onClick={() =>
                setRejectionModal({
                  open: true,
                  reason: "",
                  supplierId: selectedSupplier.id,
                })
              }
              className="px-10 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3"
            >
              <XCircle size={16} /> Reject Registration
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[32px] lg:rounded-[40px] border border-slate-100 p-8 lg:p-12 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:justify-between items-center text-center lg:text-left gap-6 mb-8 lg:mb-12">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center font-black text-3xl text-blue-600 border border-slate-100">
                {selectedSupplier.businessName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row items-center gap-4 mb-2">
                  <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter">
                    {selectedSupplier.businessName}
                  </h3>
                  <StatusBadge status={selectedSupplier.status} />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {selectedSupplier.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
              {[
                { label: "Registration ID", val: selectedSupplier.taxId },
                { label: "Primary Phone", val: selectedSupplier.phone },
                { label: "HQ Address", val: selectedSupplier.address },
                {
                  label: "Registered On",
                  val: selectedSupplier.registeredDate,
                },
              ].map((info, idx) => (
                <div key={idx}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    {info.label}
                  </p>
                  <p className="text-sm font-bold text-slate-900">{info.val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[32px] lg:rounded-[40px] border border-slate-100 p-8 lg:p-10 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 tracking-tight text-lg">
                System Integrity
              </h3>
              <Network className="text-blue-600 w-5 h-5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                  Supplier App
                </p>
                <div className="flex items-center gap-2">
                  {selectedSupplier.status === "Verified" ? (
                    <Zap className="text-emerald-500" size={16} />
                  ) : (
                    <Lock className="text-rose-500" size={16} />
                  )}
                  <span className="text-[10px] font-black uppercase text-slate-900">
                    Trade Access
                  </span>
                </div>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                  Buyer View
                </p>
                <div className="flex items-center gap-2">
                  <Eye className="text-blue-500" size={16} />
                  <span className="text-[10px] font-black uppercase text-slate-900">
                    {selectedSupplier.status === "Verified"
                      ? "Public"
                      : "Restricted"}
                  </span>
                </div>
              </div>
              <div className="p-5 bg-blue-600 text-white rounded-2xl">
                <p className="text-[8px] font-black text-blue-200 uppercase tracking-[0.2em] mb-3">
                  Security Flow
                </p>
                <p className="text-[10px] font-bold leading-tight opacity-90 uppercase">
                  API SYNC ACTIVE
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
              Submitted Assets
            </h3>
            <div className="space-y-3">
              {selectedSupplier.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 bg-slate-50 rounded-xl flex items-center justify-between group cursor-pointer border border-transparent hover:border-blue-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <FileCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest">
                        {doc.type}
                      </p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase">
                        {doc.name}
                      </p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-slate-200 group-hover:text-blue-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[32px] p-8 text-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <History size={14} className="text-blue-400" /> Audit Trail
            </h4>
            <div className="space-y-4">
              {selectedSupplier.history.map((log) => (
                <div
                  key={log.id}
                  className="border-l-2 border-slate-700 pl-4 relative"
                >
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-xs font-bold leading-none">{log.action}</p>
                  <p className="text-[9px] font-black text-slate-500 uppercase mt-1">
                    {log.date} by {log.admin}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedSupplier.status === "Pending" && (
        <div className="lg:hidden fixed bottom-[72px] left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 p-4 flex gap-3 z-40">
          <button
            onClick={() => handleUpdateStatus(selectedSupplier.id, "Verified")}
            className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-100"
          >
            Approve
          </button>
          <button
            onClick={() =>
              setRejectionModal({
                open: true,
                reason: "",
                supplierId: selectedSupplier.id,
              })
            }
            className="flex-1 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-xs uppercase tracking-widest"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen flex bg-[#f8fafc] overflow-hidden select-none">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden lg:pl-24">
        <header className="h-20 lg:h-24 flex items-center justify-between px-6 lg:px-12 bg-[#f8fafc] relative z-30">
          <div className="flex items-center gap-4">
            <div
              className="lg:hidden bg-blue-600 p-2 rounded-xl"
              onClick={() => setSidebarOpen(true)}
            >
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <h1 className="text-[10px] font-black text-slate-900 lg:text-slate-400 uppercase tracking-[0.2em]">
              PRO.BASE //{" "}
              {selectedSupplierId
                ? "VERIFICATION_MODE"
                : activeTab.toUpperCase()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white p-1.5 pr-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-[10px]">
                AD
              </div>
              <p className="hidden md:block text-[8px] font-black text-slate-900 uppercase tracking-widest leading-none">
                Root_Admin
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 lg:px-12 pb-24 lg:pb-12">
          <div className="max-w-7xl mx-auto py-4">
            {selectedSupplierId ? (
              <SupplierDetailView />
            ) : (
              <div className="space-y-6">
                <div className="flex gap-2 mb-6">
                  <div className="flex-1 bg-white border border-slate-100 rounded-2xl px-4 flex items-center gap-3 shadow-sm h-14">
                    <Search className="text-slate-300 w-5 h-5" />
                    <input
                      className="bg-transparent border-none outline-none flex-1 font-bold text-sm text-slate-900 placeholder:text-slate-300"
                      placeholder="Search registry..."
                    />
                  </div>
                  <button className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm">
                    <Filter size={20} />
                  </button>
                </div>

                {activeTab === "dashboard" && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-500">
                    <div
                      className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm cursor-pointer hover:border-blue-200 transition-all"
                      onClick={() => setActiveTab("queue")}
                    >
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        Pending Review
                      </p>
                      <p className="text-2xl font-black text-slate-900 mt-1">
                        {pendingQueue.length}
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        Trust Index
                      </p>
                      <p className="text-2xl font-black text-emerald-600 mt-1">
                        98.2%
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "queue" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                    {pendingQueue.map((s) => (
                      <SupplierCard key={s.id} supplier={s} showActions />
                    ))}
                    {pendingQueue.length === 0 && (
                      <div className="col-span-full py-32 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
                        <CheckCircle
                          size={48}
                          className="text-emerald-100 mx-auto mb-4"
                        />
                        <p className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                          Queue Fully Cleared
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "suppliers" && (
                  <>
                    <div className="hidden lg:block bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-50 bg-slate-50/30">
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Entity Name
                            </th>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Status
                            </th>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                              Ops
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {suppliers.map((s) => (
                            <tr
                              key={s.id}
                              className="group hover:bg-slate-50/50 transition-colors"
                            >
                              <td className="px-10 py-7">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    {s.businessName.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-900">
                                      {s.businessName}
                                    </p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                      {s.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-10 py-7">
                                <StatusBadge status={s.status} />
                              </td>
                              <td className="px-10 py-7 text-right">
                                <button
                                  onClick={() => setSelectedSupplierId(s.id)}
                                  className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                                >
                                  <ChevronRight size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="lg:hidden grid grid-cols-1 gap-6">
                      {suppliers.map((s) => (
                        <SupplierCard key={s.id} supplier={s} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />

      {rejectionModal.open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-end lg:items-center justify-center p-4 lg:p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-t-[40px] lg:rounded-[40px] shadow-2xl w-full max-w-xl p-8 lg:p-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2">
                  Security protocol
                </p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter">
                  Reject Registration
                </h3>
              </div>
              <button
                onClick={() =>
                  setRejectionModal({
                    open: false,
                    reason: "",
                    supplierId: null,
                  })
                }
                className="p-2"
              >
                <X />
              </button>
            </div>
            <textarea
              rows="4"
              value={rejectionModal.reason}
              onChange={(e) =>
                setRejectionModal({ ...rejectionModal, reason: e.target.value })
              }
              className="w-full p-6 bg-slate-50 border-2 border-transparent focus:border-rose-500 rounded-3xl font-bold text-slate-900 transition-all outline-none resize-none mb-8"
              placeholder="State reason for denial..."
            />
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() =>
                  setRejectionModal({
                    open: false,
                    reason: "",
                    supplierId: null,
                  })
                }
                className="py-5 bg-slate-100 text-slate-400 rounded-3xl font-black text-[10px] uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleUpdateStatus(
                    rejectionModal.supplierId,
                    "Rejected",
                    rejectionModal.reason
                  )
                }
                className="py-5 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-200"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ListChecksIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 17 2 2 4-4" />
    <path d="m3 7 2 2 4-4" />
    <path d="M13 6h8" />
    <path d="M13 12h8" />
    <path d="M13 18h8" />
  </svg>
);

export default AdminApp;
