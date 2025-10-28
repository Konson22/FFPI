/**
 * MVP LMS Adapter - Laravel Backend Implementation
 * Uses Laravel API endpoints for all LMS functionality
 */

import axios, { AxiosInstance } from 'axios';
import type {
  LmsAdapter,
  ListCoursesParams,
  ResumeContext,
  PostXPEventInput,
  UpdateProgressInput,
  SubmitFeedbackInput,
  SubmitQuizInput,
} from '../lms.adapter';
import type {
  Course,
  Lesson,
  Progress,
  Enrollment,
  Cohort,
  Wallet,
  Badge,
  Quiz,
  QuizAttempt,
  DownloadItem,
  ModuleCategory,
  Certificate,
  CourseReview,
} from '../lms.types';
import type { ID } from '../../../core/lms/utils';

/**
 * API Client for LMS endpoints
 */
class MvpLmsApiClient {
  private client: AxiosInstance;
  private baseURL: string = '/api/lms';

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      withCredentials: true, // For Laravel Sanctum
    });

    // Add CSRF token to requests
    this.setupCsrfToken();
  }

  private setupCsrfToken() {
    // Get CSRF token from meta tag or cookie
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
      this.client.defaults.headers.common['X-CSRF-TOKEN'] = token;
    }
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}

/**
 * MVP LMS Adapter Implementation
 */
class MvpLmsAdapter implements LmsAdapter {
  private api: MvpLmsApiClient;

  constructor() {
    this.api = new MvpLmsApiClient();
  }

  // ===== Discovery & Catalog =====

  async listCourses(params?: ListCoursesParams): Promise<Course[]> {
    return this.api.get<Course[]>('/courses', params);
  }

  async getCourse(courseId: ID): Promise<Course> {
    return this.api.get<Course>(`/courses/${courseId}`);
  }

  async listCategories(): Promise<ModuleCategory[]> {
    return this.api.get<ModuleCategory[]>('/categories');
  }

  async listCohorts(): Promise<Cohort[]> {
    return this.api.get<Cohort[]>('/cohorts');
  }

  async search(query: string): Promise<Course[]> {
    return this.api.get<Course[]>('/courses/search', { q: query });
  }

  // ===== Enrollments =====

  async enroll(courseId: ID): Promise<void> {
    await this.api.post(`/courses/${courseId}/enroll`);
  }

  async unenroll(courseId: ID): Promise<void> {
    await this.api.delete(`/courses/${courseId}/enroll`);
  }

  async listEnrollments(): Promise<Enrollment[]> {
    return this.api.get<Enrollment[]>('/enrollments');
  }

  // ===== Lessons & Content =====

  async listLessons(courseId: ID): Promise<Lesson[]> {
    return this.api.get<Lesson[]>(`/courses/${courseId}/lessons`);
  }

  async getLesson(lessonId: ID): Promise<Lesson> {
    return this.api.get<Lesson>(`/lessons/${lessonId}`);
  }

  async getQuiz(lessonId: ID): Promise<Quiz> {
    return this.api.get<Quiz>(`/lessons/${lessonId}/quiz`);
  }

  async submitQuiz(input: SubmitQuizInput): Promise<QuizAttempt> {
    return this.api.post<QuizAttempt>(`/quizzes/${input.quizId}/submit`, {
      lesson_id: input.lessonId,
      answers: input.answers,
    });
  }

  async getQuizAttempts(lessonId: ID): Promise<QuizAttempt[]> {
    return this.api.get<QuizAttempt[]>(`/lessons/${lessonId}/quiz/attempts`);
  }

  // ===== Progress & Tracking =====

  async getProgress(courseId: ID): Promise<Progress[]> {
    return this.api.get<Progress[]>(`/courses/${courseId}/progress`);
  }

  async updateProgress(input: UpdateProgressInput): Promise<void> {
    await this.api.post('/progress', {
      course_id: input.courseId,
      lesson_id: input.lessonId,
      pct: input.pct,
      completed: input.completed,
      time_spent: input.timeSpent,
      last_position: input.lastPosition,
    });
  }

  async resume(): Promise<ResumeContext | null> {
    try {
      return await this.api.get<ResumeContext>('/progress/resume');
    } catch (error) {
      return null;
    }
  }

  // ===== Gamification =====

  async getWallet(): Promise<Wallet> {
    return this.api.get<Wallet>('/wallet');
  }

  async postXPEvent(evt: PostXPEventInput): Promise<void> {
    await this.api.post('/xp', {
      type: evt.type,
      amount: evt.amount,
      context: evt.context,
    });
  }

  async getBadges(): Promise<Badge[]> {
    return this.api.get<Badge[]>('/badges');
  }

  // ===== Downloads (Offline Access) =====

  async listDownloads(): Promise<DownloadItem[]> {
    return this.api.get<DownloadItem[]>('/downloads');
  }

  async downloadLesson(lessonId: ID): Promise<DownloadItem> {
    return this.api.post<DownloadItem>('/downloads', { lesson_id: lessonId });
  }

  async removeDownload(downloadId: ID): Promise<void> {
    await this.api.delete(`/downloads/${downloadId}`);
  }

  // ===== Certificates =====

  async getCertificates(): Promise<Certificate[]> {
    return this.api.get<Certificate[]>('/certificates');
  }

  async generateCertificate(courseId: ID): Promise<Certificate> {
    return this.api.post<Certificate>('/certificates', { course_id: courseId });
  }

  // ===== Feedback & Reviews =====

  async submitFeedback(input: SubmitFeedbackInput): Promise<void> {
    await this.api.post('/feedback', {
      lesson_id: input.lessonId,
      course_id: input.courseId,
      rating: input.rating,
      comment: input.comment,
    });
  }

  async getCourseReviews(courseId: ID): Promise<CourseReview[]> {
    return this.api.get<CourseReview[]>(`/courses/${courseId}/reviews`);
  }

  async submitReview(courseId: ID, rating: number, review: string): Promise<void> {
    await this.api.post(`/courses/${courseId}/reviews`, { rating, review });
  }
}

/**
 * Export singleton instance
 */
export const mvpLmsAdapter = new MvpLmsAdapter();

