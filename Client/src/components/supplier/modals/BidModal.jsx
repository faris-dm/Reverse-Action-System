
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
  const [fileDone, setFileDone] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    price: "",
    description: "",
    deadline: "",
  });

  if (!isOpen || !selectedRequest) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileDone(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Calculate amount for the local onSubmit callback
    const amount = Number(formData.price);

    // 2. Prepare the package for the Backend
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("deadline", formData.deadline);
    data.append("requestId", selectedRequest.id);

    if (fileDone) {
      data.append("file", fileDone);
    }

    try {
      const PostProposal = await fetch(
        "http://localhost:21000/api/receiveProposal",
        {
          method: "POST",
          body: data, // No headers needed for FormData
        }
      );

      if (PostProposal.ok) {
        // Trigger the local UI update
        onSubmit({
          id: "bid_" + Math.random(),
          requestId: selectedRequest.id,
          requestTitle: selectedRequest.title,
          amount: amount,
          status: amount <= selectedRequest.currentLow ? "Winning" : "Outbid",
          category: selectedRequest.category,
          date: new Date().toISOString().split("T")[0],
        });

        setIsSubmitted(true);
        console.log("Proposal Sent Successfully");
        setFormData({
          fullName: "",
          price: "",
          description: "",
          deadline: "",
        });
        setFileDone(null);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFileDone(null);
        }, 1800);
      } else if (PostProposal.status === 409) {
        // --- FIX: NOTIFY USER IF ALREADY BID ---
        alert(result.message);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.log("Error sending proposal:", error);
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    Supplier Name
                  </label>
                  <div className="relative">
                    <Eye
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-black text-lg transition-all"
                    />
                  </div>
                </div>

                {/* Price - name changed to 'price' to match state */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    The Price (ETB)
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleChange}
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-black text-lg transition-all"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    Your Experience & Proposal
                  </label>
                  <div className="relative">
                    <FileText
                      className="absolute left-5 top-5 text-slate-400"
                      size={18}
                    />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about work experience"
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-medium text-base transition-all resize-y"
                    />
                  </div>
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    Delivery Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-black text-sm transition-all"
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    File Upload
                  </label>
                  <input
                    name="fileUpload"
                    onChange={fileHandleChange}
                    type="file"
                    className="w-full py-4 px-2 bg-slate-50 rounded-2xl font-bold text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                  />
                  {fileDone && (
                    <div className="flex items-center gap-2 mt-2 text-blue-600">
                      <Check size={14} strokeWidth={3} />
                      <span className="text-xs font-black truncate max-w-[150px]">
                        {fileDone.name}
                      </span>
                      <button
                        onClick={() => setFileDone(null)}
                        className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-500"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-slate-900 text-white rounded-[24px] font-black text-lg shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
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
