/**
 * LMS Module Type Definitions
 * Single source of truth for all LMS data types
 */

import { ID } from '../../core/lms/utils';

/**
 * Lesson content types
 */
export type LessonType = 'video' | 'quiz' | 'html' | 'document' | 'scorm';

/**
 * Course difficulty levels
 */
export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * User role in LMS context
 */
export type LmsUserRole = 'student' | 'instructor' | 'admin';

/**
 * Module Category
 */
export interface ModuleCategory {
  id: ID;
  name: string;
  description?: string;
  slug: string;
  icon?: string;
  order: number;
}

/**
 * Course/Module
 */
export interface Course {
  id: ID;
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  coverUrl?: string;
  thumbnailUrl?: string;
  difficulty?: CourseDifficulty;
  duration?: number; // total duration in seconds
  categoryId?: ID;
  category?: ModuleCategory;
  cohortIds?: ID[];
  instructorId?: ID;
  instructor?: LmsUser;
  published: boolean;
  featured: boolean;
  price?: number;
  currency?: string;
  enrollmentCount?: number;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
  // Enrollment info (if user is enrolled)
  isEnrolled?: boolean;
  progress?: number; // 0-100
  lastAccessedAt?: string;
}

/**
 * Cohort (group of users for course access control)
 */
export interface Cohort {
  id: ID;
  name: string;
  description?: string;
  courseIds: ID[];
  userCount?: number;
  createdAt: string;
}

/**
 * LMS User (scoped to LMS module)
 */
export interface LmsUser {
  id: ID;
  name: string;
  email?: string;
  avatar?: string;
  role: LmsUserRole;
  bio?: string;
}

/**
 * Course Enrollment
 */
export interface Enrollment {
  id: ID;
  userId: ID;
  courseId: ID;
  course?: Course;
  enrolledAt: string;
  completedAt?: string;
  progress: number; // 0-100
  lastAccessedAt?: string;
  certificateUrl?: string;
}

/**
 * Lesson/Content Item
 */
export interface Lesson {
  id: ID;
  courseId: ID;
  title: string;
  slug: string;
  description?: string;
  type: LessonType;
  order: number;
  durationSec?: number;
  isPreview: boolean; // Can be accessed without enrollment
  published: boolean;
  
  // Content URLs
  mediaUrl?: string; // For video/audio
  documentUrl?: string; // For PDF/documents
  htmlBundleUrl?: string; // For SCORM/HTML packages
  
  // Quiz data
  quiz?: Quiz;
  
  // Resources
  resources?: Resource[];
  
  createdAt: string;
  updatedAt: string;
}

/**
 * Quiz Definition
 */
export interface Quiz {
  id: ID;
  lessonId: ID;
  title: string;
  description?: string;
  passingScore: number; // Percentage (0-100)
  timeLimit?: number; // seconds
  maxAttempts?: number;
  questions: QuizQuestion[];
}

/**
 * Quiz Question
 */
export interface QuizQuestion {
  id: ID;
  quizId: ID;
  prompt: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  order: number;
  points: number;
  options?: string[]; // For multiple choice
  correctAnswerIndex?: number; // For multiple choice (0-based)
  correctAnswer?: string; // For true/false or short answer
  explanation?: string;
}

/**
 * Quiz Attempt
 */
export interface QuizAttempt {
  id: ID;
  userId: ID;
  quizId: ID;
  lessonId: ID;
  answers: QuizAnswer[];
  score: number; // Percentage (0-100)
  passed: boolean;
  startedAt: string;
  completedAt?: string;
  timeSpent?: number; // seconds
}

/**
 * Quiz Answer
 */
export interface QuizAnswer {
  questionId: ID;
  answer: string | number;
  isCorrect: boolean;
  pointsEarned: number;
}

/**
 * Downloadable Resource
 */
export interface Resource {
  id: ID;
  lessonId: ID;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number; // bytes
  downloadCount?: number;
}

/**
 * Learning Progress
 */
export interface Progress {
  id?: ID;
  userId: ID;
  courseId: ID;
  lessonId: ID;
  pct: number; // 0-100
  completed: boolean;
  timeSpent?: number; // seconds
  lastPosition?: number; // For video/audio playback position
  updatedAt: number; // timestamp
  createdAt?: string;
}

/**
 * Gamification: User Wallet
 */
export interface Wallet {
  userId: ID;
  totalXP: number;
  level: number;
  currentLevelXP: number;
  nextLevelXP: number;
  streak: number; // consecutive days
  lastActivityDate?: string;
  recent: XPEvent[]; // Recent XP events
}

/**
 * XP Event
 */
export interface XPEvent {
  id: ID;
  userId: ID;
  type: 'complete_lesson' | 'complete_course' | 'quiz_perfect' | 'quiz_bonus' | 'streak' | 'first_login' | 'daily_goal';
  amount: number;
  context?: Record<string, any>;
  timestamp: number;
  createdAt: string;
}

/**
 * Badge/Achievement
 */
export interface Badge {
  id: ID;
  name: string;
  description?: string;
  iconUrl?: string;
  requirement?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  // If user has earned it
  awardedAt?: string;
  progress?: number; // 0-100 if badge has progressive requirement
}

/**
 * Download Item (for offline access)
 */
export interface DownloadItem {
  id: ID;
  lessonId: ID;
  lesson: Lesson;
  courseId: ID;
  courseName: string;
  localPath?: string;
  fileSize: number;
  downloadedAt: string;
  lastAccessedAt?: string;
  status: 'pending' | 'downloading' | 'completed' | 'error';
  progress?: number; // 0-100
}

/**
 * User Feedback
 */
export interface Feedback {
  id: ID;
  userId: ID;
  lessonId?: ID;
  courseId?: ID;
  rating: number; // 1-5
  comment?: string;
  createdAt: string;
}

/**
 * Course Review
 */
export interface CourseReview {
  id: ID;
  userId: ID;
  user?: LmsUser;
  courseId: ID;
  rating: number; // 1-5
  review: string;
  helpful: number; // upvote count
  createdAt: string;
  updatedAt: string;
}

/**
 * Notification
 */
export interface LmsNotification {
  id: ID;
  userId: ID;
  type: 'lesson_reminder' | 'course_update' | 'badge_earned' | 'certificate_ready' | 'comment_reply';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
}

/**
 * Certificate
 */
export interface Certificate {
  id: ID;
  userId: ID;
  courseId: ID;
  course?: Course;
  certificateUrl: string;
  issuedAt: string;
  verificationCode: string;
}

