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
  RotateCcw,
  BookOpen,
  Lock,
  Key,
  Server,
  Activity,
  Layers,
  FileCode,
  HardDrive,
  AlertTriangle
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

  // Permission Visualizer State (chmod calculator)
  const [perms, setPerms] = useState({
    owner: { r: true, w: true, x: true },   // 7
    group: { r: true, w: false, x: true },  // 5
    others: { r: true, w: false, x: true }  // 5
  });

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
      out = 'الأوامر المتاحة: whoami, pwd, ls, ls -la, cat advice.txt, systemctl status nginx, uname -a, clear';
    } else if (clean === 'whoami') {
      out = 'rawaa_cyber_engineer 🛡️ (UID=1000, GID=1000 groups=sudo,cyber)';
    } else if (clean === 'pwd') {
      out = '/home/rawaa/cyber-academy';
    } else if (clean === 'ls' || clean === 'ls -la') {
      out = `drwxr-xr-x 2 rawaa users 4096 Oct 20 23:00 .
drwxr-xr-x 3 rawaa users 4096 Oct 20 22:00 ..
-rw-r--r-- 1 rawaa users  142 Oct 20 22:15 advice.txt
-rwxr-xr-x 1 rawaa users  520 Oct 20 22:20 firewall.sh
-rw-r--r-- 1 rawaa users  230 Oct 20 22:25 network.conf
-rw------- 1 rawaa users 1823 Oct 20 22:30 id_ed25519 (SSH Key 🔑)`;
    } else if (clean.startsWith('cat advice')) {
      out = '« يا رواء، الشاشة السوداء هي أوفى صديقة؛ كل أمر تكتبينه يبني عقلية مهندسة حقيقية! 🌸 »';
    } else if (clean.includes('systemctl')) {
      out = `● nginx.service - The NGINX HTTP and reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled)
     Active: active (running) since Tue 2026-10-20 22:00:15 UTC; 1h ago
   Main PID: 1420 (nginx)
      Tasks: 3 (limit: 4642)
     Memory: 8.2M`;
    } else if (clean === 'uname -a') {
      out = 'Linux rawaa-workstation 6.5.0-generic #42-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux';
    } else {
      out = `bash: ${rawCmd}: command not found (اكتبي help لعرض الأوامر التجريبية المتاحة)`;
    }

    setHistory(prev => [...prev, { cmd: rawCmd, output: out }]);
    setCommandInput('');
  };

  // Compute chmod numeric code and string representation
  const calcPermissionCode = () => {
    const oVal = (perms.owner.r ? 4 : 0) + (perms.owner.w ? 2 : 0) + (perms.owner.x ? 1 : 0);
    const gVal = (perms.group.r ? 4 : 0) + (perms.group.w ? 2 : 0) + (perms.group.x ? 1 : 0);
    const otVal = (perms.others.r ? 4 : 0) + (perms.others.w ? 2 : 0) + (perms.others.x ? 1 : 0);

    const str = `-${perms.owner.r ? 'r' : '-'}${perms.owner.w ? 'w' : '-'}${perms.owner.x ? 'x' : '-'}${perms.group.r ? 'r' : '-'}${perms.group.w ? 'w' : '-'}${perms.group.x ? 'x' : '-'}${perms.others.r ? 'r' : '-'}${perms.others.w ? 'w' : '-'}${perms.others.x ? 'x' : '-'}`;

    const numCode = `${oVal}${gVal}${otVal}`;
    const isDangerous = numCode === '777' || otVal >= 6;

    return { numCode, str, isDangerous };
  };

  const permDetails = calcPermissionCode();

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-14 text-right">
      
      {/* =========================================================================
          1. HEADER BANNER: HELLO KITTY WELCOMES RAWAA TO LINUX
          ========================================================================= */}
      <div className="bg-white border-2 border-emerald-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-emerald-500/5 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Right Column: Hero Information */}
          <div className="space-y-4 max-w-2xl text-right">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>دليل إدارة أنظمة وسيرفرات Linux والطرفية الشامل 🐧🛡️</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              رحلة رواء في احتراف إدارة أنظمة وسيرفرات Linux
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              نظام التشغيل الذي يدير 90% من خوادم العالم والإنترنت: السيطرة على سطر الأوامر (Bash CLI)، فهم شجرة المجلدات، حساب الصلاحيات (chmod)، إدارة الخدمات (systemctl)، وتأمين الاتصال المشفر عبر SSH!
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs">
                6 محطات تعليمية منظمة
              </span>
              <span className="px-3 py-1 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-bold text-xs">
                برفقة شروحات هيلو كيتي 🎀
              </span>
              <span className="px-3 py-1 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 font-bold text-xs">
                طرفية حية وحاسبة Chmod
              </span>
            </div>

          </div>

          {/* Left Column: Hello Kitty Coder Character Box */}
          <div className="flex flex-col items-center justify-center text-center shrink-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-400/25 rounded-full blur-2xl group-hover:bg-emerald-400/40 transition-colors" />
              
              <div className="relative w-40 sm:w-48 h-40 sm:h-48 flex items-center justify-center p-2">
                <img
                  src="/brand/hello_kitty_coding.png"
                  alt="هيلو كيتي تبرمج على لينكس"
                  className="max-w-full max-h-full object-contain drop-shadow-[0_8px_20px_rgba(16,185,129,0.40)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="w-28 h-2 rounded-full bg-slate-900/15 blur-[2px] mx-auto -mt-2" />
            </div>

            {/* Speech bubble */}
            <div className="mt-3 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm max-w-[240px]">
              <span className="text-[11px] font-black text-emerald-800 block leading-snug">
                « يا رواء! الشاشة السوداء مو مخيفة أبداً؛ كل أمر تكتبينه يبني ثقتج كمهندسة خارقة! 🐧💻 »
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          2. THE STEP-BY-STEP ROADMAP (NAVIGATION BAR FOR THE 6 STATIONS)
          ========================================================================= */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 px-1">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>محطات دليل لينكس المنظم (انقري للانتقال لأي محطة):</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-400">LINUX ROADMAP</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'linux-station-1', label: '1. شجرة المجلدات', icon: '🐧' },
            { id: 'linux-station-2', label: '2. أوامر الطرفية', icon: '💻' },
            { id: 'linux-station-3', label: '3. نظام الصلاحيات', icon: '🔐' },
            { id: 'linux-station-4', label: '4. الخدمات والعمليات', icon: '⚙️' },
            { id: 'linux-station-5', label: '5. الشبكات والـ SSH', icon: '🌐' },
            { id: 'linux-station-6', label: '6. المختبرات التفاعلية', icon: '🧪' },
          ].map(st => (
            <button
              key={st.id}
              onClick={() => scrollToAnchor(st.id)}
              className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <span>{st.icon}</span>
              <span className="truncate">{st.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          3. STATION 1: FILESYSTEM HIERARCHY (المحطة الأولى: شجرة المجلدات)
          ========================================================================= */}
      <section id="linux-station-1" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              01
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الأولى: فلسفة لينكس وهيكل شجرة المجلدات القياسية (FHS)
              </h2>
              <span className="text-xs text-slate-500 font-medium">كل شيء في لينكس عبارة عن ملف: خريطة المجلدات التي تدير السيرفر</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            FILESYSTEM TREE
          </span>
        </div>

        {/* Content Grid */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5 text-right">
              <span className="text-xs font-mono font-black text-emerald-800">/ (Root Directory)</span>
              <h3 className="text-xs font-bold text-slate-900">أصل وجذر النظام</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                الجذر الأعلى الذي يتفرع منه كل مجلد وملف وقرص وجهاز في نظام لينكس.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-1.5 text-right">
              <span className="text-xs font-mono font-black text-sky-800">/home/rawaa</span>
              <h3 className="text-xs font-bold text-slate-900">مجلد المستخدم الشخصي</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                المساحة الخاصة برواء لتخزين ملفاتها ومشاريعها وسكربتاتها بصلاحياتها المستقلة.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5 text-right">
              <span className="text-xs font-mono font-black text-amber-800">/etc</span>
              <h3 className="text-xs font-bold text-slate-900">ملفات تكوين النظام</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                مقر إعدادات البرامج والسيرفرات (مثل إعدادات Nginx, SSH, وجدران الحماية).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-1.5 text-right">
              <span className="text-xs font-mono font-black text-rose-800">/var/log</span>
              <h3 className="text-xs font-bold text-slate-900">كنز المهندسة السيبرانية</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                هنا تُسجل كل محاولة دخول، أخطاء السيرفر، وسجلات الأمان لكشف أي متسلل.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-1.5 text-right">
              <span className="text-xs font-mono font-black text-indigo-800">/bin & /usr/bin</span>
              <h3 className="text-xs font-bold text-slate-900">أوامر وبرامج النظام</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                الملفات التنفيذية للأوامر اليومية مثل `ls` و `grep` و `python` و `bash`.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-1.5 text-right">
              <span className="text-xs font-mono font-black text-purple-800">/root</span>
              <h3 className="text-xs font-bold text-slate-900">مجلد المدير الخارق</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                المجلد الخاص بحساب root المحصن، ولا يستطيع أي مستخدم عادي فتحه.
              </p>
            </div>

          </div>

          {/* Hello Kitty Cute Commentary Note */}
          <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 flex items-start sm:items-center gap-3">
            <img
              src="/brand/hello_kitty_right.png"
              alt="هيلو كيتي"
              className="w-8 h-8 object-contain shrink-0 mt-0.5 sm:mt-0"
            />
            <div className="text-xs text-pink-900 font-bold leading-relaxed">
              <span className="text-pink-600 font-black block sm:inline sm:ml-1">💡 همسة هيلو كيتي الذكية:</span>
              « تذكري يا رواء: في Linux &apos;كل شيء عبارة عن ملف&apos;؛ حتى أجهزة الشبكة والقرص الصلب يتعامل معها النظام كملفات يمكن قراءتها وتعديلها بسهولة! 📂✨ »
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          4. STATION 2: ESSENTIAL CLI COMMANDS (المحطة الثانية: أوامر الطرفية)
          ========================================================================= */}
      <section id="linux-station-2" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              02
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الثانية: سطر الأوامر وأوامر الطرفية الأساسية (Essential CLI)
              </h2>
              <span className="text-xs text-slate-500 font-medium">الأوامر التي لا يستغني عنها أي مهندس أنظمة وأمن سيبراني</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            CLI TOOLBOX
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Commands Group 1 */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 text-right">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <FolderTree className="w-4 h-4 text-emerald-600" />
                <span>أوامر التنقل وإدارة الملفات</span>
              </span>
              <ul className="text-xs space-y-2 text-slate-700">
                <li className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                  <span className="font-mono font-bold text-emerald-600">pwd</span>
                  <span>معرفة المسار الحالي (Print Working Directory)</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                  <span className="font-mono font-bold text-emerald-600">ls -la</span>
                  <span>عرض جميع الملفات مع المخفية والصلاحيات وتاريخ التعديل</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                  <span className="font-mono font-bold text-emerald-600">cd /var/log</span>
                  <span>الانتقال وتغيير المجلد الحالي</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                  <span className="font-mono font-bold text-emerald-600">mkdir & touch</span>
                  <span>إنشاء مجلد جديد أو ملف نصي فارغ</span>
                </li>
              </ul>
            </div>

            {/* Commands Group 2 */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 text-right">
              <span className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-sky-600" />
                <span>أوامر الفحص والبحث والتحليل</span>
              </span>
              <ul className="text-xs space-y-2 text-slate-700">
                <li className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                  <span className="font-mono font-bold text-sky-600">cat advice.txt</span>
                  <span>قراءة وعرض محتوى الملف النصي كاملاً</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                  <span className="font-mono font-bold text-sky-600">grep &apos;Failed&apos; auth.log</span>
                  <span>البحث عن كلمة أو نمط معين داخل الملفات</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                  <span className="font-mono font-bold text-sky-600">head / tail -n 20</span>
                  <span>عرض أول أو آخر 20 سطراً من الملف المحدث</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                  <span className="font-mono font-bold text-sky-600">pipe |</span>
                  <span>تمرير مخرجات أمر ليكون مدخلاً لأمر آخر</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Hello Kitty Speech Bubble */}
          <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 flex items-center gap-3">
            <img
              src="/brand/hello_kitty_idea.png"
              alt="هيلو كيتي بدرع الأمان"
              className="w-10 h-10 object-contain shrink-0"
            />
            <div className="text-xs text-pink-900 font-bold leading-relaxed">
              <span className="text-pink-600 font-black ml-1">🎀 هيلو كيتي توضح القاعدة:</span>
              « يا رواء، علامة الـ Pipe `|` هي السلاح السري؛ مثلاً: `cat auth.log | grep Failed | wc -l` يحسب لج كم محاولة دخول فاشلة حدثت في ثانية واحدة! »
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          5. STATION 3: PERMISSIONS & CHMOD (المحطة الثالثة: نظام الصلاحيات)
          ========================================================================= */}
      <section id="linux-station-3" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              03
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الثالثة: نظام الصلاحيات والأذونات وإدارة المستخدمين (chmod & chown)
              </h2>
              <span className="text-xs text-slate-500 font-medium">كيف تحسبين الأذونات بالأرقام (755/644) وتمنعين المتطفلين</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            PERMISSIONS
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-black text-emerald-600">READ (r) = 4</span>
              <h3 className="text-xs font-bold text-slate-900">إذن القراءة</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                السماح بفتح الملف وعرض محتواه، أو استعراض قائمة الملفات داخل المجلد.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-black text-sky-600">WRITE (w) = 2</span>
              <h3 className="text-xs font-bold text-slate-900">إذن الكتابة والتعديل</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                السماح بتعديل محتوى الملف أو حفظ تغييرات عليه، أو إضافة/حذف ملفات داخل المجلد.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-black text-amber-600">EXECUTE (x) = 1</span>
              <h3 className="text-xs font-bold text-slate-900">إذن التشغيل والتنفيذ</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                السماح بتشغيل السكربت أو البرنامج التنفيذي، أو الدخول داخل المجلد (cd).
              </p>
            </div>

          </div>

          {/* Explanation Box */}
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2.5">
            <div className="text-emerald-400 font-bold">كيف تقرئين رمز الصلاحية: -rwxr-xr-x (755)؟</div>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              ينقسم الرمز إلى 3 مجموعات ثلاثية:
              <br />
              • المالك (Owner): <span className="text-emerald-300 font-mono">rwx = 4 + 2 + 1 = 7</span> (صلاحية كاملة)
              <br />
              • المجموعة (Group): <span className="text-sky-300 font-mono">r-x = 4 + 0 + 1 = 5</span> (قراءة وتشغيل فقط)
              <br />
              • الآخرون (Others): <span className="text-amber-300 font-mono">r-x = 4 + 0 + 1 = 5</span> (قراءة وتشغيل فقط)
            </p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          6. STATION 4: PROCESSES & SYSTEMD (المحطة الرابعة: العمليات والخدمات)
          ========================================================================= */}
      <section id="linux-station-4" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              04
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الرابعة: إدارة العمليات والخدمات والجدولة (Systemd & Cron)
              </h2>
              <span className="text-xs text-slate-500 font-medium">مراقبة استهلاك الموارد وتشغيل وإيقاف خدمات السيرفرات باحترافية</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            SYSTEM SERVICES
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">top & htop</h3>
            <span className="text-[11px] font-mono font-bold text-emerald-600 block">مراقبة الموارد المباشرة</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              شاشة حية لعرض استهلاك المعالج والذاكرة والعمليات النشطة لمعرفة أي برنامج يثقل السيرفر.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 font-bold">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">systemctl</h3>
            <span className="text-[11px] font-mono font-bold text-sky-600 block">مدير خدمات Systemd</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              تشغيل، إيقاف، وإعادة تشغيل الخدمات (مثل `systemctl restart nginx` و `status`).
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Cron Jobs</h3>
            <span className="text-[11px] font-mono font-bold text-amber-600 block">الجدولة التلقائية</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              جدولة تشغيل السكربتات والنسخ الاحتياطي في أوقات منتظمة (مثل كل ليلة الساعة 3 صباحاً).
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">kill & ps aux</h3>
            <span className="text-[11px] font-mono font-bold text-rose-600 block">إيقاف العمليات العالقة</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              البحث عن رقم العملية (PID) وإنهائها فوراً إذا كانت تستهلك موارد السيرفر أو تتصرف بريبة.
            </p>
          </div>

        </div>

      </section>

      {/* =========================================================================
          7. STATION 5: NETWORKING & SSH (المحطة الخامسة: الشبكات و SSH)
          ========================================================================= */}
      <section id="linux-station-5" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              05
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الخامسة: شبكات لينكس والاتصال الآمن المشفر (SSH & UFW)
              </h2>
              <span className="text-xs text-slate-500 font-medium">التحكم الآمن بالخوادم البعيدة وإدارة جدار الحماية الداخلي</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            REMOTE SECURITY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2 text-right">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Key className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">بروتوكول SSH & المفاتيح</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              الاتصال المشفر بالخوادم البعيدة عبر المنفذ 22، وتأمين الدخول بمفاتيح التشفير (SSH Keys) لمنع هجمات التخمين.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2 text-right">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">جدار الحماية UFW</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              جدار حماية بسيط وقوي لتحديد المنافذ المسموحة (`ufw allow 22` و `ufw enable`) وحظر عناوين IP المهاجمة.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2 text-right">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Server className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">أوامر فحص المنافذ: ss & netstat</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              أمر `ss -tulnp` لعرض كافة المنافذ المفتوحة على السيرفر بالملي ثانية وتحديد أي برنامج يستمع إليها.
            </p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          8. STATION 6: INTERACTIVE PRACTICAL LABS (المحطة السادسة: المختبرات)
          ========================================================================= */}
      <section id="linux-station-6" className="scroll-mt-28 space-y-8">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-pink-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              06
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة السادسة: المختبرات العملية التفاعلية مع هيلو كيتي
              </h2>
              <span className="text-xs text-slate-500 font-medium">تطبيق عملي مباشر: طرفية لينكس الحية وحاسبة الصلاحيات chmod</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
            HANDS-ON LABS
          </span>
        </div>

        {/* LAB 1: INTERACTIVE LINUX TERMINAL */}
        <div className="bg-white border-2 border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  مختبر تفاعلي: موجه أوامر طرفية Linux الحية (Interactive Bash Terminal)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  جربي كتابة أوامر حقيقية مثل ls أو whoami أو systemctl أو cat وشاهدي الاستجابة فورياً
                </p>
              </div>
            </div>

            {/* Quick command pills for quick testing */}
            <div className="flex flex-wrap items-center gap-1.5">
              {['whoami', 'pwd', 'ls -la', 'cat advice.txt', 'systemctl status nginx', 'help', 'clear'].map(cmd => (
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
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
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
        </div>

        {/* LAB 2: INTERACTIVE CHMOD & PERMISSION CALCULATOR */}
        <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  مختبر تفاعلي: حاسبة ومحاكي الصلاحيات والأذونات (Live chmod Visualizer)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  حددي الأذونات للمالك والمجموعة والآخرين، وشاهدي الكود الرقمي والرمزي والأثر الأمني فورياً!
                </p>
              </div>
            </div>

            {/* Quick Chmod Presets */}
            <div className="flex items-center gap-1.5">
              {[
                { label: '755 (سكربت تنفيذي)', o: {r:true,w:true,x:true}, g: {r:true,w:false,x:true}, ot: {r:true,w:false,x:true} },
                { label: '644 (ملف عادي)', o: {r:true,w:true,x:false}, g: {r:true,w:false,x:false}, ot: {r:true,w:false,x:false} },
                { label: '700 (خاص جداً)', o: {r:true,w:true,x:true}, g: {r:false,w:false,x:false}, ot: {r:false,w:false,x:false} },
              ].map(preset => (
                <button
                  key={preset.label}
                  onClick={() => setPerms({ owner: preset.o, group: preset.g, others: preset.ot })}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 hover:bg-amber-50 hover:text-amber-700 border border-slate-200 transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Checkbox Matrix */}
            <div className="md:col-span-7 grid grid-cols-3 gap-3 text-right">
              
              {/* Owner Column */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
                <span className="text-xs font-black text-emerald-800 block border-b border-emerald-200 pb-1">المالك (Owner)</span>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={perms.owner.r}
                    onChange={e => setPerms(p => ({ ...p, owner: { ...p.owner, r: e.target.checked } }))}
                    className="accent-emerald-600 rounded"
                  />
                  <span>قراءة (r = 4)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={perms.owner.w}
                    onChange={e => setPerms(p => ({ ...p, owner: { ...p.owner, w: e.target.checked } }))}
                    className="accent-emerald-600 rounded"
                  />
                  <span>كتابة (w = 2)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={perms.owner.x}
                    onChange={e => setPerms(p => ({ ...p, owner: { ...p.owner, x: e.target.checked } }))}
                    className="accent-emerald-600 rounded"
                  />
                  <span>تشغيل (x = 1)</span>
                </label>
              </div>

              {/* Group Column */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2.5">
                <span className="text-xs font-black text-sky-800 block border-b border-sky-200 pb-1">المجموعة (Group)</span>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={perms.group.r}
                    onChange={e => setPerms(p => ({ ...p, group: { ...p.group, r: e.target.checked } }))}
                    className="accent-sky-600 rounded"
                  />
                  <span>قراءة (r = 4)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={perms.group.w}
                    onChange={e => setPerms(p => ({ ...p, group: { ...p.group, w: e.target.checked } }))}
                    className="accent-sky-600 rounded"
                  />
                  <span>كتابة (w = 2)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={perms.group.x}
                    onChange={e => setPerms(p => ({ ...p, group: { ...p.group, x: e.target.checked } }))}
                    className="accent-sky-600 rounded"
                  />
                  <span>تشغيل (x = 1)</span>
                </label>
              </div>

              {/* Others Column */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <span className="text-xs font-black text-slate-800 block border-b border-slate-200 pb-1">الآخرون (Others)</span>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={perms.others.r}
                    onChange={e => setPerms(p => ({ ...p, others: { ...p.others, r: e.target.checked } }))}
                    className="accent-amber-600 rounded"
                  />
                  <span>قراءة (r = 4)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={perms.others.w}
                    onChange={e => setPerms(p => ({ ...p, others: { ...p.others, w: e.target.checked } }))}
                    className="accent-amber-600 rounded"
                  />
                  <span>كتابة (w = 2)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={perms.others.x}
                    onChange={e => setPerms(p => ({ ...p, others: { ...p.others, x: e.target.checked } }))}
                    className="accent-amber-600 rounded"
                  />
                  <span>تشغيل (x = 1)</span>
                </label>
              </div>

            </div>

            {/* Computed Output Display */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-slate-900 text-slate-200 space-y-3 font-mono text-xs text-right">
              <div>
                <span className="text-[10px] text-slate-400 block">CHMOD COMMAND</span>
                <span className="text-lg font-black text-emerald-400">chmod {permDetails.numCode} filename</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block">STRING NOTATION</span>
                <span className="text-sm font-black text-sky-400">{permDetails.str}</span>
              </div>

              {permDetails.isDangerous && (
                <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800 text-[11px] text-rose-300 font-sans leading-snug">
                  ⚠️ تحذير أمني: إعطاء صلاحية الكتابة أو التنفيذ للآخرين (Others) يمثل خطراً سيبرانياً كبيراً! تجنبي استخدام chmod 777.
                </div>
              )}
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          9. FINAL TRIBUTE & RECOGNITION FOR RAWAA WITH HELLO KITTY
          ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-pink-50 border-2 border-emerald-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-right">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
            <img
              src="/brand/hello_kitty_coding.png"
              alt="هيلو كيتي تبرمج على لينكس"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>أنتِ تسيطرين على أنظمة العالم يا رواء!</span>
              <span className="text-lg">🐧🏆</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
              « بعد أن أتقنتِ الطرفية والصلاحيات والخدمات، خطوتج الاحترافية القادمة هي أتمتة هذه المهام وصناعة أدواتك السيبرانية بلغة بايثون وباش! »
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/programming"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <span>الانتقال لمسار البرمجة ⚡</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/tracks/linux"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-emerald-600/25"
          >
            <span>اختبار كفاءة Linux 🎓</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
