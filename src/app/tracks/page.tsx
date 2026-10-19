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
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
          LEARNING PATHWAYS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">المسارات التعليمية التخصصية</h1>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
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
              className="bg-[#0E1524] border border-white/10 hover:border-cyan-500/40 rounded-3xl p-8 transition-all hover:-translate-y-1 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center p-0.5"
                    style={{ background: `linear-gradient(135deg, ${track.color}, transparent)` }}
                  >
                    <div className="w-full h-full bg-[#080D18] rounded-[14px] flex items-center justify-center">
                      <Icon className="w-7 h-7" style={{ color: track.color }} />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1.5 rounded-full">
                    {track.total_hours} ساعة تدريبية
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">{track.title}</h2>
                  <span className="text-xs font-mono text-gray-500 block mt-1">{track.title_en}</span>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {track.description}
                </p>

                {/* Topics list */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-xs font-bold text-gray-400 block">مفردات ومحتويات المسار:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
                    {track.topics.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Track courses count */}
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    {trackCourses.length > 0 ? `${trackCourses.length} دورات متاحة` : 'مختبرات وتحديات مستمرة'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    مستوى: {track.level}
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <Link
                  href={`/tracks/${track.slug}`}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-glow transition-all flex items-center gap-2"
                >
                  استعراض المسار والدورات
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  href="/labs"
                  className="text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  تطبيق معملي
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
