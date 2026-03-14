// src/components/supplier/common/ReportStatCard.jsx
import React from "react";

export const ReportStatCard = ({ label, value, icon, trend }) => {
  return (
    <div className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
          {icon}
        </div>
        <div className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-tight">
          {trend}
        </div>
      </div>
      <p className="text-4xl font-black text-slate-900 leading-none mb-2">
        {value}
      </p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
};

