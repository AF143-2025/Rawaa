'use client';

import React, { useState, useEffect } from 'react';

interface ScrollMessage {
  id: string;
  minScroll: number;
  maxScroll: number;
  text: string;
  subtext: string;
  icon: string;
}

export default function HelloKittyScrollCompanion() {
  const [currentZone, setCurrentZone] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const [hearts, setHearts] = useState<number[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isBubblePopping, setIsBubblePopping] = useState<boolean>(false);

  // Motivational Messages that appear dynamically as the user scrolls through sections
  const zones: ScrollMessage[] = [
    {
      id: 'hero',
      minScroll: 0,
      maxScroll: 450,
      text: 'هيا نبدأ رواء! 🛡️✨',
      subtext: 'منصتج لتعلّم الأمن السيبراني 🎀',
      icon: '🛡️',
    },
    {
      id: 'tracks',
      minScroll: 450,
      maxScroll: 1100,
      text: 'تعلّمي وطوّري نفسج! 🌸💪',
      subtext: 'اختاري مسارج التخصصي وانطلقي 🚀',
      icon: '🌸',
    },
    {
      id: 'labs',
      minScroll: 1100,
      maxScroll: 1800,
      text: 'جاهزة للتطبيق العملي؟ 💻🎀',
      subtext: 'طرفية لينكس ومحاكي الشبكات بانتظارج!',
      icon: '💻',
    },
    {
      id: 'features',
      minScroll: 1800,
      maxScroll: 99999,
      text: 'مستقبلج التقني يبدأ من هنا! 🌟🚀',
      subtext: 'أنتِ قادرة تبنين خبرة احترافية حقيقية ✨',
      icon: '🌟',
    },
  ];

  // Extra fun phrases triggered on click
  const clickPhrases = [
    'عاشـت أيدج! مستمرين بالتعلم 💖',
    'ذكية ومتميزة في السيبراني! 🛡️',
    'خطوة خطوة نحو الاحتراف! 🚀',
    'كل يوم مهارة جديدة! 🎀',
    'فخورة بجهدج وطموحج! 🌸',
  ];

  // Track scroll position
  useEffect(() => {
    let lastZoneIdx = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const foundIdx = zones.findIndex(
        z => scrollY >= z.minScroll && scrollY < z.maxScroll
      );

      const activeIdx = foundIdx !== -1 ? foundIdx : zones.length - 1;

      if (activeIdx !== lastZoneIdx) {
        lastZoneIdx = activeIdx;
        setCurrentZone(activeIdx);
        // Trigger cute speech bubble pop animation
        setIsBubblePopping(true);
        setTimeout(() => setIsBubblePopping(false), 500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle interactive clicks on Hello Kitty
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClickCount(c => c + 1);
    setHearts(prev => [...prev, Date.now()]);
    setIsBubblePopping(true);
    setTimeout(() => setIsBubblePopping(false), 400);

    setTimeout(() => {
      setHearts(prev => prev.slice(1));
    }, 1200);
  };

  const activeZone = zones[currentZone] || zones[0];
  const displayedText = clickCount > 0 
    ? clickPhrases[(clickCount - 1) % clickPhrases.length] 
    : activeZone.text;

  return (
    <aside
      aria-label="رفيقة التعلم هيلو كيتي"
      className="fixed bottom-5 left-4 sm:left-6 md:left-8 z-40 select-none pointer-events-auto"
    >
      {/* Floating Hearts Animation */}
      {hearts.map(id => (
        <span
          key={id}
          className="absolute -top-10 left-8 text-lg pointer-events-none animate-bounce"
        >
          💖
        </span>
      ))}

      {isMinimized ? (
        /* Minimized Pill Button */
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 border border-pink-300 text-pink-700 text-xs font-bold shadow-lg hover:shadow-pink-200/50 hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
          title="افتحي رفيقة هيلو كيتي"
        >
          <img
            src="/brand/hello_kitty_right.png"
            alt="هيلو كيتي"
            className="w-6 h-6 object-contain"
          />
          <span>هيلو كيتي 🌸</span>
        </button>
      ) : (
        /* Expanded Companion with Speech Bubble */
        <div className="flex flex-col items-start gap-1.5 max-w-[270px] sm:max-w-[310px]">
          
          {/* Speech Bubble */}
          <div
            className={`relative bg-white/95 backdrop-blur-md border-2 border-pink-300 rounded-2xl p-3 shadow-xl shadow-pink-500/10 text-right transition-all duration-300 ${
              isBubblePopping ? 'scale-105 -translate-y-1 border-pink-400' : 'scale-100'
            }`}
          >
            {/* Close / Minimize button */}
            <button
              onClick={() => setIsMinimized(true)}
              className="absolute top-1.5 left-2 text-[10px] text-slate-400 hover:text-pink-600 transition-colors cursor-pointer"
              title="تصغير"
            >
              ✕
            </button>

            {/* Main Motivational Message */}
            <div className="flex items-center gap-1.5 pr-1">
              <span className="text-base">{activeZone.icon}</span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                {displayedText}
              </p>
            </div>

            {/* Subtext info */}
            <p className="text-[11px] text-slate-500 mt-0.5 pr-5 leading-relaxed font-medium">
              {activeZone.subtext}
            </p>

            {/* Speech Bubble Triangle pointing to Kitty */}
            <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b-2 border-r-2 border-pink-300 rotate-45" />
          </div>

          {/* Hello Kitty Interactive Character */}
          <div
            onClick={handleClick}
            className="group cursor-pointer flex items-center gap-2 pt-1 transition-transform hover:scale-110 active:scale-95 duration-200"
            title="انقري عليّ لتشجيع إضافي! 🎀"
          >
            {/* Kitty Avatar with Glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-pink-400/25 rounded-full blur-md -z-10 group-hover:bg-pink-400/50 transition-colors" />
              <img
                src="/brand/hello_kitty_right.png"
                alt="هيلو كيتي رفيقة التعلّم"
                className="w-14 sm:w-16 md:w-18 h-auto object-contain drop-shadow-[0_4px_10px_rgba(244,114,182,0.40)] animate-kitty-idle-left"
              />
              <span className="absolute -top-1 -right-1 text-xs animate-pulse">
                ✨
              </span>
            </div>

            {/* Click me hint badge */}
            <span className="text-[10px] font-bold text-pink-600 bg-pink-50 border border-pink-200/80 px-2 py-0.5 rounded-full shadow-sm group-hover:bg-pink-100 transition-colors">
              انقري عليّ 🎀
            </span>
          </div>

        </div>
      )}
    </aside>
  );
}
