'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Key, 
  Globe, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  RefreshCw,
  AlertCircle,
  Eye,
  FileCheck,
  Server,
  Terminal,
  Crosshair,
  ShieldCheck,
  Wifi,
  Cpu,
  Layers,
  Heart,
  BookOpen,
  Award,
  ChevronDown
} from 'lucide-react';

export default function FoundationsSection() {
  const [passwordInput, setPasswordInput] = useState('Rawaa@Cyber2026!');
  const [hashAlgorithm, setHashAlgorithm] = useState<'SHA-256' | 'MD5'>('SHA-256');

  // Interactive Attack/Defense Simulation State
  const [selectedScenario, setSelectedScenario] = useState<'brute_force' | 'phishing' | 'sqli'>('brute_force');
  const [simStep, setSimStep] = useState<'idle' | 'attacking' | 'defended'>('idle');

  // Simple demo hash function for UI demonstration
  const getDemoHash = (text: string, algo: string) => {
    if (!text) return '—';
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return algo === 'SHA-256' 
      ? `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852${hex}`.slice(0, 64)
      : `d41d8cd98f00b204e9800998ecf8${hex}`.slice(0, 32);
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (pass.length >= 12) score += 25;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const strength = calculateStrength(passwordInput);

  const getStrengthLabel = (s: number) => {
    if (s <= 25) return { text: 'ضعيفة جداً ⚠️ (تُخترق في ثوانٍ)', color: 'text-rose-600', bar: 'bg-rose-500' };
    if (s <= 50) return { text: 'متوسطة ⚡ (تستغرق ساعات بالحاسوب)', color: 'text-amber-600', bar: 'bg-amber-500' };
    if (s <= 75) return { text: 'قوية وممتازة 🛡️ (تستغرق سنوات)', color: 'text-sky-600', bar: 'bg-sky-500' };
    return { text: 'خارقة ومحصنة 💎 (تتطلب آلاف السنين)', color: 'text-emerald-600', bar: 'bg-emerald-500' };
  };

  const strengthInfo = getStrengthLabel(strength);

  // Scenarios data for the attack & defense simulator
  const scenarios = {
    brute_force: {
      title: 'هجوم القوة الغاشمة وتخمين كلمات المرور (Brute-Force Attack)',
      desc: 'محاولات تلقائية وسريعة لتجربة آلاف كلمات المرور كل ثانية للوصول لحساب المستخدم.',
      attackLog: '[!] المهاجم يرسل 500 محاولة دخول في الدقيقة باستخدام قائمة كلمات مرور مسربة (rockyou.txt)...',
      defenseLog: '[+] نظام الدفاع (Fail2Ban / Rate Limiting) رصد 5 محاولات فاشلة متتالية -> تم حظر عنوان IP المهاجم تلقائياً لمدة 24 ساعة، وتفعيل المصادقة الثنائية (2FA).',
      tool: 'Fail2Ban & MFA'
    },
    phishing: {
      title: 'هجوم التصيد الاحتيالي والهندسة الاجتماعية (Phishing Attack)',
      desc: 'إرسال بريد إلكتروني مخادع يشبه منصة بنكية أو خدمة مشهورة لسرقة بيانات تسجيل الدخول.',
      attackLog: '[!] تم إرسال بريد احتيالي بعنوان مضلل (rawaa-login.security-update.com) يطلب تأكيد كلمة المرور فجأة...',
      defenseLog: '[+] نظام الحماية فحص ترويسات البريد (SPF / DKIM / DMARC) وكتشف عدم مطابقة النطاق -> تم حجز الرسالة في Quarantine وتنبيه الموظفين.',
      tool: 'Email Security & DMARC'
    },
    sqli: {
      title: 'هجوم حقن قواعد البيانات (SQL Injection)',
      desc: 'إدخال أوامر SQL خبيثة في حقول الإدخال لتجاوز المصادقة أو استخراج بيانات سرية.',
      attackLog: '[!] المهاجم كتب في حقل اسم المستخدم: \' OR \'1\'=\'1\' -- بهدف تخطي تسجيل الدخول بدون كلمة سر...',
      defenseLog: '[+] خادم التطبيق يعتمد الاستعلامات المجهزة (Parameterized Queries) وتطهير المدخلات -> تم إحباط الحقن وتسجيل محاولة الاختراق في سجلات الأمان.',
      tool: 'Prepared Statements & WAF'
    }
  };

  const handleSimulate = (action: 'attack' | 'defend') => {
    if (action === 'attack') {
      setSimStep('attacking');
    } else {
      setSimStep('defended');
    }
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-14 text-right">
      
      {/* =========================================================================
          1. HEADER BANNER: HELLO KITTY WELCOMES RAWAA TO THE CYBER JOURNEY
          ========================================================================= */}
      <div className="bg-white border-2 border-pink-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-pink-500/5 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Right Column: Hero Information */}
          <div className="space-y-4 max-w-2xl text-right">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span>دليل الأساسات والأمن السيبراني الشامل 🌸🛡️</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              رحلة رواء في احتراف الأساسات والأمن السيبراني
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              مرتبة خطوة بخطوة: من فهم ماهية الأمن السيبراني ومثلث الـ CIA الذهبي، مروراً بنواقل التهديدات والدفاع في العمق، وحتى الأدوات العملية والمختبرات التفاعلية!
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 font-bold text-xs">
                6 محطات تعليمية مرتبة
              </span>
              <span className="px-3 py-1 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-bold text-xs">
                برفقة شروحات هيلو كيتي 🎀
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs">
                مختبرين تفاعليين مباشرين
              </span>
            </div>

          </div>

          {/* Left Column: Hello Kitty Teacher Character Box */}
          <div className="flex flex-col items-center justify-center text-center shrink-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-pink-400/25 rounded-full blur-2xl group-hover:bg-pink-400/40 transition-colors" />
              
              <div className="relative w-40 sm:w-48 h-40 sm:h-48 flex items-center justify-center p-2">
                <img
                  src="/brand/kitty_foundations.jpg"
                  alt="هيلو كيتي حارسة الأمن بالدرع السيبراني"
                  className="max-w-full max-h-full object-contain drop-shadow-[0_8px_20px_rgba(244,114,182,0.40)] group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                />
              </div>

              <div className="w-28 h-2 rounded-full bg-slate-900/15 blur-[2px] mx-auto -mt-2" />
            </div>

            {/* Speech bubble */}
            <div className="mt-3 px-4 py-2 rounded-2xl bg-pink-50 border border-pink-200 shadow-sm max-w-[240px]">
              <span className="text-[11px] font-black text-pink-700 block leading-snug">
                « أهلاً يا رواء! أنا معاج خطوة بخطوة لنفهم كل سر بالأمن السيبراني! 🌸 »
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          2. THE STEP-BY-STEP ROADMAP (NAVIGATION BAR FOR THE 6 STATIONS)
          ========================================================================= */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 px-1">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-pink-500" />
            <span>محطات الدليل التعليمي المنظم (انقري للانتقال لأي محطة):</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-400">CYBER ROADMAP</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'station-1', label: '1. المفهوم والهدف', icon: '🔰' },
            { id: 'station-2', label: '2. مثلث CIA الذهبي', icon: '📐' },
            { id: 'station-3', label: '3. كيف يفكر المهاجم؟', icon: '⚔️' },
            { id: 'station-4', label: '4. دروع الدفاع الـ 5', icon: '🛡️' },
            { id: 'station-5', label: '5. صندوق الأدوات', icon: '🧰' },
            { id: 'station-6', label: '6. المختبر العملي', icon: '🧪' },
          ].map(st => (
            <button
              key={st.id}
              onClick={() => scrollToAnchor(st.id)}
              className="p-2.5 rounded-xl bg-white hover:bg-pink-50 border border-slate-200 hover:border-pink-300 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <span>{st.icon}</span>
              <span className="truncate">{st.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          3. STATION 1: WHAT IS CYBERSECURITY? (المحطة الأولى: المفهوم)
          ========================================================================= */}
      <section id="station-1" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              01
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الأولى: ما هو الأمن السيبراني ولماذا تحتاجه رواء؟
              </h2>
              <span className="text-xs text-slate-500 font-medium">التعريف الجوهري والهدف الأساسي لحماية الأصول الرقمية</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            THE ESSENCE
          </span>
        </div>

        {/* Content Card with Hello Kitty commentary */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">1. حماية الأصول الرقمية</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                الأصول هي كل ما له قيمة رقمية: قواعد البيانات، كود التطبيقات، بيانات العملاء، وحسابات المستخدمين ضد السرقة أو التسريب.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <Crosshair className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">2. إدارة وسد الثغرات</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                البحث الاستباقي عن نقاط الضعف (Vulnerabilities) في الأنظمة والشبكات قبل أن يعثر عليها المهاجمون، وترقيعها فوراً.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-pink-50/60 border border-pink-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-pink-500 text-white flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">3. استمرارية الخدمات</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                ضمان بقاء السيرفرات تعمل دون توقف حتى لو تعرضت لأسوأ الهجمات، وسرعة استعادة البيانات عبر خطط التعافي من الكوارث.
              </p>
            </div>

          </div>

          {/* Hello Kitty Cute Commentary Note */}
          <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 flex items-start sm:items-center gap-3">
            <img
              src="/brand/kitty_running.jpg"
              alt="هيلو كيتي النشيطة"
              className="w-10 h-10 object-contain shrink-0 rounded-xl mt-0.5 sm:mt-0"
            />
            <div className="text-xs text-pink-900 font-bold leading-relaxed">
              <span className="text-pink-600 font-black block sm:inline sm:ml-1">💡 همسة هيلو كيتي الذكية:</span>
              « تخيلي الأمن السيبراني مثل قفل باب البيت، وكاميرات المراقبة، ونظام الإنذار مجتمعين مع بعض في عالم الكمبيوتر والإنترنت! 🏡✨ »
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          4. STATION 2: THE CIA TRIAD (المحطة الثانية: مثلث CIA الذهبي)
          ========================================================================= */}
      <section id="station-2" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              02
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الثانية: مثلث أمن المعلومات الذهبي (The CIA Triad)
              </h2>
              <span className="text-xs text-slate-500 font-medium">الركائز الثلاث التي يبنى عليها كل قرار وتدبير أمني في العالم</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
            CORE FOUNDATION
          </span>
        </div>

        {/* 3 Pillars Deep-Dive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Confidentiality */}
          <div className="bg-white border-2 border-sky-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  CONFIDENTIALITY
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">1. السرية والكتمان</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                ضمان أن البيانات لا يستطيع قراءتها إلا من يحمل الإذن والمفتاح المعتمد فقط.
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-800 block">كيف نحققها عملياً؟</span>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>تشفير التخزين: معيار AES-256</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>تشفير النقل: TLS 1.3 / HTTPS</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>صلاحيات الوصول: قوائم ACLs و RBAC</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-[11px] text-sky-900 font-semibold leading-relaxed">
              💡 مثال: عندما تسجلين دخولك، كلمة مرورك تُشفر بحيث لا يستطيع أي مخترق على شبكة Wi-Fi رؤيتها.
            </div>
          </div>

          {/* Pillar 2: Integrity */}
          <div className="bg-white border-2 border-emerald-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  INTEGRITY
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">2. السلامة والتكامل</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                التأكد من أن البيانات لم يتم تحريفها أو تزويرها أو حذفها أثناء إرسالها أو حفظها.
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-800 block">كيف نحققها عملياً؟</span>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>دوال التجزئة: SHA-256 Checksum</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>التواقيع الرقمية المشفرة (Signatures)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>سجلات الحماية المحصنة (Audit Logs)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 font-semibold leading-relaxed">
              💡 مثال: مطابقة كود التجزئة SHA للتأكد من أن الملف المحمل لم يدس المخترق فيه أي فيروس خبيث.
            </div>
          </div>

          {/* Pillar 3: Availability */}
          <div className="bg-white border-2 border-pink-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600">
                  <Server className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                  AVAILABILITY
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">3. التوافر والاستمرارية</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                ضمان بقاء السيرفرات والشبكات متاحة وتعمل في أي لحظة يحتاجها المستخدمون دون انقطاع.
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-800 block">كيف نحققها عملياً؟</span>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span>الحماية من هجمات حجب الخدمة (DDoS)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span>الخوادم التكرارية وموازنات الأحمال</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span>النسخ الاحتياطي التلقائي (Backups)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-pink-50 border border-pink-100 text-[11px] text-pink-900 font-semibold leading-relaxed">
              💡 مثال: منصة رواء تظل تعمل دائماً حتى لو هاجمها مجرمون بملايين الطلبات المزيفة لإيقافها!
            </div>
          </div>

        </div>

        {/* Hello Kitty Speech Bubble for CIA */}
        <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 flex items-center gap-3">
          <img
            src="/brand/kitty_foundations.jpg"
            alt="هيلو كيتي بدرع الحماية"
            className="w-10 h-10 object-contain shrink-0 rounded-xl"
          />
          <div className="text-xs text-pink-900 font-bold leading-relaxed">
            <span className="text-pink-600 font-black ml-1">🎀 هيلو كيتي توضح القاعدة:</span>
            « يا رواء، مثلث الـ CIA هو بوصلتج الأساسية؛ أي هجوم سيبراني بالعالم هدفه يكسر وحدة من هالركائز الثلاثة: إما يسرق السرية، أو يخرب السلامة، أو يعطل التوافر! »
          </div>
        </div>

      </section>

      {/* =========================================================================
          5. STATION 3: HOW ATTACKERS THINK (المحطة الثالثة: أساليب الهجوم)
          ========================================================================= */}
      <section id="station-3" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              03
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الثالثة: كيف يفكر المهاجم؟ أشهر 4 هجمات وكيف نصدها
              </h2>
              <span className="text-xs text-slate-500 font-medium">فهم نواقل التهديدات ونقاط الضعف التي يستهدفها الخصوم</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
            ATTACK VECTORS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-3 shadow-2xs hover:border-rose-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-0.5 rounded-full">
                العامل البشري
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">THREAT 01</span>
            </div>
            <h3 className="text-sm font-black text-slate-900">الهندسة الاجتماعية والتصيد (Phishing)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              خداع عواطف وفضول الضحية عبر رسائل بريد أو اتصالات مزيفة لدفعها للضغط على رابط خبيث أو كشف بيانات الدخول الحساسة.
            </p>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
              🛡️ درع الصد: تفعيل المصادقة الثنائية (2FA)، وتدريب الوعي الأمني، وفلاتر البريد DMARC.
            </div>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-3 shadow-2xs hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full">
                أمن تطبيقات الويب
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">THREAT 02</span>
            </div>
            <h3 className="text-sm font-black text-slate-900">ثغرات الويب وحقن الأوامر (OWASP Top 10)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              استغلال الثغرات البرمجية مثل حقن قواعد البيانات (SQLi) والسكربتات عبر المواقع (XSS) لتخطي تسجيل الدخول وسرقة البيانات.
            </p>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
              🛡️ درع الصد: تطهير المدخلات (Input Sanitization) واستخدام جدار ناري للتطبيقات WAF.
            </div>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-3 shadow-2xs hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-0.5 rounded-full">
                أمن الشبكات
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">THREAT 03</span>
            </div>
            <h3 className="text-sm font-black text-slate-900">هجمات اعتراض البيانات (Man-in-the-Middle)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              اعتراض البيانات المتبادلة بين الضحية والسيرفر (خاصة عبر شبكات Wi-Fi العامة غير المشفرة) لقراءة كلمات السر والتنصت.
            </p>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
              🛡️ درع الصد: فرض بروتوكول التشفير HTTPS، واستخدام شبكات VPN، والشهادات الموثوقة.
            </div>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-3 shadow-2xs hover:border-purple-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-0.5 rounded-full">
                البرمجيات الخبيثة
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">THREAT 04</span>
            </div>
            <h3 className="text-sm font-black text-slate-900">برمجيات الفدية والابتزاز (Ransomware)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              تشفير جميع ملفات السيرفر أو الشركة بمفتاح سري لا يملكه إلا المبتز، ومطالبة الضحية بدفع مبالغ ضخمة لفك التشفير.
            </p>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
              🛡️ درع الصد: تطبيق قاعدة النسخ الاحتياطي المعزول (3-2-1) وتحديث وتأمين السيرفرات دورياً.
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          6. STATION 4: DEFENSE IN DEPTH (المحطة الرابعة: دروع الدفاع الـ 5)
          ========================================================================= */}
      <section id="station-4" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              04
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الرابعة: القواعد الذهبية الخمس للدفاع في العمق
              </h2>
              <span className="text-xs text-slate-500 font-medium">المبادئ الاستراتيجية لبناء حصن أمني متين لا يمكن اختراقه بسهولة</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            DEFENSE IN DEPTH
          </span>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
              <span className="text-xs font-mono font-black text-sky-400">01. الصلاحيات</span>
              <h3 className="text-xs font-bold text-white">الامتياز الأقل (Least Privilege)</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                لا تمنحي أي مستخدم أو برنامج صلاحيات root إلا بالقدر المحدد لإنجاز المهمة فقط.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
              <span className="text-xs font-mono font-black text-cyan-400">02. المصادقة</span>
              <h3 className="text-xs font-bold text-white">المصادقة المتعددة (MFA)</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                حتى لو تسربت كلمة السر، لا يستطيع المهاجم الدخول بدون كود الهاتف المباشر.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
              <span className="text-xs font-mono font-black text-emerald-400">03. العزل</span>
              <h3 className="text-xs font-bold text-white">تجزئة الشبكة (Segmentation)</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                عزل أجهزة الموظفين عن السيرفرات الحساسة عبر VLANs، فإذا سقط جهاز لا يسقط النظام كله.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
              <span className="text-xs font-mono font-black text-amber-400">04. الترقيع</span>
              <h3 className="text-xs font-bold text-white">التحديث المستمر (Patching)</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                أغلب الاختراقات تقع بسبب ثغرات قديمة معروفة أهمل المسؤولون تحديثها!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
              <span className="text-xs font-mono font-black text-pink-400">05. الاستعادة</span>
              <h3 className="text-xs font-bold text-white">النسخ المعزول (Offline Backup)</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                نسخة غير متصلة بالإنترنت لحماية البيانات من برمجيات الفدية مهما بلغت قوتها.
              </p>
            </div>

          </div>

          {/* Hello Kitty Tip for Defense */}
          <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
            <img
              src="/brand/hello_kitty_lifting.png"
              alt="هيلو كيتي ترفع يديها للأعلى"
              className="w-10 h-10 object-contain shrink-0"
            />
            <p className="text-xs text-pink-300 font-bold leading-relaxed">
              « يا رواء، كلمة &apos;دفاع في العمق&apos; معناها ما نعتمد على جدار حماية واحد بس؛ نبني طبقات حماية متتالية تضمن الأمان التام للنظام! 🛡️🌸 »
            </p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          7. STATION 5: THE CYBER TOOLSET (المحطة الخامسة: صندوق أدوات المهندسة)
          ========================================================================= */}
      <section id="station-5" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              05
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الخامسة: صندوق أدوات المهندسة السيبرانية (Essential Toolset)
              </h2>
              <span className="text-xs text-slate-500 font-medium">الأدوات البرمجية القياسية التي ستستخدمينها يومياً في العمل والمختبر</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            PRACTICAL TOOLS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs text-right">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 font-bold">
              <Wifi className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Wireshark & tcpdump</h3>
            <span className="text-[11px] font-mono font-bold text-sky-600 block">محلل حزم الشبكة (Packet Sniffer)</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              لفحص كل حزمة بيانات تمر في الشبكة بالملي ثانية، واكتشاف أي اتصالات مشبوهة أو تسريب للمعلومات غير المشفرة.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs text-right">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 font-bold">
              <Crosshair className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Nmap (Network Mapper)</h3>
            <span className="text-[11px] font-mono font-bold text-cyan-600 block">فاحص المنافذ والخوادم</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              الأداة الأسطورية لاستكشاف الأجهزة المتصلة بالشبكة، والمنافذ المفتوحة، وإصدارات أنظمة التشغيل والخدمات.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs text-right">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Kali Linux & Bash</h3>
            <span className="text-[11px] font-mono font-bold text-emerald-600 block">بيئة العمل والطرفية المتكاملة</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              يحتوي على مئات الأدوات الجاهزة للاختبار الأمني والتحقيق الجنائي الرقمي ومراقبة السجلات باحترافية.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs text-right">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Python & Burp Suite</h3>
            <span className="text-[11px] font-mono font-bold text-amber-600 block">فحص الويب والأتمتة</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              اعتراض طلبات الويب وفحص ثغرات التطبيقات، وكتابة سكربتات بايثون ذكية لأتمتة فحص المنافذ وتحليل السجلات.
            </p>
          </div>

        </div>

      </section>

      {/* =========================================================================
          8. STATION 6: INTERACTIVE PRACTICAL LAB (المحطة السادسة: المختبر)
          ========================================================================= */}
      <section id="station-6" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-pink-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              06
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة السادسة: المختبر العملي التفاعلي مع هيلو كيتي
              </h2>
              <span className="text-xs text-slate-500 font-medium">تطبيق عملي مباشر: سيناريوهات الهجوم والدفاع وفحص التشفير</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
            HANDS-ON LABS
          </span>
        </div>

        {/* LAB 1: ATTACK & DEFENSE SCENARIOS */}
        <div className="bg-white border-2 border-indigo-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  مختبر تفاعلي: محاكي سيناريوهات الهجوم والدفاع المباشر
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  اختاري نوع الهجوم، وشاهدي كيف يتحرك المهاجم وكيف يرد المهندس السيبراني لإحباطه فوراً!
                </p>
              </div>
            </div>

            {/* Scenario Selector Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { setSelectedScenario('brute_force'); setSimStep('idle'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedScenario === 'brute_force' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                قوة غاشمة (Brute Force)
              </button>
              <button
                onClick={() => { setSelectedScenario('phishing'); setSimStep('idle'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedScenario === 'phishing' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                تصيد (Phishing)
              </button>
              <button
                onClick={() => { setSelectedScenario('sqli'); setSimStep('idle'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedScenario === 'sqli' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                حقن (SQL Injection)
              </button>
            </div>
          </div>

          {/* Simulator Interactive Panel */}
          <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 space-y-4 font-mono text-xs shadow-inner">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-indigo-400 font-bold block">{scenarios[selectedScenario].title}</span>
                <span className="text-[11px] text-slate-400 font-sans">{scenarios[selectedScenario].desc}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleSimulate('attack')}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>محاكاة الهجوم ⚔️</span>
                </button>
                <button
                  onClick={() => handleSimulate('defend')}
                  disabled={simStep !== 'attacking'}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>تطبيق الدفاع الأمني 🛡️</span>
                </button>
              </div>
            </div>

            {/* Interactive Console Screen */}
            <div className="space-y-2 min-h-[110px] p-2">
              {simStep === 'idle' && (
                <div className="text-slate-500 pt-6 text-center">
                  اضغطي على &apos;محاكاة الهجوم ⚔️&apos; لبدء السيناريو الأمني ومراقبة سجلات السيرفر...
                </div>
              )}

              {simStep === 'attacking' && (
                <div className="space-y-2 animate-fade-in text-rose-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span className="font-bold">INCOMING CYBER THREAT DETECTED:</span>
                  </div>
                  <p className="text-rose-300 bg-rose-950/40 p-3 rounded-xl border border-rose-800/80 leading-relaxed font-mono">
                    {scenarios[selectedScenario].attackLog}
                  </p>
                  <div className="text-[11px] text-amber-400">
                    👉 النظام تحت التهديد! اضغطي الآن على &apos;تطبيق الدفاع الأمني 🛡️&apos; لتفعيل الحماية الفورية.
                  </div>
                </div>
              )}

              {simStep === 'defended' && (
                <div className="space-y-2 animate-fade-in text-emerald-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold">SECURITY MITIGATION APPLIED SUCCESSFULLY:</span>
                  </div>
                  <p className="text-emerald-300 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/80 leading-relaxed font-mono">
                    {scenarios[selectedScenario].defenseLog}
                  </p>
                  <div className="text-[11px] text-slate-400 font-sans">
                    الأداة والتقنية المطبقة: <span className="text-sky-300 font-bold">{scenarios[selectedScenario].tool}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LAB 2: PASSWORD STRENGTH & HASHING SIMULATOR */}
        <div className="bg-white border-2 border-sky-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  مختبر تفاعلي: فحص التشفير وقوة كلمات المرور ودوال التجزئة (Hashing Lab)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  جربي كتابة أي كلمة مرور وشاهدي كيف يحولها النظام الرياضي إلى كود تجزئة فريد لا يمكن عكسه
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setHashAlgorithm(hashAlgorithm === 'SHA-256' ? 'MD5' : 'SHA-256')}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-sky-300 bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
                <span>الخوارزمية: {hashAlgorithm}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Input & Strength Meter */}
            <div className="space-y-4 text-right">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  كلمة المرور التجريبية:
                </label>
                <input
                  type="text"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="اكتبي كلمة مرور هنا..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs focus:bg-white focus:border-sky-500 outline-none transition-colors"
                />
              </div>

              {/* Strength Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600">مستوى المناعة والأمان:</span>
                  <span className={strengthInfo.color}>{strengthInfo.text}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthInfo.bar} transition-all duration-300`}
                    style={{ width: `${Math.max(15, strength)}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 font-medium">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <AlertCircle className="w-3.5 h-3.5 text-sky-600" />
                  <span>نصيحة أمنية هندسية:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  كلمة المرور القوية تدمج بين الحروف الكبيرة والصغيرة والأرقام والرموز الخاصة، ولا تقل عن 12 حرفاً، وتكون مختلفة تماماً لكل حساب ومحمية بـ 2FA!
                </p>
              </div>
            </div>

            {/* Generated Hash Display */}
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200/90 text-right">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                  {hashAlgorithm} HASH VALUE
                </span>
                <span className="text-[10px] bg-sky-100 text-sky-700 font-bold px-2 py-0.5 rounded-md">
                  تجزئة أحادية الاتجاه (One-way Hash)
                </span>
              </div>

              <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl break-all select-all leading-relaxed shadow-inner">
                {getDemoHash(passwordInput, hashAlgorithm)}
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                هذا الكود هو ما تخزنه السيرفرات الآمنة في قواعد البيانات؛ حتى لو تم تسريب قاعدة البيانات، لا يستطيع المهاجم قراءة كلمات المرور الأصلية مباشرة.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          9. FINAL TRIBUTE & RECOGNITION FOR RAWAA WITH HELLO KITTY
          ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-2 border-pink-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-right">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-pink-200 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
            <img
              src="/brand/kitty_trophy.jpg"
              alt="هيلو كيتي بكأس الإنجاز"
              className="w-full h-full object-contain drop-shadow rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>أنتِ جاهزة للمرحلة التالية يا رواء!</span>
              <span className="text-lg">🌸🏆</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
              « بعد أن فهمتِ ركائز الأمن والـ CIA ونواقل الهجمات، خطوتج القادمة هي التعمق في مسار هندسة الشبكات ولينكس لتطبقي هذه المعرفة عملياً! »
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/networks"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <span>الانتقال لمسار الشبكات 🌐</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/tracks/foundations"
            className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-pink-500/25"
          >
            <span>اختبار كفاءة الأساسات 🎓</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
