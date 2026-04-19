import React from "react";
import { X, FileText, CheckCircle2 } from "lucide-react";

const CreateAuctionModal = ({
  isCreateModalOpen,
  resetForm,
  newRfp,
  setNewRfp,
  formStep,
  setFormStep,
  handlePublishRfp,
}) => {
  if (!isCreateModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={resetForm}
      />

      <div className="relative w-full max-w-2xl bg-white border border-slate-100 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
        {/* HEADER */}
        <div className="p-8 lg:p-12 border-b border-slate-50 flex items-center justify-between bg-white shrink-0">
          <div>
            <h2 className="text-2xl font-black italic uppercase text-slate-900 tracking-tighter">
              Broadcast <span className="text-blue-600">New RFP</span>
            </h2>
            <div className="flex gap-2 mt-3">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    formStep >= s ? "w-10 bg-blue-600" : "w-4 bg-slate-100"
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={resetForm}
            className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* SCROLLABLE FORM BODY */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
          {/* STEP 1: IDENTITY & CATEGORY */}
          {formStep === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
              {/* 1. Title */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Title of RFP
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <input
                    value={newRfp.title}
                    onChange={(e) =>
                      setNewRfp({ ...newRfp, title: e.target.value })
                    }
                    required
                    placeholder="e.g. 5,000 Industrial Safety Helmets"
                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 pl-16 text-sm font-bold outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              {/* 2. Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Item Description
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <input
                    value={newRfp.description}
                    onChange={(e) =>  
                      setNewRfp({ ...newRfp, description: e.target.value })
                    }
                    required
                    placeholder="Item Description"
                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 pl-16 text-sm font-bold outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 3. Category */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Category
                  </label>
                  <select
                    value={newRfp.category}
                    onChange={(e) =>
                      setNewRfp({ ...newRfp, category: e.target.value })
                    }
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-sm font-bold outline-none appearance-none"
                  >
                    <option>Industrial</option>
                    <option>IT Services</option>
                    <option>Logistics</option>
                    <option>Office Supplies</option>
                    <option>Metal Supplier</option>
                  </select>
                </div>
                {/* 4. Priority */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Priority
                  </label>
                  <div className="flex gap-2">
                    {["Normal", "Urgent"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewRfp({ ...newRfp, priority: p })}
                        className={`flex-1 py-6 rounded-[24px] border transition-all text-[10px] font-black uppercase ${
                          newRfp.priority === p
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-50 text-slate-400 border-slate-100"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: LOGISTICS & BUDGET */}
          {formStep === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 5. Budget */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Budget (₱)
                  </label>
                  <input
                    type="number"
                    value={newRfp.budget}
                    onChange={(e) =>
                      setNewRfp({ ...newRfp, budget: e.target.value })
                    }
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-sm font-bold outline-none"
                  />
                </div>
                {/* 6. Quantity */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Quantity (Q)
                  </label>
                  <input
                    type="number"
                    value={newRfp.quantity}
                    onChange={(e) =>
                      setNewRfp({ ...newRfp, quantity: e.target.value })
                    }
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-sm font-bold outline-none"
                  />
                </div>
              </div>

              {/* 7. Address */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Address
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <input
                    value={newRfp.location}
                    onChange={(e) =>
                      setNewRfp({ ...newRfp, location: e.target.value })
                    }
                    required
                    placeholder="Buyer Location"
                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 pl-16 text-sm font-bold outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              {/* 8. Auction End Date */}
              {/* Auction End Date with Countdown Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Auction Ends
                </label>

                <input
                  type="datetime-local"
                  // Blocks past dates
                  min={new Date().toISOString().slice(0, 16)}
                  value={newRfp.expedet}
                  onChange={(e) =>
                    setNewRfp({ ...newRfp, expedet: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all"
                />

                {/* This is the part I missed - The dynamic description */}
                {newRfp.expedet && (
                  <div className="mt-3 ml-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-tight">
                      Closing on:{" "}
                      {new Date(newRfp.expedet).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMATION */}
          {formStep === 3 && (
            <div className="text-center space-y-8 py-6">
              <div className="w-20 h-20 bg-blue-600 rounded-[30px] flex items-center justify-center text-white mx-auto shadow-xl">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase text-slate-900">
                Final Confirmation
              </h3>
            </div>
          )}
        </div>

        {/* FOOTER BUTTONS */}
        <div className="p-8 lg:p-12 bg-white border-t border-slate-50 flex items-center gap-4 shrink-0">
          {formStep > 1 && (
            <button
              onClick={() => setFormStep((s) => s - 1)}
              className="flex-1 py-6 bg-slate-100 text-slate-600 font-black uppercase rounded-[28px] text-[9px]"
            >
              Back
            </button>
          )}
          {formStep < 3 ? (
            <button
              onClick={() => setFormStep((s) => s + 1)}
              className="flex-[2] py-6 bg-slate-900 text-white font-black uppercase rounded-[28px] text-[9px]"
            >
              Next Stage
            </button>
          ) : (
            <button
              onClick={handlePublishRfp}
              className="flex-[2] py-6 bg-blue-600 text-white font-black uppercase rounded-[28px] text-[9px]"
            >
              Publish RFQ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAuctionModal;
