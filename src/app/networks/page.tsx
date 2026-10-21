'use client';

import React from 'react';
import Link from 'next/link';
import NetworksSection from '@/components/sections/NetworksSection';
import HelloKittyScrollCompanion from '@/components/brand/HelloKittyScrollCompanion';
import { ArrowRight } from 'lucide-react';

export default function NetworksPage() {
  return (
    <div className="relative cyber-grid bg-white min-h-screen py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <HelloKittyScrollCompanion stickerSrc="/brand/kitty_networks.jpg" />

      {/* Centered Title */}
      <div className="text-center py-1">
        <span className="text-sm sm:text-base font-black text-cyan-600">
          دليل هندسة الشبكات والاتصالات الشامل 🌐
        </span>
      </div>

      <NetworksSection />

      <div className="text-center pt-8 border-t border-slate-100">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-cyan-600 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى منصة رواء</span>
        </Link>
      </div>
    </div>
  );
}
