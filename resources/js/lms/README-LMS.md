# LMS Module Documentation

## Overview

The LMS (Learning Management System) module is a self-contained, production-ready learning platform that can be integrated into your application without modifying existing features. It's designed to be additive-only and isolated.

## Features

- 🎓 Course catalog and discovery
- 📚 Lesson player (video, quiz, HTML packages)
- 📊 Progress tracking and analytics
- 🏆 Gamification (XP, badges, rewards)
- 📱 Offline-first with sync
- 🌍 Multi-language support (English, Arabic)
- 📲 Push notifications
- 🔍 Search and filtering

## Architecture

### Module Structure

```
resources/js/lms/
├── adapters/           # LMS backend adapters
│   ├── lms.types.ts    # Shared types and interfaces
│   ├── lms.adapter.ts  # Adapter interface and factory
│   ├── mvp/            # MVP backend adapter (Supabase/Firebase)
│   └── moodle/         # Moodle integration (scaffolded)
├── features/           # Feature screens and components
│   ├── catalog/
│   ├── course/
│   ├── lesson/
│   ├── progress/
│   ├── rewards/
│   ├── downloads/
│   └── profile/
├── services/           # Business logic and infrastructure
│   ├── auth/
│   ├── notifications/
│   ├── analytics/
│   └── storage/
├── hooks/              # Custom React hooks
├── i18n/               # Internationalization
├── navigation/         # LMS-specific navigation
└── README-LMS.md

resources/js/core/lms/
├── config.ts           # Feature flags and configuration
└── utils.ts            # Utility functions
```

### Design Principles

1. **Isolation**: No modifications to existing app code
2. **Optional**: Can be completely disabled via feature flag
3. **Pluggable**: Swap backend adapters without changing UI code
4. **Offline-first**: Works without network connection
5. **Type-safe**: Full TypeScript coverage

## Setup

### 1. Environment Variables

Create `.env` (or `.env.local`) and add:

```bash
# Enable/disable LMS module
LMS_ENABLE=false

# Backend adapter (mvp or moodle)
LMS_ADAPTER=mvp

# Supabase Configuration (if using MVP adapter)
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key

# Or Firebase Configuration
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-bucket
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id

# Moodle Configuration (if using Moodle adapter)
MOODLE_BASE_URL=https://your-moodle-instance.com
MOODLE_TOKEN=your-ws-token
```

### 2. Database Setup (MVP Adapter)

If using Supabase, run the following SQL:

```sql
-- Courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  cover_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Modules table
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  lesson_type TEXT NOT NULL, -- video, quiz, html
  order_index INTEGER,
  duration_sec INTEGER,
  media_url TEXT,
  html_bundle_url TEXT,
  quiz_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enrollments table
CREATE TABLE enrollments (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, course_id)
);

-- Progress tracking
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  percentage INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Gamification
CREATE TABLE user_wallet (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1
);

CREATE TABLE xp_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  context JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badges
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT
);

CREATE TABLE user_badges (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_wallet ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Courses are viewable by everyone" ON courses FOR SELECT USING (true);
CREATE POLICY "Users can view their enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can enroll in courses" ON enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their progress" ON progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their progress" ON progress FOR ALL USING (auth.uid() = user_id);
```

### 3. Dependencies

The module requires these packages. Add them to your `package.json`:

```bash
npm install --save \
  @tanstack/react-query \
  i18next \
  react-i18next \
  zod \
  dayjs \
  axios \
  react-native-mmkv

# For Supabase MVP adapter
npm install --save @supabase/supabase-js

# For File System and Media
npm install --save expo-file-system expo-av

# For Notifications
npm install --save expo-notifications expo-device
```

### 4. Enable the Module

In your app's entry point, conditionally initialize the LMS:

```typescript
// app.js or App.js
import { isLmsEnabled } from './resources/js/core/lms/config';

if (isLmsEnabled()) {
  // LMS will be available
  // Mount it manually in your navigation when ready
}
```

## Usage

### Preview Mode (Development)

To preview the LMS without integrating it into your app:

```typescript
// In a dev-only route or component
import { LmsApp } from './resources/js/lms';

// In your route
<Route path="/lms-preview" element={<LmsApp />} />
```

### Integration (Production)

When ready to integrate:

1. Enable the module in `.env`:
   ```bash
   LMS_ENABLE=true
   ```

2. Add LMS navigation to your app:
   ```typescript
   import { LmsNavigator } from './resources/js/lms/navigation/LmsNavigator';
   
   // In your main navigation
   <Tab.Screen
     name="Learn"
     component={LmsNavigator}
     options={{ title: 'Learn' }}
   />
   ```

3. Optionally add deep linking:
   ```typescript
   // app.json
   {
     "expo": {
       "scheme": "your-app",
       "deepLinking": {
         "prefixes": ["your-app://", "lms://"]
       }
     }
   }
   ```

## API Reference

### Adapter Interface

All backend interactions go through the `LmsAdapter` interface:

```typescript
import { getLmsAdapter } from './lms/adapters/lms.adapter';

const adapter = getLmsAdapter();

// List courses
const courses = await adapter.listCourses({ search: 'health' });

// Enroll in a course
await adapter.enroll(courseId);

// Get lesson
const lesson = await adapter.getLesson(lessonId);

// Update progress
await adapter.updateProgress({
  courseId,
  lessonId,
  pct: 100,
  completed: true
});

// Earn XP
await adapter.postXPEvent({
  type: 'complete_lesson',
  amount: 50
});
```

### Custom Hooks

```typescript
import { useCourses, useLesson, useProgress } from './lms/hooks';

// In your component
function MyComponent() {
  const { data: courses, isLoading } = useCourses();
  const { data: lesson } = useLesson(lessonId);
  const progress = useProgress(courseId);
  
  return <div>{/* ... */}</div>;
}
```

### Services

```typescript
import { lmsAuth } from './lms/services/auth/lmsAuthService';
import { lmsNotifications } from './lms/services/notifications/lmsNotificationsService';
import { lmsAnalytics } from './lms/services/analytics/lmsAnalyticsService';

// Authentication
const token = await lmsAuth.getAccessToken();

// Notifications
await lmsNotifications.registerDevice();

// Analytics
lmsAnalytics.track('view_course', { courseId });
```

## Testing

### Unit Tests

```bash
npm run test -- lms/
```

### E2E Tests

```bash
npm run test:e2e -- --path=lms
```

### Manual Testing Checklist

- [ ] App runs with `LMS_ENABLE=false`
- [ ] Can enroll in a course
- [ ] Video lesson plays
- [ ] Quiz can be completed
- [ ] Progress updates correctly
- [ ] XP awarded on lesson completion
- [ ] Badges unlock
- [ ] Downloads work offline
- [ ] Resume functionality works
- [ ] i18n switches language

## Troubleshooting

### LMS Not Loading

- Check `LMS_ENABLE=true` in `.env`
- Verify database connection
- Check console for errors

### Offline Not Working

- Ensure permissions for file system
- Check storage quota
- Verify MMKV is installed

### Authentication Issues

- Confirm backend credentials in `.env`
- Check RLS policies in database
- Verify user ID is correct

## Contributing

When adding new features:

1. Keep them within the `lms/` directory
2. Don't modify existing app files
3. Update types in `lms.types.ts`
4. Add tests
5. Update this README

## License

Same as parent project.

## Support

For issues or questions, create an issue in the repository.
