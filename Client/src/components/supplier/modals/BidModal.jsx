// // src/components/supplier/modals/BidModal.jsx
// import React, { useState } from "react";
// import {
//   X,
//   DollarSign,
//   Calendar,
//   Loader2,
//   Check,
//   Eye,
//   FileText,
//   ArrowRight,
// } from "lucide-react";

// export const BidModal = ({ isOpen, onClose, selectedRequest, onSubmit }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [fileDone, setFileDone] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     price: "",
//     description: "",
//     delivery: "",
//     file: null,
//   });
//   if (!isOpen || !selectedRequest) return null;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const fileHandleChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFileDone(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // const formData = new FormData(e.target);
//     // const amount = Number(formData.get("amount"));

//     setIsSubmitting(true);

//     setTimeout(() => {
//       onSubmit({
//         id: "bid_" + Math.random(),
//         requestId: selectedRequest.id,
//         requestTitle: selectedRequest.title,
//         amount: amount,
//         status: amount <= selectedRequest.currentLow ? "Winning" : "Outbid",
//         category: selectedRequest.category,
//         date: new Date().toISOString().split("T")[0],
//       });
//       setIsSubmitting(false);
//       setIsSubmitted(true);
//       setTimeout(() => {
//         onClose();
//         setIsSubmitted(false);
//       }, 1800);
//     }, 1000);

//     const data = new FormData();
//     data.append("fullName", formData.fullName);
//     data.append("price", formData.price);
//     data.append("description", formData.description);
//     data.append("deadline", formData.deadline);

//     if (fileDone) {
//       data.append("file", fileDone);
//     }
//     try {
//       const PostProposal = await fetch(
//         "http://localhost:21000/api/recivePropoal",
//         {
//           method: "POST",

//           body: data,
//         }
//       );
//       if (PostProposal.ok) {
//         console.log("proposal Sent Succefully");
//         alert("proposal Sent Succefully");
//       } else {
//         console.log("proposal Is Faild");
//         console.error(error);
//         alert("submition Failed");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative animate-in zoom-in duration-200 overflow-hidden max-h-[95vh] flex flex-col">
//         <div className="p-8 pb-4 flex justify-between items-start shrink-0">
//           <div>
//             <h2 className="text-3xl font-black tracking-tight">
//               Submit Proposal
//             </h2>
//             <p className="text-slate-400 font-bold mt-1">
//               Project:{" "}
//               <span className="text-blue-600">{selectedRequest?.title}</span>
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-colors"
//           >
//             <X size={20} />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-8 pt-4">
//           {isSubmitted ? (
//             <div className="py-20 text-center space-y-4">
//               <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
//                 <Check size={48} strokeWidth={3} />
//               </div>
//               <h3 className="text-3xl font-black">Success!</h3>
//               <p className="text-slate-400 font-bold max-w-xs mx-auto text-lg leading-snug">
//                 Your proposal has been delivered.
//               </p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="grid grid-cols-2 gap-4 p-5 bg-blue-50/50 rounded-3xl border border-blue-100">
//                 <div>
//                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
//                     Target Budget
//                   </p>
//                   <p className="text-lg font-black text-blue-900">
//                     {selectedRequest?.maxBudget?.toLocaleString()} ETB
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
//                     {/* Current Low Bid */}
//                   </p>
//                   {/* <p className="text-lg font-black text-emerald-600">
//                     {selectedRequest?.currentLow?.toLocaleString()} ETB
//                   </p> */}
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* addded Name */}
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
//                     Supplier Name
//                   </label>
//                   <div className="relative">
//                     <Eye
//                       className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
//                       size={18}
//                     />
//                     <input
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       required
//                       type="text"
//                       placeholder="Full Name"
//                       className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-black text-lg transition-all"
//                     />
//                   </div>
//                 </div>
//                 {/* name ends here */}
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
//                     The Price (ETB)
//                   </label>
//                   <div className="relative">
//                     <DollarSign
//                       className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
//                       size={18}
//                     />
//                     <input
//                       name="amount"
//                       required
//                       value={formData.price}
//                       type="number"
//                       placeholder="0.00"
//                       className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-black text-lg transition-all"
//                     />
//                   </div>
//                 </div>

//                 {/* added the proof layer  */}
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
//                     Your Experience & Proposal
//                   </label>
//                   <div className="relative">
//                     <FileText
//                       className="absolute left-5 top-5 text-slate-400"
//                       size={18}
//                     />
//                     <textarea
//                       name="experience"
//                       value={formData.description}
//                       onChange={handleChange}
//                       required
//                       rows={6}
//                       placeholder="Tell us about work expreance"
//                       className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-medium text-base transition-all resize-y"
//                     />
//                   </div>
//                   <p className="text-xs text-slate-400 ml-1 mt-1">
//                     Minimum 50 characters • experience
//                   </p>
//                 </div>

//                 {/* end the prof layer */}

//                 {/* added the text */}
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
//                     Delivery Date
//                   </label>
//                   <div className="relative">
//                     <Calendar
//                       className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
//                       size={18}
//                     />
//                     <input
//                       type="date"
//                       name="deadline"
//                       value={formData.deadline}
//                       onChange={handleChange}
//                       className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-black text-sm transition-all"
//                     />
//                   </div>
//                   <p className="text-[10px] text-slate-400 ml-1">
//                     Choose exactly when you will deliver the project
//                   </p>
//                 </div>

//                 {/* done file upldoad */}

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
//                     file Upload
//                   </label>
//                   <div className="relative">
//                     <FileText
//                       className="absolute left-5 top-5 text-slate-400"
//                       size={18}
//                     />
//                   </div>
//                   <input
//                     name="fileUpload"
//                     // value={formData.file}
//                     onChange={fileHandleChange}
//                     placeholder="Upload File"
//                     className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-600 font-bold text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
//                     type="file"
//                   />

//                   {fileDone ? (
//                     <div className="flex items-center gap-2 mt-2 ml-2 text-blue-600 animate-in fade-in slide-in-from-top-1">
//                       <Check size={14} strokeWidth={3} />
//                       <span className="text-xs font-black truncate max-w-[200px]">
//                         {fileDone.name}
//                       </span>
//                       <button
//                         onClick={() => setFileDone(null)}
//                         className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-500 hover:text-red-500"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ) : (
//                     <p className="text-[10px] text-slate-400 ml-2 mt-1">
//                       Upload License or Project Plan (PDF/Image)
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full py-6 bg-slate-900 text-white rounded-[24px] font-black text-lg shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
//               >
//                 {isSubmitting ? (
//                   <Loader2 className="animate-spin" />
//                 ) : (
//                   <>
//                     Send Proposal <ArrowRight size={20} />
//                   </>
//                 )}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

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

const BidModal = ({ isOpen, onClose, selectedRequest, onSubmit }) => {
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

    if (fileDone) {
      data.append("file", fileDone);
    }

    try {
      const PostProposal = await fetch(
        "http://localhost:21000/api/recivePropoal",
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

        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFileDone(null);
        }, 1800);
      } else {
        alert("Submission Failed");
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

export default BidModal;
