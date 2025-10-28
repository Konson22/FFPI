/**
 * LMS Analytics Service
 * Tracks user interactions and learning events (LMS scope only)
 */

import { isFeatureEnabled } from '../../../core/lms/config';
import { ID } from '../../../core/lms/utils';

/**
 * Analytics Event Types
 */
export type AnalyticsEventType =
  | 'view_catalog'
  | 'view_course'
  | 'start_lesson'
  | 'complete_lesson'
  | 'pause_lesson'
  | 'resume_lesson'
  | 'quiz_start'
  | 'quiz_submit'
  | 'quiz_pass'
  | 'quiz_fail'
  | 'enroll_course'
  | 'complete_course'
  | 'award_badge'
  | 'earn_xp'
  | 'download_content'
  | 'submit_feedback'
  | 'search';

/**
 * Analytics Event
 */
export interface AnalyticsEvent {
  type: AnalyticsEventType;
  properties?: Record<string, any>;
  timestamp?: number;
}

/**
 * Analytics Provider Interface
 */
export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void;
  identify(userId: ID, traits?: Record<string, any>): void;
  page(name: string, properties?: Record<string, any>): void;
}

/**
 * Console Analytics Provider (dev/fallback)
 */
class ConsoleAnalyticsProvider implements AnalyticsProvider {
  track(event: AnalyticsEvent): void {
    console.log('[LMS Analytics]', event.type, event.properties);
  }

  identify(userId: ID, traits?: Record<string, any>): void {
    console.log('[LMS Analytics] Identify:', userId, traits);
  }

  page(name: string, properties?: Record<string, any>): void {
    console.log('[LMS Analytics] Page:', name, properties);
  }
}

/**
 * Laravel Backend Analytics Provider
 * Sends events to Laravel backend for processing
 */
class BackendAnalyticsProvider implements AnalyticsProvider {
  async track(event: AnalyticsEvent): Promise<void> {
    try {
      await fetch('/api/lms/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': this.getCsrfToken(),
        },
        body: JSON.stringify({
          type: event.type,
          properties: event.properties,
          timestamp: event.timestamp || Date.now(),
        }),
        credentials: 'include',
      });
    } catch (error) {
      console.error('[LMS Analytics] Failed to track event:', error);
    }
  }

  async identify(userId: ID, traits?: Record<string, any>): Promise<void> {
    try {
      await fetch('/api/lms/analytics/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': this.getCsrfToken(),
        },
        body: JSON.stringify({
          user_id: userId,
          traits,
        }),
        credentials: 'include',
      });
    } catch (error) {
      console.error('[LMS Analytics] Failed to identify user:', error);
    }
  }

  async page(name: string, properties?: Record<string, any>): Promise<void> {
    try {
      await fetch('/api/lms/analytics/page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': this.getCsrfToken(),
        },
        body: JSON.stringify({
          name,
          properties,
          timestamp: Date.now(),
        }),
        credentials: 'include',
      });
    } catch (error) {
      console.error('[LMS Analytics] Failed to track page view:', error);
    }
  }

  private getCsrfToken(): string {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  }
}

/**
 * No-op Analytics Provider (when analytics disabled)
 */
class NoOpAnalyticsProvider implements AnalyticsProvider {
  track(): void {}
  identify(): void {}
  page(): void {}
}

/**
 * LMS Analytics Service
 */
class LmsAnalyticsService {
  private provider: AnalyticsProvider;

  constructor() {
    // Choose provider based on configuration
    if (!isFeatureEnabled('analytics')) {
      this.provider = new NoOpAnalyticsProvider();
    } else if (import.meta.env.DEV) {
      this.provider = new ConsoleAnalyticsProvider();
    } else {
      this.provider = new BackendAnalyticsProvider();
    }
  }

  /**
   * Track an analytics event
   */
  track(type: AnalyticsEventType, properties?: Record<string, any>): void {
    this.provider.track({
      type,
      properties,
      timestamp: Date.now(),
    });
  }

  /**
   * Identify current user
   */
  identify(userId: ID, traits?: Record<string, any>): void {
    this.provider.identify(userId, traits);
  }

  /**
   * Track page view
   */
  page(name: string, properties?: Record<string, any>): void {
    this.provider.page(name, properties);
  }

  // ===== Convenience Methods =====

  viewCatalog(): void {
    this.track('view_catalog');
  }

  viewCourse(courseId: ID, courseName: string): void {
    this.track('view_course', { course_id: courseId, course_name: courseName });
  }

  startLesson(lessonId: ID, courseId: ID): void {
    this.track('start_lesson', { lesson_id: lessonId, course_id: courseId });
  }

  completeLesson(lessonId: ID, courseId: ID, timeSpent?: number): void {
    this.track('complete_lesson', {
      lesson_id: lessonId,
      course_id: courseId,
      time_spent: timeSpent,
    });
  }

  enrollCourse(courseId: ID): void {
    this.track('enroll_course', { course_id: courseId });
  }

  completeCourse(courseId: ID): void {
    this.track('complete_course', { course_id: courseId });
  }

  awardBadge(badgeId: ID, badgeName: string): void {
    this.track('award_badge', { badge_id: badgeId, badge_name: badgeName });
  }

  earnXP(amount: number, source: string): void {
    this.track('earn_xp', { amount, source });
  }

  search(query: string, results: number): void {
    this.track('search', { query, results });
  }
}

/**
 * Export singleton instance
 */
export const lmsAnalytics = new LmsAnalyticsService();

