'use client';

import React from 'react';
import Link from 'next/link';
import FoundationsSection from '@/components/sections/FoundationsSection';
import HelloKittyScrollCompanion from '@/components/brand/HelloKittyScrollCompanion';
import { ArrowRight } from 'lucide-react';

export default function FoundationsPage() {
  return (
    <div className="relative cyber-grid bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <HelloKittyScrollCompanion stickerSrc="/brand/kitty_foundations.jpg" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition-colors">الرئيسية</Link>
        <span>/</span>
        <span className="text-pink-600 font-bold">دليل الأساسات والأمن السيبراني الشامل 🌸🛡️</span>
      </div>

      <FoundationsSection />

      <div className="text-center pt-8 border-t border-slate-100">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-sky-600 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى الصفحة الرئيسية لمنصة رواء</span>
        </Link>
      </div>
    </div>
  );
}
