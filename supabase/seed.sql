-- ====================================================================
-- منصة رواء | RAWAA Academy - Seed Data (PostgreSQL / Supabase)
-- ====================================================================

-- 1. Insert Learning Paths
INSERT INTO public.learning_paths (slug, title, title_en, description, icon, level, total_hours, color, order_num)
VALUES 
  ('networks', 'هندسة الشبكات والاتصالات', 'Computer Networking', 'تعلم أساسيات ومعمارية الشبكات من الصفر، نموذج OSI، بروتوكولات TCP/IP، Subnetting، وإعداد أجهزة التوجيه باحترافية.', 'Network', 'شامل', 45, '#06B6D4', 1),
  ('linux', 'إدارة أنظمة وسيرفرات Linux', 'Linux System Administration', 'انطلق في عالم الطرفية (Terminal)، إدارة الحزم، صلاحيات الملفات، خدمات النظام Systemd، وأتمتة المهام وتأمين الخوادم.', 'Terminal', 'شامل', 40, '#10B981', 2),
  ('cybersecurity', 'الأمن السيبراني والدفاع الرقمي', 'Cybersecurity & Cyber Defense', 'أتقن مفاهيم أمن المعلومات، الحماية الاستباقية، تحليل التهديدات، أمن الويب ومخاطر OWASP Top 10، وأساسيات SOC.', 'Shield', 'شامل', 55, '#8B5CF6', 3),
  ('labs', 'المختبرات العملية والتحديات التفاعلية', 'Hands-on Labs & CTF', 'بيئات تطبيقية معزولة ومحاكيات ذكية تتيح لك كتابة الأوامر، تصميم الشبكات، تحليل السجلات، وحل تحديات CTF.', 'Cpu', 'شامل', 30, '#38BDF8', 4)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Core Courses
