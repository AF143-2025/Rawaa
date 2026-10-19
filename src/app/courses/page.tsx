'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { dataStore } from '@/lib/store';
import { BookOpen, Search, Clock, ArrowLeft } from 'lucide-react';

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
        <span className="text-xs font-mono text-sky-600 uppercase tracking-widest font-bold">
          COURSE CATALOG
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">دليل الدورات التدريبية</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          تصفح دورات الشبكات ولينكس والأمن السيبراني، مع شروحات نظرية متعمقة واختبارات وتطبيقات معملية مباشرة.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search Box */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="ابحث في الدورات أو الكلمات المفتاحية..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-11 pl-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Level Filter */}
          <div>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-sky-500 transition-colors cursor-pointer"
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
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-sky-500 transition-colors cursor-pointer"
            >
              <option value="all">كافة التخصصات</option>
              <option value="networks">الشبكات والاتصالات</option>
              <option value="linux">أنظمة وسيرفرات Linux</option>
              <option value="cybersecurity">الأمن السيبراني والدفاع</option>
            </select>
          </div>

        </div>

        {/* Active Filters Summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>تم العثور على <strong className="text-sky-600 font-mono font-bold">{filteredCourses.length}</strong> دورة</span>
          {(searchTerm || selectedLevel !== 'all' || selectedTrack !== 'all') && (
            <button
              onClick={() => { setSearchTerm(''); setSelectedLevel('all'); setSelectedTrack('all'); }}
              className="text-xs text-sky-600 font-bold hover:underline"
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
              className="bg-white border border-slate-200 hover:border-sky-400 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={course.cover_image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-slate-900 shadow-sm">
                    {course.level}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      {course.duration_hours} ساعة
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      {course.total_lessons} دروس
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/courses/${course.slug}`}
                  className="w-full py-3 rounded-xl bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white border border-sky-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  استعراض محتوى الدورة
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">لم يتم العثور على أي دورات مطابقة</h3>
          <p className="text-xs text-slate-500">
            جرب تعديل كلمات البحث أو مسح الفلاتر المختارة للاطلاع على كافة الدورات.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedLevel('all'); setSelectedTrack('all'); }}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            مسح الفلاتر
          </button>
        </div>
      )}
    </div>
  );
}
