'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { dataStore } from '@/lib/store';
import { BookOpen, Search, Filter, Clock, ArrowLeft, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { TrackSlug } from '@/types';

export default function CoursesCatalogPage() {
  const allCourses = dataStore.getCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesTrack = selectedTrack === 'all' || course.path_slug === selectedTrack;

    return matchesSearch && matchesLevel && matchesTrack;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
          COURSE CATALOG
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">دليل الدورات التدريبية</h1>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          تصفح دورات الشبكات ولينكس والأمن السيبراني، مع شروحات نظرية متعمقة واختبارات وتطبيقات معملية مباشرة.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-[#0E1524] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search Box */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-gray-400 absolute right-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="ابحث في الدورات أو الكلمات المفتاحية..."
              className="w-full bg-[#070B12] border border-white/10 rounded-xl pr-11 pl-4 py-2.5 text-xs text-white placeholder:text-gray-500 outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Level Filter */}
          <div>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500 transition-colors cursor-pointer"
            >
              <option value="all">كافة المستويات</option>
              <option value="مبتدئ">مبتدئ</option>
              <option value="متوسط">متوسط</option>
              <option value="متقدم">متقدم</option>
            </select>
          </div>

          {/* Track Filter */}
          <div>
            <select
              value={selectedTrack}
              onChange={e => setSelectedTrack(e.target.value)}
              className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500 transition-colors cursor-pointer"
            >
              <option value="all">كافة التخصصات</option>
              <option value="networks">الشبكات والاتصالات</option>
              <option value="linux">أنظمة وسيرفرات Linux</option>
              <option value="cybersecurity">الأمن السيبراني والدفاع</option>
            </select>
          </div>

        </div>

        {/* Active Filters Summary */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
          <span>تم العثور على <strong className="text-cyan-400 font-mono">{filteredCourses.length}</strong> دورة</span>
          {(searchTerm || selectedLevel !== 'all' || selectedTrack !== 'all') && (
            <button
              onClick={() => { setSearchTerm(''); setSelectedLevel('all'); setSelectedTrack('all'); }}
              className="text-xs text-cyan-400 hover:underline"
            >
              إعادة ضبط الفلاتر
            </button>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-[#0E1524] border border-white/10 hover:border-cyan-500/30 rounded-3xl overflow-hidden shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={course.cover_image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1524] via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-cyan-400 border border-white/10">
                    {course.level}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-400 pt-3 border-t border-white/5 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {course.duration_hours} ساعة
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      {course.total_lessons} دروس
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/courses/${course.slug}`}
                  className="w-full py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/30 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  استعراض محتوى الدورة
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0E1524] border border-white/10 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto">
          <BookOpen className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">لم يتم العثور على أي دورات مطابقة</h3>
          <p className="text-xs text-gray-400">
            جرب تعديل كلمات البحث أو مسح الفلاتر المختارة للاطلاع على كافة الدورات.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedLevel('all'); setSelectedTrack('all'); }}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            مسح الفلاتر
          </button>
        </div>
      )}
    </div>
  );
}
