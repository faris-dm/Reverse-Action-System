// src/components/supplier/views/MarketplaceView.jsx
import React from "react";
import { Search, Clock, MessageSquare } from "lucide-react";
import { InfoItem } from "../common/infoitem";
export const MarketplaceView = ({ requests, onBid, onMessage }) => {
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
};
