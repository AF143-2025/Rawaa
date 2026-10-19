import { 
  UserProfile, 
  Course, 
  CourseModule, 
  Enrollment, 
  LessonProgress, 
  Quiz, 
  QuizAttempt, 
  Challenge, 
  ChallengeSubmission, 
  Certificate, 
  Announcement,
  Achievement
} from '@/types';
import { 
  INITIAL_TRACKS, 
  INITIAL_COURSES, 
  INITIAL_MODULES, 
  INITIAL_QUIZZES, 
  INITIAL_CHALLENGES, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_ANNOUNCEMENTS 
} from './mockData';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  CURRENT_USER: 'rawaa_current_user',
  ENROLLMENTS: 'rawaa_enrollments',
  PROGRESS: 'rawaa_lesson_progress',
  QUIZ_ATTEMPTS: 'rawaa_quiz_attempts',
  CHALLENGE_SUBMISSIONS: 'rawaa_challenge_submissions',
  CERTIFICATES: 'rawaa_certificates',
  COURSES: 'rawaa_custom_courses',
  ANNOUNCEMENTS: 'rawaa_announcements'
};

// Default Demo Users
export const DEMO_STUDENT: UserProfile = {
  id: 'usr-student-01',
  email: 'student@rawaa.academy',
  full_name: 'ريان العتيبي',
  role: 'student',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  points: 120,
  bio: 'مهتم بهندسة الشبكات والتحقيق الجنائي الرقمي.',
  created_at: '2026-01-10T12:00:00Z'
};

export const DEMO_ADMIN: UserProfile = {
  id: 'usr-admin-01',
  email: 'admin@rawaa.academy',
  full_name: 'م. أحمد السالم (مدير المنصة)',
  role: 'admin',
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  points: 500,
  bio: 'مهندس أمن سيبراني ومدرب معتمد في أنظمة Linux والشبكات.',
  created_at: '2026-01-01T08:00:00Z'
};

// Initial Seed Certificates
const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    certificate_code: 'RAWAA-NET-49210',
    user_id: 'usr-student-01',
    user_name: 'ريان العتيبي',
    course_id: 'course-net-101',
    course_title: 'أساسيات الشبكات وعنونة IP للمبتدئين',
    track_title: 'هندسة الشبكات والاتصالات',
    issued_at: '2026-02-10T15:30:00Z',
    instructor_name: 'م. أحمد السالم',
    is_valid: true
  }
];

