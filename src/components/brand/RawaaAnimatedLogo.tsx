'use client';

import React from 'react';

interface RawaaAnimatedLogoProps {
  variant?: 'hero' | 'navbar' | 'icon';
  className?: string;
  showSubtitle?: boolean;
}

export default function RawaaAnimatedLogo({
  variant = 'hero',
  className = '',
  showSubtitle = false
}: RawaaAnimatedLogoProps) {

  /* ================================================================
     ICON VARIANT – pure isolated emblem
     ================================================================ */
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <img
          src="/brand/rawaa_exact_emblem_only.png"
          alt="رواء"
          className="w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(2,132,199,0.3)] filter contrast-105"
        />
      </div>
    );
  }

  /* ================================================================
     NAVBAR VARIANT – compact brand with isolated emblem
     ================================================================ */
  if (variant === 'navbar') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        {/* Exact Isolated Emblem */}
        <div className="relative w-11 h-11 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
          <img
            src="/brand/rawaa_exact_emblem_only.png"
            alt="رواء"
            className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(2,132,199,0.35)]"
          />
          {/* Subtle orbiting cyber dot */}
          <div className="absolute inset-[-4px] animate-spin-slow pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,229,255,0.8)]" />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
              رِوَاء
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
          </div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-sky-600 uppercase -mt-1 font-extrabold">
            RAWAA ACADEMY
          </span>
        </div>
      </div>
    );
  }

  /* ================================================================
     HERO VARIANT – EXACT LOGO (NO BACKGROUND) WITH ORBITING CIRCLES
     ================================================================ */
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>

      {/* Soft Ambient Light Glow behind the logo */}
      <div className="absolute w-80 sm:w-[440px] h-80 sm:h-[440px] rounded-full bg-gradient-to-tr from-sky-200/40 via-cyan-100/40 to-teal-100/30 blur-3xl pointer-events-none" />

      {/* Main Animated Assembly (Gentle Levitation) */}
      <div className="relative z-10 animate-logo-float flex flex-col items-center">

        {/* Orbiting Circles Container */}
        <div className="relative w-80 sm:w-96 md:w-[420px] aspect-square flex items-center justify-center">

          {/* ============ ORBIT RING 1 (outermost, slow clockwise) ============ */}
          <div className="absolute inset-0 animate-orbit-1 pointer-events-none">
            <svg viewBox="0 0 420 420" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="210" cy="210" r="200" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />
            </svg>
            {/* Glowing Orbiting Node 1 */}
            <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(0,229,255,0.75)]" />
            {/* Glowing Orbiting Node 2 (Opposite) */}
            <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_10px_3px_rgba(14,165,233,0.7)]" />
          </div>

          {/* ============ ORBIT RING 2 (middle, counter-clockwise) ============ */}
          <div className="absolute inset-[32px] animate-orbit-2 pointer-events-none">
            <svg viewBox="0 0 356 356" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="178" cy="178" r="170" stroke="#00E5FF" strokeWidth="1.2" strokeDasharray="5 8" opacity="0.35" />
            </svg>
            {/* Glowing Node */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_3px_rgba(16,185,129,0.7)]" />
            {/* Glowing Node Opposite */}
            <div className="absolute bottom-0 right-[15%] w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_3px_rgba(0,229,255,0.6)]" />
          </div>

          {/* ============ ORBIT RING 3 (inner, fast clockwise) ============ */}
          <div className="absolute inset-[64px] animate-orbit-3 pointer-events-none">
            <svg viewBox="0 0 292 292" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="146" cy="146" r="140" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 10" opacity="0.3" />
            </svg>
            <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_3px_rgba(56,189,248,0.7)]" />
          </div>

          {/* ============ CORNER PULSING DATA POINTS ============ */}
          <div className="absolute top-[16%] left-[10%] w-2 h-2 rounded-full bg-sky-400/60 animate-pulse" />
          <div className="absolute top-[12%] right-[14%] w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse delay-500" />
          <div className="absolute bottom-[14%] left-[12%] w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-pulse delay-1000" />
          <div className="absolute bottom-[10%] right-[10%] w-2 h-2 rounded-full bg-sky-500/60 animate-pulse" />

          {/* ============ CENTER: EXACT ISOLATED LOGO (NO BACKGROUND) ============ */}
          <div className="relative z-10 flex flex-col items-center justify-center p-2">
            <img
              src="/brand/rawaa_exact_logo_clean.png"
              alt="شعار رواء"
              className="w-56 sm:w-64 md:w-72 h-auto object-contain drop-shadow-[0_12px_28px_rgba(2,132,199,0.32)] filter contrast-[1.04]"
              priority-img="true"
            />
          </div>

        </div>

        {/* Optional Subtitle Badge */}
        {showSubtitle && (
          <div className="mt-3 inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-sky-50 border border-sky-200/90 shadow-sm text-xs sm:text-sm font-bold text-sky-950">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-600" />
            </span>
            <span className="font-mono text-sky-700 tracking-wider">RAWAA ACADEMY</span>
          </div>
        )}

      </div>

    </div>
  );
}
