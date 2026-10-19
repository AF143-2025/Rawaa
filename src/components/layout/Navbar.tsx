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

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/tracks', label: 'المسارات التعليمية' },
    { href: '/courses', label: 'الدورات التدريبية' },
    { href: '/labs', label: 'المختبرات العملية' },
    { href: '/dashboard', label: 'لوحة الإنجازات' },
    { href: '/verify', label: 'التحقق من الشهادات' },
  ];

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="رواء"
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(2,132,199,0.25)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  رِوَاء
                </span>
                <span className="w-2 h-2 rounded-full bg-sky-500 inline-block animate-pulse shadow-sm"></span>
              </div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-sky-600 uppercase -mt-1 font-extrabold">
                RAWAA ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all ${
                  isActive(link.href)
                    ? 'bg-sky-50 text-sky-700 border border-sky-200/80 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Direct CTA Button (No Login Barriers) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/courses"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-xs shadow-md shadow-sky-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>ابدأ التعلّم الآن مجاناً</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/courses"
              className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-bold text-xs"
            >
              ابدأ الآن
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200">
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-sm text-white font-extrabold flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
            >
              <BookOpen className="w-4 h-4" />
              استكشف الدورات وتعلّم فوراً
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
