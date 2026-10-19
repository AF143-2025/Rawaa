'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield, Lock, Mail, User, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setIsLoading(true);
    await register(fullName, email, password);
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#0E1524] border border-cyan-500/20 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-32 h-32 glow-orb-cyan pointer-events-none" />

        <div className="text-center space-y-2 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 mx-auto mb-3 shadow-glow">
            <div className="w-full h-full bg-[#080D18] rounded-[14px] flex items-center justify-center">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white">انضم إلى أكاديمية رواء</h1>
          <p className="text-xs text-gray-400">
            «تعلّم اليوم، واحمِ المستقبل.»
          </p>
        </div>

        {/* Welcome Bonus Notice */}
        <div className="p-3 bg-cyan-950/30 rounded-2xl border border-cyan-500/20 flex items-center gap-2.5 text-xs text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>احصل على <strong>25 نقطة ترحيبية</strong> فورية عند إنشاء حسابك اليوم!</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-300 font-medium">الاسم الكامل</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute right-3.5 top-3" />
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="مثال: عبد الله السالم"
                className="w-full bg-[#070B12] border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder:text-gray-600 outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-300 font-medium">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute right-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-[#070B12] border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder:text-gray-600 outline-none focus:border-cyan-500 transition-colors"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-300 font-medium">كلمة المرور (8 أحرف على الأقل)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute right-3.5 top-3" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#070B12] border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder:text-gray-600 outline-none focus:border-cyan-500 transition-colors"
                dir="ltr"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-black font-extrabold text-xs shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? 'جارِ إنشاء الحساب...' : 'إنشاء الحساب وبدء التعلم'}
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-gray-400 border-t border-white/5">
          لديك حساب بالفعل؟{' '}
          <Link href="/login" className="text-cyan-400 font-bold hover:underline">
            تسجيل الدخول
          </Link>
        </div>

      </div>
    </div>
  );
}
