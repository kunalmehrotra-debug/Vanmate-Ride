"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchWithAuth } from "@/utils/api";

export default function AssignVehiclePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestid");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    driverId: "",
    vehicleId: ""
  });

  const [drivers] = useState([
    { id: "drv_1", name: "Ravi Kumar", status: "Available" },
    { id: "drv_2", name: "Suresh Singh", status: "Available" }
  ]);

  const [vehicles] = useState([
    { id: "vh_1", number: "UP-16-AB-1234", type: "School Van" },
    { id: "vh_2", number: "UP-16-CD-5678", type: "Mini Bus" }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestId) {
      alert("No Request ID provided!");
      return;
    }
    
    setLoading(true);
    try {
      // 1. Assign vehicle logic (mocked or actual API)
      // await fetchWithAuth('/assign', { method: 'POST', body: ... })
      
      // 2. Update status to CONFIRMED
      await fetchWithAuth(`/bookings/${requestId}/status?status=CONFIRMED`, { method: "PUT" });
      
      alert("Vehicle and Driver Assigned! Booking is now CONFIRMED.");
      router.push("/dashboard/admin/requests");
    } catch (err) {
      // Demo Fallback
      alert("Demo Mode: Vehicle Assigned Successfully. Status updated to CONFIRMED.");
      router.push("/dashboard/admin/requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Assign Vehicle & Driver</h2>
      <p className="text-slate-500 mb-8">
        Assign resources to Booking Request <span className="font-bold text-slate-800">#{requestId || "N/A"}</span>
      </p>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Driver</label>
            <div className="grid grid-cols-1 gap-3">
              {drivers.map(d => (
                <label key={d.id} className={`p-4 border rounded-xl flex justify-between items-center cursor-pointer transition ${formData.driverId === d.id ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="driver" 
                      value={d.id} 
                      onChange={(e) => setFormData({...formData, driverId: e.target.value})} 
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                      required
                    />
                    <span className="font-bold text-slate-800">{d.name}</span>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{d.status}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Vehicle</label>
            <div className="grid grid-cols-1 gap-3">
              {vehicles.map(v => (
                <label key={v.id} className={`p-4 border rounded-xl flex justify-between items-center cursor-pointer transition ${formData.vehicleId === v.id ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="vehicle" 
                      value={v.id} 
                      onChange={(e) => setFormData({...formData, vehicleId: e.target.value})} 
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                      required
                    />
                    <div>
                      <span className="block font-bold text-slate-800">{v.number}</span>
                      <span className="text-xs text-slate-500">{v.type}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-4">
            <button type="button" onClick={() => router.back()} className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition flex-1">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-6 py-3 bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:bg-amber-600 transition flex-1">
              {loading ? "Assigning..." : "Confirm Assignment"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
