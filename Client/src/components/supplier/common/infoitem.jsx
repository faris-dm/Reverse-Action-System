// src/components/supplier/common/InfoItem.jsx
import React from "react";

export const InfoItem = ({ label, value, color = "text-slate-900" }) => {
  return (
    <div>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className={`text-sm font-black ${color}`}>{value}</p>
    </div>
  );
};
