import ConfirmedBookingCard from "@/components/ConfirmedBookingCard";

export default function ParentBookingsPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e0e3e5" }}>
      <div style={{ marginBottom: 26 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 12px", borderRadius: 999,
          background: "rgba(238,152,0,0.15)", border: "1px solid rgba(255,185,95,0.3)",
          color: "#ffb95f", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: 10,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>history</span>
          Transit Subscriptions & Passes
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#e0e3e5", letterSpacing: "-0.5px", marginBottom: 6 }}>
          Previous & Confirmed Bookings
        </h2>
        <p style={{ fontSize: 14, color: "#c6c6cd" }}>
          Review your child&apos;s active vehicle assignments, past ride history, and manage monthly subscription payments.
        </p>
      </div>
      <ConfirmedBookingCard role="PARENT" />
    </div>
  );
}
