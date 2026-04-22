// src/components/supplier/modals/BidModal.jsx
import React, { useState } from "react";
import {
  X,
  DollarSign,
  Calendar,
  Loader2,
  Check,
  Eye,
  FileText,
  ArrowRight,
} from "lucide-react";

export const BidModal = ({ isOpen, onClose, selectedRequest, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !selectedRequest) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amount = Number(formData.get("amount"));

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit({
        id: "bid_" + Math.random(),
        requestId: selectedRequest.id,
        requestTitle: selectedRequest.title,
        amount: amount,
        status: amount <= selectedRequest.currentLow ? "Winning" : "Outbid",
        category: selectedRequest.category,
        date: new Date().toISOString().split("T")[0],
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 1800);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative animate-in zoom-in duration-200 overflow-hidden max-h-[95vh] flex flex-col">
        <div className="p-8 pb-4 flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              Submit Proposal
            </h2>
            <p className="text-slate-400 font-bold mt-1">
              Project:{" "}
              <span className="text-blue-600">{selectedRequest?.title}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 pt-4">
          {isSubmitted ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Check size={48} strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-black">Success!</h3>
              <p className="text-slate-400 font-bold max-w-xs mx-auto text-lg leading-snug">
                Your proposal has been delivered.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-4 p-5 bg-blue-50/50 rounded-3xl border border-blue-100">
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                    Target Budget
                  </p>
                  <p className="text-lg font-black text-blue-900">
                    {selectedRequest?.maxBudget?.toLocaleString()} ETB
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                    {/* Current Low Bid */}
                  </p>
                  {/* <p className="text-lg font-black text-emerald-600">
                    {selectedRequest?.currentLow?.toLocaleString()} ETB
                  </p> */}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* addded Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Supplier Name
                  </label>
                  <div className="relative">
                    <Eye
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      name="amount"
                      required
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-black text-lg transition-all"
                    />
                  </div>
                </div>
                {/* name ends here */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    The Price (ETB)
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      name="amount"
                      required
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-black text-lg transition-all"
                    />
                  </div>
                </div>

                {/* added the proof layer  */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Your Experience & Proposal
                  </label>
                  <div className="relative">
                    <FileText
                      className="absolute left-5 top-5 text-slate-400"
                      size={18}
                    />
                    <textarea
                      name="experience"
                      required
                      rows={6}
                      placeholder="Tell us about your experience in construction, past projects, your expertise, and why you're the right fit for this project..."
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-medium text-base transition-all resize-y"
                    />
                  </div>
                  <p className="text-xs text-slate-400 ml-1 mt-1">
                    Minimum 50 characters • Share your relevant experience
                  </p>
                </div>

                {/* end the prof layer */}

                {/* added the text */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Delivery Lead Time
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <select
                      name="delivery"
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-black text-sm appearance-none cursor-pointer transition-all"
                    >
                      <option>Next Day Delivery</option>
                      <option>2-3 Business Days</option>
                      <option>Within 1 Week</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-slate-900 text-white rounded-[24px] font-black text-lg shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Send Proposal <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
