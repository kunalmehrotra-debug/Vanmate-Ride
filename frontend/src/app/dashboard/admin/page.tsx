"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function AdminDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition">
          <span className="text-slate-500 font-medium">Total Vehicles</span>
          <span className="text-4xl font-bold text-slate-800 mt-2">124</span>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition">
          <span className="text-slate-500 font-medium">Active Drivers</span>
          <span className="text-4xl font-bold text-slate-800 mt-2">87</span>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition">
          <span className="text-slate-500 font-medium">Pending Bookings</span>
          <span className="text-4xl font-bold text-amber-500 mt-2">12</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">🚌</div>
            <div>
              <h4 className="font-semibold text-slate-800">Vehicle Assigned</h4>
              <p className="text-sm text-slate-500">Van UP-16-AB-1234 assigned to Driver Ravi.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">📝</div>
            <div>
              <h4 className="font-semibold text-slate-800">New Booking Request</h4>
              <p className="text-sm text-slate-500">Parent Kunal requested an E-Rickshaw.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
