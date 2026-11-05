"use client";

import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "@/context/AuthContext";

interface Message {
  senderId: string;
  recipientId: string;
  content: string;
  timestamp?: string;
}

export default function ChatWidget() {
  const { id, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMsg, setInputMsg] = useState("");

  useEffect(() => {
    // Only connect to WebSockets if user is logged in
    if (!id) return;

    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        // Subscribe to private messages queue
        stompClient.subscribe(`/user/${id}/topic/messages`, (msg) => {
          if (msg.body) {
            setMessages((prev) => [...prev, JSON.parse(msg.body)]);
          }
        });
      },
      onStompError: (err) => console.error("STOMP error", err),
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [id]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !client || !client.connected) return;

    // Hardcoding a generic recipient for demo (e.g., parent talks to admin/driver)
    const recipient = role === "PARENT" ? "driver1" : "parent1";

    const chatMsg: Message = {
      senderId: id as string,
      recipientId: recipient,
      content: inputMsg,
    };

    client.publish({
      destination: "/app/chat",
      body: JSON.stringify(chatMsg),
    });

    setMessages((prev) => [...prev, chatMsg]);
    setInputMsg("");
  };

  if (!id) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-600/50 flex items-center justify-center hover:scale-110 transition-transform z-50 text-2xl"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col h-96">
          <div className="bg-slate-900 text-white p-4 font-bold flex justify-between items-center">
            <span>Support Chat</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3">
            {messages.length === 0 ? (
              <p className="text-slate-400 text-sm text-center mt-10">No messages yet. Send one to start!</p>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.senderId === id ? "items-end" : "items-start"}`}>
                  <span className="text-xs text-slate-500 mb-1">{msg.senderId}</span>
                  <div className={`px-4 py-2 rounded-xl text-sm ${msg.senderId === id ? "bg-blue-600 text-white rounded-br-sm" : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm"}`}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-slate-100 border-transparent rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-bold">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
