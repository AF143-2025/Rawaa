'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Cpu, 
  Globe, 
  Key, 
  Lock, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function FoundationsSection() {
  const [passwordInput, setPasswordInput] = useState('Rawaa@Cyber2026!');
  const [hashAlgorithm, setHashAlgorithm] = useState<'SHA-256' | 'MD5'>('SHA-256');

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
    if (s <= 25) return { text: 'ضعيفة جداً ⚠️', color: 'text-rose-600', bar: 'bg-rose-500' };
    if (s <= 50) return { text: 'متوسطة ⚡', color: 'text-amber-600', bar: 'bg-amber-500' };
    if (s <= 75) return { text: 'قوية وممتازة 🛡️', color: 'text-sky-600', bar: 'bg-sky-500' };
    return { text: 'خارقة ومحصنة 💎', color: 'text-emerald-600', bar: 'bg-emerald-500' };
  };

  const strengthInfo = getStrengthLabel(strength);

  const foundationsTopics = [
    {
      title: 'معمارية الحاسوب والعتاد (Hardware & OS)',
      desc: 'فهم كيف يعالج المعالج (CPU) التعليمات، دور الذاكرة العشوائية (RAM)، والفرق بين مساحات النظام ومساحة المستخدم.',
      icon: Cpu,
      tag: 'عتاد ونظم'
    },
    {
      title: 'كيف يعمل الإنترنت (How The Web Works)',
      desc: 'رحلة الطلب الرقمي من لحظة كتابة العنوان في المتصفح، مروراً بسيرفرات DNS والـ IP وحتى استلام صفحة الويب.',
      icon: Globe,
      tag: 'إنترنت وويب'
    },
    {
      title: 'مثلث الحماية السيبرانية (CIA Triad)',
      desc: 'الركائز الثلاث لأي نظام أمني ناجح: السرية (Confidentiality)، السلامة (Integrity)، والتوافر (Availability).',
      icon: Shield,
      tag: 'مبادئ الأمن'
    },
    {
      title: 'التشفير والتجزئة (Crypto & Hashing)',
      desc: 'الفرق الجوهري بين التشفير القابل للفك (Encryption) والتجزئة الأحادية الاتجاه (Hashing)، ودور المفاتيح الرقمية.',
      icon: Key,
      tag: 'تشفير وحماية'
    }
  ];

  return (
    <section id="foundations" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-40 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold">
              <Shield className="w-4 h-4" />
              <span>القسم الأول: الأساسات الرقمية والتقنية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              مسار الأساسات الشاملة (Computer & IT Foundations)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              القاعدة الذهبية التي ينطلق منها كل مهندس شبكات وممارس أمن سيبراني: استيعاب كيف تعمل الحواسيب والإنترنت والتشفير من الصفر.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl shrink-0">
            <div className="text-center px-3">
              <span className="text-xl font-black font-mono text-sky-600">25</span>
              <span className="text-[11px] text-slate-500 font-bold block">ساعة تأسيس</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-3">
              <span className="text-xl font-black font-mono text-emerald-600">4</span>
              <span className="text-[11px] text-slate-500 font-bold block">محاور رئيسية</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {foundationsTopics.map((topic, i) => {
          const Icon = topic.icon;
          return (
            <div
              key={i}
              className="bg-white border border-slate-200/90 hover:border-sky-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-right flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {topic.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{topic.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{topic.desc}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-sky-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>مكتمل الشرح مع أمثلة</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Mini-Lab: Password Strength & Hashing Simulator */}
      <div className="bg-white border-2 border-sky-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                مختبر تفاعلي: فحص التشفير وقوة كلمات المرور والتجزئة (Hashing)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                جربي كتابة أي كلمة مرور وشاهدي كيف يحولها النظام إلى كود تجزئة غير قابل للفك
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHashAlgorithm(hashAlgorithm === 'SHA-256' ? 'MD5' : 'SHA-256')}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-sky-300 bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-sky-600" />
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
                <span className="text-slate-600">مستوى الأمان:</span>
                <span className={strengthInfo.color}>{strengthInfo.text}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strengthInfo.bar} transition-all duration-300`}
                  style={{ width: `${Math.max(15, strength)}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 font-medium">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <AlertCircle className="w-3.5 h-3.5 text-sky-600" />
                <span>نصيحة أمنية سريعة:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                كلمة المرور القوية تدمج بين الحروف الكبيرة والصغيرة والأرقام والرموز الخاصة، ولا تقل عن 12 حرفاً!
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
                تجزئة أحادية الاتجاه
              </span>
            </div>

            <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl break-all select-all leading-relaxed shadow-inner">
              {getDemoHash(passwordInput, hashAlgorithm)}
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              هذا الكود هو ما يتم تخزينه في قواعد البيانات الآمنة بدلاً من كلمة المرور الأصلية؛ لحمايتها في حال حدوث أي تسريب.
            </p>
          </div>
        </div>

        {/* Hello Kitty Note & CTA */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-pink-700 bg-pink-50 border border-pink-200 px-3.5 py-1.5 rounded-full font-bold">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>نصيحة هيلو كيتي: يا رواء، الأساسات القوية تخلي كل شيء بعدها بالشبكات ولينكس سهل وبسيط! 🌸</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/tracks/foundations"
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>استعراض مسار الأساسات الكامل</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
