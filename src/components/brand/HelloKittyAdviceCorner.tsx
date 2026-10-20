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
  Award
} from 'lucide-react';

interface AdviceItem {
  id: number;
  category: string;
  tag: string;
  advice: string;
  detail: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
}

export default function HelloKittyAdviceCorner() {
  const [activeAdviceIdx, setActiveAdviceIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);

  const ADVICES: AdviceItem[] = [
    {
      id: 1,
      category: 'نصيحة لتأسيس الأساسات',
      tag: 'هندسة الشبكات 🌐',
      advice: 'يا رواء، ابدئي بفهم كيف تسافر حزم البيانات في الشبكة (TCP/IP)؛ لأن كل دفاع أمني ناجح يعتمد على فهم هذا المسار!',
      detail: 'الشبكات هي عصب العالم الرقمي؛ لما تفهمين الـ IP والـ Ports وكيف الأجهزة تتواصل، راح تفهمين أي ثغرة أو هجمة فوراً.',
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
    }, 250);

    setTimeout(() => {
      setHearts(prev => prev.slice(1));
    }, 1200);
  };

  const current = ADVICES[activeAdviceIdx];
  const IconComponent = current.icon;

  return (
    <div className="space-y-10 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Main Interactive Advice Showcase Card */}
      <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-sky-50/30 rounded-3xl p-6 sm:p-10 border-2 border-pink-200/80 shadow-xl shadow-pink-500/5 overflow-hidden">
        
        {/* Soft Background Auras */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-300/15 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Heart Reactions */}
        {hearts.map(id => (
          <span
            key={id}
            className="absolute top-8 left-1/2 -translate-x-1/2 text-2xl pointer-events-none animate-bounce"
          >
            💖
          </span>
        ))}

        <div className="relative z-10 space-y-6">
          
          {/* Header Bar: Hello Kitty Badge + Advice Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pink-100 pb-4">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center p-1 shadow-sm">
                <img
                  src="/brand/hello_kitty_right.png"
                  alt="هيلو كيتي"
                  className="w-10 h-auto object-contain drop-shadow"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    هيلو كيتي تنصح رواء 🎀
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[11px] font-bold">
                    نصيحة اليوم
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  إرشادات وتوجيهات عملية خطوة بخطوة لبناء خبرتج التقنية
                </p>
              </div>
            </div>

            {/* Next Advice Button */}
            <button
              onClick={handleNextAdvice}
              className="px-4 py-2 rounded-xl bg-white hover:bg-pink-50 border border-pink-200 hover:border-pink-300 text-pink-700 text-xs font-extrabold shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
              <span>نصيحة جديدة لرواء 🌸</span>
            </button>

          </div>

          {/* Active Advice Speech Bubble Display */}
          <div
            className={`transition-all duration-300 ${
              isAnimating ? 'opacity-40 scale-98 translate-y-1' : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-4 text-right">
              
              <div className="flex items-center justify-between gap-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${current.bg} ${current.color} border ${current.border}`}>
                  {current.tag}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  نصيحة #{current.id} من {ADVICES.length}
                </span>
              </div>

              {/* Main Quote */}
              <blockquote className="text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
                « {current.advice} »
              </blockquote>

              {/* Explanation & Actionable Detail */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {current.detail}
              </p>

            </div>
          </div>

          {/* Interactive Advice Selection Dots */}
          <div className="flex items-center justify-center gap-2 pt-1">
            {ADVICES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAdviceIdx(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeAdviceIdx === idx
                    ? 'w-8 bg-pink-500 shadow-sm shadow-pink-500/30'
                    : 'w-2.5 bg-pink-200 hover:bg-pink-300'
                }`}
                title={`الانتقال للنصيحة رقم ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Grid of Key Advice Pillars for Rawaa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ADVICES.slice(0, 4).map((item, i) => {
          const IconComp = item.icon;
          const isSelected = activeAdviceIdx === i;

          return (
            <div
              key={item.id}
              onClick={() => setActiveAdviceIdx(i)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-right flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-pink-400 shadow-md -translate-y-1'
                  : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-pink-200 hover:shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">
                    0{item.id}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  {item.tag}
                </h4>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {item.advice}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-pink-600">
                <span>عرض النصيحة</span>
                <ArrowLeft className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Pathways for Rawaa to Put Advice into Action */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-lg text-center space-y-4">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center justify-center gap-2">
          <span>جاهزة تحولين النصائح إلى مهارات حقيقية يا رواء؟</span>
          <span>🛡️🚀</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          جميع الدروس والمختبرات المعزولة مصممة لتبدأ معج من الصفر حتى الاحتراف بدون الحاجة لأي تثبيت على جهازج.
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
