# Moodle LMS Integration

This document describes the Moodle LMS integration implemented in the FFPI learning platform.

## Overview

The Moodle integration allows users to access courses hosted on a Moodle LMS instance directly from the learning hub. This provides a seamless experience where users can discover, enroll in, and access Moodle courses alongside local courses.

## Features

### ✅ Implemented Features

1. **Course Synchronization**
   - Sync courses from Moodle to local database
   - Automatic module and lesson mapping
   - Support for various activity types (video, quiz, document, etc.)

2. **User Enrollment**
   - Enroll users in Moodle courses
   - Automatic user creation in Moodle
   - Local enrollment tracking

3. **Progress Tracking**
   - Sync progress from Moodle
   - Track completion status
   - Update local enrollment records

4. **Learning Hub Integration**
   - Display Moodle courses in dedicated tab
   - Course filtering and search
   - Direct access to Moodle courses

5. **Course Player**
   - Dedicated Moodle course player
   - Course content overview
   - Direct links to Moodle

6. **Admin Management**
   - Sync courses via command line
   - Test Moodle connection
   - Manage course synchronization

## Configuration

### Environment Variables

Add these to your `.env` file:

```bash
# LMS Configuration
LMS_ENABLE=true
LMS_ADAPTER=moodle

# Moodle Configuration
MOODLE_BASE_URL=https://your-moodle-instance.com
MOODLE_TOKEN=your-webservice-token
MOODLE_SYNC_ENABLED=true
MOODLE_SYNC_INTERVAL=3600
MOODLE_AUTO_ENROLL=true
MOODLE_EXTERNAL_ACCESS=true
```

### Moodle Setup

1. **Enable Web Services**
   - Go to Site administration > Advanced features
   - Enable web services

2. **Create Web Service Token**
   - Go to Site administration > Server > Web services > Manage tokens
   - Create a new token for a user with appropriate permissions

3. **Required Capabilities**
   - `webservice/rest:use` - Use REST protocol
   - `moodle/course:view` - View courses
   - `moodle/course:enrolreview` - Review course enrolments
   - `moodle/user:viewdetails` - View user details
   - `moodle/user:editprofile` - Edit user profile

## Usage

### For Administrators

#### Sync Courses from Moodle

```bash
php artisan moodle:sync-courses
```

This command will:
- Test Moodle connection
- Fetch all courses from Moodle
- Create/update local course records
- Sync course content (modules and lessons)

#### Test Moodle Connection

```bash
php artisan tinker
>>> app(\App\Services\Moodle\MoodleLmsAdapter::class)->testConnection()
```

### For Users

1. **Access Learning Hub**
   - Navigate to `/user/learn`
   - Click on "Moodle Courses" tab
   - Browse available Moodle courses

2. **Enroll in Course**
   - Click "Enroll in Moodle" button
   - System will create user in Moodle if needed
   - Enrollment will be tracked locally

3. **Access Course**
   - Click "View Course" to see course overview
   - Click "Open in Moodle" to access full course in Moodle
   - Progress will be synced automatically

## API Endpoints

### Moodle Integration API

All endpoints are prefixed with `/api/lms/moodle/` and require authentication.

- `GET /courses` - Get Moodle courses
- `POST /courses/{courseId}/enroll` - Enroll in Moodle course
- `GET /courses/{courseId}/content` - Get course content
- `GET /courses/{courseId}/enrollment-status` - Check enrollment status
- `POST /sync-progress` - Sync user progress
- `POST /sync-courses` - Sync courses from Moodle
- `GET /test-connection` - Test Moodle connection

## Database Schema

### New Fields Added

#### Courses Table
- `moodle_id` - Moodle course ID
- `moodle_data` - JSON data from Moodle

#### Modules Table
- `moodle_id` - Moodle section ID
- `moodle_data` - JSON data from Moodle

#### Lessons Table
- `moodle_id` - Moodle activity ID
- `lesson_type` - Type of lesson (video, quiz, document, etc.)
- `moodle_data` - JSON data from Moodle

#### Course Enrollments Table
- `moodle_enrolled` - Boolean flag for Moodle enrollment

#### Users Table
- `moodle_id` - Moodle user ID

## Architecture

### Components

1. **MoodleApiService** - Handles Moodle Web Services API calls
2. **MoodleLmsAdapter** - Business logic for Moodle integration
3. **MoodleController** - API endpoints for frontend
4. **SyncMoodleCourses** - Command for course synchronization
5. **MoodleCoursePlayer** - React component for course display

### Data Flow

1. **Course Sync**: Moodle → API → Local Database
2. **User Enrollment**: Frontend → API → Moodle + Local Database
3. **Progress Sync**: Moodle → API → Local Database
4. **Course Access**: Frontend → Local Database → Moodle (external)

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check `MOODLE_BASE_URL` and `MOODLE_TOKEN`
   - Verify Moodle web services are enabled
   - Check user permissions in Moodle

2. **Courses Not Syncing**
   - Run `php artisan moodle:sync-courses`
   - Check Moodle logs for errors
   - Verify token permissions

3. **Enrollment Failed**
   - Check if user exists in Moodle
   - Verify enrollment permissions
   - Check course availability

4. **Progress Not Syncing**
   - Ensure completion tracking is enabled in Moodle
   - Check user permissions for progress viewing
   - Verify course completion settings

### Debug Commands

```bash
# Test connection
php artisan tinker
>>> app(\App\Services\Moodle\MoodleApiService::class)->testConnection()

# Sync specific course
php artisan tinker
>>> app(\App\Services\Moodle\MoodleLmsAdapter::class)->syncCourseContent($courseId, $moodleCourseId)

# Check user enrollment
php artisan tinker
>>> app(\App\Services\Moodle\MoodleLmsAdapter::class)->enrollUser($userId, $courseId)
```

## Future Enhancements

- [ ] Real-time progress synchronization
- [ ] Moodle grade integration
- [ ] Offline course access
- [ ] Advanced course filtering
- [ ] Bulk course management
- [ ] Custom Moodle themes integration
- [ ] Single Sign-On (SSO) integration

## Support

For issues or questions about the Moodle integration:

1. Check the troubleshooting section above
2. Review Moodle logs
3. Check Laravel logs (`storage/logs/laravel.log`)
4. Contact the development team

## License

This integration follows the same license as the main FFPI project.
