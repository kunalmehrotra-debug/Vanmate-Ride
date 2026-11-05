"use client";

import { useState } from "react";

export default function NoticeManagement() {
  const [notices, setNotices] = useState([
    { id: 1, title: "Diwali Holidays", date: "2026-10-15", content: "Transport services will be halted from Oct 20 to Oct 24." },
    { id: 2, type: "Fee Reminder", date: "2026-06-01", content: "Please clear your transport dues by 5th June." }
  ]);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-slate-900">Manage Notices</h2>
        <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition">
          + Publish New Notice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map(notice => (
          <div key={notice.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-800">{notice.title || notice.type}</h3>
              <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{notice.date}</span>
            </div>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">{notice.content}</p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-xs font-bold text-blue-600 hover:text-blue-800">Edit</button>
              <button className="text-xs font-bold text-red-600 hover:text-red-800 ml-4">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
