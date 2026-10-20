import { 
  LearningPath, 
  Course, 
  CourseModule, 
  Quiz, 
  Challenge, 
  Achievement, 
  Certificate,
  Announcement 
} from '@/types';

export const INITIAL_TRACKS: LearningPath[] = [
  {
    id: 'track-0',
    slug: 'foundations',
    title: 'الأساسات التقنية وأساسيات الحاسوب',
    title_en: 'Computer & IT Foundations',
    description: 'المفاهيم التأسيسية التي يبنى عليها كل علم تقني: معمارية الحاسوب، نظم التشغيل، كيف يعمل الإنترنت، ومفاهيم الحماية الرقمية الأولى.',
    icon: 'Shield',
    level: 'مبتدئ',
    total_hours: 25,
    color: '#0284C7',
    order_num: 1,
    topics: [
      'معمارية الحاسوب ونظم التشغيل والذاكرة (RAM & CPU)',
      'كيف يتصل الحاسوب بالإنترنت ومسار طلبات الويب (DNS, IP, HTTP)',
      'مثلث أمن المعلومات (CIA Triad: السرية، السلامة، التوافر)',
      'أساسيات التشفير (Cryptography) والتجزئة (Hashing)',
      'أنواع التهديدات السيبرانية والهندسة الاجتماعية (Social Engineering)',
      'إدارة كلمات المرور وتأمين الحسابات والمصادقة الثنائية 2FA'
    ]
  },
  {
    id: 'track-1',
    slug: 'networks',
    title: 'هندسة الشبكات والاتصالات',
    title_en: 'Computer Networking',
    description: 'تعلم أساسيات ومعمارية الشبكات من الصفر، نموذج OSI، بروتوكولات TCP/IP، Subnetting، وإعداد أجهزة التوجيه والجدران النارية باحترافية.',
    icon: 'Network',
    level: 'شامل',
    total_hours: 45,
    color: '#06B6D4',
    order_num: 2,
    topics: [
      'أساسيات الشبكات وطوبولوجيا الربط',
      'نموذج OSI السبع طبقات ونموذج TCP/IP',
      'عنونة IPv4 وIPv6 وتقسيم الشبكات Subnetting & CIDR',
      'بروتوكولات DNS, DHCP, ARP, ICMP',
      'TCP مقابل UDP وإدارة المنافذ Ports',
      'Switching وVLANs وRouting وRouting Protocols',
      'أساسيات الجدران النارية وقوائم التحكم بالوصول ACLs',
      'استكشاف الأعطال وحزم Wireshark'
    ]
  },
  {
    id: 'track-2',
    slug: 'linux',
    title: 'إدارة أنظمة وسيرفرات Linux',
    title_en: 'Linux System Administration',
    description: 'انطلق في عالم الطرفية (Terminal)، إدارة الحزم، صلاحيات الملفات، خدمات النظام Systemd، وأتمتة المهام عبر Bash Scripting وتأمين الخوادم.',
    icon: 'Terminal',
    level: 'شامل',
    total_hours: 40,
    color: '#10B981',
    order_num: 3,
    topics: [
      'مقدمة في نواة Linux وتوزيعاته (Debian, Ubuntu, RHEL)',
      'إتقان أوامر الطرفية والتنقل وإدارة الملفات والمجلدات',
      'نظام الصلاحيات المتقدم وتصاريح المستخدمين والمجموعات',
      'إدارة العمليات والخدمات والجدولة (Cron jobs & Systemd)',
      'إدارة الشبكات والاتصال الآمن عبر SSH ومفاتيح التشفير',
      'برمجة سكربتات Bash Scripting للأتمتة',
      'قراءة وفحص سجلات النظام System Logs وتحليلها',
      'تقوية وتأمين نظام لينكس Linux Hardening'
    ]
  },
  {
    id: 'track-5',
    slug: 'programming',
    title: 'البرمجة والأتمتة (Python & Bash)',
    title_en: 'Cyber Programming & Automation',
    description: 'تحويل المهام الروتينية إلى أدوات ذكية، كتابة سكربتات فحص الشبكات واستكشاف الثغرات وتطوير أدوات الحماية باستخدام Python و Bash.',
    icon: 'Terminal',
    level: 'شامل',
    total_hours: 35,
    color: '#F59E0B',
    order_num: 4,
    topics: [
      'أساسيات لغة Python من الصفر حتى كتابة برامج متكاملة',
      'التعامل مع الشبكات والمقابس (Sockets) وبروتوكول HTTP عبر Requests',
      'بناء أدوات فحص المنافذ التلقائية (Port Scanners)',
      'كتابة سكربتات باش (Bash Scripting) لأتمتة إدارة السيرفرات',
      'معالجة النصوص وتحليل السجلات الأمنية عبر Regular Expressions (Regex)',
      'أتمتة الفحص الأمني وجمع المعلومات الاستخباراتية مفتوحة المصدر (OSINT)'
    ]
  },
  {
    id: 'track-3',
    slug: 'cybersecurity',
    title: 'الأمن السيبراني والدفاع الرقمي',
    title_en: 'Cybersecurity & Cyber Defense',
    description: 'أتقن مفاهيم أمن المعلومات، الحماية الاستباقية، تحليل التهديدات، أمن الويب ومخاطر OWASP Top 10، وأساسيات عمليات SOC والاستجابة للحوادث.',
    icon: 'Shield',
    level: 'شامل',
    total_hours: 55,
    color: '#8B5CF6',
    order_num: 5,
    topics: [
      'مبادئ أمن المعلومات ومثلث السرية والسلامة والتوافر CIA Triad',
      'أساسيات التشفير المتناظر وغير المتناظر والتواقيع الرقمية',
      'أمن الشبكات واكتشاف التسلل IDS/IPS والجدران النارية',
      'أمن تطبيقات الويب وفهم ثغرات OWASP Top 10 (SQLi, XSS, CSRF)',
      'مبادئ اختبار الاختراق الأخلاقي والتقييم الأمني المصرح به',
      'مراكز العمليات الأمنية SOC وأدوات إدارة الأحداث SIEM',
      'تحليل الحوادث الرقمية والاستجابة للطوارئ Incident Response',
      'التدريب على سيناريوهات دفاعية حقيقية وتحديات CTF'
    ]
  },
  {
    id: 'track-4',
    slug: 'labs',
    title: 'المختبرات العملية والتحديات التفاعلية',
    title_en: 'Hands-on Labs & CTF',
    description: 'بيئات تطبيقية معزولة ومحاكيات ذكية تتيح لك كتابة الأوامر، تصميم الشبكات، تحليل السجلات الأمنية، وحل تحديات CTF مباشرة في المتصفح.',
    icon: 'Cpu',
    level: 'شامل',
    total_hours: 30,
    color: '#38BDF8',
    order_num: 6,
    topics: [
      'مختبر الطرفية الافتراضي التفاعلي لأوامر Linux',
      'محاكي الشبكات وحاسبة Subnetting التفاعلية',
      'مختبر تحليل سجلات المصادقة وكشف محاولات الاختراق',
      'مختبر كشف ثغرات الويب التجريبية',
      'تحديات صيد الأعلام (CTF) التعليمية المتدرجة الصعوبة',
      'مشاريع وتطبيقات واقعية للتحقق من المهارات'
    ]
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-foundations-101',
    slug: 'it-foundations-essentials',
    path_slug: 'foundations',
    title: 'الأساسات الرقمية الشاملة لمهندسي المستقبل',
    description: 'انطلاقة مثالية للمبتدئين لفهم كيف تعمل الحواسيب والإنترنت والتشفير، وبناء قاعدة معرفية صلبة للانتقال إلى الشبكات ولينكس والأمن.',
    level: 'مبتدئ',
    duration_hours: 10,
    prerequisites: ['لا يشترط أي معرفة برمجية أو تقنية مسبقة'],
    learning_objectives: [
      'فهم البنية الأساسية للحاسوب والمعالج والذاكرة',
      'معرفة كيف تسافر رسائل الإنترنت ومفهوم الـ IP والـ DNS',
      'استيعاب مثلث الحماية والأمن الرقمي CIA Triad',
      'مبادئ التشفير المتناظر وغير المتناظر والتجزئة',
      'طرق الحماية من التصيد والهندسة الاجتماعية'
    ],
    cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    total_lessons: 4,
    created_at: '2026-02-10T10:00:00Z'
  },
  {
    id: 'course-prog-101',
    slug: 'python-cyber-automation',
    path_slug: 'programming',
    title: 'برمجة بايثون للأمن السيبراني وأتمتة الشبكات',
    description: 'دورة عملية مكثفة تركز على توظيف Python وBash في كتابة أدوات الفحص، الاتصال بالمنافذ، وسحب البيانات وتحليل السجلات بأمان.',
    level: 'مبتدئ إلى متوسط',
    duration_hours: 16,
    prerequisites: ['معرفة بسيطة باستخدام الحاسوب أو لغة لينكس'],
    learning_objectives: [
      'إتقان المتغيرات، الدوال، والهياكل البيانية في Python',
      'برمجة أداة فحص منافذ متزامنة باستخدام مكتبة socket',
      'سحب وتحليل استجابات الويب والترويسات Headers عبر requests',
      'كتابة سكربتات باش لأتمتة فحص وتأمين السيرفرات',
      'فلترة ملفات الـ Access Logs واستخراج محاولات الاختراق'
    ],
    cover_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    total_lessons: 4,
    created_at: '2026-02-15T10:00:00Z'
  },
  {
    id: 'course-net-101',
    slug: 'network-fundamentals',
    path_slug: 'networks',
    title: 'أساسيات الشبكات وعنونة IP للمبتدئين',
    description: 'دورة شاملة ومبسطة تنقلك من الصفر لفهم كيف تتصل الأجهزة ببعضها، كيفية عمل الإنترنت، نموذج OSI، وعنونة IPv4 وSubnetting بالتطبيق العملي.',
    level: 'مبتدئ',
    duration_hours: 12,
    prerequisites: ['معرفة أساسية باستخدام الحاسوب', 'لا يشترط أي خلفية برمجية مسبقة'],
    learning_objectives: [
      'فهم نموذج OSI المكون من 7 طبقات ونموذج TCP/IP بالتفصيل',
      'التمييز بين العناوين الخاصة (Private IP) والعناوين العامة (Public IP)',
      'حساب الشبكات الفرعية Subnetting وCIDR بدقة وسرعة',
      'استخدام أوامر فحص الاتصال مثل ping وtraceroute وnslookup',
      'فهم آلية تبادل البيانات عبر TCP وUDP والمنافذ الشائعة'
    ],
    cover_image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    total_lessons: 4,
    created_at: '2026-01-15T10:00:00Z'
  },
  {
    id: 'course-linux-101',
    slug: 'linux-essentials',
    path_slug: 'linux',
    title: 'دليل لينكس العملي: من الطرفية إلى إدارة السيرفرات',
    description: 'الدورة التطبيقية الأكثر شمولاً لاحتراف سطر الأوامر في Linux، إدارة الملفات، الصلاحيات، المستخدمين، العمليات، وأتمتة السكربتات.',
    level: 'مبتدئ',
    duration_hours: 14,
    prerequisites: ['الرغبة في التعامل مع الأنظمة عبر سطر الأوامر'],
    learning_objectives: [
      'التحكم الكامل في سطر الأوامر وموجه Bash',
      'إدارة الملفات والمجلدات والتراخيص بأمان تام عبر chmod وchown',
      'مراقبة موارد النظام والعمليات والخدمات عبر systemctl وtop',
      'إدارة الحزم وتحديث وتأمين خوادم Ubuntu وDebian',
      'الاتصال عن بعد بالخوادم عبر بروتوكول SSH ومفاتيح التشفير'
    ],
    cover_image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    total_lessons: 4,
    created_at: '2026-01-18T10:00:00Z'
  },
  {
    id: 'course-cyber-101',
    slug: 'cybersecurity-foundations',
    path_slug: 'cybersecurity',
    title: 'الأساسيات الدفاعية للأمن السيبراني وحماية النظم',
    description: 'تعلم التفكير كخبير دفاعي سيبراني: مفاهيم الحماية، التشفير، اكتشاف التهديدات، تحليل السجلات، وأمن تطبيقات الويب لحماية الأصول الرقمية.',
    level: 'متوسط',
    duration_hours: 18,
    prerequisites: ['إلمام بأساسيات الشبكات (TCP/IP)', 'معرفة أساسية بنظام Linux'],
    learning_objectives: [
      'استيعاب أركان أمن المعلومات الثلاثة (Confidentiality, Integrity, Availability)',
      'فهم خوارزميات التشفير والتجزئة (Hashing vs Encryption)',
      'كشف وتحليل هجمات الويب الأكثر انتشاراً من قائمة OWASP Top 10',
      'فحص وتحليل سجلات النظام لاكتشاف محاولات التسلل وهجمات القوة الغاشمة Brute-force',
      'التعامل السليم مع الحوادث الأمنية وخطوات الاستجابة لها'
    ],
    cover_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    total_lessons: 4,
    created_at: '2026-02-01T10:00:00Z'
  },
  {
    id: 'course-net-201',
    slug: 'advanced-routing-switching',
    path_slug: 'networks',
    title: 'التوجيه والتبديل المتقدم وتصميم الشبكات',
    description: 'تعمق في تقنيات الشبكات المؤسسية: بروتوكولات التوجيه الديناميكي (OSPF)، الشبكات الافتراضية (VLANs)، وتأمين المنافذ والجدران النارية.',
    level: 'متقدم',
    duration_hours: 20,
    prerequisites: ['إتمام دورة أساسيات الشبكات أو ما يعادلها'],
    learning_objectives: [
      'إعداد وتقسيم الشبكات الافتراضية VLANs وعمليات Trunking 802.1Q',
      'فهم التوجيه بين الشبكات الافتراضية Inter-VLAN Routing',
      'تكوين بروتوكول التوجيه الديناميكي OSPF وفهم خوارزمية Dijkstra',
      'تطبيق قواعد الجدران النارية وقوائم الوصول Access Control Lists (ACLs)'
    ],
    cover_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    is_published: true,
    total_lessons: 3,
    created_at: '2026-02-10T10:00:00Z'
  }
];

