'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  o: number;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Particle background ──────────────────────────────────────────
  const initParticles = useCallback((w: number, h: number): Particle[] => {
    const count = Math.min(Math.floor((w * h) / 12000), 90);
    return Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
      o: Math.random() * 0.45 + 0.12,
    }));
  }, []);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let particles: Particle[];

    const resize = () => {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
      particles = initParticles(cvs.width, cvs.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, cvs.width, cvs.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = cvs.width;
        if (p.x > cvs.width) p.x = 0;
        if (p.y < 0) p.y = cvs.height;
        if (p.y > cvs.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,166,35,${p.o})`;
        ctx.fill();
      });

      // draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245,166,35,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [initParticles]);

  // ── Submit handler ────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || 'Login failed.');
        setLoading(false);
        return;
      }

      // Map role for auth context & redirect
      const roleLower = (data.role as string).toLowerCase();
      let authRole: string;
      let redirectPath: string;

      switch (roleLower) {
        case 'parent':
          authRole = 'PARENT';
          redirectPath = '/dashboard/parent';
          break;
        case 'owner':
          authRole = 'DRIVER';
          redirectPath = '/dashboard/driver';
          break;
        case 'school':
          authRole = 'SCHOOL';
          redirectPath = '/dashboard/school';
          break;
        default:
          authRole = roleLower.toUpperCase();
          redirectPath = '/dashboard';
      }

      login(data.id, authRole, data.id);
      router.push(redirectPath);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  // ── Input style helper ────────────────────────────────────────────
  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '14px 46px 14px 46px',
    background: 'rgba(255,255,255,0.07)',
    border:
      focusedField === field
        ? '1.5px solid rgba(245,166,35,0.8)'
        : '1.5px solid rgba(255,255,255,0.18)',
    borderRadius: 14,
    color: '#f0f2f5',
    fontSize: 15,
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    boxShadow:
      focusedField === field ? '0 0 0 3px rgba(245,166,35,0.12)' : 'none',
    boxSizing: 'border-box' as const,
  });

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: 15,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0a8b8',
    fontSize: 20,
    pointerEvents: 'none',
  };

  // ── Render ────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Global styles ─────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }

        input::placeholder { color: rgba(160,168,184,0.55); }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #f0f2f5 !important;
          -webkit-box-shadow: 0 0 0 1000px rgba(255,255,255,0.07) inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* ── Page wrapper ──────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(165deg, #060a12 0%, #111820 100%)',
          fontFamily: "'Inter', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        />

        {/* ── Card ────────────────────────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: 430,
            margin: '24px 16px',
            padding: '44px 36px 38px',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 28,
            boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05) inset',
            animation: 'fadeUp 0.7s cubic-bezier(.16,1,.3,1) both',
          }}
        >
          {/* Brand */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 38,
                background: 'linear-gradient(135deg, #f5a623, #ffb95f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              directions_bus
            </span>
          </div>

          <h1
            style={{
              textAlign: 'center',
              fontSize: 22,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f5a623, #ffb95f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.4px',
              marginBottom: 4,
            }}
          >
            VanMate
          </h1>

          <p
            style={{
              textAlign: 'center',
              color: '#8a92a1',
              fontSize: 14,
              marginBottom: 34,
            }}
          >
            Welcome back — sign in to continue
          </p>

          {/* ── Error banner ──────────────────────────────────────── */}
          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.30)',
                borderRadius: 14,
                marginBottom: 22,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: '#f87171', fontSize: 20 }}
              >
                error
              </span>
              <span style={{ color: '#fca5a5', fontSize: 13.5, lineHeight: 1.45 }}>
                {error}
              </span>
            </div>
          )}

          {/* ── Form ──────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* User ID */}
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={iconStyle}>
                badge
              </span>
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onFocus={() => setFocusedField('userId')}
                onBlur={() => setFocusedField(null)}
                required
                style={inputStyle('userId')}
              />
            </div>

            {/* Password */}
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={iconStyle}>
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                required
                style={inputStyle('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#a0a8b8', fontSize: 20 }}
                >
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 6,
                width: '100%',
                padding: '15px 0',
                background: loading
                  ? 'rgba(245,166,35,0.35)'
                  : 'linear-gradient(135deg, #f5a623, #ffb95f)',
                color: '#000',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 15.5,
                border: 'none',
                borderRadius: 999,
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.3px',
                transition: 'opacity 0.25s, transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {loading ? (
                <>
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 19,
                      animation: 'spin 1s linear infinite',
                    }}
                  >
                    progress_activity
                  </span>
                  Signing in…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: 19 }}>
                    login
                  </span>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* ── Register link ─────────────────────────────────────── */}
          <p
            style={{
              textAlign: 'center',
              color: '#6b7280',
              fontSize: 13.5,
              marginTop: 28,
            }}
          >
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              style={{
                color: '#f5a623',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
