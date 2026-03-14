// src/components/supplier/views/ReportsView.jsx
import React, { useState } from "react";
import {
  Download,
  Filter,
  Gavel,
  Check,
  DollarSign,
  Clock,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { ReportStatCard } from "../common/ReportStatCard";

export const ReportsView = ({ log }) => {
  const [filterType, setFilterType] = useState("All");
  const [dateRange, setDateRange] = useState("Last 30 Days");

  const filteredLog = log.filter(
    (item) => filterType === "All" || item.category === filterType
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            Performance Reports
          </h1>
          <p className="text-slate-400 font-bold mt-2">
            Historical activity log and key performance metrics.
          </p>
        </div>
        <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportStatCard
          label="Total Bids Placed"
          value="48"
          icon={<Gavel />}
          trend="+12% from last month"
        />
        <ReportStatCard
          label="Won Contracts"
          value="14"
          icon={<Check />}
          trend="+5% from last month"
        />
        <ReportStatCard
          label="Total Earnings"
          value="1.2M ETB"
          icon={<DollarSign />}
          trend="+240k this month"
        />
        <ReportStatCard
          label="Active Bids"
          value="06"
          icon={<Clock />}
          trend="Current open items"
        />
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-slate-900 font-black">
            <Filter size={18} className="text-blue-600" />
            <span>Activity Log</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 rounded-xl text-xs font-black outline-none border-2 border-transparent focus:border-blue-600 cursor-pointer"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>Last 30 Days</option>
              <option>Custom Range</option>
            </select>
            <div className="flex bg-slate-50 p-1 rounded-xl">
              {["All", "Bids", "Contracts", "Messages"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                    filterType === type
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Date / Time
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Action Type
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Details
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Amount
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLog.length > 0 ? (
                filteredLog.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/20 transition-colors group"
                  >
                    <td className="px-8 py-6 text-sm font-bold text-slate-500 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-6 py-6">
                      <span
                        className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                          item.category === "Bids"
                            ? "bg-blue-50 text-blue-600"
                            : item.category === "Contracts"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-purple-50 text-purple-600"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 max-w-xs truncate">
                        <span className="font-black text-slate-900 text-sm truncate">
                          {item.details}
                        </span>
                        <ExternalLink
                          size={12}
                          className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-6 font-black text-sm text-slate-900">
                      {item.amount}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span
                        className={`text-[10px] font-black uppercase ${
                          ["Winning", "Completed"].includes(item.status)
                            ? "text-emerald-500"
                            : item.status === "Outbid"
                            ? "text-amber-500"
                            : "text-slate-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <BarChart3 className="text-slate-200" size={48} />
                      <p className="text-slate-400 font-bold">
                        No activity found for the selected period.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
