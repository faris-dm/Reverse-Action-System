// src/components/supplier/views/SettingsView.jsx
import React, { useEffect, useState } from "react";
import {
  Building2,
  ShieldCheck,
  Lock,
  Save,
  Loader2,
  AlertCircle,
  Trash2,
  Briefcase,
} from "lucide-react";
import { InputField } from "../common/InputField";
import FileUploadCard from "../common/FileUploadCard";

export const SettingsView = ({ profile, setProfile }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("business");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function DoneDelite() {
    try {
      const response = await fetch("http://localhost:21000/api/logout", {
        credentials: "include",
        method: "POST",
      });

      if (response.status === 401) {
        window.location.href = "/supplier";
        return;
      }
      if (!response.ok) {
        throw new Error("could not Delete  the tokens from the buyer profile");
      }
      window.location.href = "/login";
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1200);
  };

  const sections = [
    { id: "business", label: "Business Profile", icon: Building2 },
    { id: "verification", label: "Trust & Verification", icon: ShieldCheck },
    { id: "security", label: "Account Security", icon: Lock },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Settings</h1>
          <p className="text-slate-400 font-bold mt-2">
            Manage your supplier identity and account preferences.
          </p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeSection === s.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                  : "text-slate-400 hover:text-slate-900"
              }`}
            >
              <s.icon size={14} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        <div className="lg:col-span-2 space-y-10">
          {/* Business Info Section */}
          {activeSection === "business" && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
              <section className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">
                      Essential Information
                    </h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      Required for active bidding
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField
                    label="Business Name"
                    required
                    value={profile.businessName}
                    onChange={(v) =>
                      setProfile({ ...profile, businessName: v })
                    }
                  />
                  <InputField
                    label="Contact Email"
                    required
                    type="email"
                    value={profile.email}
                    onChange={(v) => setProfile({ ...profile, email: v })}
                  />
                  <InputField
                    label="Phone Number"
                    type="tel"
                    value={profile.phone}
                    onChange={(v) => setProfile({ ...profile, phone: v })}
                  />
                  <InputField
                    label="Tax ID / VAT Number"
                    value={profile.taxId}
                    onChange={(v) => setProfile({ ...profile, taxId: v })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Business Address
                  </label>
                  <textarea
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    rows="3"
                    className="w-full p-5 bg-slate-50 rounded-[24px] font-bold border-2 border-transparent focus:border-blue-600 outline-none transition-all resize-none"
                    placeholder="Physical location for logistics..."
                  />
                </div>
              </section>

              <section className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">Professional Bio</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      How buyers see you
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Brief Introduction
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    rows="4"
                    className="w-full p-5 bg-slate-50 rounded-[24px] font-bold border-2 border-transparent focus:border-blue-600 outline-none transition-all resize-none"
                    placeholder="Tell buyers about your reliability, experience, and scale..."
                  />
                </div>
              </section>
            </div>
          )}

          {/* Verification Section */}
          {activeSection === "verification" && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
              <section className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">Trust Builders</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      Boost your win rate with credibility
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField
                    label="Registration Number"
                    value={profile.regNumber}
                    onChange={(v) => setProfile({ ...profile, regNumber: v })}
                  />
                  <InputField
                    label="Years in Business"
                    type="number"
                    value={profile.yearsInBusiness}
                    onChange={(v) =>
                      setProfile({ ...profile, yearsInBusiness: v })
                    }
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Core Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Construction",
                      "Hardware",
                      "Electrical",
                      "Sanitary",
                      "Metal",
                      "Wood",
                    ].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          const cats = profile.categories.includes(cat)
                            ? profile.categories.filter((c) => c !== cat)
                            : [...profile.categories, cat];
                          setProfile({ ...profile, categories: cats });
                        }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all border-2 ${
                          profile.categories.includes(cat)
                            ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100"
                            : "bg-white text-slate-400 border-slate-100 hover:border-blue-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Document Verification
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileUploadCard label="Trade License / Registration" />
                    <FileUploadCard label="Tax Clearance Certificate" />
                    <FileUploadCard label="ISO / Industry Certifications" />
                    <FileUploadCard label="Portfolio (PDF/Images)" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
              <section className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">Change Password</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      Keep your account secure
                    </p>
                  </div>
                </div>

                <div className="space-y-6 max-w-md">
                  <InputField
                    label="Current Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  <InputField
                    label="New Password"
                    type="password"
                    placeholder="Min 8 characters"
                  />
                  <InputField
                    label="Confirm New Password"
                    type="password"
                    placeholder="Repeat new password"
                  />
                </div>
              </section>

              <section className="bg-red-50/30 p-8 md:p-12 rounded-[40px] border border-red-100 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                    <Trash2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-red-900">
                      Danger Zone
                    </h3>
                    <p className="text-xs text-red-400 font-bold uppercase tracking-widest mt-0.5">
                      This action is permanent
                    </p>
                  </div>
                </div>
                <p className="text-sm font-bold text-red-800 leading-relaxed max-w-xl">
                  Once you Logout your account, there is no going back. All your
                  bid history, won contracts, and communication will be
                  permanently removed.
                </p>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                >
                  Logout My Account
                </button>
              </section>
            </div>
          )}
        </div>

        {/* Sidebar Info & Save Button */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -mr-16 -mt-16 rounded-full"></div>

            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-white/10 rounded-3xl mx-auto flex items-center justify-center text-4xl font-black border border-white/10 shadow-inner">
                {profile.businessName[0]}
              </div>
              <div>
                <h4 className="text-xl font-black">{profile.businessName}</h4>
                <p className="text-xs font-black text-blue-400 uppercase tracking-widest mt-1">
                  Profile {activeSection === "verification" ? "85%" : "60%"}{" "}
                  Complete
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>Verification Status</span>
                <span className="text-emerald-400">Pending Docs</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: activeSection === "verification" ? "85%" : "60%",
                  }}
                ></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Save size={20} /> Save Changes
                </>
              )}
            </button>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">
              Helpful Tip
            </h5>
            <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
              "Suppliers with uploaded tax certifications and 3+ categories win
              bids 40% more often."
            </p>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10 text-center animate-in zoom-in duration-200">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Are you sure?
            </h3>
            <p className="text-slate-500 font-bold mt-3 leading-relaxed">
              {/* This will permanently */}
              This will logout your account and all associated data. This action
              cannot be undone.
            </p>
            <div className="mt-8 space-y-3">
              <button
                onClick={() => DoneDelite()}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-100"
              >
                {/* Yes, Delete Permanently */}
                Yes logout Now
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
