'use client';

import React, { useState } from 'react';
import { Network, Calculator, Activity, CheckCircle, XCircle, RefreshCw, Cpu, Layers, HelpCircle, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataStore } from '@/lib/store';

// Helper to convert IP string to 32-bit number
function ipToLong(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

// Helper to convert 32-bit number to IP string
function longToIp(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255
  ].join('.');
}

// Convert number to 8-bit binary string
function to8BitBinary(num: number): string {
  return num.toString(2).padStart(8, '0');
}

export default function NetworkSimulatorLab() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'drills' | 'protocols' | 'ports'>('calculator');

  // Calculator State
  const [inputIp, setInputIp] = useState('192.168.1.50');
  const [cidr, setCidr] = useState(24);

  // Subnetting calculation logic
  const calculateSubnet = () => {
    try {
      const parts = inputIp.trim().split('.');
      if (parts.length !== 4 || parts.some(p => isNaN(Number(p)) || Number(p) < 0 || Number(p) > 255)) {
        return null;
      }
      const ipNum = ipToLong(inputIp);
      const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
      const wildcardNum = (~maskNum) >>> 0;
      
      const networkNum = (ipNum & maskNum) >>> 0;
      const broadcastNum = (networkNum | wildcardNum) >>> 0;

      const totalHosts = Math.pow(2, 32 - cidr);
      const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

      const firstHostNum = cidr >= 31 ? networkNum : networkNum + 1;
      const lastHostNum = cidr >= 31 ? broadcastNum : broadcastNum - 1;

      const binaryIp = parts.map(p => to8BitBinary(Number(p))).join('.');
      const maskParts = longToIp(maskNum).split('.');
      const binaryMask = maskParts.map(p => to8BitBinary(Number(p))).join('.');

      let ipClass = 'A';
      const firstOctet = Number(parts[0]);
      if (firstOctet >= 1 && firstOctet <= 126) ipClass = 'Class A';
      else if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'Class B';
      else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'Class C';
      else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'Class D (Multicast)';
      else ipClass = 'Class E (Experimental)';

      const isPrivate = 
        (firstOctet === 10) ||
        (firstOctet === 172 && Number(parts[1]) >= 16 && Number(parts[1]) <= 31) ||
        (firstOctet === 192 && Number(parts[1]) === 168);

      return {
        ip: inputIp,
        cidr,
        networkAddress: longToIp(networkNum),
        broadcastAddress: longToIp(broadcastNum),
        subnetMask: longToIp(maskNum),
        wildcardMask: longToIp(wildcardNum),
        usableRange: `${longToIp(firstHostNum)} - ${longToIp(lastHostNum)}`,
        totalHosts,
        usableHosts,
        binaryIp,
        binaryMask,
        ipClass,
        ipType: isPrivate ? 'عنوان خاص (Private IP)' : 'عنوان عام (Public IP)'
      };
    } catch {
      return null;
    }
  };

  const subnetResult = calculateSubnet();

  // Interactive Drills State
  const DRILL_QUESTIONS = [
    {
      id: 1,
      ip: '10.50.12.90',
      cidr: 26,
      question: 'ما هو عنوان الشبكة (Network Address) للعنوان 10.50.12.90/26؟',
      correct: '10.50.12.64',
      explanation: 'قناع /26 يقسم الشبكة إلى كتل بحجم 64 (0, 64, 128, 192). العنوان 90 يقع بين 64 و 127، لذلك عنوان الشبكة هو 10.50.12.64'
    },
    {
      id: 2,
      ip: '172.16.8.15',
      cidr: 28,
      question: 'ما هو عنوان البث (Broadcast Address) للعنوان 172.16.8.15/28؟',
      correct: '172.16.8.15',
      explanation: 'قناع /28 يقسم الشبكة لكتل بحجم 16 (0-15). إذن عنوان الشبكة هو 172.16.8.0 وعنوان البث الأخير هو 172.16.8.15'
    },
    {
      id: 3,
      ip: '192.168.10.0',
      cidr: 29,
      question: 'كم عدد عناوين الأجهزة المتاحة (Usable Hosts) في قناع /29؟',
      correct: '6',
      explanation: 'القانون 2^(32-29) - 2 = 2^3 - 2 = 8 - 2 = 6 أجهزة فقط.'
    }
  ];

  const [drillIndex, setDrillIndex] = useState(0);
  const [drillAnswer, setDrillAnswer] = useState('');
  const [drillFeedback, setDrillFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const checkDrillAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const curr = DRILL_QUESTIONS[drillIndex];
    if (drillAnswer.trim().toLowerCase() === curr.correct.toLowerCase()) {
      setDrillFeedback({
        isCorrect: true,
        message: `إجابة صحيحة وممتازة! 🎉 ${curr.explanation}`
      });
      dataStore.addPoints(30);
      confetti({ particleCount: 70, spread: 50, origin: { y: 0.7 } });
    } else {
      setDrillFeedback({
        isCorrect: false,
        message: `محاولة غير موفقة. الحل الصحيح هو: ${curr.correct}. الشرح: ${curr.explanation}`
      });
    }
  };

  const nextDrill = () => {
    setDrillFeedback(null);
    setDrillAnswer('');
    setDrillIndex(prev => (prev + 1) % DRILL_QUESTIONS.length);
  };

  // Port Scanner Simulation State
  const [scanTarget, setScanTarget] = useState('192.168.1.1');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<Array<{ port: number; proto: string; service: string; status: 'open' | 'filtered' }>>([
    { port: 22, proto: 'TCP', service: 'SSH (إدارة آمنة)', status: 'open' },
    { port: 53, proto: 'UDP/TCP', service: 'DNS (تحليل أسماء)', status: 'open' },
    { port: 80, proto: 'TCP', service: 'HTTP (ويب غير مشفر)', status: 'open' },
    { port: 443, proto: 'TCP', service: 'HTTPS (ويب مشفر)', status: 'open' },
    { port: 3389, proto: 'TCP', service: 'RDP (سطح مكتب بعيد)', status: 'filtered' }
  ]);

  const runPortScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#0F172A] border border-white/10 rounded-xl">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'calculator'
              ? 'bg-cyan-500 text-white shadow-glow'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Calculator className="w-4 h-4" />
          حاسبة Subnetting & CIDR
        </button>
        <button
          onClick={() => setActiveTab('drills')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'drills'
              ? 'bg-cyan-500 text-white shadow-glow'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity className="w-4 h-4" />
          تدريبات وتمارين التقسيم
        </button>
        <button
          onClick={() => setActiveTab('protocols')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'protocols'
              ? 'bg-cyan-500 text-white shadow-glow'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4" />
          مقارنة بروتوكولات TCP و UDP
        </button>
        <button
          onClick={() => setActiveTab('ports')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'ports'
              ? 'bg-cyan-500 text-white shadow-glow'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Cpu className="w-4 h-4" />
          محاكي فحص المنافذ (Port Scanner)
        </button>
      </div>

      {/* TAB 1: CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Form */}
          <div className="bg-[#0E1524] border border-white/10 rounded-2xl p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              مدخلات الشبكة
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400">عنوان IP المستهدف</label>
              <input
                type="text"
                value={inputIp}
                onChange={e => setInputIp(e.target.value)}
                placeholder="192.168.1.1"
                className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:border-cyan-500 outline-none transition-colors"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">قناع الشبكة CIDR (/{cidr})</span>
                <span className="text-cyan-400 font-mono font-bold">
                  {subnetResult?.subnetMask}
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="30"
                value={cidr}
                onChange={e => setCidr(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>/8 (Class A)</span>
                <span>/16 (Class B)</span>
                <span>/24 (Class C)</span>
                <span>/30 (P2P)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>الفئة (Class):</span>
                <span className="text-white font-semibold">{subnetResult?.ipClass}</span>
              </div>
              <div className="flex justify-between">
                <span>نوع العنوان:</span>
                <span className="text-emerald-400 font-semibold">{subnetResult?.ipType}</span>
              </div>
            </div>
          </div>

          {/* Results Cards (2 cols) */}
          <div className="lg:col-span-2 bg-[#0E1524] border border-cyan-500/20 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-cyan-400" />
                نتائج حساب الشبكة التفصيلية
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                /{cidr} Mask
              </span>
            </div>

            {subnetResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#070B12] border border-white/5">
                    <span className="text-xs text-gray-400 block mb-1">عنوان الشبكة (Network ID)</span>
                    <span className="text-base font-mono font-bold text-cyan-400">{subnetResult.networkAddress}</span>
                    <span className="text-[10px] text-gray-500 block mt-1">المعرف الأساسي للشبكة الفرعية</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#070B12] border border-white/5">
                    <span className="text-xs text-gray-400 block mb-1">عنوان البث (Broadcast Address)</span>
                    <span className="text-base font-mono font-bold text-purple-400">{subnetResult.broadcastAddress}</span>
                    <span className="text-[10px] text-gray-500 block mt-1">يُستخدم لإرسال الرسائل لجميع الأجهزة</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#070B12] border border-white/5">
                    <span className="text-xs text-gray-400 block mb-1">نطاق عناوين الأجهزة المتاحة (Usable Range)</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">{subnetResult.usableRange}</span>
                    <span className="text-[10px] text-gray-500 block mt-1">العناوين القابلة للتخصيص فعلياً</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#070B12] border border-white/5">
                    <span className="text-xs text-gray-400 block mb-1">عدد الأجهزة المتاحة لكل شبكة</span>
                    <span className="text-base font-mono font-bold text-amber-400">
                      {subnetResult.usableHosts.toLocaleString()} جهاز
                    </span>
                    <span className="text-[10px] text-gray-500 block mt-1">إجمالي العناوين: {subnetResult.totalHosts.toLocaleString()}</span>
                  </div>
                </div>

                {/* Binary representation */}
                <div className="p-4 rounded-xl bg-[#070B12] border border-cyan-500/10 space-y-2">
                  <span className="text-xs text-gray-400 block">التمثيل الثنائي (Binary Representation):</span>
                  <div className="text-xs font-mono space-y-1" dir="ltr">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 w-16 text-right">IP:</span>
                      <span className="text-cyan-300 font-bold">{subnetResult.binaryIp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 w-16 text-right">Mask:</span>
                      <span className="text-emerald-400 font-bold">{subnetResult.binaryMask}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-rose-400 bg-rose-950/20 rounded-xl border border-rose-500/20">
                يرجى إدخال عنوان IPv4 صالح (مثال: 192.168.1.1)
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DRILLS */}
      {activeTab === 'drills' && (
        <div className="bg-[#0E1524] border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">تحدي حساب الشبكات الفرعية</h3>
              <p className="text-xs text-gray-400">تدرب على حسابات الـ Subnetting السريعة لاجتياز اختبارات الشبكات الدولية</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              سؤال {drillIndex + 1} من {DRILL_QUESTIONS.length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#070B12] border border-white/5 space-y-3">
            <span className="text-xs text-cyan-400 font-semibold block">المعطيات:</span>
            <div className="flex items-center gap-4 text-sm font-mono">
              <span className="text-gray-400">العنوان: <strong className="text-white">{DRILL_QUESTIONS[drillIndex].ip}</strong></span>
              <span className="text-gray-400">القناع: <strong className="text-emerald-400">/{DRILL_QUESTIONS[drillIndex].cidr}</strong></span>
            </div>
            <p className="text-sm font-medium text-white pt-2 border-t border-white/5">
              {DRILL_QUESTIONS[drillIndex].question}
            </p>
          </div>

          <form onSubmit={checkDrillAnswer} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400">إجابتك:</label>
              <input
                type="text"
                value={drillAnswer}
                onChange={e => setDrillAnswer(e.target.value)}
                placeholder="أدخل إجابتك هنا..."
                className="w-full bg-[#070B12] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:border-cyan-500 outline-none"
                dir="ltr"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-xs shadow-glow transition-all"
              >
                تحقق من الإجابة
              </button>
              <button
                type="button"
                onClick={nextDrill}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                السؤال التالي
              </button>
            </div>
          </form>

          {drillFeedback && (
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed ${
                drillFeedback.isCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {drillFeedback.isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                {drillFeedback.isCorrect ? 'إجابة صحيحة (+30 نقطة)' : 'إجابة غير صحيحة'}
              </div>
              <p>{drillFeedback.message}</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TCP VS UDP */}
      {activeTab === 'protocols' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TCP Card */}
          <div className="bg-[#0E1524] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-glow">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <h4 className="text-base font-bold text-white">بروتوكول TCP (Transmission Control Protocol)</h4>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">Reliable</span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              بروتوكول موثوق ومتحقق من الاتصال (Connection-Oriented). ينشئ مصافحة ثلاثية (3-Way Handshake) قبل إرسال أي بايت:
            </p>

            <div className="p-3 bg-[#070B12] rounded-xl text-xs font-mono text-cyan-300 space-y-1.5 border border-white/5" dir="ltr">
              <div>1. Client  --[ SYN ]--&gt;  Server</div>
              <div>2. Server  --[ SYN-ACK ]--&gt;  Client</div>
              <div>3. Client  --[ ACK ]--&gt;  Server</div>
            </div>

            <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside">
              <li>يضمن تسليم جميع الحزم ويعيد إرسال أي حزمة مفقودة.</li>
              <li>يرتب الحزم وفق أرقام التسلسل Sequence Numbers.</li>
              <li>أبطأ قليلاً بسبب حجم الـ Header (20 بايت على الأقل) والتحقق المستمر.</li>
              <li><strong>الاستخدامات:</strong> تصفح الويب (HTTP/S)، نقل الملفات (FTP)، والبريد الإلكتروني (SMTP).</li>
            </ul>
          </div>

          {/* UDP Card */}
          <div className="bg-[#0E1524] border border-purple-500/30 rounded-2xl p-6 space-y-4 shadow-glowPurple">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                <h4 className="text-base font-bold text-white">بروتوكول UDP (User Datagram Protocol)</h4>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">Fast</span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              بروتوكول سريع وبدون اتصال مسبق (Connectionless). يرسل البيانات دون انتظار تأكيد الاستلام (Fire and Forget):
            </p>

            <div className="p-3 bg-[#070B12] rounded-xl text-xs font-mono text-purple-300 space-y-1.5 border border-white/5" dir="ltr">
              <div>Sender  ====[ Datagrams (No Handshake) ]====&gt;  Receiver</div>
            </div>

            <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside">
              <li>لا يضمن وصول الحزم ولا يعيد إرسال المفقود منها.</li>
              <li>سريع جداً وخفيف بفضل رأس حزمة صغير (8 بايت فقط).</li>
              <li>مثالي للتطبيقات التي تفضل السرعة على الدقة الكاملة.</li>
              <li><strong>الاستخدامات:</strong> حل أسماء النطاقات (DNS)، مكالمات الفيديو والصوت (VoIP)، وبث الألعاب.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 4: PORT SCANNER */}
      {activeTab === 'ports' && (
        <div className="bg-[#0E1524] border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                محاكي فحص منافذ الخادم (Port Scanner Simulation)
              </h3>
              <p className="text-xs text-gray-400">افحص المنافذ المفتوحة وتعرف على الخدمات المرتبطة بها لأغراض التحليل الأمني</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={scanTarget}
                onChange={e => setScanTarget(e.target.value)}
                className="bg-[#070B12] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                dir="ltr"
              />
              <button
                onClick={runPortScan}
                disabled={isScanning}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-xs transition-all shadow-glow flex items-center gap-1.5 disabled:opacity-50"
              >
                <Activity className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning ? 'جارِ الفحص...' : 'بدء الفحص'}
              </button>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#070B12] text-gray-400 border-b border-white/5">
                <tr>
                  <th className="py-3 px-4">المنفذ (Port)</th>
                  <th className="py-3 px-4">البروتوكول</th>
                  <th className="py-3 px-4">الخدمة والتطبيق</th>
                  <th className="py-3 px-4">الحالة الأمنية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {scanResults.map(r => (
                  <tr key={r.port} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-400">{r.port}</td>
                    <td className="py-3 px-4 font-mono text-gray-300">{r.proto}</td>
                    <td className="py-3 px-4 text-white font-medium">{r.service}</td>
                    <td className="py-3 px-4">
                      {r.status === 'open' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          مفتوح (OPEN)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          مفلتر (FILTERED)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
