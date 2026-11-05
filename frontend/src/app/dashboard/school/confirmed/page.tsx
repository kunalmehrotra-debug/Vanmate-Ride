import ConfirmedBookingCard from "@/components/ConfirmedBookingCard";

export default function SchoolConfirmedPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e0e3e5" }}>
      <div style={{ marginBottom: 26 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#e0e3e5", letterSpacing: "-0.5px", marginBottom: 6 }}>
          Confirmed Fleet Allocations
        </h2>
        <p style={{ fontSize: 14, color: "#c6c6cd" }}>
          Active vehicle assignments and billing settlements for your institution.
        </p>
      </div>
      <ConfirmedBookingCard role="SCHOOL" />
    </div>
  );
}
