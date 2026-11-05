"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewVehiclePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Vehicle Registered Successfully!");
      router.push("/dashboard/admin/vehicles");
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Register New Vehicle</h2>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Vehicle Registration Number</label>
            <input type="text" placeholder="e.g. UP-16-AB-1234" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Vehicle Type</label>
            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="Car">Car</option>
              <option value="Van">School Van</option>
              <option value="Mini Bus">Mini Bus</option>
              <option value="Bus">Large Bus</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Seating Capacity</label>
            <input type="number" required min="1" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 mt-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
            {loading ? "Registering..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
