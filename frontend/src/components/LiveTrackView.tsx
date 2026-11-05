"use client";

import { useState, useEffect } from "react";

interface VehicleRoute {
  id: string;
  plate: string;
  name: string;
  driver: string;
  phone: string;
  rating: string;
  speed: number;
  eta: string;
  distanceLeft: string;
  passengers: string;
  stops: { name: string; time: string; status: "DEPARTED" | "CURRENT" | "UPCOMING" }[];
}

export default function LiveTrackView({ role }: { role: "PARENT" | "SCHOOL" }) {
  const vehicles: VehicleRoute[] = [
    {
      id: "v12",
      plate: "UP-16-AB-1234",
      name: "Van #12 • Toyota Commuter",
      driver: "Rajesh Kumar",
      phone: "+91 98765 43210",
      rating: "4.9",
      speed: 42,
      eta: "7 mins",
      distanceLeft: "2.4 km",
      passengers: role === "SCHOOL" ? "11 / 12 Students" : "Aarav Sharma (Seat 4B)",
      stops: [
        { name: "Sector 62 Residential Block", time: "07:30 AM", status: "DEPARTED" },
        { name: "Sector 50 Metro Crossing", time: "07:48 AM", status: "DEPARTED" },
        { name: "Sector 24 Main Avenue", time: "08:04 AM", status: "CURRENT" },
        { name: "Delhi Public School (Gate 1)", time: "08:15 AM", status: "UPCOMING" },
      ],
    },
    {
      id: "v08",
      plate: "UP-16-CD-5678",
      name: "Van #08 • Force Traveler",
      driver: "Suresh Singh",
      phone: "+91 98111 22334",
      rating: "4.8",
      speed: 36,
      eta: "12 mins",
      distanceLeft: "4.1 km",
      passengers: role === "SCHOOL" ? "18 / 20 Students" : "Afternoon Drop Route",
      stops: [
        { name: "Sector 12 Central Park", time: "07:25 AM", status: "DEPARTED" },
        { name: "City Center Underpass", time: "07:45 AM", status: "CURRENT" },
        { name: "Sector 18 Market Link", time: "08:02 AM", status: "UPCOMING" },
        { name: "Delhi Public School (Gate 2)", time: "08:15 AM", status: "UPCOMING" },
      ],
    },
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [progress, setProgress] = useState(0.58);
  const [alertSent, setAlertSent] = useState(false);

  const activeVehicle = vehicles[selectedIdx];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 0.92 ? 0.18 : p + 0.004));
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const waypoints = [
    { x: 60, y: 240, label: "Sec 62" },
    { x: 210, y: 165, label: "Sec 50" },
    { x: 390, y: 195, label: "Sec 24" },
    { x: 560, y: 75, label: "DPS Campus" },
  ];

  const getMarkerPos = () => {
    const segs = waypoints.length - 1;
    const total = progress * segs;
    const idx = Math.min(Math.floor(total), segs - 1);
    const t = total - idx;
    const a = waypoints[idx];
    const b = waypoints[idx + 1];
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
    };
  };

  const pos = getMarkerPos();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e0e3e5" }}>
      <style>{`
        @keyframes stitchPulse {
          0% { transform: scale(0.7); opacity: 0.9; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes stitchDash {
          to { stroke-dashoffset: -28; }
        }
        .stitch-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stitch-track-layout {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 22px;
        }
        .stitch-telemetry-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 22px;
        }
        @media (max-width: 1080px) {
          .stitch-track-layout { grid-template-columns: 1fr; }
          .stitch-telemetry-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .stitch-telemetry-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Vehicle Selector Pills */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {vehicles.map((v, i) => {
            const active = i === selectedIdx;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedIdx(i)}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: active ? "1.5px solid #ffb95f" : "1px solid rgba(255,255,255,0.14)",
                  background: active ? "rgba(238,152,0,0.18)" : "rgba(255,255,255,0.04)",
                  color: active ? "#ffb95f" : "#c6c6cd",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: active ? "0 0 24px rgba(238,152,0,0.2)" : "none",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>directions_bus</span>
                <span>{v.plate}</span>
                <span style={{ fontSize: 11, opacity: 0.75 }}>({v.name.split("•")[0].trim()})</span>
              </button>
            );
          })}
        </div>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "7px 14px", borderRadius: 999,
          background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)",
          color: "#4ade80", fontSize: 12, fontWeight: 700,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
          GPS Telemetry Live • 5G Connected
        </div>
      </div>

      {/* Telemetry Quick Metrics */}
      <div className="stitch-telemetry-row">
        {[
          { label: "Current Speed", value: `${activeVehicle.speed} km/h`, sub: "Within Safe Limit (50 km/h)", icon: "speed", color: "#ffb95f" },
          { label: "Estimated Arrival", value: activeVehicle.eta, sub: `${activeVehicle.distanceLeft} remaining`, icon: "schedule", color: "#4ade80" },
          { label: "Passenger Manifest", value: activeVehicle.passengers, sub: "RFID Check-in Verified", icon: "verified_user", color: "#7bd0ff" },
          { label: "Assigned Driver", value: activeVehicle.driver, sub: `Rating ★ ${activeVehicle.rating}`, icon: "person_pin", color: "#bec6e0" },
        ].map((m) => (
          <div key={m.label} className="stitch-glass" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#909097", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {m.label}
              </span>
              <span className="material-symbols-outlined" style={{ color: m.color, fontSize: 20 }}>{m.icon}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#e0e3e5", marginBottom: 3 }}>{m.value}</div>
            <div style={{ fontSize: 11.5, color: "#c6c6cd" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Map + Checkpoint Sidebar */}
      <div className="stitch-track-layout">
        {/* Interactive Map Container */}
        <div className="stitch-glass" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#e0e3e5" }}>{activeVehicle.name}</h3>
              <p style={{ fontSize: 12.5, color: "#909097" }}>Live Route Corridor • Noida Sector 62 → DPS Campus</p>
            </div>
            <button
              onClick={() => setProgress(0.58)}
              style={{
                padding: "7px 14px", borderRadius: 10,
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)",
                color: "#e0e3e5", fontSize: 12, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6, fontFamily: "'Inter', sans-serif",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#ffb95f" }}>my_location</span>
              Re-center Vehicle
            </button>
          </div>

          <div style={{
            position: "relative", height: 340, borderRadius: 14,
            background: "#0b0f10", border: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden",
          }}>
            <svg viewBox="0 0 640 320" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="stitchMapGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
                <radialGradient id="amberHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,185,95,0.35)" />
                  <stop offset="100%" stopColor="rgba(255,185,95,0)" />
                </radialGradient>
              </defs>

              <rect width="640" height="320" fill="url(#stitchMapGrid)" />

              {/* City Arterial Roads */}
              <path d="M 0 110 L 640 110 M 0 220 L 640 220 M 160 0 L 160 320 M 360 0 L 360 320 M 510 0 L 510 320" stroke="rgba(255,255,255,0.04)" strokeWidth="10" fill="none" />
              <path d="M 20 290 Q 200 180 420 210 T 620 40" stroke="rgba(123,208,255,0.05)" strokeWidth="18" fill="none" />

              {/* Active Route Polyline Glow */}
              <polyline
                points="60,240 210,165 390,195 560,75"
                fill="none"
                stroke="rgba(238,152,0,0.22)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Animated Dashed Route */}
              <polyline
                points="60,240 210,165 390,195 560,75"
                fill="none"
                stroke="#ffb95f"
                strokeWidth="3.5"
                strokeDasharray="8,6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: "stitchDash 18s linear infinite" }}
              />

              {/* Waypoint Nodes */}
              {waypoints.map((wp, idx) => (
                <g key={wp.label}>
                  <circle
                    cx={wp.x}
                    cy={wp.y}
                    r="11"
                    fill="#101415"
                    stroke={idx === waypoints.length - 1 ? "#4ade80" : "#7bd0ff"}
                    strokeWidth="3"
                  />
                  <text
                    x={wp.x}
                    y={wp.y + 26}
                    textAnchor="middle"
                    fill="#c6c6cd"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="Inter, sans-serif"
                  >
                    {wp.label}
                  </text>
                </g>
              ))}

              {/* Moving Vehicle Marker */}
              <circle cx={pos.x} cy={pos.y} r="32" fill="url(#amberHalo)" />
              <circle cx={pos.x} cy={pos.y} r="14" fill="#ee9800" stroke="#101415" strokeWidth="3" />
              <circle cx={pos.x} cy={pos.y} r="5" fill="#101415" />
            </svg>

            {/* Bottom Floating Telemetry Pill */}
            <div style={{
              position: "absolute", bottom: 14, left: 14, right: 14,
              background: "rgba(16, 20, 21, 0.88)", backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12,
              padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="material-symbols-outlined" style={{ color: "#ffb95f", fontSize: 22 }}>navigation</span>
                <div>
                  <div style={{ fontSize: 11, color: "#909097", fontWeight: 700, textTransform: "uppercase" }}>Next Waypoint</div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#e0e3e5" }}>Delhi Public School (Gate 1) • {activeVehicle.eta}</div>
                </div>
              </div>
              <a
                href={`tel:${activeVehicle.phone}`}
                style={{
                  padding: "8px 14px", borderRadius: 999,
                  background: "rgba(123,208,255,0.14)", border: "1px solid rgba(123,208,255,0.3)",
                  color: "#7bd0ff", fontSize: 12, fontWeight: 700, textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 15 }}>call</span>
                Call Driver
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Checkpoint Timeline + Handoff Security */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="stitch-glass" style={{ padding: "22px" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#e0e3e5", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: "#ffb95f", fontSize: 20 }}>route</span>
              Live Stop Progression
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 18, position: "relative", paddingLeft: 12 }}>
              {activeVehicle.stops.map((s, idx) => {
                const color =
                  s.status === "DEPARTED" ? "#4ade80" : s.status === "CURRENT" ? "#ffb95f" : "#909097";
                return (
                  <div key={s.name} style={{ display: "flex", alignItems: "flex-start", gap: 14, position: "relative" }}>
                    <div style={{
                      width: 14, height: 14, borderRadius: "50%", marginTop: 3,
                      background: s.status === "UPCOMING" ? "#191c1e" : color,
                      border: `2.5px solid ${color}`,
                      boxShadow: s.status === "CURRENT" ? "0 0 12px #ffb95f" : "none",
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: s.status === "UPCOMING" ? "#909097" : "#e0e3e5" }}>
                          {s.name}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 700, color }}>{s.time}</span>
                      </div>
                      <span style={{
                        display: "inline-block", marginTop: 3,
                        fontSize: 10.5, fontWeight: 700, letterSpacing: "0.05em",
                        color, textTransform: "uppercase",
                      }}>
                        {s.status === "CURRENT" ? "● Vehicle Approaching" : s.status}
                      </span>
                    </div>
                    {idx < activeVehicle.stops.length - 1 && (
                      <div style={{
                        position: "absolute", left: 6, top: 20, bottom: -16,
                        width: 2, background: "rgba(255,255,255,0.08)",
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Secure Handoff & Emergency Trigger */}
          <div className="stitch-glass" style={{ padding: "22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: "rgba(238,152,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#ffb95f",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>shield_person</span>
              </div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: "#e0e3e5" }}>Secure Handoff Protocol</h4>
                <p style={{ fontSize: 12, color: "#c6c6cd" }}>Biometric & QR boarding verification active</p>
              </div>
            </div>

            {alertSent ? (
              <div style={{
                padding: "12px 14px", borderRadius: 12,
                background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)",
                color: "#4ade80", fontSize: 12.5, fontWeight: 700,
              }}>
                ✓ Priority ping sent to Driver ({activeVehicle.driver}) & Transport Desk.
              </div>
            ) : (
              <button
                onClick={() => setAlertSent(true)}
                style={{
                  width: "100%", padding: "12px", borderRadius: 12,
                  background: "rgba(255,180,171,0.12)", border: "1px solid rgba(255,180,171,0.3)",
                  color: "#ffb4ab", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>notifications_active</span>
                Notify Driver of Pickup Delay / Hold
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
