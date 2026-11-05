import LiveTrackView from "@/components/LiveTrackView";

export default function ParentTrackPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e0e3e5" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 12px", borderRadius: 999,
          background: "rgba(238,152,0,0.15)", border: "1px solid rgba(255,185,95,0.3)",
          color: "#ffb95f", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: 10,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>satellite_alt</span>
          Real-Time GPS Telemetry
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#e0e3e5", letterSpacing: "-0.5px", marginBottom: 6 }}>
          Track Child&apos;s Vehicle
        </h2>
        <p style={{ fontSize: 14, color: "#c6c6cd" }}>
          Live route corridor telemetry, checkpoint timestamps, and verified school handoff status.
        </p>
      </div>
      <LiveTrackView role="PARENT" />
    </div>
  );
}
