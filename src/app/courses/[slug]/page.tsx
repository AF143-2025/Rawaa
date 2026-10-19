'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { dataStore } from '@/lib/store';
import { useAuth } from '@/context/AuthContext';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Play, 
  Award, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Lock, 
  ChevronDown, 
  Layers, 
  HelpCircle 
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { user } = useAuth();

  const [course, setCourse] = useState(dataStore.getCourseBySlug(slug));
  const [enrollment, setEnrollment] = useState(dataStore.getEnrollments().find(e => e.course_id === course?.id));
  const [modules, setModules] = useState(course ? dataStore.getModulesForCourse(course.id) : []);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const quiz = course ? dataStore.getQuizForCourse(course.id) : undefined;

  useEffect(() => {
    if (course) {
      const enr = dataStore.getEnrollments().find(e => e.course_id === course.id);
      setEnrollment(enr);
      const prog = dataStore.getLessonProgress().filter(p => p.course_id === course.id && p.is_completed);
      setCompletedLessonIds(prog.map(p => p.lesson_id));
    }
  }, [course]);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">الدورة المطلوبة غير موجودة</h2>
        <Link href="/courses" className="text-cyan-400 hover:underline text-sm inline-flex items-center gap-1">
          <ArrowRight className="w-4 h-4" />
          العودة لكافة الدورات
        </Link>
      </div>
    );
  }

  const handleEnroll = () => {
    const enr = dataStore.enrollInCourse(course.id);
    setEnrollment(enr);
    // Find first lesson
    if (modules.length > 0 && modules[0].lessons.length > 0) {
      router.push(`/courses/${course.slug}/lessons/${modules[0].lessons[0].slug}`);
    }
  };

  const getFirstIncompleteLesson = () => {
    for (const mod of modules) {
      for (const les of mod.lessons) {
        if (!completedLessonIds.includes(les.id)) {
          return les;
        }
      }
    }
    return modules[0]?.lessons[0];
  };

  const nextLesson = getFirstIncompleteLesson();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
        <span>/</span>
        <Link href="/courses" className="hover:text-white transition-colors">الدورات</Link>
        <span>/</span>
        <span className="text-cyan-400 font-semibold">{course.title}</span>
      </div>

      {/* Hero Overview */}
      <div className="bg-[#0E1524] border border-cyan-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {course.level}
              </span>
              <span className="text-xs font-mono text-gray-400">
                مسار: {course.path_slug.toUpperCase()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-sm text-gray-300 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                {course.duration_hours} ساعة تدريبية
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                {course.total_lessons} دروس تفاعلية
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <Award className="w-4 h-4" />
                شهادة إتمام معتمدة
              </span>
            </div>

            {/* Enrollment / Continue Learning CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {enrollment ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                  <Link
                    href={`/courses/${course.slug}/lessons/${nextLesson?.slug || 'intro'}`}
                    className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-glow transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    متابعة التعلم ({nextLesson ? nextLesson.title : 'أول درس'})
                  </Link>

                  <div className="flex-1 max-w-xs space-y-1">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>نسبة إنجاز الدورة:</span>
                      <span className="font-mono text-cyan-400 font-bold">{enrollment.progress_percentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${enrollment.progress_percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-black font-extrabold text-xs shadow-glow transition-all flex items-center gap-2"
                >
                  التسجيل في الدورة والبدء فوراً
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-56 lg:h-64">
            <img
              src={course.cover_image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs text-cyan-300 font-mono">بيئة تدريب رواء التعليمية</span>
            </div>
          </div>

        </div>
      </div>

      {/* Course Details: Objectives & Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 cols: Modules & Lessons */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              منهج ووحدات الدورة
            </h2>
            <span className="text-xs text-gray-400 font-mono">
              {modules.length} وحدات تدريبية
            </span>
          </div>

          <div className="space-y-4">
            {modules.map((mod, modIdx) => (
              <div
                key={mod.id}
                className="bg-[#0E1524] border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="p-5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{mod.title}</h3>
                    {mod.description && (
                      <p className="text-xs text-gray-400 mt-0.5">{mod.description}</p>
                    )}
                  </div>
                  <span className="text-xs font-mono text-cyan-400">
                    {mod.lessons.length} دروس
                  </span>
                </div>

                <div className="divide-y divide-white/5">
                  {mod.lessons.map((lesson, lesIdx) => {
                    const isCompleted = completedLessonIds.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : (
                            <span className="w-5 h-5 rounded-full border border-gray-600 text-gray-400 text-[10px] font-mono flex items-center justify-center shrink-0">
                              {lesIdx + 1}
                            </span>
                          )}
                          <div>
                            <Link
                              href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                              className="text-xs sm:text-sm font-semibold text-gray-200 hover:text-cyan-400 transition-colors block"
                            >
                              {lesson.title}
                            </Link>
                            <span className="text-[11px] text-gray-500 font-mono flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" />
                              {lesson.duration_minutes} دقيقة
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            isCompleted
                              ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                              : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black'
                          }`}
                        >
                          {isCompleted ? 'مراجعة' : 'ابدأ الدرس'}
                          <ArrowLeft className="w-3 h-3" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quiz Section Banner */}
          {quiz && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#0E1524] to-cyan-950/40 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-purple-400 font-bold block">التقييم النهائي والاعتماد</span>
                <h3 className="text-base font-bold text-white">{quiz.title}</h3>
                <p className="text-xs text-gray-400 max-w-md">
                  اجتز الاختبار بدرجة 70% أو أكثر لتفعيل شهادة إتمام الدورة المعتمدة تلقائياً.
                </p>
              </div>

              <Link
                href={`/courses/${course.slug}/quiz`}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-glowPurple transition-all shrink-0 flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                دخول الاختبار
              </Link>
            </div>
          )}
        </div>

        {/* Right 1 col: Objectives & Prerequisites */}
        <div className="space-y-6">
          {/* Learning Objectives */}
          <div className="bg-[#0E1524] border border-white/10 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ماذا ستتعلم في هذه الدورة؟
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {course.learning_objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          <div className="bg-[#0E1524] border border-white/10 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              المتطلبات السابقة
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              {course.prerequisites.map((pre, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{pre}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
