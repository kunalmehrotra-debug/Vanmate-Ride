import LiveTrackView from "@/components/LiveTrackView";

export default function SchoolTrackPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e0e3e5" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 12px", borderRadius: 999,
          background: "rgba(123,208,255,0.12)", border: "1px solid rgba(123,208,255,0.3)",
          color: "#7bd0ff", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: 10,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>radar</span>
          Institutional Fleet Telemetry
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#e0e3e5", letterSpacing: "-0.5px", marginBottom: 6 }}>
          Live Fleet GPS Monitor
        </h2>
        <p style={{ fontSize: 14, color: "#c6c6cd" }}>
          Track all active school vans and buses in real-time with route adherence and speed monitoring.
        </p>
      </div>
      <LiveTrackView role="SCHOOL" />
    </div>
  );
}
