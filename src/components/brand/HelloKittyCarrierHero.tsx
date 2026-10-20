'use client';

import React, { useState, useEffect } from 'react';

interface HelloKittyCarrierHeroProps {
  showSubtitle?: boolean;
}

export default function HelloKittyCarrierHero({ showSubtitle = false }: HelloKittyCarrierHeroProps) {
  // Animation phases:
  // 'running': 0 - 1.8s (Running in realistically from left and right)
  // 'lifting': 1.8s - 2.5s (Crouching and lifting the logo up into the air)
  // 'carrying': 2.5s+ (Proudly carrying the logo overhead in a synchronized rhythm)
  const [phase, setPhase] = useState<'running' | 'lifting' | 'carrying'>('running');
  const [tossCount, setTossCount] = useState(0);
  const [isTossing, setIsTossing] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('lifting');
    }, 1800);

    const t2 = setTimeout(() => {
      setPhase('carrying');
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 2000);
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Trigger playful toss & catch on click
  const handleToss = () => {
    if (phase !== 'carrying' || isTossing) return;
    setIsTossing(true);
    setTossCount(c => c + 1);
    setShowHearts(true);

    setTimeout(() => {
      setIsTossing(false);
      setTimeout(() => setShowHearts(false), 1500);
    }, 1200);
  };

  const isCarrying = phase === 'carrying';
  const isLifting = phase === 'lifting';

  return (
    <div
      onClick={handleToss}
      className="relative flex flex-col items-center justify-center select-none cursor-pointer group"
      title="انقر لتشجيع هيلو كيتي على رفع الشعار للأعلى! 💖"
    >
      {/* Floating celebratory hearts & sparkles */}
      {showHearts && (
        <div className="absolute -top-12 z-50 flex items-center gap-3 pointer-events-none animate-bounce">
          <span className="text-xl">✨</span>
          <span className="px-3 py-1 rounded-full bg-pink-500 text-white font-extrabold text-xs shadow-lg">
            {isTossing ? 'هوووبااا! 🚀💖' : 'شيلنا الشعار بنجاح! 🛡️✨'}
          </span>
          <span className="text-xl">💖</span>
        </div>
      )}

      {/* Soft Ambient Light Glow behind the logo */}
      <div className="absolute w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 rounded-full bg-gradient-to-tr from-sky-200/40 via-cyan-100/40 to-teal-100/30 blur-3xl pointer-events-none" />

      {/* Main Assembly (Lifted & Carried by Hello Kitty) */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-700 ${
          phase === 'running'
            ? 'translate-y-6 scale-95 opacity-90'
            : isLifting
            ? 'translate-y-2 scale-100'
            : isTossing
            ? 'animate-kitty-toss-logo'
            : 'animate-kitty-carried-logo'
        }`}
      >
        {/* Orbiting Circles Container */}
        <div className="relative w-72 sm:w-80 md:w-96 aspect-square flex items-center justify-center">

          {/* ============ ORBIT RING 1 (outermost, slow clockwise) ============ */}
          <div className="absolute inset-0 animate-orbit-1 pointer-events-none">
            <svg viewBox="0 0 420 420" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="210" cy="210" r="200" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />
            </svg>
            <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(0,229,255,0.75)]" />
            <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_10px_3px_rgba(14,165,233,0.7)]" />
          </div>

          {/* ============ ORBIT RING 2 (middle, counter-clockwise) ============ */}
          <div className="absolute inset-[24px] animate-orbit-2 pointer-events-none">
            <svg viewBox="0 0 356 356" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="178" cy="178" r="170" stroke="#00E5FF" strokeWidth="1.2" strokeDasharray="5 8" opacity="0.35" />
            </svg>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_3px_rgba(16,185,129,0.7)]" />
            <div className="absolute bottom-0 right-[15%] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_3px_rgba(0,229,255,0.6)]" />
          </div>

          {/* ============ ORBIT RING 3 (inner, fast clockwise) ============ */}
          <div className="absolute inset-[48px] animate-orbit-3 pointer-events-none">
            <svg viewBox="0 0 292 292" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx="146" cy="146" r="140" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 10" opacity="0.3" />
            </svg>
            <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_3px_rgba(56,189,248,0.7)]" />
          </div>

          {/* ============ CORNER PULSING DATA POINTS ============ */}
          <div className="absolute top-[16%] left-[10%] w-1.5 h-1.5 rounded-full bg-sky-400/60 animate-pulse" />
          <div className="absolute top-[12%] right-[14%] w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse delay-500" />
          <div className="absolute bottom-[14%] left-[12%] w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-pulse delay-1000" />
          <div className="absolute bottom-[10%] right-[10%] w-1.5 h-1.5 rounded-full bg-sky-500/60 animate-pulse" />

          {/* ============ CENTER: EXACT ISOLATED LOGO (NO BACKGROUND) ============ */}
          <div className="relative z-10 flex flex-col items-center justify-center p-1">
            <img
              src="/brand/rawaa_exact_logo_clean.png"
              alt="شعار رواء"
              className="w-52 sm:w-60 md:w-72 h-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)] drop-shadow-[0_12px_32px_rgba(2,132,199,0.30)] filter contrast-[1.05]"
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

      {/* ======================================================================
          HELLO KITTY CARRIER STICKERS (RUNNING -> LIFTING -> CARRYING)
          ====================================================================== */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-30">

        {/* LEFT HELLO KITTY: Runs from left, slips under bottom-left corner of logo, and lifts it up */}
        <div
          className={`absolute left-0 sm:left-4 md:left-8 bottom-[-8px] sm:bottom-[-12px] md:bottom-[-16px] pointer-events-auto transition-transform ${
            phase === 'running'
              ? 'animate-kitty-run-in-realistic-left'
              : isLifting
              ? 'animate-kitty-lift-left'
              : isTossing
              ? 'animate-kitty-toss-effort-left'
              : 'animate-kitty-carry-idle-left'
          }`}
        >
          {/* Dust & smoke puff while running */}
          {phase === 'running' && (
            <span className="absolute -left-4 bottom-2 text-sm opacity-75 animate-ping">
              💨
            </span>
          )}

          {/* Speech bubble */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 border border-pink-300 text-pink-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-md pointer-events-none">
            {isCarrying ? 'أنا شايلة من اليسار! 💪🎀' : 'جاية أركض! 🏃‍♀️💨'}
          </div>

          {/* Kitty Image: swaps from running to lifting pose with paws raised high */}
          <div className="relative">
            <img
              src={
                phase === 'running'
                  ? '/brand/hello_kitty_right.png'
                  : '/brand/hello_kitty_lifting.png'
              }
              alt="هيلو كيتي تحمل الشعار من اليسار"
              className="w-20 sm:w-24 md:w-28 h-auto object-contain drop-shadow-[0_4px_14px_rgba(244,114,182,0.40)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
            />
            {/* Sparkle on hands lifting the shield */}
            {isCarrying && (
              <span className="absolute top-0 right-2 text-xs text-amber-400 animate-pulse">
                ✨
              </span>
            )}
          </div>
        </div>

        {/* RIGHT HELLO KITTY: Runs from right, slips under bottom-right corner of logo, and lifts it up */}
        <div
          className={`absolute right-0 sm:right-4 md:right-8 bottom-[-8px] sm:bottom-[-12px] md:bottom-[-16px] pointer-events-auto transition-transform ${
            phase === 'running'
              ? 'animate-kitty-run-in-realistic-right'
              : isLifting
              ? 'animate-kitty-lift-right'
              : isTossing
              ? 'animate-kitty-toss-effort-right'
              : 'animate-kitty-carry-idle-right'
          }`}
        >
          {/* Dust & smoke puff while running */}
          {phase === 'running' && (
            <span className="absolute -right-4 bottom-2 text-sm opacity-75 animate-ping">
              💨
            </span>
          )}

          {/* Speech bubble */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 border border-pink-300 text-pink-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-md pointer-events-none">
            {isCarrying ? 'وحامية الشعار من اليمين! 🛡️✨' : 'جاية أركض! 🏃‍♀️💨'}
          </div>

          {/* Kitty Image: swaps from running to lifting pose with paws raised high */}
          <div className="relative">
            <img
              src={
                phase === 'running'
                  ? '/brand/hello_kitty_left.png'
                  : '/brand/hello_kitty_lifting_flipped.png'
              }
              alt="هيلو كيتي تحمل الشعار من اليمين"
              className="w-20 sm:w-24 md:w-28 h-auto object-contain drop-shadow-[0_4px_14px_rgba(244,114,182,0.40)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
            />
            {/* Sparkle on hands lifting the shield */}
            {isCarrying && (
              <span className="absolute top-0 left-2 text-xs text-cyan-400 animate-pulse">
                ✨
              </span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
