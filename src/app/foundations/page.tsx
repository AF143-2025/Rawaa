'use client';

import React from 'react';
import Link from 'next/link';
import FoundationsSection from '@/components/sections/FoundationsSection';
import HelloKittyScrollCompanion from '@/components/brand/HelloKittyScrollCompanion';
import { ArrowRight } from 'lucide-react';

export default function FoundationsPage() {
  return (
    <div className="relative cyber-grid bg-white min-h-screen pt-2 sm:pt-4 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <HelloKittyScrollCompanion stickerSrc="/brand/kitty_foundations.jpg" />

      {/* Centered Defined Rectangle Title Close to Navbar */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-2xl bg-white/95 border-2 border-pink-200/90 shadow-md shadow-pink-500/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <h1 className="text-xs sm:text-sm md:text-base font-black text-pink-700 tracking-tight">
            دليل الأساسات والأمن السيبراني الشامل 🌸
          </h1>
        </div>
      </div>

      <FoundationsSection />

      <div className="text-center pt-8 border-t border-slate-100">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-sky-600 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى منصة رواء</span>
        </Link>
      </div>
    </div>
  );
}
