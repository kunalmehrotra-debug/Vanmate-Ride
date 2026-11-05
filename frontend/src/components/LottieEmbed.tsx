"use client";

import { useEffect, useRef } from "react";

interface LottieEmbedProps {
  animationId: string; // LottieFiles animation UUID
  className?: string;
  style?: React.CSSProperties;
  speed?: number;      // 1 = normal
  loop?: boolean;
  autoplay?: boolean;
  background?: string;
}

/**
 * Embeds a LottieFiles animation via the official Lottie embed player iframe.
 * Works for both public and private-dashboard animations as long as the
 * "Embed" option is enabled on the LottieFiles animation page.
 *
 * URL format: https://lottie.host/embed/<uuid>/<filename>.lottie
 * For dashboard animations: https://app.lottiefiles.com/animation/<uuid>?embed=1
 */
export default function LottieEmbed({
  animationId,
  className = "",
  style = {},
  speed = 1,
  loop = true,
  autoplay = true,
  background = "transparent",
}: LottieEmbedProps) {
  // Build the official LottieFiles embed URL
  const src = `https://lottie.host/embed/${animationId}/animation.lottie?loop=${loop}&autoplay=${autoplay}&speed=${speed}&background=${encodeURIComponent(background)}`;

  return (
    <iframe
      src={src}
      className={className}
      style={{
        border: "none",
        background: "transparent",
        ...style,
      }}
      allowFullScreen
      title="Lottie Animation"
    />
  );
}

// ── Fallback: Load from local public folder ──
export function LottieLocal({
  src,
  className = "",
  style = {},
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: any = null;

    async function init() {
      const lottie = (await import("lottie-react")).default;
      if (!containerRef.current) return;

      const res = await fetch(src);
      const animData = await res.json();

      // lottie-react is a React component, so we render it differently.
      // For imperative loading we use lottie-web directly.
      const lottieWeb = (await import("lottie-web")).default;
      player = lottieWeb.loadAnimation({
        container: containerRef.current!,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animData,
      });
    }

    init();

    return () => {
      player?.destroy();
    };
  }, [src]);

  return <div ref={containerRef} className={className} style={style} />;
}
