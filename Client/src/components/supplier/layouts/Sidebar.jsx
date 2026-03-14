// src/components/supplier/layouts/Sidebar.jsx
import React from "react";
import {
  X,
  LayoutDashboard,
  Store,
  Gavel,
  MessageSquare,
  BarChart3,
  Settings,
  TrendingUp,
} from "lucide-react";

export const Sidebar = ({ isOpen, onClose, activeTab, onTabChange }) => {
  const menuItems = [
    { id: "Overview", icon: LayoutDashboard },
    { id: "Marketplace", icon: Store },
    { id: "My Bids", icon: Gavel },
    { id: "Messages", icon: MessageSquare },
    { id: "Reports", icon: BarChart3 },
    { id: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-8 flex items-center justify-between h-24">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-100">
              <TrendingUp size={20} />
            </div>
            <span className="font-black text-xl tracking-tight">
              Supplier Hub
            </span>
          </div>
          <button
            className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-xl"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                onClose();
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
    </>
  );
};
