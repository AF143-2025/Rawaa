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
  Cpu
} from 'lucide-react';

export default function NetworksSection() {
  const [selectedTarget, setSelectedTarget] = useState('8.8.8.8');
  const [pingStatus, setPingStatus] = useState<'idle' | 'pinging' | 'success'>('idle');
  const [activeLayer, setActiveLayer] = useState(3);

  const osiLayers = [
    { num: 7, name: 'Application', nameAr: 'طبقة التطبيقات', proto: 'HTTP, DNS, SSH' },
    { num: 4, name: 'Transport', nameAr: 'طبقة النقل', proto: 'TCP / UDP & Ports' },
    { num: 3, name: 'Network', nameAr: 'طبقة الشبكة', proto: 'IPv4, IPv6, ICMP, Routing' },
    { num: 2, name: 'Data Link', nameAr: 'طبقة ربط البيانات', proto: 'Ethernet, MAC, Switching' },
    { num: 1, name: 'Physical', nameAr: 'الطبقة الفيزيائية', proto: 'Cables, Bits, Signals' },
  ];

  const handleTestPing = () => {
    setPingStatus('pinging');
    setTimeout(() => {
      setPingStatus('success');
    }, 450);
  };

  const networkTopics = [
    {
      title: 'نموذج OSI السبع طبقات و TCP/IP',
      desc: 'فهم المعمارية القياسية لنقل البيانات عبر الشبكة، وتحديد وظيفة كل طبقة من الطبقة الفيزيائية حتى التطبيقات.',
      icon: Layers,
      tag: 'معمارية الشبكات'
    },
    {
      title: 'عنونة IP وتقسيم الشبكات (Subnetting)',
      desc: 'إتقان عنونة IPv4 و IPv6 وحساب أقنعة الشبكات الفرعية (Subnet Masks) وعناوين الـ Broadcast بكفاءة وسرعة.',
      icon: Cpu,
      tag: 'عنونة وتوزيع'
    },
    {
      title: 'أجهزة التوجيه والتبديل (Routing & Switching)',
      desc: 'كيف تعمل أجهزة التبديل (Switches) وشبكات VLAN، وكيف تختار أجهزة التوجيه (Routers) المسار الأقصر للحزم.',
      icon: Server,
      tag: 'أجهزة وبنية'
    },
    {
      title: 'المنافذ والبروتوكولات والجدران النارية',
      desc: 'التحكم في المنافذ الشائعة (HTTP:80, HTTPS:443, DNS:53, SSH:22) وحمايتها عبر جدران الحماية وقوائم ACLs.',
      icon: ShieldCheck,
      tag: 'حماية وتصفية'
    }
  ];

  return (
    <section id="networks" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-40 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold">
              <Network className="w-4 h-4" />
              <span>القسم الثاني: هندسة الشبكات والاتصالات</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              مسار هندسة وتصميم الشبكات (Computer Networking)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              العمود الفقري للأمن السيبراني: تعلم كيف تتواصل الأجهزة، مسار الحزم الرقمية، وعنونة الشبكات المؤسسية باحترافية.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl shrink-0">
            <div className="text-center px-3">
              <span className="text-xl font-black font-mono text-cyan-600">45</span>
              <span className="text-[11px] text-slate-500 font-bold block">ساعة تدريب</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-3">
              <span className="text-xl font-black font-mono text-sky-600">8</span>
              <span className="text-[11px] text-slate-500 font-bold block">مواضيع متقدمة</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {networkTopics.map((topic, i) => {
          const Icon = topic.icon;
          return (
            <div
              key={i}
              className="bg-white border border-slate-200/90 hover:border-cyan-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-right flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {topic.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{topic.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{topic.desc}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-cyan-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>شامل التطبيق المعملي</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Mini-Lab: Ping & OSI Layer Visualizer */}
      <div className="bg-white border-2 border-cyan-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                مختبر تفاعلي: محاكي فحص الحزم والاتصال (Ping & Packet Inspector)
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
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedTarget === ip 
                    ? 'bg-cyan-500 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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

        {/* Hello Kitty Note & CTA */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-pink-700 bg-pink-50 border border-pink-200 px-3.5 py-1.5 rounded-full font-bold">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>نصيحة هيلو كيتي: يا رواء، لما تفهمين كيف تسافر الحزمة، ماكو أي هجوم بالشبكة يقدر يعصى عليج! 🎀🌐</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/tracks/networks"
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>استعراض مسار الشبكات الكامل</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
