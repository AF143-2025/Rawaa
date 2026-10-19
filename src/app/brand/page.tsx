'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Shield, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Eye, 
  FileCheck, 
  Smartphone, 
  ArrowRight,
  Palette,
  ExternalLink
} from 'lucide-react';
import RawaaBrandMaster from '@/components/brand/RawaaBrandMaster';

export default function BrandIdentityPage() {
  const [activeTab, setActiveTab] = useState<'transparent' | 'master' | 'vector' | 'icon' | 'certificate'>('transparent');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [transparentBg, setTransparentBg] = useState<'dark' | 'light' | 'checker'>('light');

  const colors = [
    { name: 'الفيروزي المتوهج (Cyber Cyan)', hex: '#00E5FF', desc: 'النبض السيبراني والدوائر الإلكترونية' },
    { name: 'الأزرق السماوي (Sky Blue)', hex: '#0284C7', desc: 'استقرار الشبكات وحماية البيانات' },
    { name: 'الأبيض النقي (Pure Luminous)', hex: '#FFFFFF', desc: 'الوضوح والمعرفة والشفافية الأكاديمية' },
    { name: 'الكحلي الأسود (Obsidian Navy)', hex: '#050B14', desc: 'العمق الأمني والفخامة التقنية' },
    { name: 'الزمردي السيبراني (Terminal Emerald)', hex: '#10B981', desc: 'حالة الأمان التشغيلي وأنظمة Linux' }
  ];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>العودة إلى المنصة الرئيسية</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              RAWAA BRAND IDENTITY
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 sm:py-16 space-y-12">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الهوية البصرية الرسمية • OFFICIAL BRANDMARK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            شعار «رِوَاء | RAWAA»
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            أكاديمية عربية متخصصة في هندسة الشبكات، إدارة أنظمة Linux، والأمن السيبراني.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('transparent')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'transparent'
                ? 'bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            الشعار الشفاف (بدون خلفية)
          </button>
          <button
            onClick={() => setActiveTab('master')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'master'
                ? 'bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            الرئيسي (8K)
          </button>
          <button
            onClick={() => setActiveTab('vector')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'vector'
                ? 'bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            المتجه التفاعلي (SVG)
          </button>
          <button
            onClick={() => setActiveTab('icon')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'icon'
                ? 'bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            أيقونة التطبيق
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'certificate'
                ? 'bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            الشهادات
          </button>
        </div>

        {/* ========================================================
            THE MAIN STAGE / LOGO CANVAS
            ======================================================== */}
        <div className="relative rounded-3xl border border-slate-800 bg-[#050B14] p-6 sm:p-12 overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[460px]">
          
          {/* Subtle Ambient Backlighting */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-sky-600/15 via-cyan-400/20 to-teal-500/10 blur-[100px]" />
          </div>

          {/* Tab 0: Transparent Isolated Exact Logo */}
          {activeTab === 'transparent' && (
            <div className="relative z-10 flex flex-col items-center text-center animate-fade-in max-w-xl w-full">
              {/* Background preview controls */}
              <div className="mb-6 flex items-center gap-2 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
                <span className="text-[11px] text-slate-400 px-2">معاينة الخلفية:</span>
                <button
                  onClick={() => setTransparentBg('light')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    transparentBg === 'light'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  أبيض نقي
                </button>
                <button
                  onClick={() => setTransparentBg('dark')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    transparentBg === 'dark'
                      ? 'bg-slate-800 text-cyan-400 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  كحلي داكن
                </button>
                <button
                  onClick={() => setTransparentBg('checker')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    transparentBg === 'checker'
                      ? 'bg-sky-950 text-cyan-300 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  شبكة الشفافية
                </button>
              </div>

              {/* Logo Preview Container */}
              <div
                className={`relative w-72 sm:w-80 md:w-96 aspect-square rounded-3xl p-6 flex items-center justify-center transition-all duration-300 border shadow-2xl ${
                  transparentBg === 'light'
                    ? 'bg-white border-slate-200 shadow-sky-500/10'
                    : transparentBg === 'dark'
                    ? 'bg-[#050B14] border-cyan-500/30 shadow-[0_0_50px_rgba(0,229,255,0.2)]'
                    : 'bg-[repeating-conic-gradient(#1e293b_0%_25%,#0f172a_0%_50%)] bg-[length:24px_24px] border-slate-700'
                }`}
              >
                <img
                  src="/brand/rawaa_exact_logo_clean.png"
                  alt="شعار رواء مفرغ شفاف"
                  className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(2,132,199,0.25)]"
                />
              </div>

              {/* Description */}
              <div className="mt-6 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-slate-100 text-xs sm:text-sm font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>الشعار الأصلي مفرّغ بدقة عالية (PNG شفاف مع قناة ألفا)</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  جاهز للاستخدام المباشر على أي خلفية بيضاء أو ملونة أو داكنة بدون أي حواف سوداء.
                </p>
              </div>

              {/* Download Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/brand/rawaa_exact_logo_clean.png"
                  download="RAWAA_Logo_Transparent.png"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل الشعار مفرغاً (PNG شفاف)</span>
                </a>

                <a
                  href="/brand/rawaa_exact_emblem_only.png"
                  download="RAWAA_Emblem_Only.png"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs transition-all"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>تحميل الأيقونة فقط (Emblem)</span>
                </a>
              </div>
            </div>
          )}

          {/* Tab 1: Master High-End Render */}
          {activeTab === 'master' && (
            <div className="relative z-10 flex flex-col items-center text-center animate-fade-in max-w-lg w-full">
              <div className="relative w-72 sm:w-96 aspect-square rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,229,255,0.25)] border border-cyan-500/30">
                <Image
                  src="/brand/rawaa_logo_master.jpg"
                  alt="شعار رواء الرسمي"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Slogan */}
              <div className="mt-8 flex flex-col items-center">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-slate-100 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-base font-bold">«تعلّم اليوم، واحمِ المستقبل.»</span>
                </div>
                <p className="mt-2 text-xs font-mono tracking-widest text-cyan-400">
                  RAWAA ACADEMY OF CYBER & SYSTEMS
                </p>
              </div>

              {/* Download Action */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/brand/rawaa_logo_master.jpg"
                  download="RAWAA_Master_Logo.jpg"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل الشعار عالي الدقة (8K)</span>
                </a>
              </div>
            </div>
          )}

          {/* Tab 2: Interactive Vector SVG */}
          {activeTab === 'vector' && (
            <div className="relative z-10 w-full flex flex-col items-center animate-fade-in">
              <RawaaBrandMaster
                variant="master"
                theme="dark-luxury"
                showSlogan={true}
                animated={true}
              />
            </div>
          )}

          {/* Tab 3: Scaled Icon Mark (Mobile / Favicon / Avatar) */}
          {activeTab === 'icon' && (
            <div className="relative z-10 flex flex-col items-center text-center space-y-8 animate-fade-in py-6">
              <p className="text-xs text-slate-400 max-w-md">
                رمز الشعار الهندسي المصغر؛ مصمم ليكون فائق الوضوح والتمييز حتى بأحجام صغيرة جداً (أيقونة التطبيق، الصورة الرمزية، Favicon).
              </p>
              
              <div className="flex items-end justify-center gap-8">
                {/* 128px */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-3 shadow-lg shadow-cyan-500/20">
                    <RawaaBrandMaster variant="icon" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">96px</span>
                </div>

                {/* 64px */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-xl bg-slate-900/90 border border-cyan-500/30 p-2 shadow-md">
                    <RawaaBrandMaster variant="icon" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">64px (App)</span>
                </div>

                {/* 32px */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-slate-900/90 border border-cyan-500/30 p-1 shadow-sm">
                    <RawaaBrandMaster variant="icon" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">32px (Favicon)</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Certificate / Light Mode Watermark */}
          {activeTab === 'certificate' && (
            <div className="relative z-10 w-full max-w-lg p-8 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 animate-fade-in flex flex-col items-center text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold mb-4">
                نسخة الشهادات والأختام التعليمية الرسمية
              </div>
              <div className="w-48 h-48 relative flex items-center justify-center">
                <RawaaBrandMaster variant="icon" className="w-36 h-36" />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-black text-slate-900">أكاديمية رِوَاء</h3>
                <p className="text-xs font-mono font-bold tracking-widest text-sky-700 uppercase">
                  RAWAA ACADEMY OF CYBER & SYSTEMS
                </p>
                <div className="mt-3 text-xs text-slate-500 font-medium">
                  معتمد لتوثيق شهادات إتمام المسارات والاعتمادات الأكاديمية.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ========================================================
            COLOR PALETTE TOKENS
            ======================================================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold text-white">لوحة الألوان المعتمدة (Color Palette)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => handleCopyColor(c.hex)}
                className="group p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all text-right flex flex-col justify-between h-32 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className="w-7 h-7 rounded-xl shadow-md border border-white/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-400 flex items-center gap-1">
                    {copiedColor === c.hex ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{c.hex}</span>
                      </>
                    )}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{c.name}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{c.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================
            DESIGN PILLARS & SPECIFICATIONS
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
              ١
            </div>
            <h3 className="text-sm font-bold text-white">خط عربي فني أصيل «رِوَاء»</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              كتابة واضحة ومميزة لكلمة رواء بالعربية مع مراعاة القواعد الإملائية والطباعية الصحيحة (ر - و - ا - ء)، مع دمج خطوط الطاقة والنبضات الرقمية بسلاسة.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-sky-950/80 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold">
              ٢
            </div>
            <h3 className="text-sm font-bold text-white">درع أمني وشبكة إلكترونية</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              إطار هندسي سداسي مستوحى من دروع الأمن السيبراني وعقد الاتصال الشبكي، يرمز للحماية والثقة والصلابة المؤسسية دون تعقيد بصري.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-teal-950/80 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold">
              ٣
            </div>
            <h3 className="text-sm font-bold text-white">استخدام تجاري مرن</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              توازن دقيق بين الشعار العربي الرئيسي وكتابة RAWAA الإنجليزية المتباعدة، مع شعار «تعلّم اليوم، واحمِ المستقبل.» ليلائم المنصة والتطبيقات والشهادات.
            </p>
          </div>
        </div>

      </main>

    </div>
  );
}
