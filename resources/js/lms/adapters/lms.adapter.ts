/**
 * LMS Adapter Interface
 * Defines the contract that all LMS adapters (MVP, Moodle) must implement
 */

import type { ID } from '../../core/lms/utils';
import type {
  Course,
  Lesson,
  Progress,
  Enrollment,
  Cohort,
  Wallet,
  Badge,
  XPEvent,
  Feedback,
  Quiz,
  QuizAttempt,
  DownloadItem,
  ModuleCategory,
  Certificate,
  CourseReview,
} from './lms.types';

// Import adapters (must be at top level for ES6 modules)
import { mvpLmsAdapter } from './mvp/mvpLmsAdapter';
import { moodleLmsAdapter } from './moodle/moodleLmsAdapter';

/**
 * Parameters for listing courses
 */
export interface ListCoursesParams {
  cohortId?: ID;
  categoryId?: ID;
  search?: string;
  difficulty?: string;
  featured?: boolean;
  enrolled?: boolean;
  page?: number;
  perPage?: number;
}

/**
 * Resume learning context
 */
export interface ResumeContext {
  courseId: ID;
  courseName: string;
  lessonId: ID;
  lessonName: string;
  progress: number;
}

/**
 * XP Event Input
 */
export interface PostXPEventInput {
  type: 'complete_lesson' | 'complete_course' | 'quiz_perfect' | 'quiz_bonus' | 'streak' | 'first_login' | 'daily_goal';
  amount: number;
  context?: Record<string, any>;
}

/**
 * Progress Update Input
 */
export interface UpdateProgressInput {
  courseId: ID;
  lessonId: ID;
  pct: number;
  completed?: boolean;
  timeSpent?: number;
  lastPosition?: number;
}

/**
 * Feedback Input
 */
export interface SubmitFeedbackInput {
  lessonId?: ID;
  courseId?: ID;
  rating: number;
  comment?: string;
}

/**
 * Quiz Submit Input
 */
export interface SubmitQuizInput {
  quizId: ID;
  lessonId: ID;
  answers: Array<{
    questionId: ID;
    answer: string | number;
  }>;
}

/**
 * Main LMS Adapter Interface
 * All methods return Promises to support async operations
 */
export interface LmsAdapter {
  // ===== Discovery & Catalog =====
  
  /**
   * List available courses with optional filters
   */
  listCourses(params?: ListCoursesParams): Promise<Course[]>;
  
  /**
   * Get a single course by ID
   */
  getCourse(courseId: ID): Promise<Course>;
  
  /**
   * List all module categories
   */
  listCategories(): Promise<ModuleCategory[]>;
  
  /**
   * List all cohorts
   */
  listCohorts(): Promise<Cohort[]>;
  
  /**
   * Search courses by query string
   */
  search(query: string): Promise<Course[]>;
  
  // ===== Enrollments =====
  
  /**
   * Enroll current user in a course
   */
  enroll(courseId: ID): Promise<void>;
  
  /**
   * Unenroll current user from a course
   */
  unenroll(courseId: ID): Promise<void>;
  
  /**
   * List current user's enrollments
   */
  listEnrollments(): Promise<Enrollment[]>;
  
  // ===== Lessons & Content =====
  
  /**
   * List lessons for a course
   */
  listLessons(courseId: ID): Promise<Lesson[]>;
  
  /**
   * Get a single lesson by ID
   */
  getLesson(lessonId: ID): Promise<Lesson>;
  
  /**
   * Get quiz for a lesson
   */
  getQuiz(lessonId: ID): Promise<Quiz>;
  
  /**
   * Submit quiz answers
   */
  submitQuiz(input: SubmitQuizInput): Promise<QuizAttempt>;
  
  /**
   * Get quiz attempts for a lesson
   */
  getQuizAttempts(lessonId: ID): Promise<QuizAttempt[]>;
  
  // ===== Progress & Tracking =====
  
  /**
   * Get progress for a course
   */
  getProgress(courseId: ID): Promise<Progress[]>;
  
  /**
   * Update progress for a lesson
   */
  updateProgress(input: UpdateProgressInput): Promise<void>;
  
  /**
   * Get the last lesson user was learning (for "Continue Learning")
   */
  resume(): Promise<ResumeContext | null>;
  
  // ===== Gamification =====
  
  /**
   * Get user's XP wallet
   */
  getWallet(): Promise<Wallet>;
  
  /**
   * Post an XP earning event
   */
  postXPEvent(evt: PostXPEventInput): Promise<void>;
  
  /**
   * Get user's earned and available badges
   */
  getBadges(): Promise<Badge[]>;
  
  // ===== Downloads (Offline Access) =====
  
  /**
   * List downloaded content
   */
  listDownloads(): Promise<DownloadItem[]>;
  
  /**
   * Request download of a lesson
   */
  downloadLesson(lessonId: ID): Promise<DownloadItem>;
  
  /**
   * Remove downloaded content
   */
  removeDownload(downloadId: ID): Promise<void>;
  
  // ===== Certificates =====
  
  /**
   * Get user's certificates
   */
  getCertificates(): Promise<Certificate[]>;
  
  /**
   * Generate certificate for completed course
   */
  generateCertificate(courseId: ID): Promise<Certificate>;
  
  // ===== Feedback & Reviews =====
  
  /**
   * Submit feedback for a lesson or course
   */
  submitFeedback(input: SubmitFeedbackInput): Promise<void>;
  
  /**
   * Get reviews for a course
   */
  getCourseReviews(courseId: ID): Promise<CourseReview[]>;
  
  /**
   * Submit course review
   */
  submitReview(courseId: ID, rating: number, review: string): Promise<void>;
}

/**
 * Adapter Factory
 * Returns the appropriate adapter based on configuration
 */
let adapterSingleton: LmsAdapter | null = null;

export const getLmsAdapter = (): LmsAdapter => {
  if (adapterSingleton) return adapterSingleton;
  
  // Get adapter type from environment (default to MVP)
  const adapterType = (import.meta.env?.VITE_LMS_ADAPTER || 'mvp').toLowerCase();
  
  console.log('[LMS] Using adapter:', adapterType);
  
  if (adapterType === 'moodle') {
    adapterSingleton = moodleLmsAdapter;
  } else {
    // Default to MVP adapter (Laravel backend)
    adapterSingleton = mvpLmsAdapter;
  }
  
  return adapterSingleton!;
};

/**
 * Reset adapter singleton (useful for testing)
 */
export const resetAdapter = (): void => {
  adapterSingleton = null;
};

