import React from 'react';
import Link from 'next/link';
import { Shield, Award, Globe, Share2, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05182C] border-t border-sky-400/20 text-sky-200/70 text-xs mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-emerald-400 p-0.5">
                <div className="w-full h-full bg-[#080D18] rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white">رِواء</span>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase -mt-1 font-bold">
                  RAWAA ACADEMY
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-300 font-medium">
              «تعلّم اليوم، واحمِ المستقبل.»
            </p>
            
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              أكاديمية عربية متخصصة في تأهيل مهندسي الشبكات، مدراء أنظمة Linux، وممارسي الأمن السيبراني عبر المنهجية التفاعلية والتطبيق العملي المعزول.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="p-2 rounded-lg bg-white/5 text-gray-300">
                <Code2 className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-lg bg-white/5 text-gray-300">
                <Globe className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-lg bg-white/5 text-gray-300">
                <Share2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Quick Links: Tracks */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">المسارات التعليمية</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tracks/networks" className="hover:text-cyan-400 transition-colors">
                  هندسة الشبكات والاتصالات
                </Link>
              </li>
              <li>
                <Link href="/tracks/linux" className="hover:text-cyan-400 transition-colors">
                  إدارة أنظمة Linux
                </Link>
              </li>
              <li>
                <Link href="/tracks/cybersecurity" className="hover:text-cyan-400 transition-colors">
                  الأمن السيبراني والدفاع
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-cyan-400 transition-colors">
                  المختبرات وتحديات CTF
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Labs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">المختبرات التفاعلية</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/labs?tab=linux" className="hover:text-cyan-400 transition-colors">
                  طرفية لينكس الافتراضية
                </Link>
              </li>
              <li>
                <Link href="/labs?tab=network" className="hover:text-cyan-400 transition-colors">
                  حاسبة ومحاكي Subnetting
                </Link>
              </li>
              <li>
                <Link href="/labs?tab=cyber" className="hover:text-cyan-400 transition-colors">
                  مختبر فحص السجلات الأمنية
                </Link>
              </li>
              <li>
                <Link href="/labs?tab=ctf" className="hover:text-cyan-400 transition-colors">
                  منصة صيد الأعلام (CTF)
                </Link>
              </li>
            </ul>
          </div>

          {/* Verification & Trust */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">الاعتماد والتحقق</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/verify" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-300 font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  بوابة التحقق من الشهادات
                </Link>
              </li>
              <li>
                <span className="text-gray-500">سياسة الخصوصية وحماية البيانات</span>
              </li>
              <li>
                <span className="text-gray-500">شروط الاستخدام الأخلاقي للمختبرات</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمنصة <strong className="text-gray-400">رواء | RAWAA Academy</strong>.
          </div>
          <div className="flex items-center gap-1">
            صُممت بعناية وبأحدث التقنيات لتمكين الكفاءات الرقمية العربية.
          </div>
        </div>
      </div>
    </footer>
  );
}
