/**
 * StatCard.jsx
 * Reusable statistics card
 *
 * Import: import StatCard from '../common/StatCard';
 * Props: label, value, icon, color
 */

import React from "react";

const StatCard = ({ label, value, icon, color }) => {
  return (
    <div className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm hover:shadow-md">
      <div
        className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white mb-6`}
      >
        {icon}
      </div>
      <p className="text-4xl font-black text-slate-900 leading-none mb-1">
        {value}
      </p>
      <p className="text-[10px] font-black text-slate-400 uppercase">{label}</p>
    </div>
  );
};

export default StatCard;
