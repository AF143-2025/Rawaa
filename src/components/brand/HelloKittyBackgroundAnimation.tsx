'use client';

import React from 'react';

export default function HelloKittyBackgroundAnimation() {
  // Array of floating background elements featuring Hello Kitty in multiple distinct poses!
  const floatingItems = [
    // Top-left: Hello Kitty with Bright Idea & Cyber Shield
    {
      type: 'kitty',
      src: '/brand/hello_kitty_idea.png',
      className: 'top-[8%] left-[4%] w-14 sm:w-16 md:w-20 opacity-20 animate-float-drift-1',
    },
    // Top-right: Hello Kitty Coding on Pink Laptop
    {
      type: 'kitty',
      src: '/brand/hello_kitty_coding.png',
      className: 'top-[12%] right-[5%] w-14 sm:w-16 md:w-20 opacity-20 animate-float-drift-2',
    },
    // Mid-left: Hello Kitty Triumphant Paws-Up
    {
      type: 'kitty',
      src: '/brand/hello_kitty_lifting.png',
      className: 'top-[42%] left-[2%] w-12 sm:w-16 opacity-15 animate-float-drift-3',
    },
    // Mid-right: Hello Kitty Coding
    {
      type: 'kitty',
      src: '/brand/hello_kitty_coding.png',
      className: 'top-[55%] right-[3%] w-12 sm:w-16 opacity-15 animate-float-drift-1',
    },
    // Lower floating: Hello Kitty Standing Joyfully
    {
      type: 'kitty',
      src: '/brand/hello_kitty_right.png',
      className: 'top-[80%] left-[8%] w-12 sm:w-14 opacity-15 animate-float-drift-2',
    },
    // Floating Iconic Hello Kitty Bows (🎀)
    {
      type: 'bow',
      className: 'top-[18%] left-[18%] text-pink-400/35 text-2xl animate-float-spin-slow',
    },
    {
      type: 'bow',
      className: 'top-[28%] right-[16%] text-rose-400/35 text-xl animate-float-spin-reverse',
    },
    {
      type: 'bow',
      className: 'top-[65%] left-[22%] text-pink-400/30 text-2xl animate-float-spin-slow',
    },
    {
      type: 'bow',
      className: 'top-[78%] right-[20%] text-rose-400/35 text-xl animate-float-spin-reverse',
    },
    // Cute Twinkling Stars (✨)
    {
      type: 'star',
      className: 'top-[15%] left-[32%] text-amber-400/40 text-lg animate-pulse',
    },
    {
      type: 'star',
      className: 'top-[22%] right-[30%] text-cyan-400/40 text-lg animate-pulse delay-700',
    },
    {
      type: 'star',
      className: 'top-[48%] left-[12%] text-pink-400/40 text-sm animate-pulse delay-1000',
    },
    {
      type: 'star',
      className: 'top-[72%] right-[10%] text-amber-400/40 text-base animate-pulse delay-500',
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Soft Pink & Celestial Cyan Ambient Glow Orbs */}
      <div className="absolute top-[5%] left-[10%] w-[450px] h-[450px] rounded-full bg-pink-200/25 blur-3xl animate-pulse duration-1000" />
      <div className="absolute top-[35%] right-[8%] w-[500px] h-[500px] rounded-full bg-sky-200/25 blur-3xl animate-pulse duration-700" />
      <div className="absolute top-[68%] left-[15%] w-[400px] h-[400px] rounded-full bg-pink-100/30 blur-3xl animate-pulse duration-1000" />

      {/* Floating Animated Hello Kitty & Bow Elements */}
      {floatingItems.map((item, idx) => {
        if (item.type === 'kitty') {
          return (
            <div key={idx} className={`absolute ${item.className}`}>
              <img
                src={item.src}
                alt="خلفية هيلو كيتي"
                className="w-full h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(244,114,182,0.30)]"
              />
            </div>
          );
        }

        if (item.type === 'bow') {
          return (
            <div key={idx} className={`absolute ${item.className}`}>
              🎀
            </div>
          );
        }

        return (
          <div key={idx} className={`absolute ${item.className}`}>
            ✨
          </div>
        );
      })}
    </div>
  );
}
