'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LinuxTerminalLab from '@/components/labs/LinuxTerminalLab';
import NetworkSimulatorLab from '@/components/labs/NetworkSimulatorLab';
import CyberLab from '@/components/labs/CyberLab';
import { Terminal, Network, Shield, Sparkles } from 'lucide-react';

function LabsContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'linux';
  const [activeLab, setActiveLab] = useState<'linux' | 'network' | 'cyber'>(
    initialTab === 'network' ? 'network' : initialTab === 'cyber' || initialTab === 'ctf' ? 'cyber' : 'linux'
  );

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'network') setActiveLab('network');
    else if (tab === 'cyber' || tab === 'ctf') setActiveLab('cyber');
    else if (tab === 'linux') setActiveLab('linux');
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-800 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>ISOLATED HANDS-ON SANDBOXES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">منصة المختبرات التفاعلية</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          بيئات تدريب معزولة وآمنة 100% تتيح لك تطبيق أوامر Linux، حساب الشبكات، وتحليل الهجمات السيبرانية وصيد الأعلام مباشرة من المتصفح.
        </p>
      </div>

      {/* Main Lab Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl max-w-2xl mx-auto shadow-sm">
        <button
          onClick={() => setActiveLab('linux')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeLab === 'linux'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Terminal className="w-4 h-4 text-sky-600" />
          طرفية Linux التفاعلية
        </button>

        <button
          onClick={() => setActiveLab('network')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeLab === 'network'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Network className="w-4 h-4 text-emerald-600" />
          محاكي وحاسبة الشبكات
        </button>

        <button
          onClick={() => setActiveLab('cyber')}
          className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeLab === 'cyber'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Shield className="w-4 h-4 text-indigo-600" />
          الأمن السيبراني وتحديات CTF
        </button>
      </div>

      {/* Active Lab Component */}
      <div className="pt-2">
        {activeLab === 'linux' && <LinuxTerminalLab />}
        {activeLab === 'network' && <NetworkSimulatorLab />}
        {activeLab === 'cyber' && <CyberLab />}
      </div>
    </div>
  );
}

export default function LabsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sky-600 font-mono text-sm">جارِ تهيئة المختبرات التفاعلية...</div>}>
      <LabsContent />
    </Suspense>
  );
}
