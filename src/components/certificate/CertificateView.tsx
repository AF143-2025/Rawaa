'use client';

import React from 'react';
import { Certificate } from '@/types';
import { Award, ShieldCheck, CheckCircle2, Printer, ExternalLink, QrCode } from 'lucide-react';
import Link from 'next/link';

interface CertificateViewProps {
  certificate: Certificate;
  allowPrint?: boolean;
}

export default function CertificateView({ certificate, allowPrint = true }: CertificateViewProps) {
  const formattedDate = new Date(certificate.issued_at).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-4">
      {/* Certificate Frame with Gold / Cyber Borders */}
      <div 
        id="certificate-print-area"
        className="relative bg-gradient-to-br from-[#0c1322] via-[#080d18] to-[#04070d] border-4 border-amber-500/40 rounded-3xl p-8 sm:p-14 shadow-2xl overflow-hidden text-center text-white"
        style={{
          boxShadow: '0 0 50px -10px rgba(245, 158, 11, 0.15)'
        }}
      >
        {/* Geometric Corner Accents */}
        <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-amber-400/80 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-amber-400/80 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-amber-400/80 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-amber-400/80 rounded-br-lg" />

        {/* Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <span className="text-[180px] font-black tracking-widest text-amber-300">RAWAA</span>
        </div>

        {/* Header Branding */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-2 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 mb-2">
            <div className="w-full h-full bg-[#080D18] rounded-[14px] flex items-center justify-center">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
          </div>
          <span className="text-sm tracking-widest uppercase text-amber-400 font-mono font-semibold">
            RAWAA ACADEMY OF TECHNOLOGY & CYBER DEFENSE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
            شهادة إتمام وتفوق معتمدة
          </h1>
          <p className="text-xs text-gray-400 font-light max-w-md">
            «تعلّم اليوم، واحمِ المستقبل.»
          </p>
        </div>

        {/* Body Text */}
        <div className="relative z-10 space-y-6 my-8">
          <p className="text-sm sm:text-base text-gray-300">
            تشهد أكاديمية رواء للتعليم التقني بأنّ المهندس / الطالب:
          </p>

          <div className="inline-block px-8 py-3 rounded-2xl bg-white/[0.03] border border-amber-400/30 shadow-inner">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
              {certificate.user_name}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            قد أتم بنجاح متطلبات التدريب النظري والعملي واجتاز الاختبارات المعملية المقررة في:
          </p>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-cyan-400">
              {certificate.course_title}
            </h3>
            <span className="text-xs text-gray-400 block font-mono">
              ضمن مسار: {certificate.track_title}
            </span>
          </div>
        </div>

        {/* Footer Signatures and Verification */}
        <div className="relative z-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-xs text-gray-400">
          {/* Instructor Sign */}
          <div className="space-y-1 text-center sm:text-right">
            <span className="text-gray-500 block">مدرب ومطور المسار:</span>
            <span className="text-sm font-semibold text-white block">{certificate.instructor_name}</span>
            <span className="text-[10px] text-amber-400 font-mono">Senior Security Architect</span>
          </div>

          {/* Seal / Badge */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-amber-400/60 flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
            <span className="text-[10px] text-amber-300/80 mt-1 font-mono">VERIFIED CREDENTIAL</span>
          </div>

          {/* Verification Code */}
          <div className="space-y-1 text-center sm:text-left font-mono">
            <span className="text-gray-500 block">رمز التحقق الرقمي:</span>
            <span className="text-xs font-bold text-cyan-300 tracking-wider block bg-black/40 px-3 py-1 rounded-lg border border-white/10 inline-block" dir="ltr">
              {certificate.certificate_code}
            </span>
            <span className="text-[10px] text-gray-400 block mt-1">تاريخ الإصدار: {formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      {allowPrint && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#0E1524] border border-white/10 rounded-2xl">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>هذه الشهادة مسجلة في قاعدة بيانات المنصة ومتاحة للتحقق العلني.</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/verify/${certificate.certificate_code}`}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              رابط التحقق المباشر
            </Link>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              طباعة / حفظ بتنسيق PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
