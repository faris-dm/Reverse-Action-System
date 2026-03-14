// src/components/supplier/common/InputField.jsx
import React from "react";

export const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}) => {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label} {required && <span className="text-blue-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full p-5 bg-slate-50 rounded-[20px] font-bold border-2 border-transparent focus:border-blue-600 outline-none transition-all"
      />
    </div>
  );
};
