'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CheckCircle2, RotateCcw, HelpCircle, Shield, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataStore } from '@/lib/store';

interface VFile {
  type: 'file' | 'dir';
  name: string;
  content?: string;
  permissions?: string;
  children?: Record<string, VFile>;
}

interface Mission {
  id: number;
  title: string;
  description: string;
  instruction: string;
  targetCommandCheck: (cmd: string, currentPath: string[], fs: Record<string, VFile>) => boolean;
  rewardPoints: number;
  completed: boolean;
}

const INITIAL_FS: Record<string, VFile> = {
  home: {
    type: 'dir',
    name: 'home',
    children: {
      student: {
        type: 'dir',
        name: 'student',
        children: {
          'welcome.txt': {
            type: 'file',
            name: 'welcome.txt',
            permissions: '-rw-r--r--',
            content: 'أهلاً بك في مختبر لينكس التفاعلي الخاص بأكاديمية رواء!\nهنا تتدرب على أوامر الطرفية بأمان واحترافية.'
          },
          '.secret_vault': {
            type: 'dir',
            name: '.secret_vault',
            children: {
              'flag.txt': {
                type: 'file',
                name: 'flag.txt',
                permissions: '-r--------',
                content: 'العلم السري: RAWAA{linux_cli_master_2026}'
              }
            }
          },
          'documents': {
            type: 'dir',
            name: 'documents',
            children: {
              'network_notes.txt': {
                type: 'file',
                name: 'network_notes.txt',
                permissions: '-rw-r--r--',
                content: 'ملاحظات الشبكات: نموذج OSI يتكون من 7 طبقات. منفذ SSH هو 22.'
              }
            }
          }
        }
      }
    }
  },
  var: {
    type: 'dir',
    name: 'var',
    children: {
      log: {
        type: 'dir',
        name: 'log',
        children: {
          'auth.log': {
            type: 'file',
            name: 'auth.log',
            permissions: '-rw-r-----',
            content: 'Oct 19 12:01:05 rawaa sshd[1420]: Failed password for root from 198.51.100.42 port 54120\nOct 19 12:01:08 rawaa sshd[1422]: Failed password for root from 198.51.100.42 port 54122\nOct 19 12:05:00 rawaa sshd[1500]: Accepted publickey for student from 10.0.0.5'
          }
        }
      }
    }
  }
};

