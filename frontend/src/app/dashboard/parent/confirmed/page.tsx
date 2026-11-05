import ConfirmedBookingCard from "@/components/ConfirmedBookingCard";

export default function ParentConfirmedPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e0e3e5" }}>
      <div style={{ marginBottom: 26 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#e0e3e5", letterSpacing: "-0.5px", marginBottom: 6 }}>
          Confirmed Bookings
        </h2>
        <p style={{ fontSize: 14, color: "#c6c6cd" }}>
          Review your confirmed vehicle assignments and complete pending payments.
        </p>
      </div>
      <ConfirmedBookingCard role="PARENT" />
    </div>
  );
}
