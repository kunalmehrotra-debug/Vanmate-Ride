"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";

const ScrollAnimation = dynamic(() => import("../components/ScrollAnimation"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100vh", background: "#101415", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", border: "4px solid #f5a623", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
    </div>
  ),
});

function FadeUp({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function FeatureCard({ feat }: { feat: any }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="glass"
      style={{
        borderRadius: 20,
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transform: hover ? "translateY(-8px)" : "translateY(0)",
        borderColor: hover ? feat.color : "rgba(255,255,255,0.1)",
        boxShadow: hover ? `0 12px 40px ${feat.color}30` : "none",
        background: hover ? `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, ${feat.color}10 100%)` : "rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          background: hover ? feat.color : feat.glow,
          border: `1px solid ${hover ? "rgba(255,255,255,0.5)" : feat.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          transition: "all 0.3s ease",
          transform: hover ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
          boxShadow: hover ? `0 0 20px ${feat.color}60` : "none",
        }}
      >
        <span style={{ transition: "all 0.3s", filter: hover ? "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" : "none" }}>{feat.icon}</span>
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>{feat.title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0, flexGrow: 1, transition: "color 0.3s", color: hover ? "#e0e3e5" : "#8a8a9a" }}>{feat.desc}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: feat.color,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.04em",
          transition: "all 0.3s ease",
        }}
      >
        Learn more <span style={{ transition: "transform 0.3s", transform: hover ? "translateX(4px)" : "translateX(0)" }}>→</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Spacer is 280vh — keep navbar transparent until user scrolls past the animation
      const animationEnd = window.innerHeight * 2.8;
      setScrolled(window.scrollY > animationEnd);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#101415", color: "#e0e3e5", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        
        .glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .card-hover {
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s, transform 0.3s;
        }
        .card-hover:hover {
          border-color: rgba(245,166,35,0.4) !important;
          box-shadow: 0 8px 40px rgba(245,166,35,0.1);
          background: rgba(255,255,255,0.08) !important;
          transform: translateY(-4px);
        }
        .btn-primary {
          background: linear-gradient(135deg, #f5a623 0%, #ffb95f 100%);
          color: #1a0800;
          padding: 15px 36px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 0 32px rgba(245,166,35,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          transform: scale(1.04);
          box-shadow: 0 0 50px rgba(245,166,35,0.65);
        }
        .btn-ghost {
          background: rgba(255,255,255,0.06);
          color: #e0e3e5;
          padding: 15px 36px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.18);
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.3);
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-green {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
          70% { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
        }
        .pulse-green { animation: pulse-green 2s infinite; }

        /* ── Responsive ── */
        .nav-links { display: flex; gap: 32px; align-items: center; }
        .mobile-menu { display: none; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex !important; }
          .mobile-menu-open { display: flex; flex-direction: column; gap: 20px; padding: 24px 20px; background: rgba(11,15,16,0.97); border-top: 1px solid rgba(255,255,255,0.08); }
          .hero-buttons { flex-direction: column; align-items: center; }
          .features-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .pricing-featured { transform: scale(1) !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-brand { grid-column: 1 / -1; }
          section { padding: 80px 20px !important; }
          .cta-box { padding: 48px 24px !important; }
          h2 { font-size: clamp(1.8rem, 6vw, 3rem) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000, transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s", background: scrolled ? "rgba(11,15,16,0.88)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", WebkitBackdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: 900, fontSize: 22, color: "#f5a623", letterSpacing: "-0.02em" }}>Van</span>
            <span style={{ fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: "-0.02em" }}>Mate</span>
          </Link>
          {/* Desktop nav */}
          <div className="nav-links">
            {[{ label: "How it Works", href: "#how-it-works" }, { label: "Pricing", href: "#pricing" }].map((item) => (
              <a key={item.label} href={item.href} style={{ color: "#c6c6cd", textDecoration: "none", fontSize: 15, fontWeight: 500 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#c6c6cd"; }}>
                {item.label}
              </a>
            ))}
            <Link href="/register" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", backdropFilter: "blur(10px)", transition: "background 0.2s" }}>
              Sign In
            </Link>
          </div>
          {/* Mobile hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, flexDirection: "column", gap: 5 }}>
            <div style={{ width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
            <div style={{ width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
            <div style={{ width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu-open">
            <a href="#how-it-works" onClick={() => setMenuOpen(false)} style={{ color: "#e0e3e5", textDecoration: "none", fontSize: 18, fontWeight: 600 }}>How it Works</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ color: "#e0e3e5", textDecoration: "none", fontSize: 18, fontWeight: 600 }}>Pricing</a>
            <Link href="/register" onClick={() => setMenuOpen(false)} style={{ background: "linear-gradient(135deg,#f5a623,#ffb95f)", color: "#1a0800", padding: "14px 28px", borderRadius: 999, fontSize: 16, fontWeight: 800, textDecoration: "none", textAlign: "center" }}>
              Book a Seat
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: "#101415", margin: 0, padding: 0 }}>
        <ScrollAnimation />
      </section>

      {/* ── FEATURES ── */}
      <section id="how-it-works" style={{ position: "relative", padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)", background: "#0a0d10", overflow: "hidden", zIndex: 1 }}>
        <style>{`
          .features-header-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
          .features-header-desc { max-width: 380px; flex: 0 0 auto; }
          .bento-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
          .bento-big { grid-row: span 2; min-height: 440px; }
          @media (max-width: 1024px) {
            .features-header-row { flex-direction: column; align-items: flex-start; }
            .features-header-desc { max-width: 100%; }
            .bento-grid { grid-template-columns: 1fr 1fr; }
            .bento-big { grid-row: span 1; min-height: unset; grid-column: span 2; }
          }
          @media (max-width: 640px) {
            .bento-grid { grid-template-columns: 1fr; }
            .bento-big { grid-column: span 1; }
          }
        `}</style>
        {/* Dot grid background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,195,247,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <FadeUp>
            <div style={{ marginBottom: 64 }}>
              <span style={{ color: "#f5a623", fontWeight: 700, letterSpacing: "0.2em", fontSize: 11, textTransform: "uppercase", display: "block", marginBottom: 16 }}>WHY VANMATE</span>
              <div className="features-header-row">
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                  Engineered for<br /><span style={{ color: "#f5a623" }}>Peace of Mind.</span>
                </h2>
                <p className="features-header-desc" style={{ color: "#6a7080", fontSize: 16, lineHeight: 1.8, margin: 0 }}>
                  Every feature is built around one mission: getting your child to school safely, every single day.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Bento Grid */}
          <div className="bento-grid">

            {/* BIG card — Smart Booking (spans 2 rows on left) */}
            <FadeUp delay={0}>
              <div className="bento-big" style={{
                background: "linear-gradient(160deg, rgba(245,166,35,0.1) 0%, rgba(20,22,28,0.9) 60%)",
                border: "1px solid rgba(245,166,35,0.25)",
                borderRadius: 28, padding: "clamp(28px, 4vw, 48px) clamp(24px, 3vw, 40px)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                position: "relative", overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 60px rgba(245,166,35,0.15)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
              >
                {/* Top accent bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #f5a623, #ffb95f, transparent)" }} />
                {/* Number watermark */}
                <div style={{ position: "absolute", bottom: -20, right: -10, fontSize: 180, fontWeight: 900, color: "rgba(245,166,35,0.04)", lineHeight: 1, userSelect: "none" }}>01</div>

                <div>
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, marginBottom: 28, boxShadow: "0 0 30px rgba(245,166,35,0.2)" }}>📅</div>
                  <div style={{ color: "#f5a623", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Smart Booking</div>
                  <h3 style={{ color: "#fff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>One tap to book your child's seat</h3>
                  <p style={{ color: "#6a7080", fontSize: 15, lineHeight: 1.8, margin: 0 }}>AI-optimized scheduling adapts to your child's timetable. Book a seat in seconds — one tap, one confirmation. No calls, no hassle.</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 32 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f5a623", boxShadow: "0 0 8px #f5a623", animation: "pulse 2s infinite" }} />
                  <span style={{ color: "#f5a623", fontSize: 13, fontWeight: 600 }}>Available on iOS & Android</span>
                </div>
              </div>
            </FadeUp>

            {/* Card 2 — GPS Tracking */}
            <FadeUp delay={0.1}>
              <div style={{
                background: "linear-gradient(160deg, rgba(79,195,247,0.1) 0%, rgba(14,18,24,0.95) 60%)",
                border: "1px solid rgba(79,195,247,0.25)",
                borderRadius: 28, padding: "36px 32px",
                position: "relative", overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 60px rgba(79,195,247,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #4fc3f7, #38bdf8, transparent)" }} />
                <div style={{ position: "absolute", bottom: -20, right: -10, fontSize: 140, fontWeight: 900, color: "rgba(79,195,247,0.04)", lineHeight: 1, userSelect: "none" }}>02</div>

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(79,195,247,0.12)", border: "1px solid rgba(79,195,247,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: "0 0 24px rgba(79,195,247,0.2)" }}>📍</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(79,195,247,0.1)", border: "1px solid rgba(79,195,247,0.2)", borderRadius: 999, padding: "4px 12px" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4fc3f7", boxShadow: "0 0 6px #4fc3f7" }} />
                    <span style={{ color: "#4fc3f7", fontSize: 11, fontWeight: 700 }}>LIVE</span>
                  </div>
                </div>
                <div style={{ color: "#4fc3f7", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>Live GPS Tracking</div>
                <h3 style={{ color: "#fff", fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: 800, margin: "0 0 12px", lineHeight: 1.3, letterSpacing: "-0.01em" }}>Watch every journey in real-time</h3>
                <p style={{ color: "#6a7080", fontSize: 14, lineHeight: 1.7, margin: 0 }}>Instant push notifications when the vehicle is 5 minutes away. Always know where your child is.</p>
              </div>
            </FadeUp>

            {/* Card 3 — Verified Handoff */}
            <FadeUp delay={0.2}>
              <div style={{
                background: "linear-gradient(160deg, rgba(16,185,129,0.1) 0%, rgba(14,18,24,0.95) 60%)",
                border: "1px solid rgba(16,185,129,0.25)",
                borderRadius: 28, padding: "36px 32px",
                position: "relative", overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 60px rgba(16,185,129,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #10b981, #34d399, transparent)" }} />
                <div style={{ position: "absolute", bottom: -20, right: -10, fontSize: 140, fontWeight: 900, color: "rgba(16,185,129,0.04)", lineHeight: 1, userSelect: "none" }}>03</div>

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: "0 0 24px rgba(16,185,129,0.2)" }}>🛡️</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 999, padding: "4px 12px" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
                    <span style={{ color: "#10b981", fontSize: 11, fontWeight: 700 }}>VERIFIED</span>
                  </div>
                </div>
                <div style={{ color: "#10b981", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>Verified Handoff</div>
                <h3 style={{ color: "#fff", fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: 800, margin: "0 0 12px", lineHeight: 1.3, letterSpacing: "-0.01em" }}>Biometric confirmed drop-offs</h3>
                <p style={{ color: "#6a7080", fontSize: 14, lineHeight: 1.7, margin: 0 }}>Every drop-off is logged and confirmed to you instantly. Rigorous driver verification with biometric check-ins.</p>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "clamp(60px,10vw,100px) clamp(20px,5vw,60px)", overflow: "hidden", background: "linear-gradient(135deg, #0d1117 0%, #101e1a 50%, #0d1117 100%)" }}>
        <style>{`
          .stats-responsive-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1100px; margin: 0 auto; }
          .testimonials-responsive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
          .pricing-responsive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: start; max-width: 1000px; margin: 0 auto; padding: 24px 0; }
          .footer-responsive-grid { display: grid; grid-template-columns: 2.2fr 1fr 1fr 1fr; gap: 40px 32px; margin-bottom: 52px; }
          .cta-box-inner { padding: 72px 56px; }
          @media (max-width: 1024px) {
            .stats-responsive-grid { grid-template-columns: repeat(2, 1fr); }
            .pricing-responsive-grid { grid-template-columns: repeat(2, 1fr); }
            .footer-responsive-grid { grid-template-columns: 1fr 1fr; }
          }
          @media (max-width: 640px) {
            .stats-responsive-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
            .testimonials-responsive-grid { grid-template-columns: 1fr; }
            .pricing-responsive-grid { grid-template-columns: 1fr; }
            .pricing-featured-card { transform: none !important; }
            .footer-responsive-grid { grid-template-columns: 1fr; gap: 32px; }
            .cta-box-inner { padding: 40px 24px; }
            .footer-bottom-row { flex-direction: column; align-items: flex-start !important; }
          }
        `}</style>

        <div style={{ position: "absolute", top: "50%", left: "10%", transform: "translateY(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", right: "10%", transform: "translateY(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ color: "#f5a623", fontWeight: 700, letterSpacing: "0.18em", fontSize: 11, textTransform: "uppercase" }}>BY THE NUMBERS</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", margin: "12px 0 0", letterSpacing: "-0.02em" }}>
              Numbers that <span style={{ color: "#f5a623" }}>speak for themselves.</span>
            </h2>
          </div>
        </FadeUp>

        <div className="stats-responsive-grid">
          {[
            { val: "10K+",   label: "Rides Completed",   icon: "🚐", color: "#f5a623", glow: "rgba(245,166,35,0.15)",  border: "rgba(245,166,35,0.3)",  desc: "Safe school rides and counting" },
            { val: "2,500+", label: "Families Enrolled", icon: "👨‍👩‍👧", color: "#4fc3f7", glow: "rgba(79,195,247,0.12)",  border: "rgba(79,195,247,0.3)",   desc: "Families trusting VanMate daily" },
            { val: "99.8%",  label: "On-Time Rate",      icon: "⏱️", color: "#10b981", glow: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)",  desc: "Arrivals on schedule, every day" },
            { val: "4.9★",   label: "Parent Rating",     icon: "⭐", color: "#e879f9", glow: "rgba(232,121,249,0.12)", border: "rgba(232,121,249,0.3)", desc: "Average rating from 2,500+ parents" },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.1}>
              <div
                style={{ position: "relative", background: "rgba(255,255,255,0.03)", border: `1px solid ${s.border}`, borderRadius: 24, padding: "clamp(24px,3vw,36px) clamp(16px,2vw,28px)", textAlign: "center", overflow: "hidden", backdropFilter: "blur(12px)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px ${s.color}30`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 3, background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`, borderRadius: "0 0 4px 4px" }} />
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${s.glow} 0%, transparent 65%)`, pointerEvents: "none" }} />
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.glow, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 16px", boxShadow: `0 4px 20px ${s.color}30` }}>{s.icon}</div>
                <div style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 900, color: s.color, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 6, position: "relative" }}>{s.val}</div>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 6, position: "relative" }}>{s.label}</div>
                <div style={{ color: "#6a7080", fontSize: 12, lineHeight: 1.5, position: "relative" }}>{s.desc}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "clamp(60px,10vw,100px) clamp(20px,5vw,60px)", background: "#0a0d10", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, left: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,195,247,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span style={{ color: "#4fc3f7", fontWeight: 700, letterSpacing: "0.18em", fontSize: 11, textTransform: "uppercase" }}>TESTIMONIALS</span>
              <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: "#fff", margin: "12px 0 12px", letterSpacing: "-0.02em" }}>Trusted by <span style={{ color: "#4fc3f7" }}>Parents.</span></h2>
              <p style={{ color: "#6a7080", fontSize: 16, margin: 0 }}>Real stories from real families across India.</p>
            </div>
          </FadeUp>
          <div className="testimonials-responsive-grid">
            {[
              { name: "Priya Sharma",  role: "Mother of 2 · Mumbai",    avatar: "PS", color: "#f5a623", quote: "VanMate completely transformed our morning routine. I know exactly where the van is and I get a notification the moment my kids board. Absolute peace of mind." },
              { name: "Rahul Mehta",   role: "Father · Bangalore",       avatar: "RM", color: "#4fc3f7", quote: "The live tracking is incredible. I can watch the route in real time. The drivers are always verified and professional. Best investment for my child's safety." },
              { name: "Anita Desai",   role: "Parent · Delhi NCR",       avatar: "AD", color: "#10b981", quote: "I was skeptical at first but VanMate proved me wrong. The booking is instant and the customer support team is super responsive. Highly recommend!" },
            ].map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div
                  style={{ position: "relative", borderRadius: 24, padding: "clamp(24px,3vw,36px) clamp(20px,2.5vw,28px)", display: "flex", flexDirection: "column", gap: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", height: "100%" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = `0 20px 56px ${t.color}18`; el.style.borderColor = `${t.color}40`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ""; el.style.boxShadow = ""; el.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  {/* Top accent */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.color}, transparent)`, borderRadius: "24px 24px 0 0", opacity: 0.7 }} />
                  {/* Stars */}
                  <div style={{ display: "flex", gap: 3 }}>
                    {[...Array(5)].map((_, k) => <span key={k} style={{ color: "#f5a623", fontSize: 16 }}>★</span>)}
                  </div>
                  {/* Quote */}
                  <p style={{ color: "#b0b8c8", fontSize: 15, lineHeight: 1.8, margin: 0, fontStyle: "italic", flexGrow: 1 }}>"{t.quote}"</p>
                  {/* Author */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 18, display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${t.color}40, ${t.color}15)`, border: `2px solid ${t.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: t.color, flexShrink: 0 }}>{t.avatar}</div>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                      <div style={{ color: "#6a7080", fontSize: 12, marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ position: "relative", zIndex: 1, padding: "clamp(60px,10vw,100px) clamp(20px,5vw,60px)", background: "#101415", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -200, right: -100, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,195,247,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <span style={{ color: "#f5a623", fontWeight: 700, letterSpacing: "0.18em", fontSize: 11, textTransform: "uppercase" }}>PRICING</span>
              <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: "#fff", margin: "12px 0 8px", letterSpacing: "-0.02em" }}>Transparent Pricing.</h2>
              <p style={{ color: "#6a7080", fontSize: 17, margin: 0 }}>No hidden fees. No surprises. Ever.</p>
            </div>
          </FadeUp>

          <div className="pricing-responsive-grid">
            {/* Daily Pass */}
            <FadeUp delay={0}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "clamp(28px,3vw,40px) clamp(20px,2.5vw,32px)", display: "flex", flexDirection: "column", gap: 24, backdropFilter: "blur(12px)", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 16px 48px rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ""; el.style.boxShadow = ""; }}
              >
                <div>
                  <div style={{ color: "#6a7080", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Daily Pass</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: "clamp(2.5rem,5vw,3.2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>₹15</span>
                    <span style={{ color: "#6a7080", fontSize: 16 }}>/day</span>
                  </div>
                  <p style={{ color: "#6a7080", fontSize: 14, marginTop: 8, marginBottom: 0 }}>Perfect for occasional rides.</p>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Single ride bookings", "Real-time GPS tracking", "Standard support"].map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, color: "#b0b8c8", fontSize: 14 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f5a623", fontSize: 11, fontWeight: 900, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button style={{ width: "100%", padding: "14px 0", fontSize: 15, fontWeight: 700, marginTop: "auto", background: "transparent", border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: 999, color: "#fff", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#f5a623"; (e.currentTarget as HTMLButtonElement).style.color = "#f5a623"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                >Get Started</button>
              </div>
            </FadeUp>

            {/* Monthly Prime — Featured */}
            <FadeUp delay={0.1}>
              <div className="pricing-featured-card" style={{ position: "relative", background: "linear-gradient(160deg, rgba(245,166,35,0.12) 0%, rgba(16,18,24,0.95) 60%)", border: "1.5px solid rgba(245,166,35,0.5)", borderRadius: 24, padding: "clamp(28px,3vw,48px) clamp(20px,2.5vw,32px)", display: "flex", flexDirection: "column", gap: 24, boxShadow: "0 0 60px rgba(245,166,35,0.15), 0 24px 48px rgba(0,0,0,0.4)", transform: "translateY(-16px)", backdropFilter: "blur(16px)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #f5a623, #ffb95f, #f5a623)", borderRadius: "24px 24px 0 0" }} />
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#f5a623,#ffb95f)", color: "#1a0800", fontWeight: 800, fontSize: 11, padding: "6px 20px", borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>✦ Most Popular</div>
                <div>
                  <div style={{ color: "#f5a623", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Monthly Prime</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: "clamp(2.8rem,5.5vw,3.8rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>₹250</span>
                    <span style={{ color: "#8a8a9a", fontSize: 16 }}>/mo</span>
                  </div>
                  <p style={{ color: "#8a8a9a", fontSize: 14, marginTop: 8, marginBottom: 0 }}>The stress-free monthly standard.</p>
                </div>
                <div style={{ height: 1, background: "rgba(245,166,35,0.2)" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Guaranteed premium seat", "Priority 24/7 support", "Flexible schedule changes", "Multi-kid discount"].map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, color: "#e0e3e5", fontSize: 14 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(245,166,35,0.2)", border: "1px solid rgba(245,166,35,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f5a623", fontSize: 11, fontWeight: 900, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button style={{ width: "100%", padding: "16px 0", fontSize: 16, fontWeight: 800, marginTop: "auto", background: "linear-gradient(135deg, #f5a623 0%, #ffb95f 100%)", border: "none", borderRadius: 999, color: "#1a0800", cursor: "pointer", boxShadow: "0 0 32px rgba(245,166,35,0.4)", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 48px rgba(245,166,35,0.6)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ""; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 32px rgba(245,166,35,0.4)"; }}
                >Subscribe Monthly</button>
              </div>
            </FadeUp>

            {/* Term Elite */}
            <FadeUp delay={0.2}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "clamp(28px,3vw,40px) clamp(20px,2.5vw,32px)", display: "flex", flexDirection: "column", gap: 24, backdropFilter: "blur(12px)", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 16px 48px rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ""; el.style.boxShadow = ""; }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ color: "#6a7080", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Term Elite</div>
                    <div style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.3)", borderRadius: 999, padding: "3px 10px", color: "#e879f9", fontSize: 11, fontWeight: 700, marginBottom: 14 }}>Best Value</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: "clamp(2.5rem,5vw,3.2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>₹800</span>
                    <span style={{ color: "#6a7080", fontSize: 16 }}>/term</span>
                  </div>
                  <p style={{ color: "#6a7080", fontSize: 14, marginTop: 8, marginBottom: 0 }}>Total coverage for the school term.</p>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Full term coverage", "Dedicated driver", "VIP safety protocols", "Premium amenities"].map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, color: "#b0b8c8", fontSize: 14 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(232,121,249,0.15)", border: "1px solid rgba(232,121,249,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#e879f9", fontSize: 11, fontWeight: 900, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button style={{ width: "100%", padding: "14px 0", fontSize: 15, fontWeight: 700, marginTop: "auto", background: "transparent", border: "1.5px solid rgba(232,121,249,0.3)", borderRadius: 999, color: "#e879f9", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,121,249,0.1)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#e879f9"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(232,121,249,0.3)"; }}
                >Select Term</button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "clamp(60px,10vw,100px) clamp(20px,5vw,60px)", background: "#0a0d10", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <FadeUp>
          <div className="cta-box-inner" style={{ maxWidth: 860, margin: "0 auto", borderRadius: 32, textAlign: "center", position: "relative", zIndex: 1, background: "linear-gradient(160deg, rgba(245,166,35,0.1) 0%, rgba(14,18,24,0.9) 60%)", border: "1px solid rgba(245,166,35,0.2)", boxShadow: "0 0 80px rgba(245,166,35,0.1)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)", borderRadius: 999, padding: "6px 16px", marginBottom: 24 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#f5a623", boxShadow: "0 0 8px #f5a623" }} />
              <span style={{ color: "#f5a623", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>TRUSTED BY 2,500+ FAMILIES</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em" }}>
              Ready to experience VanMate?
            </h2>
            <p style={{ color: "#8a8a9a", fontSize: 17, maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.7 }}>
              Join thousands of families who trust VanMate for safe, reliable, and transparent school transport.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/register" style={{ background: "linear-gradient(135deg, #f5a623 0%, #ffb95f 100%)", color: "#1a0800", padding: "15px 36px", borderRadius: 999, fontSize: 16, fontWeight: 800, textDecoration: "none", display: "inline-block", boxShadow: "0 0 32px rgba(245,166,35,0.4)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; }}
              >Get Started Free →</Link>
              <a href="#how-it-works" style={{ padding: "15px 36px", borderRadius: 999, fontSize: 16, fontWeight: 700, textDecoration: "none", display: "inline-block", background: "transparent", border: "1.5px solid rgba(255,255,255,0.18)", color: "#fff", transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#f5a623"; (e.currentTarget as HTMLAnchorElement).style.color = "#f5a623"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
              >See How It Works</a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", zIndex: 1, background: "#06090a", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "clamp(40px,7vw,72px) clamp(20px,5vw,60px) clamp(20px,4vw,32px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-responsive-grid">
            {/* Brand */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: 900, fontSize: 26, color: "#f5a623" }}>Van</span>
                <span style={{ fontWeight: 900, fontSize: 26, color: "#fff" }}>Mate</span>
              </Link>
              <p style={{ color: "#6a7080", fontSize: 14, lineHeight: 1.8, maxWidth: 280, margin: 0 }}>
                Architecting the future of school transport. Transparent, reliable, and extraordinarily safe for discerning families.
              </p>
              {/* Status badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 999, padding: "6px 14px", width: "fit-content" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
                <span style={{ color: "#10b981", fontSize: 12, fontWeight: 600 }}>All systems operational</span>
              </div>
            </div>
            {/* Cols */}
            {[
              { title: "Company", links: ["About Us", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Safety Standards"] },
              { title: "Connect", links: ["Twitter", "LinkedIn", "Instagram"] },
            ].map((col) => (
              <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}>{col.title}</span>
                {col.links.map((l) => (
                  <Link key={l} href="#" style={{ color: "#6a7080", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#f5a623"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#6a7080"; }}>
                    {l}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="footer-bottom-row" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ color: "#3a3a4a", fontSize: 13 }}>© {new Date().getFullYear()} VanMate Technologies Inc. All rights reserved.</div>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy", "Terms", "Cookies"].map(l => (
                <Link key={l} href="#" style={{ color: "#3a3a4a", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#f5a623"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#3a3a4a"; }}
                >{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
