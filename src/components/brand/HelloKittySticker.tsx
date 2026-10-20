'use client';

import React, { useState, useEffect } from 'react';

interface HelloKittyStickerProps {
  side: 'left' | 'right';
  className?: string;
}

export default function HelloKittySticker({ side, className = '' }: HelloKittyStickerProps) {
  const [isRunning, setIsRunning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    // The running entrance animation takes 1.6s
    const timer = setTimeout(() => {
      setIsRunning(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setHearts(prev => [...prev, Date.now()]);
    setTimeout(() => {
      setHearts(prev => prev.slice(1));
    }, 1200);
  };

  const isLeft = side === 'left';
  const imageSrc = isLeft ? '/brand/hello_kitty_right.png' : '/brand/hello_kitty_left.png';
  const tooltipText = isLeft ? 'يلا نبدأ التعلّم! 🎀' : 'حامية رواء اللطيفة 🛡️✨';

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative z-20 cursor-pointer select-none group transition-transform ${className}`}
      title="ستيكر هيلو كيتي اللطيفة - انقر للتفاعل!"
    >
      {/* Floating Hearts on Click / Hover */}
      {hearts.map(id => (
        <span
          key={id}
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm pointer-events-none animate-bounce"
        >
          💖
        </span>
      ))}

      {/* Cute Speech Bubble Tooltip */}
      <div
        className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-white/95 border border-pink-200 text-pink-700 text-[11px] font-bold shadow-md pointer-events-none transition-all duration-300 ${
          isHovered ? 'opacity-100 -translate-y-2 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <span>{tooltipText}</span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white/95" />
      </div>

      {/* Kitty Sticker Wrapper with Entry & Idle Animations */}
      <div
        className={`relative transition-all duration-300 ${
          isRunning
            ? isLeft
              ? 'animate-kitty-run-in-left'
              : 'animate-kitty-run-in-right'
            : isLeft
            ? 'animate-kitty-idle-left'
            : 'animate-kitty-idle-right'
        } ${isHovered ? 'scale-110 -translate-y-2' : ''}`}
      >
        {/* Soft pink ambient sticker glow */}
        <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-xl -z-10 group-hover:bg-pink-400/40 transition-colors" />

        {/* Hello Kitty High-Resolution Transparent Sticker */}
        <img
          src={imageSrc}
          alt={`هيلو كيتي ${isLeft ? 'اليسار' : 'اليمين'}`}
          className="w-20 sm:w-24 md:w-28 h-auto object-contain drop-shadow-[0_4px_12px_rgba(244,114,182,0.35)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] filter contrast-[1.03]"
        />

        {/* Cute Sparkle / Star indicator */}
        <span
          className={`absolute -top-1 ${
            isLeft ? '-right-1' : '-left-1'
          } text-xs text-amber-400 animate-pulse pointer-events-none`}
        >
          ✨
        </span>
      </div>
    </div>
  );
}