export const INITIAL_MODULES: CourseModule[] = [
  // Modules for Network Fundamentals
  {
    id: 'mod-net-1',
    course_id: 'course-net-101',
    title: 'الوحدة الأولى: مدخل إلى عالم الشبكات ونموذج الاتصال',
    description: 'التعرف على اللبنات الأساسية للشبكات وطبقات نقل البيانات.',
    order_num: 1,
    lessons: [
      {
        id: 'lesson-net-1',
        module_id: 'mod-net-1',
        course_id: 'course-net-101',
        title: 'مقدمة في الشبكات ونموذج OSI السبع طبقات',
        slug: 'intro-to-osi-model',
        duration_minutes: 25,
        order_num: 1,
        is_published: true,
        content: `
# مقدمة في الشبكات ونموذج OSI

أهلاً بك في منصة **رواء التعليمية**. في هذا الدرس التأسيسي، سنتعرف على الركيزة الأساسية التي بنيت عليها جميع شبكات الحاسوب الحديثة والإنترنت: **نموذج OSI (Open Systems Interconnection)**.

## لماذا نحتاج نموذجاً للشبكات؟
في بدايات الحواسيب، كانت كل شركة مصنّعة تبني أجهزة وبروتوكولات تعمل فقط مع منتجاتها، مما كان يجعل اتصال جهاز من شركة مع جهاز من شركة أخرى مستحيلاً تقريباً. في عام 1984، قامت المنظمة الدولية للمعايير (ISO) بإنشاء نموذج OSI كإطار مرجعي يوحد المعايير الدولية لنقل البيانات.

---

## طبقات نموذج OSI السبع (من 7 إلى 1)

\`\`\`
7. طبقة التطبيقات (Application Layer)  - HTTP, HTTPS, DNS, SSH
6. طبقة التقديم (Presentation Layer)   - SSL/TLS, التشفير والضغط
5. طبقة الجلسة (Session Layer)          - إدارة وبدء وإنهاء الاتصال
4. طبقة النقل (Transport Layer)        - TCP, UDP, أرقام المنافذ (Ports)
3. طبقة الشبكة (Network Layer)         - IP Addresses, Routing, الحزم (Packets)
2. طبقة ربط البيانات (Data Link Layer) - MAC Addresses, Switches, الإطارات (Frames)
1. الطبقة المادية (Physical Layer)     - الكابلات، الإشارات، الإرسال اللاسلكي، البتات (Bits)
\`\`\`

### 1. الطبقة المادية (Physical Layer)
مسؤولة عن نقل الإشارات الكهربائية أو الضوئية أو الموجات الراديوية. الوحدة الأساسية هنا هي **البتات (Bits: 0 و 1)**.

### 2. طبقة ربط البيانات (Data Link Layer)
تتعامل مع العناوين الفيزيائية المعروفة بـ **MAC Address**، والأجهزة التي تعمل هنا هي الـ **Switches**. وحدة البيانات تسمى **إطار (Frame)**.

### 3. طبقة الشبكة (Network Layer)
أهم طبقة للتوجيه واختيار أفضل مسار لنقل البيانات بين شبكات مختلفة باستخدام **عناوين IP**. الجهاز الأساسي هنا هو **الموجّه (Router)**، ووحدة البيانات تسمى **حزمة (Packet)**.

### 4. طبقة النقل (Transport Layer)
تتحكم في موثوقية نقل البيانات وتدفقها وتقسيم الرسائل الكبيرة إلى **قطع (Segments)**. هنا نجد بروتوكولين رئيسيين:
- **TCP**: بروتوكول موثوق ومتحقق من الوصول (Connection-oriented).
- **UDP**: بروتوكول سريع بدون انتظار تأكيد (Connectionless).

---

## مقارنة نموذج OSI مع نموذج TCP/IP
نموذج TCP/IP هو النموذج المطبق عملياً على أرض الواقع ويتكون من 4 طبقات:
1. Application Layer (تدمج الطبقات 7 و 6 و 5)
2. Transport Layer (تقابل الطبقة 4)
3. Internet Layer (تقابل الطبقة 3)
4. Network Access Layer (تدمج الطبقات 2 و 1)

> **قاعدة ذهبية للمهندس:**
> عند تشخيص أي عطل في الشبكة، ابدأ دائماً بالطبقة 1 (هل الكابل موصول؟ هل هناك إشارة؟) ثم تدرج للأعلى، أو ابدأ بالطبقة 7 وتحقق من صحة الخدمة.
        `,
        practical_exercise: {
          type: 'network',
          title: 'محاكاة طبقات الشبكة',
          instructions: 'استخدم حاسبة الشبكات وتدرب على فهم الفرق بين TCP وUDP في مختبر الشبكات التفاعلي.'
        }
      },
      {
        id: 'lesson-net-2',
        module_id: 'mod-net-1',
        course_id: 'course-net-101',
        title: 'عنونة IPv4 وتقسيم الشبكات Subnetting وCIDR',
        slug: 'ipv4-addressing-and-subnetting',
        duration_minutes: 35,
        order_num: 2,
        is_published: true,
        content: `
# عنونة IPv4 وتقسيم الشبكات (Subnetting)

عنوان IPv4 يتكون من **32 بت** مقسمة إلى **4 خانات (Octets)**، كل خانة تتكون من 8 بت وقيمتها العشرية تتراوح بين 0 و 255.

مثال: \`192.168.1.50\`

---

## هيكل عنوان IP وقناع الشبكة (Subnet Mask)
يتكون أي عنوان IP من جزأين:
1. **معرف الشبكة (Network ID):** يحدد اسم أو رقم الشبكة التي ينتمي إليها الجهاز.
2. **معرف الجهاز (Host ID):** يحدد الجهاز المحدد داخل تلك الشبكة.

يحدد **قناع الشبكة (Subnet Mask)** أين ينتهي جزء الشبكة وأين يبدأ جزء الأجهزة.

مثال:
- عنوان IP: \`192.168.1.10\`
- قناع الشبكة: \`255.255.255.0\` (أو بصيغة CIDR: \`/24\`)
- هنا جزء الشبكة هو \`192.168.1\`، وجزء الجهاز هو \`.10\`.

---

## ما هو الـ Subnetting ولماذا نستخدمه؟
تقسيم الشبكات هو عملية تجزئة شبكة كبيرة واحدة إلى شبكات فرعية أصغر وأكثر كفاءة لأسباب:
1. **تقليل البث العشوائي (Broadcast Domain):** مما يحسن سرعة الشبكة.
2. **الأمان (Security):** عزل الأقسام الحساسة (مثل الخوادم أو المالية) عن بقية المستخدمين.
3. **الحفاظ على العناوين:** عدم إهدار عناوين IP غير المستغلة.

### القوانين الرياضية للـ Subnetting:
- عدد الشبكات المتاحة = \`2^n\` (حيث n هو عدد البتات المستعارة من جزء الأجهزة).
- عدد الأجهزة لكل شبكة = \`2^h - 2\` (حيث h هو عدد البتات المتبقية للأجهزة).
- نطرح 2 دائماً لأن أول عنوان محجوز كـ **Network Address**، وآخر عنوان محجوز كـ **Broadcast Address**.

---

## جدول أشهر أقنعة CIDR الشائعة:
| CIDR | Subnet Mask | عدد الأجهزة المتاحة لكل شبكة |
| :--- | :--- | :--- |
| \`/24\` | 255.255.255.0 | 254 جهاز |
| \`/25\` | 255.255.255.128 | 126 جهاز |
| \`/26\` | 255.255.255.192 | 62 جهاز |
| \`/27\` | 255.255.255.224 | 30 جهاز |
| \`/28\` | 255.255.255.240 | 14 جهاز |
| \`/30\` | 255.255.255.252 | جهازان فقط (مناسب للربط بين موجّهين) |
        `
      }
    ]
  },
  {
    id: 'mod-net-2',
    course_id: 'course-net-101',
    title: 'الوحدة الثانية: البروتوكولات التأسيسية وأدوات التشخيص',
    description: 'التعرف على بروتوكولات DNS وDHCP وأدوات فحص الاتصال.',
    order_num: 2,
    lessons: [
      {
        id: 'lesson-net-3',
        module_id: 'mod-net-2',
        course_id: 'course-net-101',
        title: 'بروتوكولات التوجيه التلقائي: DNS وDHCP وARP',
        slug: 'dns-dhcp-arp-protocols',
        duration_minutes: 30,
        order_num: 1,
        is_published: true,
        content: `
# بروتوكولات DNS وDHCP وARP

لكي تتمكن أجهزة الشبكة من التخاطب بسهولة مع بعضها ومع العالم الخارجي، تعمل مجموعة من الخدمات التلقائية في الخلفية.

---

## 1. بروتوكول DNS (نظام أسماء النطاقات)
الـ DNS هو "دليل هاتف الإنترنت". البشر يتذكرون الأسماء مثل \`rawaa-academy.com\`، بينما الحواسيب تتعامل مع عناوين IP مثل \`104.21.55.2\`.
- يعمل على المنفذ **Port 53 (UDP عادة)**.
- التسلسل الهرمي: Root Servers -> TLD Servers (.com) -> Authoritative Nameservers.

## 2. بروتوكول DHCP (الإعداد التلقائي للمضيف)
بدلاً من ضبط IP وقناع الشبكة والبوابة الافتراضية يدوياً في كل جهاز، يقوم خادم DHCP بتوزيعها تلقائياً.
- عملية **DORA**:
  1. **Discover:** يرسل الجهاز طلباً يبحث عن خادم DHCP.
  2. **Offer:** يقدم الخادم عرضاً بعنوان IP متاح.
  3. **Request:** يطلب الجهاز رسمياً حجز هذا العنوان.
  4. **Acknowledge:** يؤكد الخادم الحجز ويسلم الإعدادات.

## 3. بروتوكول ARP (بروتوكول تحليل العناوين)
يربط بين عنوان الطبقة الثالثة (IP) وعنوان الطبقة الثانية (MAC Address) داخل نفس الشبكة المحلية.
        `
      },
      {
        id: 'lesson-net-4',
        module_id: 'mod-net-2',
        course_id: 'course-net-101',
        title: 'المنافذ والبروتوكولات الشائعة وأوامر التشخيص',
        slug: 'ports-and-troubleshooting',
        duration_minutes: 25,
        order_num: 2,
        is_published: true,
        content: `
# المنافذ وأوامر تشخيص الشبكة

لكل تطبيق أو خدمة رقم منفذ (Port) خاص بها يتراوح بين 0 و 65535.

## أشهر المنافذ التي يجب حفظها:
- **20 / 21:** FTP (نقل الملفات)
- **22:** SSH (الاتصال الآمن بالخوادم)
- **25:** SMTP (إرسال البريد)
- **53:** DNS (حل الأسماء)
- **80:** HTTP (تصفح الويب غير المشفر)
- **443:** HTTPS (تصفح الويب المشفر والمحمي)
- **3389:** RDP (سطح المكتب البعيد في Windows)

## أدوات التشخيص الأساسية:
- \`ping <host>\`: فحص إمكانية الوصول وقياس زمن الاستجابة (Latency) عبر ICMP.
- \`traceroute <host>\` (أو \`tracert\` في ويندوز): تتبع المسار ومعرفة القفزات (Hops) بين جهازك والهدف.
- \`netstat -tuln\` أو \`ss -tuln\`: عرض المنافذ المفتوحة والمستمعة على جهازك.
        `
      }
    ]
  },

  // Modules for Linux Essentials
  {
    id: 'mod-linux-1',
    course_id: 'course-linux-101',
    title: 'الوحدة الأولى: البداية مع سطر الأوامر ونظام الملفات',
    description: 'إتقان التوجيه والتنقل وإنشاء وإدارة الملفات داخل لينكس.',
    order_num: 1,
    lessons: [
      {
        id: 'lesson-linux-1',
        module_id: 'mod-linux-1',
        course_id: 'course-linux-101',
        title: 'أوامر الطرفية الأساسية والتنقل في نظام الملفات',
        slug: 'terminal-basics-navigation',
        duration_minutes: 25,
        order_num: 1,
        is_published: true,
        content: `
# أوامر الطرفية الأساسية في Linux

أهلاً بك في نظام Linux، النظام المفضل لتشغيل أكثر من 90% من خوادم العالم وأنظمة الحوسبة السحابية وأجهزة الأمن السيبراني.

## شجرة ملفات Linux الهرمية
في Linux، كل شيء يبدأ من الجذر **الجذر \`/\` (Root)**، ولا يوجد محركات أقراص مثل C: أو D: كما في ويندوز.
- \`/home\`: مجلدات المستخدمين الشخصية.
- \`/etc\`: ملفات إعداد وتكوين النظام والخدمات.
- \`/var/log\`: سجلات النظام والأحداث الأمنية.
- \`/bin\` و \`/usr/bin\`: البرامج والأوامر التنفيذية.

---

## أهم الأوامر الأساسية:
\`\`\`bash
pwd        # طباعة مسار المجلد الحالي (Print Working Directory)
ls         # استعراض الملفات والمجلدات
ls -la     # استعراض كافة الملفات بما فيها المخفية مع التفاصيل والصلاحيات
cd <dir>   # الانتقال إلى مجلد محدد
cd ..      # الرجوع خطوة واحدة للمجلد الأب
cd ~       # الانتقال لمجلد المستخدم الرئيسي Home
mkdir test # إنشاء مجلد جديد باسم test
touch file # إنشاء ملف نصي فارغ باسم file
cat file   # قراءة وعرض محتوى الملف على الشاشة
clear      # مسح شاشة الطرفية
\`\`\`

> جرب هذه الأوامر الآن مباشرة في **مختبر لينكس التفاعلي** المدمج في المنصة!
        `,
        practical_exercise: {
          type: 'terminal',
          title: 'مهمة التنقل وإنشاء الملفات',
          instructions: 'افتح مختبر Linux، واستعرض محتويات المجلد، وأنشئ مجلداً باسم projects وملفاً باسم notes.txt.'
        }
      },
      {
        id: 'lesson-linux-2',
        module_id: 'mod-linux-1',
        course_id: 'course-linux-101',
        title: 'نظام الصلاحيات Permissions ومستخدمي النظام',
        slug: 'file-permissions-and-users',
        duration_minutes: 30,
        order_num: 2,
        is_published: true,
        content: `
# صلاحيات الملفات والمستخدمين في Linux

نظام الصلاحيات في لينكس هو خط الدفاع الأول لمنع البرمجيات الخبيثة والمستخدمين غير المصرح لهم من العبث بملفات النظام.

---

## قراءة الصلاحيات:
عند تنفيذ \`ls -l\` تظهر الأذونات بهذا الشكل:
\`-rwxr-xr-- 1 student dev 2048 Oct 19 12:00 script.sh\`

تتكون الرموز العشرة الأولى من:
1. الرمز الأول: نوع الملف (\`-\` ملف عادي، \`d\` مجلد).
2. الرموز الثلاثة التالية: صلاحيات **المالك (Owner - u)**.
3. الرموز الثلاثة التالية: صلاحيات **المجموعة (Group - g)**.
4. الرموز الثلاثة الأخيرة: صلاحيات **الآخرين (Others - o)**.

المعاني:
- \`r\` (Read = 4): القراءة.
- \`w\` (Write = 2): الكتابة والتعديل.
- \`x\` (Execute = 1): التشغيل والتنفيذ.

---

## أوامر تغيير الصلاحيات:
\`\`\`bash
chmod 755 script.sh   # إعطاء المالك كامل الصلاحيات (7) والآخرين قراءة وتشغيل (5)
chmod +x script.sh    # جعل الملف قابلاً للتشغيل
chown user:group file # تغيير مالك الملف ومجموعته
\`\`\`
        `
      }
    ]
  },
  {
    id: 'mod-linux-2',
    course_id: 'course-linux-101',
    title: 'الوحدة الثانية: العمليات، الخدمات، وسجلات النظام',
    description: 'مراقبة وإدارة أداء الخادم وتحليل السجلات الأمنية.',
    order_num: 2,
    lessons: [
      {
        id: 'lesson-linux-3',
        module_id: 'mod-linux-2',
        course_id: 'course-linux-101',
        title: 'إدارة العمليات ومراقبة موارد النظام',
        slug: 'process-management-systemctl',
        duration_minutes: 25,
        order_num: 1,
        is_published: true,
        content: `
# إدارة العمليات وخدمات النظام

كل برنامج قيد التشغيل في Linux يعتبر عملية (Process) تحمل معرّفاً رقمياً فريداً يُسمى **PID (Process ID)**.

## أهم أوامر المراقبة:
- \`ps aux\`: عرض قائمة بجميع العمليات النشطة في النظام.
- \`top\` أو \`htop\`: شاشة تفاعلية حية تعرض استهلاك المعالج والذاكرة.
- \`kill -9 <PID>\`: إيقاف وإنهاء عملية بالقوة.

## إدارة الخدمات عبر Systemd:
\`\`\`bash
sudo systemctl status ssh     # التحقق من حالة خدمة SSH
sudo systemctl start nginx    # بدء تشغيل خادم الويب
sudo systemctl stop nginx     # إيقاف خادم الويب
sudo systemctl restart nginx  # إعادة تشغيل الخدمة
sudo systemctl enable nginx   # جعل الخدمة تبدأ تلقائياً عند إقلاع النظام
\`\`\`
        `
      },
      {
        id: 'lesson-linux-4',
        module_id: 'mod-linux-2',
        course_id: 'course-linux-101',
        title: 'قراءة وفحص سجلات النظام وتحليل الأخطاء',
        slug: 'system-logs-investigation',
        duration_minutes: 30,
        order_num: 2,
        is_published: true,
        content: `
# فحص وتحليل سجلات النظام (System Logs)

تعتبر السجلات في مجلد \`/var/log\` المنجم الذهبي لمهندس النظم وخبير الأمن السيبراني لاكتشاف محاولات الاختراق وتشخيص المشكلات.

## أهم ملفات السجلات:
- \`/var/log/auth.log\` (أو \`secure\` في RedHat): يسجل جميع محاولات تسجيل الدخول، استخدام \`sudo\`، ومحاولات الاتصال عبر SSH.
- \`/var/log/syslog\`: سجل عام للأحداث ورسائل نواة النظام.
- \`/var/log/nginx/access.log\`: سجل زوار ومواقع وتطبيقات الويب.

## أوامر البحث في السجلات:
\`\`\`bash
tail -f /var/log/auth.log            # متابعة السجل لحظة بلحظة وبشكل مباشر
grep "Failed password" /var/log/auth.log # استخراج محاولات كلمات المرور الخاطئة (هجمات Brute-force)
journalctl -xe                       # استعراض أحدث أخطاء النظام التفصيلية
\`\`\`
        `
      }
    ]
  },

  // Modules for Cybersecurity Foundations
  {
    id: 'mod-cyber-1',
    course_id: 'course-cyber-101',
    title: 'الوحدة الأولى: مبادئ أمن المعلومات ومثلث الحماية',
    description: 'المفاهيم التأسيسية التي تحكم الدفاع السيبراني والتشفير.',
    order_num: 1,
    lessons: [
      {
        id: 'lesson-cyber-1',
        module_id: 'mod-cyber-1',
        course_id: 'course-cyber-101',
        title: 'مثلث أمن المعلومات CIA ومفاهيم التهديدات',
        slug: 'cia-triad-and-threat-vectors',
        duration_minutes: 30,
        order_num: 1,
        is_published: true,
        content: `
# مثلث أمن المعلومات (CIA Triad)

الركائز الثلاث الأساسية لأمن أي نظام معلوماتي:

1. **السرية (Confidentiality):**
   ضمان أن البيانات لا يمكن الوصول إليها أو قراءتها إلا من قبل الأشخاص المخولين فقط. يتم تحقيقها عبر **التشفير**، صلاحيات الوصول، والتحقق بخطوتين (MFA).

2. **السلامة والتكامل (Integrity):**
   ضمان أن البيانات صحيحة ولم يتم تعديلها أو التلاعب بها أثناء تخزينها أو نقلها. يتم تحقيقها عبر **دوال التجزئة (Hashing)** والتواقيع الرقمية.

3. **التوافر (Availability):**
   ضمان أن الأنظمة والخدمات والبيانات متاحة وجاهزة للمستخدمين الشرعيين متى ما احتاجوا إليها. يهددها هجمات حجب الخدمة (DDoS)، وانقطاع الطاقة، وفشل العتاد.

---

## المفاهيم الأساسية:
- **الثغرة (Vulnerability):** نقطة ضعف أو خطأ برمجي في النظام أو الإعدادات.
- **التهديد (Threat):** أي خطر محتمل قد يستغل تلك الثغرة (مثل مخترق، فيروس، أو كارثة).
- **الاستغلال (Exploit):** الكود أو الطريقة المستخدمة للاستفادة من الثغرة لتحقيق وصول غير مصرح.
- **المخاطرة (Risk):** حاصل ضرب احتمالية وقوع التهديد في حجم الضرر الناتج (Risk = Threat × Vulnerability × Impact).
        `
      },
      {
        id: 'lesson-cyber-2',
        module_id: 'mod-cyber-1',
        course_id: 'course-cyber-101',
        title: 'أساسيات التشفير: الفرق بين التشفير والتجزئة',
        slug: 'cryptography-encryption-vs-hashing',
        duration_minutes: 35,
        order_num: 2,
        is_published: true,
        content: `
# التشفير مقابل التجزئة (Encryption vs Hashing)

أحد أكثر المفاهيم التي يخلط بينها المبتدئون في مجال الأمن السيبراني.

---

## 1. التجزئة (Hashing): مسار باتجاه واحد (One-Way)
- عملية تحويل أي بيانات ذات حجم عشوائي إلى نص ثابت الطول (Hash).
- **لا يمكن عكس الهاش رياضياً** لاستخراج النص الأصلي.
- يُستخدم لحفظ كلمات المرور في قواعد البيانات والتحقق من سلامة الملفات.
- خوارزميات شهيرة: SHA-256, SHA-512, bcrypt (تجنب MD5 و SHA-1 لضعفهما).

## 2. التشفير المتناظر (Symmetric Encryption)
- يتم استخدام **مفتاح سري واحد** للتشفير وفك التشفير.
- سريع جداً ومناسب للبيانات الضخمة.
- أشهر خوارزمية: **AES (Advanced Encryption Standard)** مع مفاتيح 256-bit.

## 3. التشفير غير المتناظر (Asymmetric Encryption)
- يتم استخدام زوج من المفاتيح: **المفتاح العام (Public Key)** لتشفير الرسائل، و**المفتاح الخاص (Private Key)** لفك تشفيرها.
- يُستخدم في شهادات SSL/TLS وبروتوكول SSH والتواقيع الرقمية.
- أشهر خوارزمية: **RSA** والمنحنيات الإهليلجية (ECC).
        `
      }
    ]
  },
  {
    id: 'mod-cyber-2',
    course_id: 'course-cyber-101',
    title: 'الوحدة الثانية: أمن الويب ومخاطر OWASP واستجابة الحوادث',
    description: 'تحليل ثغرات الويب الشائعة وخطوات الدفاع والتحقيق.',
    order_num: 2,
    lessons: [
      {
        id: 'lesson-cyber-3',
        module_id: 'mod-cyber-2',
        course_id: 'course-cyber-101',
        title: 'ثغرات الويب الأكثر خطورة: OWASP Top 10',
        slug: 'owasp-top-10-web-vulnerabilities',
        duration_minutes: 35,
        order_num: 1,
        is_published: true,
        content: `
# ثغرات تطبيقات الويب: OWASP Top 10

مشروع OWASP هو مرجع عالمي يصدر تقريراً دورياً بأخطر 10 ثغرات تؤثر على تطبيقات الويب.

---

## 1. ثغرة حقن أوامر قواعد البيانات (SQL Injection)
تحدث عندما يقوم التطبيق بدمج مدخلات المستخدم مباشرة داخل استعلام SQL دون تصفية أو استخدام استعلامات مجهزة (Prepared Statements).
- المهاجم قد يتمكن من قراءة كامل قاعدة البيانات أو تجاوز شاشة تسجيل الدخول بمدخل مثل:
  \`' OR '1'='1\`
- **الحماية:** استخدام المعاملات المجهزة (Parameterized Queries / Prepared Statements) واستخدام مكتبات ORM آمنة.

## 2. ثغرة العبث بصلاحيات الوصول (Broken Access Control)
تحدث عندما لا يتحقق الخادم في الواجهة الخلفية من ملكية المستخدم للبيانات.
- مثال: طالب يغير معرّف حسابه في الرابط \`/api/user/10\` إلى \`/api/user/11\` ويحصل على بيانات مستخدم آخر (IDOR).
- **الحماية:** التحقق الصارم من جلسة وصلاحيات المستخدم في جانب الخادم (Server-side RBAC) مع كل طلب.

## 3. ثغرة البرمجة عبر المواقع (Cross-Site Scripting - XSS)
تحدث عند حقن كود جافاسكريبت خبيث يعرضه المتصفح لضحايا آخرين، مما قد يؤدي لسرقة ملفات تعريف الارتباط (Cookies) وجلسات العمل.
- **الحماية:** ترميز المخرجات (Output Encoding) وتطبيق سياسة أمان المحتوى (Content Security Policy - CSP).
        `
      },
      {
        id: 'lesson-cyber-4',
        module_id: 'mod-cyber-2',
        course_id: 'course-cyber-101',
        title: 'أساسيات الاستجابة للحوادث الأمنية والتحليل الجنائي الرقمي',
        slug: 'incident-response-and-forensics',
        duration_minutes: 30,
        order_num: 2,
        is_published: true,
        content: `
# خطوات الاستجابة للحوادث الأمنية (Incident Response)

وفقاً لمنهجية معهد NIST الأمريكي، تمر عملية التعامل مع أي اختراق أو هجوم بست مراحل متتالية:

1. **الاستعداد (Preparation):** تدريب الفريق، تجهيز الخطط والأدوات وعزل النسخ الاحتياطية.
2. **الاكتشاف والتحليل (Detection & Analysis):** فحص تنبيهات أنظمة SIEM والسجلات لتأكيد وجود حادث أمني وتحديد نطاقه.
3. **الاحتواء (Containment):** عزل الأجهزة المصابة عن الشبكة لمنع تفشي الهجوم دون إتلاف الأدلة الرقمية.
4. **الاستئصال (Eradication):** حذف البرمجيات الخبيثة، سد الثغرات، وتغيير جميع كلمات المرور ومفاتيح التشفير.
5. **التعافي (Recovery):** استعادة الأنظمة من نسخ احتياطية نظيفة ومراقبتها بدقة بعد العودة للعمل.
6. **الدروس المستفادة (Lessons Learned):** كتابة التقرير النهائي، تحديد نقاط القصور، وتحديث الإجراءات لمنع تكرار الهجوم.
        `
      }
    ]
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-net-1',
    course_id: 'course-net-101',
    lesson_id: 'lesson-net-2',
    title: 'اختبار تقييم أساسيات الشبكات وSubnetting',
    description: 'اختبار شامل من 5 أسئلة للتحقق من فهمك لنموذج OSI وحسابات الشبكات الفرعية والمنافذ.',
    pass_score: 70,
    time_limit_minutes: 10,
    questions: [
      {
        id: 'q-net-1',
        quiz_id: 'quiz-net-1',
        question_text: 'في أي طبقة من طبقات نموذج OSI يعمل عنوان IP وأجهزة التوجيه (Routers)؟',
        question_type: 'multiple_choice',
        options: [
          'الطبقة الثانية (Data Link Layer)',
          'الطبقة الثالثة (Network Layer)',
          'الطبقة الرابعة (Transport Layer)',
          'الطبقة السابعة (Application Layer)'
        ],
        correct_answer_index: 1,
        explanation: 'طبقة الشبكة (Network Layer - Layer 3) هي المسؤولة عن عنونة IP والتوجيه (Routing) ونقل الحزم بين الشبكات المختلفة.'
      },
      {
        id: 'q-net-2',
        quiz_id: 'quiz-net-1',
        question_text: 'كم عدد عناوين الأجهزة المتاحة (Usable Hosts) في شبكة بقناع 255.255.255.0 (/24)؟',
        question_type: 'multiple_choice',
        options: ['256', '254', '128', '255'],
        correct_answer_index: 1,
        explanation: 'إجمالي العناوين هو 2^8 = 256، ونطرح عنوان الشبكة وعنوان البث، فيتبقى 254 عنوان متاح للأجهزة.'
      },
      {
        id: 'q-net-3',
        quiz_id: 'quiz-net-1',
        question_text: 'ما هو البروتوكول والمنفذ الافتراضي المستخدم للاتصال المشفر بالخوادم والتحكم بها عن بُعد؟',
        question_type: 'multiple_choice',
        options: ['Telnet عبر منفذ 23', 'HTTP عبر منفذ 80', 'SSH عبر منفذ 22', 'RDP عبر منفذ 3389'],
        correct_answer_index: 2,
        explanation: 'بروتوكول SSH (Secure Shell) يعمل عبر المنفذ رقم 22 ويوفر قناة مشفرة وآمنة لإدارة الخوادم.'
      },
      {
        id: 'q-net-4',
        quiz_id: 'quiz-net-1',
        question_text: 'بروتوكول UDP يوفر نقلاً موثوقاً للبيانات ويتحقق من استلام كل حزمة مع إعادة إرسال الحزم المفقودة.',
        question_type: 'true_false',
        options: ['صواب', 'خطأ'],
        correct_answer_index: 1,
        explanation: 'خطأ؛ بروتوكول TCP هو الذي يوفر النقل الموثوق والتحقق، بينما UDP بروتوكول سريع بدون تأكيد استلام (Connectionless) يُستخدم للبث المباشر والألعاب.'
      },
      {
        id: 'q-net-5',
        quiz_id: 'quiz-net-1',
        question_text: 'ما هو بروتوكول الشبكة المسؤول عن ترجمة عناوين IP إلى عناوين MAC الفيزيائية داخل نفس الشبكة؟',
        question_type: 'multiple_choice',
        options: ['DNS', 'DHCP', 'ARP', 'ICMP'],
        correct_answer_index: 2,
        explanation: 'بروتوكول ARP (Address Resolution Protocol) هو المسؤول عن اكتشاف وتخزين عنوان MAC المقابل لعنوان IP معين.'
      }
    ]
  },
  {
    id: 'quiz-linux-1',
    course_id: 'course-linux-101',
    lesson_id: 'lesson-linux-2',
    title: 'اختبار إتقان سطر أوامر وصلاحيات Linux',
    description: 'اختبر حصيلتك في أوامر التنقل، نظام الملفات، وتصاريح chmod وchown.',
    pass_score: 70,
    time_limit_minutes: 10,
    questions: [
      {
        id: 'q-lin-1',
        quiz_id: 'quiz-linux-1',
        question_text: 'ما هو الأمر المستخدم لعرض مسار المجلد الحالي الذي تتواجد فيه في نظام Linux؟',
        question_type: 'multiple_choice',
        options: ['ls', 'cd', 'pwd', 'whoami'],
        correct_answer_index: 2,
        explanation: 'الأمر pwd يرمز إلى Print Working Directory ويطبع المسار المطلق للمجلد الحالي.'
      },
      {
        id: 'q-lin-2',
        quiz_id: 'quiz-linux-1',
        question_text: 'ماذا تعني القيمة الرقمية 755 في أمر chmod؟',
        question_type: 'multiple_choice',
        options: [
          'قراءة فقط للجميع',
          'المالك (قراءة وكتابة وتشغيل)، والمجموعة والآخرون (قراءة وتشغيل فقط)',
          'كامل الصلاحيات لجميع المستخدمين على الخادم',
          'منع الوصول لأي مستخدم عدا الـ root'
        ],
        correct_answer_index: 1,
        explanation: 'الرقم 7 (4+2+1) يعني rwx للمالك، والرقم 5 (4+1) يعني r-x للمجموعة والآخرين.'
      },
      {
        id: 'q-lin-3',
        quiz_id: 'quiz-linux-1',
        question_text: 'أي من المسارات التالية يحتوي على سجلات أحداث ومحاولات تسجيل الدخول في توزيعات أوبونتو؟',
        question_type: 'multiple_choice',
        options: ['/etc/passwd', '/var/log/auth.log', '/home/user/logs', '/bin/systemd'],
        correct_answer_index: 1,
        explanation: 'المسار /var/log/auth.log هو ملف السجل المتخصص في تسجيل عمليات المصادقة والدخول واستخدام sudo.'
      }
    ]
  },
  {
    id: 'quiz-cyber-1',
    course_id: 'course-cyber-101',
    lesson_id: 'lesson-cyber-3',
    title: 'اختبار أساسيات الأمن السيبراني ومخاطر الويب',
    description: 'اختبر فهمك لمثلث CIA، أساليب التشفير، وحماية تطبيقات الويب.',
    pass_score: 70,
    time_limit_minutes: 10,
    questions: [
      {
        id: 'q-cyb-1',
        quiz_id: 'quiz-cyber-1',
        question_text: 'ما هو العنصر في مثلث أمن المعلومات (CIA) الذي يحميه استخدام خوارزميات التجزئة (Hashing) والتواقيع الرقمية؟',
        question_type: 'multiple_choice',
        options: ['السرية (Confidentiality)', 'السلامة والتكامل (Integrity)', 'التوافر (Availability)', 'إمكانية النفي (Non-repudiation)'],
        correct_answer_index: 1,
        explanation: 'التجزئة والتواقيع تضمن عدم التلاعب بالبيانات أو تعديلها من قبل أطراف غير مخولة، وهو ما يمثل ركن السلامة والتكامل (Integrity).'
      },
      {
        id: 'q-cyb-2',
        quiz_id: 'quiz-cyber-1',
        question_text: 'ما هي الطريقة الفعالة والموصى بها برمجياً للحماية من ثغرات حقن أوامر قواعد البيانات (SQL Injection)؟',
        question_type: 'multiple_choice',
        options: [
          'إخفاء قاعدة البيانات خلف جدار ناري فقط',
          'استخدام الاستعلامات المجهزة والمعاملات (Parameterized Queries / Prepared Statements)',
          'تشفير كلمات المرور بواسطة MD5',
          'تقليل عدد جداول قاعدة البيانات'
        ],
        correct_answer_index: 1,
        explanation: 'الاستعلامات المجهزة تضمن فصل كود SQL تماماً عن مدخلات المستخدم وتمنع تفسير المدخلات كأوامر برمجية.'
      },
      {
        id: 'q-cyb-3',
        quiz_id: 'quiz-cyber-1',
        question_text: 'يمكن استعادة كلمة المرور الأصلية بسهولة من كود التجزئة (Hash) عن طريق عكس المعادلة الحسابية للهاش.',
        question_type: 'true_false',
        options: ['صواب', 'خطأ'],
        correct_answer_index: 1,
        explanation: 'خطأ؛ دوال التجزئة مصممة رياضياً لتكون باتجاه واحد (One-Way) يستحيل عكسها رياضياً.'
      }
    ]
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'chall-linux-01',
    title: 'صائد الملفات المخفية في لينكس',
    slug: 'find-hidden-linux-secret',
    category: 'linux',
    difficulty: 'سهل',
    points: 50,
    description: 'تم إخفاء رسالة سرية داخل أحد المجلدات في نظام الملفات. استخدم مهاراتك في سطر الأوامر للوصول إليها واستخراج العلم.',
    instructions: '1. استعرض المجلد الحالي بما فيه الملفات المخفية.\n2. ابحث عن المجلد المسمى .secret_vault\n3. اقرأ محتوى الملف الداخلي واستخرج العلم بصيغة RAWAA{...}',
    hints: [
      'الملفات المخفية في Linux تبدأ دائماً بنقطة (.)',
      'استخدم الأمر ls -la لرؤية جميع الملفات المخفية',
      'استخدم الأمر cat لقراءة محتوى الملف'
    ],
    flag: 'RAWAA{linux_cli_master_2026}',
    solution_guide: 'تنفيذ ls -la ثم cd .secret_vault ثم cat flag.txt'
  },
  {
    id: 'chall-net-01',
    title: 'تحدي حساب عنوان البث والشبكة (Subnetting)',
    slug: 'subnet-broadcast-hunter',
    category: 'network',
    difficulty: 'سهل',
    points: 75,
    description: 'لديك جهاز يحمل عنوان IP: 192.168.10.68 وقناع الشبكة 255.255.255.224 (/27). احسب عنوان البث (Broadcast Address) لهذه الشبكة الفرعية.',
    instructions: 'قم بحساب عنوان البث للشبكة الفرعية المعطاة. العلم هو العنوان بالشكل: RAWAA{Broadcast_IP}',
    hints: [
      'قناع /27 يقسم الشبكة إلى كتل بحجم 32 عنوان',
      'الشبكات تبدأ من 0، ثم 32، ثم 64، ثم 96...',
      'عنوان 68 يقع في الشبكة التي تبدأ بـ 192.168.10.64',
      'عنوان البث هو العنوان الأخير قبل بدء الشبكة التالية مباشرة'
    ],
    flag: 'RAWAA{192.168.10.95}',
    solution_guide: 'الشبكة 64، وحجم الكتلة 32، إذن الشبكة التالية 96، وعنوان البث هو 96-1 = 192.168.10.95'
  },
  {
    id: 'chall-cyber-01',
    title: 'المحقق الرقمي: كشف هجوم القوة الغاشمة (Brute-force)',
    slug: 'auth-log-investigation',
    category: 'cybersecurity',
    difficulty: 'متوسط',
    points: 100,
    description: 'تعرض خادم الشركة لمحاولات دخول مريبة عبر SSH. افحص السجل المرفق في مختبر الأمن واستخرج عنوان الـ IP المهاجم الذي نفذ أكثر من 10 محاولات فاشلة.',
    instructions: 'افحص السجلات في مختبر الأمن السيبراني. عندما تحدد الـ IP المهاجم ضع العلم بصيغة RAWAA{Attacker_IP}',
    hints: [
      'ابحث عن عبارة "Failed password for root" في السجلات',
      'احسب عدد مرات التكرار للـ IP المهاجم'
    ],
    flag: 'RAWAA{198.51.100.42}',
    solution_guide: 'الـ IP المهاجم هو 198.51.100.42 حيث نفذ هجوماً متواصلاً'
  },
  {
    id: 'chall-ctf-01',
    title: 'تحدي فك الشفرة: رسالة الموجه السرية',
    slug: 'base64-router-secret',
    category: 'ctf',
    difficulty: 'سهل',
    points: 60,
    description: 'التقطت وحدة مراقبة الشبكة رسالة مشفرة بترميز Base64 مرسلة بين موجّهين: \`UkFXQUF7bmV0d29ya19wYWNrZXRzX25ldmVyX2xpZX0=\`. فك التشفير للحصول على العلم.',
    instructions: 'استخدم أي أداة فك ترميز Base64 أو موجه الطرفية في اللينكس باستخدام أمر echo | base64 -d لاستخراج العلم.',
    hints: [
      'الرمز = في نهاية النص يدل على حشو ترميز Base64',
      'في لينكس يمكنك كتابة: echo "text" | base64 -d'
    ],
    flag: 'RAWAA{network_packets_never_lie}',
    solution_guide: 'فك ترميز Base64 يعطي النص المباشر RAWAA{network_packets_never_lie}'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-step',
    title: 'الخطوة الأولى',
    description: 'إكمال أول درس تعليمي في منصة رواء',
    icon: 'Compass',
    badge_color: '#06B6D4',
    points_required: 10
  },
  {
    id: 'ach-terminal-ninja',
    title: 'سيد الطرفية',
    description: 'إتمام أول مهمة تفاعلية في مختبر أوامر Linux',
    icon: 'Terminal',
    badge_color: '#10B981',
    points_required: 50
  },
  {
    id: 'ach-net-architect',
    title: 'معماري الشبكات',
    description: 'اجتياز اختبار الشبكات وحسابات Subnetting بنجاح',
    icon: 'Network',
    badge_color: '#38BDF8',
    points_required: 100
  },
  {
    id: 'ach-cyber-shield',
    title: 'حارس الثغرات',
    description: 'حل أول تحدٍ أمني وتحليل سجلات الاختراق بنجاح',
    icon: 'ShieldCheck',
    badge_color: '#8B5CF6',
    points_required: 150
  },
  {
    id: 'ach-certified-master',
    title: 'المتخرج المعتمد',
    description: 'إكمال دورة كاملة والحصول على شهادة إتمام رسمية',
    icon: 'Award',
    badge_color: '#F59E0B',
    points_required: 200
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'أهلاً بك في منصة رواء التعليمية',
    content: 'تم إطلاق النسخة الرسمية من المنصة مع مختبرات لينكس والشبكات التفاعلية ونظام الشهادات الرقمية.',
    type: 'success',
    is_active: true,
    created_at: '2026-02-15T09:00:00Z'
  },
  {
    id: 'ann-2',
    title: 'تحديات CTF جديدة متاحة الآن!',
    content: 'تمت إضافة تحديات صيد الأعلام في مسار الأمن السيبراني. اختبر قدراتك الدفاعية واكسب نقاط إضافية.',
    type: 'info',
    is_active: true,
    created_at: '2026-02-18T14:30:00Z'
  }
];
