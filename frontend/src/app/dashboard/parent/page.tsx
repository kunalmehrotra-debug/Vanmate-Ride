"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";

export default function ParentDashboard() {
  const { role } = useAuth();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roleLower = role?.toLowerCase() || "parent";

  // Simulated live tracking animation variables
  const [vanProgress, setVanProgress] = useState(0.35);

  useEffect(() => {
    setMounted(true);
    // Animate van position slightly on the mock map
    const interval = setInterval(() => {
      setVanProgress((prev) => {
        const next = prev + 0.002;
        return next > 0.95 ? 0.1 : next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Animated background canvas for the welcome banner
  useEffect(() => {
    if (!mounted) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => {
      cvs.width = cvs.offsetWidth * 2;
      cvs.height = cvs.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    let t = 0;
    const draw = () => {
      const w = cvs.offsetWidth, h = cvs.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const spacing = 28;
      for (let x = 0; x < w; x += spacing) {
        for (let y = 0; y < h; y += spacing) {
          const dist = Math.sqrt((x - w * 0.85) ** 2 + (y - h * 0.3) ** 2);
          const pulse = Math.sin(t * 0.015 - dist * 0.008) * 0.5 + 0.5;
          const opacity = Math.max(0, 0.1 * pulse - dist * 0.0003);
          ctx.beginPath();
          ctx.arc(x, y, 1.0 + pulse * 1.0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245,166,35,${opacity})`;
          ctx.fill();
        }
      }
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const timeStr = today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const stats = [
    { 
      label: "Active Bookings", 
      value: "3", 
      icon: "event_available", 
      color: "#10b981", 
      bg: "rgba(16,185,129,0.06)", 
      border: "rgba(16,185,129,0.18)",
      sparkline: "M 0 30 Q 15 10 30 25 T 60 5 T 90 20 T 120 15"
    },
    { 
      label: "Total Rides Completed", 
      value: "47", 
      icon: "route", 
      color: "#4fc3f7", 
      bg: "rgba(79,195,247,0.06)", 
      border: "rgba(79,195,247,0.18)",
      sparkline: "M 0 25 Q 15 28 30 15 T 60 10 T 90 5 T 120 2"
    },
    { 
      label: "Pending Requests", 
      value: "2", 
      icon: "pending", 
      color: "#f5a623", 
      bg: "rgba(245,166,35,0.06)", 
      border: "rgba(245,166,35,0.18)",
      sparkline: "M 0 35 Q 15 20 30 30 T 60 15 T 90 25 T 120 20"
    },
    { 
      label: "Messages Received", 
      value: "5", 
      icon: "mail", 
      color: "#a78bfa", 
      bg: "rgba(167,139,250,0.06)", 
      border: "rgba(167,139,250,0.18)",
      sparkline: "M 0 30 Q 15 25 30 35 T 60 10 T 90 20 T 120 8"
    },
  ];

  const quickActions = [
    { title: "Book a Vehicle", desc: "Schedule a secure ride for your child with verified drivers and premium vehicles.", icon: "directions_bus", color: "#f5a623", grad: "linear-gradient(135deg, rgba(245,166,35,0.12), rgba(245,166,35,0.02))", href: `/dashboard/${roleLower}/book` },
    { title: "Live Tracking", desc: "Monitor your child's journey in real-time with continuous speed & ETA updates.", icon: "location_on", color: "#10b981", grad: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.02))", href: `/dashboard/${roleLower}/track` },
    { title: "Inbox & Messages", desc: "Instantly chat with school coordinators, dispatch teams, and active drivers.", icon: "send", color: "#4fc3f7", grad: "linear-gradient(135deg, rgba(79,195,247,0.12), rgba(79,195,247,0.02))", href: `/dashboard/${roleLower}/messages/inbox` },
  ];

  const activity = [
    { title: "Morning school pickup", subtitle: "Delhi Public School Route", vehicle: "Toyota Commuter (Van #12)", driver: "Rajesh Kumar", status: "Arrived", time: "Today, 8:15 AM", color: "#10b981", icon: "check_circle" },
    { title: "Afternoon home drop-off", subtitle: "Standard Daily Return Route", vehicle: "Tata Winger (Van #04)", driver: "Sanjay Singh", status: "Scheduled", time: "Today, 2:30 PM", color: "#f5a623", icon: "schedule" },
    { title: "Morning school pickup", subtitle: "Delhi Public School Route", vehicle: "Toyota Commuter (Van #12)", driver: "Rajesh Kumar", status: "Completed", time: "Yesterday, 8:14 AM", color: "#10b981", icon: "check_circle" },
    { title: "Field trip to Science City", subtitle: "Special Event Booking", vehicle: "Force Traveler (Bus #15)", driver: "Amit Sharma", status: "Approved", time: "Jul 10, 9:00 AM", color: "#a78bfa", icon: "task_alt" },
  ];

  // Coordinates for the simulated van path
  const pathPoints = [
    { x: 30, y: 150 },
    { x: 90, y: 110 },
    { x: 150, y: 130 },
    { x: 210, y: 70 },
    { x: 280, y: 90 },
    { x: 340, y: 40 }
  ];

  // Calculate current van coordinate on mock map based on progress state
  const getVanCoords = () => {
    const segmentCount = pathPoints.length - 1;
    const totalProg = vanProgress * segmentCount;
    const index = Math.min(Math.floor(totalProg), segmentCount - 1);
    const segmentProg = totalProg - index;
    const p1 = pathPoints[index];
    const p2 = pathPoints[index + 1];
    return {
      x: p1.x + (p2.x - p1.x) * segmentProg,
      y: p1.y + (p2.y - p1.y) * segmentProg
    };
  };

  const vanPos = getVanCoords();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#ffffff" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-light { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        @keyframes ping-glow { 0% { transform: scale(0.6); opacity: 1; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes flow-line { to { stroke-dashoffset: -20; } }
        .grid-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 26px; }
        .grid-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-bottom: 26px; }
        .grid-visuals { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; margin-bottom: 26px; }
        @media (max-width: 1100px) { .grid-visuals { grid-template-columns: 1fr; } }
        @media (max-width: 900px) { .grid-stats { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .grid-stats { grid-template-columns: 1fr; } .grid-actions { grid-template-columns: 1fr; } }
        .glass-card-premium {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          backdrop-filter: blur(20px);
          WebkitBackdropFilter: blur(20px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card-premium:hover {
          transform: translateY(-4px);
          border-color: rgba(245,166,35,0.2);
          box-shadow: 0 16px 36px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,166,35,0.05) inset;
        }
        .hover-arrow { transition: transform 0.3s ease; }
        .glass-card-premium:hover .hover-arrow { transform: translateX(5px); }
      `}</style>

      {/* ── WELCOME BANNER ─────────────────────────────────────────────── */}
      <div style={{
        position: "relative", borderRadius: 24, overflow: "hidden",
        background: "linear-gradient(135deg, #160e02 0%, #0a0e17 50%, #06111e 100%)",
        border: "1px solid rgba(245,166,35,0.18)",
        padding: "36px 32px", marginBottom: 26,
        animation: "fadeUp 0.5s ease forwards",
      }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />
        
        {/* Soft background light spots */}
        <div style={{ position: "absolute", top: -80, right: -40, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: "20%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,195,247,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 20, background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.2)", marginBottom: 14 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 13, color: "#f5a623", fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#f5a623", letterSpacing: "0.08em", textTransform: "uppercase" }}>Parent Portal Active</span>
          </div>
          
          <h2 style={{ fontSize: "clamp(24px, 4.5vw, 32px)", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.8px", marginBottom: 8, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Welcome back! 👋
          </h2>
          
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 500 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#f5a623" }}>calendar_today</span>
              {dateStr}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 500 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#4fc3f7" }}>schedule</span>
              {timeStr}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 500 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#10b981" }}>location_on</span>
              DPS Sector-24 School Route
            </div>
          </div>
        </div>

        {/* Live system status badge */}
        <div style={{
          position: "absolute", top: 24, right: 28, zIndex: 1,
          display: "flex", alignItems: "center", gap: 8,
          padding: "7px 15px", borderRadius: 999,
          background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)",
        }}>
          <div style={{ position: "relative", width: 8, height: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "#10b981", animation: "ping-glow 1.5s infinite" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#34d399", letterSpacing: "0.02em" }}>Active Connection</span>
        </div>
      </div>

      {/* ── STATS CARDS ────────────────────────────────────────────────── */}
      <div className="grid-stats">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="glass-card-premium"
            style={{
              padding: "24px 20px",
              position: "relative",
              overflow: "hidden",
              animation: `fadeUp 0.5s ease ${0.05 * (i + 1)}s forwards`,
              opacity: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: s.bg, border: `1.5px solid ${s.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span className="material-symbols-outlined" style={{ color: s.color, fontSize: 22, fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
              </div>
              
              {/* Sparkline curve */}
              <svg width="60" height="24" style={{ opacity: 0.7 }}>
                <path d={s.sparkline} fill="none" stroke={s.color} strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            
            <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", letterSpacing: "-1px", marginBottom: 3 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
              {s.label}
            </div>

            {/* Glowing corner overlay */}
            <div style={{
              position: "absolute", bottom: -20, right: -20,
              width: 70, height: 70, borderRadius: "50%",
              background: s.color, opacity: 0.04, filter: "blur(20px)",
              pointerEvents: "none"
            }} />
          </div>
        ))}
      </div>

      {/* ── VISUAL MONITORING SECTION (MAP + DATA) ────────────────────── */}
      <div className="grid-visuals">
        
        {/* Mock Live GPS Tracking Map Card */}
        <div className="glass-card-premium" style={{ padding: "26px", display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp 0.5s ease 0.3s forwards", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.2px" }}>Live Vehicle Monitor</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 10px", borderRadius: 8, fontSize: 11.5, color: "rgba(255,255,255,0.6)" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 13, color: "#10b981" }}>share_location</span>
              Van #12 (Active)
            </div>
          </div>

          {/* SVG Map Layout Container */}
          <div style={{
            position: "relative",
            height: 200,
            borderRadius: 16,
            background: "#080c12",
            border: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
            boxShadow: "inset 0 4px 20px rgba(0,0,0,0.6)"
          }}>
            {/* Grid pattern background */}
            <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Secondary roads */}
              <path d="M 0 80 Q 150 140 400 80 M 100 0 L 100 200 M 260 0 L 260 200" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />

              {/* Main Dotted Bus Route Line */}
              <path 
                id="routePath"
                d="M 30 150 Q 90 110 150 130 T 280 90 T 340 40" 
                fill="none" 
                stroke="rgba(245,166,35,0.15)" 
                strokeWidth="5" 
                strokeLinecap="round"
              />
              <path 
                d="M 30 150 Q 90 110 150 130 T 280 90 T 340 40" 
                fill="none" 
                stroke="#f5a623" 
                strokeWidth="2.5" 
                strokeDasharray="5,5"
                strokeLinecap="round"
                style={{ animation: "flow-line 25s infinite linear" }}
              />

              {/* Home Icon Indicator (Start point) */}
              <circle cx="30" cy="150" r="16" fill="rgba(79,195,247,0.12)" stroke="rgba(79,195,247,0.4)" strokeWidth="1.5" />
              <text x="30" y="154" fontFamily="Material Symbols Outlined" fontSize="13" fill="#4fc3f7" textAnchor="middle">home</text>

              {/* School Icon Indicator (End point) */}
              <circle cx="340" cy="40" r="18" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
              <text x="340" y="44" fontFamily="Material Symbols Outlined" fontSize="14" fill="#10b981" textAnchor="middle">school</text>

              {/* Pulsing Green Tracker Dot at Van location */}
              <circle cx={vanPos.x} cy={vanPos.y} r="14" fill="rgba(16,185,129,0.22)" style={{ transition: "all 0.1s linear" }} />
              <circle cx={vanPos.x} cy={vanPos.y} r="20" fill="none" stroke="#10b981" strokeWidth="1" style={{ transformOrigin: `${vanPos.x}px ${vanPos.y}px`, animation: "ping-glow 1.8s infinite" }} />
              <circle cx={vanPos.x} cy={vanPos.y} r="5" fill="#10b981" />
            </svg>

            {/* Float details panel on map */}
            <div style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              right: 12,
              background: "rgba(10,15,22,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 5
            }}>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em" }}>Active Driver</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", gap: 5 }}>
                  Rajesh Kumar 
                  <span style={{ fontSize: 11, color: "#f5a623", display: "flex", alignItems: "center" }}>
                    ★ 4.9
                  </span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em" }}>Estimated Arrival</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f5a623" }}>08:24 AM (in 9 mins)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Ride Activity Chart Card */}
        <div className="glass-card-premium" style={{ padding: "26px", display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp 0.5s ease 0.35s forwards", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.2px" }}>Weekly Activity</h3>
            <div style={{ display: "flex", gap: 6 }}>
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, idx) => (
                <span key={day} style={{
                  fontSize: 10.5,
                  padding: "3px 8px",
                  borderRadius: 6,
                  background: idx === 2 ? "rgba(245,166,35,0.12)" : "transparent",
                  color: idx === 2 ? "#f5a623" : "rgba(255,255,255,0.4)",
                  fontWeight: idx === 2 ? 700 : 500,
                  cursor: "default"
                }}>{day}</span>
              ))}
            </div>
          </div>

          {/* Simple Premium SVG Graph */}
          <div style={{ height: 200, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <svg width="100%" height="150">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5a623" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#f5a623" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="30" x2="100%" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="75" x2="100%" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="120" x2="100%" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                {/* Graph Area */}
                <path d="M 10 140 C 50 80, 80 110, 130 50 C 180 80, 220 20, 285 45 C 320 60, 360 140, 360 140 Z" fill="url(#areaGradient)" />
                
                {/* Graph Curve Line */}
                <path d="M 10 140 C 50 80, 80 110, 130 50 C 180 80, 220 20, 285 45" fill="none" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 285 45 C 320 60, 360 140, 360 140" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3,3" />

                {/* Key dots */}
                <circle cx="130" cy="50" r="5" fill="#f5a623" stroke="#0a0e16" strokeWidth="2" />
                <circle cx="285" cy="45" r="5" fill="#f5a623" stroke="#0a0e16" strokeWidth="2" />
              </svg>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 8px 4px", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Route Dev</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>Avg Transit Speed: 38.6 km/h</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── QUICK ACTIONS ──────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f5a623", fontVariationSettings: "'FILL' 1" }}>bolt</span>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.2px" }}>Quick Control Center</h3>
        </div>
        <div className="grid-actions">
          {quickActions.map((a, i) => (
            <Link
              key={a.title}
              href={a.href}
              className="glass-card-premium"
              style={{
                background: a.grad,
                border: `1px solid ${a.color}15`,
                padding: "24px 22px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                animation: `fadeUp 0.5s ease ${0.4 + 0.06 * i}s forwards`,
                opacity: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `${a.color}15`, border: `1.5px solid ${a.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span className="material-symbols-outlined" style={{ color: a.color, fontSize: 24, fontVariationSettings: "'FILL' 1" }}>{a.icon}</span>
              </div>
              
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 5 }}>{a.title}</h4>
                <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>{a.desc}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 5, color: a.color, fontSize: 12, fontWeight: 700, marginTop: "auto" }}>
                <span>Launch Panel</span>
                <span className="material-symbols-outlined hover-arrow" style={{ fontSize: 15 }}>arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── RECENT ACTIVITY ────────────────────────────────────────────── */}
      <div style={{ animation: "fadeUp 0.5s ease 0.55s forwards", opacity: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#4fc3f7", fontVariationSettings: "'FILL' 1" }}>history</span>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.2px" }}>Recent Activity Log</h3>
          </div>
          <button style={{
            padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.45)",
            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif",
            display: "flex", alignItems: "center", gap: 5, transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,166,35,0.3)"; e.currentTarget.style.color = "#f5a623"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
          >
            Full Log
            <span className="material-symbols-outlined" style={{ fontSize: 13 }}>chevron_right</span>
          </button>
        </div>

        <div className="glass-card-premium" style={{ overflow: "hidden" }}>
          {activity.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 24px", flexWrap: "wrap", gap: 12,
                borderBottom: i < activity.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                transition: "background 0.25s", cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 200 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: `${a.color}10`, border: `1px solid ${a.color}22`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <span className="material-symbols-outlined" style={{ color: a.color, fontSize: 20, fontVariationSettings: "'FILL' 1" }}>{a.icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#ffffff", marginBottom: 3 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: 6 }}>
                    <span>{a.subtitle}</span>
                    <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
                    <span style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.5)" }}>{a.vehicle}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{a.time}</span>
                <span style={{
                  fontSize: 11.5, fontWeight: 700, color: a.color,
                  background: `${a.color}12`, padding: "4px 12px",
                  borderRadius: 20, border: `1px solid ${a.color}25`,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>{a.icon}</span>
                  {a.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
