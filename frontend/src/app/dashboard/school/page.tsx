"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";

export default function SchoolDashboard() {
  const { role } = useAuth();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roleLower = role?.toLowerCase() || "school";

  // Simulated live fleet position variables
  const [fleetOffset, setFleetOffset] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setFleetOffset((prev) => (prev + 1) % 360);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Animated grid canvas
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
          ctx.fillStyle = `rgba(79,195,247,${opacity})`;
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
    { label: "Total Students Registered", value: "1,204", icon: "groups", color: "#4fc3f7", bg: "rgba(79,195,247,0.06)", border: "rgba(79,195,247,0.18)", sparkline: "M 0 15 Q 15 25 30 10 T 60 5 T 90 20 T 120 2" },
    { label: "Assigned Vehicles", value: "42", icon: "directions_bus", color: "#10b981", bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.18)", sparkline: "M 0 25 Q 15 10 30 20 T 60 15 T 90 5 T 120 10" },
    { label: "Active Operational Routes", value: "18", icon: "route", color: "#f5a623", bg: "rgba(245,166,35,0.06)", border: "rgba(245,166,35,0.18)", sparkline: "M 0 30 Q 15 15 30 25 T 60 10 T 90 20 T 120 15" },
    { label: "Pending Fleet Issues", value: "3", icon: "warning", color: "#ef4444", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.18)", sparkline: "M 0 35 Q 15 20 30 30 T 60 15 T 90 25 T 120 20" },
  ];

  const quickActions = [
    { title: "Book Vehicle", desc: "Arrange verified transport for student groups, field trips, or school-wide events.", icon: "directions_bus", color: "#f5a623", grad: "linear-gradient(135deg, rgba(245,166,35,0.12), rgba(245,166,35,0.02))", href: `/dashboard/${roleLower}/book` },
    { title: "Fleet Tracking", desc: "Monitor all school-assigned vehicles, routes, status, and delays in real-time.", icon: "location_on", color: "#10b981", grad: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.02))", href: `/dashboard/${roleLower}/track` },
    { title: "Notifications Control", desc: "Broadcast immediate notifications to parents, coordinators and fleet drivers.", icon: "send", color: "#4fc3f7", grad: "linear-gradient(135deg, rgba(79,195,247,0.12), rgba(79,195,247,0.02))", href: `/dashboard/${roleLower}/messages/compose` },
  ];

  const students = [
    { name: "Aarav Sharma", class: "Class 5-A", vehicle: "UP-16-AB-1234", driver: "Rajesh Kumar", route: "Sector 24 → DPS", status: "On Route", color: "#10b981", icon: "near_me" },
    { name: "Diya Patel", class: "Class 8-B", vehicle: "UP-16-CD-5678", driver: "Suresh Singh", route: "Sector 12 → DPS", status: "Dropped Off", color: "#6b7280", icon: "check_circle" },
    { name: "Arjun Mehta", class: "Class 3-C", vehicle: "UP-16-EF-9012", driver: "Amit Yadav", route: "Sector 44 → DPS", status: "On Route", color: "#10b981", icon: "near_me" },
    { name: "Priya Verma", class: "Class 6-A", vehicle: "UP-16-GH-3456", driver: "Ravi Tiwari", route: "Sector 18 → DPS", status: "Delayed", color: "#ef4444", icon: "warning" },
    { name: "Kabir Singh", class: "Class 9-A", vehicle: "UP-16-IJ-7890", driver: "Vinod Kumar", route: "Sector 62 → DPS", status: "On Route", color: "#10b981", icon: "near_me" },
  ];

  // Calculate animated coordinates of school vans
  const van1X = 140 + Math.sin((fleetOffset * Math.PI) / 180) * 80;
  const van1Y = 100 + Math.cos((fleetOffset * Math.PI) / 180) * 40;

  const van2X = 220 + Math.cos(((fleetOffset + 120) * Math.PI) / 180) * 60;
  const van2Y = 80 + Math.sin(((fleetOffset + 120) * Math.PI) / 180) * 30;

  if (!mounted) return null;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#ffffff" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes ping-glow { 0% { transform: scale(0.6); opacity: 1; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes radar-beam { to { transform: rotate(360deg); } }
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
          border-color: rgba(79,195,247,0.25);
          box-shadow: 0 16px 36px rgba(0,0,0,0.4), 0 0 0 1px rgba(79,195,247,0.05) inset;
        }
        .hover-arrow { transition: transform 0.3s ease; }
        .glass-card-premium:hover .hover-arrow { transform: translateX(5px); }
      `}</style>

      {/* ── WELCOME BANNER ─────────────────────────────────────────────── */}
      <div style={{
        position: "relative", borderRadius: 24, overflow: "hidden",
        background: "linear-gradient(135deg, #001220 0%, #0a0e17 50%, #05162a 100%)",
        border: "1px solid rgba(79,195,247,0.18)",
        padding: "36px 32px", marginBottom: 26,
        animation: "fadeUp 0.5s ease forwards",
      }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />
        
        <div style={{ position: "absolute", top: -80, right: -40, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,195,247,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: "20%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 20, background: "rgba(79,195,247,0.08)", border: "1px solid rgba(79,195,247,0.2)", marginBottom: 14 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 13, color: "#4fc3f7", fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#4fc3f7", letterSpacing: "0.08em", textTransform: "uppercase" }}>School Administrator Portal</span>
          </div>
          
          <h2 style={{ fontSize: "clamp(24px, 4.5vw, 32px)", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.8px", marginBottom: 8, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            School Fleet Control Center 🏫
          </h2>
          
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 500 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#4fc3f7" }}>calendar_today</span>
              {dateStr}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 500 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#10b981" }}>schedule</span>
              {timeStr}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 500 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#f5a623" }}>commute</span>
              42 Registered Transit Vans
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
          <span style={{ fontSize: 11, fontWeight: 700, color: "#34d399", letterSpacing: "0.02em" }}>Fleet Online</span>
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
        
        {/* Mock Live Fleet GPS Radar Map Card */}
        <div className="glass-card-premium" style={{ padding: "26px", display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp 0.5s ease 0.3s forwards", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4fc3f7", boxShadow: "0 0 10px #4fc3f7" }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.2px" }}>Live Fleet Radar Map</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 10px", borderRadius: 8, fontSize: 11.5, color: "rgba(255,255,255,0.6)" }}>
              Active Transits: 38/42
            </div>
          </div>

          {/* SVG Map Layout Container */}
          <div style={{
            position: "relative",
            height: 200,
            borderRadius: 16,
            background: "#05080c",
            border: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
            boxShadow: "inset 0 4px 20px rgba(0,0,0,0.6)"
          }}>
            {/* Grid pattern background */}
            <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
              <defs>
                <pattern id="gridSchool" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridSchool)" />
              
              {/* Radial radar sweeps */}
              <circle cx="180" cy="100" r="40" fill="none" stroke="rgba(79,195,247,0.05)" strokeWidth="1" />
              <circle cx="180" cy="100" r="85" fill="none" stroke="rgba(79,195,247,0.03)" strokeWidth="1" />
              <circle cx="180" cy="100" r="130" fill="none" stroke="rgba(79,195,247,0.02)" strokeWidth="1" />

              {/* Map roads grid */}
              <path d="M 0 100 L 360 100 M 180 0 L 180 200 M 30 30 Q 180 180 330 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />

              {/* Central hub (School) */}
              <circle cx="180" cy="100" r="22" fill="rgba(79,195,247,0.12)" stroke="rgba(79,195,247,0.4)" strokeWidth="1.5" />
              <text x="180" y="104" fontFamily="Material Symbols Outlined" fontSize="14" fill="#4fc3f7" textAnchor="middle">school</text>

              {/* Moving Van 1 */}
              <circle cx={van1X} cy={van1Y} r="12" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="1" />
              <circle cx={van1X} cy={van1Y} r="4" fill="#10b981" />
              <text x={van1X} y={van1Y - 14} fontSize="8" fontWeight="bold" fill="rgba(255,255,255,0.5)" textAnchor="middle">V12</text>

              {/* Moving Van 2 */}
              <circle cx={van2X} cy={van2Y} r="12" fill="rgba(245,166,35,0.15)" stroke="rgba(245,166,35,0.4)" strokeWidth="1" />
              <circle cx={van2X} cy={van2Y} r="4" fill="#f5a623" />
              <text x={van2X} y={van2Y - 14} fontSize="8" fontWeight="bold" fill="rgba(255,255,255,0.5)" textAnchor="middle">V04</text>
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
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em" }}>Fleet Status</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>94% On Schedule</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em" }}>Active Alerts</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444" }}>1 Delay Alert</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Fleet Performance Curve Graph */}
        <div className="glass-card-premium" style={{ padding: "26px", display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp 0.5s ease 0.35s forwards", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.2px" }}>Daily Performance</h3>
            <div style={{ display: "flex", gap: 6 }}>
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, idx) => (
                <span key={day} style={{
                  fontSize: 10.5,
                  padding: "3px 8px",
                  borderRadius: 6,
                  background: idx === 2 ? "rgba(79,195,247,0.12)" : "transparent",
                  color: idx === 2 ? "#4fc3f7" : "rgba(255,255,255,0.4)",
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
                  <linearGradient id="areaGradientSchool" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#4fc3f7" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="30" x2="100%" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="75" x2="100%" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="120" x2="100%" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                {/* Graph Area */}
                <path d="M 10 120 C 50 50, 80 80, 130 30 C 180 70, 220 15, 285 20 C 320 25, 360 140, 360 140 Z" fill="url(#areaGradientSchool)" />
                
                {/* Graph Curve Line */}
                <path d="M 10 120 C 50 50, 80 80, 130 30 C 180 70, 220 15, 285 20" fill="none" stroke="#4fc3f7" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 285 20 C 320 25, 360 140, 360 140" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3,3" />

                {/* Key dots */}
                <circle cx="130" cy="30" r="5" fill="#4fc3f7" stroke="#0a0e16" strokeWidth="2" />
                <circle cx="285" cy="20" r="5" fill="#4fc3f7" stroke="#0a0e16" strokeWidth="2" />
              </svg>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 8px 4px", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Fleet Efficiency</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>On-time Rate: 96.8%</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── QUICK ACTIONS ──────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f5a623", fontVariationSettings: "'FILL' 1" }}>bolt</span>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.2px" }}>Control Actions</h3>
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

      {/* ── STUDENT TRANSPORT OVERVIEW TABLE ───────────────────────────── */}
      <div style={{ animation: "fadeUp 0.5s ease 0.55s forwards", opacity: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#4fc3f7", fontVariationSettings: "'FILL' 1" }}>school</span>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.2px" }}>Student Transport Logs</h3>
          </div>
          <button style={{
            padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.45)",
            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif",
            display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(79,195,247,0.3)"; e.currentTarget.style.color = "#4fc3f7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>download</span>
            Export Log
          </button>
        </div>
        <div className="glass-card-premium" style={{ overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 750 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Student", "Class", "Vehicle ID", "Active Driver", "Assigned Route", "Status"].map((h) => (
                    <th key={h} style={{
                      padding: "14px 18px", textAlign: "left",
                      fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)",
                      textTransform: "uppercase", letterSpacing: "0.12em",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i < students.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      transition: "background 0.25s", cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: "50%",
                          background: "linear-gradient(135deg, rgba(79,195,247,0.15), rgba(79,195,247,0.05))",
                          border: "1px solid rgba(79,195,247,0.2)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#4fc3f7", fontSize: 13, fontWeight: 700, flexShrink: 0,
                        }}>
                          {s.name.charAt(0)}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.05)", padding: "3px 10px", borderRadius: 6, fontWeight: 600 }}>{s.class}</span>
                    </td>
                    <td style={{ padding: "14px 18px", fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.02em" }}>{s.vehicle}</td>
                    <td style={{ padding: "14px 18px", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{s.driver}</td>
                    <td style={{ padding: "14px 18px", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{s.route}</td>
                    <td style={{ padding: "14px 18px" }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, color: s.color,
                        background: `${s.color}12`, padding: "4px 12px",
                        borderRadius: 20, border: `1px solid ${s.color}20`,
                        display: "inline-flex", alignItems: "center", gap: 5,
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
