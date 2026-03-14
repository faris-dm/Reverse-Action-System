// src/components/supplier/common/FileUploadCard.jsx
import React from "react";
import { Upload } from "lucide-react";

export const FileUploadCard = ({ label }) => {
  return (
    <div className="p-5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors cursor-pointer group text-center space-y-2">
      <div className="w-10 h-10 bg-white rounded-xl shadow-sm mx-auto flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
        <Upload size={18} />
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600">
        {label}
      </p>
    </div>
  );
};
