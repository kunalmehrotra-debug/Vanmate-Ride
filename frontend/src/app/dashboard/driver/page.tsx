"use client";

import { useState, useEffect } from "react";

export default function DriverDashboard() {
  const [mounted, setMounted] = useState(false);
  const [onDuty, setOnDuty] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const routeTimeline = [
    { location: "Sector 62, Noida", description: "Pickup 4 students (Aarav, Diya, Arjun, Kabir)", time: "07:30 AM", status: "Completed", color: "#10b981", icon: "check_circle" },
    { location: "Sector 50, Noida", description: "Pickup 2 students (Priya, Sonia)", time: "07:50 AM", status: "Completed", color: "#10b981", icon: "check_circle" },
    { location: "Delhi Public School (DPS)", description: "Drop off all students & inspect vehicle", time: "08:15 AM", status: "Arrived", color: "#4fc3f7", icon: "school" },
    { location: "Sector 24 Hub", description: "Return vehicle for midday charging/refueling", time: "09:00 AM", status: "Scheduled", color: "#f5a623", icon: "schedule" }
  ];

  const messages = [
    { sender: "Parent (Aarav's Mother)", msg: "Aarav is running 5 minutes late today, please wait if possible!", time: "Today, 7:22 AM", type: "P", color: "#f5a623", icon: "chat" },
    { sender: "Admin (DPS Transport)", msg: "Route changed slightly due to waterlogging in Sector 52. Use Sector 51 bypass.", time: "Today, 7:05 AM", type: "A", color: "#ef4444", icon: "warning" }
  ];

  if (!mounted) return null;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#ffffff" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .glass-card-premium {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card-premium:hover {
          transform: translateY(-4px);
          border-color: rgba(245,166,35,0.2);
          box-shadow: 0 16px 36px rgba(0,0,0,0.4);
        }
        .driver-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; margin-top: 24px; }
        @media (max-width: 1024px) { .driver-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Driver Profile & Status */}
      <div 
        className="glass-card-premium"
        style={{
          background: "linear-gradient(135deg, #101622 0%, #080c14 100%)",
          border: "1px solid rgba(79,195,247,0.18)",
          padding: "28px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          animation: "fadeUp 0.5s ease forwards",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "absolute", top: -80, right: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,195,247,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative", zIndex: 1 }}>
          <div style={{
            width: 68, height: 68, borderRadius: "50%",
            background: "linear-gradient(135deg, #4fc3f7, #0288d1)",
            display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center",
            fontSize: 32, boxShadow: "0 0 20px rgba(79,195,247,0.3)"
          }}>
            👨‍✈️
          </div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 4 }}>Welcome, Ravi Kumar!</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Assigned Vehicle: <span style={{ fontFamily: "monospace", color: "#f5a623", fontWeight: 700 }}>UP-16-AB-1234</span> (Toyota Commuter)</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 3 }}>Duty Status</span>
            <span style={{
              fontSize: 11.5, fontWeight: 700,
              color: onDuty ? "#10b981" : "#ef4444",
              background: onDuty ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
              border: onDuty ? "1px solid rgba(16,185,129,0.22)" : "1px solid rgba(239,68,68,0.22)",
              padding: "5px 12px", borderRadius: 20
            }}>
              {onDuty ? "ON DUTY" : "OFF DUTY"}
            </span>
          </div>
          <button 
            onClick={() => setOnDuty(!onDuty)}
            style={{
              padding: "10px 16px", borderRadius: 12,
              background: onDuty ? "rgba(239,68,68,0.12)" : "rgba(16,185,129,0.12)",
              border: onDuty ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(16,185,129,0.25)",
              color: onDuty ? "#ef4444" : "#10b981",
              fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif"
            }}
          >
            Toggle
          </button>
        </div>
      </div>

      <div className="driver-grid">
        {/* Today's Route Timeline */}
        <div className="glass-card-premium" style={{ padding: "26px", animation: "fadeUp 0.5s ease 0.15s forwards", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: "#4fc3f7", fontSize: 20, fontVariationSettings: "'FILL' 1" }}>map</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.2px" }}>Assigned Trip Route</h3>
            </div>
            <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>DPS Sector-24 Morning Shift</span>
          </div>

          <div style={{ position: "relative", marginLeft: 16, paddingLeft: 24, borderLeft: "2px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 24 }}>
            {routeTimeline.map((item, index) => (
              <div key={index} style={{ position: "relative" }}>
                {/* Custom timeline dot */}
                <div style={{
                  position: "absolute", left: -34, top: 2,
                  width: 18, height: 18, borderRadius: "50%",
                  background: "#080c14", border: `2.5px solid ${item.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 10px ${item.color}30`
                }} />
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", marginBottom: 4 }}>{item.location}</h4>
                    <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>{item.description}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: item.color }}>{item.time}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & Alert Log */}
        <div className="glass-card-premium" style={{ padding: "26px", animation: "fadeUp 0.5s ease 0.25s forwards", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span className="material-symbols-outlined" style={{ color: "#f5a623", fontSize: 20, fontVariationSettings: "'FILL' 1" }}>chat</span>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.2px" }}>Dispatch & Passenger Alerts</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {messages.map((m, i) => (
              <div 
                key={i}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1.5px solid rgba(255,255,255,0.04)`,
                  borderRadius: 14,
                  padding: "16px",
                  display: "flex",
                  gap: 14,
                  position: "relative"
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: `${m.color}12`, border: `1.5px solid ${m.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0
                }}>
                  <span className="material-symbols-outlined" style={{ color: m.color, fontSize: 18 }}>{m.icon}</span>
                </div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", marginBottom: 3 }}>{m.sender}</h4>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{m.msg}</p>
                  <span style={{ display: "block", fontSize: 10.5, color: "rgba(255,255,255,0.25)", marginTop: 6 }}>{m.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
