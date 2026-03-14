// src/components/supplier/layouts/Header.jsx
import React from "react";
import { Menu, Bell } from "lucide-react";

export const Header = ({ businessName, onMenuClick }) => {
  return (
    <header className="h-24 bg-white/80 backdrop-blur-lg border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-3 bg-slate-50 rounded-xl text-slate-500 hover:text-blue-600 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest hidden sm:block">
          {businessName}
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-900">{businessName}</p>
            <p className="text-[10px] text-blue-600 font-bold uppercase">
              Verified Vendor
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black shadow-lg">
            {businessName[0]}
          </div>
        </div>
      </div>
    </header>
  );
};
