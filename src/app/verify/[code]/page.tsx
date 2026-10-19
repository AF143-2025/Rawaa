'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { dataStore } from '@/lib/store';
import CertificateView from '@/components/certificate/CertificateView';
import { ShieldAlert, ArrowRight, Search, CheckCircle2 } from 'lucide-react';

export default function CertificateVerificationDetailPage() {
  const params = useParams();
  const rawCode = params?.code as string;
  const decodedCode = decodeURIComponent(rawCode || '');

  const certificate = dataStore.getCertificateByCode(decodedCode);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
        <span>/</span>
        <Link href="/verify" className="hover:text-white transition-colors">بوابة التحقق</Link>
        <span>/</span>
        <span className="text-amber-400 font-mono font-semibold" dir="ltr">{decodedCode}</span>
      </div>

      {certificate ? (
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>شهادة صحيحة ومعتمدة ومسجلة رسمياً في أكاديمية رواء</span>
            </div>
            <span className="font-mono bg-emerald-900/60 px-3 py-1 rounded-lg text-[11px]" dir="ltr">
              STATUS: VALID & VERIFIED
            </span>
          </div>

          <CertificateView certificate={certificate} allowPrint={true} />
        </div>
      ) : (
        <div className="bg-[#0E1524] border border-rose-500/30 rounded-3xl p-10 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">رمز الشهادة غير صالح أو غير مسجل</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            لم نتمكن من العثور على أي سجل معتمد يحمل الرمز: <strong className="text-rose-400 font-mono block mt-1" dir="ltr">{decodedCode}</strong>
          </p>
          <div className="pt-2">
            <Link
              href="/verify"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              البحث برمز آخر
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
