'use client';

import React, { useState } from 'react';

interface RawaaBrandMasterProps {
  variant?: 'master' | 'emblem-only' | 'icon' | 'horizontal';
  theme?: 'dark-luxury' | 'midnight-navy' | 'transparent' | 'pure-white';
  showSlogan?: boolean;
  animated?: boolean;
  className?: string;
}

export default function RawaaBrandMaster({
  variant = 'master',
  theme = 'dark-luxury',
  showSlogan = true,
  animated = true,
  className = ''
}: RawaaBrandMasterProps) {

  // Theme background styles
  const bgStyles = {
    'dark-luxury': 'bg-[#030712] text-white',
    'midnight-navy': 'bg-[#060D1F] text-white',
    'transparent': 'bg-transparent text-slate-900',
    'pure-white': 'bg-white text-slate-900 border border-slate-200 shadow-sm'
  };

  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="iconCyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="iconShieldFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B1A30" />
              <stop offset="100%" stopColor="#040914" />
            </linearGradient>
          </defs>

          {/* Hexagonal Shield */}
          <polygon
            points="60,8 106,28 106,86 60,112 14,86 14,28"
            fill="url(#iconShieldFill)"
            stroke="url(#iconCyberGrad)"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Internal Cyber Trace */}
          <path
            d="M60 20 V50 M60 50 L34 76 M60 50 L86 76"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="60" cy="20" r="4" fill="#38BDF8" />
          <circle cx="34" cy="76" r="4.5" fill="#10B981" />
          <circle cx="86" cy="76" r="4.5" fill="#00E5FF" />
          <circle cx="60" cy="50" r="5" fill="#FFFFFF" />

          {/* Bold stylized Calligraphy Raa / Rawaa emblem core */}
          <path
            d="M44 42 C54 34, 76 36, 72 54 C68 68, 52 86, 42 92"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl transition-all duration-300 ${bgStyles[theme]} ${className}`}>
      
      {/* Ambient Cybernetic Radial Glow (behind logo in dark modes) */}
      {(theme === 'dark-luxury' || theme === 'midnight-navy') && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden rounded-3xl">
          <div className="w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-sky-600/15 via-cyan-400/20 to-teal-500/10 blur-[90px] animate-pulse" />
        </div>
      )}

      {/* Main Vector SVG Logo */}
      <div className={`relative z-10 flex flex-col items-center max-w-full ${animated ? 'animate-logo-float' : ''}`}>
        
        <svg
          viewBox="0 0 520 540"
          className="w-full max-w-[420px] sm:max-w-[480px] h-auto drop-shadow-[0_20px_50px_rgba(0,229,255,0.22)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary Cyber Cyan-to-Sky-to-Emerald Gradient */}
            <linearGradient id="brandCyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="45%" stopColor="#00E5FF" />
              <stop offset="85%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            {/* Shield Body Deep Metallic Gradient */}
            <linearGradient id="brandShieldFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B1A30" />
              <stop offset="40%" stopColor="#071224" />
              <stop offset="100%" stopColor="#030814" />
            </linearGradient>

            {/* Arabic Calligraphy Luminous Gradient */}
            <linearGradient id="textLuminousGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#F0FDF4" />
              <stop offset="70%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>

            {/* Circuit Glow Filter */}
            <filter id="neonShieldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Soft Text Glow Filter */}
            <filter id="textGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ========================================================
              1. GEOMETRIC CYBER SECURITY SHIELD & NETWORK MATRIX
              ======================================================== */}
          {/* Outer Protective Hexagonal Cyber Shield */}
          <polygon
            points="260,20 470,110 470,360 260,470 50,360 50,110"
            fill="url(#brandShieldFill)"
            stroke="url(#brandCyberGrad)"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />

          {/* Inner Precision Inset Border */}
          <polygon
            points="260,38 450,120 450,348 260,450 70,348 70,120"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.5"
            strokeOpacity="0.45"
            strokeDasharray="6 4"
          />

          {/* ========================================================
              2. INTEGRATED ELECTRONIC CIRCUITS & NETWORK TRACES
              ======================================================== */}
          <g filter="url(#neonShieldGlow)" opacity="0.9">
            {/* Crown Backbone Circuit */}
            <path
              d="M260 38 V95"
              stroke="#00E5FF"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Top Right Bus */}
            <path
              d="M260 95 L370 148 V220 L400 240"
              stroke="#0284C7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Top Left Bus */}
            <path
              d="M260 95 L150 148 V220 L120 240"
              stroke="#0284C7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Bottom Cyber Network Convergence */}
            <path
              d="M150 330 L200 375 L260 410 L320 375 L370 330"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Vertical Support Struts */}
            <path
              d="M260 410 V450"
              stroke="#00E5FF"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Glowing Network Nodes (Pulsing Data Points) */}
          <circle cx="260" cy="38" r="5" fill="#38BDF8" />
          <circle cx="260" cy="95" r="7" fill="#00E5FF" className="animate-pulse" />
          <circle cx="370" cy="148" r="4.5" fill="#38BDF8" />
          <circle cx="150" cy="148" r="4.5" fill="#38BDF8" />
          <circle cx="400" cy="240" r="4.5" fill="#10B981" />
          <circle cx="120" cy="240" r="4.5" fill="#10B981" />
          <circle cx="200" cy="375" r="4" fill="#00E5FF" />
          <circle cx="320" cy="375" r="4" fill="#00E5FF" />
          <circle cx="260" cy="410" r="6" fill="#FFFFFF" className="animate-ping" />
          <circle cx="260" cy="410" r="5" fill="#00E5FF" />

          {/* ========================================================
              3. ARTISTIC ARABIC CALLIGRAPHY: «رِوَاء»
                 Crafted with integrated circuit nodes and glowing gradient
              ======================================================== */}
          {/* Ambient Glow behind text */}
          <g filter="url(#textGlow)">
            <text
              x="260"
              y="272"
              textAnchor="middle"
              fill="url(#textLuminousGrad)"
              stroke="#00E5FF"
              strokeWidth="2"
              fontSize="106"
              fontWeight="900"
              letterSpacing="2"
              style={{
                fontFamily: "'Cairo', 'Tajawal', 'Almarai', system-ui, -apple-system, sans-serif"
              }}
            >
              رِوَاء
            </text>
          </g>

          {/* Front Crisp Luminous Typography Layer */}
          <text
            x="260"
            y="272"
            textAnchor="middle"
            fill="url(#textLuminousGrad)"
            fontSize="106"
            fontWeight="900"
            letterSpacing="2"
            style={{
              fontFamily: "'Cairo', 'Tajawal', 'Almarai', system-ui, -apple-system, sans-serif"
            }}
          >
            رِوَاء
          </text>

          {/* Micro Digital Circuit Traces integrated across Arabic letters */}
          <path
            d="M178 286 L224 286 L238 274"
            stroke="#00E5FF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="178" cy="286" r="3.5" fill="#00E5FF" />
          <circle cx="238" cy="274" r="3" fill="#FFFFFF" />

          <path
            d="M290 286 L326 286 L342 272"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="290" cy="286" r="3.5" fill="#38BDF8" />
          <circle cx="342" cy="272" r="3" fill="#10B981" />

          {/* Cyber Accent Diamond over Alef */}
          <polygon
            points="260,140 266,150 260,160 254,150"
            fill="#00E5FF"
            className="animate-pulse"
          />

          {/* ========================================================
              4. ENGLISH HIGH-TECH TYPOGRAPHY: R A W A A
              ======================================================== */}
          {/* Subtle Cyber Wing Separator */}
          <line x1="120" y1="316" x2="210" y2="316" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <circle cx="260" cy="316" r="3" fill="#00E5FF" />
          <line x1="310" y1="316" x2="400" y2="316" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

          <text
            x="260"
            y="350"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="26"
            fontWeight="900"
            letterSpacing="14"
            style={{ fontFamily: "'Space Mono', 'JetBrains Mono', monospace" }}
          >
            RAWAA
          </text>

          <text
            x="260"
            y="368"
            textAnchor="middle"
            fill="#00E5FF"
            fontSize="10"
            fontWeight="800"
            letterSpacing="6"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            ACADEMY OF CYBER & SYSTEMS
          </text>
        </svg>

        {/* ========================================================
            5. OPTIONAL SLOGAN: «تعلّم اليوم، واحمِ المستقبل.»
            ======================================================== */}
        {showSlogan && (
          <div className="mt-8 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-sm sm:text-base font-bold text-slate-100 tracking-wide">
                «تعلّم اليوم، واحمِ المستقبل.»
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            
            <p className="mt-3 text-xs text-slate-400 font-mono tracking-wider">
              NETWORKS • LINUX SYSTEMS • CYBER DEFENSE
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
