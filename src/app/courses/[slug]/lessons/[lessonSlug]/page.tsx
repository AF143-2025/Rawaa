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
  ArrowLeft, 
  ArrowRight, 
  Terminal, 
  Layers, 
  Video, 
  Download, 
  Award, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseSlug = params?.slug as string;
  const lessonSlug = params?.lessonSlug as string;

  const data = dataStore.getLesson(courseSlug, lessonSlug);
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (data?.lesson) {
      setIsCompleted(dataStore.isLessonCompleted(data.lesson.id));
    }
  }, [data?.lesson?.id]);

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">الدرس المطلوب غير موجود</h2>
        <Link href="/courses" className="text-cyan-400 hover:underline text-sm inline-flex items-center gap-1">
          <ArrowRight className="w-4 h-4" />
          العودة لكافة الدورات
        </Link>
      </div>
    );
  }

  const { course, module, lesson } = data;
  const allModules = dataStore.getModulesForCourse(course.id);

  // Find next and previous lesson
  const flattenedLessons: Array<{ lesson: typeof lesson; modTitle: string }> = [];
  allModules.forEach(m => {
    m.lessons.forEach(l => {
      flattenedLessons.push({ lesson: l, modTitle: m.title });
    });
  });

  const currentIndex = flattenedLessons.findIndex(item => item.lesson.id === lesson.id);
  const prevLessonItem = currentIndex > 0 ? flattenedLessons[currentIndex - 1] : null;
  const nextLessonItem = currentIndex < flattenedLessons.length - 1 ? flattenedLessons[currentIndex + 1] : null;

  const handleMarkCompleted = () => {
    dataStore.markLessonComplete(course.id, lesson.id);
    setIsCompleted(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });

    if (nextLessonItem) {
      setTimeout(() => {
        router.push(`/courses/${course.slug}/lessons/${nextLessonItem.lesson.slug}`);
      }, 700);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B12]">
      {/* Top Learning Navigation Bar */}
      <div className="sticky top-20 z-40 bg-[#0A0F1D]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-white/5 text-gray-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href={`/courses/${course.slug}`} className="text-gray-400 hover:text-white flex items-center gap-1 font-semibold truncate max-w-xs sm:max-w-md">
            <ArrowRight className="w-3.5 h-3.5" />
            <span className="truncate">{course.title}</span>
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-cyan-400 font-bold truncate max-w-[150px] sm:max-w-sm">{lesson.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              مكتمل
            </span>
          ) : (
            <button
              onClick={handleMarkCompleted}
              className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-glow transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              إكمال الدرس
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Content (3 cols) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Header */}
          <div className="space-y-3 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
              <span className="text-cyan-400 font-semibold">{module.title}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {lesson.duration_minutes} دقيقة
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {lesson.title}
            </h1>
          </div>

          {/* Video Player Placeholder or Embed */}
          <div className="relative rounded-2xl overflow-hidden bg-[#0B101D] border border-white/10 aspect-video flex flex-col items-center justify-center text-center p-6 space-y-3 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shadow-glow">
              <Video className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">الشرح المرئي المصاحب للدرس</h3>
              <p className="text-xs text-gray-400 max-w-sm">
                فيديو تدريبي تفاعلي يشرح المفاهيم الهندسية خطوة بخطوة بالصوت والصورة.
              </p>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 text-gray-400">
              HD 1080p • اللغة العربية • 15:00
            </span>
          </div>

          {/* Formatted Markdown Content */}
          <div className="bg-[#0E1524] border border-white/10 rounded-3xl p-6 sm:p-10 text-gray-300 leading-relaxed space-y-6 text-sm sm:text-base">
            <div className="prose prose-invert max-w-none space-y-4">
              {lesson.content.split('\n\n').map((paragraph, i) => {
                const trimmed = paragraph.trim();
                if (trimmed.startsWith('# ')) {
                  return <h1 key={i} className="text-2xl font-black text-white pt-4 pb-2 border-b border-white/10">{trimmed.replace('# ', '')}</h1>;
                }
                if (trimmed.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold text-cyan-300 pt-3">{trimmed.replace('## ', '')}</h2>;
                }
                if (trimmed.startsWith('### ')) {
                  return <h3 key={i} className="text-lg font-bold text-emerald-400 pt-2">{trimmed.replace('### ', '')}</h3>;
                }
                if (trimmed.startsWith('```')) {
                  const code = trimmed.replace(/```[a-z]*\n?/g, '');
                  return (
                    <div key={i} className="my-4 rounded-xl overflow-hidden border border-white/10 bg-[#070B12]" dir="ltr">
                      <div className="bg-[#0F172A] px-4 py-1.5 text-[11px] text-gray-400 font-mono border-b border-white/5 flex items-center justify-between">
                        <span>terminal / code</span>
                        <span className="text-cyan-400">bash / net</span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {code}
                      </pre>
                    </div>
                  );
                }
                if (trimmed.startsWith('> ')) {
                  return (
                    <blockquote key={i} className="p-4 rounded-xl bg-cyan-950/20 border-r-4 border-cyan-400 text-xs sm:text-sm text-cyan-200 my-4 leading-relaxed">
                      {trimmed.replace('> ', '')}
                    </blockquote>
                  );
                }
                return <p key={i} className="leading-relaxed text-gray-300">{paragraph}</p>;
              })}
            </div>

            {/* Practical Exercise Box if present */}
            {lesson.practical_exercise && (
              <div className="p-6 rounded-2xl bg-[#090D18] border border-cyan-500/30 space-y-3 mt-6">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Terminal className="w-5 h-5" />
                  <span>تطبيق عملي فوري: {lesson.practical_exercise.title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {lesson.practical_exercise.instructions}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/labs?tab=${lesson.practical_exercise.type === 'terminal' ? 'linux' : lesson.practical_exercise.type === 'network' ? 'network' : 'cyber'}`}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-glow transition-all inline-flex items-center gap-1.5"
                  >
                    الانتقال للمختبر وتطبيق المهمة
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Between Lessons */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            {prevLessonItem ? (
              <Link
                href={`/courses/${course.slug}/lessons/${prevLessonItem.lesson.slug}`}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>الدرس السابق: {prevLessonItem.lesson.title}</span>
              </Link>
            ) : <div />}

            {nextLessonItem ? (
              <Link
                href={`/courses/${course.slug}/lessons/${nextLessonItem.lesson.slug}`}
                onClick={() => {
                  if (!isCompleted) handleMarkCompleted();
                }}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold shadow-glow transition-all flex items-center gap-2"
              >
                <span>الدرس التالي: {nextLessonItem.lesson.title}</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href={`/courses/${course.slug}/quiz`}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glowPurple transition-all flex items-center gap-2"
              >
                <span>الانتقال لاختبار الدورة النهائي</span>
                <Award className="w-4 h-4" />
              </Link>
            )}
          </div>

        </div>

        {/* Sidebar: Course Curriculum Navigation (1 col) */}
        <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} lg:static fixed inset-y-0 right-0 z-50 w-80 lg:w-auto bg-[#0A0F1D] lg:bg-transparent p-6 lg:p-0 border-l lg:border-l-0 border-white/10 overflow-y-auto space-y-6`}>
          <div className="bg-[#0E1524] border border-white/10 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                فهرس الدروس
              </h3>
              <span className="text-[11px] font-mono text-gray-400">
                {course.total_lessons} دروس
              </span>
            </div>

            <div className="space-y-4">
              {allModules.map((mod, mIdx) => (
                <div key={mod.id} className="space-y-1.5">
                  <span className="text-[11px] font-bold text-gray-400 block px-2">
                    {mod.title}
                  </span>
                  <div className="space-y-1">
                    {mod.lessons.map(les => {
                      const isCurrent = les.id === lesson.id;
                      const isDone = dataStore.isLessonCompleted(les.id);

                      return (
                        <Link
                          key={les.id}
                          href={`/courses/${course.slug}/lessons/${les.slug}`}
                          onClick={() => setSidebarOpen(false)}
                          className={`w-full p-2.5 rounded-xl text-right text-xs transition-all flex items-center justify-between gap-2 ${
                            isCurrent
                              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{les.title}</span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quiz shortcut in sidebar */}
            <div className="pt-3 border-t border-white/10">
              <Link
                href={`/courses/${course.slug}/quiz`}
                className="w-full p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/30 text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                اختبار الدورة والشهادة
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
