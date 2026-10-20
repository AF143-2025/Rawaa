'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, 
  X, 
  ArrowLeft,
  BookOpen,
  Terminal,
  Shield,
  Network,
  Award,
  Sparkles,
  ChevronDown,
  Layers,
  BarChart3,
  Cpu
} from 'lucide-react';
import RawaaAnimatedLogo from '@/components/brand/RawaaAnimatedLogo';

interface SectionItem {
  id: string;
  title: string;
  desc: string;
  icon: any;
  color: string;
  bg: string;
  pageHref?: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // All platform sections
  const platformSections: { category: string; items: SectionItem[] }[] = [
    {
      category: 'الأقسام التعليمية والتدريبية',
      items: [
        {
          id: 'tracks',
          title: 'المسارات التخصصية',
          desc: 'هندسة الشبكات، إدارة Linux، والأمن السيبراني',
          icon: Network,
          color: 'text-sky-600',
          bg: 'bg-sky-50',
          pageHref: '/tracks'
        },
        {
          id: 'courses',
          title: 'الدورات التدريبية',
          desc: 'دورات عملية متكاملة مع اختبارات تقييم فورية',
          icon: BookOpen,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          pageHref: '/courses'
        },
        {
          id: 'labs',
          title: 'المختبرات التفاعلية',
          desc: 'طرفية لينكس المعزولة، محاكي الشبكات، والتحقيق الأمني',
          icon: Terminal,
          color: 'text-indigo-600',
          bg: 'bg-indigo-50',
          pageHref: '/labs'
        },
        {
          id: 'challenges',
          title: 'تحديات صيد الأعلام (CTF)',
          desc: 'سيناريوهات دفاعية وعمليات كشف الثغرات وحصد النقاط',
          icon: Shield,
          color: 'text-purple-600',
          bg: 'bg-purple-50',
          pageHref: '/labs?tab=ctf'
        }
      ]
    },
    {
      category: 'عن المنصة والأدوات',
      items: [
        {
          id: 'features',
          title: 'لماذا رواء؟ (المميزات)',
          desc: 'التطبيق الفوري والبيئات الآمنة القانونية 100%',
          icon: Sparkles,
          color: 'text-cyan-600',
          bg: 'bg-cyan-50'
        },
        {
          id: 'stats',
          title: 'الإحصائيات الحية',
          desc: 'أعداد المسارات والدورات والتحديات النشطة',
          icon: BarChart3,
          color: 'text-teal-600',
          bg: 'bg-teal-50'
        }
      ]
    },
    {
      category: 'الشهادات والتحقق',
      items: [
        {
          id: 'verify',
          title: 'التحقق من الشهادات',
          desc: 'بوابة التحقق الفوري من مصداقية الشهادات الرقمية',
          icon: Award,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          pageHref: '/verify'
        },
        {
          id: 'dashboard',
          title: 'لوحة الإنجازات',
          desc: 'سجل إنجازاتك والدروس المكتملة والأوسمة',
          icon: Cpu,
          color: 'text-sky-600',
          bg: 'bg-sky-50',
          pageHref: '/dashboard'
        }
      ]
    }
  ];

  // Quick direct navbar links
  const primaryLinks = [
    { label: 'الرئيسية', id: 'hero', href: '/#hero' },
    { label: 'المسارات', id: 'tracks', href: '/#tracks' },
    { label: 'الدورات', id: 'courses', href: '/courses' },
    { label: 'المختبرات', id: 'labs', href: '/#labs' },
    { label: 'التحديات', id: 'challenges', href: '/labs?tab=ctf' },
    { label: 'لماذا رواء؟', id: 'features', href: '/#features' },
  ];

  // Close mega menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle smooth navigation to section
  const handleScrollToSection = (sectionId: string, pageHref?: string) => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);

    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // If not on homepage or element not found, navigate to hash
    if (pageHref && pathname !== '/') {
      router.push(pageHref);
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/#hero" className="group focus:outline-none flex items-center">
            <RawaaAnimatedLogo variant="navbar" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            
            {/* Direct Section Jump Links */}
            {primaryLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleScrollToSection(link.id, link.href)}
                className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50/70 transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            {/* Interactive 'All Sections' Mega Menu Button */}
            <div className="relative" ref={megaMenuRef}>
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  megaMenuOpen
                    ? 'bg-sky-100/80 text-sky-700 border border-sky-300/80 shadow-sm'
                    : 'bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-700 border border-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-sky-600" />
                <span>كل الأقسام</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
              </button>

              {/* Mega Menu Dropdown Panel */}
              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] lg:w-[740px] max-h-[80vh] overflow-y-auto bg-white/98 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-2xl shadow-sky-950/15 animate-fade-in z-50 text-right">
                  
                  {/* Header info bar */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                      <span className="text-xs font-bold text-slate-900">أقسام ومحتويات منصة رواء</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">انقر على أي قسم للانتقال إليه مباشرة</span>
                  </div>

                  {/* Section Groups Grid */}
                  <div className="space-y-6">
                    {platformSections.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-2.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                          {group.category}
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2.5">
                          {group.items.map(item => {
                            const IconComponent = item.icon;
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleScrollToSection(item.id, item.pageHref)}
                                className="group p-3 rounded-2xl border border-slate-100 hover:border-sky-300 hover:bg-sky-50/50 transition-all text-right flex items-start gap-3 cursor-pointer hover:shadow-sm"
                              >
                                <div className={`p-2 rounded-xl ${item.bg} ${item.color} shrink-0 group-hover:scale-105 transition-transform`}>
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors flex items-center gap-1">
                                    <span>{item.title}</span>
                                    <ArrowLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all text-sky-600" />
                                  </h4>
                                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">
                                    {item.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Footer Action */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <Link
                      href="/brand"
                      onClick={() => setMegaMenuOpen(false)}
                      className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-800 font-bold"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>دليل هوية الشعار والتحميل (Brand Kit)</span>
                    </Link>
                    <button
                      onClick={() => setMegaMenuOpen(false)}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer"
                    >
                      إغلاق القائمة
                    </button>
                  </div>

                </div>
              )}
            </div>

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
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu – Shows ALL Sections Clearly */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-8 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800">كل أقسام المنصة</span>
            <span className="text-[10px] text-sky-600 font-mono font-bold">RAWAA DIRECT NAVIGATION</span>
          </div>

          {/* All Sections for Mobile */}
          <div className="space-y-4 text-right">
            {platformSections.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                  {group.category}
                </span>

                <div className="grid grid-cols-1 gap-1.5">
                  {group.items.map(item => {
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleScrollToSection(item.id, item.pageHref)}
                        className="w-full p-2.5 rounded-xl border border-slate-100 hover:border-sky-300 hover:bg-sky-50 text-right flex items-center gap-3 transition-colors cursor-pointer"
                      >
                        <div className={`p-2 rounded-lg ${item.bg} ${item.color} shrink-0`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                          <p className="text-[10px] text-slate-500 truncate">{item.desc}</p>
                        </div>
                        <ArrowLeft className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-sm text-white font-extrabold flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
            >
              <BookOpen className="w-4 h-4" />
              <span>استكشف الدورات وتعلّم فوراً</span>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
