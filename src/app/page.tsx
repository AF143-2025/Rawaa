'use client';

import React from 'react';
import RawaaAnimatedLogo from '@/components/brand/RawaaAnimatedLogo';
import HelloKittyBackgroundAnimation from '@/components/brand/HelloKittyBackgroundAnimation';
import HelloKittyScrollCompanion from '@/components/brand/HelloKittyScrollCompanion';
import HelloKittyAdviceCorner from '@/components/brand/HelloKittyAdviceCorner';

export default function HomePage() {
  return (
    <div className="relative cyber-grid bg-white min-h-screen overflow-hidden">
      {/* Hello Kitty Animated Ambient Background */}
      <HelloKittyBackgroundAnimation />

      {/* Hello Kitty Interactive Scroll Companion */}
      <HelloKittyScrollCompanion />
      
      {/* Main Content Sections Flow */}
      <div className="relative z-10 flex flex-col space-y-10 sm:space-y-12 pt-3 sm:pt-6 pb-6 sm:pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. HERO SECTION: BRAND LOGO WITH HELLO KITTY FLANKING */}
        <section id="hero" className="relative w-full overflow-hidden scroll-mt-28">
          {/* Soft pastel ambient glow orbs */}
          <div className="absolute top-5 right-1/4 w-96 h-96 glow-orb-cyan pointer-events-none" />
          <div className="absolute top-11 left-1/4 w-96 h-96 glow-orb-green pointer-events-none" />

          <div className="relative z-10 text-center space-y-4 max-w-4xl mx-auto">
            
            {/* Brand Identity: Logo + Compact Hello Kitty on Left & Right */}
            <div className="relative inline-flex items-center justify-center mx-auto">

              {/* Left Hello Kitty Sticker: Teacher / Idea pose with Cyber Shield */}
              <div className="absolute -left-3 sm:-left-8 md:-left-12 top-[55%] -translate-y-1/2 z-20 pointer-events-auto">
                <div 
                  className="relative group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex flex-col items-center"
                  title="هيلو كيتي تحمل درع الحماية 🛡️"
                >
                  <div className="absolute inset-0 bg-pink-400/25 rounded-full blur-lg -z-10 group-hover:bg-pink-400/50 transition-colors" />
                  <img
                    src="/brand/hello_kitty_idea.png"
                    alt="هيلو كيتي بدرع الأمان"
                    className="w-11 sm:w-14 md:w-16 h-auto object-contain drop-shadow-[0_3px_10px_rgba(244,114,182,0.35)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                  />
                  <div className="w-8 sm:w-10 h-1.5 rounded-full bg-slate-900/15 blur-[2px] mt-0.5 group-hover:w-9 transition-all" />
                </div>
              </div>

              {/* Professional Vector Animated RAWAA Emblem */}
              <RawaaAnimatedLogo variant="hero" showSubtitle={false} />

              {/* Right Hello Kitty Sticker: Triumphant Paws-Up Pose */}
              <div className="absolute -right-3 sm:-right-8 md:-right-12 top-[55%] -translate-y-1/2 z-20 pointer-events-auto">
                <div 
                  className="relative group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex flex-col items-center"
                  title="هيلو كيتي تحتفل بنجاح رواء 🎀"
                >
                  <div className="absolute inset-0 bg-pink-400/25 rounded-full blur-lg -z-10 group-hover:bg-pink-400/50 transition-colors" />
                  <img
                    src="/brand/hello_kitty_lifting.png"
                    alt="هيلو كيتي ترفع يديها للأعلى"
                    className="w-11 sm:w-14 md:w-16 h-auto object-contain drop-shadow-[0_3px_10px_rgba(244,114,182,0.35)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                  />
                  <div className="w-8 sm:w-10 h-1.5 rounded-full bg-slate-900/15 blur-[2px] mt-0.5 group-hover:w-9 transition-all" />
                </div>
              </div>

            </div>

            {/* Slogan & Description */}
            <div className="space-y-3 max-w-2xl mx-auto text-center pt-1">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
                <span>رواء | RAWAA</span>
                <span className="text-xl">🛡️</span>
              </h1>

              {/* Rectangular Badges for Values */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <span className="px-4 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 font-extrabold text-xs sm:text-sm shadow-sm">
                  تعلّيم
                </span>
                <span className="text-slate-300 font-bold">•</span>
                <span className="px-4 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 font-extrabold text-xs sm:text-sm shadow-sm">
                  تطوّير
                </span>
                <span className="text-slate-300 font-bold">•</span>
                <span className="px-4 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-xs sm:text-sm shadow-sm">
                  واحتَرِاف
                </span>
              </div>

              {/* Platform Tagline Card */}
              <div className="pt-1">
                <div className="inline-block px-5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold shadow-sm">
                  منصتج لتعلّم الأمن السيبراني وبناء مهاراتج المستقبلية
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. HELLO KITTY ADVICE CORNER FOR RAWAA */}
        <section id="kitty-advice" className="relative w-full scroll-mt-28">
          <HelloKittyAdviceCorner />
        </section>

      </div>
    </div>
  );
}
