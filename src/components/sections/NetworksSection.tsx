'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Network, 
  Layers, 
  Server, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  Send,
  Activity,
  Cpu,
  Globe,
  Radio,
  Share2,
  HardDrive,
  Lock,
  ArrowRight,
  BookOpen,
  Calculator,
  RefreshCw
} from 'lucide-react';

export default function NetworksSection() {
  const [selectedTarget, setSelectedTarget] = useState('8.8.8.8');
  const [pingStatus, setPingStatus] = useState<'idle' | 'pinging' | 'success'>('idle');
  const [activeLayer, setActiveLayer] = useState(3);

  // Subnet Calculator State
  const [calcIp, setCalcIp] = useState('192.168.1.0');
  const [calcCidr, setCalcCidr] = useState(24);

  const osiLayers = [
    { 
      num: 7, 
      name: 'Application', 
      nameAr: 'طبقة التطبيقات', 
      proto: 'HTTP, HTTPS, DNS, SSH, FTP',
      desc: 'الواجهة المباشرة التي تتفاعل مع برامج المستخدم كالمتصفحات والبريد.'
    },
    { 
      num: 6, 
      name: 'Presentation', 
      nameAr: 'طبقة التقديم والتمثيل', 
      proto: 'SSL/TLS, ASCII, JPEG',
      desc: 'مسؤولة عن تنسيق البيانات، فك وضغط الملفات، والتشفير المشترك.'
    },
    { 
      num: 5, 
      name: 'Session', 
      nameAr: 'طبقة الجلسة', 
      proto: 'NetBIOS, RPC, Sockets',
      desc: 'إنشاء وإدارة ومزامنة وإنهاء جلسات الاتصال بين التطبيقات.'
    },
    { 
      num: 4, 
      name: 'Transport', 
      nameAr: 'طبقة النقل', 
      proto: 'TCP (موثوق) / UDP (سريع) & Ports',
      desc: 'نقل البيانات وتجزئتها وإعادة تجميعها، مع التحكم بتدفق الحزم والمنافذ.'
    },
    { 
      num: 3, 
      name: 'Network', 
      nameAr: 'طبقة الشبكة', 
      proto: 'IPv4, IPv6, ICMP, OSPF, Routers',
      desc: 'العنونة المنطقية (IP) وتوجيه الحزم عبر أفضل وأقصر مسار ممكن.'
    },
    { 
      num: 2, 
      name: 'Data Link', 
      nameAr: 'طبقة ربط البيانات', 
      proto: 'Ethernet, MAC Address, Switches, VLANs',
      desc: 'العنونة الفيزيائية (MAC) ونقل الإطارات (Frames) داخل الشبكة المحلية.'
    },
    { 
      num: 1, 
      name: 'Physical', 
      nameAr: 'الطبقة الفيزيائية', 
      proto: 'RJ45 Cables, Fiber Optics, Wi-Fi Radio',
      desc: 'تحويل الحزم إلى إشارات كهربائية أو ضوئية أو موجات لاسلكية (0s & 1s).'
    },
  ];

  const handleTestPing = () => {
    setPingStatus('pinging');
    setTimeout(() => {
      setPingStatus('success');
    }, 450);
  };

  // Subnet Calculation helper
  const getSubnetInfo = (cidr: number) => {
    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = Math.max(0, totalHosts - 2);
    
    // Mask computation
    let maskArr = [];
    let bits = cidr;
    for (let i = 0; i < 4; i++) {
      if (bits >= 8) {
        maskArr.push(255);
        bits -= 8;
      } else if (bits > 0) {
        maskArr.push(256 - Math.pow(2, 8 - bits));
        bits = 0;
      } else {
        maskArr.push(0);
      }
    }
    const maskStr = maskArr.join('.');

    return {
      mask: maskStr,
      totalHosts,
      usableHosts,
      network: `${calcIp}`,
      broadcast: `${calcIp.split('.').slice(0, 3).join('.')}.${Math.min(255, totalHosts - 1)}`
    };
  };

  const subnetDetails = getSubnetInfo(calcCidr);

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-14 text-right">
      
      {/* =========================================================================
          1. HEADER BANNER: HELLO KITTY WELCOMES RAWAA TO NETWORKING
          ========================================================================= */}
      <div className="bg-white border-2 border-cyan-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-cyan-500/5 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Right Column: Hero Information */}
          <div className="space-y-4 max-w-2xl text-right">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span>دليل هندسة الشبكات والاتصالات الشامل 🌐🛡️</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              رحلة رواء في احتراف هندسة وتصميم الشبكات
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              العمود الفقري للأمن السيبراني: تعلم كيف تسافر حزم البيانات، نموذج OSI السبع طبقات، عنونة الـ IP والـ Subnetting، وإدارة الموجهات والجدران النارية باحترافية وتطبيق معملي!
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 font-bold text-xs">
                6 محطات تعليمية منظمة
              </span>
              <span className="px-3 py-1 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-bold text-xs">
                برفقة شروحات هيلو كيتي 🎀
              </span>
              <span className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 font-bold text-xs">
                محاكي Ping وحاسبة Subnet
              </span>
            </div>

          </div>

          {/* Left Column: Hello Kitty Mascot Box */}
          <div className="flex flex-col items-center justify-center text-center shrink-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-400/25 rounded-full blur-2xl group-hover:bg-cyan-400/40 transition-colors" />
              
              <div className="relative w-40 sm:w-48 h-40 sm:h-48 flex items-center justify-center p-2">
                <img
                  src="/brand/hello_kitty_idea.png"
                  alt="هيلو كيتي بدرع الشبكة"
                  className="max-w-full max-h-full object-contain drop-shadow-[0_8px_20px_rgba(6,182,212,0.40)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="w-28 h-2 rounded-full bg-slate-900/15 blur-[2px] mx-auto -mt-2" />
            </div>

            {/* Speech bubble */}
            <div className="mt-3 px-4 py-2 rounded-2xl bg-cyan-50 border border-cyan-200 shadow-sm max-w-[240px]">
              <span className="text-[11px] font-black text-cyan-800 block leading-snug">
                « يا رواء! الشبكات هي عصب العالم السيبراني؛ فهم الحزم يخليج مهندسة لا تُقهر! 🌐🌸 »
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
            <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
            <span>محطات دليل الشبكات المنظم (انقري للانتقال لأي محطة):</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-400">NETWORKING ROADMAP</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'net-station-1', label: '1. أساسيات الشبكات', icon: '🌐' },
            { id: 'net-station-2', label: '2. نموذج OSI السبع طبقات', icon: '📐' },
            { id: 'net-station-3', label: '3. عنونة IP والـ Subnet', icon: '🔢' },
            { id: 'net-station-4', label: '4. أجهزة التوجيه والربط', icon: '🖧' },
            { id: 'net-station-5', label: '5. خريطة المنافذ', icon: '🚪' },
            { id: 'net-station-6', label: '6. المختبرات التفاعلية', icon: '🧪' },
          ].map(st => (
            <button
              key={st.id}
              onClick={() => scrollToAnchor(st.id)}
              className="p-2.5 rounded-xl bg-white hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <span>{st.icon}</span>
              <span className="truncate">{st.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          3. STATION 1: NETWORK FUNDAMENTALS (المحطة الأولى: أساسيات الشبكات)
          ========================================================================= */}
      <section id="net-station-1" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              01
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الأولى: ما هي شبكات الحاسوب وكيف يتنفس الإنترنت؟
              </h2>
              <span className="text-xs text-slate-500 font-medium">المفاهيم الجوهرية للربط وطوبولوجيا تبادل البيانات</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-600 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
            NET BASICS
          </span>
        </div>

        {/* Content Card with Hello Kitty commentary */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-2xl bg-cyan-50/60 border border-cyan-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center font-bold">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">1. مفهوم الشبكة (Network)</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                ربط جهازي حاسوب أو أكثر سلكياً أو لاسلكياً لتبادل البيانات والملفات والخدمات بسرعة وأمان وفق بروتوكولات قياسية متفق عليها.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">2. شبكات LAN مقابل WAN</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                شبكة LAN هي الشبكة المحلية داخل مبنى أو منزل، بينما شبكة WAN هي الشبكة الواسعة التي تربط العالم والدول كشبكة الإنترنت العالمية.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">3. رحلة حزمة البيانات (Packet)</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                الملفات والرسائل لا تُرسل قطعة واحدة؛ بل تُقسم إلى حزم صغيرة تحمل عنوان المرسل والمستقبل وتتجمع عند الوصول في ثوانٍ معدودة.
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
              « يا رواء، تخيلي حزمة البيانات مثل رسالة بريدية: عليها ظرف خارجي فيه عنوان المرسل (Source IP)، وعنوان المستلم (Destination IP)، وبداخلها المحتوى المشفر! 💌✨ »
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          4. STATION 2: THE 7-LAYER OSI MODEL (المحطة الثانية: نموذج OSI السبع طبقات)
          ========================================================================= */}
      <section id="net-station-2" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              02
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الثانية: نموذج OSI السبع طبقات ومقارنة TCP vs UDP
              </h2>
              <span className="text-xs text-slate-500 font-medium">المعمارية القياسية العالمية لفهم حركة البيانات في الشبكة</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
            7-LAYER STACK
          </span>
        </div>

        {/* The 7 Layers Stack Overview */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2.5">
            {osiLayers.map(layer => (
              <div
                key={layer.num}
                className="p-4 rounded-2xl border border-slate-200 hover:border-cyan-300 bg-slate-50/50 hover:bg-white transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-cyan-500 text-white font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                    L{layer.num}
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>{layer.nameAr}</span>
                      <span className="text-xs text-slate-400 font-mono">({layer.name})</span>
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">{layer.desc}</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-cyan-700 shrink-0">
                  {layer.proto}
                </div>
              </div>
            ))}
          </div>

          {/* TCP vs UDP Comparison Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
              <span className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>بروتوكول TCP (الموثوق والمضمون)</span>
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                يقوم بالمصافحة الثلاثية (3-Way Handshake: SYN, SYN-ACK, ACK) ويتأكد من وصول كل حزمة بدون أخطاء. يُستخدم في تصفح الويب (HTTPS)، نقل الملفات، والبريد.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-amber-600" />
                <span>بروتوكول UDP (السريع والخفيف)</span>
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                يرسل الحزم مباشرة بدون انتظار تأكيد الاستلام لتوفير أقصى سرعة ممكنة. يُستخدم في البث المباشر (Live Video)، ألعاب الإنترنت، والمكالمات الصوتية (VoIP).
              </p>
            </div>
          </div>

          {/* Hello Kitty Speech Bubble */}
          <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 flex items-center gap-3">
            <img
              src="/brand/hello_kitty_coding.png"
              alt="هيلو كيتي تبرمج"
              className="w-10 h-10 object-contain shrink-0"
            />
            <div className="text-xs text-pink-900 font-bold leading-relaxed">
              <span className="text-pink-600 font-black ml-1">🎀 هيلو كيتي توضح القاعدة:</span>
              « يا رواء، نموذج الـ OSI هو أساس أي مقابلة عمل أمنية؛ لما ينزل الطلب لتحت يتغلف بمعلومات جديدة (Encapsulation)، ولما يوصل للمستلم يتفكك تدريجياً (Decapsulation)! »
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          5. STATION 3: IP ADDRESSING & SUBNETTING (المحطة الثالثة: عنونة IP)
          ========================================================================= */}
      <section id="net-station-3" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              03
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الثالثة: عنونة IPv4 و IPv6 وحسابات الشبكات الفرعية (Subnetting)
              </h2>
              <span className="text-xs text-slate-500 font-medium">كيف تقسمين الشبكات وتعزلين الأجهزة بأمان وكفاءة</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            SUBNETTING & CIDR
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold text-sky-600">STRUCTURE</span>
              <h3 className="text-xs font-bold text-slate-900">تشريح عنوان IPv4</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                يتكون من 32 بت مقسمة إلى 4 أجزاء (Octets) مفصولة بنقاط، مثل `192.168.1.1`، وكل جزء قيمته بين 0 و 255.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-600">PRIVACY</span>
              <h3 className="text-xs font-bold text-slate-900">IP الخاص مقابل العام</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                العناوين الخاصة (مثل `10.x.x.x` و `192.168.x.x`) داخلية ومجانية، بينما العنوان العام (Public IP) فريد عالمياً على الإنترنت.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold text-pink-600">FUTURE</span>
              <h3 className="text-xs font-bold text-slate-900">الانتقال إلى IPv6</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                يتكون من 128 بت بالنظام السداسي عشري (Hexadecimal) ليوفر مليارات العناوين غير المحدودة لحل نفاد عناوين IPv4.
              </p>
            </div>

          </div>

          {/* Subnetting Explanation Box */}
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-3">
            <div className="text-cyan-400 font-bold">لماذا نقوم بالتقسيم (Subnetting) في الأمن السيبراني؟</div>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              بدلاً من وضع كل موظفي وسيرفرات الشركة في شبكة واحدة ضخمة (حيث يمكن لأي فيروس الانتشار لجميع الأجهزة)، نستخدم قناع الشبكة (Subnet Mask) وتدوين CIDR مثل `/24` أو `/26` لتقسيمها إلى شبكات فرعية معزولة ومحمية بجدران نارية!
            </p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          6. STATION 4: NETWORK INFRASTRUCTURE (المحطة الرابعة: أجهزة التوجيه والربط)
          ========================================================================= */}
      <section id="net-station-4" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              04
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الرابعة: أجهزة الشبكات والبنية التحتية الأساسية
              </h2>
              <span className="text-xs text-slate-500 font-medium">العتاد والأجهزة الذكية التي تبني وتدير حركة المرور الرقمية</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            INFRASTRUCTURE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 font-bold">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">الموجه (Router)</h3>
            <span className="text-[11px] font-mono font-bold text-cyan-600 block">طبقة الشبكة (L3)</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              يربط الشبكات المختلفة ببعضها (مثل ربط شبكتك المنزلية بالإنترنت) ويوجه الحزم بأسرع مسار ممكن عبر جداول التوجيه.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">المبدل (Switch & VLANs)</h3>
            <span className="text-[11px] font-mono font-bold text-sky-600 block">طبقة ربط البيانات (L2)</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              يربط الأجهزة داخل الشبكة المحلية الواحدة عبر عناوين MAC، ويتيح تقسيم الشبكة إلى شبكات افتراضية معزولة (VLANs).
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">الجدار الناري (Firewall)</h3>
            <span className="text-[11px] font-mono font-bold text-rose-600 block">حارس البوابة الأمني</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              يفحص الحزم الداخلة والخارجة ويمنع أي اتصال مشبوه بناءً على قواعد دقيقة (قوائم التحكم بالوصول ACLs).
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">خدمات DNS و DHCP</h3>
            <span className="text-[11px] font-mono font-bold text-emerald-600 block">محركات التشغيل التلقائي</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              الـ DHCP يوزع عناوين الـ IP تلقائياً على أجهزتك، والـ DNS يحول أسماء المواقع كـ `google.com` إلى أرقام IP يفهمها الحاسوب.
            </p>
          </div>

        </div>

      </section>

      {/* =========================================================================
          7. STATION 5: THE ESSENTIAL PORT MAP (المحطة الخامسة: خريطة المنافذ)
          ========================================================================= */}
      <section id="net-station-5" className="scroll-mt-28 space-y-6">
        
        {/* Station Badge Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">
              05
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                المحطة الخامسة: خريطة المنافذ والبروتوكولات الشائعة (Port Map)
              </h2>
              <span className="text-xs text-slate-500 font-medium">أرقام المنافذ التي يجب على كل مهندس أمن شبكات حفظها عن ظهر قلب</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            PORT MAP
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { port: '80 / 443', name: 'HTTP / HTTPS', desc: 'تصفح صفحات الويب الآمنة والمشفرة', color: 'border-cyan-200 bg-cyan-50/50 text-cyan-800' },
            { port: '53', name: 'DNS', desc: 'ترجمة أسماء النطاقات إلى عناوين IP', color: 'border-sky-200 bg-sky-50/50 text-sky-800' },
            { port: '22', name: 'SSH', desc: 'الاتصال والتحكم المشفر بسيرفرات لينكس', color: 'border-emerald-200 bg-emerald-50/50 text-emerald-800' },
            { port: '21', name: 'FTP', desc: 'نقل الملفات التقليدي بين الخوادم', color: 'border-amber-200 bg-amber-50/50 text-amber-800' },
            { port: '3389', name: 'RDP', desc: 'الاتصال بسطح المكتب البعيد في Windows', color: 'border-purple-200 bg-purple-50/50 text-purple-800' },
            { port: '25 / 587', name: 'SMTP', desc: 'إرسال وتوجيه رسائل البريد الإلكتروني', color: 'border-rose-200 bg-rose-50/50 text-rose-800' },
          ].map(p => (
            <div key={p.port} className={`p-4 rounded-2xl border ${p.color} space-y-1.5 text-right`}>
              <span className="text-xs font-mono font-black block text-slate-900">PORT {p.port}</span>
              <h4 className="text-xs font-bold">{p.name}</h4>
              <p className="text-[11px] text-slate-600 leading-snug">{p.desc}</p>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          8. STATION 6: INTERACTIVE PRACTICAL LABS (المحطة السادسة: المختبرات)
          ========================================================================= */}
      <section id="net-station-6" className="scroll-mt-28 space-y-8">
        
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
              <span className="text-xs text-slate-500 font-medium">تطبيق معملي حي: محاكي فحص الحزم وحاسبة الشبكات الفرعية</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
            HANDS-ON LABS
          </span>
        </div>

        {/* LAB 1: INTERACTIVE PACKET & PING SIMULATOR */}
        <div className="bg-white border-2 border-cyan-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  مختبر تفاعلي: محاكي فحص الحزم ومسار نموذج OSI (Ping & Packet Flow)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  اختبري الاتصال بهدف شبكي وشاهدي كيف تعبر حزمة البيانات طبقات نموذج OSI
                </p>
              </div>
            </div>

            {/* Quick Targets */}
            <div className="flex items-center gap-1.5">
              {['8.8.8.8', '192.168.1.1', '1.1.1.1'].map(ip => (
                <button
                  key={ip}
                  onClick={() => setSelectedTarget(ip)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedTarget === ip 
                      ? 'bg-cyan-500 text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {ip}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Controls & Output */}
            <div className="md:col-span-5 space-y-4 text-right">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  الهدف المطلوب فحصه:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedTarget}
                    onChange={e => setSelectedTarget(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:bg-white focus:border-cyan-500 outline-none"
                  />
                  <button
                    onClick={handleTestPing}
                    disabled={pingStatus === 'pinging'}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{pingStatus === 'pinging' ? 'جاري الإرسال...' : 'إرسال Ping'}</span>
                  </button>
                </div>
              </div>

              {/* Output Card */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-1.5 shadow-inner">
                <div className="text-slate-400 text-[11px]">PING {selectedTarget} (56 data bytes):</div>
                {pingStatus === 'idle' && (
                  <div className="text-slate-500">انقري على إرسال Ping لبدء الاختبار...</div>
                )}
                {pingStatus === 'pinging' && (
                  <div className="text-cyan-400 animate-pulse">Sending 64 bytes to {selectedTarget}... icmp_seq=1</div>
                )}
                {pingStatus === 'success' && (
                  <>
                    <div className="text-emerald-400">64 bytes from {selectedTarget}: icmp_seq=1 ttl=117 time=18.4 ms</div>
                    <div className="text-emerald-400">64 bytes from {selectedTarget}: icmp_seq=2 ttl=117 time=17.9 ms</div>
                    <div className="text-slate-400 text-[10px] pt-1 border-t border-slate-800">
                      --- {selectedTarget} ping statistics: 0% packet loss, RTT 18.15ms ---
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Interactive OSI Flow */}
            <div className="md:col-span-7 space-y-2 text-right">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                مسار الحزمة عبر طبقات نموذج OSI (انقري على أي طبقة):
              </span>
              <div className="space-y-1.5">
                {osiLayers.map(l => (
                  <div
                    key={l.num}
                    onClick={() => setActiveLayer(l.num)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                      activeLayer === l.num
                        ? 'bg-cyan-50 border-cyan-300 ring-2 ring-cyan-200/50 font-bold text-cyan-900'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-mono font-bold flex items-center justify-center">
                        L{l.num}
                      </span>
                      <span>{l.nameAr}</span>
                      <span className="text-slate-400 font-mono text-[10px]">({l.name})</span>
                    </div>
                    <span className="font-mono text-[10px] text-cyan-600 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                      {l.proto}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LAB 2: LIVE INTERACTIVE SUBNET CALCULATOR */}
        <div className="bg-white border-2 border-indigo-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  مختبر تفاعلي: حاسبة الشبكات الفرعية الفورية (Live Subnet Calculator)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  اكتبي عنوان IP واختاري بادئة الـ CIDR لتحصلي على قناع الشبكة وعناوين الأجهزة فورياً
                </p>
              </div>
            </div>

            {/* Quick CIDR Pills */}
            <div className="flex items-center gap-1.5">
              {[24, 26, 28, 30].map(c => (
                <button
                  key={c}
                  onClick={() => setCalcCidr(c)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    calcCidr === c
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  /{c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Input Form */}
            <div className="md:col-span-5 space-y-4 text-right">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  عنوان الشبكة المطلوب:
                </label>
                <input
                  type="text"
                  value={calcIp}
                  onChange={e => setCalcIp(e.target.value)}
                  placeholder="192.168.1.0"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  بادئة التدوين (CIDR Prefix): /{calcCidr}
                </label>
                <input
                  type="range"
                  min="16"
                  max="30"
                  value={calcCidr}
                  onChange={e => setCalcCidr(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>/16 (كبيرة جداً)</span>
                  <span>/24 (قياسية)</span>
                  <span>/30 (ربط نقطة لنقطة)</span>
                </div>
              </div>
            </div>

            {/* Live Computed Output Grid */}
            <div className="md:col-span-7 grid grid-cols-2 gap-3 text-right">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400">SUBNET MASK</span>
                <div className="text-xs sm:text-sm font-mono font-bold text-indigo-700">{subnetDetails.mask}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400">USABLE HOSTS</span>
                <div className="text-xs sm:text-sm font-mono font-bold text-emerald-600">{subnetDetails.usableHosts} جهاز متاح</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400">NETWORK IP</span>
                <div className="text-xs sm:text-sm font-mono font-bold text-slate-800">{subnetDetails.network}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400">BROADCAST IP</span>
                <div className="text-xs sm:text-sm font-mono font-bold text-slate-800">{subnetDetails.broadcast}</div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          9. FINAL TRIBUTE & RECOGNITION FOR RAWAA WITH HELLO KITTY
          ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-50 via-sky-50 to-pink-50 border-2 border-cyan-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-right">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-cyan-200 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
            <img
              src="/brand/hello_kitty_idea.png"
              alt="هيلو كيتي بدرع الشبكة"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>أنتِ تتقنين عصب العالم الرقمي يا رواء!</span>
              <span className="text-lg">🌐🎀</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
              « بعد أن فهمتِ مسار الحزم ونموذج الـ OSI وتقسيم الشبكات، خطوتج التالية الطبيعية هي إدارة سيرفرات لينكس التي تستقبل هذه الحزم! »
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/linux"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <span>الانتقال لمسار Linux 🐧</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/tracks/networks"
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-cyan-600/25"
          >
            <span>اختبار كفاءة الشبكات 🎓</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
