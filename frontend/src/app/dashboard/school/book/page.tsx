import BookVehicleForm from "@/components/BookVehicleForm";

export default function SchoolBookPage() {
  return (
    <div style={{
      animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      fontFamily: "'Inter', sans-serif",
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ marginBottom: 26 }}>
        <h2 style={{
          fontSize: 26,
          fontWeight: 800,
          background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.5px",
          marginBottom: 6,
        }}>
          Request Transport
        </h2>
        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.4)" }}>
          Submit custom vehicle dispatch requests for school events, field trips, or daily transits.
        </p>
      </div>
      <BookVehicleForm />
    </div>
  );
}
