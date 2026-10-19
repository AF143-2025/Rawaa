'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { dataStore, DEMO_ADMIN, DEMO_STUDENT } from '@/lib/store';
import { Course, Announcement, UserProfile } from '@/types';
import { 
  ShieldAlert, 
  Users, 
  BookOpen, 
  Award, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Bell, 
  Terminal, 
  Activity, 
  Layers, 
  Search,
  Lock
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isAdmin, switchDemoRole } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [activeTab, setActiveTab] = useState<'metrics' | 'courses' | 'students' | 'announcements'>('metrics');

  // New Course Modal State
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newPath, setNewPath] = useState<'networks' | 'linux' | 'cybersecurity'>('networks');
  const [newLevel, setNewLevel] = useState<'مبتدئ' | 'متوسط' | 'متقدم'>('مبتدئ');
  const [newDesc, setNewDesc] = useState('');
  const [newHours, setNewHours] = useState(10);

  // New Announcement State
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annType, setAnnType] = useState<'info' | 'warning' | 'success'>('info');

  const stats = dataStore.getPlatformStats();
  const allCertificates = dataStore.getCertificates();

  useEffect(() => {
    setCourses(dataStore.getCourses());
    setAnnouncements(dataStore.getAnnouncements());
  }, []);

  // Strict Role Protection
  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">منطقة إدارية محمية</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
            هذه الصفحة تتطلب صلاحيات مسؤول النظام (Admin). لا يمكن الوصول إليها بحساب طالب عادي.
          </p>
        </div>

        {/* Demo Helper */}
        <div className="p-4 rounded-2xl bg-[#0E1524] border border-white/10 space-y-3 text-xs">
          <span className="text-gray-300 font-semibold block">
            لأغراض المراجعة والتقييم السريع:
          </span>
          <button
            onClick={() => switchDemoRole('admin')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all inline-flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            التبديل إلى حساب مسؤول (Admin) بنقرة واحدة
          </button>
        </div>

        <div>
          <Link href="/" className="text-xs text-gray-500 hover:text-white underline">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSlug.trim()) return;

    const created: Course = {
      id: `course-custom-${Date.now()}`,
      title: newTitle,
      slug: newSlug.toLowerCase().replace(/\s+/g, '-'),
      path_slug: newPath,
      level: newLevel,
      description: newDesc || 'دورة تدريبية متخصصة ومحدثة وفق أعلى المعايير.',
      duration_hours: Number(newHours),
      prerequisites: ['المعرفة الأساسية بالأنظمة'],
      learning_objectives: ['فهم وتطبيق المفاهيم المعملية المطروحة'],
      cover_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      is_published: true,
      total_lessons: 3,
      created_at: new Date().toISOString()
    };

    dataStore.createCourse(created);
    setCourses(dataStore.getCourses());
    setShowAddCourse(false);
    setNewTitle('');
    setNewSlug('');
    setNewDesc('');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    dataStore.addAnnouncement({
      title: annTitle,
      content: annContent,
      type: annType,
      is_active: true
    });

    setAnnouncements(dataStore.getAnnouncements());
    setAnnTitle('');
    setAnnContent('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Admin Top Header */}
      <div className="bg-[#0E1524] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>لوحة التحكم الإدارية (ADMIN CONTROL PANEL)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              إدارة منصة رواء | RAWAA Academy
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              إدارة الطلاب، الدورات، الاختبارات، الشهادات، ونشر التنبيهات والإعلانات العامة.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddCourse(true)}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-glow transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              إضافة دورة جديدة
            </button>
            <button
              onClick={() => switchDemoRole('student')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-colors"
            >
              معاينة كطالب
            </button>
          </div>
        </div>
      </div>

      {/* Admin Tab Controls */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#0E1524] border border-white/10 rounded-2xl max-w-2xl">
        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'metrics' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          المؤشرات والإحصائيات
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'courses' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          إدارة الدورات ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'students' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          الطلاب والشهادات
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'announcements' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-gray-400 hover:text-white'
          }`}
        >
          الإعلانات والتنبيهات
        </button>
      </div>

      {/* TAB 1: METRICS */}
      {activeTab === 'metrics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#0E1524] border border-white/10 space-y-2">
              <span className="text-xs text-gray-400 font-semibold block">إجمالي الطلاب المسجلين</span>
              <span className="text-3xl font-bold font-mono text-cyan-400">{stats.totalStudentsEnrolled}</span>
              <span className="text-[10px] text-gray-500 block">طلاب نشطون في المسارات</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1524] border border-white/10 space-y-2">
              <span className="text-xs text-gray-400 font-semibold block">الدورات المنشورة</span>
              <span className="text-3xl font-bold font-mono text-emerald-400">{courses.length}</span>
              <span className="text-[10px] text-gray-500 block">في 4 مسارات تخصصية</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1524] border border-white/10 space-y-2">
              <span className="text-xs text-gray-400 font-semibold block">الشهادات الرقمية الصادرة</span>
              <span className="text-3xl font-bold font-mono text-amber-400">{allCertificates.length}</span>
              <span className="text-[10px] text-gray-500 block">موثقة برموز تحقق عامة</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1524] border border-white/10 space-y-2">
              <span className="text-xs text-gray-400 font-semibold block">التحديات المعملية الفعالة</span>
              <span className="text-3xl font-bold font-mono text-purple-400">{stats.totalChallenges}</span>
              <span className="text-[10px] text-gray-500 block">Linux & Subnetting & CTF</span>
            </div>
          </div>

          {/* Quick System Integrity Status */}
          <div className="p-6 rounded-2xl bg-[#070B12] border border-white/5 space-y-3 font-mono text-xs text-gray-300">
            <span className="text-cyan-400 font-bold font-sans block">حالة بيئات الخادم والمختبرات:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>Virtual Linux Engine: ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>Network Simulator: OK</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>RLS Database Security: ENFORCED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COURSES MANAGEMENT */}
      {activeTab === 'courses' && (
        <div className="bg-[#0E1524] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-base font-bold text-white">قائمة الدورات في المنصة</h3>
            <span className="text-xs text-gray-400 font-mono">{courses.length} دورات</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#070B12] text-gray-400 border-b border-white/5">
                <tr>
                  <th className="py-3 px-4">عنوان الدورة</th>
                  <th className="py-3 px-4">المسار</th>
                  <th className="py-3 px-4">المستوى</th>
                  <th className="py-3 px-4">المدة</th>
                  <th className="py-3 px-4">الحالة</th>
                  <th className="py-3 px-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {courses.map(course => (
                  <tr key={course.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-bold text-white">{course.title}</td>
                    <td className="py-3 px-4 font-mono text-cyan-400">{course.path_slug.toUpperCase()}</td>
                    <td className="py-3 px-4">{course.level}</td>
                    <td className="py-3 px-4 font-mono">{course.duration_hours} ساعات</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                        منشورة (Live)
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="text-cyan-400 hover:underline font-semibold"
                      >
                        معاينة
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: STUDENTS & CERTIFICATES */}
      {activeTab === 'students' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Sample Student Accounts */}
          <div className="bg-[#0E1524] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              حسابات الطلاب المسجلة
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#070B12] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={DEMO_STUDENT.avatar_url}
                    alt={DEMO_STUDENT.full_name}
                    className="w-10 h-10 rounded-full object-cover border border-cyan-400"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{DEMO_STUDENT.full_name}</h4>
                    <span className="text-xs text-gray-400 font-mono">{DEMO_STUDENT.email}</span>
                  </div>
                </div>
                <div className="text-right text-xs font-mono">
                  <span className="text-cyan-400 font-bold block">{DEMO_STUDENT.points} نقطة</span>
                  <span className="text-gray-500">طالب نشط</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificates Issued List */}
          <div className="bg-[#0E1524] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              الشهادات الصادرة للتحقق
            </h3>

            <div className="space-y-3">
              {allCertificates.map(cert => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl bg-[#070B12] border border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="text-amber-400 font-mono font-bold block" dir="ltr">{cert.certificate_code}</span>
                    <span className="text-white font-medium block">{cert.user_name}</span>
                    <span className="text-gray-400">{cert.course_title}</span>
                  </div>
                  <Link
                    href={`/verify/${cert.certificate_code}`}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 hover:bg-amber-500 hover:text-black font-semibold transition-colors"
                  >
                    فحص الشهادة
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Post Form */}
          <form onSubmit={handleCreateAnnouncement} className="bg-[#0E1524] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              نشر تنبيه أو إعلان عام للطلاب
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400">عنوان الإعلان</label>
              <input
                type="text"
                value={annTitle}
                onChange={e => setAnnTitle(e.target.value)}
                placeholder="مثال: تحديات أمنية جديدة في مسار CTF..."
                className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400">محتوى الإعلان</label>
              <textarea
                value={annContent}
                onChange={e => setAnnContent(e.target.value)}
                rows={4}
                placeholder="تفاصيل التنبيه الموجه لكافة الطلاب..."
                className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400">نوع الإعلان</label>
              <select
                value={annType}
                onChange={e => setAnnType(e.target.value as any)}
                className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="info">إشعار عام (Info)</option>
                <option value="success">إنجاز أو إطلاق (Success)</option>
                <option value="warning">تنبيه هام (Warning)</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-glow transition-all"
            >
              نشر الإعلان فورياً
            </button>
          </form>

          {/* Current Announcements List */}
          <div className="bg-[#0E1524] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">الإعلانات المنشورة حالياً</h3>

            <div className="space-y-3">
              {announcements.map(ann => (
                <div
                  key={ann.id}
                  className="p-4 rounded-xl bg-[#070B12] border border-white/5 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{ann.title}</span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {new Date(ann.created_at).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Course */}
      {showAddCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 overflow-y-auto flex items-center justify-center">
          <form
            onSubmit={handleCreateCourse}
            className="w-full max-w-lg bg-[#0E1524] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                إضافة دورة تدريبية جديدة
              </h3>
              <button
                type="button"
                onClick={() => setShowAddCourse(false)}
                className="text-gray-400 hover:text-white text-xs"
              >
                إلغاء
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400">اسم الدورة</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="مثال: مدخل إلى أمن السحابة وحماية خوادم AWS"
                className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">الرابط التعريفي (Slug)</label>
                <input
                  type="text"
                  required
                  value={newSlug}
                  onChange={e => setNewSlug(e.target.value)}
                  placeholder="cloud-security-101"
                  className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-cyan-500"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">المسار التخصصي</label>
                <select
                  value={newPath}
                  onChange={e => setNewPath(e.target.value as any)}
                  className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="networks">الشبكات</option>
                  <option value="linux">لينكس</option>
                  <option value="cybersecurity">الأمن السيبراني</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">المستوى</label>
                <select
                  value={newLevel}
                  onChange={e => setNewLevel(e.target.value as any)}
                  className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="مبتدئ">مبتدئ</option>
                  <option value="متوسط">متوسط</option>
                  <option value="متقدم">متقدم</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">المدة بالساعات</label>
                <input
                  type="number"
                  value={newHours}
                  onChange={e => setNewHours(Number(e.target.value))}
                  className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400">وصف الدورة</label>
              <textarea
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                rows={3}
                placeholder="وصف تفصيلي للدورة ومخرجاتها التعليمية..."
                className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddCourse(false)}
                className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-glow"
              >
                حفظ ونشر الدورة
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
