// src/components/supplier/views/MyBidsView.jsx
import React from "react";
import { EditIcon } from "../common/EditIcon";

export const MyBidsView = ({ bids, onUpdate }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <h2 className="text-3xl font-black">Submitted Proposals</h2>
      <div className="bg-white rounded-[36px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Project Item
              </th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                My Quote
              </th>
              <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                Rank
              </th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bids.map((bid) => (
              <tr
                key={bid.id}
                className="hover:bg-slate-50/30 transition-colors"
              >
                <td className="px-8 py-6">
                  <p className="font-black text-slate-900">
                    {bid.requestTitle}
                  </p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
                    {bid.category}
                  </p>
                </td>
                <td className="px-6 py-6 text-center font-black text-slate-900">
                  {bid.amount.toLocaleString()} ETB
                </td>
                <td className="px-6 py-6 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
                      bid.status === "Winning"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}
                  >
                    {bid.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button
                    onClick={() => onUpdate(bid)}
                    className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <EditIcon size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