INSERT INTO public.courses (id, slug, path_slug, title, description, level, duration_hours, prerequisites, learning_objectives, cover_image, is_published)
VALUES 
  (
    'a1b2c3d4-0001-0000-0000-000000000001',
    'network-fundamentals',
    'networks',
    'أساسيات الشبكات وعنونة IP للمبتدئين',
    'دورة شاملة ومبسطة تنقلك من الصفر لفهم كيف تتصل الأجهزة ببعضها، كيفية عمل الإنترنت، نموذج OSI، وعنونة IPv4 وSubnetting بالتطبيق العملي.',
    'مبتدئ',
    12,
    '["معرفة أساسية باستخدام الحاسوب", "لا يشترط أي خلفية برمجية مسبقة"]'::jsonb,
    '["فهم نموذج OSI المكون من 7 طبقات بالتفصيل", "التمييز بين العناوين الخاصة والعامة", "حساب الشبكات الفرعية Subnetting وCIDR", "استخدام أوامر التشخيص ping وtraceroute"]'::jsonb,
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    true
  ),
  (
    'a1b2c3d4-0002-0000-0000-000000000002',
    'linux-essentials',
    'linux',
    'دليل لينكس العملي: من الطرفية إلى إدارة السيرفرات',
    'الدورة التطبيقية الأكثر شمولاً لاحتراف سطر الأوامر في Linux، إدارة الملفات، الصلاحيات، المستخدمين، العمليات، وأتمتة السكربتات.',
    'مبتدئ',
    14,
    '["الرغبة في التعامل مع الأنظمة عبر سطر الأوامر"]'::jsonb,
    '["التحكم الكامل في سطر الأوامر وموجه Bash", "إدارة الملفات والمجلدات والتراخيص بأمان تام عبر chmod وchown", "مراقبة موارد النظام والعمليات عبر systemctl وtop"]'::jsonb,
    'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
    true
  ),
  (
    'a1b2c3d4-0003-0000-0000-000000000003',
    'cybersecurity-foundations',
    'cybersecurity',
    'الأساسيات الدفاعية للأمن السيبراني وحماية النظم',
    'تعلم التفكير كخبير دفاعي سيبراني: مفاهيم الحماية، التشفير، اكتشاف التهديدات، تحليل السجلات، وأمن تطبيقات الويب لحماية الأصول الرقمية.',
    'متوسط',
    18,
    '["إلمام بأساسيات الشبكات (TCP/IP)", "معرفة أساسية بنظام Linux"]'::jsonb,
    '["استيعاب أركان أمن المعلومات الثلاثة (CIA Triad)", "فهم خوارزميات التشفير والتجزئة", "كشف وتحليل هجمات الويب OWASP Top 10", "تحليل السجلات الأمنية لاكتشاف الهجمات"]'::jsonb,
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Challenges
INSERT INTO public.challenges (title, slug, category, difficulty, points, description, instructions, hints, flag)
VALUES 
  (
    'صائد الملفات المخفية في لينكس',
    'find-hidden-linux-secret',
    'linux',
    'سهل',
    50,
    'تم إخفاء رسالة سرية داخل أحد المجلدات في نظام الملفات. استخدم مهاراتك في سطر الأوامر للوصول إليها واستخراج العلم.',
    'استعرض المجلد الحالي بما فيه الملفات المخفية عبر ls -la، ادخل للمجلد .secret_vault واقرأ محتوى flag.txt.',
    '["الملفات المخفية في Linux تبدأ بنقطة (.)", "استخدم ls -la لرؤية الملفات المخفية"]'::jsonb,
    'RAWAA{linux_cli_master_2026}'
  ),
  (
    'تحدي حساب عنوان البث والشبكة (Subnetting)',
    'subnet-broadcast-hunter',
    'network',
    'سهل',
    75,
    'لديك جهاز يحمل عنوان IP: 192.168.10.68 وقناع /27. احسب عنوان البث (Broadcast Address) لهذه الشبكة الفرعية.',
    'احسب عنوان البث وسلم الإجابة بالشكل: RAWAA{Broadcast_IP}.',
    '["قناع /27 يقسم الشبكة لكتل بحجم 32", "العنوان 68 يقع في شبكة 64", "عنوان البث هو 192.168.10.95"]'::jsonb,
    'RAWAA{192.168.10.95}'
  ),
  (
    'المحقق الرقمي: كشف هجوم القوة الغاشمة (Brute-force)',
    'auth-log-investigation',
    'cybersecurity',
    'متوسط',
    100,
    'تعرض خادم الشركة لمحاولات دخول مريبة عبر SSH. افحص السجل المرفق في مختبر الأمن واستخرج عنوان IP المهاجم.',
    'افحص /var/log/auth.log وحدد الـ IP الذي نفذ أكثر من 10 محاولات فاشلة.',
    '["ابحث عن Failed password for root"]'::jsonb,
    'RAWAA{198.51.100.42}'
  ),
  (
    'تحدي فك الشفرة: رسالة الموجه السرية',
    'base64-router-secret',
    'ctf',
    'سهل',
    60,
    'التقطت وحدة مراقبة الشبكة رسالة مشفرة بترميز Base64: UkFXQUF7bmV0d29ya19wYWNrZXRzX25ldmVyX2xpZX0=. فك التشفير للحصول على العلم.',
    'فك ترميز Base64 لاستخراج العلم.',
    '["استخدم echo text | base64 -d"]'::jsonb,
    'RAWAA{network_packets_never_lie}'
  )
ON CONFLICT (slug) DO NOTHING;

-- 4. Insert Achievements
INSERT INTO public.achievements (title, description, icon, badge_color, points_required)
VALUES 
  ('الخطوة الأولى', 'إكمال أول درس تعليمي في منصة رواء', 'Compass', '#06B6D4', 10),
  ('سيد الطرفية', 'إتمام أول مهمة تفاعلية في مختبر أوامر Linux', 'Terminal', '#10B981', 50),
  ('معماري الشبكات', 'اجتياز اختبار الشبكات وحسابات Subnetting بنجاح', 'Network', '#38BDF8', 100),
  ('حارس الثغرات', 'حل أول تحدٍ أمني وتحليل سجلات الاختراق بنجاح', 'ShieldCheck', '#8B5CF6', 150),
  ('المتخرج المعتمد', 'إكمال دورة كاملة والحصول على شهادة إتمام رسمية', 'Award', '#F59E0B', 200)
ON CONFLICT DO NOTHING;

-- 5. Insert Sample Announcements
INSERT INTO public.announcements (title, content, type, is_active)
VALUES 
  ('أهلاً بك في منصة رواء التعليمية', 'تم إطلاق النسخة الرسمية من المنصة مع مختبرات لينكس والشبكات التفاعلية ونظام الشهادات الرقمية.', 'success', true),
  ('تحديات CTF جديدة متاحة الآن!', 'تمت إضافة تحديات صيد الأعلام في مسار الأمن السيبراني. اختبر قدراتك الدفاعية واكسب نقاط إضافية.', 'info', true);
