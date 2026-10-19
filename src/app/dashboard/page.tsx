'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { dataStore, DEMO_STUDENT } from '@/lib/store';
import { Course, Enrollment, Certificate } from '@/types';
import { 
  Award, 
  BookOpen, 
  Play, 
  Sparkles, 
  Terminal, 
  Shield, 
  ArrowLeft, 
  Flame, 
  Activity,
  ExternalLink
} from 'lucide-react';
import CertificateView from '@/components/certificate/CertificateView';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const currentUser = user || DEMO_STUDENT;

  useEffect(() => {
    const enr = dataStore.getEnrollments(currentUser.id);
    setEnrollments(enr);
    const allC = dataStore.getCourses();
    setCourses(allC);
    const certs = dataStore.getCertificates(currentUser.id);
    setCertificates(certs);
  }, [currentUser]);

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
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.full_name}`}
              alt={currentUser.full_name}
              className="w-16 h-16 rounded-2xl border-2 border-sky-400 object-cover shadow-sm"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  مرحباً بك، {currentUser.full_name} 👋
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-mono font-bold">
                  {currentUser.role === 'admin' ? 'مدير المنصة' : 'طالب تقني'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                «تعلّم اليوم، واحمِ المستقبل.» واصل رحلتك في هندسة البنية التحتية والأمن السيبراني.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 shrink-0 text-center">
            <div className="px-3">
              <span className="text-xl font-bold font-mono text-sky-600 block">{currentUser.points || 0}</span>
              <span className="text-[10px] text-slate-500 font-medium">النقاط المكتسبة</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="px-3">
              <span className="text-xl font-bold font-mono text-emerald-600 block">{enrollments.length}</span>
              <span className="text-[10px] text-slate-500 font-medium">دورات مسجلة</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="px-3">
              <span className="text-xl font-bold font-mono text-amber-600 block">{certificates.length}</span>
              <span className="text-[10px] text-slate-500 font-medium">شهادات إتمام</span>
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
            <div className="bg-white border border-sky-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-sky-700 font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  متابعة آخر درس وصلت إليه
                </span>
                <span className="text-xs font-mono text-slate-500 font-bold">
                  إنجاز {activeCourse.enrollment.progress_percentage}%
                </span>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {activeCourse.course.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {activeCourse.course.description}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-cyan-400"
                    style={{ width: `${activeCourse.enrollment.progress_percentage}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/courses/${activeCourse.course.slug}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-xs shadow-md shadow-sky-500/20 transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  استكمال الدورة الآن
                </Link>

                <Link
                  href={`/courses/${activeCourse.course.slug}/quiz`}
                  className="text-xs text-sky-600 hover:underline flex items-center gap-1 font-bold"
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
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-600" />
                الدورات المسجل بها
              </h3>
              <Link href="/courses" className="text-xs text-sky-600 font-bold hover:underline">
                استكشاف المزيد من الدورات
              </Link>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="space-y-3">
                {enrolledCourses.map(({ enrollment: enr, course: crs }) => crs && (
                  <div
                    key={enr.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-sky-300 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono text-sky-600 font-bold">{crs.level}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500 font-mono">{crs.duration_hours} ساعات</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{crs.title}</h4>
                      
                      <div className="w-full max-w-xs h-1.5 rounded-full bg-slate-100 overflow-hidden mt-2">
                        <div
                          className="h-full bg-sky-500"
                          style={{ width: `${enr.progress_percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <span className="text-xs font-mono text-slate-700 font-bold px-2 py-1 bg-slate-100 rounded-lg">
                        {enr.progress_percentage}%
                      </span>
                      <Link
                        href={`/courses/${crs.slug}`}
                        className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white border border-sky-200 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        عرض
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-sm">
                <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">لم تسجل في أي دورة بعد</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  تصفح دليل الدورات وابدأ في مسارك التعليمي المفضل لتتبع تقدمك هنا.
                </p>
                <Link
                  href="/courses"
                  className="inline-block px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs shadow-sm"
                >
                  استكشف الدورات
                </Link>
              </div>
            )}
          </div>

          {/* Certificates Earned Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              الشهادات الرقمية المكتسبة
            </h3>

            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map(cert => (
                  <div
                    key={cert.id}
                    className="p-5 rounded-2xl bg-white border border-amber-200 hover:border-amber-400 shadow-sm transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-amber-600 font-bold block" dir="ltr">
                        {cert.certificate_code}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{cert.course_title}</h4>
                      <span className="text-xs text-slate-500 block font-mono">
                        {new Date(cert.issued_at).toLocaleDateString('ar-SA')}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
                      >
                        عرض الشهادة
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={`/verify/${cert.certificate_code}`}
                        className="text-[11px] text-slate-500 hover:text-slate-900"
                      >
                        رابط التحقق
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2 shadow-sm">
                <Award className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-500">
                  أكمل أي دورة واجتز اختبارها بنسبة 70% للحصول على شهادتك الأولى!
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Right 1 col: Quick Labs & Achievements */}
        <div className="space-y-8">
          
          {/* Quick Labs Access */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-600" />
              المختبرات السريعة
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/labs?tab=linux"
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-sky-600" />
                  <span className="text-xs font-semibold text-slate-900">طرفية لينكس التفاعلية</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/labs?tab=network"
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-900">حاسبة ومحاكي Subnetting</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/labs?tab=cyber"
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-semibold text-slate-900">فحص السجلات وتحديات CTF</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Badges / Achievements Showcase */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              شارات التميز والإنجازات
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 border border-sky-200">
                <span className="text-2xl">⚡</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900">الخطوة الأولى</h4>
                  <p className="text-[11px] text-slate-600">التسجيل وبدء أول درس في المنصة</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-2xl">💻</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900">سيد الطرفية</h4>
                  <p className="text-[11px] text-slate-600">إكمال مهمة سطر الأوامر في Linux</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 border border-indigo-200">
                <span className="text-2xl">🛡️</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900">حارس الثغرات</h4>
                  <p className="text-[11px] text-slate-600">كشف محاولات الاختراق في السجلات</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Modal for viewing certificate if clicked */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm p-4 overflow-y-auto flex items-center justify-center">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl p-4 sm:p-6 space-y-4 border border-amber-300 shadow-2xl">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-bold text-amber-600 font-mono">
                {selectedCert.certificate_code}
              </span>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold"
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
