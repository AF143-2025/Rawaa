'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Terminal, 
  FolderTree, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  Play,
  RotateCcw
} from 'lucide-react';

export default function LinuxSection() {
  const [commandInput, setCommandInput] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'whoami',
      output: 'rawaa_cyber_engineer 🛡️'
    },
    {
      cmd: 'cat advice.txt',
      output: '« يا رواء، الشاشة السوداء هي أوفى صديقة؛ كل أمر تكتبينه يبني عقلية مهندسة حقيقية! 🌸 »'
    }
  ]);

  const handleRunCommand = (cmdToRun?: string) => {
    const rawCmd = (cmdToRun || commandInput).trim();
    if (!rawCmd) return;

    if (rawCmd === 'clear') {
      setHistory([]);
      setCommandInput('');
      return;
    }

    let out = '';
    const clean = rawCmd.toLowerCase();

    if (clean === 'help') {
      out = 'الأوامر المتاحة في هذا المحاكي: whoami, pwd, ls, ls -la, cat advice.txt, uname -a, clear';
    } else if (clean === 'whoami') {
      out = 'rawaa_cyber_engineer 🛡️';
    } else if (clean === 'pwd') {
      out = '/home/rawaa/cyber-academy';
    } else if (clean === 'ls' || clean === 'ls -la') {
      out = `drwxr-xr-x 2 rawaa users 4096 Oct 20 22:30 .
drwxr-xr-x 3 rawaa users 4096 Oct 20 22:00 ..
-rw-r--r-- 1 rawaa users  142 Oct 20 22:15 advice.txt
-rwxr-xr-x 1 rawaa users  520 Oct 20 22:20 firewall.sh
-rw-r--r-- 1 rawaa users  230 Oct 20 22:25 network.conf`;
    } else if (clean.startsWith('cat advice')) {
      out = '« يا رواء، الشاشة السوداء هي أوفى صديقة؛ كل أمر تكتبينه يبني عقلية مهندسة حقيقية! 🌸 »';
    } else if (clean === 'uname -a') {
      out = 'Linux rawaa-workstation 6.5.0-generic #42-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux';
    } else {
      out = `bash: ${rawCmd}: command not found (اكتبي help لعرض الأوامر التجريبية)`;
    }

    setHistory(prev => [...prev, { cmd: rawCmd, output: out }]);
    setCommandInput('');
  };

  const linuxTopics = [
    {
      title: 'أوامر الطرفية والتنقل السريع (CLI Navigation)',
      desc: 'إتقان سطر الأوامر Bash، والتحكم بالملفات والمجلدات عبر (ls, cd, pwd, cat, grep, find, mkdir).',
      icon: Terminal,
      tag: 'طرفية وأوامر'
    },
    {
      title: 'نظام الصلاحيات وتصاريح المستخدمين',
      desc: 'فهم أذونات القراءة والكتابة والتنفيذ (rwx)، وتطبيق chmod و chown وإدارة المجموعات ومستخدم sudo.',
      icon: ShieldCheck,
      tag: 'تصاريح وأمان'
    },
    {
      title: 'إدارة العمليات والخدمات (Systemd & Processes)',
      desc: 'مراقبة استهلاك الموارد عبر top و ps aux، وإدارة وتشغيل الخدمات عبر systemctl والجدولة بواسطة cron.',
      icon: Cpu,
      tag: 'خدمات ونظام'
    },
    {
      title: 'إدارة الشبكات والاتصال الآمن (SSH & Networking)',
      desc: 'الاتصال المشفر بالخوادم البعيدة عبر SSH ومفاتيح التشفير، وإدارة جدار الحماية UFW وفحص المنافذ.',
      icon: FolderTree,
      tag: 'شبكات واتصال'
    }
  ];

  return (
    <section id="linux" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-40 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <Terminal className="w-4 h-4" />
              <span>القسم الثالث: إدارة أنظمة وخوادم Linux</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              مسار إدارة وسيرفرات Linux والطرفية (System Administration)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              نظام التشغيل الذي يدير 90% من خوادم العالم والإنترنت: تعلم السيطرة على سطر الأوامر، الصلاحيات، وتأمين السيرفرات.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl shrink-0">
            <div className="text-center px-3">
              <span className="text-xl font-black font-mono text-emerald-600">40</span>
              <span className="text-[11px] text-slate-500 font-bold block">ساعة تدريب</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-3">
              <span className="text-xl font-black font-mono text-teal-600">100%</span>
              <span className="text-[11px] text-slate-500 font-bold block">تطبيق عملي</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {linuxTopics.map((topic, i) => {
          const Icon = topic.icon;
          return (
            <div
              key={i}
              className="bg-white border border-slate-200/90 hover:border-emerald-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-right flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {topic.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{topic.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{topic.desc}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>أوامر عملية مباشرة</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Mini-Lab: Live Terminal Simulator */}
      <div className="bg-white border-2 border-emerald-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                مختبر تفاعلي: موجه أوامر طرفية Linux الحية (Interactive Bash CLI)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                جربي كتابة أوامر حقيقية مثل ls أو whoami أو cat advice.txt وشاهدي الاستجابة فورياً
              </p>
            </div>
          </div>

          {/* Quick command pills for quick testing */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['whoami', 'pwd', 'ls -la', 'cat advice.txt', 'help', 'clear'].map(cmd => (
              <button
                key={cmd}
                onClick={() => handleRunCommand(cmd)}
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden font-mono text-xs text-left" dir="ltr">
          {/* Terminal Window Header Bar */}
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <span className="text-[11px] text-slate-400 font-bold">rawaa@linux-workstation:~</span>
            <button
              onClick={() => handleRunCommand('clear')}
              title="مسح الشاشة"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Terminal Output Body */}
          <div className="p-4 space-y-3 min-h-[160px] max-h-[260px] overflow-y-auto text-slate-200">
            <div className="text-slate-500 text-[11px]">
              Welcome to RAWAA Linux Interactive Shell (Ubuntu 24.04 LTS). Type &apos;help&apos; for commands.
            </div>

            {history.map((h, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="text-teal-400">rawaa@academy:~$</span>
                  <span className="text-white font-bold">{h.cmd}</span>
                </div>
                <pre className="text-slate-300 text-[11px] whitespace-pre-wrap pl-4 font-mono leading-relaxed border-l-2 border-emerald-500/30">
                  {h.output}
                </pre>
              </div>
            ))}

            {/* Live Command Line Input */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleRunCommand();
              }}
              className="flex items-center gap-2 pt-1"
            >
              <span className="text-teal-400 font-bold shrink-0">rawaa@academy:~$</span>
              <input
                type="text"
                value={commandInput}
                onChange={e => setCommandInput(e.target.value)}
                placeholder="type a command (e.g. ls, whoami, help)..."
                className="flex-1 bg-transparent text-emerald-300 outline-none text-xs font-mono placeholder:text-slate-600"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-[11px] font-bold cursor-pointer"
              >
                Enter ↵
              </button>
            </form>
          </div>
        </div>

        {/* Hello Kitty Note & CTA */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-pink-700 bg-pink-50 border border-pink-200 px-3.5 py-1.5 rounded-full font-bold">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>نصيحة هيلو كيتي: يا رواء، كل أمر تكتبينه بإيدج على Linux يثبت المعلومة بذاكرتج للأبد! 🐧🌸</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/tracks/linux"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>استعراض مسار Linux الكامل</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
