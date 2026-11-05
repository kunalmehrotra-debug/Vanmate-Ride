"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function VehicleRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await fetchWithAuth("/bookings");
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests", error);
      // Demo Data Fallback
      setRequests([
        { requestid: 101, userid: "parent1", vehicletype: "Van", source: "Sector 62", destination: "DPS", timing: "07:30", noStudents: 1, status: "PENDING" },
        { requestid: 102, userid: "school1", vehicletype: "Mini Bus", source: "Sector 50", destination: "Amity", timing: "08:00", noStudents: 15, status: "PENDING" },
        { requestid: 103, userid: "parent2", vehicletype: "Car", source: "Sector 15", destination: "Somerville", timing: "07:45", noStudents: 2, status: "CONFIRMED" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (id: number) => {
    // Redirect to assignment page with request ID
    router.push(`/dashboard/admin/assign?requestid=${id}`);
  };

  if (loading) return <div className="p-8 text-slate-500">Loading requests...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-slate-900">Vehicle Requests</h2>
        <span className="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-xl text-sm">
          {requests.filter(r => r.status === 'PENDING').length} Pending
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium text-sm">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Vehicle</th>
                <th className="py-4 px-6">Route</th>
                <th className="py-4 px-6">Time</th>
                <th className="py-4 px-6">Students</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.requestid} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                  <td className="py-4 px-6 font-medium text-slate-900">#{req.requestid}</td>
                  <td className="py-4 px-6 text-slate-600">{req.userid}</td>
                  <td className="py-4 px-6 text-slate-600 font-medium">{req.vehicletype}</td>
                  <td className="py-4 px-6 text-slate-600">
                    <span className="block truncate max-w-[150px]" title={req.source}>{req.source}</span>
                    <span className="text-xs text-slate-400">to</span>
                    <span className="block truncate max-w-[150px]" title={req.destination}>{req.destination}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{req.timing}</td>
                  <td className="py-4 px-6 text-slate-600">{req.noStudents}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 
                      req.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {req.status === 'PENDING' && (
                      <button 
                        onClick={() => handleConfirm(req.requestid)}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition"
                      >
                        Confirm & Assign
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <div className="p-12 text-center text-slate-400">No vehicle requests found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
