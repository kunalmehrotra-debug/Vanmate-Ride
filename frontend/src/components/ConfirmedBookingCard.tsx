"use client";

import { useState } from "react";

interface BookingItem {
  id: string;
  vehicleType: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  driverRating: string;
  source: string;
  destination: string;
  timing: string;
  students: number;
  amount: string;
  date: string;
  status: "CONFIRMED" | "PAID" | "COMPLETED" | "PENDING";
}

export default function ConfirmedBookingCard({ role }: { role: string }) {
  const isSchool = role?.toUpperCase() === "SCHOOL";

  const [bookings, setBookings] = useState<BookingItem[]>([
    {
      id: "BK-1042",
      vehicleType: isSchool ? "Mini Bus (24 Seats)" : "School Van (12 Seats)",
      vehicleNo: "UP-16-AB-1234",
      driverName: "Rajesh Kumar",
      driverPhone: "+91 98765 43210",
      driverRating: "4.9",
      source: isSchool ? "DPS Campus Gate 2" : "Sector 24, Noida",
      destination: isSchool ? "National Science Centre" : "Delhi Public School",
      timing: "07:45 AM",
      students: isSchool ? 22 : 2,
      amount: isSchool ? "₹4,500" : "₹1,800",
      date: "Oct 2026 • Monthly Pass",
      status: "CONFIRMED",
    },
    {
      id: "BK-1019",
      vehicleType: "School Van (12 Seats)",
      vehicleNo: "UP-16-CD-5678",
      driverName: "Suresh Singh",
      driverPhone: "+91 98111 22334",
      driverRating: "4.8",
      source: isSchool ? "Sector 12 Hub" : "Sector 24, Noida",
      destination: "Delhi Public School",
      timing: "07:40 AM",
      students: isSchool ? 12 : 2,
      amount: isSchool ? "₹3,200" : "₹1,800",
      date: "Sep 2026 • Monthly Pass",
      status: "PAID",
    },
    {
      id: "BK-0984",
      vehicleType: isSchool ? "Large Bus (50 Seats)" : "Car (4 Seats)",
      vehicleNo: "UP-16-EF-9012",
      driverName: "Amit Yadav",
      driverPhone: "+91 99100 44556",
      driverRating: "4.7",
      source: isSchool ? "DPS Main Campus" : "Sector 24, Noida",
      destination: isSchool ? "Botanical Garden" : "Delhi Public School",
      timing: "08:00 AM",
      students: isSchool ? 45 : 1,
      amount: isSchool ? "₹6,800" : "₹2,400",
      date: "Aug 2026 • Completed",
      status: "COMPLETED",
    },
  ]);

  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [filter, setFilter] = useState<"ALL" | "CONFIRMED" | "PAID" | "COMPLETED">("ALL");
  const [loading, setLoading] = useState(false);
  const [receiptMsg, setReceiptMsg] = useState("");

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setLoading(true);
    setTimeout(() => {
      setBookings((prev) =>
        prev.map((b) => (b.id === selectedBooking.id ? { ...b, status: "PAID" } : b))
      );
      setLoading(false);
      setReceiptMsg(`Payment for ${selectedBooking.id} (${selectedBooking.amount}) verified! Digital receipt issued.`);
      setSelectedBooking(null);
    }, 1200);
  };

  const filtered = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  const statusMeta = (status: BookingItem["status"]) => {
    switch (status) {
      case "PAID":
        return { color: "#4ade80", bg: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.3)", icon: "verified", label: "PAID" };
      case "CONFIRMED":
        return { color: "#ffb95f", bg: "rgba(238,152,0,0.15)", border: "rgba(255,185,95,0.35)", icon: "pending_actions", label: "PAYMENT DUE" };
      case "COMPLETED":
        return { color: "#7bd0ff", bg: "rgba(123,208,255,0.12)", border: "rgba(123,208,255,0.3)", icon: "task_alt", label: "COMPLETED" };
      default:
        return { color: "#bec6e0", bg: "rgba(190,198,224,0.12)", border: "rgba(190,198,224,0.3)", icon: "schedule", label: "PENDING" };
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e0e3e5" }}>
      <style>{`
        @keyframes stitchFade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stitch-glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stitch-glass-card:hover {
          background: rgba(255, 255, 255, 0.075);
          border-color: rgba(255, 255, 255, 0.24);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
        }
        .stitch-booking-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 20px;
        }
        @media (max-width: 900px) {
          .stitch-booking-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Filter Bar & Summary */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["ALL", "CONFIRMED", "PAID", "COMPLETED"] as const).map((tab) => {
            const active = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  background: active ? "#ee9800" : "rgba(255,255,255,0.05)",
                  color: active ? "#101415" : "#c6c6cd",
                  border: active ? "1px solid #ffb95f" : "1px solid rgba(255,255,255,0.12)",
                  boxShadow: active ? "0 0 24px rgba(238,152,0,0.3)" : "none",
                  transition: "all 0.25s",
                }}
              >
                {tab === "CONFIRMED" ? "Payment Due" : tab}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#c6c6cd" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#ffb95f" }}>receipt_long</span>
          Showing <strong>{filtered.length}</strong> booking records
        </div>
      </div>

      {/* Receipt Notification */}
      {receiptMsg && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          padding: "14px 20px", marginBottom: 22, borderRadius: 14,
          background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)",
          color: "#4ade80", fontSize: 13.5, fontWeight: 600,
          animation: "stitchFade 0.3s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
            <span>{receiptMsg}</span>
          </div>
          <button
            onClick={() => setReceiptMsg("")}
            style={{ background: "transparent", border: "none", color: "#4ade80", cursor: "pointer", fontSize: 16 }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Booking Cards List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {filtered.map((b, idx) => {
          const meta = statusMeta(b.status);
          return (
            <div
              key={b.id}
              className="stitch-glass-card"
              style={{
                padding: "28px",
                animation: `stitchFade 0.45s ease ${idx * 0.08}s both`,
                border: b.status === "CONFIRMED" ? "1.5px solid rgba(238,152,0,0.45)" : "1px solid rgba(255,255,255,0.14)",
                boxShadow: b.status === "CONFIRMED" ? "0 0 35px rgba(238,152,0,0.1)" : "none",
              }}
            >
              {/* Card Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 12, fontWeight: 800, letterSpacing: "0.06em",
                      color: "#ffb95f", background: "rgba(238,152,0,0.15)",
                      padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(255,185,95,0.25)",
                    }}>
                      #{b.id}
                    </span>
                    <span style={{ fontSize: 12.5, color: "#909097", fontWeight: 500 }}>{b.date}</span>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#e0e3e5", letterSpacing: "-0.3px" }}>
                    {b.source} <span style={{ color: "#ffb95f", margin: "0 6px" }}>→</span> {b.destination}
                  </h3>
                </div>

                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: 999,
                  fontSize: 11.5, fontWeight: 700, letterSpacing: "0.05em",
                  color: meta.color, background: meta.bg, border: `1px solid ${meta.border}`,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{meta.icon}</span>
                  {meta.label}
                </span>
              </div>

              {/* Card Body */}
              <div className="stitch-booking-grid" style={{ marginBottom: 22 }}>
                {/* Route & Vehicle Details */}
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16,
                  background: "rgba(16,20,21,0.55)", padding: "18px 20px", borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.07)",
                }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#909097", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Assigned Vehicle
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#e0e3e5", fontFamily: "monospace" }}>{b.vehicleNo}</div>
                    <div style={{ fontSize: 12, color: "#c6c6cd" }}>{b.vehicleType}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#909097", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Pickup Schedule
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#7bd0ff" }}>{b.timing}</div>
                    <div style={{ fontSize: 12, color: "#c6c6cd" }}>Daily Mon – Sat</div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#909097", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Passengers
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#e0e3e5" }}>{b.students} {b.students === 1 ? "Student" : "Students"}</div>
                    <div style={{ fontSize: 12, color: "#4ade80" }}>Verified Seat Pass</div>
                  </div>
                </div>

                {/* Assigned Driver Box */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(190,198,224,0.08), rgba(123,208,255,0.04))",
                  border: "1px solid rgba(190,198,224,0.18)",
                  borderRadius: 14, padding: "18px 20px",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: "rgba(238,152,0,0.18)", border: "1px solid rgba(255,185,95,0.35)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#ffb95f",
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 26 }}>badge</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#909097", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Assigned Driver
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#e0e3e5", display: "flex", alignItems: "center", gap: 6 }}>
                        {b.driverName}
                        <span style={{ fontSize: 12, color: "#ffb95f", fontWeight: 700 }}>★ {b.driverRating}</span>
                      </div>
                      <a href={`tel:${b.driverPhone}`} style={{ fontSize: 12.5, color: "#7bd0ff", textDecoration: "none", fontWeight: 600 }}>
                        {b.driverPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aesthetic Divider */}
              <div style={{ height: 1, width: "100%", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)", marginBottom: 18 }} />

              {/* Footer Action Row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
                <div>
                  <span style={{ fontSize: 11.5, color: "#909097", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, display: "block" }}>
                    Total Subscription Fee
                  </span>
                  <span style={{ fontSize: 26, fontWeight: 900, color: "#e0e3e5", letterSpacing: "-0.5px" }}>
                    {b.amount} <span style={{ fontSize: 13, fontWeight: 500, color: "#909097" }}>/ cycle</span>
                  </span>
                </div>

                {b.status === "CONFIRMED" ? (
                  <button
                    onClick={() => setSelectedBooking(b)}
                    style={{
                      padding: "12px 26px", borderRadius: 999,
                      background: "linear-gradient(135deg, #ee9800, #ffb95f)",
                      color: "#101415", border: "none",
                      fontSize: 13.5, fontWeight: 800, letterSpacing: "0.03em",
                      cursor: "pointer", fontFamily: "'Inter', sans-serif",
                      display: "flex", alignItems: "center", gap: 8,
                      boxShadow: "0 0 28px rgba(238,152,0,0.35)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>credit_card</span>
                    Pay Now (Stripe Checkout)
                  </button>
                ) : (
                  <div style={{
                    padding: "10px 20px", borderRadius: 999,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                    color: "#c6c6cd", fontSize: 12.5, fontWeight: 700,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#4ade80" }}>verified</span>
                    Receipt Verified
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stitch Glassmorphic Stripe Checkout Modal */}
      {selectedBooking && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(11, 15, 16, 0.78)",
          backdropFilter: "blur(14px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
        }}>
          <div style={{
            width: "100%", maxWidth: 440,
            background: "#191c1e",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 22, overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.65), 0 0 40px rgba(238,152,0,0.12)",
            animation: "stitchFade 0.25s ease",
          }}>
            <div style={{
              padding: "20px 24px", background: "#272a2c",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="material-symbols-outlined" style={{ color: "#ffb95f", fontSize: 22 }}>lock</span>
                <span style={{ fontWeight: 800, fontSize: 15, color: "#e0e3e5" }}>VanMate Secure Pay</span>
                <span style={{
                  fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 999,
                  background: "rgba(123,208,255,0.15)", color: "#7bd0ff", letterSpacing: "0.06em",
                }}>
                  STRIPE TEST
                </span>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                style={{ background: "transparent", border: "none", color: "#909097", fontSize: 18, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePayment} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{
                padding: "12px 16px", borderRadius: 12,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <div style={{ fontSize: 11, color: "#909097", fontWeight: 600 }}>Booking #{selectedBooking.id}</div>
                  <div style={{ fontSize: 13.5, color: "#e0e3e5", fontWeight: 700 }}>{selectedBooking.vehicleType}</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#ffb95f" }}>{selectedBooking.amount}</div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "#c6c6cd", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  defaultValue="Kunal Sharma"
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: 10,
                    background: "#101415", border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e0e3e5", fontSize: 14, outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "#c6c6cd", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                  Card Details
                </label>
                <input
                  type="text"
                  required
                  defaultValue="4242 •••• •••• 4242"
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: "10px 10px 0 0",
                    background: "#101415", border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e0e3e5", fontSize: 14, outline: "none", fontFamily: "monospace",
                  }}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <input
                    type="text"
                    required
                    defaultValue="12 / 28"
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: "0 0 0 10px",
                      background: "#101415", border: "1px solid rgba(255,255,255,0.15)", borderTop: "none",
                      color: "#e0e3e5", fontSize: 14, outline: "none", fontFamily: "monospace",
                    }}
                  />
                  <input
                    type="text"
                    required
                    defaultValue="842"
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: "0 0 10px 0",
                      background: "#101415", border: "1px solid rgba(255,255,255,0.15)", borderTop: "none", borderLeft: "none",
                      color: "#e0e3e5", fontSize: 14, outline: "none", fontFamily: "monospace",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 8, width: "100%", padding: "14px",
                  borderRadius: 12, border: "none",
                  background: "linear-gradient(135deg, #ee9800, #ffb95f)",
                  color: "#101415", fontSize: 14.5, fontWeight: 800,
                  cursor: loading ? "wait" : "pointer", fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 0 24px rgba(238,152,0,0.3)",
                }}
              >
                {loading ? "Processing Payment..." : `Authorize ${selectedBooking.amount}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
