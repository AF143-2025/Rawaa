'use client';

import React, { useState } from 'react';
import { Shield, Flag, FileSearch, AlertTriangle, CheckCircle, HelpCircle, Eye, EyeOff, Terminal, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataStore } from '@/lib/store';
import { Challenge } from '@/types';

export default function CyberLab() {
  const [activeTab, setActiveTab] = useState<'ctf' | 'log-analysis' | 'sqli-sandbox'>('ctf');
  const challenges = dataStore.getChallenges();
  const solvedIds = dataStore.getSolvedChallengeIds();

  // Selected CTF Challenge for modal / submission
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges[0]);
  const [inputFlag, setInputFlag] = useState('');
  const [flagFeedback, setFlagFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  // Log Analysis State
  const [logFilter, setLogFilter] = useState('');
  const RAW_AUTH_LOGS = [
    'Oct 19 03:14:01 rawaa CRON[8104]: pam_unix(cron:session): session opened for user root by (uid=0)',
    'Oct 19 03:14:01 rawaa CRON[8104]: pam_unix(cron:session): session closed for user root',
    'Oct 19 03:22:10 rawaa sshd[9120]: Failed password for root from 198.51.100.42 port 42100 ssh2',
    'Oct 19 03:22:12 rawaa sshd[9122]: Failed password for root from 198.51.100.42 port 42102 ssh2',
    'Oct 19 03:22:15 rawaa sshd[9125]: Failed password for admin from 198.51.100.42 port 42104 ssh2',
    'Oct 19 03:22:18 rawaa sshd[9128]: Failed password for student from 198.51.100.42 port 42106 ssh2',
    'Oct 19 03:22:20 rawaa sshd[9130]: Failed password for test from 198.51.100.42 port 42108 ssh2',
    'Oct 19 03:22:23 rawaa sshd[9133]: Failed password for oracle from 198.51.100.42 port 42110 ssh2',
    'Oct 19 03:22:25 rawaa sshd[9135]: Failed password for root from 198.51.100.42 port 42112 ssh2',
    'Oct 19 03:22:28 rawaa sshd[9138]: Failed password for root from 198.51.100.42 port 42114 ssh2',
    'Oct 19 03:22:30 rawaa sshd[9140]: Failed password for root from 198.51.100.42 port 42116 ssh2',
    'Oct 19 03:22:33 rawaa sshd[9142]: Failed password for root from 198.51.100.42 port 42118 ssh2',
    'Oct 19 03:22:35 rawaa sshd[9144]: Failed password for root from 198.51.100.42 port 42120 ssh2 [*** BRUTE FORCE PATTERN DETECTED ***]',
    'Oct 19 03:30:45 rawaa sshd[9200]: Accepted publickey for student from 10.0.0.15 port 55100 ssh2'
  ];

  // SQL Injection Sandbox State
  const [sqlUsername, setSqlUsername] = useState("' OR '1'='1");
  const [sqlPassword, setSqlPassword] = useState('password123');
  const [sqlExecutionResult, setSqlExecutionResult] = useState<{ query: string; isBypassed: boolean } | null>(null);

  const simulateSqlLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const constructedQuery = `SELECT * FROM users WHERE username = '${sqlUsername}' AND password = '${sqlPassword}';`;
    const isBypassed = sqlUsername.includes("' OR '1'='1") || sqlUsername.includes("' or '1'='1") || sqlUsername.includes("' OR 1=1 --");

    setSqlExecutionResult({
      query: constructedQuery,
      isBypassed
    });
  };

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputFlag.trim()) return;
    const res = dataStore.submitChallengeFlag(selectedChallenge.id, inputFlag);
    setFlagFeedback(res);
    if (res.isCorrect) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
    }
  };

  const toggleHint = (challengeId: string) => {
    setRevealedHints(prev => ({
      ...prev,
      [challengeId]: !prev[challengeId]
    }));
  };

  const filteredLogs = RAW_AUTH_LOGS.filter(l => 
    !logFilter || l.toLowerCase().includes(logFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#0F172A] border border-white/10 rounded-xl">
        <button
          onClick={() => setActiveTab('ctf')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'ctf'
              ? 'bg-purple-600 text-white shadow-glowPurple'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Flag className="w-4 h-4 text-purple-300" />
          تحديات صيد الأعلام (CTF)
        </button>
        <button
          onClick={() => setActiveTab('log-analysis')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'log-analysis'
              ? 'bg-purple-600 text-white shadow-glowPurple'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileSearch className="w-4 h-4 text-purple-300" />
          مختبر تحليل السجلات الأمنية (Log Analysis)
        </button>
        <button
          onClick={() => setActiveTab('sqli-sandbox')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'sqli-sandbox'
              ? 'bg-purple-600 text-white shadow-glowPurple'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-purple-300" />
          محاكي ثغرات الويب و OWASP Top 10
        </button>
      </div>

      {/* TAB 1: CTF CHALLENGES */}
      {activeTab === 'ctf' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Challenge Selector (1 col) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-300 px-1">قائمة التحديات المتاحة</h3>
            {challenges.map(c => {
              const isSelected = selectedChallenge.id === c.id;
              const isSolved = solvedIds.includes(c.id);

              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedChallenge(c);
                    setFlagFeedback(null);
                    setInputFlag('');
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500 shadow-glowPurple text-white'
                      : 'bg-[#0E1524] border-white/10 hover:border-white/20 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-purple-300">
                      {c.category.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400">+{c.points} ن</span>
                      {isSolved && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" />
                          محلول
                        </span>
                      )}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white">{c.title}</h4>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
                    <span>مستوى الصعوبة:</span>
                    <span className="text-amber-400 font-semibold">{c.difficulty}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Challenge Workbench (2 cols) */}
          <div className="lg:col-span-2 bg-[#0E1524] border border-purple-500/20 rounded-2xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-purple-400 mb-1 block">التحدي النشط:</span>
                <h3 className="text-lg font-bold text-white">{selectedChallenge.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono">
                  {selectedChallenge.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold">
                  {selectedChallenge.points} نقطة
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-400">وصف التحدي:</h4>
              <p className="text-sm text-gray-200 leading-relaxed bg-[#070B12] p-4 rounded-xl border border-white/5">
                {selectedChallenge.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-400">خطوات الحل:</h4>
              <pre className="text-xs text-gray-300 font-mono bg-[#070B12] p-4 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed">
                {selectedChallenge.instructions}
              </pre>
            </div>

            {/* Hints Accordion */}
            {selectedChallenge.hints.length > 0 && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => toggleHint(selectedChallenge.id)}
                  className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors font-semibold"
                >
                  <HelpCircle className="w-4 h-4" />
                  {revealedHints[selectedChallenge.id] ? 'إخفاء التلميحات' : 'إظهار التلميحات'}
                </button>
                {revealedHints[selectedChallenge.id] && (
                  <ul className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs text-amber-200 space-y-1.5 list-disc list-inside">
                    {selectedChallenge.hints.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Flag Submission Form */}
            <form onSubmit={handleFlagSubmit} className="space-y-3 pt-4 border-t border-white/10">
              <label className="text-xs text-gray-400 font-medium">تسليم العلم (Flag):</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputFlag}
                  onChange={e => setInputFlag(e.target.value)}
                  placeholder="RAWAA{...}"
                  className="flex-1 bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:border-purple-500 outline-none"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-glowPurple transition-all"
                >
                  إرسال
                </button>
              </div>

              {flagFeedback && (
                <div
                  className={`p-3.5 rounded-xl text-xs border ${
                    flagFeedback.isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {flagFeedback.message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: LOG ANALYSIS LAB */}
      {activeTab === 'log-analysis' && (
        <div className="bg-[#0E1524] border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-purple-400" />
                مختبر التحقيق الجنائي الرقمي وفحص السجلات
              </h3>
              <p className="text-xs text-gray-400">سجل المصادقة المباشر: /var/log/auth.log</p>
            </div>

            <input
              type="text"
              value={logFilter}
              onChange={e => setLogFilter(e.target.value)}
              placeholder="فلترة السجلات (مثال: Failed, root, sshd)..."
              className="bg-[#070B12] border border-white/10 rounded-xl px-4 py-2 text-xs text-white font-mono placeholder:text-gray-600 w-full sm:w-72 outline-none focus:border-purple-500"
              dir="ltr"
            />
          </div>

          <div className="bg-[#070B12] rounded-xl p-4 border border-white/5 font-mono text-xs overflow-x-auto space-y-1.5 max-h-[400px] overflow-y-auto" dir="ltr">
            {filteredLogs.map((log, i) => {
              const isAlert = log.includes('Failed') || log.includes('BRUTE FORCE');
              const isSuccess = log.includes('Accepted');

              return (
                <div
                  key={i}
                  className={`py-0.5 px-2 rounded ${
                    isAlert
                      ? 'bg-rose-950/40 text-rose-300 font-bold border-l-2 border-rose-500'
                      : isSuccess
                      ? 'bg-emerald-950/30 text-emerald-300 border-l-2 border-emerald-500'
                      : 'text-gray-400'
                  }`}
                >
                  {log}
                </div>
              );
            })}
          </div>

          {/* Investigation Insight Box */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 space-y-2">
            <h4 className="font-bold text-purple-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              الملاحظة الأمنية للتحقيق:
            </h4>
            <p className="leading-relaxed">
              لاحظ تكرار محاولات الدخول الخاطئة للمستخدم root من العنوان <code className="bg-black/50 px-1 py-0.5 rounded text-white font-mono">198.51.100.42</code> في غضون ثوانٍ قليلة عبر منافذ متسلسلة. هذا النمط هو هجوم قوة غاشمة نموذجي (SSH Brute-force Attack).
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: SQL INJECTION SANDBOX */}
      {activeTab === 'sqli-sandbox' && (
        <div className="bg-[#0E1524] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              مختبر توضيحي: ثغرة حقن قواعد البيانات (SQL Injection Demo)
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              بيئة تجريبية معزولة توضح كيف تؤدي المدخلات غير المصفاة إلى خداع منطق استعلام SQL وتجاوز المصادقة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vulnerable Login Form */}
            <form onSubmit={simulateSqlLogin} className="space-y-4 bg-[#070B12] p-5 rounded-xl border border-white/5">
              <span className="text-xs text-gray-400 font-semibold block">نموذج الدخول غير المحمي (Vulnerable Form):</span>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">اسم المستخدم:</label>
                <input
                  type="text"
                  value={sqlUsername}
                  onChange={e => setSqlUsername(e.target.value)}
                  className="w-full bg-[#0E1524] border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs focus:border-amber-400 outline-none"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">كلمة المرور:</label>
                <input
                  type="text"
                  value={sqlPassword}
                  onChange={e => setSqlPassword(e.target.value)}
                  className="w-full bg-[#0E1524] border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs focus:border-amber-400 outline-none"
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors"
              >
                اختبار تسجيل الدخول
              </button>
            </form>

            {/* Server Query Interpretation */}
            <div className="space-y-4 bg-[#070B12] p-5 rounded-xl border border-white/5 font-mono text-xs">
              <span className="text-gray-400 block font-sans font-semibold">استعلام SQL الناتج في الخادم:</span>
              <pre className="p-3 bg-black/60 rounded-lg border border-white/10 text-cyan-300 whitespace-pre-wrap" dir="ltr">
                {sqlExecutionResult
                  ? sqlExecutionResult.query
                  : "SELECT * FROM users WHERE username = '...' AND password = '...';"}
              </pre>

              {sqlExecutionResult && (
                <div
                  className={`p-3.5 rounded-lg text-xs leading-relaxed ${
                    sqlExecutionResult.isBypassed
                      ? 'bg-rose-950/40 border border-rose-500 text-rose-200'
                      : 'bg-emerald-950/30 border border-emerald-500 text-emerald-300'
                  }`}
                >
                  {sqlExecutionResult.isBypassed ? (
                    <div>
                      <strong className="block text-rose-400 mb-1">🚨 تم تجاوز الحماية بنجاح (Authentication Bypassed)!</strong>
                      تعبير الشرط <code className="bg-black/50 px-1 text-white">&#39;1&#39;=&#39;1&#39;</code> يجعل الاستعلام صحيحاً دائماً (TRUE) لجميع الصفوف، مما يمنح المهاجم دخولاً كمدير للنظام دون معرفة كلمة المرور!
                    </div>
                  ) : (
                    <div>
                      <strong className="block text-emerald-400 mb-1">✅ تم رفض الدخول بشكل طبيعي</strong>
                      المدخلات لم تكسر منطق استعلام SQL.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
