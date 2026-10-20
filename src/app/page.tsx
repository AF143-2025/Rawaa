'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Terminal, 
  Network, 
  Cpu, 
  Award, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  BookOpen
} from 'lucide-react';
import { INITIAL_TRACKS } from '@/lib/mockData';
import { dataStore } from '@/lib/store';
import RawaaAnimatedLogo from '@/components/brand/RawaaAnimatedLogo';
import HelloKittyBackgroundAnimation from '@/components/brand/HelloKittyBackgroundAnimation';

export default function HomePage() {
  const stats = dataStore.getPlatformStats();

  return (
    <div className="relative space-y-24 pb-20 cyber-grid bg-white min-h-screen overflow-hidden">
      {/* Hello Kitty Animated Ambient Background */}
      <HelloKittyBackgroundAnimation />
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-3 sm:pt-5 md:pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Soft pastel ambient glow orbs */}
        <div className="absolute top-5 right-1/4 w-96 h-96 glow-orb-cyan pointer-events-none" />
        <div className="absolute top-11 left-1/4 w-96 h-96 glow-orb-green pointer-events-none" />

        <div className="relative z-10 text-center space-y-3 max-w-4xl mx-auto">
          {/* Hero Brand Identity Showcase with Fixed Hello Kitty Stickers on Left & Right */}
          <div className="relative flex items-center justify-center">

            {/* Left Hello Kitty Sticker (Fixed / Stable) */}
            <div className="absolute -left-2 sm:left-4 md:left-8 lg:left-14 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
              <div className="relative group hover:scale-105 transition-transform duration-300">
                <img
                  src="/brand/hello_kitty_right.png"
                  alt="ستيكر هيلو كيتي يسار"
                  className="w-16 sm:w-20 md:w-24 h-auto object-contain drop-shadow-[0_4px_12px_rgba(244,114,182,0.30)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
                />
              </div>
            </div>

            {/* Professional Vector Animated RAWAA Emblem */}
            <RawaaAnimatedLogo variant="hero" showSubtitle={false} />

            {/* Right Hello Kitty Sticker (Fixed / Stable) */}
            <div className="absolute -right-2 sm:right-4 md:right-8 lg:right-14 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
              <div className="relative group hover:scale-105 transition-transform duration-300">
                <img
                  src="/brand/hello_kitty_left.png"
                  alt="ستيكر هيلو كيتي يمين"
                  className="w-16 sm:w-20 md:w-24 h-auto object-contain drop-shadow-[0_4px_12px_rgba(244,114,182,0.30)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
                />
              </div>
            </div>
          </div>

          {/* Hero Slogan & Description */}
          <div className="space-y-3 max-w-2xl mx-auto text-center pt-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
              <span>رواء | RAWAA</span>
              <span className="text-xl">🛡️</span>
            </h2>

            {/* Rectangular Badges for Values */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="px-4 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 font-extrabold text-xs sm:text-sm shadow-sm">
                تعلّيم
              </span>
              <span className="text-slate-300 font-bold">•</span>
              <span className="px-4 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 font-extrabold text-xs sm:text-sm shadow-sm">
                تطوّير
              </span>
              <span className="text-slate-300 font-bold">•</span>
              <span className="px-4 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-xs sm:text-sm shadow-sm">
                واحتَرِاف
              </span>
            </div>

            {/* Rectangular Card for Platform Tagline */}
            <div className="pt-1">
              <div className="inline-block px-5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold shadow-sm">
                منصتج لتعلّم الأمن السيبراني وبناء مهاراتج المستقبلية
              </div>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/courses"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-sm shadow-md shadow-sky-500/25 hover:scale-105 transition-all flex items-center gap-2"
            >
              ابدأ رحلتك الآن مجاناً
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <Link
              href="/courses"
              className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              استكشف الدورات
            </Link>

            <Link
              href="/labs"
              className="px-7 py-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold text-sm transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-indigo-600" />
              المختبرات التفاعلية
            </Link>
          </div>
        </div>
      </section>

      {/* 2. REAL STATS COUNTER */}
      <section id="stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm backdrop-blur-sm">
          <div className="text-center space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold text-sky-600 font-mono">
              {stats.learningTracksCount}
            </span>
            <span className="text-xs text-slate-600 block font-medium">مسارات تخصصية شاملة</span>
          </div>
          <div className="text-center space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold text-emerald-600 font-mono">
              {stats.totalCourses}
            </span>
            <span className="text-xs text-slate-600 block font-medium">دورات تدريبية متكاملة</span>
          </div>
          <div className="text-center space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold text-indigo-600 font-mono">
              {stats.totalChallenges}
            </span>
            <span className="text-xs text-slate-600 block font-medium">تحديات ومختبرات معملية</span>
          </div>
          <div className="text-center space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold text-amber-600 font-mono">
              100%
            </span>
            <span className="text-xs text-slate-600 block font-medium">بيئات آمنة وقانونية</span>
          </div>
        </div>
      </section>

      {/* 3. LEARNING TRACKS SECTION */}
      <section id="tracks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-600 uppercase tracking-widest font-bold">
            CURRICULUM ROADMAP
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">المسارات التعليمية التخصصية</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            اختر مسارك وتدرج من المفاهيم الأساسية حتى هندسة البنى التحتية والتصدي للهجمات السيبرانية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_TRACKS.map(track => {
            const iconMap: Record<string, any> = {
              Network: Network,
              Terminal: Terminal,
              Shield: Shield,
              Cpu: Cpu
            };
            const Icon = iconMap[track.icon] || Shield;

            return (
              <div
                key={track.id}
                className="group relative bg-white border border-slate-200 hover:border-sky-400 rounded-3xl p-6 sm:p-8 transition-all hover:-translate-y-1 shadow-sm hover:shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center p-0.5 shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${track.color}, #F0F9FF)` }}
                    >
                      <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6" style={{ color: track.color }} />
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-medium">
                      {track.total_hours} ساعة تدريبية
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {track.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 block mt-0.5">{track.title_en}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {track.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-700 block mb-2">أبرز الموضوعات:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {track.topics.slice(0, 4).map((topic, i) => (
                        <li key={i} className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span className="truncate">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/tracks/${track.slug}`}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5 transition-colors"
                  >
                    عرض تفاصيل وخطة المسار
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <span className="text-[11px] font-mono text-slate-400">{track.level}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE LABS SHOWCASE */}
      <section id="labs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-mono">
                <Terminal className="w-4 h-4" />
                HANDS-ON ISOLATED SANDBOX
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                مختبرات تفاعلية حية داخل متصفحك مباشرة
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                لا نكتفي بتعليمك النظريات؛ نضعك أمام طرفية Linux حقيقية، محاكي شبكات ذكي، ومختبر لفحص السجلات الأمنية وكشف الهجمات دون أي تعقيدات في التثبيت.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 shrink-0">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">طرفية لينكس المعزولة</h4>
                    <p className="text-xs text-slate-400">تدرب على أوامر التنقل، نظام الصلاحيات، وإدارة الخدمات مع توجيه ذكي للمهام.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                    <Network className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">محاكي وحاسبة Subnetting</h4>
                    <p className="text-xs text-slate-400">احسب عناوين الشبكة والبث وعدد الأجهزة فورياً مع تدريبات تفاعلية متدرجة.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">مختبر التحقيق الأمني وتحديات CTF</h4>
                    <p className="text-xs text-slate-400">حلل سجلات الخوادم، اكتشف محاولات تسجيل الدخول المشبوهة، واستخرج الأعلام السرية.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/labs"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-black font-extrabold text-xs shadow-md transition-all"
                >
                  الدخول إلى منصة المختبرات
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick preview card */}
            <div className="bg-[#070B12] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-xs text-gray-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-cyan-400 font-sans">
                <span className="font-bold flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  عينة من مهمة التحقيق الأمني
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Live Mission</span>
              </div>

              <div className="space-y-2 text-left" dir="ltr">
                <span className="text-gray-500 block"># Objective: Identify the brute-force attacker IP</span>
                <p className="text-amber-300"><code>{`grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c`}</code></p>
                <div className="bg-black/60 p-3 rounded-lg border border-white/5 space-y-1">
                  <p className="text-rose-400">14  198.51.100.42  (Suspicious repeated attempts)</p>
                  <p className="text-gray-400"> 1  10.0.0.15      (Authorized student)</p>
                </div>
                <p className="text-emerald-400 font-sans pt-1">
                  ✓ تم تحديد العنوان المشبوه وتوثيقه في تقرير الاستجابة للحادث الأمني.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PLATFORM FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-600 uppercase tracking-widest font-bold">
            WHY RAWAA ACADEMY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">لماذا منصة رواء؟</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            صممت المنصة بمعايير هندسية تضمن انتقالك من متلقٍ للمعلومة إلى ممارس تقني مؤهل.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">تطبيق عملي فوري</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              لا نكتفي بالنصوص والفيديوهات؛ كل درس يرتبط بمهمة عملية واختبار فوري لتثبيت المفاهيم.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">شهادات قابلة للتحقق الرقمي</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تحصل على شهادة إتمام موثقة برمز تحقق رقمي دائم يمكن لأرباب العمل والشركات التحقق منها مباشرة.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">بيئات آمنة وقانونية 100%</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              بيئات المحاكاة والسيناريوهات الدفاعية تعمل وفق الأطر الأخلاقية دون تعريض أي أنظمة خارجية للمخاطر.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-700 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            جاهز للانطلاق في مسيرتك المهنية التقنية؟
          </h2>
          <p className="text-sm sm:text-base text-sky-100 max-w-xl mx-auto leading-relaxed">
            انضم إلى مجتمع مهندسي الغد في رواء وتدرّب على أحدث المهارات المطلوبة في سوق العمل العربي والعالمي.
          </p>
          <div className="pt-2">
            <Link
              href="/courses"
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm shadow-md hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              ابدأ التعلّم والتطبيق الآن
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
