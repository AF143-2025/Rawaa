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
  FileCode
} from 'lucide-react';

export default function ProgrammingSection() {
  const [selectedScript, setSelectedScript] = useState<'python' | 'bash'>('python');
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

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
THRESHOLD=5

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
    setConsoleOutput(['جاري تجهيز بيئة التشغيل المعزولة...']);

    setTimeout(() => {
      if (selectedScript === 'python') {
        setConsoleOutput([
          '[*] Starting Python 3.12 Runtime...',
          '[*] Target Host: 192.168.1.100 (rawaa-test-server)',
          '[+] Port 22 (SSH) -> OPEN [Version: OpenSSH 9.2p1]',
          '[+] Port 80 (HTTP) -> OPEN [Server: nginx/1.24]',
          '[+] Port 443 (HTTPS) -> OPEN [SSL: TLSv1.3 Encrypted]',
          '[-] Port 3306 (MySQL) -> CLOSED / Filtered',
          '[*] Port scan completed in 0.42s. 3 Open Ports detected.'
        ]);
      } else {
        setConsoleOutput([
          '[*] Executing /bin/bash log_audit.sh...',
          '[*] Analyzing /var/log/auth.log for brute-force patterns...',
          '[!] Detected: 198.51.100.42 (18 failed attempts)',
          '[*] Applied firewall rule: ufw deny from 198.51.100.42',
          '[+] Server is secure and intrusion attempt blocked.'
        ]);
      }
      setIsRunning(false);
    }, 600);
  };

  const programmingTopics = [
    {
      title: 'بايثون للأمن والشبكات (Python Sockets)',
      desc: 'التعامل مع بروتوكولات الشبكة، مكتبة socket، إرسال واستقبال الطلبات، والاتصال بالمنافذ وفحصها برمجياً.',
      icon: Code,
      tag: 'بايثون وشبكات'
    },
    {
      title: 'صناعة أدوات فحص المنافذ والثغرات',
      desc: 'بناء أدواتك وأكوادك الخاصة لفحص المنافذ (Port Scanners)، واكتشاف إصدارات الخدمات والتنبيه بالثغرات.',
      icon: Cpu,
      tag: 'أدوات فحص'
    },
    {
      title: 'سكربتات Bash للأتمتة اليومية',
      desc: 'أتمتة إدارة الخوادم، أخذ النسخ الاحتياطية تلقائياً، والتحقق الدوري من سلامة النظام وجدران الحماية.',
      icon: Terminal,
      tag: 'أتمتة وسكربتات'
    },
    {
      title: 'تحليل السجلات الأمنية عبر Regex',
      desc: 'استخراج عناوين IP المشبوهة، تتبع محاولات التسلل، وفلترة ملفات Access Logs الضخمة بدقة وسرعة فائقة.',
      icon: Workflow,
      tag: 'تحليل سجلات'
    }
  ];

  return (
    <section id="programming" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-40 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
              <Code className="w-4 h-4" />
              <span>القسم الرابع: البرمجة والأتمتة السيبرانية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              مسار البرمجة والأتمتة (Python & Bash Scripting)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              اصنعي أدواتك بنفسك: تعلم كيف تحولين المهام الشاقة إلى سكربتات ذكية وتفحصين أمان الشبكات بكود بايثون وباش.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl shrink-0">
            <div className="text-center px-3">
              <span className="text-xl font-black font-mono text-amber-600">35</span>
              <span className="text-[11px] text-slate-500 font-bold block">ساعة أتمتة</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-3">
              <span className="text-xl font-black font-mono text-orange-600">2 في 1</span>
              <span className="text-[11px] text-slate-500 font-bold block">Python + Bash</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {programmingTopics.map((topic, i) => {
          const Icon = topic.icon;
          return (
            <div
              key={i}
              className="bg-white border border-slate-200/90 hover:border-amber-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-right flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {topic.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{topic.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{topic.desc}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-amber-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>مشاريع برمجية حقيقية</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Mini-Lab: Python & Bash Code Playground */}
      <div className="bg-white border-2 border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                مختبر تفاعلي: محاكي تشغيل سكربتات فحص الشبكة والأمن الحية
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                اختاري السكربت واضغطي على &apos;تشغيل السكربت&apos; لرؤية النتيجة في بيئة معزولة
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
                className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer disabled:opacity-50"
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
                  انقري على &apos;تشغيل السكربت 🚀&apos; لرؤية فحص المنافذ واستجابة الأوامر مباشرة هنا...
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

        {/* Hello Kitty Note & CTA */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-pink-700 bg-pink-50 border border-pink-200 px-3.5 py-1.5 rounded-full font-bold">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>نصيحة هيلو كيتي: يا رواء، المهندسة اللي تبرمج تختصر ساعات العمل بدقائق معدودة؛ بايثون وباش أسهل سلاح بيدج! 🐍🎀</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/tracks/programming"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>استعراض مسار البرمجة الكامل</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
