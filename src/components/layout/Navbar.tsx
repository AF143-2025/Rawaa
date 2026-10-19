'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Shield, 
  Terminal, 
  Network, 
  Cpu, 
  Award, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  CheckCircle,
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, isAdmin, logout, switchDemoRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/tracks', label: 'المسارات التعليمية' },
    { href: '/courses', label: 'الدورات التدريبية' },
    { href: '/labs', label: 'المختبرات العملية' },
    { href: '/verify', label: 'التحقق من الشهادات' },
  ];

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <header className="sticky top-0 z-50 bg-[#070B12]/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-emerald-400 p-0.5 shadow-glow group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080D18] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-1">
                رِواء
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse"></span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase -mt-1 font-bold">
                RAWAA ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all ${
                  isActive(link.href)
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Controls & Quick Role Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <div className="flex items-center gap-3">
                  {/* Points Badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{user.points || 0} نقطة</span>
                  </div>

                  {/* Profile Trigger */}
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
                  >
                    <img
                      src={user.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.full_name}`}
                      alt={user.full_name}
                      className="w-8 h-8 rounded-full border border-cyan-400/50 object-cover"
                    />
                    <div className="text-right text-xs">
                      <span className="text-white font-bold block max-w-[120px] truncate">{user.full_name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {user.role === 'admin' ? '🛡️ مسؤول النظام' : '🎓 طالب'}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute left-0 mt-2 w-64 rounded-2xl bg-[#0E1524] border border-white/10 p-2 shadow-2xl space-y-1 z-50 text-xs"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      لوحة تحكم الطالب
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-amber-300 hover:bg-amber-500/10 transition-colors font-bold"
                      >
                        <ShieldAlert className="w-4 h-4 text-amber-400" />
                        لوحة تحكم الإدارة (Admin)
                      </Link>
                    )}

                    <div className="border-t border-white/10 my-1 pt-1">
                      <div className="px-3 py-1.5 text-[10px] text-gray-400">تبديل الحساب التجريبي السريع:</div>
                      <div className="flex gap-1 px-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); switchDemoRole('student'); }}
                          className={`flex-1 py-1 rounded text-[11px] font-semibold transition-colors ${
                            role === 'student' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-gray-400 hover:text-white'
                          }`}
                        >
                          طالب
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); switchDemoRole('admin'); }}
                          className={`flex-1 py-1 rounded text-[11px] font-semibold transition-colors ${
                            role === 'admin' ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-400 hover:text-white'
                          }`}
                        >
                          مسؤول (Admin)
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-1">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-950/30 transition-colors text-right"
                      >
                        <LogOut className="w-4 h-4" />
                        تسجيل الخروج
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-glow"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <div className="px-2 py-1 rounded-full bg-cyan-950/40 text-[11px] font-mono text-cyan-400 border border-cyan-500/20">
                {user.points} ن
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B101D] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'bg-cyan-500/10 text-cyan-400 font-bold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl bg-white/5 text-sm text-cyan-300 font-semibold"
                >
                  لوحة تحكم الطالب
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl bg-amber-500/10 text-sm text-amber-300 font-bold"
                  >
                    لوحة تحكم الإدارة (Admin)
                  </Link>
                )}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => { switchDemoRole('student'); setMobileMenuOpen(false); }}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold ${
                      role === 'student' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    حساب طالب
                  </button>
                  <button
                    onClick={() => { switchDemoRole('admin'); setMobileMenuOpen(false); }}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold ${
                      role === 'admin' ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    حساب مسؤول
                  </button>
                </div>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full text-right px-4 py-2 text-xs text-rose-400"
                >
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-xl bg-white/5 text-sm text-white font-semibold"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-xl bg-cyan-500 text-sm text-black font-bold"
                >
                  إنشاء حساب جديد
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
