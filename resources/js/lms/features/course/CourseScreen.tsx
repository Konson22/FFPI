/**
 * Course Details Screen
 * Shows course overview, lessons, and enrollment status
 */

import React from 'react';
import { Link, router } from '@inertiajs/react';
import { useCourse, useLessons, useEnroll, useProgress } from '../../hooks/useLmsQuery';
import { useLmsTranslation } from '../../i18n';
import { formatDuration, calculateProgress } from '../../../core/lms/utils';
import { lmsAnalytics } from '../../services/analytics/lmsAnalyticsService';

interface CourseScreenProps {
  courseId: string | number;
}

export default function CourseScreen({ courseId }: CourseScreenProps) {
  const { t } = useLmsTranslation();
  const { data: course, isLoading: courseLoading } = useCourse(courseId);
  const { data: lessons, isLoading: lessonsLoading } = useLessons(courseId);
  const { data: progress } = useProgress(courseId);
  const enrollMutation = useEnroll();

  // Track page view
  React.useEffect(() => {
    if (course) {
      lmsAnalytics.viewCourse(course.id, course.title);
    }
  }, [course]);

  const handleEnroll = async () => {
    try {
      await enrollMutation.mutateAsync(courseId);
      lmsAnalytics.enrollCourse(courseId);
    } catch (error) {
      console.error('Failed to enroll:', error);
    }
  };

  if (courseLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{t('errors.course_not_found')}</p>
      </div>
    );
  }

  const completedLessons = progress?.filter(p => p.completed).length || 0;
  const totalLessons = lessons?.length || 0;
  const progressPercentage = calculateProgress(completedLessons, totalLessons);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow">
        {course.coverUrl && (
          <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${course.coverUrl})` }}>
            <div className="h-full bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Link href="/user/learn" className="text-blue-600 hover:text-blue-800">
            ← {t('common.back')} to {t('catalog.title')}
          </Link>

          {/* Title & Meta */}
          <h1 className="mt-4 text-4xl font-bold text-gray-900">{course.title}</h1>
          
          {course.summary && (
            <p className="mt-2 text-lg text-gray-600">{course.summary}</p>
          )}

          {/* Meta Info */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            {course.category && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {course.category.name}
              </span>
            )}
            {course.difficulty && (
              <span className="capitalize">
                {t('course.difficulty')}: {course.difficulty}
              </span>
            )}
            {course.duration && (
              <span>
                {t('course.duration')}: {formatDuration(course.duration)}
              </span>
            )}
          </div>

          {/* Enrollment Status & Action */}
          <div className="mt-6">
            {course.isEnrolled ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{t('course.progress')}</span>
                  <span className="text-sm text-gray-600">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <Link
                  href={`/user/learn/courses/${courseId}/lessons/${lessons?.[0]?.id}`}
                  className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {t('course.continue_learning')}
                </Link>
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={enrollMutation.isPending}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {enrollMutation.isPending ? t('common.loading') : t('course.enroll_now')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            {course.description && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">{t('course.overview')}</h2>
                <div className="prose max-w-none text-gray-700">
                  {course.description}
                </div>
              </div>
            )}

            {/* Lessons List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">
                {t('course.lessons')} ({totalLessons})
              </h2>

              {lessonsLoading ? (
                <p className="text-gray-500">{t('common.loading')}</p>
              ) : !lessons || lessons.length === 0 ? (
                <p className="text-gray-500">{t('course.no_lessons')}</p>
              ) : (
                <div className="space-y-2">
                  {lessons.map((lesson, index) => {
                    const lessonProgress = progress?.find(p => p.lessonId === lesson.id);
                    const isCompleted = lessonProgress?.completed || false;

                    return (
                      <Link
                        key={lesson.id}
                        href={`/user/learn/courses/${courseId}/lessons/${lesson.id}`}
                        className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-sm font-semibold">
                              {index + 1}
                            </span>
                            <div>
                              <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                              {lesson.durationSec && (
                                <p className="text-sm text-gray-500">{formatDuration(lesson.durationSec)}</p>
                              )}
                            </div>
                          </div>
                          {isCompleted && (
                            <span className="text-green-600">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Course Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons</span>
                  <span className="font-medium">{totalLessons}</span>
                </div>
                {course.enrollmentCount !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students</span>
                    <span className="font-medium">{course.enrollmentCount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium">
                    {course.isEnrolled ? t('catalog.enrolled') : 'Not Enrolled'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

