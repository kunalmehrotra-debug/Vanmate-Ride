import MessagesView from "@/components/MessagesView";

export default function ParentSent() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e0e3e5" }}>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#e0e3e5", letterSpacing: "-0.5px", marginBottom: 4 }}>
          Sent Messages
        </h2>
        <p style={{ fontSize: 14, color: "#c6c6cd" }}>
          Archive of your dispatched communications and route requests.
        </p>
      </div>
      <MessagesView initialTab="SENT" />
    </div>
  );
}
