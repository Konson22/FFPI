/**
 * LMS Application Entry Point
 * Isolated LMS module that can be mounted independently
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isLmsEnabled } from '../core/lms/config';
import CatalogScreen from './features/catalog/CatalogScreen';
import CourseScreen from './features/course/CourseScreen';
import LessonPlayerScreen from './features/lesson/LessonPlayerScreen';

/**
 * Create isolated QueryClient for LMS
 */
const lmsQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * LMS App Component
 * Wraps LMS screens with necessary providers
 */
interface LmsAppProps {
  screen: 'catalog' | 'course' | 'lesson';
  courseId?: string | number;
  lessonId?: string | number;
}

export function LmsApp({ screen, courseId, lessonId }: LmsAppProps) {
  // Guard: Don't render if LMS is disabled
  if (!isLmsEnabled()) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">LMS module is currently disabled.</p>
          <p className="text-sm text-gray-500 mt-2">
            Contact your administrator to enable this feature.
          </p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={lmsQueryClient}>
      <div className="lms-app">
        {screen === 'catalog' && <CatalogScreen />}
        {screen === 'course' && courseId && <CourseScreen courseId={courseId} />}
        {screen === 'lesson' && courseId && lessonId && (
          <LessonPlayerScreen courseId={courseId} lessonId={lessonId} />
        )}
      </div>
    </QueryClientProvider>
  );
}

/**
 * LMS Dev Entry (for testing in isolation)
 * Can be mounted in a dev route or storybook
 */
export function LmsDevEntry() {
  return <LmsApp screen="catalog" />;
}

// Export individual screens for flexible mounting
export { CatalogScreen, CourseScreen, LessonPlayerScreen };

