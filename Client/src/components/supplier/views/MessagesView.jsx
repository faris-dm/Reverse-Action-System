// src/components/supplier/views/MessagesView.jsx
import React from "react";
import { MessageSquare, ChevronLeft, Send } from "lucide-react";

export const MessagesView = ({
  conversations,
  activeId,
  setActiveId,
  newMessage,
  setNewMessage,
  onSend,
}) => {
  const activeChat = conversations.find((c) => c.id === activeId);

  return (
    <div className="h-[calc(100vh-14rem)] flex bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm max-w-7xl mx-auto">
      <div
        className={`w-full md:w-80 lg:w-96 flex flex-col border-r border-slate-100 ${
          activeId ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="p-8 font-black text-2xl border-b border-slate-50 flex items-center gap-3">
          <MessageSquare className="text-blue-600" size={24} /> Chats
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`w-full p-6 text-left border-b border-slate-50 transition-all ${
                activeId === c.id
                  ? "bg-blue-50/50 border-r-4 border-r-blue-600"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-black text-sm">{c.buyerName}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">
                  {c.lastUpdate}
                </span>
              </div>
              <p className="text-[10px] font-black text-blue-600 uppercase mb-1 truncate">
                {c.relatedTitle}
              </p>
              <p className="text-xs text-slate-400 truncate italic font-medium">
                "{c.lastMessage}"
              </p>
            </button>
          ))}
        </div>
      </div>
      <div
        className={`flex-1 flex flex-col bg-slate-50/20 ${
          !activeId ? "hidden md:flex" : "flex"
        }`}
      >
        {activeId ? (
          <>
            <div className="p-6 bg-white border-b flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveId(null)}
                  className="md:hidden p-2 bg-slate-100 rounded-xl"
                >
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h3 className="font-black">{activeChat.buyerName}</h3>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    {activeChat.relatedTitle}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {activeChat.messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-5 rounded-[24px] text-sm font-bold shadow-sm ${
                      m.sender === "me"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-slate-700 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={onSend}
              className="p-6 bg-white border-t flex gap-4 shrink-0"
            >
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Negotiate..."
                className="flex-1 bg-slate-50 p-5 rounded-[20px] outline-none font-bold text-sm"
              />
              <button
                type="submit"
                className="w-14 h-14 bg-slate-900 text-white rounded-[20px] flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-4">
            <MessageSquare size={48} className="opacity-20" />
            <span className="font-black text-xs uppercase tracking-[0.2em] opacity-50">
              Select dialogue
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
