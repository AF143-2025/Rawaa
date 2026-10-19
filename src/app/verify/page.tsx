'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { dataStore } from '@/lib/store';

export default function VerifyPortalPage() {
  const router = useRouter();
  const [certCode, setCertCode] = useState('');
  const allCerts = dataStore.getCertificates();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certCode.trim()) return;
    router.push(`/verify/${certCode.trim()}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
          <Award className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono text-amber-700 uppercase tracking-widest font-bold">
          OFFICIAL CREDENTIAL VERIFICATION
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          بوابة التحقق من الشهادات الرقمية
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          تتيح هذه البوابة للشركات وجهات التوظيف والطلاب التحقق الفوري من صحة وموثوقية شهادات إتمام الدورات الصادرة من أكاديمية رواء.
        </p>
      </div>

      {/* Code Search Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto space-y-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <label className="text-xs text-slate-700 font-semibold block">
            أدخل رمز التحقق المطبوع على الشهادة (Certificate Verification Code):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={certCode}
              onChange={e => setCertCode(e.target.value)}
              placeholder="مثال: RAWAA-NET-49210"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-mono text-sm focus:border-amber-500 focus:bg-white outline-none uppercase placeholder:text-slate-400"
              dir="ltr"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              التحقق الآن
            </button>
          </div>
        </form>

        {/* Sample verifiable certificates for instant testing */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
          <span className="text-slate-500 font-mono text-[11px] block">
            رموز شهادات تجريبية صالحة للفحص السريع:
          </span>
          <div className="flex flex-wrap gap-2">
            {allCerts.slice(0, 3).map(c => (
              <button
                key={c.id}
                onClick={() => setCertCode(c.certificate_code)}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-700 font-mono text-[11px] text-slate-700 border border-slate-200 transition-colors"
                dir="ltr"
              >
                {c.certificate_code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trust & Verification Standard notice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-slate-900">التحقق اللحظي</h4>
          <p>تتم مطابقة الرمز مباشرة مع سجلات قاعدة بيانات المنصة المشفرة والآمنة.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-sky-600" />
          <h4 className="font-bold text-slate-900">معايير الإتمام</h4>
          <p>لا تصدر الشهادة إلا بعد إكمال كافة الدروس واجتياز اختبار التقييم بدرجة 70% فأكثر.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
          <Award className="w-5 h-5 text-amber-600" />
          <h4 className="font-bold text-slate-900">وثيقة معتمدة</h4>
          <p>شهادة رسمية تثبت الجاهزية العملية والمهارات المكتسبة في مسار التدريب.</p>
        </div>
      </div>
    </div>
  );
}
