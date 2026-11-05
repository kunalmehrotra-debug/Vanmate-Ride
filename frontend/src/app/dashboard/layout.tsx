"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { role, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const roleLower = role?.toLowerCase() || "parent";

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      router.push("/login");
    }
    setMounted(true);

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [router]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const isActive = (path: string) => {
    if (path === `/dashboard/${roleLower}`) return pathname === path;
    return pathname.startsWith(path);
  };

  const navItems = [
    { label: "Dashboard", icon: "dashboard", href: `/dashboard/${roleLower}` },
    { label: "Book Vehicle", icon: "directions_bus", href: `/dashboard/${roleLower}/book` },
    { label: "Previous Bookings", icon: "history", href: `/dashboard/${roleLower}/bookings` },
    { label: "Track Vehicle", icon: "location_on", href: `/dashboard/${roleLower}/track` },
  ];

  const messageSubItems = [
    { label: "Send Message", icon: "send", href: `/dashboard/${roleLower}/messages/compose` },
    { label: "Inbox", icon: "inbox", href: `/dashboard/${roleLower}/messages/inbox` },
  ];

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0f1318; font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shimmer-sidebar { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes subtle-pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.7; } }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#0f1318" }}>

        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(4px)", zIndex: 998,
              animation: "fadeIn 0.2s ease",
            }}
          />
        )}

        {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
        <aside
          style={{
            width: 260,
            minWidth: 260,
            background: "linear-gradient(180deg, #0c1018 0%, #080c14 40%, #0a0e18 100%)",
            borderRight: "1px solid rgba(245,166,35,0.08)",
            display: "flex",
            flexDirection: "column",
            position: isMobile ? "fixed" : "sticky",
            top: 0,
            left: 0,
            bottom: isMobile ? 0 : undefined,
            height: "100vh",
            zIndex: 999,
            transform: isMobile && !sidebarOpen ? "translateX(-100%)" : "translateX(0)",
            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {/* Sidebar ambient glow */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 180, background: "radial-gradient(ellipse at 50% 0%, rgba(245,166,35,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "radial-gradient(ellipse at 50% 100%, rgba(239,68,68,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />

          {/* Brand */}
          <div style={{ padding: "28px 22px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: "#f5a623", fontVariationSettings: "'FILL' 1", filter: "drop-shadow(0 0 8px rgba(245,166,35,0.4))", marginRight: 6 }}>directions_bus</span>
              <span style={{ fontWeight: 900, fontSize: 24, background: "linear-gradient(135deg, #f5a623, #ffca57)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Van</span>
              <span style={{ fontWeight: 900, fontSize: 24, color: "#ffffff" }}>Mate</span>
            </Link>
            <div style={{
              marginTop: 14, display: "inline-flex", alignItems: "center", gap: 7,
              padding: "5px 14px", borderRadius: 20,
              background: "linear-gradient(135deg, rgba(245,166,35,0.1), rgba(245,166,35,0.04))",
              border: "1px solid rgba(245,166,35,0.18)",
              color: "#f5a623", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
              boxShadow: "0 0 12px rgba(245,166,35,0.06)",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>verified</span>
              {roleLower} portal
            </div>
            {/* Shimmer line under brand */}
            <div style={{ position: "absolute", bottom: 0, left: 22, right: 22, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.2), transparent)", backgroundSize: "200% 100%", animation: "shimmer-sidebar 4s infinite linear" }} />
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 12px 12px" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "12px 16px", borderRadius: 12,
                      background: active ? "rgba(245,166,35,0.12)" : "transparent",
                      color: active ? "#f5a623" : "rgba(255,255,255,0.5)",
                      fontSize: 14, fontWeight: active ? 600 : 500,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      }
                    }}
                  >
                    <span className="material-symbols-outlined" style={{
                      fontSize: 22,
                      color: active ? "#f5a623" : "rgba(255,255,255,0.35)",
                      fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                    }}>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}

              {/* Messages Dropdown */}
              <div>
                <div
                  onClick={() => setMessagesOpen(!messagesOpen)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "12px 16px", borderRadius: 12,
                    background: isActive(`/dashboard/${roleLower}/messages`) ? "rgba(245,166,35,0.12)" : "transparent",
                    color: isActive(`/dashboard/${roleLower}/messages`) ? "#f5a623" : "rgba(255,255,255,0.5)",
                    fontSize: 14, fontWeight: 500,
                    cursor: "pointer", userSelect: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(`/dashboard/${roleLower}/messages`)) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(`/dashboard/${roleLower}/messages`)) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    }
                  }}
                >
                  <span className="material-symbols-outlined" style={{
                    fontSize: 22,
                    color: isActive(`/dashboard/${roleLower}/messages`) ? "#f5a623" : "rgba(255,255,255,0.35)",
                    fontVariationSettings: isActive(`/dashboard/${roleLower}/messages`) ? "'FILL' 1" : "'FILL' 0",
                  }}>chat</span>
                  <span style={{ flex: 1 }}>Messages</span>
                  <span className="material-symbols-outlined" style={{
                    fontSize: 18,
                    transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                    transform: messagesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}>expand_more</span>
                </div>

                {/* Sub-items */}
                <div style={{
                  overflow: "hidden",
                  maxHeight: messagesOpen ? 100 : 0,
                  opacity: messagesOpen ? 1 : 0,
                  transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
                }}>
                  {messageSubItems.map((sub) => {
                    const subActive = isActive(sub.href);
                    return (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "9px 16px 9px 52px", borderRadius: 10,
                          color: subActive ? "#f5a623" : "rgba(255,255,255,0.4)",
                          fontSize: 13, fontWeight: 500,
                          textDecoration: "none",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!subActive) {
                            e.currentTarget.style.background = "rgba(245,166,35,0.06)";
                            e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!subActive) {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                          }
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{sub.icon}</span>
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Logout */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14, marginTop: 14 }}>
              <button
                onClick={handleLogout}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "12px 16px", borderRadius: 12,
                  background: "transparent", border: "none",
                  color: "#ef4444", fontSize: 14, fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer", width: "100%",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#ef4444" }}>logout</span>
                Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          minWidth: 0,
        }}>
          {/* Top Navbar */}
          <header style={{
            height: 68,
            background: "rgba(10,14,22,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.8)",
                    transition: "all 0.2s",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                    {sidebarOpen ? "close" : "menu"}
                  </span>
                </button>
              )}
              <h1 style={{ fontSize: 18, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.3px" }}>
                Dashboard
              </h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Notification bell */}
              <div
                style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", position: "relative",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(245,166,35,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: "rgba(255,255,255,0.55)" }}>notifications</span>
                <div style={{
                  position: "absolute", top: 8, right: 9,
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#f5a623", border: "2px solid #0a0e16",
                  boxShadow: "0 0 6px rgba(245,166,35,0.5)",
                  animation: "subtle-pulse 2s infinite",
                }} />
              </div>

              {/* Avatar */}
              <div style={{
                width: 42, height: 42, borderRadius: "50%", padding: 2,
                background: "linear-gradient(135deg, #f5a623, #e8930c, #f5a623)",
                boxShadow: "0 0 14px rgba(245,166,35,0.2)",
              }}>
                <div style={{
                  width: "100%", height: "100%", borderRadius: "50%",
                  background: "linear-gradient(135deg, #1a1200, #2a1a00)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#f5a623", fontWeight: 800, fontSize: 15,
                  textTransform: "uppercase",
                }}>
                  {roleLower?.charAt(0) || "U"}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main style={{
            flex: 1,
            padding: isMobile ? "20px 16px" : "28px 32px",
            background: "#0f1318",
            minHeight: 0,
          }}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
