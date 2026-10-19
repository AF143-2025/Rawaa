'use client';

import React from 'react';
import Link from 'next/link';
import { INITIAL_TRACKS } from '@/lib/mockData';
import { dataStore } from '@/lib/store';
import { Network, Terminal, Shield, Cpu, ArrowLeft, CheckCircle2, Clock, BookOpen } from 'lucide-react';

export default function TracksPage() {
  const courses = dataStore.getCourses();

  const iconMap: Record<string, any> = {
    Network,
    Terminal,
    Shield,
    Cpu
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono text-sky-600 uppercase tracking-widest font-bold">
          LEARNING PATHWAYS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">المسارات التعليمية التخصصية</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          خرائط طريق تعليمية متدرجة تبدأ من الصفر وصولاً إلى المستويات الهندسية والاحترافية، مع تطبيق معملي متزامن.
        </p>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INITIAL_TRACKS.map(track => {
          const Icon = iconMap[track.icon] || Shield;
          const trackCourses = courses.filter(c => c.path_slug === track.slug);

          return (
            <div
              key={track.id}
              className="bg-white border border-slate-200 hover:border-sky-400 rounded-3xl p-8 transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center p-0.5 shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${track.color}, #F0F9FF)` }}
                  >
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <Icon className="w-7 h-7" style={{ color: track.color }} />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full font-bold">
                    {track.total_hours} ساعة تدريبية
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{track.title}</h2>
                  <span className="text-xs font-mono text-slate-400 block mt-1">{track.title_en}</span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {track.description}
                </p>

                {/* Topics list */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700 block">مفردات ومحتويات المسار:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {track.topics.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Track courses count */}
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    {trackCourses.length > 0 ? `${trackCourses.length} دورات متاحة` : 'مختبرات وتحديات مستمرة'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    مستوى: {track.level}
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/tracks/${track.slug}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-xs shadow-md shadow-sky-500/20 transition-all flex items-center gap-2"
                >
                  استعراض المسار والدورات
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <span className="text-xs font-mono text-slate-400">{track.slug}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
