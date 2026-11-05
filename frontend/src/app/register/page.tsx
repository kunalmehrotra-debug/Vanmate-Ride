"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────
type Role = "parent" | "owner" | "school" | "";

interface FormData {
  // Account
  role: Role;
  userId: string;
  password: string;
  confirmPassword: string;
  // Personal
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  // Student (parent only)
  studentName: string;
  studentStandard: string;
  studentAge: string;
  schoolName: string;
  // Driver / Owner
  hasVehicle: "yes" | "no" | "";
  vehicleNumber: string;
  vehicleType: string;
  licenseNumber: string;
  licenseStartDate: string;
  licenseEndDate: string;
  yearsOfExperience: string;
  // School only
  schoolOfficialName: string;
  schoolBoard: string;
  schoolTotalStudents: string;
  principalName: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const STEPS = ["Role", "Account", "Personal", "Details", "Review"];

function InputField({
  label,
  icon,
  children,
  error,
}: {
  label: string;
  icon: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#c8cdd8",
        }}
      >
        {label}
      </label>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.07)",
          border: `1.5px solid ${error ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.18)"}`,
          borderRadius: 14,
          padding: "13px 16px 13px 48px",
          transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
        }}
        onFocusCapture={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "rgba(245,166,35,0.8)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 0 0 3px rgba(245,166,35,0.12)";
          (e.currentTarget as HTMLDivElement).style.background =
            "rgba(255,255,255,0.09)";
        }}
        onBlurCapture={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = error
            ? "rgba(239,68,68,0.6)"
            : "rgba(255,255,255,0.18)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{
            position: "absolute",
            left: 14,
            color: "#a0a8b8",
            fontSize: 20,
            userSelect: "none",
          }}
        >
          {icon}
        </span>
        {children}
      </div>
      {error && (
        <span style={{ color: "#f87171", fontSize: 12, marginTop: 2, fontWeight: 600 }}>
          {error}
        </span>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  outline: "none",
  color: "#f0f2f5",
  fontSize: 15,
  width: "100%",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
};

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Register() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const [form, setForm] = useState<FormData>({
    role: "",
    userId: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    studentName: "",
    studentStandard: "",
    studentAge: "",
    schoolName: "",
    hasVehicle: "",
    vehicleNumber: "",
    vehicleType: "",
    licenseNumber: "",
    licenseStartDate: "",
    licenseEndDate: "",
    yearsOfExperience: "",
    schoolOfficialName: "",
    schoolBoard: "",
    schoolTotalStudents: "",
    principalName: "",
  });

  const update = (key: keyof FormData, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  // ── Validation per step ──────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (step === 0 && !form.role) e.role = "Please select a role.";
    if (step === 1) {
      if (!form.userId.trim()) e.userId = "User ID is required.";
      if (form.password.length < 6) e.password = "Minimum 6 characters.";
      if (form.password !== form.confirmPassword)
        e.confirmPassword = "Passwords do not match.";
    }
    if (step === 2) {
      if (!form.name.trim()) e.name = "Full name is required.";
      if (!form.email.includes("@")) e.email = "Enter a valid email.";
      if (form.phone.length < 10) e.phone = "Enter a valid 10-digit number.";
      if (!form.city.trim()) e.city = "City is required.";
      if (!form.address.trim()) e.address = "Address is required.";
    }
    if (step === 3 && form.role === "parent") {
      if (!form.studentName.trim()) e.studentName = "Student name is required.";
      if (!form.studentStandard.trim())
        e.studentStandard = "Class / Standard is required.";
      if (!form.studentAge.trim()) e.studentAge = "Age is required.";
      if (!form.schoolName.trim()) e.schoolName = "School name is required.";
    }
    if (step === 3 && form.role === "owner") {
      if (!form.hasVehicle) e.hasVehicle = "Please select an option.";
      if (form.hasVehicle === "yes") {
        if (!form.vehicleNumber.trim()) e.vehicleNumber = "Vehicle number is required.";
        if (!form.vehicleType) e.vehicleType = "Please select vehicle type.";
      }
      if (!form.licenseNumber.trim()) e.licenseNumber = "License number is required.";
      if (!form.licenseStartDate) e.licenseStartDate = "Start date is required.";
      if (!form.licenseEndDate) e.licenseEndDate = "End date is required.";
      if (!form.yearsOfExperience.trim()) e.yearsOfExperience = "Experience is required.";
    }
    if (step === 3 && form.role === "school") {
      if (!form.schoolOfficialName.trim())
        e.schoolOfficialName = "School name is required.";
      if (!form.schoolBoard.trim())
        e.schoolBoard = "Affiliated board is required.";
      if (!form.schoolTotalStudents.trim())
        e.schoolTotalStudents = "Total students is required.";
      if (!form.principalName.trim())
        e.principalName = "Principal name is required.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) {
      if (step === 3) setStep(4);
      else setStep((s) => s + 1);
    }
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      
      if (!res.ok) {
        setApiError(data.error || "Registration failed");
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setApiError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Particle background
  useEffect(() => {
    const canvas = document.getElementById(
      "reg-canvas"
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      o: number;
    }[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.3 + 0.05,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,166,35,${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Step content helpers ─────────────────────────────────────────────────
  const totalSteps = form.role === "" ? 5 : 5;
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        ::placeholder { color: rgba(180,185,200,0.4); }
        textarea::placeholder { color: rgba(180,185,200,0.4); }
        input::-webkit-inner-spin-button { -webkit-appearance: none; }
        .reg-card-hover:hover { transform: translateY(-2px); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
        }
        /* Placeholder visibility */
        input::placeholder, textarea::placeholder { color: rgba(200,210,230,0.45) !important; font-weight: 400; }
        /* Autofill override */
        input:-webkit-autofill { -webkit-text-fill-color: #f0f2f5 !important; box-shadow: 0 0 0 100px rgba(255,255,255,0.07) inset !important; }
        /* Number input spinner hide */
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }

        /* ── Road scene animations ── */
        @keyframes vanDrive {
          0%   { transform: translateX(-260px); }
          100% { transform: translateX(110vw); }
        }
        @keyframes wheelSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes roadDash {
          from { transform: translateX(0); }
          to   { transform: translateX(-120px); }
        }
        @keyframes treeSway {
          0%, 100% { transform: rotate(-1.5deg); transform-origin: bottom center; }
          50%       { transform: rotate(1.5deg);  transform-origin: bottom center; }
        }
        @keyframes lampGlow {
          0%, 100% { opacity: 0.7; filter: drop-shadow(0 0 6px #f5a623); }
          50%       { opacity: 1;   filter: drop-shadow(0 0 14px #ffb95f); }
        }
        @keyframes headlightBeam {
          0%, 100% { opacity: 0.25; }
          50%       { opacity: 0.45; }
        }
        @keyframes exhaustPuff {
          0%   { transform: translateX(0) translateY(0) scale(0.5); opacity: 0.5; }
          100% { transform: translateX(-30px) translateY(-18px) scale(2.5); opacity: 0; }
        }
        @keyframes cloudDrift {
          from { transform: translateX(0); }
          to   { transform: translateX(-100vw); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
        .van-anim  { animation: vanDrive 7s linear infinite; }
        .wheel-anim { animation: wheelSpin 0.6s linear infinite; }
        .road-anim { animation: roadDash 0.8s linear infinite; }
        .tree-anim { animation: treeSway 4s ease-in-out infinite; }
        .lamp-anim { animation: lampGlow 2s ease-in-out infinite; }
        .beam-anim { animation: headlightBeam 1.5s ease-in-out infinite; }
        .exhaust-anim { animation: exhaustPuff 1.2s ease-out infinite; }
        .cloud-anim { animation: cloudDrift 28s linear infinite; }
        .cloud-anim2 { animation: cloudDrift 40s linear infinite; }
        .star-anim { animation: starTwinkle 2s ease-in-out infinite; }

        /* ── Responsive styles ── */
        @media (max-width: 768px) {
          .reg-main-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            border-radius: 20px !important;
          }
          .reg-left-panel {
            display: none !important;
          }
          .reg-right-panel {
            padding: 24px 18px !important;
          }
          .role-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .two-col-grid {
            grid-template-columns: 1fr !important;
          }
          .vehicle-type-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .has-vehicle-grid {
            grid-template-columns: 1fr !important;
          }
          .review-fields-grid {
            grid-template-columns: 1fr !important;
          }
          .nav-buttons {
            flex-direction: column-reverse !important;
          }
          .nav-buttons button {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
          }
          .reg-road-scene {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .reg-right-panel {
            padding: 20px 14px !important;
          }
          .vehicle-type-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .reg-mobile-header {
          display: none;
        }
        @media (max-width: 768px) {
          .reg-mobile-header {
            display: flex !important;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "transparent",
          fontFamily: "'Inter', sans-serif",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px 22vh 16px",
        }}
      >
        {/* Particle canvas */}
        <canvas
          id="reg-canvas"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── ROAD SCENE ──────────────────────────────────────────────────── */}
        <div className="reg-road-scene" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>

          {/* Night sky gradient */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #060a12 0%, #0d1117 55%, #111820 100%)" }} />

          {/* Twinkling stars */}
          {[
            [8,6],[15,12],[24,4],[33,9],[42,3],[51,14],[62,7],[71,11],[80,5],[89,8],[95,13],
            [5,20],[18,22],[30,18],[45,25],[58,19],[72,23],[85,21],[92,16],
          ].map(([x,y],i) => (
            <div key={i} className="star-anim" style={{
              position: "absolute",
              left: `${x}%`, top: `${y}%`,
              width: i%3===0?3:2, height: i%3===0?3:2,
              borderRadius: "50%",
              background: "#fff",
              animationDelay: `${(i * 0.37) % 2.5}s`,
              animationDuration: `${1.8 + (i * 0.23) % 1.5}s`,
            }} />
          ))}

          {/* Drifting clouds */}
          <div className="cloud-anim" style={{ position: "absolute", top: "8%", left: "110%", display: "flex", gap: 40, animationDelay: "0s" }}>
            {[180,120,150,100].map((w,i) => (
              <div key={i} style={{ width: w, height: w*0.4, borderRadius: 999, background: "rgba(255,255,255,0.04)", marginLeft: i*60 }} />
            ))}
          </div>
          <div className="cloud-anim2" style={{ position: "absolute", top: "18%", left: "80%", animationDelay: "-12s" }}>
            <div style={{ width: 140, height: 50, borderRadius: 999, background: "rgba(255,255,255,0.03)" }} />
          </div>

          {/* Cityscape silhouette */}
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ position: "absolute", bottom: "19%", left: 0, width: "100%", height: 200, opacity: 0.18 }}>
            <path d="M0,200 L0,120 L40,120 L40,80 L60,80 L60,60 L80,60 L80,40 L100,40 L100,80 L120,80 L120,100 L140,100 L140,60 L160,60 L160,100 L180,100 L180,50 L200,50 L200,30 L220,30 L220,50 L240,50 L240,100 L260,100 L260,80 L280,80 L280,110 L300,110 L300,70 L320,70 L320,40 L340,40 L340,70 L360,70 L360,90 L380,90 L380,60 L400,60 L400,90 L420,90 L420,110 L450,110 L450,80 L470,80 L470,50 L490,50 L490,20 L510,20 L510,50 L530,50 L530,80 L560,80 L560,100 L580,100 L580,70 L600,70 L600,90 L630,90 L630,55 L660,55 L660,30 L680,30 L680,55 L710,55 L710,90 L740,90 L740,60 L760,60 L760,40 L780,40 L780,60 L800,60 L800,90 L830,90 L830,70 L860,70 L860,100 L890,100 L890,80 L920,80 L920,50 L940,50 L940,80 L970,80 L970,100 L1000,100 L1000,70 L1030,70 L1030,50 L1050,50 L1050,30 L1080,30 L1080,50 L1100,50 L1100,80 L1130,80 L1130,100 L1160,100 L1160,70 L1190,70 L1190,50 L1210,50 L1210,80 L1250,80 L1250,110 L1280,110 L1280,80 L1310,80 L1310,50 L1340,50 L1340,80 L1380,80 L1380,110 L1440,110 L1440,200 Z" fill="#1a2235"/>
          </svg>

          {/* Trees */}
          {[4, 14, 88, 96].map((x, i) => (
            <div key={i} className="tree-anim" style={{
              position: "absolute",
              bottom: "19%",
              left: `${x}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3.5 + i * 0.5}s`,
            }}>
              {/* trunk */}
              <div style={{ width: 8, height: 40, background: "#2a1f10", margin: "0 auto", borderRadius: 4 }} />
              {/* canopy layers */}
              <div style={{ width: 0, height: 0, borderLeft: "28px solid transparent", borderRight: "28px solid transparent", borderBottom: "50px solid #0d2b14", margin: "-10px auto 0" }} />
              <div style={{ width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderBottom: "44px solid #0e3318", margin: "-30px auto 0" }} />
              <div style={{ width: 0, height: 0, borderLeft: "16px solid transparent", borderRight: "16px solid transparent", borderBottom: "38px solid #103d1c", margin: "-26px auto 0" }} />
            </div>
          ))}

          {/* Streetlights */}
          {[22, 44, 66].map((x, i) => (
            <div key={i} style={{ position: "absolute", bottom: "19%", left: `${x}%`, display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* lamp glow halo */}
              <div className="lamp-anim" style={{
                width: 30, height: 30, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(245,166,35,0.5) 0%, transparent 70%)",
                marginBottom: -8,
                animationDelay: `${i * 0.6}s`,
              }} />
              {/* lamp head */}
              <div style={{ width: 24, height: 8, background: "#c8a050", borderRadius: "4px 4px 0 0" }} />
              {/* pole */}
              <div style={{ width: 4, height: 80, background: "linear-gradient(180deg,#5a5060,#2a2230)" }} />
              {/* base */}
              <div style={{ width: 14, height: 6, background: "#2a2230", borderRadius: 3 }} />
            </div>
          ))}

          {/* Road */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "19%", background: "linear-gradient(180deg,#1a2030 0%,#0e1218 100%)", borderTop: "3px solid rgba(255,220,100,0.15)" }}>
            {/* kerb line top */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,transparent,rgba(200,160,80,0.4),transparent)" }} />
            {/* lane markings container – masks overflow */}
            <div style={{ position: "absolute", top: "45%", left: 0, right: 0, height: 6, overflow: "hidden" }}>
              <div className="road-anim" style={{ display: "flex", gap: 0, width: "200%" }}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} style={{ width: 80, height: 6, background: i % 2 === 0 ? "rgba(255,255,255,0.18)" : "transparent", borderRadius: 3, flexShrink: 0 }} />
                ))}
              </div>
            </div>
            {/* road texture dots */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.015) 1px,transparent 1px)", backgroundSize: "20px 12px" }} />
          </div>

          {/* VAN */}
          <div className="van-anim" style={{ position: "absolute", bottom: "calc(19% - 8px)", left: 0, zIndex: 2 }}>
            {/* Headlight beam (ground) */}
            <div className="beam-anim" style={{
              position: "absolute",
              right: -120, bottom: 0,
              width: 130, height: 30,
              background: "linear-gradient(90deg, rgba(255,240,160,0.35), transparent)",
              clipPath: "polygon(0 50%, 100% 0%, 100% 100%)",
              transformOrigin: "left center",
            }} />

            {/* Exhaust puffs */}
            <div className="exhaust-anim" style={{ position:"absolute", left: 4, bottom: 28, width: 12, height: 12, borderRadius:"50%", background:"rgba(120,130,150,0.4)", animationDelay:"0s" }} />
            <div className="exhaust-anim" style={{ position:"absolute", left: 4, bottom: 28, width: 10, height: 10, borderRadius:"50%", background:"rgba(120,130,150,0.3)", animationDelay:"0.4s" }} />
            <div className="exhaust-anim" style={{ position:"absolute", left: 4, bottom: 28, width: 8,  height: 8,  borderRadius:"50%", background:"rgba(120,130,150,0.25)",animationDelay:"0.8s" }} />

            {/* VAN SVG body */}
            <svg width="240" height="106" viewBox="0 0 240 106" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* ground shadow */}
              <ellipse cx="120" cy="104" rx="105" ry="4" fill="rgba(0,0,0,0.45)" />

              {/* body */}
              <path d="M18 75 L18 35 Q18 20 32 18 L160 18 Q185 18 200 32 L222 60 Q226 66 226 72 L226 75 Z"
                fill="#f5a623" stroke="#e09020" strokeWidth="1.5" />

              {/* roof rack */}
              <rect x="30" y="14" width="130" height="5" rx="2" fill="#c88010" />
              <rect x="40" y="10" width="4" height="6" rx="1" fill="#c88010" />
              <rect x="80" y="10" width="4" height="6" rx="1" fill="#c88010" />
              <rect x="120" y="10" width="4" height="6" rx="1" fill="#c88010" />
              <rect x="155" y="10" width="4" height="6" rx="1" fill="#c88010" />

              {/* windows */}
              <rect x="38" y="25" width="38" height="28" rx="4" fill="#0d2040" stroke="#1a3060" strokeWidth="1" opacity="0.9" />
              <rect x="82" y="25" width="38" height="28" rx="4" fill="#0d2040" stroke="#1a3060" strokeWidth="1" opacity="0.9" />
              <rect x="126" y="25" width="28" height="28" rx="4" fill="#0d2040" stroke="#1a3060" strokeWidth="1" opacity="0.9" />
              {/* window glare */}
              <path d="M42 27 L52 27 L46 38 Z" fill="rgba(255,255,255,0.08)" />
              <path d="M86 27 L96 27 L90 38 Z" fill="rgba(255,255,255,0.08)" />

              {/* VanMate text on body */}
              <text x="52" y="60" fontSize="11" fontWeight="bold" fill="white" fontFamily="Inter,sans-serif" opacity="0.9">VanMate</text>
              <line x1="38" y1="65" x2="162" y2="65" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

              {/* front grille / bumper */}
              <rect x="210" y="60" width="16" height="16" rx="2" fill="#c88010" />
              <rect x="212" y="63" width="12" height="2" rx="1" fill="#8a5800" />
              <rect x="212" y="67" width="12" height="2" rx="1" fill="#8a5800" />
              <rect x="212" y="71" width="12" height="2" rx="1" fill="#8a5800" />

              {/* headlight */}
              <circle cx="218" cy="55" r="6" fill="#fffde0" />
              <circle cx="218" cy="55" r="4" fill="#fffff0" opacity="0.9" />
              <circle cx="218" cy="55" r="7" fill="none" stroke="rgba(255,240,160,0.6)" strokeWidth="2" />

              {/* tail light */}
              <rect x="18" y="45" width="6" height="14" rx="2" fill="#ff4444" opacity="0.85" />
              <rect x="18" y="45" width="6" height="14" rx="2" fill="url(#tailGlow)" />
              <defs>
                <radialGradient id="tailGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff6666" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#cc0000" stopOpacity="0.5" />
                </radialGradient>
              </defs>

              {/* door handle */}
              <rect x="155" y="50" width="10" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />

              {/* undercarriage */}
              <rect x="30" y="74" width="192" height="4" rx="2" fill="#7a5010" />

              {/* front wheel */}
              <circle cx="185" cy="85" r="20" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
              <g transform="translate(185,85)">
                <circle r="13" fill="#252525" className="wheel-anim" style={{ transformOrigin: "0 0" }}>
                  {/* spokes - rendered via lines from center */}
                </circle>
                <line x1="0" y1="-13" x2="0" y2="13" stroke="#444" strokeWidth="2" className="wheel-anim" style={{ transformOrigin: "0 0" }} />
                <line x1="-13" y1="0" x2="13" y2="0" stroke="#444" strokeWidth="2" className="wheel-anim" style={{ transformOrigin: "0 0" }} />
                <line x1="-9" y1="-9" x2="9" y2="9" stroke="#444" strokeWidth="1.5" className="wheel-anim" style={{ transformOrigin: "0 0" }} />
                <line x1="9" y1="-9" x2="-9" y2="9" stroke="#444" strokeWidth="1.5" className="wheel-anim" style={{ transformOrigin: "0 0" }} />
                <circle r="4" fill="#f5a623" />
                <circle r="2" fill="#c88010" />
              </g>
              <circle cx="185" cy="85" r="20" fill="none" stroke="#3a3a3a" strokeWidth="2" />

              {/* rear wheel */}
              <circle cx="58" cy="85" r="20" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
              <g transform="translate(58,85)">
                <circle r="13" fill="#252525" className="wheel-anim" style={{ transformOrigin: "0 0" }} />
                <line x1="0" y1="-13" x2="0" y2="13" stroke="#444" strokeWidth="2" className="wheel-anim" style={{ transformOrigin: "0 0" }} />
                <line x1="-13" y1="0" x2="13" y2="0" stroke="#444" strokeWidth="2" className="wheel-anim" style={{ transformOrigin: "0 0" }} />
                <line x1="-9" y1="-9" x2="9" y2="9" stroke="#444" strokeWidth="1.5" className="wheel-anim" style={{ transformOrigin: "0 0" }} />
                <line x1="9" y1="-9" x2="-9" y2="9" stroke="#444" strokeWidth="1.5" className="wheel-anim" style={{ transformOrigin: "0 0" }} />
                <circle r="4" fill="#f5a623" />
                <circle r="2" fill="#c88010" />
              </g>
              <circle cx="58" cy="85" r="20" fill="none" stroke="#3a3a3a" strokeWidth="2" />
            </svg>
          </div>

          {/* Ground glow under van (moves with it) */}
          <div className="van-anim" style={{ position: "absolute", bottom: "calc(19% - 8px)", left: 60, width: 200, height: 16, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(245,166,35,0.20) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(3px)" }} />
        </div>

        {/* Ambient glow orbs */}
        <div
          style={{
            position: "fixed",
            top: "5%",
            left: "10%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            bottom: "10%",
            right: "5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,195,247,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Main container */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 980,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 0,
          }}
        >
          {/* Back to home */}
          <div style={{ marginBottom: 20 }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#6a7080",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#f5a623")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#6a7080")
              }
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                arrow_back
              </span>
              Back to VanMate
            </Link>
          </div>

          {submitted ? (
            // ── SUCCESS SCREEN ───────────────────────────────────────────────
            <div
              className="fade-up"
              style={{
                textAlign: "center",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: 28,
                padding: "clamp(40px,8vw,80px) clamp(24px,6vw,60px)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 60px rgba(16,185,129,0.12)",
              }}
            >
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  background: "rgba(16,185,129,0.15)",
                  border: "2px solid rgba(16,185,129,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 28px",
                  fontSize: 44,
                }}
              >
                🎉
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem,4vw,2.8rem)",
                  fontWeight: 900,
                  color: "#fff",
                  marginBottom: 14,
                  letterSpacing: "-0.02em",
                }}
              >
                You're all set,{" "}
                <span style={{ color: "#10b981" }}>
                  {form.name.split(" ")[0]}!
                </span>
              </h2>
              <p
                style={{
                  color: "#8a8a9a",
                  fontSize: 17,
                  maxWidth: 400,
                  margin: "0 auto 36px",
                  lineHeight: 1.7,
                }}
              >
                Your VanMate account has been created. You can now log in and
                start managing school transport.
              </p>
              <div
                style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
              >
                <Link
                  href="/login"
                  style={{
                    background: "linear-gradient(135deg,#f5a623,#ffb95f)",
                    color: "#1a0800",
                    padding: "14px 36px",
                    borderRadius: 999,
                    fontSize: 16,
                    fontWeight: 800,
                    textDecoration: "none",
                    boxShadow: "0 0 28px rgba(245,166,35,0.35)",
                  }}
                >
                  Go to Login →
                </Link>
                <Link
                  href="/"
                  style={{
                    padding: "14px 36px",
                    borderRadius: 999,
                    fontSize: 16,
                    fontWeight: 700,
                    textDecoration: "none",
                    background: "transparent",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                >
                  Home
                </Link>
              </div>
            </div>
          ) : (
            <div
              className="reg-main-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "clamp(200px,28%,280px) 1fr",
                gap: 0,
                background: "rgba(10,14,22,0.85)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 28,
                overflow: "hidden",
                backdropFilter: "blur(24px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05) inset",
                minHeight: 640,
              }}
            >
              {/* ── LEFT PANEL ───────────────────────────────────────────── */}
              <div
                className="reg-left-panel"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  borderRight: "1px solid rgba(255,255,255,0.1)",
                  padding: "clamp(24px,4vw,40px) clamp(20px,3vw,32px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {/* Brand */}
                <Link
                  href="/"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 32,
                  }}
                >
                  <span
                    style={{ fontWeight: 900, fontSize: 22, color: "#f5a623" }}
                  >
                    Van
                  </span>
                  <span
                    style={{ fontWeight: 900, fontSize: 22, color: "#fff" }}
                  >
                    Mate
                  </span>
                </Link>

                {/* Step list */}
                {STEPS.map((s, i) => {
                  const done = i < step;
                  const active = i === step;
                  return (
                    <div
                      key={s}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "12px 14px",
                        borderRadius: 12,
                        background: active
                          ? "rgba(245,166,35,0.1)"
                          : "transparent",
                        border: active
                          ? "1px solid rgba(245,166,35,0.25)"
                          : "1px solid transparent",
                        transition: "all 0.3s",
                        cursor: done ? "pointer" : "default",
                      }}
                      onClick={() => done && setStep(i)}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: done
                            ? "#10b981"
                            : active
                            ? "#f5a623"
                            : "rgba(255,255,255,0.08)",
                          border: `2px solid ${
                            done
                              ? "#10b981"
                              : active
                              ? "#f5a623"
                              : "rgba(255,255,255,0.12)"
                          }`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: done ? 14 : 12,
                          color: done || active ? "#fff" : "#6a7080",
                          fontWeight: 800,
                          flexShrink: 0,
                          transition: "all 0.3s",
                        }}
                      >
                        {done ? "✓" : i + 1}
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: active ? 700 : 500,
                          color: active ? "#f5a623" : done ? "#34d399" : "#9aa0b0",
                          transition: "color 0.3s",
                        }}
                      >
                        {s}
                      </span>
                    </div>
                  );
                })}

                {/* Trust badges */}
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "shield", text: "256-bit SSL Encrypted" },
                    { icon: "verified_user", text: "GDPR Compliant" },
                    { icon: "lock", text: "Data Never Shared" },
                  ].map((b) => (
                    <div
                      key={b.text}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#9aa0b0",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#10b981" }}>
                        {b.icon}
                      </span>
                      {b.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT PANEL ──────────────────────────────────────────── */}
              <div
                className="reg-right-panel"
                style={{
                  padding: "clamp(28px,5vw,48px) clamp(20px,5vw,48px)",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {/* Mobile-only header */}
                <div className="reg-mobile-header" style={{ flexDirection: "column", gap: 12, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                      <span style={{ fontWeight: 900, fontSize: 20, color: "#f5a623" }}>Van</span>
                      <span style={{ fontWeight: 900, fontSize: 20, color: "#fff" }}>Mate</span>
                    </Link>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#9aa0b0", letterSpacing: "0.1em" }}>STEP {step + 1} / 5</span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {STEPS.map((s, i) => (
                      <div key={s} style={{ flex: 1, height: 4, borderRadius: 99, background: i <= step ? "linear-gradient(90deg,#f5a623,#ffb95f)" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
                    ))}
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    height: 3,
                    borderRadius: 99,
                    background: "rgba(255,255,255,0.08)",
                    marginBottom: 32,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${progress}%`,
                      background: "linear-gradient(90deg,#f5a623,#ffb95f)",
                      borderRadius: 99,
                      transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                </div>

                <div className="fade-up" key={step} style={{ flexGrow: 1 }}>
                  {/* ── STEP 0: ROLE ────────────────────────────────────── */}
                  {step === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                      <div>
                        <div style={{ color: "#f5a623", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
                          Step 1 of 5
                        </div>
                        <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2rem)", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: 6 }}>
                          Who are you registering as?
                        </h2>
                        <p style={{ color: "#b0b8c8", fontSize: 15 }}>
                          Choose your role to personalise your VanMate experience.
                        </p>
                      </div>

                      {errors.role && (
                        <div style={{ color: "#ef4444", fontSize: 13, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 14px" }}>
                          {errors.role}
                        </div>
                      )}

                      <div className="role-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                        {[
                          {
                            key: "parent" as Role,
                            icon: "family_restroom",
                            title: "Parent / Guardian",
                            desc: "Track your child's transport, get real-time alerts and manage bookings.",
                            color: "#f5a623",
                            darkColor: "#c47d00",
                            bg: "linear-gradient(145deg, #2a1a00 0%, #1e1200 100%)",
                            bgHover: "linear-gradient(145deg, #3a2500 0%, #2a1800 100%)",
                            bgSelected: "linear-gradient(145deg, rgba(245,166,35,0.22) 0%, rgba(194,124,0,0.15) 100%)",
                            iconBg: "rgba(245,166,35,0.18)",
                            border: "rgba(245,166,35,0.25)",
                            borderSelected: "rgba(245,166,35,0.7)",
                            shadow: "0 8px 32px rgba(245,166,35,0.25)",
                          },
                          {
                            key: "owner" as Role,
                            icon: "directions_bus",
                            title: "Van Owner / Driver",
                            desc: "Manage routes, students, and provide reliable transport services.",
                            color: "#4fc3f7",
                            darkColor: "#0288d1",
                            bg: "linear-gradient(145deg, #001a2a 0%, #00111e 100%)",
                            bgHover: "linear-gradient(145deg, #002438 0%, #001828 100%)",
                            bgSelected: "linear-gradient(145deg, rgba(79,195,247,0.20) 0%, rgba(2,136,209,0.12) 100%)",
                            iconBg: "rgba(79,195,247,0.18)",
                            border: "rgba(79,195,247,0.25)",
                            borderSelected: "rgba(79,195,247,0.7)",
                            shadow: "0 8px 32px rgba(79,195,247,0.22)",
                          },
                          {
                            key: "school" as Role,
                            icon: "account_balance",
                            title: "School / Institution",
                            desc: "Book verified vans for your students and manage school-wide transport.",
                            color: "#10b981",
                            darkColor: "#047857",
                            bg: "linear-gradient(145deg, #001a10 0%, #00110a 100%)",
                            bgHover: "linear-gradient(145deg, #002416 0%, #001810 100%)",
                            bgSelected: "linear-gradient(145deg, rgba(16,185,129,0.20) 0%, rgba(4,120,87,0.12) 100%)",
                            iconBg: "rgba(16,185,129,0.18)",
                            border: "rgba(16,185,129,0.25)",
                            borderSelected: "rgba(16,185,129,0.7)",
                            shadow: "0 8px 32px rgba(16,185,129,0.22)",
                          },
                        ].map((r) => {
                          const isSelected = form.role === r.key;
                          return (
                          <button
                            key={r.key}
                            type="button"
                            onClick={() => {
                              update("role", r.key);
                              setErrors({});
                            }}
                            style={{
                              background: isSelected ? r.bgSelected : r.bg,
                              border: `2px solid ${isSelected ? r.borderSelected : r.border}`,
                              borderRadius: 20,
                              padding: "22px 18px",
                              cursor: "pointer",
                              textAlign: "left",
                              display: "flex",
                              flexDirection: "column",
                              gap: 14,
                              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                              boxShadow: isSelected ? r.shadow : "0 2px 12px rgba(0,0,0,0.3)",
                              transform: isSelected ? "translateY(-3px)" : "translateY(0)",
                              position: "relative",
                              overflow: "hidden",
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                (e.currentTarget as HTMLButtonElement).style.background = r.bgHover;
                                (e.currentTarget as HTMLButtonElement).style.borderColor = r.borderSelected;
                                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = r.shadow;
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                (e.currentTarget as HTMLButtonElement).style.background = r.bg;
                                (e.currentTarget as HTMLButtonElement).style.borderColor = r.border;
                                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.3)";
                              }
                            }}
                          >
                            {/* Top colour stripe */}
                            <div style={{
                              position: "absolute",
                              top: 0, left: 0, right: 0, height: 3,
                              background: `linear-gradient(90deg, ${r.color}, ${r.darkColor})`,
                              borderRadius: "18px 18px 0 0",
                              opacity: isSelected ? 1 : 0.45,
                              transition: "opacity 0.3s",
                            }} />

                            {/* Icon box */}
                            <div style={{
                              width: 56, height: 56,
                              borderRadius: 16,
                              background: isSelected
                                ? `linear-gradient(135deg, ${r.color}30, ${r.darkColor}20)`
                                : r.iconBg,
                              border: `1.5px solid ${isSelected ? r.color + "60" : r.color + "35"}`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              boxShadow: isSelected ? `0 0 16px ${r.color}40` : "none",
                              transition: "all 0.3s",
                            }}>
                              <span className="material-symbols-outlined" style={{
                                color: r.color,
                                fontSize: 28,
                                fontVariationSettings: "'FILL' 1",
                                filter: isSelected ? `drop-shadow(0 0 6px ${r.color}80)` : "none",
                                transition: "filter 0.3s",
                              }}>
                                {r.icon}
                              </span>
                            </div>

                            {/* Text */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                              <div style={{
                                color: isSelected ? "#ffffff" : "#d8dde8",
                                fontWeight: 800,
                                fontSize: 14,
                                letterSpacing: "-0.01em",
                              }}>
                                {r.title}
                              </div>
                              <div style={{
                                color: isSelected ? "rgba(255,255,255,0.72)" : "rgba(200,210,230,0.65)",
                                fontSize: 11.5,
                                lineHeight: 1.6,
                                fontWeight: 500,
                              }}>
                                {r.desc}
                              </div>
                            </div>

                            {/* Selected badge */}
                            {isSelected && (
                              <div style={{
                                display: "flex", alignItems: "center", gap: 5,
                                background: `${r.color}22`,
                                border: `1px solid ${r.color}55`,
                                borderRadius: 999,
                                padding: "4px 10px",
                                width: "fit-content",
                              }}>
                                <span className="material-symbols-outlined" style={{
                                  fontSize: 14,
                                  color: r.color,
                                  fontVariationSettings: "'FILL' 1",
                                }}>check_circle</span>
                                <span style={{ color: r.color, fontWeight: 700, fontSize: 11 }}>Selected</span>
                              </div>
                            )}
                          </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── STEP 1: ACCOUNT ─────────────────────────────────── */}
                  {step === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                      <div>
                        <div style={{ color: "#f5a623", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
                          Step 2 of 5
                        </div>
                        <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>
                          Create your account
                        </h2>
                        <p style={{ color: "#b0b8c8", fontSize: 15 }}>
                          Your unique User ID and password for logging in.
                        </p>
                      </div>

                      <InputField label="User ID" icon="badge" error={errors.userId}>
                        <input
                          style={inputStyle}
                          type="text"
                          value={form.userId}
                          onChange={(e) => update("userId", e.target.value)}
                          placeholder="e.g. PARENT_2025 or OWNER_KL01"
                        />
                      </InputField>

                      <InputField label="Password" icon="lock" error={errors.password}>
                        <input
                          style={{ ...inputStyle, paddingRight: 36 }}
                          type={showPassword ? "text" : "password"}
                          value={form.password}
                          onChange={(e) => update("password", e.target.value)}
                          placeholder="Min. 6 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            right: 14,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#a0a8b8",
                            display: "flex",
                          }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </InputField>

                      <InputField label="Confirm Password" icon="lock_reset" error={errors.confirmPassword}>
                        <input
                          style={{ ...inputStyle, paddingRight: 36 }}
                          type={showConfirm ? "text" : "password"}
                          value={form.confirmPassword}
                          onChange={(e) => update("confirmPassword", e.target.value)}
                          placeholder="Re-enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          style={{
                            position: "absolute",
                            right: 14,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#a0a8b8",
                            display: "flex",
                          }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                            {showConfirm ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </InputField>

                      {/* Password strength */}
                      {form.password && (
                        <div style={{ display: "flex", gap: 4 }}>
                          {["weak", "fair", "strong"].map((lvl, i) => {
                            const len = form.password.length;
                            const active = (i === 0 && len >= 1) || (i === 1 && len >= 8) || (i === 2 && len >= 12 && /[A-Z]/.test(form.password) && /[0-9]/.test(form.password));
                            const clr = i === 0 ? "#ef4444" : i === 1 ? "#f5a623" : "#10b981";
                            return (
                              <div key={lvl} style={{ flex: 1, height: 3, borderRadius: 99, background: active ? clr : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── STEP 2: PERSONAL ────────────────────────────────── */}
                  {step === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <div style={{ color: "#f5a623", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
                          Step 3 of 5
                        </div>
                        <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>
                          Personal information
                        </h2>
                        <p style={{ color: "#b0b8c8", fontSize: 15 }}>
                          Your contact details — used only for VanMate communications.
                        </p>
                      </div>

                      <InputField label="Full Name" icon="person" error={errors.name}>
                        <input style={inputStyle} type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" />
                      </InputField>

                      <InputField label="Email Address" icon="mail" error={errors.email}>
                        <input style={inputStyle} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
                      </InputField>

                      <InputField label="Phone Number" icon="phone" error={errors.phone}>
                        <input style={inputStyle} type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10-digit mobile number" maxLength={10} />
                      </InputField>

                      <InputField label="City" icon="location_city" error={errors.city}>
                        <input style={inputStyle} type="text" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="e.g. Mumbai, Bangalore" />
                      </InputField>

                      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                        <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8cdd8" }}>
                          Address
                        </label>
                        <div style={{ position: "relative", background: "rgba(255,255,255,0.07)", border: `1.5px solid ${errors.address ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.18)"}`, borderRadius: 14, padding: "13px 16px 13px 48px", transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s" }}
                          onFocusCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,166,35,0.8)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px rgba(245,166,35,0.12)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.09)"; }}
                          onBlurCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = errors.address ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)"; }}
                        >
                          <span className="material-symbols-outlined" style={{ position: "absolute", left: 14, top: 14, color: "#a0a8b8", fontSize: 20 }}>home</span>
                          <textarea
                            value={form.address}
                            onChange={(e) => update("address", e.target.value)}
                            rows={3}
                            placeholder="Flat/House No., Street, Area, Pincode"
                            style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
                          />
                        </div>
                        {errors.address && <span style={{ color: "#f87171", fontSize: 12, fontWeight: 600 }}>{errors.address}</span>}
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3: DETAILS (role-specific) ─────────────────── */}
                  {step === 3 && form.role === "parent" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <div style={{ color: "#f5a623", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Step 4 of 5</div>
                        <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>Student details</h2>
                        <p style={{ color: "#b0b8c8", fontSize: 15 }}>Tell us about your child so we can find the right van.</p>
                      </div>

                      <InputField label="Student Name" icon="child_care" error={errors.studentName}>
                        <input style={inputStyle} type="text" value={form.studentName} onChange={(e) => update("studentName", e.target.value)} placeholder="Child's full name" />
                      </InputField>

                      <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <InputField label="Class / Standard" icon="school" error={errors.studentStandard}>
                          <input style={inputStyle} type="text" value={form.studentStandard} onChange={(e) => update("studentStandard", e.target.value)} placeholder="e.g. 5th, Grade 8" />
                        </InputField>
                        <InputField label="Age (years)" icon="cake" error={errors.studentAge}>
                          <input style={inputStyle} type="number" value={form.studentAge} onChange={(e) => update("studentAge", e.target.value)} placeholder="e.g. 10" min={3} max={18} />
                        </InputField>
                      </div>

                      <InputField label="School Name" icon="apartment" error={errors.schoolName}>
                        <input style={inputStyle} type="text" value={form.schoolName} onChange={(e) => update("schoolName", e.target.value)} placeholder="Full name of the school" />
                      </InputField>

                      <div style={{ background: "rgba(245,166,35,0.06)", border: "1px solid rgba(245,166,35,0.2)", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span className="material-symbols-outlined" style={{ color: "#f5a623", fontSize: 20, marginTop: 1, flexShrink: 0 }}>info</span>
                        <p style={{ color: "#e8c880", fontSize: 13, lineHeight: 1.6 }}>
                          After registration, you can browse available vans near your school and submit a booking request. Additional students can be added from your dashboard.
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 3 && form.role === "owner" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <div style={{ color: "#4fc3f7", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Step 4 of 5</div>
                        <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>Driver details</h2>
                        <p style={{ color: "#b0b8c8", fontSize: 15 }}>Tell us about your driving credentials.</p>
                      </div>

                      {/* Vehicle ownership toggle */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8cdd8" }}>Do you own a vehicle?</label>
                        {errors.hasVehicle && <span style={{ color: "#f87171", fontSize: 12, fontWeight: 600 }}>{errors.hasVehicle}</span>}
                        <div className="has-vehicle-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                          {([{val:"yes",icon:"directions_bus",label:"Yes, I own a vehicle",desc:"Register your vehicle"},{val:"no",icon:"assignment_ind",label:"No, need one assigned",desc:"Company will assign"}] as const).map(({val,icon,label,desc})=>(
                            <button key={val} type="button" onClick={()=>update("hasVehicle",val)} style={{ padding:"16px 14px", borderRadius:16, border:`2px solid ${form.hasVehicle===val?"rgba(79,195,247,0.7)":"rgba(255,255,255,0.12)"}`, background:form.hasVehicle===val?"rgba(79,195,247,0.10)":"rgba(255,255,255,0.04)", color:form.hasVehicle===val?"#4fc3f7":"#9aa2b2", cursor:"pointer", textAlign:"left", transition:"all 0.2s", display:"flex", flexDirection:"column", gap:6, boxShadow:form.hasVehicle===val?"0 0 0 4px rgba(79,195,247,0.08)":"none" }}>
                              <span className="material-symbols-outlined" style={{ fontSize:24, fontVariationSettings:"'FILL' 1" }}>{icon}</span>
                              <span style={{ fontWeight:700, fontSize:13 }}>{label}</span>
                              <span style={{ fontSize:11, opacity:0.7 }}>{desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Vehicle fields - only if owns vehicle */}
                      {form.hasVehicle === "yes" && (
                        <div style={{ display:"flex", flexDirection:"column", gap:16, padding:"18px 16px", borderRadius:16, border:"1px solid rgba(79,195,247,0.2)", background:"rgba(79,195,247,0.04)" }}>
                          <div style={{ fontSize:12, fontWeight:700, color:"#4fc3f7", letterSpacing:"0.1em", textTransform:"uppercase" }}>Vehicle Information</div>
                          <InputField label="Vehicle Registration Number" icon="directions_bus" error={errors.vehicleNumber}>
                            <input style={inputStyle} type="text" value={form.vehicleNumber} onChange={(e)=>update("vehicleNumber",e.target.value.toUpperCase())} placeholder="e.g. MH12AB1234" />
                          </InputField>
                          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                            <label style={{ fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#c8cdd8" }}>Vehicle Type</label>
                            <div className="vehicle-type-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                              {([{val:"Van",icon:"airport_shuttle",label:"Van"},{val:"Car",icon:"directions_car",label:"Car"},{val:"Traveller",icon:"directions_bus",label:"Traveller Bus"},{val:"E-Rickshaw",icon:"electric_rickshaw",label:"E-Rickshaw"}] as const).map(({val,icon,label})=>(
                                <button key={val} type="button" onClick={()=>update("vehicleType",val)} style={{ padding:"12px 10px", borderRadius:12, border:`1.5px solid ${form.vehicleType===val?"rgba(79,195,247,0.7)":"rgba(255,255,255,0.12)"}`, background:form.vehicleType===val?"rgba(79,195,247,0.12)":"rgba(255,255,255,0.04)", color:form.vehicleType===val?"#4fc3f7":"#9aa2b2", cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontWeight:600, fontSize:13, transition:"all 0.2s" }}>
                                  <span className="material-symbols-outlined" style={{ fontSize:18 }}>{icon}</span>{label}
                                </button>
                              ))}
                            </div>
                            {errors.vehicleType && <span style={{ color:"#f87171", fontSize:12, fontWeight:600 }}>{errors.vehicleType}</span>}
                          </div>
                        </div>
                      )}

                      {form.hasVehicle === "no" && (
                        <div style={{ background:"rgba(245,166,35,0.06)", border:"1px solid rgba(245,166,35,0.2)", borderRadius:14, padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start" }}>
                          <span className="material-symbols-outlined" style={{ color:"#f5a623", fontSize:20, marginTop:1, flexShrink:0 }}>info</span>
                          <p style={{ color:"#e8c880", fontSize:13, lineHeight:1.6 }}>No problem! After verification, a vehicle will be assigned to you by VanMate. You can update vehicle details from your dashboard anytime.</p>
                        </div>
                      )}

                      {/* Licence fields — shown once user picks yes/no */}
                      {form.hasVehicle !== "" && (
                        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                          <div style={{ fontSize:12, fontWeight:700, color:"#b0b8c8", letterSpacing:"0.1em", textTransform:"uppercase", borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:16 }}>Driving Licence Details</div>
                          <InputField label="Driving Licence Number" icon="id_card" error={errors.licenseNumber}>
                            <input style={inputStyle} type="text" value={form.licenseNumber} onChange={(e)=>update("licenseNumber",e.target.value.toUpperCase())} placeholder="e.g. MH0120110012345" />
                          </InputField>
                          <div className="two-col-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                              <label style={{ fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#c8cdd8" }}>Issue Date</label>
                              <div style={{ position:"relative", background:"rgba(255,255,255,0.07)", border:`1.5px solid ${errors.licenseStartDate?"rgba(239,68,68,0.6)":"rgba(255,255,255,0.18)"}`, borderRadius:14, padding:"13px 16px 13px 48px" }}
                                onFocusCapture={(e)=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(245,166,35,0.8)";(e.currentTarget as HTMLDivElement).style.boxShadow="0 0 0 3px rgba(245,166,35,0.12)";}}
                                onBlurCapture={(e)=>{(e.currentTarget as HTMLDivElement).style.borderColor=errors.licenseStartDate?"rgba(239,68,68,0.6)":"rgba(255,255,255,0.18)";(e.currentTarget as HTMLDivElement).style.boxShadow="none";}}>
                                <span className="material-symbols-outlined" style={{ position:"absolute", left:14, color:"#a0a8b8", fontSize:20 }}>event</span>
                                <input style={{...inputStyle,colorScheme:"dark"}} type="date" value={form.licenseStartDate} onChange={(e)=>update("licenseStartDate",e.target.value)} />
                              </div>
                              {errors.licenseStartDate && <span style={{ color:"#f87171", fontSize:12, fontWeight:600 }}>{errors.licenseStartDate}</span>}
                            </div>
                            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                              <label style={{ fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#c8cdd8" }}>Expiry Date</label>
                              <div style={{ position:"relative", background:"rgba(255,255,255,0.07)", border:`1.5px solid ${errors.licenseEndDate?"rgba(239,68,68,0.6)":"rgba(255,255,255,0.18)"}`, borderRadius:14, padding:"13px 16px 13px 48px" }}
                                onFocusCapture={(e)=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(245,166,35,0.8)";(e.currentTarget as HTMLDivElement).style.boxShadow="0 0 0 3px rgba(245,166,35,0.12)";}}
                                onBlurCapture={(e)=>{(e.currentTarget as HTMLDivElement).style.borderColor=errors.licenseEndDate?"rgba(239,68,68,0.6)":"rgba(255,255,255,0.18)";(e.currentTarget as HTMLDivElement).style.boxShadow="none";}}>
                                <span className="material-symbols-outlined" style={{ position:"absolute", left:14, color:"#a0a8b8", fontSize:20 }}>event_busy</span>
                                <input style={{...inputStyle,colorScheme:"dark"}} type="date" value={form.licenseEndDate} onChange={(e)=>update("licenseEndDate",e.target.value)} />
                              </div>
                              {errors.licenseEndDate && <span style={{ color:"#f87171", fontSize:12, fontWeight:600 }}>{errors.licenseEndDate}</span>}
                            </div>
                          </div>
                          <InputField label="Years of Driving Experience" icon="workspace_premium" error={errors.yearsOfExperience}>
                            <input style={inputStyle} type="number" value={form.yearsOfExperience} onChange={(e)=>update("yearsOfExperience",e.target.value)} placeholder="e.g. 5" min={0} max={60} />
                          </InputField>
                        </div>
                      )}

                      <div style={{ background:"rgba(79,195,247,0.06)", border:"1px solid rgba(79,195,247,0.2)", borderRadius:14, padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start" }}>
                        <span className="material-symbols-outlined" style={{ color:"#4fc3f7", fontSize:20, marginTop:1, flexShrink:0 }}>verified_user</span>
                        <p style={{ color:"#9dd4e8", fontSize:13, lineHeight:1.6 }}>Your licence details will be verified by our admin team within 24–48 hours. You will be notified once approved.</p>
                      </div>
                    </div>
                  )}

                  {step === 3 && form.role === "school" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <div style={{ color: "#10b981", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Step 4 of 5</div>
                        <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>School details</h2>
                        <p style={{ color: "#b0b8c8", fontSize: 15 }}>Tell us about your institution so we can set up your transport plan.</p>
                      </div>

                      <InputField label="Official School Name" icon="account_balance" error={errors.schoolOfficialName}>
                        <input style={inputStyle} type="text" value={form.schoolOfficialName} onChange={(e) => update("schoolOfficialName", e.target.value)} placeholder="e.g. Delhi Public School, Sector 24" />
                      </InputField>

                      <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <InputField label="Affiliated Board" icon="verified" error={errors.schoolBoard}>
                          <input style={inputStyle} type="text" value={form.schoolBoard} onChange={(e) => update("schoolBoard", e.target.value)} placeholder="CBSE / ICSE / State Board" />
                        </InputField>
                        <InputField label="Total Students" icon="groups" error={errors.schoolTotalStudents}>
                          <input style={inputStyle} type="number" value={form.schoolTotalStudents} onChange={(e) => update("schoolTotalStudents", e.target.value)} placeholder="e.g. 800" min={1} />
                        </InputField>
                      </div>

                      <InputField label="Principal / Contact Person Name" icon="person_pin" error={errors.principalName}>
                        <input style={inputStyle} type="text" value={form.principalName} onChange={(e) => update("principalName", e.target.value)} placeholder="Full name of principal or coordinator" />
                      </InputField>

                      <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span className="material-symbols-outlined" style={{ color: "#10b981", fontSize: 20, marginTop: 1, flexShrink: 0 }}>info</span>
                        <p style={{ color: "#7dd8ae", fontSize: 13, lineHeight: 1.6 }}>
                          After registration, our team will contact you to understand your transport requirements and assign verified van operators for your students.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 4: REVIEW ──────────────────────────────────── */}
                  {step === 4 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                      <div>
                        <div style={{ color: "#f5a623", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Step 5 of 5</div>
                        <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>Review & confirm</h2>
                        <p style={{ color: "#b0b8c8", fontSize: 15 }}>Please verify your details before submitting.</p>
                      </div>

                      {/* Summary cards */}
                      {[
                        {
                          title: "Account",
                          icon: "manage_accounts",
                          fields: [
                            { label: "Role", value: form.role === "parent" ? "👨‍👩‍👧 Parent / Guardian" : form.role === "owner" ? "🚐 Van Owner / Driver" : "🏫 School / Institution" },
                            { label: "User ID", value: form.userId },
                            { label: "Password", value: "••••••••" },
                          ],
                        },
                        {
                          title: "Personal",
                          icon: "person",
                          fields: [
                            { label: "Name", value: form.name },
                            { label: "Email", value: form.email },
                            { label: "Phone", value: form.phone },
                            { label: "City", value: form.city },
                            { label: "Address", value: form.address },
                          ],
                        },
                        ...(form.role === "parent"
                          ? [
                              {
                                title: "Student",
                                icon: "child_care",
                                fields: [
                                  { label: "Name", value: form.studentName },
                                  { label: "Class", value: form.studentStandard },
                                  { label: "Age", value: form.studentAge },
                                  { label: "School", value: form.schoolName },
                                ],
                              },
                            ]
                          : form.role === "owner"
                          ? [
                              {
                                title: "Driver",
                                icon: "directions_bus",
                                fields: [
                                  { label: "Owns Vehicle", value: form.hasVehicle === "yes" ? "Yes" : "No (to be assigned)" },
                                  ...(form.hasVehicle === "yes" ? [
                                    { label: "Reg. No.", value: form.vehicleNumber },
                                    { label: "Type", value: form.vehicleType },
                                  ] : []),
                                  { label: "Licence No.", value: form.licenseNumber },
                                  { label: "Issue Date", value: form.licenseStartDate },
                                  { label: "Expiry Date", value: form.licenseEndDate },
                                  { label: "Experience", value: form.yearsOfExperience ? `${form.yearsOfExperience} yrs` : "" },
                                ],
                              },
                            ]
                          : [
                              {
                                title: "Institution",
                                icon: "account_balance",
                                fields: [
                                  { label: "School Name", value: form.schoolOfficialName },
                                  { label: "Board", value: form.schoolBoard },
                                  { label: "Total Students", value: form.schoolTotalStudents },
                                  { label: "Principal", value: form.principalName },
                                ],
                              },
                            ]),
                      ].map((sec) => (
                        <div
                          key={sec.title}
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.14)",
                            borderRadius: 16,
                            padding: "18px 20px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                            <span className="material-symbols-outlined" style={{ color: "#f5a623", fontSize: 18, fontVariationSettings: "'FILL' 1" }}>{sec.icon}</span>
                            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{sec.title}</span>
                          </div>
                          <div className="review-fields-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
                            {sec.fields.map((f) => (
                              <div key={f.label}>
                                <div style={{ color: "#9aa2b2", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{f.label}</div>
                                <div style={{ color: "#f0f2f5", fontSize: 14, fontWeight: 500, wordBreak: "break-all" }}>{f.value || <span style={{ color: "#5a607a" }}>—</span>}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "14px 16px" }}>
                        <span className="material-symbols-outlined" style={{ color: "#10b981", fontSize: 20, flexShrink: 0 }}>verified_user</span>
                        <p style={{ color: "#8cd8b2", fontSize: 13, lineHeight: 1.6 }}>
                          By registering, you agree to VanMate's Terms of Service and Privacy Policy. Your data is stored securely and never sold to third parties.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {apiError && (
                  <div style={{ marginTop: 20, padding: 12, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, display: "flex", gap: 10, alignItems: "center" }}>
                    <span className="material-symbols-outlined" style={{ color: "#ef4444", fontSize: 20 }}>error</span>
                    <span style={{ color: "#fca5a5", fontSize: 14, fontWeight: 600 }}>{apiError}</span>
                  </div>
                )}

                {/* ── NAV BUTTONS ────────────────────────────────────────── */}
                <div
                  className="nav-buttons"
                  style={{
                    display: "flex",
                    gap: 12,
                    marginTop: 32,
                    paddingTop: 24,
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      style={{
                        padding: "13px 28px",
                        borderRadius: 999,
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        background: "transparent",
                        border: "1.5px solid rgba(255,255,255,0.15)",
                        color: "#b0b8c8",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#f5a623";
                        (e.currentTarget as HTMLButtonElement).style.color = "#f5a623";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#b0b8c8";
                      }}
                    >
                      ← Back
                    </button>
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={next}
                      style={{
                        flex: 1,
                        padding: "14px 28px",
                        borderRadius: 999,
                        fontSize: 16,
                        fontWeight: 800,
                        cursor: "pointer",
                        background: "linear-gradient(135deg,#f5a623,#ffb95f)",
                        border: "none",
                        color: "#1a0800",
                        boxShadow: "0 0 28px rgba(245,166,35,0.35)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform = "";
                      }}
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit as any}
                      disabled={loading}
                      style={{
                        flex: 1,
                        padding: "14px 28px",
                        borderRadius: 999,
                        fontSize: 16,
                        fontWeight: 800,
                        cursor: loading ? "not-allowed" : "pointer",
                        background: loading ? "#2d3748" : "linear-gradient(135deg,#10b981,#34d399)",
                        border: "none",
                        color: loading ? "#718096" : "#002210",
                        boxShadow: loading ? "none" : "0 0 28px rgba(16,185,129,0.35)",
                        transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform = "";
                      }}
                    >
                      ✓ Create Account
                    </button>
                  )}
                </div>

                {/* Already have account */}
                {step === 0 && (
                  <p style={{ textAlign: "center", color: "#6a7080", fontSize: 14, marginTop: 16 }}>
                    Already have an account?{" "}
                    <Link href="/login" style={{ color: "#f5a623", fontWeight: 700, textDecoration: "none" }}>
                      Sign In
                    </Link>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
