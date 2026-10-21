'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Code, 
  Terminal, 
  Cpu, 
  Workflow, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  Play,
  FileCode,
  BookOpen,
  Search,
  AlertTriangle,
  RefreshCw,
  Copy,
  Layers,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export default function ProgrammingSection() {
  const [selectedScript, setSelectedScript] = useState<'python' | 'bash'>('python');
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  // Regex Extractor State
  const [logText, setLogText] = useState(`Oct 20 23:10:14 server sshd[1420]: Failed password for invalid user admin from 198.51.100.42 port 48212 ssh2
Oct 20 23:10:18 server sshd[1422]: Failed password for root from 203.0.113.19 port 51234 ssh2
Oct 20 23:10:22 server nginx[80]: GET /login.php?user=admin' OR '1'='1 from 192.0.2.77
Oct 20 23:10:25 server sshd[1425]: Accepted publickey for rawaa from 192.168.1.50 port 55432 ssh2`);

  const [extractedIps, setExtractedIps] = useState<string[]>([]);
  const [extractedThreats, setExtractedThreats] = useState<string[]>([]);

  const pythonCode = `# ========================================================
# سكربت بايثون: فحص المنافذ المفتوحة وكشف الخدمات
# ========================================================
import socket

target_host = "192.168.1.100"
common_ports = {22: "SSH", 80: "HTTP", 443: "HTTPS", 3306: "MySQL"}

print(f"[*] بدء فحص المنافذ للهدف: {target_host}...")

for port, service in common_ports.items():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    result = s.connect_ex((target_host, port))
    if result == 0:
        print(f"[+] المنفذ {port} ({service}) -> مفتوح ومتاح 🛡️")
    s.close()

print("[*] اكتمل الفحص الأمني بنجاح.")`;

  const bashCode = `#!/bin/bash
# ========================================================
# سكربت باش: أتمتة حظر محاولات الاختراق وفحص السجلات
# ========================================================
LOG_FILE="/var/log/auth.log"
THRESHOLD=3

echo "[*] فحص محاولات تسجيل الدخول الفاشلة..."
grep "Failed password" "$LOG_FILE" | awk '{print $(NF-3)}' | sort | uniq -c | while read count ip; do
    if [ "$count" -gt "$THRESHOLD" ]; then
        echo "[!] تحذير: الـ IP المشبوه $ip حاول الدخول $count مرات -> جاري الحظر عبر UFW"
        # ufw deny from "$ip"
    fi
done
echo "[+] النظام محمي وجميع السجلات مفحوصة."`;

  const handleRunScript = () => {
    setIsRunning(true);
    setConsoleOutput(['جاري تجهيز بيئة التشغيل المعزولة (Python & Bash Sandbox)...']);

    setTimeout(() => {
      if (selectedScript === 'python') {
        setConsoleOutput([
          '[*] Starting Python 3.12 Security Runtime...',
          '[*] Target Host: 192.168.1.100 (rawaa-test-server)',
          '[+] Port 22 (SSH) -> OPEN [Version: OpenSSH 9.2p1]',
          '[+] Port 80 (HTTP) -> OPEN [Server: nginx/1.24]',
          '[+] Port 443 (HTTPS) -> OPEN [SSL: TLSv1.3 Encrypted]',
          '[-] Port 3306 (MySQL) -> CLOSED / Filtered by Firewall',
          '[*] Port scan completed in 0.42s. 3 Open Ports detected.'
        ]);
      } else {
        setConsoleOutput([
          '[*] Executing /bin/bash log_audit.sh...',
          '[*] Analyzing /var/log/auth.log for brute-force patterns...',
          '[!] Detected: 198.51.100.42 (18 failed password attempts)',
          '[!] Detected: 203.0.113.19 (7 failed password attempts)',
          '[*] Applying automated firewall rule: ufw deny from 198.51.100.42',
          '[*] Applying automated firewall rule: ufw deny from 203.0.113.19',
          '[+] Both malicious IPs blocked. Server is secure.'
        ]);
      }
      setIsRunning(false);
    }, 550);
  };

  const handleExtractIps = () => {
    const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
    const matches = logText.match(ipRegex) || [];
    const unique = Array.from(new Set(matches));
    setExtractedIps(unique);
    setExtractedThreats([]);
  };

  const handleExtractThreats = () => {
    const threats: string[] = [];
    if (logText.includes("Failed password")) {
      threats.push("محاولات هجوم تخمين القوة الغاشمة (Brute-Force Login)");
    }
    if (logText.includes("' OR '1'='1")) {
      threats.push("محاولة حقن قواعد البيانات (SQL Injection Attempt)");
    }
    setExtractedThreats(threats);
    setExtractedIps([]);
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-14 text-right">
      
      {/* =========================================================================
          1. HEADER BANNER: HELLO KITTY WELCOMES RAWAA TO PROGRAMMING
          ========================================================================= */}
      <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-amber-500/5 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Right Column: Hero Information */}
          <div className="space-y-4 max-w-2xl text-right">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>دليل البرمجة والأتمتة السيبرانية الشامل ⚡🐍</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              رحلة رواء في احتراف البرمجة والأتمتة (Python & Bash)
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              اصنعي أدواتك بنفسك: تعلم كيف تحولين المهام الشاقة إلى سكربتات ذكية، بناء أدوات فحص المنافذ والشبكات، وأتمتة خوادم لينكس، وتحليل السجلات واستخراج التهديدات بالتعبيرات النمطية (Regex)!
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs">
                6 محطات تعليمية منظمة
              </span>
              <span className="px-3 py-1 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-bold text-xs">
                برفقة شروحات هيلو كيتي 🎀
              </span>
              <span className="px-3 py-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 font-bold text-xs">
                بيئة تشغيل كود ومحلل Regex
              </span>
            </div>

          </div>

          {/* Left Column: Hello Kitty Coder Character Box */}
          <div className="flex flex-col items-center justify-center text-center shrink-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-amber-400/25 rounded-full blur-2xl group-hover:bg-amber-400/40 transition-colors" />
              
              <div className="relative w-40 sm:w-48 h-40 sm:h-48 flex items-center justify-center p-2">
                <img
                  src="/brand/kitty_programming.jpg"
                  alt="هيلو كيتي تبرمج بلغة بايثون وباش"
                  className="max-w-full max-h-full object-contain drop-shadow-[0_8px_20px_rgba(245,158,11,0.40)] group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                />
              </div>

              <div className="w-28 h-2 rounded-full bg-slate-900/15 blur-[2px] mx-auto -mt-2" />
            </div>

            {/* Speech bubble */}
            <div className="mt-3 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm max-w-[240px]">
              <span className="text-[11px] font-black text-amber-800 block leading-snug">
                « يا رواء! سطرين بايثون وباش يختصرون عليج شغل ساعات كاملة؛ البرمجة هي سلاحج السري! 🐍⚡ »
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
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>محطات دليل البرمجة المنظم (انقري للانتقال لأي محطة):</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-400">PROGRAMMING ROADMAP</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'prog-station-1', label: '1. لماذا تبرمجين؟', icon: '⚡' },
            { id: 'prog-station-2', label: '2. أساسيات بايثون', icon: '🐍' },
            { id: 'prog-station-3', label: '3. مقابس الشبكات', icon: '🌐' },
            { id: 'prog-station-4', label: '4. سكربتات باش', icon: '💻' },
            { id: 'prog-station-5', label: '5. تحليل السجلات Regex', icon: '🔍' },
            { id: 'prog-station-6', label: '6. المختبرات التفاعلية', icon: '🧪' },
          ].map(st => (
            <button
              key={st.id}
              onClick={() => scrollToAnchor(st.id)}
              className="p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <span>{st.icon}</span>
              <span className="truncate">{st.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          3. STATION 1: WHY CODE? PYTHON VS BASH (المحطة الأولى: المقارنة الجوهرية)
          ========================================================================= */}
      <section id="prog-station-1" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              01
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الأولى: لماذا تبرمج المهندسة السيبرانية؟ مقارنة Python vs Bash
              </h2>
              <span className="text-xs text-slate-500 font-medium">متى نستخدم بايثون ومتى نستخدم باش لتحقيق أقصى كفاءة وسرعة</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            PYTHON VS BASH
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Python Card */}
            <div className="p-6 rounded-3xl border-2 border-amber-200 bg-amber-50/40 space-y-3 text-right">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                  PYTHON 3
                </span>
                <span className="text-xs font-bold text-slate-400">لغة الأمان السيبراني الأولى</span>
              </div>
              <h3 className="text-base font-black text-slate-900">بايثون: صناعة الأدوات والذكاء البرمجي</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                لغة سهلة القراءة لكنها جبارة الإمكانيات؛ تمتلك آلاف المكتبات الجاهزة للتعامل مع الشبكات والتشفير والذكاء الاصطناعي واعتراض حزم الويب.
              </p>
              <div className="pt-2 border-t border-amber-200/80 space-y-1.5 text-xs text-slate-700">
                <span className="font-bold block text-amber-900">أفضل استخدامات بايثون:</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>بناء أدوات فحص المنافذ واختبار الثغرات المخصصة</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>التعامل مع مقابس الاتصال (Sockets) وبروتوكول HTTP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>تحليل البيانات الضخمة وفك وتشفير الملفات</span>
                </div>
              </div>
            </div>

            {/* Bash Card */}
            <div className="p-6 rounded-3xl border-2 border-emerald-200 bg-emerald-50/40 space-y-3 text-right">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  BASH SCRIPTING
                </span>
                <span className="text-xs font-bold text-slate-400">لغة خوادم لينكس الأم</span>
              </div>
              <h3 className="text-base font-black text-slate-900">باش: أتمتة إدارة وسرعة السيرفرات</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                تعمل مباشرة داخل قلب طرفية لينكس دون الحاجة لتثبيت أي برامج إضافية؛ تتحدث مباشرة مع النواة والملفات والخدمات.
              </p>
              <div className="pt-2 border-t border-emerald-200/80 space-y-1.5 text-xs text-slate-700">
                <span className="font-bold block text-emerald-900">أفضل استخدامات باش:</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>أتمتة النسخ الاحتياطي التلقائي وجدولة السيرفرات</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>فلترة وتجميع سجلات النظام بسرعة فائقة بـ grep و awk</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>حظر عناوين IP المهاجمة تلقائياً عبر جدار الحماية UFW</span>
                </div>
              </div>
            </div>

          </div>

          {/* Hello Kitty Cute Commentary Note */}
          <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 flex items-start sm:items-center gap-3">
            <img
              src="/brand/kitty_programming.jpg"
              alt="هيلو كيتي المبرمجة"
              className="w-10 h-10 object-contain shrink-0 rounded-xl mt-0.5 sm:mt-0"
            />
            <div className="text-xs text-pink-900 font-bold leading-relaxed">
              <span className="text-pink-600 font-black block sm:inline sm:ml-1">💡 همسة هيلو كيتي الذكية:</span>
              « تذكري يا رواء: باش نستخدمها للمهام السريعة في قلب نظام لينكس، وبايثون نستخدمها لما نحتاج ذكاء برمجي وفحص شبكات وتطبيقات ويب متقدم! 🐍⚡ »
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          4. STATION 2: PYTHON ESSENTIALS FOR CYBER (المحطة الثانية: أساسيات بايثون)
          ========================================================================= */}
      <section id="prog-station-2" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              02
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الثانية: أساسيات لغة Python من منظور الأمن والشبكات
              </h2>
              <span className="text-xs text-slate-500 font-medium">المفاهيم البرمجية التي توظفها المهندسة السيبرانية لكتابة برامج متينة</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            PYTHON ESSENTIALS
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-right">
              <span className="text-xs font-mono font-bold text-amber-600">VARIABLES & TYPES</span>
              <h3 className="text-xs font-bold text-slate-900">المتغيرات والنصوص والأرقام</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                تخزين عناوين الـ IP كنصوص (`target = &apos;192.168.1.1&apos;`) وأرقام المنافذ كأعداد صحيحة (`port = 80`).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-right">
              <span className="text-xs font-mono font-bold text-sky-600">LISTS & DICTS</span>
              <h3 className="text-xs font-bold text-slate-900">القوائم والقواميس</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                تخزين قوائم المنافذ <code>[22, 80, 443]</code> أو قواميس الخدمات <code>&#123;22: &apos;SSH&apos;, 80: &apos;HTTP&apos;&#125;</code> لسهولة الفحص.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-right">
              <span className="text-xs font-mono font-bold text-emerald-600">LOOPS & LOGIC</span>
              <h3 className="text-xs font-bold text-slate-900">الحلقات والشروط (for & if)</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                المرور حلقة بحلقة على مئات الأجهزة والمنافذ، واختبار استجابة كل جهاز بشرط if.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-right">
              <span className="text-xs font-mono font-bold text-purple-600">ERROR HANDLING</span>
              <h3 className="text-xs font-bold text-slate-900">معالجة الأخطاء (try / except)</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                حماية أداة الفحص من التوقف المفاجئ عند إغلاق المنفذ أو انقطاع الاتصال بالسيرفر.
              </p>
            </div>

          </div>

          {/* Hello Kitty Speech Bubble */}
          <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 flex items-center gap-3">
            <img
              src="/brand/kitty_programming.jpg"
              alt="هيلو كيتي وبايثون"
              className="w-10 h-10 object-contain shrink-0 rounded-xl"
            />
            <div className="text-xs text-pink-900 font-bold leading-relaxed">
              <span className="text-pink-600 font-black ml-1">🎀 هيلو كيتي توضح القاعدة:</span>
              « في بايثون، كود الـ `try ... except` هو درع أمان برنامجج؛ يخلي الفحص يستمر بدون ما ينهار السكربت عند أول خطأ شبكي! 🛡️✨ »
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          5. STATION 3: NETWORK SOCKETS (المحطة الثالثة: مقابس الشبكات في بايثون)
          ========================================================================= */}
      <section id="prog-station-3" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              03
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الثالثة: مقابس الشبكات (Network Sockets) وصناعة أدوات الفحص
              </h2>
              <span className="text-xs text-slate-500 font-medium">كيف تنشئين اتصال TCP/IP وتكتشفين المنافذ المفتوحة برمجياً</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            SOCKET PROGRAMMING
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            <div className="space-y-3 text-right">
              <h3 className="text-base font-black text-slate-900">ما هو المقبس (Socket)؟</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                المقبس هو نافذة اتصال برمجية تسمح لبرنامجك بالتحدث مباشرة مع بطاقة الشبكة والاتصال بأي عنوان IP ورقم منفذ عبر بروتوكول TCP أو UDP.
              </p>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5 text-xs text-slate-700">
                <span className="font-bold text-amber-900 block">خطوات فحص المنفذ في بايثون:</span>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <span>إنشاء المقبس: `s = socket.socket()`</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <span>تحديد مهلة زمنية: `s.settimeout(0.5)`</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <span>الاتصال بالمنفذ: `result = s.connect_ex((ip, port))`</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">4</span>
                  <span>إذا كان الناتج `0`، فهذا يعني أن المنفذ مفتوح ومتاح! 🛡️</span>
                </div>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 text-slate-200 font-mono text-xs text-left overflow-x-auto shadow-inner" dir="ltr">
              <div className="text-slate-500 pb-2 mb-2 border-b border-slate-800 text-[10px]"># Mini Port Scanner Example</div>
              <pre className="leading-relaxed">
{`import socket

target = "192.168.1.1"
port = 80

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(1.0)
code = s.connect_ex((target, port))

if code == 0:
    print(f"[+] Port {port} is OPEN!")
else:
    print(f"[-] Port {port} is CLOSED.")
s.close()`}
              </pre>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          6. STATION 4: BASH AUTOMATION (المحطة الرابعة: سكربتات باش وأتمتة لينكس)
          ========================================================================= */}
      <section id="prog-station-4" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              04
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الرابعة: لغة باش وأتمتة خوادم لينكس (Bash Automation & Cron)
              </h2>
              <span className="text-xs text-slate-500 font-medium">كيف تحولين أوامر الطرفية اليومية إلى سكربتات تنفذ المهام تلقائياً</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            BASH SCRIPTING
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">الترويسة: #!/bin/bash</h3>
            <span className="text-[11px] font-mono font-bold text-emerald-600 block">Shebang Header</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              السطر الأول في كل سكربت؛ يخبر نظام لينكس بأي مفسر أوامر يجب تشغيل هذا الملف.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 font-bold">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">المتغيرات والمعاملات</h3>
            <span className="text-[11px] font-mono font-bold text-sky-600 block">$1, $2, $USER</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              استقبال المدخلات من الطرفية وتخزين نتائج الأوامر في متغيرات لاستخدامها لاحقاً.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
              <Workflow className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">الشروط والحلقات</h3>
            <span className="text-[11px] font-mono font-bold text-amber-600 block">if / then & for loop</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              فحص شروط الأمان؛ مثلاً: إذا كان استهلاك القرص أكبر من 90% أرسل تنبيهاً أمنياً فورياً!
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">الجدولة التلقائية</h3>
            <span className="text-[11px] font-mono font-bold text-purple-600 block">Crontab Automation</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              ربط السكربت بنظام cron ليعمل تلقائياً كل ساعة أو كل ليلة دون أي تدخل بشري.
            </p>
          </div>

        </div>

      </section>

      {/* =========================================================================
          7. STATION 5: REGEX & LOG PARSING (المحطة الخامسة: السجلات والـ Regex)
          ========================================================================= */}
      <section id="prog-station-5" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              05
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الخامسة: التعبيرات النمطية وتحليل السجلات الأمنية (Regex & Log Parsing)
              </h2>
              <span className="text-xs text-slate-500 font-medium">استخراج عناوين IP المشبوهة وكشف محاولات التسلل من بين ملايين السطور</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
            REGEX & LOGS
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/60 space-y-2 text-right">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Search className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">ما هو الـ Regex؟</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                لغة مطابقة الأنماط النصية للبحث عن بيانات محددة كأرقام الـ IP والإيميلات وكلمات المرور داخل النصوص الضخمة.
              </p>
            </div>

            <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/60 space-y-2 text-right">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">نمط استخراج الـ IPv4</h3>
              <p className="text-[11px] font-mono text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200 break-all">
                \b\d&#123;1,3&#125;\.\d&#123;1,3&#125;\.\d&#123;1,3&#125;\.\d&#123;1,3&#125;\b
              </p>
            </div>

            <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/60 space-y-2 text-right">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">كشف محاولات الاختراق</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                البحث عن أنماط حقن SQL مثل `&apos; OR &apos;1&apos;=&apos;1` أو تكرار `Failed password` لحظر المهاجم فوراً.
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          8. STATION 6: INTERACTIVE PRACTICAL LABS (المحطة السادسة: المختبرات)
          ========================================================================= */}
      <section id="prog-station-6" className="scroll-mt-28 space-y-8">
        
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
              <span className="text-xs text-slate-500 font-medium">تطبيق عملي حي: بيئة تشغيل الكود ومستخرج السجلات بالتعبيرات النمطية</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
            HANDS-ON LABS
          </span>
        </div>

        {/* LAB 1: INTERACTIVE CODE PLAYGROUND */}
        <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  مختبر تفاعلي: محاكي تشغيل سكربتات فحص الشبكة والأمن المباشر (Script Sandbox)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  اختاري السكربت واضغطي على &apos;تشغيل السكربت 🚀&apos; لمشاهدة النتائج في شاشة Console حية
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedScript('python');
                  setConsoleOutput([]);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                  selectedScript === 'python'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Python (Port Scanner) 🐍
              </button>
              <button
                onClick={() => {
                  setSelectedScript('bash');
                  setConsoleOutput([]);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                  selectedScript === 'bash'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Bash (Auto Defense) ⚡
              </button>
            </div>
          </div>

          {/* Code & Runner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Code Viewer */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-left overflow-x-auto shadow-inner" dir="ltr">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                <span>{selectedScript === 'python' ? 'scanner.py' : 'auto_defense.sh'}</span>
                <button
                  onClick={handleRunScript}
                  disabled={isRunning}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'جاري التشغيل...' : 'تشغيل السكربت 🚀'}</span>
                </button>
              </div>
              <pre className="text-slate-200 leading-relaxed whitespace-pre font-mono">
                {selectedScript === 'python' ? pythonCode : bashCode}
              </pre>
            </div>

            {/* Execution Output Console */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-left flex flex-col justify-between shadow-inner" dir="ltr">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Interactive Console Output</span>
                  </span>
                  <span className="text-[10px] text-slate-500">SANDBOX READY</span>
                </div>

                {consoleOutput.length === 0 ? (
                  <div className="text-slate-500 pt-6 text-center leading-relaxed">
                    انقري على &apos;تشغيل السكربت 🚀&apos; لمشاهدة فحص المنافذ واستجابة الأوامر مباشرة هنا...
                  </div>
                ) : (
                  <div className="space-y-1.5 text-[11px] text-emerald-400 pt-2 font-mono">
                    {consoleOutput.map((line, idx) => (
                      <div key={idx} className="leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 text-right" dir="rtl">
                💡 البرمجة تعطيك ميزة تنافسية ضخمة لفهم ما يحدث خلف كواليس أدوات الأمن والشبكات.
              </div>
            </div>
          </div>
        </div>

        {/* LAB 2: LIVE REGEX & LOG PARSER LAB */}
        <div className="bg-white border-2 border-orange-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  مختبر تفاعلي: مستخرج ومحلل السجلات بالتعبيرات النمطية (Live Regex Parser)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  استخرجي عناوين الـ IP واكشفي أنماط الاختراق فورياً من نص السجلات التجريبي
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExtractIps}
                className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>استخراج عناوين IP 🔍</span>
              </button>
              <button
                onClick={handleExtractThreats}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>كشف التهديدات ⚠️</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Input Log Box */}
            <div className="md:col-span-7 space-y-2 text-right">
              <label className="text-xs font-bold text-slate-700 block">
                نص سجلات الخادم التجريبية (/var/log/auth.log):
              </label>
              <textarea
                value={logText}
                onChange={e => setLogText(e.target.value)}
                rows={5}
                className="w-full p-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs focus:bg-white focus:border-orange-500 outline-none leading-relaxed"
                dir="ltr"
              />
            </div>

            {/* Extracted Output Display */}
            <div className="md:col-span-5 p-4 rounded-2xl bg-slate-900 text-slate-200 space-y-3 font-mono text-xs text-right">
              <span className="text-[11px] text-slate-400 font-bold block border-b border-slate-800 pb-1.5">
                نتائج التحليل والمطابقة (Matched Results):
              </span>

              {extractedIps.length === 0 && extractedThreats.length === 0 && (
                <div className="text-slate-500 text-center pt-4">
                  اضغطي على &apos;استخراج عناوين IP&apos; أو &apos;كشف التهديدات&apos; لرؤية النتائج...
                </div>
              )}

              {extractedIps.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-emerald-400 font-bold text-[11px] block">عناوين IP المستخرجة بنجاح:</span>
                  {extractedIps.map((ip, i) => (
                    <div key={i} className="p-1.5 bg-slate-800/80 rounded border border-slate-700 text-emerald-300 font-mono text-xs">
                      {ip}
                    </div>
                  ))}
                </div>
              )}

              {extractedThreats.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-rose-400 font-bold text-[11px] block">أنماط التهديدات المكتشفة:</span>
                  {extractedThreats.map((thr, i) => (
                    <div key={i} className="p-1.5 bg-rose-950/60 rounded border border-rose-800 text-rose-300 font-sans text-xs">
                      • {thr}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          9. FINAL TRIBUTE & RECOGNITION FOR RAWAA WITH HELLO KITTY
          ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-pink-50 border-2 border-amber-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-right">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-amber-200 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
            <img
              src="/brand/kitty_trophy.jpg"
              alt="هيلو كيتي تحتفل بنجاح رواء"
              className="w-full h-full object-contain drop-shadow rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>مبروك يا رواء! أنتِ تمتلكين أسلحة المهندسة المتكاملة!</span>
              <span className="text-lg">⚡🏆</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
              « بعد أن فهمتِ الأساسات والشبكات ولينكس والبرمجة، أصبحتِ مؤهلة تماماً لخوض غمار التحديات والتميز في عالم الأمن السيبراني بكل ثقة وجدارة! »
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-amber-600/25 active:scale-95"
          >
            <span>العودة إلى الرئيسية 🌸</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
