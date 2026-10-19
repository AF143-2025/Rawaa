'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { dataStore } from '@/lib/store';
import { Course, Enrollment, Certificate } from '@/types';
import { 
  Award, 
  BookOpen, 
  Clock, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Shield, 
  ArrowLeft, 
  Flame, 
  FileText,
  Activity,
  Layers,
  ExternalLink
} from 'lucide-react';
import CertificateView from '@/components/certificate/CertificateView';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (user) {
      const enr = dataStore.getEnrollments(user.id);
      setEnrollments(enr);
      const allC = dataStore.getCourses();
      setCourses(allC);
      const certs = dataStore.getCertificates(user.id);
      setCertificates(certs);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">يرجى تسجيل الدخول للوصول إلى لوحة التحكم</h2>
        <Link
          href="/login"
          className="inline-block px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs shadow-glow"
        >
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  // Enrolled courses details
  const enrolledCourses = enrollments.map(enr => {
    const courseObj = courses.find(c => c.id === enr.course_id);
    return {
      enrollment: enr,
      course: courseObj
    };
  }).filter(item => item.course !== undefined);

  // Resume last course
  const inProgress = enrolledCourses.find(c => c.enrollment.progress_percentage < 100);
  const activeCourse = inProgress || enrolledCourses[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0C1527] via-[#0E1524] to-[#0A101D] border border-cyan-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.full_name}`}
              alt={user.full_name}
              className="w-16 h-16 rounded-2xl border-2 border-cyan-400/50 object-cover shadow-glow"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  مرحباً بك، {user.full_name} 👋
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                  {user.role === 'admin' ? 'مدير المنصة' : 'طالب تقني'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">
                «تعلّم اليوم، واحمِ المستقبل.» واصل رحلتك في هندسة البنية التحتية والأمن السيبراني.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-[#070B12] p-3 rounded-2xl border border-white/10 shrink-0 text-center">
            <div className="px-3">
              <span className="text-xl font-bold font-mono text-cyan-400 block">{user.points || 0}</span>
              <span className="text-[10px] text-gray-400">النقاط المكتسبة</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="px-3">
              <span className="text-xl font-bold font-mono text-emerald-400 block">{enrollments.length}</span>
              <span className="text-[10px] text-gray-400">دورات مسجلة</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="px-3">
              <span className="text-xl font-bold font-mono text-amber-400 block">{certificates.length}</span>
              <span className="text-[10px] text-gray-400">شهادات إتمام</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 cols: Enrolled Courses & Continue Learning */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Continue Learning Highlight Card */}
          {activeCourse && activeCourse.course && (
            <div className="bg-[#0E1524] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-glow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  متابعة آخر درس وصلت إليه
                </span>
                <span className="text-xs font-mono text-gray-400">
                  إنجاز {activeCourse.enrollment.progress_percentage}%
                </span>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-white">
                  {activeCourse.course.title}
                </h2>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {activeCourse.course.description}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                    style={{ width: `${activeCourse.enrollment.progress_percentage}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/courses/${activeCourse.course.slug}`}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-glow transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-black" />
                  استكمال الدورة الآن
                </Link>

                <Link
                  href={`/courses/${activeCourse.course.slug}/quiz`}
                  className="text-xs text-purple-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Award className="w-3.5 h-3.5" />
                  اختبار الدورة
                </Link>
              </div>
            </div>
          )}

          {/* Enrolled Courses List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                الدورات المسجل بها
              </h3>
              <Link href="/courses" className="text-xs text-cyan-400 hover:underline">
                استكشاف المزيد من الدورات
              </Link>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="space-y-3">
                {enrolledCourses.map(({ enrollment: enr, course: crs }) => crs && (
                  <div
                    key={enr.id}
                    className="bg-[#0E1524] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono text-cyan-400 font-bold">{crs.level}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 font-mono">{crs.duration_hours} ساعات</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{crs.title}</h4>
                      
                      <div className="w-full max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden mt-2">
                        <div
                          className="h-full bg-cyan-400"
                          style={{ width: `${enr.progress_percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <span className="text-xs font-mono text-gray-300 font-bold px-2 py-1 bg-white/5 rounded-lg">
                        {enr.progress_percentage}%
                      </span>
                      <Link
                        href={`/courses/${crs.slug}`}
                        className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        عرض
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#0E1524] border border-white/10 text-center space-y-3">
                <BookOpen className="w-10 h-10 text-gray-600 mx-auto" />
                <h4 className="text-sm font-bold text-white">لم تسجل في أي دورة بعد</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  تصفح دليل الدورات وابدأ في مسارك التعليمي المفضل لتتبع تقدمك هنا.
                </p>
                <Link
                  href="/courses"
                  className="inline-block px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs"
                >
                  استكشف الدورات
                </Link>
              </div>
            )}
          </div>

          {/* Certificates Earned Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              الشهادات الرقمية المكتسبة
            </h3>

            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map(cert => (
                  <div
                    key={cert.id}
                    className="p-5 rounded-2xl bg-[#0E1524] border border-amber-500/30 hover:border-amber-400 transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-amber-400 block" dir="ltr">
                        {cert.certificate_code}
                      </span>
                      <h4 className="text-sm font-bold text-white">{cert.course_title}</h4>
                      <span className="text-xs text-gray-400 block font-mono">
                        {new Date(cert.issued_at).toLocaleDateString('ar-SA')}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                      >
                        عرض الشهادة
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={`/verify/${cert.certificate_code}`}
                        className="text-[11px] text-gray-400 hover:text-white"
                      >
                        رابط التحقق
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#0E1524] border border-white/10 text-center space-y-2">
                <Award className="w-8 h-8 text-gray-600 mx-auto" />
                <p className="text-xs text-gray-400">
                  أكمل أي دورة واجتز اختبارها بنسبة 70% للحصول على شهادتك الأولى!
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Right 1 col: Quick Labs & Achievements */}
        <div className="space-y-8">
          
          {/* Quick Labs Access */}
          <div className="bg-[#0E1524] border border-white/10 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              المختبرات السريعة
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/labs?tab=linux"
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-white">طرفية لينكس التفاعلية</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
              </Link>

              <Link
                href="/labs?tab=network"
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-white">حاسبة ومحاكي Subnetting</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
              </Link>

              <Link
                href="/labs?tab=cyber"
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold text-white">فحص السجلات وتحديات CTF</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
              </Link>
            </div>
          </div>

          {/* Badges / Achievements Showcase */}
          <div className="bg-[#0E1524] border border-white/10 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              شارات التميز والإنجازات
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                <span className="text-2xl">⚡</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-white">الخطوة الأولى</h4>
                  <p className="text-[11px] text-gray-400">التسجيل وبدء أول درس في المنصة</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                <span className="text-2xl">💻</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-white">سيد الطرفية</h4>
                  <p className="text-[11px] text-gray-400">إكمال مهمة سطر الأوامر في Linux</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-950/20 border border-purple-500/20">
                <span className="text-2xl">🛡️</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-white">حارس الثغرات</h4>
                  <p className="text-[11px] text-gray-400">كشف محاولات الاختراق في السجلات</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Modal for viewing certificate if clicked */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 overflow-y-auto flex items-center justify-center">
          <div className="relative w-full max-w-4xl bg-[#080D18] rounded-3xl p-4 sm:p-6 space-y-4 border border-amber-500/30">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-bold text-amber-400 font-mono">
                {selectedCert.certificate_code}
              </span>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-3 py-1 rounded-lg bg-white/10 text-gray-300 hover:text-white text-xs"
              >
                إغلاق
              </button>
            </div>
            <CertificateView certificate={selectedCert} />
          </div>
        </div>
      )}

    </div>
  );
}
