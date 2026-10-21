'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ArrowLeft,
  BookOpen,
  Home,
  Shield,
  Network,
  Terminal,
  Code2,
  Cpu,
  Sparkles
} from 'lucide-react';
import RawaaAnimatedLogo from '@/components/brand/RawaaAnimatedLogo';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock background scroll when full-screen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Primary desktop & quick links
  const primaryLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الأساسات', href: '/foundations' },
    { label: 'الشبكات', href: '/networks' },
    { label: 'لينكس', href: '/linux' },
    { label: 'البرمجة', href: '/programming' },
  ];

  // Full-screen mobile navigation items
  const fullScreenNavItems = [
    { 
      label: 'الرئيسية', 
      href: '/', 
      icon: Home, 
      desc: 'الواجهة الرئيسية والترحيب بنصائح هيلو كيتي',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      border: 'border-pink-200'
    },
    { 
      label: 'الأساسات التقنية', 
      href: '/foundations', 
      icon: Shield, 
      desc: 'مبادئ الأمن السيبراني ومثلث الـ CIA',
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      border: 'border-sky-200'
    },
    { 
      label: 'هندسة الشبكات', 
      href: '/networks', 
      icon: Network, 
      desc: 'مسار الحزم والـ OSI ومحاكي Subnetting',
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200'
    },
    { 
      label: 'إدارة أنظمة Linux', 
      href: '/linux', 
      icon: Terminal, 
      desc: 'الطرفية والصلاحيات وخدمات السيرفرات',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    { 
      label: 'البرمجة والأتمتة', 
      href: '/programming', 
      icon: Code2, 
      desc: 'أتمتة بايثون وباش وكواشف المنافذ',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
    { 
      label: 'دليل الدورات التدريبية', 
      href: '/courses', 
      icon: BookOpen, 
      desc: 'المناهج التعليمية الكاملة والدروس التطبيقية',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200'
    },
    { 
      label: 'المختبرات التفاعلية', 
      href: '/labs', 
      icon: Cpu, 
      desc: 'المحاكيات الحية والطرفية المعزولة',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200'
    },
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

          {/* Desktop Direct CTA Button */}
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

          {/* Mobile Actions: Courses Quick Button + Triple Icon Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/courses"
              className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-bold text-xs shadow-sm hover:bg-sky-600 transition-colors"
            >
              الدورات
            </Link>
            
            {/* The Triple Icon (Hamburger Button) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/90 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="فتح القائمة الرئيسية"
              title="القائمة"
            >
              <Menu className="w-5 h-5 text-slate-800" strokeWidth={2.2} />
            </button>
          </div>

        </div>
      </div>

      {/* =========================================================================
          FULL-SCREEN MOBILE MENU OVERLAY (تظهر على كل الشاشة بدون تغيير شكل المنصة)
          ========================================================================= */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
          style={{ height: '100dvh' }}
        >
          {/* Top Bar inside Full-Screen Menu */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-5 sm:px-6 py-4 flex items-center justify-between z-10 shadow-sm">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <RawaaAnimatedLogo variant="navbar" />
              <div className="text-right">
                <span className="text-sm font-black text-slate-900 block leading-tight">
                  رواء | RAWAA
                </span>
                <span className="text-[10px] font-mono text-sky-600 font-bold block">
                  CYBER ACADEMY
                </span>
              </div>
            </Link>

            {/* Clear Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-pink-100 text-slate-700 hover:text-pink-600 transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
              aria-label="إغلاق القائمة"
            >
              <span className="text-xs font-bold pl-1 hidden xs:inline">إغلاق</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Navigation Body */}
          <div className="flex-1 px-5 sm:px-6 py-5 space-y-2.5 max-w-lg mx-auto w-full">
            
            {/* List of Navigation Links as Clean Structured Cards */}
            <div className="grid grid-cols-1 gap-2.5">
              {fullScreenNavItems.map(item => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-2xl border transition-all flex items-center justify-between gap-3 active:scale-[0.98] ${
                      isActive
                        ? 'bg-sky-50/90 border-sky-300 text-sky-950 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-900 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${item.bg} border ${item.border} ${item.color} flex items-center justify-center shrink-0 shadow-sm`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black block">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-slate-500 block font-medium">
                          {item.desc}
                        </span>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-sky-200/70 text-sky-800' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>

          {/* Bottom Footer inside Full-Screen Menu */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-5 sm:px-6 py-4 shadow-inner">
            <div className="max-w-lg mx-auto w-full flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <img
                  src="/brand/kitty_foundations.jpg"
                  alt="هيلو كيتي"
                  className="w-7 h-7 object-contain rounded-lg"
                />
                <span className="text-[11px] font-bold text-pink-700">
                  برفقة هيلو كيتي لدعم طموحج يا رواء 🌸✨
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold">
                RAWAA v2.0
              </span>
            </div>
          </div>

        </div>
      )}
    </header>
  );
}
