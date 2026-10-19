'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { dataStore, DEMO_STUDENT } from '@/lib/store';
import { User, Mail, Award, Sparkles, CheckCircle2, ArrowRight, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isSaved, setIsSaved] = useState(false);

  const currentUser = user || DEMO_STUDENT;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updateUserProfile({
      full_name: fullName,
      bio
    });
    refreshUser();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const certificates = dataStore.getCertificates(currentUser.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
        <span>/</span>
        <Link href="/dashboard" className="hover:text-white transition-colors">لوحة التحكم</Link>
        <span>/</span>
        <span className="text-cyan-400 font-semibold">الملف الشخصي</span>
      </div>

      <div className="bg-[#0E1524] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.full_name}`}
              alt={currentUser.full_name}
              className="w-20 h-20 rounded-2xl border-2 border-cyan-400 object-cover shadow-glow"
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white">{currentUser.full_name}</h1>
              <span className="text-xs text-gray-400 font-mono block">{currentUser.email}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono inline-block">
                {currentUser.role === 'admin' ? 'مسؤول النظام (Admin)' : 'طالب مسجل'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#070B12] rounded-2xl border border-white/5 text-center min-w-[100px]">
              <span className="text-xl font-bold font-mono text-cyan-400 block">{currentUser.points || 0}</span>
              <span className="text-[10px] text-gray-400">نقطة تميز</span>
            </div>
            <div className="p-3 bg-[#070B12] rounded-2xl border border-white/5 text-center min-w-[100px]">
              <span className="text-xl font-bold font-mono text-amber-400 block">{certificates.length}</span>
              <span className="text-[10px] text-gray-400">شهادة إتمام</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="space-y-4 max-w-xl">
          <h3 className="text-base font-bold text-white">تعديل بيانات الحساب</h3>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-400">الاسم الكامل (يظهر على الشهادات الصادرة)</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-400">البريد الإلكتروني (غير قابل للتغيير المباشر)</label>
            <input
              type="email"
              disabled
              value={currentUser.email}
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-gray-500 font-mono cursor-not-allowed"
              dir="ltr"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-400">نبذة تعريفية (Bio)</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              placeholder="اكتب نبذة عن اهتماماتك التقنية والمسارات التي تدرسها..."
              className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-glow transition-all"
            >
              حفظ التغييرات
            </button>
            {isSaved && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                تم حفظ التعديلات بنجاح!
              </span>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}
