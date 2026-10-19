'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { dataStore } from '@/lib/store';
import QuizPlayer from '@/components/quiz/QuizPlayer';
import { ArrowRight, BookOpen, Award } from 'lucide-react';

export default function CourseQuizPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const course = dataStore.getCourseBySlug(slug);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">الدورة غير موجودة</h2>
        <Link href="/courses" className="text-cyan-400 hover:underline text-sm inline-flex items-center gap-1">
          <ArrowRight className="w-4 h-4" />
          العودة لكافة الدورات
        </Link>
      </div>
    );
  }

  const quiz = dataStore.getQuizForCourse(course.id);

  if (!quiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">لا يوجد اختبار مسجل لهذه الدورة حالياً</h2>
        <Link href={`/courses/${course.slug}`} className="text-cyan-400 hover:underline text-sm inline-flex items-center gap-1">
          <ArrowRight className="w-4 h-4" />
          العودة لتفاصيل الدورة
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
        <span>/</span>
        <Link href="/courses" className="hover:text-white transition-colors">الدورات</Link>
        <span>/</span>
        <Link href={`/courses/${course.slug}`} className="hover:text-white transition-colors">{course.title}</Link>
        <span>/</span>
        <span className="text-cyan-400 font-semibold">الاختبار النهائي</span>
      </div>

      <QuizPlayer quiz={quiz} />
    </div>
  );
}
