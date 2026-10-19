import React from 'react';
import Link from 'next/link';
import { Award, Globe, Share2, Code2 } from 'lucide-react';
import RawaaAnimatedLogo from '@/components/brand/RawaaAnimatedLogo';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group focus:outline-none">
              <RawaaAnimatedLogo variant="navbar" />
            </Link>

            <p className="text-sm text-slate-800 font-medium">
              «تعلّم اليوم، واحمِ المستقبل.»
            </p>
            
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              أكاديمية عربية متخصصة في تأهيل مهندسي الشبكات، مدراء أنظمة Linux، وممارسي الأمن السيبراني عبر المنهجية التفاعلية والتطبيق العملي المعزول.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm">
                <Code2 className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm">
                <Globe className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm">
                <Share2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Quick Links: Tracks */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">المسارات التعليمية</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tracks/networks" className="hover:text-sky-600 transition-colors">
                  هندسة الشبكات والاتصالات
                </Link>
              </li>
              <li>
                <Link href="/tracks/linux" className="hover:text-sky-600 transition-colors">
                  إدارة أنظمة Linux
                </Link>
              </li>
              <li>
                <Link href="/tracks/cybersecurity" className="hover:text-sky-600 transition-colors">
                  الأمن السيبراني والدفاع
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-sky-600 transition-colors">
                  المختبرات وتحديات CTF
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Labs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">المختبرات التفاعلية</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/labs?tab=linux" className="hover:text-sky-600 transition-colors">
                  طرفية لينكس الافتراضية
                </Link>
              </li>
              <li>
                <Link href="/labs?tab=network" className="hover:text-sky-600 transition-colors">
                  حاسبة ومحاكي Subnetting
                </Link>
              </li>
              <li>
                <Link href="/labs?tab=cyber" className="hover:text-sky-600 transition-colors">
                  مختبر فحص السجلات الأمنية
                </Link>
              </li>
              <li>
                <Link href="/labs?tab=ctf" className="hover:text-sky-600 transition-colors">
                  منصة صيد الأعلام (CTF)
                </Link>
              </li>
            </ul>
          </div>

          {/* Verification & Trust */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">الاعتماد والتحقق</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/verify" className="hover:text-sky-600 transition-colors flex items-center gap-1.5 text-sky-600 font-bold">
                  <Award className="w-3.5 h-3.5" />
                  بوابة التحقق من الشهادات
                </Link>
              </li>
              <li>
                <span className="text-slate-400">سياسة الخصوصية وحماية البيانات</span>
              </li>
              <li>
                <span className="text-slate-400">شروط الاستخدام الأخلاقي للمختبرات</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمنصة <strong className="text-slate-700">رواء | RAWAA Academy</strong>.
          </div>
          <div className="flex items-center gap-1">
            صُممت بعناية وبأحدث التقنيات لتمكين الكفاءات الرقمية العربية.
          </div>
        </div>
      </div>
    </footer>
  );
}
