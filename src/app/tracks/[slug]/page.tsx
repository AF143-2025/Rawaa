'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { INITIAL_TRACKS } from '@/lib/mockData';
import { dataStore } from '@/lib/store';
import { Network, Terminal, Shield, Cpu, ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Clock, Award } from 'lucide-react';

export default function TrackDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const track = INITIAL_TRACKS.find(t => t.slug === slug);
  if (!track) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">المسار المطلوب غير موجود</h2>
        <Link href="/tracks" className="text-cyan-400 hover:underline text-sm inline-flex items-center gap-1">
          <ArrowRight className="w-4 h-4" />
          العودة لكافة المسارات
        </Link>
      </div>
    );
  }

  const courses = dataStore.getCourses().filter(c => c.path_slug === track.slug);

  const iconMap: Record<string, any> = {
    Network,
    Terminal,
    Shield,
    Cpu
  };
  const Icon = iconMap[track.icon] || Shield;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
        <span>/</span>
        <Link href="/tracks" className="hover:text-white transition-colors">المسارات</Link>
        <span>/</span>
        <span className="text-cyan-400 font-semibold">{track.title}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-[#0E1524] border border-cyan-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center p-0.5"
                style={{ background: `linear-gradient(135deg, ${track.color}, transparent)` }}
              >
                <div className="w-full h-full bg-[#080D18] rounded-[14px] flex items-center justify-center">
                  <Icon className="w-6 h-6" style={{ color: track.color }} />
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                {track.title_en}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white">{track.title}</h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{track.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#070B12] p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-4">
              <span className="text-2xl font-bold font-mono text-cyan-400">{track.total_hours}</span>
              <span className="text-[11px] text-gray-400 block">ساعة تدريبية</span>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="text-center px-4">
              <span className="text-2xl font-bold font-mono text-emerald-400">{courses.length}</span>
              <span className="text-[11px] text-gray-400 block">دورات معتمدة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Track Syllabus Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 cols: Associated Courses */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            الدورات والمحتوى الأكاديمي للمسار
          </h2>

          {courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map((course, idx) => (
                <div
                  key={course.id}
                  className="bg-[#0E1524] border border-white/10 hover:border-cyan-500/30 rounded-2xl p-6 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-sm font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-300 font-mono">
                          {course.level}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {course.duration_hours} ساعات
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{course.title}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed max-w-xl">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/30 text-xs font-bold transition-all shrink-0 self-end sm:self-auto flex items-center gap-1.5"
                  >
                    بدء الدورة
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[#0E1524] border border-white/10 text-center space-y-3">
              <Cpu className="w-10 h-10 text-cyan-400 mx-auto" />
              <h3 className="text-base font-bold text-white">المختبرات العملية والتحديات المستمرة</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                هذا المسار يركز على التدريب المعملي الفوري وتحديات CTF وحسابات الشبكات في بيئات معزولة.
              </p>
              <Link
                href="/labs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs shadow-glow"
              >
                الدخول لمنصة المختبرات
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Right 1 col: Roadmap Milestones */}
        <div className="bg-[#0E1524] border border-white/10 rounded-3xl p-6 space-y-6 h-fit">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            المحطات التعليمية للمسار
          </h3>

          <div className="space-y-4">
            {track.topics.map((topic, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-gray-300 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-xs text-gray-300 leading-relaxed">{topic}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <Award className="w-4 h-4" />
              شهادة إتمام معتمدة
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              عند اجتياز دورات المسار واختبار التقييم المعملي، ستصدر لك شهادة رقمية برمز استعلام فوري.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
