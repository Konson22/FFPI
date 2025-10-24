# LMS Module Documentation

## Overview

This is a **self-contained, production-ready Learning Management System (LMS)** module built for your Laravel + React + Inertia.js application. The module is completely isolated, non-invasive, and can be enabled/disabled via configuration without affecting your existing application.

### Key Features

- ✅ **Isolated Architecture**: All code under `resources/js/lms/` and `app/Http/Controllers/Lms/`
- ✅ **Non-Invasive**: No modifications to existing screens, components, or business logic
- ✅ **Feature Flag Controlled**: Enable/disable via `LMS_ENABLE` environment variable
- ✅ **TypeScript**: Fully typed for better developer experience
- ✅ **Offline Support**: Download lessons for offline access
- ✅ **Gamification**: XP, levels, badges, and streaks
- ✅ **Multi-Language**: English and Arabic (Juba) with RTL support
- ✅ **Dual Adapter**: Built-in Laravel backend (MVP) + Moodle integration scaffold
- ✅ **Progress Tracking**: Track course and lesson completion
- ✅ **Quiz System**: Built-in assessment capabilities
- ✅ **Certificates**: Generate certificates for completed courses
- ✅ **Analytics**: Track user learning behavior

---

## Architecture

### Directory Structure

```
FFPI/
├── resources/js/
│   ├── core/lms/              # Core utilities (isolated)
│   │   ├── config.ts          # Configuration reader
│   │   └── utils.ts           # Helper functions
│   │
│   └── lms/                   # Main LMS module
│       ├── adapters/          # Backend adapters
│       │   ├── lms.types.ts   # Type definitions
│       │   ├── lms.adapter.ts # Adapter interface
│       │   ├── mvp/
│       │   │   └── mvpLmsAdapter.ts    # Laravel backend
│       │   └── moodle/
│       │       └── moodleLmsAdapter.ts # Moodle integration
│       │
│       ├── features/          # Feature modules
│       │   ├── catalog/
│       │   │   └── CatalogScreen.tsx
│       │   ├── course/
│       │   │   └── CourseScreen.tsx
│       │   └── lesson/
│       │       └── LessonPlayerScreen.tsx
│       │
│       ├── services/          # LMS services
│       │   ├── storage/
│       │   │   └── offlineStorage.ts
│       │   └── analytics/
│       │       └── lmsAnalyticsService.ts
│       │
│       ├── hooks/             # React hooks
│       │   └── useLmsQuery.ts
│       │
│       ├── i18n/              # Internationalization
│       │   ├── index.ts
│       │   └── locales/
│       │       ├── en.json
│       │       └── ar-JUBA.json
│       │
│       └── LmsApp.tsx         # Entry point
│
├── app/Http/Controllers/Lms/ # Laravel controllers
│   ├── CourseController.php
│   ├── LessonController.php
│   ├── EnrollmentController.php
│   ├── ProgressController.php
│   ├── GamificationController.php
│   ├── QuizController.php
│   ├── CertificateController.php
│   └── FeedbackController.php
│
├── routes/
│   ├── api.php                # Main routes (modified minimally)
│   └── lms.php                # LMS routes (isolated)
│
└── config/
    └── lms.php                # LMS configuration
```

---

## Installation & Setup

### Step 1: Environment Configuration

Add these variables to your `.env` file:

```env
# Enable LMS Module
LMS_ENABLE=true

# LMS Adapter (mvp = Laravel backend, moodle = Moodle integration)
LMS_ADAPTER=mvp

# LMS Features
LMS_OFFLINE_ENABLED=true
LMS_GAMIFICATION_ENABLED=true
LMS_ANALYTICS_ENABLED=true

# Media Storage
LMS_MEDIA_DISK=public
LMS_DOWNLOADS_PATH=lms/downloads

# Moodle Configuration (Optional, only if using Moodle adapter)
MOODLE_BASE_URL=https://your-moodle.com
MOODLE_TOKEN=your_moodle_token
```

For frontend (Vite), add to `.env`:

```env
VITE_LMS_ENABLE=true
VITE_LMS_ADAPTER=mvp
VITE_LMS_OFFLINE_ENABLED=true
VITE_LMS_GAMIFICATION_ENABLED=true
VITE_LMS_ANALYTICS_ENABLED=true
```

### Step 2: Install Dependencies

The LMS module requires these additional npm packages:

```bash
npm install @tanstack/react-query axios
```

### Step 3: Database Setup

