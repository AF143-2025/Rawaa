'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield, Lock, Mail, ArrowLeft, Sparkles, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
    router.push('/dashboard');
  };

  const fillDemo = (type: 'student' | 'admin') => {
    if (type === 'admin') {
      setEmail('admin@rawaa.academy');
      setPassword('adminPass2026!');
    } else {
      setEmail('student@rawaa.academy');
      setPassword('studentPass2026!');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#0E1524] border border-cyan-500/20 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-32 h-32 glow-orb-cyan pointer-events-none" />

        <div className="text-center space-y-2 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3 shadow-glow">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">تسجيل الدخول إلى رواء</h1>
          <p className="text-xs text-gray-400">
            «تعلّم اليوم، واحمِ المستقبل.»
          </p>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div className="p-3 bg-[#070B12] rounded-2xl border border-white/5 space-y-2">
          <span className="text-[11px] text-gray-400 font-semibold block text-center">
            تجربة فورية للحسابات (Demo Accounts):
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fillDemo('student')}
              className="flex-1 py-1.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 text-xs font-semibold transition-colors text-center"
            >
              🎓 حساب طالب
            </button>
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className="flex-1 py-1.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs font-semibold transition-colors text-center"
            >
              🛡️ حساب مسؤول
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-300 font-medium">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute right-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@rawaa.academy"
                className="w-full bg-[#070B12] border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder:text-gray-600 outline-none focus:border-cyan-500 transition-colors"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="text-gray-300 font-medium">كلمة المرور</label>
              <span className="text-[11px] text-cyan-400 hover:underline cursor-pointer">
                نسيت كلمة المرور؟
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute right-3.5 top-3" />
              <input
                type="password"
                required
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
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? 'جارِ التحقق...' : 'تسجيل الدخول'}
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-gray-400 border-t border-white/5">
          ليس لديك حساب بعد؟{' '}
          <Link href="/register" className="text-cyan-400 font-bold hover:underline">
            إنشاء حساب جديد مجاناً
          </Link>
        </div>

      </div>
    </div>
  );
}