export default function LinuxTerminalLab() {
  const [fs, setFs] = useState<Record<string, VFile>>(INITIAL_FS);
  const [currentPath, setCurrentPath] = useState<string[]>(['home', 'student']);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'error' | 'success'; text: string }>>([
    { type: 'output', text: 'RAWAA Academy Virtual Linux Terminal [Kernel 6.8.0-rawaa-x86_64]' },
    { type: 'output', text: 'مرحباً بك في نظام التدريب الآمن. اكتب "help" لعرض الأوامر المتاحة.' },
    { type: 'output', text: '-------------------------------------------------------------' }
  ]);
  const [cmdHistoryList, setCmdHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Missions
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: 'المهمة 1: فحص المسار واستعراض الملفات',
      description: 'تعرف على المجلد الحالي واستعرض الملفات الموجودة.',
      instruction: 'اكتب الأمر pwd أو ls لمعرفة مكانك واستعراض المحتويات.',
      targetCommandCheck: (cmd) => {
        const c = cmd.trim();
        return c === 'pwd' || c.startsWith('ls');
      },
      rewardPoints: 20,
      completed: false
    },
    {
      id: 2,
      title: 'المهمة 2: قراءة ملف الترحيب',
      description: 'استخدم أمر القراءة cat لعرض محتويات ملف welcome.txt.',
      instruction: 'اكتب cat welcome.txt واقرأ الرسالة.',
      targetCommandCheck: (cmd) => cmd.trim() === 'cat welcome.txt',
      rewardPoints: 25,
      completed: false
    },
    {
      id: 3,
      title: 'المهمة 3: إنشاء مجلد ومشاريع جديدة',
      description: 'أنشئ مجلداً جديداً باسم labs لحفظ تجاربك.',
      instruction: 'اكتب الأمر mkdir labs ثم تحقق من إنشائه عبر ls.',
      targetCommandCheck: (cmd, path, currentFs) => {
        return cmd.trim() === 'mkdir labs' || (currentFs.home?.children?.student?.children?.labs !== undefined);
      },
      rewardPoints: 30,
      completed: false
    },
    {
      id: 4,
      title: 'المهمة 4: العثور على الملف المخفي واستخراج العلم',
      description: 'ابحث عن المجلدات المخفية واستخرج علم التحدي!',
      instruction: 'استخدم ls -la ثم ادخل للمجلد .secret_vault واقرأ flag.txt.',
      targetCommandCheck: (cmd) => cmd.includes('flag.txt') && cmd.startsWith('cat'),
      rewardPoints: 50,
      completed: false
    }
  ]);

  const [activeMissionIdx, setActiveMissionIdx] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const getCurrentDir = (targetFs: Record<string, VFile>, path: string[]): VFile | null => {
    let curr: any = { children: targetFs };
    for (const seg of path) {
      if (curr.children && curr.children[seg]) {
        curr = curr.children[seg];
      } else {
        return null;
      }
    }
    return curr;
  };

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    setCmdHistoryList(prev => [...prev, raw]);
    setHistoryIndex(-1);

    const promptText = `student@rawaa:~${currentPath.length > 2 ? '/' + currentPath.slice(2).join('/') : ''}$ ${raw}`;
    const newLogs: Array<{ type: 'input' | 'output' | 'error' | 'success'; text: string }> = [
      { type: 'input', text: promptText }
    ];

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const dir = getCurrentDir(fs, currentPath);

    switch (cmd) {
      case 'clear':
        setHistory([]);
        return;

      case 'pwd':
        newLogs.push({ type: 'output', text: '/' + currentPath.join('/') });
        break;

      case 'whoami':
        newLogs.push({ type: 'output', text: 'student (مستخدم التدريب المعملي)' });
        break;

      case 'uname':
        newLogs.push({ type: 'output', text: 'Linux rawaa-sec 6.8.0-31-generic #31-Ubuntu SMP x86_64 GNU/Linux' });
        break;

      case 'date':
        newLogs.push({ type: 'output', text: new Date().toUTCString() });
        break;

      case 'help':
        newLogs.push({
          type: 'output',
          text: `الأوامر المتاحة في مختبر رواء:
  pwd          - عرض المسار الحالي
  ls [-la]     - استعراض الملفات والمجلدات (بما فيها المخفية)
  cd <dir>     - الانتقال لمجلد آخر (أو cd .. للرجوع)
  cat <file>   - قراءة وعرض محتوى الملف
  mkdir <dir>  - إنشاء مجلد جديد
  touch <file> - إنشاء ملف فارغ
  echo "text"  - طباعة نص أو توجيهه لملف
  whoami       - عرض اسم المستخدم الحالي
  clear        - مسح شاشة الطرفية
  history      - عرض سجل الأوامر السابقة`
        });
        break;

      case 'history':
        newLogs.push({
          type: 'output',
          text: cmdHistoryList.map((c, i) => `  ${i + 1}  ${c}`).join('\n') || 'لا يوجد أوامر سابقة.'
        });
        break;

      case 'ls': {
        if (!dir || !dir.children) {
          newLogs.push({ type: 'output', text: '' });
          break;
        }
        const showAll = args.includes('-la') || args.includes('-a') || args.includes('-al');
        const showDetails = args.includes('-la') || args.includes('-l') || args.includes('-al');

        const entries = Object.keys(dir.children).filter(name => showAll || !name.startsWith('.'));
        if (entries.length === 0) {
          newLogs.push({ type: 'output', text: '(المجلد فارغ)' });
        } else if (showDetails) {
          const lines = entries.map(name => {
            const item = dir.children![name];
            const isDir = item.type === 'dir';
            const perm = item.permissions || (isDir ? 'drwxr-xr-x' : '-rw-r--r--');
            return `${perm}  student  student  4096  ${name}${isDir ? '/' : ''}`;
          });
          newLogs.push({ type: 'output', text: lines.join('\n') });
        } else {
          newLogs.push({ type: 'output', text: entries.join('    ') });
        }
        break;
      }

      case 'cd': {
        const target = args[0];
        if (!target || target === '~') {
          setCurrentPath(['home', 'student']);
        } else if (target === '..') {
          if (currentPath.length > 0) {
            setCurrentPath(prev => prev.slice(0, -1));
          }
        } else if (target === '/') {
          setCurrentPath([]);
        } else {
          // relative cd
          if (dir && dir.children && dir.children[target]) {
            if (dir.children[target].type === 'dir') {
              setCurrentPath(prev => [...prev, target]);
            } else {
              newLogs.push({ type: 'error', text: `bash: cd: ${target}: Not a directory` });
            }
          } else {
            newLogs.push({ type: 'error', text: `bash: cd: ${target}: No such file or directory` });
          }
        }
        break;
      }

      case 'cat': {
        const target = args[0];
        if (!target) {
          newLogs.push({ type: 'error', text: 'Usage: cat <filename>' });
        } else if (dir && dir.children && dir.children[target]) {
          if (dir.children[target].type === 'file') {
            newLogs.push({ type: 'output', text: dir.children[target].content || '' });
          } else {
            newLogs.push({ type: 'error', text: `cat: ${target}: Is a directory` });
          }
        } else {
          newLogs.push({ type: 'error', text: `cat: ${target}: No such file or directory` });
        }
        break;
      }

      case 'mkdir': {
        const target = args[0];
        if (!target) {
          newLogs.push({ type: 'error', text: 'Usage: mkdir <dirname>' });
        } else {
          setFs(prev => {
            const nextFs = JSON.parse(JSON.stringify(prev));
            const currentObj = getCurrentDir(nextFs, currentPath);
            if (currentObj && currentObj.children) {
              currentObj.children[target] = {
                type: 'dir',
                name: target,
                children: {}
              };
            }
            return nextFs;
          });
          newLogs.push({ type: 'success', text: `تم إنشاء المجلد: ${target}` });
        }
        break;
      }

      case 'touch': {
        const target = args[0];
        if (!target) {
          newLogs.push({ type: 'error', text: 'Usage: touch <filename>' });
        } else {
          setFs(prev => {
            const nextFs = JSON.parse(JSON.stringify(prev));
            const currentObj = getCurrentDir(nextFs, currentPath);
            if (currentObj && currentObj.children) {
              currentObj.children[target] = {
                type: 'file',
                name: target,
                permissions: '-rw-r--r--',
                content: ''
              };
            }
            return nextFs;
          });
          newLogs.push({ type: 'success', text: `تم إنشاء الملف: ${target}` });
        }
        break;
      }

      case 'echo': {
        const text = args.join(' ').replace(/^["']|["']$/g, '');
        newLogs.push({ type: 'output', text });
        break;
      }

      default:
        newLogs.push({
          type: 'error',
          text: `bash: ${cmd}: command not found. اكتب "help" للاطلاع على قائمة الأوامر المدعومة.`
        });
        break;
    }

    // Check current active mission
    const activeMission = missions[activeMissionIdx];
    if (activeMission && !activeMission.completed) {
      if (activeMission.targetCommandCheck(raw, currentPath, fs)) {
        activeMission.completed = true;
        newLogs.push({
          type: 'success',
          text: `🎉 رائع! أكملت "${activeMission.title}" وحصلت على ${activeMission.rewardPoints} نقطة!`
        });
        dataStore.addPoints(activeMission.rewardPoints);
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
        if (activeMissionIdx < missions.length - 1) {
          setActiveMissionIdx(prev => prev + 1);
        }
      }
    }

    setHistory(prev => [...prev, ...newLogs]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistoryList.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < cmdHistoryList.length) {
          setHistoryIndex(nextIdx);
          setInputVal(cmdHistoryList[cmdHistoryList.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistoryList[cmdHistoryList.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const resetTerminal = () => {
    setFs(INITIAL_FS);
    setCurrentPath(['home', 'student']);
    setHistory([
      { type: 'output', text: 'تمت إعادة تعيين المختبر بنجاح.' },
      { type: 'output', text: 'RAWAA Virtual Linux Terminal جاهزة للعمل.' }
    ]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Terminal Main Window (2 cols) */}
      <div className="lg:col-span-2 bg-[#090D16] border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px] font-mono-code text-sm">
        {/* Top Bar */}
        <div className="bg-[#0F172A] px-4 py-3 border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="text-xs text-gray-400 font-sans ml-3 flex items-center gap-1.5">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              طرفية رواء التفاعلية | student@rawaa
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => executeCommand('clear')}
              className="text-xs px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 font-sans transition-colors"
              title="مسح الشاشة"
            >
              مسح
            </button>
            <button
              onClick={resetTerminal}
              className="text-xs px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 font-sans transition-colors flex items-center gap-1"
              title="إعادة تعيين المختبر"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              إعادة ضبط
            </button>
          </div>
        </div>

        {/* Console Body */}
        <div 
          className="flex-1 p-4 overflow-y-auto space-y-1.5 scanlines"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((log, i) => (
            <div key={i} className="leading-relaxed">
              {log.type === 'input' && (
                <div className="text-cyan-400 font-semibold">{log.text}</div>
              )}
              {log.type === 'output' && (
                <pre className="text-gray-300 font-mono whitespace-pre-wrap">{log.text}</pre>
              )}
              {log.type === 'error' && (
                <div className="text-rose-400 font-mono">{log.text}</div>
              )}
              {log.type === 'success' && (
                <div className="text-emerald-400 font-bold bg-emerald-950/30 p-2 rounded border border-emerald-500/30 my-1">{log.text}</div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
            <span className="text-cyan-400 font-semibold select-none whitespace-nowrap">
              student@rawaa:~{currentPath.length > 2 ? '/' + currentPath.slice(2).join('/') : ''}$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-cyan-400 text-sm focus:ring-0 p-0"
              spellCheck="false"
              autoComplete="off"
            />
          </form>
          <div ref={terminalEndRef} />
        </div>

        {/* Quick Command Helper Chips */}
        <div className="bg-[#0c1220] px-4 py-2 border-t border-white/5 flex items-center gap-2 overflow-x-auto text-xs text-gray-400 font-sans">
          <span className="text-gray-500 select-none">أوامر سريعة:</span>
          {['pwd', 'ls -la', 'cat welcome.txt', 'mkdir labs', 'clear', 'help'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInputVal(cmd);
                inputRef.current?.focus();
              }}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors font-mono text-[11px]"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Side Missions Panel (1 col) */}
      <div className="bg-[#0E1524] border border-white/10 rounded-2xl p-5 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">مهام المختبر العملي</h3>
              <p className="text-xs text-gray-400">تدرج في الصعوبة واكسب نقاط الإتقان</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {missions.filter(m => m.completed).length} / {missions.length} مكتمل
          </span>
        </div>

        {/* Mission List */}
        <div className="space-y-3">
          {missions.map((m, idx) => {
            const isActive = idx === activeMissionIdx;
            return (
              <div
                key={m.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  m.completed
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    : isActive
                    ? 'bg-cyan-950/30 border-cyan-500/50 shadow-glow text-white'
                    : 'bg-white/[0.02] border-white/5 text-gray-400 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {m.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                        isActive ? 'border-cyan-400 text-cyan-300 font-bold' : 'border-gray-600'
                      }`}>
                        {idx + 1}
                      </span>
                    )}
                    <h4 className="font-semibold text-xs text-white">{m.title}</h4>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">+{m.rewardPoints} ن</span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed pr-6">{m.description}</p>
                
                {isActive && !m.completed && (
                  <div className="mt-2.5 pt-2 border-t border-cyan-500/20 pr-6 flex items-center gap-2 text-xs text-cyan-300">
                    <ArrowRight className="w-3.5 h-3.5 rotate-180 text-cyan-400 shrink-0" />
                    <span><strong>التعليمات:</strong> {m.instruction}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-gray-300 leading-relaxed space-y-2">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <Shield className="w-4 h-4" />
            بيئة محاكاة معزولة 100%
          </div>
          <p className="text-[11px] text-gray-400">
            تعمل هذه الطرفية داخل متصفحك مباشرة بنظام ملفات افتراضي كامل، دون أي اتصال مباشر بنواة السيرفر حفاظاً على معايير الأمان والخصوصية.
          </p>
        </div>
      </div>
    </div>
  );
}
