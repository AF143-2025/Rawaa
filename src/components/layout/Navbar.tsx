'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  Menu, 
  X, 
  Sparkles, 
  ArrowLeft,
  LayoutDashboard,
  BookOpen
} from 'lucide-react';
import { dataStore } from '@/lib/store';

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
    <header className="sticky top-0 z-50 bg-[#08213C]/90 backdrop-blur-md border-b border-sky-400/20 shadow-lg shadow-sky-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl p-0.5 bg-gradient-to-tr from-sky-400 to-cyan-300 shadow-glow group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="رواء"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-sky-300 transition-colors">
                  رِوَاء
                </span>
                <span className="w-2 h-2 rounded-full bg-sky-400 inline-block animate-pulse shadow-glow"></span>
              </div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-sky-300 uppercase -mt-1 font-extrabold">
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
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-glow'
                    : 'text-sky-100/80 hover:text-white hover:bg-white/5'
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-black font-extrabold text-xs shadow-glow hover:scale-105 transition-all flex items-center gap-2"
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
              className="px-3 py-1.5 rounded-xl bg-sky-400 text-black font-bold text-xs"
            >
              ابدأ الآن
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 text-gray-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A2544] border-b border-sky-400/20 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-400/30'
                    : 'text-sky-100/90 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-sky-400/20">
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center rounded-xl bg-sky-400 text-sm text-black font-extrabold flex items-center justify-center gap-2 shadow-glow"
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
