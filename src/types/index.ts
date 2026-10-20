export type UserRole = 'student' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  points: number;
  bio?: string;
  created_at: string;
}

export type TrackSlug = 'foundations' | 'networks' | 'linux' | 'cybersecurity' | 'programming' | 'labs';

export interface LearningPath {
  id: string;
  slug: TrackSlug;
  title: string;
  title_en: string;
  description: string;
  icon: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم' | 'شامل';
  total_hours: number;
  color: string;
  order_num: number;
  topics: string[];
}

export interface Course {
  id: string;
  slug: string;
  path_slug: TrackSlug;
  title: string;
  description: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم' | 'مبتدئ إلى متوسط';
  duration_hours: number;
  prerequisites: string[];
  learning_objectives: string[];
  cover_image: string;
  is_published: boolean;
  total_lessons: number;
  created_at: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_num: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  course_id: string;
  title: string;
  slug: string;
  duration_minutes: number;
  content: string;
  video_url?: string;
  order_num: number;
  is_published: boolean;
  practical_exercise?: {
    type: 'terminal' | 'network' | 'cyber' | 'quiz';
    title: string;
    instructions: string;
    target_solution?: string;
  };
  attachments?: {
    name: string;
    size: string;
    url: string;
  }[];
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
  progress_percentage: number;
  last_lesson_id?: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  course_id: string;
  lesson_id: string;
  is_completed: boolean;
  completed_at: string;
}

export interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false';
  options: string[];
  correct_answer_index: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  course_id: string;
  lesson_id?: string;
  title: string;
  description: string;
  pass_score: number; // e.g. 70
  time_limit_minutes: number;
  questions: Question[];
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  total_questions: number;
  passed: boolean;
  attempted_at: string;
  answers: Record<string, number>;
}

export type ChallengeCategory = 'linux' | 'network' | 'cybersecurity' | 'ctf';
export type ChallengeDifficulty = 'سهل' | 'متوسط' | 'متقدم';

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  points: number;
  description: string;
  instructions: string;
  hints: string[];
  flag: string; // e.g. RAWAA{...}
  solution_guide?: string;
}

export interface ChallengeSubmission {
  id: string;
  user_id: string;
  challenge_id: string;
  submitted_flag: string;
  is_correct: boolean;
  solved_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge_color: string;
  points_required: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

export interface Certificate {
  id: string;
  certificate_code: string;
  user_id: string;
  user_name: string;
  course_id: string;
  course_title: string;
  track_title: string;
  issued_at: string;
  instructor_name: string;
  is_valid: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
  is_active: boolean;
  created_at: string;
}
