'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Terminal, 
  BookOpen, 
  Network, 
  Shield, 
  Heart, 
  ArrowLeft,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

interface AdviceItem {
  id: number;
  category: string;
  tag: string;
  advice: string;
  detail: string;
  poseImage: string;
  poseDescription: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
}

export default function HelloKittyAdviceCorner() {
  const [activeAdviceIdx, setActiveAdviceIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);

  // The EXACT 5 advices requested to be kept intact, now paired with distinct Hello Kitty poses!
  const ADVICES: AdviceItem[] = [
    {
      id: 1,
      category: 'نصيحة لتأسيس الأساسات',
      tag: 'هندسة الشبكات 🌐',
      advice: 'يا رواء، ابدئي بفهم كيف تسافر حزم البيانات في الشبكة (TCP/IP)؛ لأن كل دفاع أمني ناجح يعتمد على فهم هذا المسار!',
      detail: 'الشبكات هي عصب العالم الرقمي؛ لما تفهمين الـ IP والـ Ports وكيف الأجهزة تتواصل، راح تفهمين أي ثغرة أو هجمة فوراً.',
      poseImage: '/brand/hello_kitty_idea.png',
      poseDescription: 'هيلو كيتي تحمل درع الحماية وتفكر بفكرة ذكية',
      icon: Network,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      border: 'border-sky-200'
    },
    {
      id: 2,
      category: 'نصيحة للطرفية والأوامر',
      tag: 'إدارة Linux 🐧',
      advice: 'يا رواء، لا تخافين من شاشة Linux السوداء؛ كل أمر تطبقينه بإيدج يبني داخلج عقلية مهندسة حقيقية!',
      detail: 'الطرفية مو صعبة؛ هي مجرد لغة حوار مباشرة وسريعة مع الخادم. تدربي على أوامر التنقل والصلاحيات في المختبر وراح تعشقينها.',
      poseImage: '/brand/hello_kitty_coding.png',
      poseDescription: 'هيلو كيتي تبرمج على لابتوب وردي مع سماعات رأس',
      icon: Terminal,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    {
      id: 3,
      category: 'نصيحة للاستمرار والنجاح',
      tag: 'تطوير الذات 💖',
      advice: 'يا رواء، سر الاحتراف مو بدراسة 10 ساعات بيوم واحد؛ السر بنصف ساعة تطبيق عملي يومياً بدون انقطاع!',
      detail: 'التراكم اليومي هو السحر الحقيقي؛ درس واحد ومهمة معملية واحدة كل يوم تخليج بعد 3 أشهر سابقة أقرانج بمراحل.',
      poseImage: '/brand/hello_kitty_lifting.png',
      poseDescription: 'هيلو كيتي ترفع يديها للأعلى احتفالاً بالنجاح والقوة',
      icon: Heart,
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      border: 'border-pink-200'
    },
    {
      id: 4,
      category: 'نصيحة للتطبيق المعملي',
      tag: 'الأمن السيبراني 🛡️',
      advice: 'يا رواء، النظري وحده يتبخر؛ دائماً افتحي مختبر رواء وجربي تحليل السجلات والبحث عن الثغرات بنفسج!',
      detail: 'الأمن السيبراني مهارة يد وعين، مثل قيادة الطائرة؛ التدريب على السجلات الحقيقية والأعلام هو اللي يخليج جاهزة لسوق العمل.',
      poseImage: '/brand/hello_kitty_idea.png',
      poseDescription: 'هيلو كيتي بدرع الأمان واستكشاف الثغرات',
      icon: Shield,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200'
    },
    {
      id: 5,
      category: 'نصيحة للثقة بالنفس',
      tag: 'إلهام وطموح 🌟',
      advice: 'يا رواء، ماكو شي مستحيل عليج؛ أكبر خبراء الأمن السيبراني بالعالم بدأوا من الصفر بنفس خطوتج هذه!',
      detail: 'الأخطاء أثناء التدريب هي أعظم معلم؛ كل ما تفشل مهمة وتكتشفين سببها، تعتبرين خطوتي خطوة عملاقة نحو الاحتراف.',
      poseImage: '/brand/hello_kitty_right.png',
      poseDescription: 'هيلو كيتي تقف بثقة وابتسامة مبهجة',
      icon: Sparkles,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    }
  ];

  const handleNextAdvice = () => {
    setIsAnimating(true);
    setHearts(prev => [...prev, Date.now()]);
    setTimeout(() => {
      setActiveAdviceIdx(idx => (idx + 1) % ADVICES.length);
      setIsAnimating(false);
    }, 220);

    setTimeout(() => {
      setHearts(prev => prev.slice(1));
    }, 1200);
  };

  const current = ADVICES[activeAdviceIdx];
  const IconComponent = current.icon;

  return (
    <div className="space-y-10 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* =========================================================================
          MAIN FEATURED ADVICE CARD WITH DYNAMIC HELLO KITTY POSES
          ========================================================================= */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border-2 border-pink-200/90 shadow-2xl shadow-pink-500/10 overflow-hidden">
        
        {/* Ambient Decorative Glows */}
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-pink-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Heart Reactions */}
        {hearts.map(id => (
          <span
            key={id}
            className="absolute top-10 left-1/2 -translate-x-1/2 text-2xl pointer-events-none animate-bounce z-50"
          >
            💖
          </span>
        ))}

        <div className="relative z-10 space-y-6">
          
          {/* Top Bar: Title & Next Advice Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pink-100 pb-5">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
              <div>
                <h3 className="text-base sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>هيلو كيتي تنصح رواء</span>
                  <span className="text-lg">🎀✨</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  إرشادات هندسية وتطبيقية مخصصة لبناء مهاراتج في الأمن السيبراني
                </p>
              </div>
            </div>

            {/* Next Advice Button */}
            <button
              onClick={handleNextAdvice}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-black shadow-md shadow-pink-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
              <span>نصيحة جديدة لرواء 🌸</span>
            </button>
          </div>

          {/* Active Advice Display: Hello Kitty Pose + Speech Bubble */}
          <div
            className={`grid grid-cols-1 md:grid-cols-12 gap-6 items-center transition-all duration-300 ${
              isAnimating ? 'opacity-40 scale-98 translate-y-1' : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            {/* Left Column: Hello Kitty Character in the Specific Matching Pose */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-3 text-center">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-2xl group-hover:bg-pink-400/40 transition-colors" />

                {/* Hello Kitty Pose Graphic */}
                <div className="relative w-36 sm:w-40 md:w-44 h-40 sm:h-44 md:h-48 flex items-center justify-center">
                  <img
                    src={current.poseImage}
                    alt={current.poseDescription}
                    className="max-w-full max-h-full object-contain drop-shadow-[0_6px_18px_rgba(244,114,182,0.40)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Grounding Contact Shadow */}
                <div className="w-24 h-2.5 rounded-full bg-slate-900/15 blur-[3px] mx-auto -mt-1" />
              </div>

              {/* Pose caption tag */}
              <span className="mt-2 text-[10px] font-bold text-pink-700 bg-pink-50 border border-pink-200/80 px-2.5 py-0.5 rounded-full">
                {current.poseDescription} 🎀
              </span>
            </div>

            {/* Right Column: The Quote & Actionable Detail */}
            <div className="md:col-span-8 bg-gradient-to-br from-slate-50 to-pink-50/40 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4 text-right">
              
              <div className="flex items-center justify-between gap-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${current.bg} ${current.color} border ${current.border} flex items-center gap-1.5`}>
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{current.tag}</span>
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">
                  #{current.id} من {ADVICES.length}
                </span>
              </div>

              {/* The Exact Unchanged Main Quote */}
              <blockquote className="text-base sm:text-lg md:text-xl font-black text-slate-900 leading-snug tracking-tight">
                « {current.advice} »
              </blockquote>

              {/* Detailed Actionable Explanation */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-200/60 font-medium">
                {current.detail}
              </p>

            </div>

          </div>

          {/* Interactive Navigation Pills for All 5 Advices */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-100">
            {ADVICES.map((adv, idx) => (
              <button
                key={adv.id}
                onClick={() => setActiveAdviceIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeAdviceIdx === idx
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25 scale-105'
                    : 'bg-white hover:bg-pink-50 text-slate-700 border border-slate-200 hover:border-pink-300'
                }`}
              >
                <span>{adv.tag}</span>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* =========================================================================
          THE 5 ADVICE CARDS GRID – SHOWCASING ALL POSES AT A GLANCE
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <span>جميع نصائح هيلو كيتي لرواء</span>
            <span className="text-pink-500 font-mono text-xs">(5 نصائح ذهبية)</span>
          </h4>
          <span className="text-xs text-slate-400 font-mono">انقري على أي نصيحة لعرضها بالتفصيل</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {ADVICES.map((item, i) => {
            const IconComp = item.icon;
            const isSelected = activeAdviceIdx === i;

            return (
              <div
                key={item.id}
                onClick={() => setActiveAdviceIdx(i)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-right flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-pink-400 shadow-md ring-2 ring-pink-400/20 -translate-y-1'
                    : 'bg-white/90 hover:bg-white border-slate-200/80 hover:border-pink-300 hover:shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  
                  {/* Top: Pose Icon Thumbnail & Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-pink-50/70 border border-pink-100 flex items-center justify-center p-1">
                      <img
                        src={item.poseImage}
                        alt={item.poseDescription}
                        className="w-full h-full object-contain drop-shadow"
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      0{item.id}
                    </span>
                  </div>

                  {/* Title Tag */}
                  <h5 className="text-xs font-bold text-slate-900 line-clamp-1 flex items-center gap-1">
                    <IconComp className={`w-3.5 h-3.5 ${item.color} shrink-0`} />
                    <span className="truncate">{item.tag}</span>
                  </h5>

                  {/* Advice Text Snippet */}
                  <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">
                    {item.advice}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-pink-600">
                  <span>{isSelected ? 'المعروضة حالياً' : 'عرض النصيحة'}</span>
                  <ArrowLeft className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          PRACTICE PATHWAY (APPLYING THE ADVICE)
          ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl text-center space-y-4">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center justify-center gap-2">
          <span>جاهزة لتطبيق نصائح هيلو كيتي عملياً يا رواء؟</span>
          <span>🛡️💻</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          جميع المختبرات المعزولة والدورات التخصصية جاهزة للتدريب الفوري مباشرة من متصفحك.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/courses"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            استكشفي الدورات والدروس
          </Link>

          <Link
            href="/labs"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs transition-all flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            الدخول للمختبرات التفاعلية
          </Link>
        </div>
      </div>

    </div>
  );
}
