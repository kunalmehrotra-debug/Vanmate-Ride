"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ScrollAnimation() {
  const spacerRef  = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const spacer = spacerRef.current;
    if (!canvas || !spacer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameCount = 180;
    const images: HTMLImageElement[] = new Array(frameCount);
    let loadedCount  = 0;
    let currentFrame = 0;
    let rafId: number;
    let dpr = window.devicePixelRatio || 1;

    // ── Resize canvas to fill viewport ──────────────────────────────────────
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w === 0 || h === 0) return;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      drawFrame(currentFrame);
    };

    // ── Draw one frame, cover-fit ─────────────────────────────────────────────
    const drawFrame = (index: number) => {
      let img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = index; i >= 0; i--) {
          if (images[i] && images[i].complete && images[i].naturalWidth > 0) { img = images[i]; break; }
        }
        if (!img || !img.complete || img.naturalWidth === 0) {
          for (let i = index + 1; i < frameCount; i++) {
            if (images[i] && images[i].complete && images[i].naturalWidth > 0) { img = images[i]; break; }
          }
        }
      }
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const w = canvas.width  / dpr;
      const h = canvas.height / dpr;
      if (w === 0 || h === 0) return;
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw    = img.naturalWidth  * scale;
      const dh    = img.naturalHeight * scale;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    // ── Scroll handler ─────────────────────────────────────────────────────────
    const onScroll = () => {
      const rect = spacer.getBoundingClientRect();
      // scrolled = how far we've scrolled into the spacer
      const scrolled = -rect.top;
      // The animation plays over the spacer's height minus one viewport
      const scrollRange = spacer.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      const frame    = Math.round(progress * (frameCount - 1));

      if (frame !== currentFrame) {
        currentFrame = frame;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => drawFrame(frame));
      }

      // Text stays visible through the whole animation, then fades+blurs only in the last 20%
      const textProgress = Math.max(0, (progress - 0.80) / 0.20);
      if (textRef.current) {
        textRef.current.style.opacity = String(1 - textProgress);
        textRef.current.style.filter = `blur(${textProgress * 24}px)`;
      }
      if (ctaRef.current) {
        ctaRef.current.style.opacity = String(1 - textProgress);
        ctaRef.current.style.filter = `blur(${textProgress * 24}px)`;
      }
    };

    // ── Image loading ─────────────────────────────────────────────────────────
    const onLoad = () => {
      loadedCount++;
      if (loadedCount === 1) {
        resize();
        drawFrame(0);
        setLoaded(true);
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload  = onLoad;
      img.onerror = onLoad;
      img.src = `/scroll-frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
      images[i] = img;
      if (img.complete && img.naturalWidth > 0) onLoad();
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* ── Fixed layer: canvas + hero text, always behind page content ── */}
      <style>{`
        @media (max-width: 1023px) {
          .trust-badge { display: none !important; }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          background: "#101415",
          pointerEvents: "none",
        }}
      >
        {/* Top gradient — keeps text legible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,10,15,0.90) 0%, rgba(10,10,15,0.55) 32%, transparent 65%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        {/* Bottom-right trust badge — covers sparkle artifact + adds social proof */}
        <div
          className="trust-badge"
          style={{
            position: "absolute",
            bottom: "7%",
            right: "4%",
            zIndex: 20,
            background: "rgba(10,12,16,0.72)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 18,
            padding: "18px 24px",
            minWidth: 220,
            pointerEvents: "none",
          }}
        >
          {/* Avatars row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ display: "flex" }}>
              {["#f5a623","#4fc3f7","#10b981","#e879f9"].map((c, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${c}, ${c}88)`,
                  border: "2px solid #0a0c10",
                  marginLeft: i === 0 ? 0 : -10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {["👨‍👩‍👦","👩‍👧","👨‍👦","👩‍👧‍👦"][i]}
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "'Inter', sans-serif", lineHeight: 1.2 }}>
                10,000+ Parents
              </div>
              <div style={{ color: "#8a8a9a", fontSize: 11, fontFamily: "'Inter', sans-serif" }}>
                already trust VanMate
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 12 }} />

          {/* Stats row */}
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#f5a623", fontWeight: 800, fontSize: 18, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                500+
              </div>
              <div style={{ color: "#8a8a9a", fontSize: 10, fontFamily: "'Inter', sans-serif", marginTop: 3 }}>
                Schools
              </div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#4fc3f7", fontWeight: 800, fontSize: 18, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                4.9★
              </div>
              <div style={{ color: "#8a8a9a", fontSize: 10, fontFamily: "'Inter', sans-serif", marginTop: 3 }}>
                Rating
              </div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#10b981", fontWeight: 800, fontSize: 18, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                99%
              </div>
              <div style={{ color: "#8a8a9a", fontSize: 10, fontFamily: "'Inter', sans-serif", marginTop: 3 }}>
                Safe trips
              </div>
            </div>
          </div>
        </div>


        {/* Hero text */}
        <div
          ref={textRef}
          style={{
            position: "absolute",
            top: "18%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            width: "100%",
            maxWidth: 880,
            padding: "0 24px",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              display: "block",
              color: "#f5a623",
              fontWeight: 700,
              letterSpacing: "0.2em",
              fontSize: 11,
              textTransform: "uppercase",
              marginBottom: 18,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ● Scroll to explore ↓
          </span>

          <h1
            style={{
              margin: "0 0 20px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              textShadow: "0 2px 28px rgba(0,0,0,0.95)",
            }}
          >
            Your Child.{" "}
            <span style={{ color: "#f5a623" }}>Our Priority.</span>
          </h1>

          <p
            style={{
              margin: "0 auto",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.18rem)",
              color: "#c6c6cd",
              lineHeight: 1.7,
              maxWidth: 560,
              textShadow: "0 1px 16px rgba(0,0,0,0.95)",
            }}
          >
            Book, track, and manage your child&apos;s school commute with
            real-time precision and absolute safety.
          </p>
        </div>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          style={{
            position: "absolute",
            bottom: "10%",
            left: 0,
            right: 0,
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            zIndex: 20,
            pointerEvents: "auto",
          }}
        >
          <Link
            href="/register"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg,#f5a623,#f7c948)",
              color: "#0a0a0f",
              fontFamily: "'Inter',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              padding: "14px 32px",
              borderRadius: 999,
              textDecoration: "none",
              boxShadow: "0 0 32px rgba(245,166,35,0.35), 0 4px 20px rgba(0,0,0,0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.03)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
          >
            Book a Seat
          </Link>
          <button
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#fff",
              fontFamily: "'Inter',sans-serif",
              fontWeight: 600,
              fontSize: 15,
              padding: "14px 32px",
              borderRadius: 999,
              cursor: "pointer",
              backdropFilter: "blur(12px)",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
          >
            Watch Demo →
          </button>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "block",
            zIndex: 1,
          }}
        />

        {/* Spinner */}
        {!loaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#101415",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "3px solid rgba(245,166,35,0.25)",
                borderTopColor: "#f5a623",
                animation: "spin 0.8s linear infinite",
              }}
            />
          </div>
        )}
      </div>

      {/* ── Spacer: provides scroll distance for animation.
           The fixed canvas plays through frames as user scrolls this spacer.
           Height = 100vh (viewport) + scroll distance for animation.
           After this spacer, the next section in page.tsx follows immediately. ── */}
      <div
        ref={spacerRef}
        style={{ height: "280vh", position: "relative", zIndex: -1 }}
      />
    </>
  );
}
