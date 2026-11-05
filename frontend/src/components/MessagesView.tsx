"use client";

import { useState } from "react";

type MessageType = "INBOX" | "SENT" | "COMPOSE";

interface MailItem {
  id: number;
  person: string;
  roleTag: string;
  subject: string;
  body: string;
  date: string;
  priority: "NORMAL" | "URGENT";
  unread?: boolean;
}

export default function MessagesView({ initialTab }: { initialTab: MessageType }) {
  const [tab, setTab] = useState<MessageType>(initialTab);
  const [loading, setLoading] = useState(false);
  const [sentNotice, setSentNotice] = useState("");

  const [inboxMessages, setInboxMessages] = useState<MailItem[]>([
    {
      id: 101,
      person: "Admin • Transport Control",
      roleTag: "ADMIN",
      subject: "Route Optimization Update for Sector 62 Corridor",
      body: "Dear User, starting Monday the morning pickup window for Van #12 (UP-16-AB-1234) has been adjusted by 5 minutes to bypass Sector 52 metro construction. New pickup time: 07:45 AM.",
      date: "Today, 08:10 AM",
      priority: "URGENT",
      unread: true,
    },
    {
      id: 102,
      person: "Rajesh Kumar (Van #12)",
      roleTag: "DRIVER",
      subject: "Morning Drop Completed at DPS Gate 1",
      body: "All students on Route 4A have been safely handed over to the school transport coordinator at Gate 1 at 08:14 AM.",
      date: "Yesterday, 08:16 AM",
      priority: "NORMAL",
      unread: true,
    },
    {
      id: 103,
      person: "DPS Transport Desk",
      roleTag: "SCHOOL",
      subject: "Monthly Safety Inspection Certificate Published",
      body: "All 42 assigned fleet vehicles have completed their monthly GPS, speed-governor, and CCTV verification checks.",
      date: "Oct 24",
      priority: "NORMAL",
      unread: false,
    },
  ]);

  const [sentMessages, setSentMessages] = useState<MailItem[]>([
    {
      id: 201,
      person: "Admin • Transport Control",
      roleTag: "ADMIN",
      subject: "Request for Afternoon Drop Gate Change",
      body: "Please update Friday's afternoon drop-off point to Sector 24 Block C main gate.",
      date: "Oct 22",
      priority: "NORMAL",
    },
  ]);

  const [selectedMail, setSelectedMail] = useState<MailItem | null>(inboxMessages[0]);

  const [recipient, setRecipient] = useState("Admin • Transport Control");
  const [priority, setPriority] = useState<"NORMAL" | "URGENT">("NORMAL");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const unreadCount = inboxMessages.filter((m) => m.unread).length;

  const handleSelectMail = (msg: MailItem, source: "INBOX" | "SENT") => {
    setSelectedMail(msg);
    if (source === "INBOX" && msg.unread) {
      setInboxMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, unread: false } : m))
      );
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const newMail: MailItem = {
        id: Date.now(),
        person: recipient,
        roleTag: recipient.includes("Driver") ? "DRIVER" : recipient.includes("School") ? "SCHOOL" : "ADMIN",
        subject,
        body,
        date: "Just now",
        priority,
      };
      setSentMessages((prev) => [newMail, ...prev]);
      setSelectedMail(newMail);
      setLoading(false);
      setSubject("");
      setBody("");
      setSentNotice(`Message dispatched to ${recipient}.`);
      setTab("SENT");
    }, 600);
  };

  const handleReply = (msg: MailItem) => {
    setRecipient(msg.person);
    setSubject(msg.subject.startsWith("Re:") ? msg.subject : `Re: ${msg.subject}`);
    setPriority(msg.priority);
    setTab("COMPOSE");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e0e3e5" }}>
      <style>{`
        .stitch-msg-shell {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 22px;
          display: grid;
          grid-template-columns: 250px 1fr;
          min-height: 580px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
        }
        .stitch-mail-split {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 18px;
        }
        @media (max-width: 960px) {
          .stitch-msg-shell { grid-template-columns: 1fr; }
          .stitch-mail-split { grid-template-columns: 1fr; }
        }
        .stitch-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 12px;
          background: #101415;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #e0e3e5;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .stitch-input:focus {
          border-color: #ffb95f;
          box-shadow: 0 0 0 3px rgba(238, 152, 0, 0.18);
        }
      `}</style>

      {sentNotice && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 18px", marginBottom: 18, borderRadius: 14,
          background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)",
          color: "#4ade80", fontSize: 13, fontWeight: 700,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>mark_email_read</span>
            <span>{sentNotice}</span>
          </div>
          <button onClick={() => setSentNotice("")} style={{ background: "none", border: "none", color: "#4ade80", cursor: "pointer" }}>✕</button>
        </div>
      )}

      <div className="stitch-msg-shell">
        {/* Left Navigation Rail */}
        <div style={{
          background: "rgba(16, 20, 21, 0.75)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "24px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}>
          <button
            onClick={() => setTab("COMPOSE")}
            style={{
              padding: "13px 16px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #ee9800, #ffb95f)",
              color: "#101415",
              fontWeight: 800,
              fontSize: 13.5,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 0 25px rgba(238, 152, 0, 0.3)",
              marginBottom: 10,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 19 }}>edit_square</span>
            Compose Message
          </button>

          <button
            onClick={() => { setTab("INBOX"); setSelectedMail(inboxMessages[0] || null); }}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: tab === "INBOX" ? "1px solid rgba(190,198,224,0.3)" : "1px solid transparent",
              background: tab === "INBOX" ? "rgba(190,198,224,0.12)" : "transparent",
              color: tab === "INBOX" ? "#e0e3e5" : "#909097",
              fontWeight: 700,
              fontSize: 13.5,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 19, color: tab === "INBOX" ? "#ffb95f" : "#909097" }}>inbox</span>
              Inbox
            </span>
            {unreadCount > 0 && (
              <span style={{
                padding: "2px 8px", borderRadius: 999,
                background: "#ee9800", color: "#101415",
                fontSize: 11, fontWeight: 800,
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => { setTab("SENT"); setSelectedMail(sentMessages[0] || null); }}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: tab === "SENT" ? "1px solid rgba(190,198,224,0.3)" : "1px solid transparent",
              background: tab === "SENT" ? "rgba(190,198,224,0.12)" : "transparent",
              color: tab === "SENT" ? "#e0e3e5" : "#909097",
              fontWeight: 700,
              fontSize: 13.5,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 19, color: tab === "SENT" ? "#7bd0ff" : "#909097" }}>outbox</span>
              Sent Items
            </span>
            <span style={{ fontSize: 11.5, color: "#909097" }}>{sentMessages.length}</span>
          </button>

          <div style={{ marginTop: "auto", padding: "14px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#ffb95f", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
              Direct Helpline
            </div>
            <div style={{ fontSize: 12, color: "#c6c6cd", lineHeight: 1.5 }}>
              24/7 Dispatch Desk: <strong style={{ color: "#e0e3e5" }}>1800-VAN-MATE</strong>
            </div>
          </div>
        </div>

        {/* Main Workspace Pane */}
        <div style={{ padding: "26px" }}>
          {(tab === "INBOX" || tab === "SENT") && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#e0e3e5" }}>
                  {tab === "INBOX" ? "Received Communications" : "Dispatched Messages"}
                </h3>
                <span style={{ fontSize: 12, color: "#909097" }}>
                  {tab === "INBOX" ? `${inboxMessages.length} threads` : `${sentMessages.length} sent`}
                </span>
              </div>

              <div className="stitch-mail-split">
                {/* Thread List */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {(tab === "INBOX" ? inboxMessages : sentMessages).map((msg) => {
                    const isSelected = selectedMail?.id === msg.id;
                    return (
                      <div
                        key={msg.id}
                        onClick={() => handleSelectMail(msg, tab)}
                        style={{
                          padding: "16px",
                          borderRadius: 14,
                          cursor: "pointer",
                          background: isSelected ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.03)",
                          border: isSelected
                            ? "1.5px solid #ffb95f"
                            : msg.unread
                            ? "1px solid rgba(123,208,255,0.35)"
                            : "1px solid rgba(255,255,255,0.09)",
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{
                            fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 999,
                            background: msg.priority === "URGENT" ? "rgba(255,180,171,0.18)" : "rgba(123,208,255,0.14)",
                            color: msg.priority === "URGENT" ? "#ffb4ab" : "#7bd0ff",
                            letterSpacing: "0.06em",
                          }}>
                            {msg.roleTag} • {msg.priority}
                          </span>
                          <span style={{ fontSize: 11, color: "#909097" }}>{msg.date}</span>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: msg.unread ? 800 : 700, color: "#e0e3e5", marginBottom: 4 }}>
                          {msg.person}
                        </div>
                        <div style={{ fontSize: 12.5, color: "#c6c6cd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {msg.subject}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Detail Reader */}
                {selectedMail ? (
                  <div style={{
                    padding: "22px",
                    borderRadius: 16,
                    background: "rgba(16, 20, 21, 0.65)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
                        <div>
                          <div style={{ fontSize: 11, color: "#ffb95f", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {tab === "INBOX" ? "From" : "To"}: {selectedMail.person}
                          </div>
                          <h4 style={{ fontSize: 18, fontWeight: 800, color: "#e0e3e5", marginTop: 4 }}>
                            {selectedMail.subject}
                          </h4>
                        </div>
                        <span style={{ fontSize: 11.5, color: "#909097", whiteSpace: "nowrap" }}>{selectedMail.date}</span>
                      </div>

                      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "14px 0" }} />

                      <p style={{ fontSize: 14, color: "#c6c6cd", lineHeight: 1.7 }}>
                        {selectedMail.body}
                      </p>
                    </div>

                    <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => handleReply(selectedMail)}
                        style={{
                          padding: "10px 18px", borderRadius: 999,
                          background: "rgba(255,185,95,0.15)", border: "1px solid rgba(255,185,95,0.35)",
                          color: "#ffb95f", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                          display: "flex", alignItems: "center", gap: 6, fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>reply</span>
                        Reply to Thread
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {tab === "COMPOSE" && (
            <div style={{ maxWidth: 620 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#e0e3e5", marginBottom: 6 }}>
                Compose New Dispatch Message
              </h3>
              <p style={{ fontSize: 13, color: "#c6c6cd", marginBottom: 22 }}>
                Send direct alerts or schedule inquiries to drivers, school coordinators, or the VanMate admin desk.
              </p>

              <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "#c6c6cd", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                      Recipient
                    </label>
                    <select
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="stitch-input"
                    >
                      <option value="Admin • Transport Control">Admin • Transport Control</option>
                      <option value="Driver • Rajesh Kumar (Van #12)">Driver • Rajesh Kumar (Van #12)</option>
                      <option value="Driver • Suresh Singh (Van #08)">Driver • Suresh Singh (Van #08)</option>
                      <option value="DPS School Coordinator">DPS School Coordinator</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "#c6c6cd", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                      Priority Level
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as "NORMAL" | "URGENT")}
                      className="stitch-input"
                    >
                      <option value="NORMAL">Standard Inquiry</option>
                      <option value="URGENT">Urgent • Pickup / Route Hold</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "#c6c6cd", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                    Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Gate change or 5-minute pickup hold"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="stitch-input"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "#c6c6cd", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                    Message Body
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Enter student name, route number, and instructions..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="stitch-input"
                    style={{ resize: "vertical" }}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "14px 28px",
                      borderRadius: 999,
                      border: "none",
                      background: "linear-gradient(135deg, #ee9800, #ffb95f)",
                      color: "#101415",
                      fontSize: 14,
                      fontWeight: 800,
                      cursor: loading ? "wait" : "pointer",
                      fontFamily: "'Inter', sans-serif",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      boxShadow: "0 0 28px rgba(238, 152, 0, 0.3)",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
                    {loading ? "Dispatching..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
