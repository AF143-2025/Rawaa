import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'رواء | RAWAA Academy - منصة تعليم الشبكات ولينكس والأمن السيبراني',
  description: 'منصة رواء التعليمية العربية المتخصصة في تدريب وتأهيل مهندسي الشبكات، مدراء أنظمة Linux، وممارسي الأمن السيبراني عبر مختبرات عملية تفاعلية وتحديات واقعية.',
  keywords: ['شبكات', 'لينكس', 'أمن سيبراني', 'Linux', 'Networking', 'Cybersecurity', 'CTF', 'رواء', 'RAWAA'],
  authors: [{ name: 'RAWAA Academy' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-sky-400 selection:text-black">
        <Navbar />
        <main className="flex-1 pb-16 sm:pb-24">
          {children}
        </main>
      </body>
    </html>
  );
}
