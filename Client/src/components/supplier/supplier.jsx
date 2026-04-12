// src/components/supplier/Supplier.jsx
import React, { useEffect, useState } from "react";
import { Sidebar } from "./layouts/Sidebar";

// Import views
import { OverviewView } from "./views/OverviewView";
import { MarketplaceView } from "./views/MarketplaceView";
import { MyBidsView } from "./views/MyBidsView";
import { MessagesView } from "./views/MessagesView";
import { ReportsView } from "./views/ReportsView";
import { SettingsView } from "./views/SettingsView";
import { Header } from "./layouts/Header";

// Import modals
import { BidModal } from "./modals/BidModal";
import { Phone } from "lucide-react";

const Supplier = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  // --- Profile State ---
  // const [profile, setProfile] = useState({
  //   businessName: "Ethio Build Ltd.",
  //   email: "contact@ethiobuild.com",
  //   phone: "+251 911 223 344",
  //   address: "Bole Road, Addis Ababa",
  //   taxId: "TIN-882910",
  //   regNumber: "EB-2024-AA",
  //   yearsInBusiness: "8",
  //   categories: ["Construction", "Hardware"],
  //   bio: "Leading supplier of premium building materials in East Africa.",
  //   notifications: {
  //     newRequests: true,
  //     outbid: true,
  //     messages: true,
  //     wins: true,
  //     weeklySummary: false,
  //   },
  // });

  const [profile,setProfile]=useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(()=> {
    fetch("http://localhost:21000/api/me", { credentials: "include" })
      .then((res) => {
        if (res.status === 401 ) {
          throw new Error("Pleases Prove  your info pleases");
        }
        if (!res.ok) {
          throw new Error("Error to dipalay user information");
        }
        return res.json();
      })

      .then((data) => {
        setProfile({
          businessName: data.businessName || "Ethio Build Ltd.",
          email: data.email || "contact@ethiobuild.com",
          phone: data.phone || "0979716502",
          address: data.address || "Bole Road, Addis Ababa",
          taxId: data.taxId || "TIN-882910",
          regNumber: data.regNumber || "EB-2024-AA",
          yearsInBusiness: data.yearsInBusiness || "8",
          categories: data.categories || ["Construction", "Hardware"],
          bio:
            data.bio ||
            "Leading supplier of premium building materials in East Africa.",
          notifications: {
            newRequests: true,
            outbid: true,
            messages: true,
            wins: true,
            weeklySummary: false,
          },
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error.message);
        setLoading(false);
        console.log("Unable to fetch the data");
        alert(error.message);
        window.location.href = "/supplerform";
      });
  },[])





   // --- Show Loading Screen ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-600">Loading profile...</div>
          <div className="text-sm text-slate-400 mt-2">Please wait</div>
        </div>
      </div>
    );
  }

  // --- Show Error Screen ---
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">Error</div>
          <div className="text-sm text-slate-600 mt-2">{error}</div>
          <button 
            onClick={() => window.location.href = "/login"}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // --- If no profile after loading (should not happen) ---
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">No profile data available</div>
      </div>
    );
  }
  // --- Data State ---
  const [allRequests] = useState([
    {
      id: "req_1",
      title: "Grade 42.5 OPC Cement",
      category: "Construction",
      qty: "500 Bags",
      maxBudget: 450000,
      deadline: "2024-06-25",
      description:
        "High-quality OPC cement needed for a commercial foundation project.",
      buyerName: "Skyline Developers",
      currentLow: 435000,
    },
    {
      id: "req_2",
      title: "Reinforcement Bars 12mm",
      category: "Metal",
      qty: "15 Tons",
      maxBudget: 890000,
      deadline: "2024-06-22",
      description: "Standard 12mm rebar for residential slab reinforcement.",
      buyerName: "MetalWorks Co.",
      currentLow: 870000,
    },
    {
      id: "req_3",
      title: "River Sand (Washed)",
      category: "Aggregates",
      qty: "20 Trucks",
      maxBudget: 120000,
      deadline: "2024-06-30",
      description: "Fine washed river sand for plastering work.",
      buyerName: "Urban Pavements",
      currentLow: 115000,
    },
  ]);

  const [myBids, setMyBids] = useState([
    {
      id: "bid_101",
      requestId: "req_1",
      requestTitle: "Grade 42.5 OPC Cement",
      amount: 435000,
      status: "Winning",
      category: "Construction",
      date: "2024-06-18",
    },
  ]);

  const [conversations, setConversations] = useState([
    {
      id: "c1",
      buyerName: "Skyline Developers",
      relatedTitle: "Grade 42.5 OPC Cement",
      lastMessage: "Can you deliver by Monday?",
      lastUpdate: "2h ago",
      messages: [
        { id: 1, text: "Hello, regarding the cement request...", sender: "me" },
        { id: 2, text: "Can you deliver by Monday?", sender: "them" },
      ],
    },
  ]);

  const [activityLog] = useState([
    {
      id: 1,
      date: "2024-06-18 14:30",
      type: "Placed Bid",
      details: "Grade 42.5 OPC Cement",
      amount: "435,000 ETB",
      status: "Winning",
      category: "Bids",
    },
    {
      id: 2,
      date: "2024-06-17 09:15",
      type: "Won Contract",
      details: "Hand Tools Bulk Supply",
      amount: "85,000 ETB",
      status: "Completed",
      category: "Contracts",
    },
    {
      id: 3,
      date: "2024-06-16 11:00",
      type: "Sent Message",
      details: "To: Skyline Developers re: Cement",
      amount: "-",
      status: "Sent",
      category: "Messages",
    },
    {
      id: 4,
      date: "2024-06-15 16:45",
      type: "Placed Bid",
      details: "12mm Reinforcement Bars",
      amount: "880,000 ETB",
      status: "Outbid",
      category: "Bids",
    },
  ]);

  // --- UI Interactions ---
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleBidSubmit = (newBid) => {
    setMyBids([newBid, ...myBids]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversationId) return;

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            lastMessage: newMessage,
            messages: [
              ...conv.messages,
              { id: Date.now(), text: newMessage, sender: "me" },
            ],
          };
        }
        return conv;
      })
    );
    setNewMessage("");
  };

  const handleBidClick = (request) => {
    setSelectedRequest(request);
    setShowBidModal(true);
  };

  const handleMessageClick = () => {
    setActiveConversationId("c1");
    setActiveTab("Messages");
  };

  const handleUpdateBid = (bid) => {
    setSelectedRequest({ ...bid, title: bid.requestTitle });
    setShowBidModal(true);
  };

  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-sans text-slate-900 overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header
          businessName={profile.businessName}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-10 pb-24">
          {activeTab === "Overview" && (
            <OverviewView bids={myBids} onNavigate={setActiveTab} />
          )}
          {activeTab === "Marketplace" && (
            <MarketplaceView
              requests={allRequests}
              onBid={handleBidClick}
              onMessage={handleMessageClick}
            />
          )}
          {activeTab === "My Bids" && (
            <MyBidsView bids={myBids} onUpdate={handleUpdateBid} />
          )}
          {activeTab === "Messages" && (
            <MessagesView
              conversations={conversations}
              activeId={activeConversationId}
              setActiveId={setActiveConversationId}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              onSend={handleSendMessage}
            />
          )}
          {activeTab === "Reports" && <ReportsView log={activityLog} />}
          {activeTab === "Settings" && (
            <SettingsView profile={profile} setProfile={setProfile} />
          )}
        </main>
      </div>

      <BidModal
        isOpen={showBidModal}
        onClose={() => setShowBidModal(false)}
        selectedRequest={selectedRequest}
        onSubmit={handleBidSubmit}
      />
    </div>
  );
};

export default Supplier;
