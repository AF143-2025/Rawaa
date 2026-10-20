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
  Database,
  Cpu,
  Layers,
  Play
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

  return (
    <div className="space-y-12 text-right">
      
      {/* 1. SECTION HEADER BANNER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold shadow-sm">
              <Shield className="w-4 h-4 text-sky-600" />
              <span>دليل الأساسات والأمن السيبراني الشامل (Cybersecurity Essentials)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              الأساسات الرقمية: كيف تفهم وتحترف الأمن السيبراني؟
            </h1>
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-medium">
              الأمن السيبراني ليس مجرد حفظ أوامر، بل هو عقلية استباقية تفهم كيف تنتقل البيانات، وكيف يفكر المهاجمون لاقتناص الثغرات، وكيف يبني المهندس دروعاً دفاعية صلبة تحمي الأصول الرقمية.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-4 rounded-2xl shrink-0">
            <div className="text-center px-3">
              <span className="text-2xl font-black font-mono text-sky-600">3</span>
              <span className="text-[11px] text-slate-500 font-bold block mt-0.5">أركان CIA Triad</span>
            </div>
            <div className="w-px h-9 bg-slate-200" />
            <div className="text-center px-3">
              <span className="text-2xl font-black font-mono text-emerald-600">5</span>
              <span className="text-[11px] text-slate-500 font-bold block mt-0.5">خطوط دفاعية</span>
            </div>
            <div className="w-px h-9 bg-slate-200" />
            <div className="text-center px-3">
              <span className="text-2xl font-black font-mono text-pink-600">100%</span>
              <span className="text-[11px] text-slate-500 font-bold block mt-0.5">عملي وتطبيقي</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. WHAT IS CYBERSECURITY – ESSENCE & GOALS */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              ما هو الأمن السيبراني (Cybersecurity) ولماذا هو الأهم اليوم؟
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              المفهوم الجوهري الذي يحمي كل بنك ومستشفى وخادم ومستخدم في العالم الرقمي
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>حماية الأصول الرقمية</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              الأصول الرقمية تشمل قواعد البيانات الحساسة، السيرفرات، الشبكات الداخلية، وحسابات المستخدمين ضد الوصول غير المصرح به أو التخريب.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>إدارة المخاطر والتهديدات</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              التقييم المستمر للاحتمالات الأمنية وتحديد نقاط الضعف (Vulnerabilities) قبل أن يكتشفها المهاجم، وسدها فوراً بالترقيع والتشفير.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              <span>استمرارية الأعمال والتعافي</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              ضمان قدرة المنظمة على النجاة واستعادة الخدمات في ثوانٍ حتى لو حدث انقطاع أو هجوم فدية، عبر خطط الاستجابة للطوارئ والنسخ الاحتياطي.
            </p>
          </div>
        </div>
      </div>

      {/* 3. THE 3 CORE PILLARS – THE CIA TRIAD (DEEP DIVE) */}
      <div className="space-y-4">
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-sky-600 uppercase tracking-wider">
            THE GOLDEN STANDARD
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            مثلث أمن المعلومات (The CIA Triad): المعيار الأقدس لكل مهندس أمني
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            أي تدبير أمني أو أداة حماية تهدف في النهاية إلى تحقيق واحدة أو أكثر من هذه الركائز الثلاث:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Confidentiality */}
          <div className="bg-white border-2 border-sky-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 text-right flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  CONFIDENTIALITY
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">1. السرية والكتمان (Confidentiality)</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                ضمان أن البيانات السرية لا يستطيع الاطلاع عليها أو قراءتها إلا الأشخاص أو الأنظمة المصرح لهم بذلك فقط.
              </p>
              
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 block">كيف نحققها عملياً؟</span>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>التشفير المتناظر (AES-256) للتخزين</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>تشفير الاتصال والشهادات (TLS 1.3 / HTTPS)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>التحكم في الوصول والصلاحيات (RBAC / ACLs)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100 text-[11px] text-sky-900 font-semibold">
              💡 مثال: عندما ترسل رواء كلمة مرور، يتم تشفيرها بحيث لا يستطيع المتنصت على الشبكة قراءتها.
            </div>
          </div>

          {/* Pillar 2: Integrity */}
          <div className="bg-white border-2 border-emerald-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 text-right flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  INTEGRITY
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">2. السلامة والتكامل (Integrity)</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                التأكد من أن البيانات دقيقة وكاملة ولم يتم العبث بها أو تعديلها أو حذفها بطرق غير مشروعة أثناء نقلها أو تخزينها.
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 block">كيف نحققها عملياً؟</span>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>دوال التجزئة الأحادية (SHA-256 Checksums)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>التواقيع الرقمية المشفرة (Digital Signatures)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>سجلات التدقيق غير القابلة للتعديل (Immutable Logs)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-900 font-semibold">
              💡 مثال: عندما ينزل المستخدم برنامجاً، يقارن كود الـ SHA-256 ليتأكد أن المخترق لم يدس برمجية خبيثة فيه.
            </div>
          </div>

          {/* Pillar 3: Availability */}
          <div className="bg-white border-2 border-pink-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 text-right flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600">
                  <Server className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                  AVAILABILITY
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">3. التوافر والاستمرارية (Availability)</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                ضمان بقاء الأنظمة والخوادم والتطبيقات والشبكات جاهزة وتعمل في أي لحظة يحتاجها المستخدمون المصرح لهم دون انقطاع.
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 block">كيف نحققها عملياً؟</span>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span>الحماية من هجمات حجب الخدمة (DDoS Mitigation)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span>الخوادم التكرارية وموازنات الأحمال (Load Balancers)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span>النسخ الاحتياطي التلقائي وخطط الكوارث (DRP)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-pink-50/70 border border-pink-100 text-[11px] text-pink-900 font-semibold">
              💡 مثال: موقع رواء يظل يعمل على مدار الساعة حتى لو هاجمه مجرمون بملايين الطلبات المزيفة لإيقافه.
            </div>
          </div>

        </div>
      </div>

      {/* 4. COMMON ATTACK VECTORS & HOW THEY WORK */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>نواقل التهديدات والهجمات الشائعة (Attack Vectors)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            كيف يفكر المهاجم؟ أشهر 4 هجمات وكيف نتصدى لها
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            حتى تصبحي مهندسة أمن خارقة، يجب أن تفهمي أسلوب الخصم ونقاط الضعف التي يستهدفها
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-2xl border border-slate-200 hover:border-rose-300 transition-all bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                العامل البشري
              </span>
              <span className="text-[10px] font-mono text-slate-400">#01</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">الهندسة الاجتماعية والتصيد (Phishing)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              استهداف عواطف وفضول الضحية عبر رسائل بريد أو اتصالات مزيفة لدفعها للضغط على رابط خبيث أو كشف بيانات الدخول.
            </p>
            <div className="pt-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
              🛡️ الحل: تفعيل المصادقة الثنائية (2FA) وتدريب الوعي الأمني وفلاتر DMARC.
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 hover:border-amber-300 transition-all bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                تطبيقات الويب
              </span>
              <span className="text-[10px] font-mono text-slate-400">#02</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">ثغرات الويب وحقن الأوامر (OWASP Top 10)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              استغلال الثغرات في الأكواد البرمجية مثل حقن قواعد البيانات (SQLi) والسكربتات عبر المواقع (XSS) للوصول للبيانات بدون إذن.
            </p>
            <div className="pt-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
              🛡️ الحل: التحقق الصارم من المدخلات (Input Validation) واستخدام جدار ناري للتطبيقات WAF.
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                أمن الشبكات
              </span>
              <span className="text-[10px] font-mono text-slate-400">#03</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">هجمات اعتراض البيانات (Man-in-the-Middle)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              التموضع خلسة بين الضحية والسيرفر (خاصة عبر شبكات Wi-Fi العامة غير المشفرة) لقراءة البيانات المتبادلة ككلمات السر والرسائل.
            </p>
            <div className="pt-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
              🛡️ الحل: إجبار استخدام بروتوكول HTTPS وتشفير VPN والشهادات المعتمدة.
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-all bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                برمجيات الفدية
              </span>
              <span className="text-[10px] font-mono text-slate-400">#04</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">البرمجيات الخبيثة والفدية (Ransomware)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تشفير جميع ملفات السيرفر أو الشركة بمفتاح لا يملكه إلا المبتز، ومطالبة الضحية بمبالغ فدية ضخمة لفك التشفير.
            </p>
            <div className="pt-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
              🛡️ الحل: تطبيق قاعدة النسخ الاحتياطي المعزول (3-2-1) وتحديث الأنظمة باستمرار.
            </div>
          </div>

        </div>
      </div>

      {/* 5. DEFENSE IN DEPTH: THE 5 GOLDEN RULES FOR CYBER PRACTITIONERS */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>استراتيجيات الدفاع في العمق (Defense in Depth)</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white">
            القواعد الذهبية الخمس لبناء حصن أمني لا يُقهر
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            المبادئ التي يعتمدها كبار مدراء الأمن السيبراني (CISOs) في كبرى المؤسسات العالمية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-mono font-bold text-sky-400">RULE 01</span>
            <h3 className="text-xs font-bold text-white">أقل الصلاحيات (Least Privilege)</h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              لا تمنحي أي موظف أو سكربت صلاحيات root أو admin إلا بالقدر المطلوب تماماً لإنجاز المهمة.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">RULE 02</span>
            <h3 className="text-xs font-bold text-white">المصادقة المتعددة (MFA)</h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              حتى لو تم تسريب أو سرقة كلمة المرور، لا يستطيع المهاجم الدخول بدون كود الهاتف المباشر.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400">RULE 03</span>
            <h3 className="text-xs font-bold text-white">تجزئة الشبكة (Segmentation)</h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              عزل أجهزة الموظفين عن السيرفرات الحساسة عبر VLANs؛ فإذا سقط جهاز لا يسقط كامل النظام.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400">RULE 04</span>
            <h3 className="text-xs font-bold text-white">الترقيع المستمر (Patching)</h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              معظم الاختراقات تحدث بسبب ثغرات معروفة لها تحديثات متاحة أهمل المسؤولون تثبيتها!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-mono font-bold text-pink-400">RULE 05</span>
            <h3 className="text-xs font-bold text-white">النسخ المعزول (Offline Backup)</h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              نسخة احتياطية غير متصلة بالشبكة (Air-gapped) حتى لا تصل إليها برمجيات الفدية مهما حدث.
            </p>
          </div>

        </div>
      </div>

      {/* 6. ESSENTIAL CYBERSECURITY TOOLS MAP */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>صندوق أدوات المهندس السيبراني (Essential Cyber Toolset)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            أهم الأدوات والبرمجيات التي يحتاجها كل ممارس أمن سيبراني
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            هذه الأدوات القياسية هي ما ستتعاملين معه يومياً في مختبرات رواء وسوق العمل العالمي
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2 text-right">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 font-bold">
              <Wifi className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Wireshark & tcpdump</h3>
            <span className="text-[10px] font-mono font-bold text-sky-600 block">محلل حزم الشبكة (Packet Sniffer)</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              لفحص كل حزمة بيانات تمر في الشبكة بالملي ثانية واكتشاف أي اتصالات مشبوهة أو تسريب لمعلومات غير مشفرة.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2 text-right">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 font-bold">
              <Crosshair className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Nmap (Network Mapper)</h3>
            <span className="text-[10px] font-mono font-bold text-cyan-600 block">فاحص المنافذ والشبكات</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              الأداة الأسطورية لاستكشاف الأجهزة المتصلة بالشبكة، والمنافذ المفتوحة وإصدارات أنظمة التشغيل والخدمات.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2 text-right">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Kali Linux & Bash</h3>
            <span className="text-[10px] font-mono font-bold text-emerald-600 block">نظام التشغيل الأمني المتكامل</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              يحتوي على مئات الأدوات الجاهزة للاختبار الأمني والتحقيق الجنائي الرقمي ومراقبة السجلات باحترافية.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2 text-right">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Python & Burp Suite</h3>
            <span className="text-[10px] font-mono font-bold text-amber-600 block">اختبار الويب والأتمتة</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              اعتراض طلبات HTTP وفحص ثغرات الويب، وكتابة سكربتات بايثون ذكية لأتمتة المهام الأمنية المعقدة.
            </p>
          </div>

        </div>
      </div>

      {/* 7. INTERACTIVE LAB 1: ATTACK & DEFENSE SIMULATOR */}
      <div className="bg-white border-2 border-indigo-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900">
                مختبر تفاعلي: محاكي سيناريوهات الهجوم والدفاع السيبراني المباشر
              </h2>
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

      {/* 8. INTERACTIVE LAB 2: PASSWORD STRENGTH & HASHING SIMULATOR */}
      <div className="bg-white border-2 border-sky-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900">
                مختبر تفاعلي: فحص التشفير وقوة كلمات المرور والتجزئة (Hashing Lab)
              </h2>
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

      {/* 9. HELLO KITTY EMPOWERMENT NOTE FOR RAWAA */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-right">
          <div className="w-16 h-16 rounded-2xl bg-white border border-pink-200 flex items-center justify-center p-1 shrink-0 shadow-sm">
            <img
              src="/brand/hello_kitty_idea.png"
              alt="هيلو كيتي بدرع الأمان"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>رسالة هيلو كيتي التوجيهية لرواء</span>
              <span className="text-base">🎀🛡️</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              « يا رواء، الأمن السيبراني مو بس مجرد حفظ أوامر، هو طريقة تفكير استباقية تحمي الناس وبياناتهم! كل مفهوم تفهمينه وتطبقينه اليوم في الأساسات والشبكات ولينكس هو لبنة صلبة في مسيرتج نحو الاحتراف! 🌸 »
            </p>
          </div>
        </div>

        <Link
          href="/tracks/foundations"
          className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-pink-500/25 shrink-0"
        >
          <span>دخول المسار التأسيسي المعتمد</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
