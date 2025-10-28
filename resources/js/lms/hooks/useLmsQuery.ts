/**
 * React Query hooks for LMS data fetching
 * Provides caching, automatic refetching, and offline support
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLmsAdapter } from '../adapters/lms.adapter';
import type { ID } from '../../core/lms/utils';
import type { ListCoursesParams } from '../adapters/lms.adapter';

const adapter = getLmsAdapter();

/**
 * Query keys for React Query
 */
export const lmsKeys = {
  all: ['lms'] as const,
  courses: () => [...lmsKeys.all, 'courses'] as const,
  course: (id: ID) => [...lmsKeys.courses(), id] as const,
  lessons: (courseId: ID) => [...lmsKeys.course(courseId), 'lessons'] as const,
  lesson: (id: ID) => [...lmsKeys.all, 'lesson', id] as const,
  progress: (courseId: ID) => [...lmsKeys.course(courseId), 'progress'] as const,
  enrollments: () => [...lmsKeys.all, 'enrollments'] as const,
  wallet: () => [...lmsKeys.all, 'wallet'] as const,
  badges: () => [...lmsKeys.all, 'badges'] as const,
  resume: () => [...lmsKeys.all, 'resume'] as const,
};

/**
 * Fetch courses
 */
export const useCourses = (params?: ListCoursesParams) => {
  return useQuery({
    queryKey: [...lmsKeys.courses(), params],
    queryFn: () => adapter.listCourses(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Fetch single course
 */
export const useCourse = (id: ID) => {
  return useQuery({
    queryKey: lmsKeys.course(id),
    queryFn: () => adapter.getCourse(id),
    enabled: !!id,
  });
};

/**
 * Fetch lessons for a course
 */
export const useLessons = (courseId: ID) => {
  return useQuery({
    queryKey: lmsKeys.lessons(courseId),
    queryFn: () => adapter.listLessons(courseId),
    enabled: !!courseId,
  });
};

/**
 * Fetch single lesson
 */
export const useLesson = (id: ID) => {
  return useQuery({
    queryKey: lmsKeys.lesson(id),
    queryFn: () => adapter.getLesson(id),
    enabled: !!id,
  });
};

/**
 * Fetch progress for a course
 */
export const useProgress = (courseId: ID) => {
  return useQuery({
    queryKey: lmsKeys.progress(courseId),
    queryFn: () => adapter.getProgress(courseId),
    enabled: !!courseId,
  });
};

/**
 * Fetch user's enrollments
 */
export const useEnrollments = () => {
  return useQuery({
    queryKey: lmsKeys.enrollments(),
    queryFn: () => adapter.listEnrollments(),
  });
};

/**
 * Fetch wallet data
 */
export const useWallet = () => {
  return useQuery({
    queryKey: lmsKeys.wallet(),
    queryFn: () => adapter.getWallet(),
  });
};

/**
 * Fetch badges
 */
export const useBadges = () => {
  return useQuery({
    queryKey: lmsKeys.badges(),
    queryFn: () => adapter.getBadges(),
  });
};

/**
 * Fetch resume context
 */
export const useResume = () => {
  return useQuery({
    queryKey: lmsKeys.resume(),
    queryFn: () => adapter.resume(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Enroll in a course
 */
export const useEnroll = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (courseId: ID) => adapter.enroll(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lmsKeys.enrollments() });
      queryClient.invalidateQueries({ queryKey: lmsKeys.courses() });
    },
  });
};

/**
 * Update progress
 */
export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adapter.updateProgress.bind(adapter),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: lmsKeys.progress(variables.courseId) });
      queryClient.invalidateQueries({ queryKey: lmsKeys.resume() });
    },
  });
};

