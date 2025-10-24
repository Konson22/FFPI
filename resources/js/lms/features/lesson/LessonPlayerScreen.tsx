/**
 * Lesson Player Screen
 * Plays different lesson types: video, quiz, HTML content
 */

import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { useLesson, useLessons, useUpdateProgress } from '../../hooks/useLmsQuery';
import { useLmsTranslation } from '../../i18n';
import { lmsAnalytics } from '../../services/analytics/lmsAnalyticsService';
import { formatDuration } from '../../../core/lms/utils';

interface LessonPlayerScreenProps {
  courseId: string | number;
  lessonId: string | number;
}

export default function LessonPlayerScreen({ courseId, lessonId }: LessonPlayerScreenProps) {
  const { t } = useLmsTranslation();
  const { data: lesson, isLoading } = useLesson(lessonId);
  const { data: allLessons } = useLessons(courseId);
  const updateProgress = useUpdateProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  // Track lesson start
  useEffect(() => {
    if (lesson) {
      lmsAnalytics.startLesson(lesson.id, courseId);
    }
  }, [lesson, courseId]);

  const handleComplete = async () => {
    if (isCompleted) return;

    setIsCompleted(true);
    await updateProgress.mutateAsync({
      courseId,
      lessonId,
      pct: 100,
      completed: true,
    });

    lmsAnalytics.completeLesson(lessonId, courseId);
  };

  const findNextLesson = () => {
    if (!allLessons || !lesson) return null;
    const currentIndex = allLessons.findIndex(l => l.id === lessonId);
    return currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;
  };

  const findPreviousLesson = () => {
    if (!allLessons || !lesson) return null;
    const currentIndex = allLessons.findIndex(l => l.id === lessonId);
    return currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  };

  const nextLesson = findNextLesson();
  const prevLesson = findPreviousLesson();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{t('errors.lesson_not_found')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={`/user/learn/courses/${courseId}`} className="text-blue-600 hover:text-blue-800">
            ← {t('common.back')}
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{lesson.title}</h1>
          {lesson.durationSec && (
            <p className="text-sm text-gray-600 mt-1">
              {t('lesson.duration', { duration: formatDuration(lesson.durationSec) })}
            </p>
          )}
        </div>
      </div>

      {/* Lesson Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Player Area */}
          <div className="bg-black">
            {lesson.type === 'video' && lesson.mediaUrl && (
              <VideoPlayer src={lesson.mediaUrl} onComplete={handleComplete} />
            )}
            {lesson.type === 'document' && lesson.documentUrl && (
              <DocumentViewer src={lesson.documentUrl} />
            )}
            {lesson.type === 'html' && lesson.htmlContent && (
              <HtmlContentViewer content={lesson.htmlContent} />
            )}
            {lesson.type === 'quiz' && (
              <div className="p-8 text-white text-center">
                <h2 className="text-2xl font-semibold">{t('lesson.quiz')}</h2>
                <p className="mt-2">{t('lesson.start_quiz')}</p>
                <button className="mt-4 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
                  {t('lesson.start_quiz')}
                </button>
              </div>
            )}
          </div>

          {/* Lesson Details */}
          <div className="p-6">
            {lesson.description && (
              <div className="prose max-w-none text-gray-700 mb-6">
                {lesson.description}
              </div>
            )}

            {/* Resources */}
            {lesson.resources && lesson.resources.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">{t('lesson.resources')}</h3>
                <div className="space-y-2">
                  {lesson.resources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.fileUrl}
                      download
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">{resource.title}</p>
                        {resource.description && (
                          <p className="text-sm text-gray-500">{resource.description}</p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <div>
                {prevLesson && (
                  <Link
                    href={`/user/learn/courses/${courseId}/lessons/${prevLesson.id}`}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    ← {t('lesson.previous')}
                  </Link>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleComplete}
                  disabled={isCompleted || updateProgress.isPending}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {isCompleted ? t('lesson.completed') : t('lesson.complete')}
                </button>

                {nextLesson && (
                  <Link
                    href={`/user/learn/courses/${courseId}/lessons/${nextLesson.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {t('lesson.next')} →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Video Player Component
 */
interface VideoPlayerProps {
  src: string;
  onComplete?: () => void;
}

function VideoPlayer({ src, onComplete }: VideoPlayerProps) {
  const handleEnded = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <video
      className="w-full"
      controls
      onEnded={handleEnded}
      style={{ maxHeight: '600px' }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

/**
 * Document Viewer Component
 */
interface DocumentViewerProps {
  src: string;
}

function DocumentViewer({ src }: DocumentViewerProps) {
  return (
    <iframe
      src={src}
      className="w-full"
      style={{ height: '600px' }}
      title="Document Viewer"
    />
  );
}

/**
 * HTML Content Viewer
 */
interface HtmlContentViewerProps {
  content: string;
}

function HtmlContentViewer({ content }: HtmlContentViewerProps) {
  return (
    <div className="p-8 bg-white">
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

