'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ArrowLeft,
  Home,
  Shield,
  Network,
  Terminal,
  Code2

} from 'lucide-react';
import RawaaAnimatedLogo from '@/components/brand/RawaaAnimatedLogo';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Primary navigation links across the platform
  const primaryLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الأساسات', href: '/foundations' },
    { label: 'الشبكات', href: '/networks' },
    { label: 'لينكس', href: '/linux' },
    { label: 'البرمجة', href: '/programming' },
  ];

  // Mobile navigation items
  const mobileNavItems = [
    { 
      label: 'الرئيسية', 
      href: '/', 
      icon: Home, 
      desc: 'واجهة المنصة ونظام التعلم',
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
      desc: 'مسار الحزم ونموذج الـ OSI والمحاكي',
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200'
    },
    { 
      label: 'إدارة أنظمة Linux', 
      href: '/linux', 
      icon: Terminal, 
      desc: 'الطرفية والصلاحيات والخدمات والأنابيب',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    { 
      label: 'البرمجة والأتمتة', 
      href: '/programming', 
      icon: Code2, 
      desc: 'سكربتات بايثون وباش الأمنية وفحص السجلات',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
  ];

  return (
    <header className="sticky top-3 sm:top-5 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      
      {/* Main Floating Navbar Capsule (يبقى النافبار عائم دائماً) */}
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-900/5 pointer-events-auto px-4 sm:px-6 transition-all">
        <div className="relative flex items-center justify-between h-16 sm:h-20">
          
          {/* Right: Logo & Brand */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="group focus:outline-none flex items-center active:scale-95 transition-transform">
              <RawaaAnimatedLogo variant="navbar" />
            </Link>
          </div>

          {/* Center: Perfectly Centered Navigation Links on Desktop (الكلام بالنص مع أنيميشن الضغط) */}
          <nav className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-1.5 lg:gap-2.5">
            {primaryLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all duration-200 active:scale-90 hover:scale-105 ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 border border-sky-200/90 shadow-sm scale-100'
                      : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Left: Desktop Decorative Balance Badge + Mobile Triple Icon Button (ثابت بمكانه) */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Desktop Left Balancing Ribbon */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50/70 border border-pink-200/80 shadow-2xs select-none">
              <img
                src="/brand/kitty_foundations.jpg"
                alt="هيلو كيتي"
                className="w-5 h-5 object-contain rounded-md"
              />
              <span className="text-[11px] font-bold text-pink-700">
                أكاديمية رواء 🌸
              </span>
            </div>

            {/* Mobile Actions: Clean Triple Icon (Hamburger Button - يبقى ثابت في النافبار العائم) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/90 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-90"
              aria-label="القائمة"
              title="القائمة"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-800 transition-transform duration-200" />
              ) : (
                <Menu className="w-5 h-5 text-slate-800 transition-transform duration-200" strokeWidth={2.2} />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* =========================================================================
          FLOATING MOBILE SECTIONS MENU (يفتح الأقسام تحت النافبار العائم ويبقى ثابتاً)
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 pointer-events-auto h-[calc(100dvh-5.5rem)] max-h-[calc(100dvh-5.5rem)] flex flex-col justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          
          <div className="flex-1 flex flex-col justify-between gap-2.5 my-1">
            {mobileNavItems.map(item => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex-1 px-3.5 py-2 sm:py-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 active:scale-95 ${
                    isActive
                      ? 'bg-sky-50 border-sky-300 text-sky-950 font-bold shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${item.bg} border ${item.border} ${item.color} flex items-center justify-center shrink-0`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-black block">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-medium">
                        {item.desc}
                      </span>
                    </div>
                  </div>

                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-sky-200/70 text-sky-800' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick hello kitty ribbon at the bottom of dropdown */}
          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between px-1 shrink-0">
            <div className="flex items-center gap-2">
              <img
                src="/brand/kitty_foundations.jpg"
                alt="هيلو كيتي"
                className="w-5 h-5 object-contain rounded-md"
              />
              <span className="text-[11px] font-bold text-pink-700">
                برفقة هيلو كيتي لدعم طموحج يا رواء 🌸
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-bold">
              RAWAA
            </span>
          </div>

        </div>
      )}

    </header>
  );
}