The LMS module uses your existing database tables:
- `modules` (courses)
- `module_categories`
- `lessons`
- `resources`
- `quizzes`
- `quiz_options`
- `user_progress`

These migrations already exist in your project! No additional migrations needed.

### Step 4: Seed Sample Data (Optional)

Create sample LMS content:

```bash
php artisan db:seed --class=ModuleCategoriesSeeder
php artisan db:seed --class=ModulesSeeder
php artisan db:seed --class=LessonsSeeder
php artisan db:seed --class=QuizzesSeeder
```

---

## Integration Guide

### Option 1: Standalone Route (Recommended for Testing)

Create a new Inertia page to test the LMS in isolation:

```php
// routes/web.php
use Inertia\Inertia;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/lms', function () {
        return Inertia::render('LMS/Index');
    });
    
    Route::get('/lms/courses/{courseId}', function ($courseId) {
        return Inertia::render('LMS/Course', ['courseId' => $courseId]);
    });
    
    Route::get('/lms/courses/{courseId}/lessons/{lessonId}', function ($courseId, $lessonId) {
        return Inertia::render('LMS/Lesson', [
            'courseId' => $courseId,
            'lessonId' => $lessonId,
        ]);
    });
});
```

Create the Inertia pages:

```tsx
// resources/js/Pages/LMS/Index.tsx
import React from 'react';
import { LmsApp } from '../../lms/LmsApp';

export default function LmsIndex() {
  return <LmsApp screen="catalog" />;
}

// resources/js/Pages/LMS/Course.tsx
import React from 'react';
import { LmsApp } from '../../lms/LmsApp';

export default function LmsCourse({ courseId }: { courseId: number }) {
  return <LmsApp screen="course" courseId={courseId} />;
}

// resources/js/Pages/LMS/Lesson.tsx
import React from 'react';
import { LmsApp } from '../../lms/LmsApp';

export default function LmsLesson({ courseId, lessonId }: { courseId: number; lessonId: number }) {
  return <LmsApp screen="lesson" courseId={courseId} lessonId={lessonId} />;
}
```

### Option 2: Add to Existing Navigation

To add LMS to your existing application navigation:

```tsx
// In your main layout or navigation component
import { isLmsEnabled } from '../core/lms/config';

export default function Navigation() {
  return (
    <nav>
      {/* Existing nav items */}
      <a href="/">Home</a>
      <a href="/dashboard">Dashboard</a>
      
      {/* LMS Link (only shows if enabled) */}
      {isLmsEnabled() && (
        <a href="/lms">Learning</a>
      )}
    </nav>
  );
}
```

---

## API Endpoints

All LMS API endpoints are prefixed with `/api/lms` and require authentication:

### Courses & Discovery
- `GET /api/lms/courses` - List courses
- `GET /api/lms/courses/{id}` - Get course details
- `GET /api/lms/courses/search?q={query}` - Search courses
- `GET /api/lms/categories` - List categories

### Enrollments
- `POST /api/lms/courses/{id}/enroll` - Enroll in course
- `DELETE /api/lms/courses/{id}/enroll` - Unenroll from course
- `GET /api/lms/enrollments` - List user's enrollments

### Lessons
- `GET /api/lms/courses/{courseId}/lessons` - List lessons
- `GET /api/lms/lessons/{id}` - Get lesson details
- `GET /api/lms/lessons/{id}/quiz` - Get quiz for lesson

### Progress
- `GET /api/lms/courses/{courseId}/progress` - Get course progress
- `POST /api/lms/progress` - Update lesson progress
- `GET /api/lms/progress/resume` - Get last accessed lesson

### Gamification
- `GET /api/lms/wallet` - Get user's XP wallet
- `POST /api/lms/xp` - Post XP event
- `GET /api/lms/badges` - Get user's badges

### Quizzes
- `POST /api/lms/quizzes/{id}/submit` - Submit quiz answers
- `GET /api/lms/lessons/{id}/quiz/attempts` - Get quiz attempts

### Certificates
- `GET /api/lms/certificates` - Get user's certificates
- `POST /api/lms/certificates` - Generate certificate

### Feedback
- `POST /api/lms/feedback` - Submit feedback
- `GET /api/lms/courses/{id}/reviews` - Get course reviews
- `POST /api/lms/courses/{id}/reviews` - Submit review

---

## Features

### 1. Course Catalog
Browse and search all available courses with filtering by category.