class RawaaDataStore {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // --- Profile / Auth ---
  getCurrentUser(): UserProfile | null {
    if (!this.isBrowser()) return DEMO_STUDENT;
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!stored) {
      this.setCurrentUser(DEMO_STUDENT);
      return DEMO_STUDENT;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEMO_STUDENT;
    }
  }

  setCurrentUser(user: UserProfile | null): void {
    if (!this.isBrowser()) return;
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    }
  }

  updateUserProfile(updated: Partial<UserProfile>): UserProfile {
    const current = this.getCurrentUser() || DEMO_STUDENT;
    const merged = { ...current, ...updated };
    this.setCurrentUser(merged);
    return merged;
  }

  addPoints(pointsToAdd: number): number {
    const current = this.getCurrentUser();
    if (!current) return 0;
    const newTotal = (current.points || 0) + pointsToAdd;
    this.updateUserProfile({ points: newTotal });
    return newTotal;
  }

  // --- Courses & Modules ---
  getCourses(): Course[] {
    if (!this.isBrowser()) return INITIAL_COURSES;
    const custom = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (!custom) return INITIAL_COURSES;
    try {
      const parsed: Course[] = JSON.parse(custom);
      return [...INITIAL_COURSES, ...parsed];
    } catch {
      return INITIAL_COURSES;
    }
  }

  getCourseBySlug(slug: string): Course | undefined {
    return this.getCourses().find(c => c.slug === slug);
  }

  getModulesForCourse(courseId: string): CourseModule[] {
    return INITIAL_MODULES.filter(m => m.course_id === courseId);
  }

  getLesson(courseSlug: string, lessonSlug: string) {
    const course = this.getCourseBySlug(courseSlug);
    if (!course) return null;
    const modules = this.getModulesForCourse(course.id);
    for (const mod of modules) {
      const lesson = mod.lessons.find(l => l.slug === lessonSlug);
      if (lesson) return { course, module: mod, lesson };
    }
    return null;
  }

  createCourse(course: Course): Course {
    if (!this.isBrowser()) return course;
    const custom = localStorage.getItem(STORAGE_KEYS.COURSES);
    let list: Course[] = [];
    if (custom) {
      try { list = JSON.parse(custom); } catch {}
    }
    list.unshift(course);
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(list));
    return course;
  }

  // --- Enrollments & Progress ---
  getEnrollments(userId?: string): Enrollment[] {
    if (!this.isBrowser()) return [];
    const uid = userId || this.getCurrentUser()?.id;
    if (!uid) return [];
    const raw = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
    let list: Enrollment[] = [];
    if (raw) {
      try { list = JSON.parse(raw); } catch {}
    } else {
      // Default enrollment for demo student
      list = [
        {
          id: 'enr-demo-1',
          user_id: DEMO_STUDENT.id,
          course_id: 'course-net-101',
          enrolled_at: '2026-01-20T10:00:00Z',
          progress_percentage: 100,
          completed_at: '2026-02-10T15:30:00Z'
        },
        {
          id: 'enr-demo-2',
          user_id: DEMO_STUDENT.id,
          course_id: 'course-linux-101',
          enrolled_at: '2026-02-01T12:00:00Z',
          progress_percentage: 50,
          last_lesson_id: 'lesson-linux-2'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(list));
    }
    return list.filter(e => e.user_id === uid);
  }

  enrollInCourse(courseId: string): Enrollment {
    const user = this.getCurrentUser() || DEMO_STUDENT;
    const existing = this.getEnrollments(user.id).find(e => e.course_id === courseId);
    if (existing) return existing;

    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      user_id: user.id,
      course_id: courseId,
      enrolled_at: new Date().toISOString(),
      progress_percentage: 0
    };

    if (this.isBrowser()) {
      const raw = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
      let list: Enrollment[] = [];
      if (raw) {
        try { list = JSON.parse(raw); } catch {}
      }
      list.push(newEnrollment);
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(list));
    }
    return newEnrollment;
  }

  getLessonProgress(userId?: string): LessonProgress[] {
    if (!this.isBrowser()) return [];
    const uid = userId || this.getCurrentUser()?.id;
    if (!uid) return [];
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    let list: LessonProgress[] = [];
    if (raw) {
      try { list = JSON.parse(raw); } catch {}
    } else {
      // Demo completed lessons
      list = [
        { id: 'lp-1', user_id: DEMO_STUDENT.id, course_id: 'course-net-101', lesson_id: 'lesson-net-1', is_completed: true, completed_at: '2026-01-21T10:00:00Z' },
        { id: 'lp-2', user_id: DEMO_STUDENT.id, course_id: 'course-net-101', lesson_id: 'lesson-net-2', is_completed: true, completed_at: '2026-01-22T10:00:00Z' },
        { id: 'lp-3', user_id: DEMO_STUDENT.id, course_id: 'course-net-101', lesson_id: 'lesson-net-3', is_completed: true, completed_at: '2026-01-23T10:00:00Z' },
        { id: 'lp-4', user_id: DEMO_STUDENT.id, course_id: 'course-net-101', lesson_id: 'lesson-net-4', is_completed: true, completed_at: '2026-01-24T10:00:00Z' },
        { id: 'lp-5', user_id: DEMO_STUDENT.id, course_id: 'course-linux-101', lesson_id: 'lesson-linux-1', is_completed: true, completed_at: '2026-02-02T10:00:00Z' },
        { id: 'lp-6', user_id: DEMO_STUDENT.id, course_id: 'course-linux-101', lesson_id: 'lesson-linux-2', is_completed: true, completed_at: '2026-02-03T10:00:00Z' },
      ];
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(list));
    }
    return list.filter(p => p.user_id === uid);
  }

  isLessonCompleted(lessonId: string): boolean {
    const list = this.getLessonProgress();
    return list.some(l => l.lesson_id === lessonId && l.is_completed);
  }

  markLessonComplete(courseId: string, lessonId: string): void {
    const user = this.getCurrentUser() || DEMO_STUDENT;
    if (!this.isBrowser()) return;

    // 1. Save lesson progress
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    let list: LessonProgress[] = [];
    if (raw) {
      try { list = JSON.parse(raw); } catch {}
    }
    if (!list.some(l => l.user_id === user.id && l.lesson_id === lessonId)) {
      list.push({
        id: `lp-${Date.now()}`,
        user_id: user.id,
        course_id: courseId,
        lesson_id: lessonId,
        is_completed: true,
        completed_at: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(list));
      this.addPoints(15); // Reward 15 points per lesson!
    }

    // 2. Update enrollment progress %
    const modules = this.getModulesForCourse(courseId);
    let totalLessonsInCourse = 0;
    modules.forEach(m => { totalLessonsInCourse += m.lessons.length; });

    const completedInThisCourse = list.filter(l => l.user_id === user.id && l.course_id === courseId).length;
    const newPercentage = totalLessonsInCourse > 0 
      ? Math.min(100, Math.round((completedInThisCourse / totalLessonsInCourse) * 100))
      : 100;

    const rawEnr = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
    let enrList: Enrollment[] = [];
    if (rawEnr) {
      try { enrList = JSON.parse(rawEnr); } catch {}
    }
    const enrIdx = enrList.findIndex(e => e.user_id === user.id && e.course_id === courseId);
    if (enrIdx >= 0) {
      enrList[enrIdx].progress_percentage = newPercentage;
      enrList[enrIdx].last_lesson_id = lessonId;
      if (newPercentage === 100 && !enrList[enrIdx].completed_at) {
        enrList[enrIdx].completed_at = new Date().toISOString();
      }
    } else {
      enrList.push({
        id: `enr-${Date.now()}`,
        user_id: user.id,
        course_id: courseId,
        enrolled_at: new Date().toISOString(),
        progress_percentage: newPercentage,
        last_lesson_id: lessonId,
        completed_at: newPercentage === 100 ? new Date().toISOString() : undefined
      });
    }
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrList));
  }

  // --- Quizzes ---
  getQuiz(quizId: string): Quiz | undefined {
    return INITIAL_QUIZZES.find(q => q.id === quizId);
  }

  getQuizForCourse(courseId: string): Quiz | undefined {
    return INITIAL_QUIZZES.find(q => q.course_id === courseId);
  }

  submitQuizAttempt(quizId: string, answers: Record<string, number>): { score: number; passed: boolean; attempt: QuizAttempt } {
    const user = this.getCurrentUser() || DEMO_STUDENT;
    const quiz = this.getQuiz(quizId);
    if (!quiz) throw new Error('Quiz not found');

    let correctCount = 0;
    quiz.questions.forEach((q, index) => {
      const studentAns = answers[q.id];
      if (studentAns !== undefined && studentAns === q.correct_answer_index) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.pass_score;

    const attempt: QuizAttempt = {
      id: `att-${Date.now()}`,
      user_id: user.id,
      quiz_id: quizId,
      score,
      total_questions: quiz.questions.length,
      passed,
      attempted_at: new Date().toISOString(),
      answers
    };

    if (this.isBrowser()) {
      const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
      let attempts: QuizAttempt[] = [];
      if (raw) {
        try { attempts = JSON.parse(raw); } catch {}
      }
      attempts.push(attempt);
      localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(attempts));
    }

    if (passed) {
      this.addPoints(50);
      // Auto issue certificate if course is completed
      const course = INITIAL_COURSES.find(c => c.id === quiz.course_id);
      if (course) {
        this.generateCertificate(user.id, user.full_name, course.id, course.title, course.path_slug);
      }
    }

    return { score, passed, attempt };
  }

  getQuizAttempts(userId?: string): QuizAttempt[] {
    if (!this.isBrowser()) return [];
    const uid = userId || this.getCurrentUser()?.id;
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
    if (!raw) return [];
    try {
      const list: QuizAttempt[] = JSON.parse(raw);
      return list.filter(a => a.user_id === uid);
    } catch {
      return [];
    }
  }

  // --- Challenges & CTF ---
  getChallenges(): Challenge[] {
    return INITIAL_CHALLENGES;
  }

  getChallengeBySlug(slug: string): Challenge | undefined {
    return INITIAL_CHALLENGES.find(c => c.slug === slug);
  }

  submitChallengeFlag(challengeId: string, submittedFlag: string): { isCorrect: boolean; message: string; pointsAwarded: number } {
    const user = this.getCurrentUser() || DEMO_STUDENT;
    const challenge = INITIAL_CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return { isCorrect: false, message: 'التحدي غير موجود', pointsAwarded: 0 };

    const isCorrect = challenge.flag.trim().toLowerCase() === submittedFlag.trim().toLowerCase();

    if (this.isBrowser()) {
      const raw = localStorage.getItem(STORAGE_KEYS.CHALLENGE_SUBMISSIONS);
      let submissions: ChallengeSubmission[] = [];
      if (raw) {
        try { submissions = JSON.parse(raw); } catch {}
      }

      // Check if already solved
      const alreadySolved = submissions.some(s => s.user_id === user.id && s.challenge_id === challengeId && s.is_correct);
      
      submissions.push({
        id: `sub-${Date.now()}`,
        user_id: user.id,
        challenge_id: challengeId,
        submitted_flag: submittedFlag,
        is_correct: isCorrect,
        solved_at: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.CHALLENGE_SUBMISSIONS, JSON.stringify(submissions));

      if (isCorrect && !alreadySolved) {
        this.addPoints(challenge.points);
        return { 
          isCorrect: true, 
          message: `إجابة صحيحة ومبهرة! تم حل العلم بنجاح وإضافة ${challenge.points} نقطة إلى رصيدك.`, 
          pointsAwarded: challenge.points 
        };
      }
    }

    if (isCorrect) {
      return { isCorrect: true, message: 'العلم صحيح (تم حله مسبقاً)!', pointsAwarded: 0 };
    }

    return { isCorrect: false, message: 'العلم غير صحيح. راجع التلميحات وحاول مجدداً!', pointsAwarded: 0 };
  }

  getSolvedChallengeIds(userId?: string): string[] {
    if (!this.isBrowser()) return [];
    const uid = userId || this.getCurrentUser()?.id;
    const raw = localStorage.getItem(STORAGE_KEYS.CHALLENGE_SUBMISSIONS);
    if (!raw) return [];
    try {
      const list: ChallengeSubmission[] = JSON.parse(raw);
      return list
        .filter(s => s.user_id === uid && s.is_correct)
        .map(s => s.challenge_id);
    } catch {
      return [];
    }
  }

  // --- Certificates ---
  getCertificates(userId?: string): Certificate[] {
    if (!this.isBrowser()) return INITIAL_CERTIFICATES;
    const uid = userId || this.getCurrentUser()?.id;
    const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    let list: Certificate[] = [];
    if (raw) {
      try { list = JSON.parse(raw); } catch {}
    } else {
      list = INITIAL_CERTIFICATES;
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(list));
    }
    return uid ? list.filter(c => c.user_id === uid) : list;
  }

  getCertificateByCode(code: string): Certificate | undefined {
    const list = this.getCertificates();
    return list.find(c => c.certificate_code.toUpperCase() === code.trim().toUpperCase());
  }

  generateCertificate(userId: string, userName: string, courseId: string, courseTitle: string, trackSlug: string): Certificate {
    const existing = this.getCertificates(userId).find(c => c.course_id === courseId);
    if (existing) return existing;

    const trackNameMap: Record<string, string> = {
      networks: 'هندسة الشبكات والاتصالات',
      linux: 'إدارة أنظمة وسيرفرات Linux',
      cybersecurity: 'الأمن السيبراني والدفاع الرقمي',
      labs: 'المختبرات العملية'
    };

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const prefix = trackSlug === 'networks' ? 'NET' : trackSlug === 'linux' ? 'LNX' : 'SEC';
    const code = `RAWAA-${prefix}-${randomSuffix}`;

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      certificate_code: code,
      user_id: userId,
      user_name: userName,
      course_id: courseId,
      course_title: courseTitle,
      track_title: trackNameMap[trackSlug] || 'الحوسبة السحابية والأمن',
      issued_at: new Date().toISOString(),
      instructor_name: 'م. أحمد السالم',
      is_valid: true
    };

    if (this.isBrowser()) {
      const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      let list: Certificate[] = [];
      if (raw) {
        try { list = JSON.parse(raw); } catch {}
      }
      list.push(newCert);
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(list));
    }

    return newCert;
  }

  // --- Announcements ---
  getAnnouncements(): Announcement[] {
    if (!this.isBrowser()) return INITIAL_ANNOUNCEMENTS;
    const raw = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    if (!raw) return INITIAL_ANNOUNCEMENTS;
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  }

  addAnnouncement(ann: Omit<Announcement, 'id' | 'created_at'>): Announcement {
    const item: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    if (this.isBrowser()) {
      const list = this.getAnnouncements();
      list.unshift(item);
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(list));
    }
    return item;
  }

  // --- System Stats for Admin & Home ---
  getPlatformStats() {
    const courses = this.getCourses();
    const certs = this.getCertificates();
    const enrollments = this.getEnrollments();
    const challenges = this.getChallenges();

    return {
      totalCourses: courses.length,
      totalCertificatesIssued: certs.length,
      totalChallenges: challenges.length,
      totalStudentsEnrolled: 184 + enrollments.length,
      learningTracksCount: INITIAL_TRACKS.length,
    };
  }
}

export const dataStore = new RawaaDataStore();
