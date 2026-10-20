'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Award, 
  Terminal, 
  BookOpen, 
  Network, 
  Shield, 
  Sparkles, 
  ArrowUp,
  Heart
} from 'lucide-react';
import RawaaAnimatedLogo from '@/components/brand/RawaaAnimatedLogo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white border-t-2 border-slate-100 text-slate-600 text-xs mt-4 sm:mt-6 select-none overflow-hidden">
      
      {/* Decorative Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-sky-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-8 sm:pb-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-100">
          
          {/* Brand & Identity Column (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-block group focus:outline-none">
                <RawaaAnimatedLogo variant="navbar" />
              </Link>
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                  <span>رواء | RAWAA</span>
                  <span className="text-sm">🛡️</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-400 font-bold">
                  CYBERSECURITY & NETWORKING ACADEMY
                </span>
              </div>
            </div>

            {/* Platform Values Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="px-3 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 font-extrabold text-[11px] shadow-sm">
                تعلّيم
              </span>
              <span className="text-slate-300 font-bold">•</span>
              <span className="px-3 py-1 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 font-extrabold text-[11px] shadow-sm">
                تطوّير
              </span>
              <span className="text-slate-300 font-bold">•</span>
              <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-[11px] shadow-sm">
                واحتَرِاف
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-medium">
              منصة تعليمية متخصصة في تأهيل ممارسي الأمن السيبراني وهندسة الشبكات وأنظمة Linux، عبر شروحات مبسطة ومختبرات معزولة مباشرة داخل المتصفح.
            </p>

            {/* Hello Kitty Cute Mascot Ribbon Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-pink-50/80 border border-pink-200/90 shadow-sm text-pink-700 text-xs font-bold">
              <img
                src="/brand/hello_kitty_right.png"
                alt="هيلو كيتي"
                className="w-5 h-5 object-contain"
              />
              <span>برفقة نصائح هيلو كيتي لدعم طموحج دائماً 🌸</span>
            </div>

          </div>

          {/* Quick Links: Tracks & Training (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono">
              المسارات التعليمية
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/foundations" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>الأساسات التقنية</span>
                </Link>
              </li>
              <li>
                <Link href="/networks" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>هندسة الشبكات</span>
                </Link>
              </li>
              <li>
                <Link href="/linux" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>إدارة أنظمة Linux</span>
                </Link>
              </li>
              <li>
                <Link href="/programming" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>البرمجة والأتمتة</span>
                </Link>
              </li>
              <li>
                <Link href="/tracks" className="text-sky-600 font-bold hover:underline transition-all">
                  جميع المسارات الأكاديمية ←
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Interactive Labs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono">
              المختبرات التفاعلية
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/labs?tab=linux" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>طرفية لينكس الافتراضية</span>
                </Link>
              </li>
              <li>
                <Link href="/labs?tab=network" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>حاسبة ومحاكي Subnetting</span>
                </Link>
              </li>
              <li>
                <Link href="/labs?tab=cyber" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>فحص وتحليل السجلات الأمنية</span>
                </Link>
              </li>
              <li>
                <Link href="/labs?tab=ctf" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>تحديات صيد الأعلام (CTF)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Verification & Portals (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono">
              البوابات والاعتماد
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/courses" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>الدورات التدريبية</span>
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 font-bold text-emerald-600">
                  <Award className="w-3.5 h-3.5 shrink-0" />
                  <span>التحقق من الشهادات</span>
                </Link>
              </li>
              <li>
                <Link href="/brand" className="hover:text-pink-600 transition-colors flex items-center gap-1.5 text-slate-600">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <span>دليل هوية الشعار</span>
                </Link>
              </li>
              <li>
                <Link href="/#kitty-advice" className="text-pink-600 font-bold hover:underline transition-all flex items-center gap-1">
                  <span>نصائح هيلو كيتي 🎀</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyrights & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          
          <div className="flex items-center gap-1.5 font-medium">
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
            <span className="font-bold text-slate-800">رواء | RAWAA Academy</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">منصتج لبناء المهارات التقنية المستقبلية</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 flex items-center gap-1">
              صُنعت بكل <Heart className="w-3 h-3 text-pink-500 fill-pink-500 inline" /> لدعم وتمكين رواء ✨
            </span>

            {/* Smooth Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-700 font-bold transition-all cursor-pointer shadow-sm"
              title="الصعود لأعلى الصفحة"
            >
              <span>للأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