### 2. Course Enrollment
Enroll in courses and track your progress through lessons.

### 3. Lesson Player
Support for multiple content types:
- **Video**: HTML5 video player with progress tracking
- **Documents**: PDF and document viewer
- **HTML Content**: Rich text and interactive content
- **Quizzes**: Multiple-choice assessments

### 4. Progress Tracking
- Per-lesson progress tracking
- Course completion percentage
- Resume learning from last accessed lesson
- Time spent tracking

### 5. Gamification
- **XP System**: Earn points for completing lessons
- **Levels**: Progress through levels based on XP
- **Badges**: Unlock achievements
- **Streaks**: Track consecutive learning days

### 6. Offline Support
- Download lessons for offline access
- Queue progress updates when offline
- Automatic sync when back online

### 7. Internationalization
- English (en)
- Arabic - Juba dialect (ar-JUBA) with RTL support
- Easy to add more languages

### 8. Analytics
- Track user learning behavior
- Course and lesson views
- Completion rates
- Quiz performance

---

## Moodle Integration

The LMS module includes a scaffold for Moodle integration. To use it:

1. Set `LMS_ADAPTER=moodle` in `.env`
2. Configure Moodle credentials:
   ```env
   MOODLE_BASE_URL=https://your-moodle.com
   MOODLE_TOKEN=your_web_service_token
   ```

3. Enable Moodle Web Services:
   - Go to Site Administration → Advanced Features → Enable web services
   - Create a web service user
   - Generate a token

4. The adapter maps Moodle data to your LMS types automatically

---

## Customization

### Adding New Lesson Types

1. Add type to `lms.types.ts`:
   ```typescript
   export type LessonType = 'video' | 'quiz' | 'html' | 'document' | 'scorm' | 'your_new_type';
   ```

2. Update `LessonPlayerScreen.tsx` to handle new type

### Custom Gamification Rules

Edit `GamificationController.php` to customize XP awards, badge criteria, etc.

### Styling

The LMS uses Tailwind CSS. Customize colors in your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        lms: {
          primary: '#your-color',
          // ...
        },
      },
    },
  },
};
```

---

## Testing

### Manual Testing

1. Start servers:
   ```bash
   php artisan serve
   npm run dev
   ```

2. Visit `http://localhost:8000/lms`

3. Test flows:
   - Browse catalog
   - Enroll in course
   - Complete lessons
   - Take quizzes
   - Check progress

### API Testing

Use tools like Postman or Insomnia:

```bash
# Get courses
GET http://localhost:8000/api/lms/courses
Authorization: Bearer {your_token}

# Enroll in course
POST http://localhost:8000/api/lms/courses/1/enroll
Authorization: Bearer {your_token}
```

---

## Troubleshooting

### LMS Not Showing

- Check `LMS_ENABLE=true` in `.env`
- Check `VITE_LMS_ENABLE=true` in `.env`
- Clear config cache: `php artisan config:clear`
- Rebuild frontend: `npm run build`

### API Errors

- Check authentication (Laravel Sanctum)
- Verify CSRF token is being sent
- Check browser console for errors
- Review Laravel logs: `storage/logs/laravel.log`

### Styling Issues

- Run `npm run build` to rebuild CSS
- Clear browser cache
- Check Tailwind config includes LMS paths

---

## Performance Considerations

- **Caching**: React Query caches API responses (5-minute default)
- **Lazy Loading**: Components are lazy-loaded
- **Pagination**: Large course lists are paginated
- **Offline Storage**: Uses localStorage (5MB limit in most browsers)
- **Media Optimization**: Store videos on CDN for better performance

---

## Security

- All API endpoints require authentication (`auth:sanctum`)
- CSRF protection enabled
- XSS protection via sanitized HTML rendering
- File upload validation
- RLS (Row Level Security) recommended for multi-tenant scenarios

---

## Roadmap / Future Enhancements

- [ ] Live video streaming
- [ ] Discussion forums per course
- [ ] Assignment submissions
- [ ] Certificate customization
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] SCORM package support
- [ ] Peer review system
- [ ] Instructor dashboard

---

## Support

For issues or questions:
1. Check this README
2. Review code comments
3. Check Laravel logs
4. Consult browser console

---

## License

This LMS module is part of your FFPI project and follows the same license.

---

## Credits

Built with:
- Laravel 12
- React 19
- Inertia.js 2
- TanStack React Query
- Tailwind CSS 4
- TypeScript

---

**Happy Learning! 📚**

