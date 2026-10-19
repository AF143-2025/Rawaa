'use client';

import React, { useState } from 'react';
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
  BookOpen, 
  Clock, 
  ChevronDown
} from 'lucide-react';
import { INITIAL_TRACKS } from '@/lib/mockData';
import { dataStore } from '@/lib/store';

export default function HomePage() {
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(0);
  const courses = dataStore.getCourses();
  const challenges = dataStore.getChallenges();
  const stats = dataStore.getPlatformStats();

  const FAQS = [
    {
      q: 'هل أحتاج إلى خبرة سابقة في البرمجة للبدء في المنصة؟',
      a: 'لا، تم تصميم المسارات لتبدأ معك من الصفر التام في مساري الشبكات ولينكس. كل ما تحتاجه هو جهاز حاسوب وشغف بالتعلم التقني.'
    },
    {
      q: 'هل أحتاج لتثبيت أي برامج أو خوادم وهمية على جهازي للتدريب العملي؟',
      a: 'إطلاقاً! جميع مختبرات منصة رواء—بما فيها طرفية Linux، حاسبة ومحاكي الشبكات، ومختبر فحص السجلات الأمنية—تعمل بشكل تفاعلي وآمن مباشرة من داخل متصفحك دون الحاجة لتثبيت برامج ثقيلة كـ VirtualBox أو تثبيت توزيعات أخرى.'
    },
    {
      q: 'كيف أضمن حفظ تقدمي التعليمي؟',
      a: 'يتم حفظ تقدمك تلقائياً عند إتمام كل درس، أو اجتياز أي اختبار، أو تسليم علم في التحديات، ويمكنك استكمال مسارك من أي متصفح مباشرة.'
    },
    {
      q: 'كيف يتم إصدار الشهادات والتحقق من صحتها؟',
      a: 'عند إكمال جميع دروس الدورة واجتياز اختبار التقييم بدرجة لا تقل عن 70%، يتم إصدار شهادة إتمام إلكترونية فورية برمز تحقق فريد (مثل RAWAA-NET-XXXXX)، ويمكن لأي جهة توظيف التحقق من صحتها مباشرة عبر بوابة التحقق في المنصة.'
    },
    {
      q: 'هل تحديات الأمن السيبراني والمختبرات قانونية وآمنة؟',
      a: 'نعم 100%. جميع السجلات والبيانات والسيناريوهات المستخدمة في المنصة هي بيانات اصطناعية ومحاكاة مصممة خصيصاً للأغراض التعليمية المصرح بها وفق أعلى المعايير الأخلاقية.'
    }
  ];

  return (
    <div className="space-y-24 pb-20 cyber-grid bg-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 md:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Soft pastel ambient glow orbs */}
        <div className="absolute top-10 right-1/4 w-96 h-96 glow-orb-cyan pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 glow-orb-green pointer-events-none" />

        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
          {/* Hero Brand Identity Showcase */}
          <div className="flex flex-col items-center justify-center space-y-4">
            
            {/* Cyber Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span className="font-semibold tracking-wide">المنصة التفاعلية الأولى للتقنيات والأنظمة الدفاعية</span>
            </div>

            {/* Clean Transparent Logo Presentation without clutter */}
            <div className="relative select-none py-2 flex flex-col items-center">
              {/* Soft ambient aura */}
              <div className="absolute -inset-8 bg-sky-200/40 rounded-full blur-3xl opacity-60 pointer-events-none animate-pulse" />

              {/* Pure Transparent Logo */}
              <div className="relative animate-logo-float transition-transform duration-300 hover:scale-105 cursor-pointer">
                <img
                  src="/logo.png"
                  alt="رواء | RAWAA Academy"
                  className="w-64 sm:w-80 md:w-96 max-w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(2,132,199,0.18)]"
                />
              </div>

              {/* Subtitle Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-50 border border-sky-200 shadow-sm text-xs sm:text-sm font-bold font-sans text-sky-950">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                <span>الأكاديمية العربية المتخصصة في هندسة الشبكات ولينكس والأمن السيبراني</span>
              </div>
            </div>
          </div>

          {/* Prominent Core Subject Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto pt-2">
            تعلّم <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600">الشبكات</span> و <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Linux</span> و <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-600">الأمن السيبراني</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            تجمع منصة <strong>رواء</strong> بين الشرح النظري العميق والتدريب العملي المعزول داخل المتصفح. ابنِ أساساً هندسياً صلباً وانطلق من الصفر إلى مستويات متقدمة في البنية التحتية وحماية النظم.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
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

          {/* Interactive Hero Terminal Preview */}
          <div className="mt-12 text-right bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl max-w-3xl mx-auto font-mono text-xs sm:text-sm text-gray-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="text-gray-400 mr-2 font-sans text-xs">rawaa-interactive-shell</span>
              </div>
              <span className="text-[11px] text-cyan-400 font-mono">v1.0 (Live Ready)</span>
            </div>
            <div className="space-y-2 text-left" dir="ltr">
              <p><span className="text-cyan-400">student@rawaa:~$</span> whoami</p>
              <p className="text-emerald-400">future-cyber-defender</p>
              <p><span className="text-cyan-400">student@rawaa:~$</span> rawaa --track=cybersecurity --mode=hands-on</p>
              <p className="text-gray-400">
                [+] Initializing isolated Linux lab environment... <span className="text-emerald-400">DONE</span><br />
                [+] Loading Network Simulator (CIDR & Subnetting Engine)... <span className="text-emerald-400">READY</span><br />
                [+] CTF & Defense challenges armed with automatic validation... <span className="text-cyan-400">ACTIVE</span>
              </p>
              <p className="pt-1">
                <span className="text-cyan-400">student@rawaa:~$</span> <span className="animate-pulse">_</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL STATS COUNTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

      {/* 4. LATEST COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold">
              FEATURED COURSES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">أحدث الدورات التدريبية</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              دورات تدمج الشرح المعمق مع اختبارات التقييم المعملية
            </p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            تصفح جميع الدورات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.slice(0, 3).map(course => (
            <div
              key={course.id}
              className="bg-white border border-slate-200 hover:border-sky-400 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={course.cover_image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-slate-900 shadow-sm">
                    {course.level}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      {course.duration_hours} ساعة
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      {course.total_lessons} دروس
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/courses/${course.slug}`}
                  className="w-full py-2.5 rounded-xl bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white border border-sky-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  عرض تفاصيل الدورة والدروس
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE LABS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

      {/* 6. EDUCATIONAL CYBER CHALLENGES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest font-bold">
            CAPTURE THE FLAG (CTF)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">التحديات الأمنية وصيد الأعلام</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            تحديات تعليمية مصممة لاختبار حدسك الأمني ومهاراتك في فك التشفير، تحليل الحزم، واكتشاف الثغرات.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map(chall => (
            <div
              key={chall.id}
              className="bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold">
                    {chall.category.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-sky-600 font-bold">
                    +{chall.points} نقطة
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                  {chall.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {chall.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-amber-600 font-medium">
                  {chall.difficulty}
                </span>
                <Link
                  href="/labs?tab=ctf"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
                >
                  ابدأ التحدي
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PLATFORM FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

      {/* 8. HOW LEARNING WORKS METHODOLOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-600 uppercase tracking-widest font-bold">
            METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">طريقة التعلم داخل منصة رواء</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            منهجية رباعية الخطوات مصممة لترسيخ المعرفة وبناء الخبرة العملية الفعلية.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative space-y-3">
            <span className="text-3xl font-black font-mono text-sky-400/40 block">01</span>
            <h4 className="text-base font-bold text-slate-900">1. التأسيس النظري</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              شروحات عربية أصيلة ومبسطة بالرسومات التوضيحية لهندسة البروتوكولات ومعمارية الأنظمة.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative space-y-3">
            <span className="text-3xl font-black font-mono text-emerald-400/40 block">02</span>
            <h4 className="text-base font-bold text-slate-900">2. التجربة المعملية</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              تنفيذ الأوامر في بيئة الطرفية أو حاسبة الشبكات لمشاهدة النتائج وسلوك الأنظمة بشكل حي.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative space-y-3">
            <span className="text-3xl font-black font-mono text-indigo-400/40 block">03</span>
            <h4 className="text-base font-bold text-slate-900">3. التحديات والتقييم</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              حل سيناريوهات فحص السجلات، الإجابة عن اختبارات الاختيار من متعدد، وحصد النقاط والأوسمة.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative space-y-3">
            <span className="text-3xl font-black font-mono text-amber-500/40 block">04</span>
            <h4 className="text-base font-bold text-slate-900">4. الإنجاز والاعتماد</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              إكمال متطلبات الدورة والحصول على شهادة إتمام رسمية موثقة برمز تحقق علني لسيرتك الذاتية.
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-sky-600 uppercase tracking-widest font-bold">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">الأسئلة الشائعة</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            إجابات واضحة ومباشرة عن منصة رواء وطريقة استخدامها
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = faqOpenIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 text-slate-900 hover:text-sky-600 transition-colors"
                >
                  <span className="text-sm font-bold">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-sky-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL CTA BANNER */}
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
