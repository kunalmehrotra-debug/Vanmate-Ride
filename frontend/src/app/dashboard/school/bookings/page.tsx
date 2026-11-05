import ConfirmedBookingCard from "@/components/ConfirmedBookingCard";

export default function SchoolBookingsPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e0e3e5" }}>
      <div style={{ marginBottom: 26 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 12px", borderRadius: 999,
          background: "rgba(123,208,255,0.12)", border: "1px solid rgba(123,208,255,0.3)",
          color: "#7bd0ff", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: 10,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>history</span>
          Institutional Fleet Bookings
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#e0e3e5", letterSpacing: "-0.5px", marginBottom: 6 }}>
          Previous & Confirmed Fleet Bookings
        </h2>
        <p style={{ fontSize: 14, color: "#c6c6cd" }}>
          Manage school transport contracts, event buses, and monthly fleet invoices.
        </p>
      </div>
      <ConfirmedBookingCard role="SCHOOL" />
    </div>
  );
}
