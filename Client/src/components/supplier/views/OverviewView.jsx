// src/components/supplier/views/OverviewView.jsx
import React from "react";
import { Gavel, Store, MessageSquare, ArrowRight } from "lucide-react";
import StatCard from "../common/StatCard";

export const OverviewView = ({ bids, onNavigate }) => {
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
};
