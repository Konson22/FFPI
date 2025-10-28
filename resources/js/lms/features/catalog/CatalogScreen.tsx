/**
 * Course Catalog Screen
 * Displays all available courses with search and filtering
 */

import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { useCourses } from '../../hooks/useLmsQuery';
import { useLmsTranslation } from '../../i18n';
import type { Course } from '../../adapters/lms.types';
import { formatDuration } from '../../../core/lms/utils';

export default function CatalogScreen() {
  const { t } = useLmsTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  
  const { data: courses, isLoading, error } = useCourses({
    search: searchQuery || undefined,
    categoryId: selectedCategory,
  });

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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">{t('errors.generic')}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{t('catalog.title')}</h1>
          
          {/* Search Bar */}
          <div className="mt-4">
            <input
              type="text"
              placeholder={t('catalog.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!courses || courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('catalog.no_courses')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Course Card Component
 */
interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  const { t } = useLmsTranslation();

  return (
    <Link href={`/user/learn/courses/${course.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {/* Cover Image */}
        {course.coverUrl && (
          <img
            src={course.coverUrl}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
        )}
        {!course.coverUrl && (
          <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600" />
        )}

        {/* Content */}
        <div className="p-5">
          {/* Category Badge */}
          {course.category && (
            <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded">
              {course.category.name}
            </span>
          )}

          {/* Title */}
          <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2">
            {course.title}
          </h3>

          {/* Summary */}
          {course.summary && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
              {course.summary}
            </p>
          )}

          {/* Meta Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            {course.duration && (
              <span>{formatDuration(course.duration)}</span>
            )}
            {course.difficulty && (
              <span className="capitalize">{course.difficulty}</span>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-4">
            {course.isEnrolled ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">
                  {t('catalog.enrolled')}
                </span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-600">{course.progress}%</span>
              </div>
            ) : (
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {t('catalog.enroll')}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

