'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import RawaaAnimatedLogo from '@/components/brand/RawaaAnimatedLogo';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // The 5 primary links as requested: الرئيسية، الأساسات، الشبكات، لينكس، البرمجة
  const primaryLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الأساسات', href: '/foundations' },
    { label: 'الشبكات', href: '/networks' },
    { label: 'لينكس', href: '/linux' },
    { label: 'البرمجة', href: '/programming' },
  ];

  return (
    <header className="sticky top-3 sm:top-4 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-900/5 pointer-events-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="group focus:outline-none flex items-center">
            <RawaaAnimatedLogo variant="navbar" />
          </Link>

          {/* Desktop Navigation Links (الرئيسية، الأساسات، الشبكات، لينكس، البرمجة) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {primaryLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 border border-sky-200/90 shadow-sm'
                      : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Direct CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/courses"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-xs shadow-md shadow-sky-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>دليل الدورات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/courses"
              className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-bold text-xs"
            >
              الدورات
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border border-slate-200 mt-2 rounded-2xl px-4 pt-4 pb-6 space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto pointer-events-auto">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800">أقسام المنصة</span>
            <span className="text-[10px] text-sky-600 font-mono font-bold">RAWAA ACADEMY</span>
          </div>

          {/* Primary Quick Links for Mobile */}
          <div className="grid grid-cols-1 gap-2">
            {primaryLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-sky-50 border-sky-200 text-sky-700'
                      : 'bg-slate-50/70 border-slate-100 hover:bg-sky-50 text-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-extrabold text-xs shadow-md shadow-sky-500/20 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>دليل الدورات التدريبية</span>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
