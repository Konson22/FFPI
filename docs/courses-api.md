# Courses API Documentation

This document describes the Courses API endpoints for managing courses, enrollments, and progress tracking.

## Base URL

```
/api/courses
```

## Authentication

Most endpoints require authentication using Laravel Sanctum. Include the Bearer token in the Authorization header:

```
Authorization: Bearer {token}
```

## Endpoints

### 1. Get All Courses

**GET** `/api/courses`

**Description:** Retrieve all active courses with their modules, lessons, and enrollment counts.

**Authentication:** Not required

**Response:**

```json
{
    "success": true,
    "message": "Courses retrieved successfully.",
    "data": [
        {
            "id": 1,
            "course_code": "SRHR-001",
            "title": "Introduction to Sexual and Reproductive Health",
            "description": "A comprehensive course covering the basics of SRHR.",
            "category": "Health Education",
            "order": 1,
            "is_active": true,
            "modules_count": 5,
            "lessons_count": 25,
            "enrollments_count": 150,
            "created_at": "2024-01-15T09:00:00.000000Z",
            "updated_at": "2024-01-15T09:00:00.000000Z"
        }
    ]
}
```

### 2. Create Course

**POST** `/api/courses`

**Description:** Create a new course.

**Authentication:** Required

**Request Body:**

```json
{
    "course_code": "SRHR-001",
    "title": "Introduction to Sexual and Reproductive Health",
    "description": "A comprehensive course covering the basics of SRHR.",
    "category": "Health Education",
    "order": 1,
    "is_active": true
}
```

**Required Fields:**

- `course_code` (string, max: 50, unique) - Course code
- `title` (string, max: 255) - Course title
- `description` (string, max: 2000) - Course description
- `category` (string, max: 100) - Course category

**Optional Fields:**

- `order` (integer, min: 0) - Display order (default: 0)
- `is_active` (boolean) - Course active status (default: true)

**Success Response (201):**

```json
{
    "success": true,
    "message": "Course created successfully.",
    "data": {
        "id": 1,
        "course_code": "SRHR-001",
        "title": "Introduction to Sexual and Reproductive Health",
        "description": "A comprehensive course covering the basics of SRHR.",
        "category": "Health Education",
        "order": 1,
        "is_active": true,
        "modules_count": 0,
        "lessons_count": 0,
        "enrollments_count": 0,
        "created_at": "2024-01-15T09:00:00.000000Z",
        "updated_at": "2024-01-15T09:00:00.000000Z"
    }
}
```

### 3. Get Single Course

**GET** `/api/courses/{id}`

**Description:** Retrieve a specific course with detailed information including modules, lessons, and enrollments.

**Authentication:** Required

**Parameters:**

- `id` (integer) - Course ID

**Response:**

```json
{
    "success": true,
    "message": "Course retrieved successfully.",
    "data": {
        "id": 1,
        "course_code": "SRHR-001",
        "title": "Introduction to Sexual and Reproductive Health",
        "description": "A comprehensive course covering the basics of SRHR.",
        "category": "Health Education",
        "order": 1,
        "is_active": true,
        "modules": [
            {
                "id": 1,
                "module_code": "MOD-001",
                "title": "Module 1: Basics",
                "description": "Introduction to the basics",
                "order": 1,
                "is_active": true,
                "lessons_count": 5,
                "lessons": [
                    {
                        "id": 1,
                        "title": "Lesson 1: Introduction",
                        "description": "Introduction lesson",
                        "order": 1,
                        "is_active": true
                    }
                ]
            }
        ],
        "modules_count": 1,
        "lessons_count": 5,
        "enrollments_count": 150,
        "enrollments": [
            {
                "id": 1,
                "user": {
                    "id": 1,
                    "name": "John Doe",
                    "email": "john@example.com"
                },
                "status": "enrolled",
                "enrolled_at": "2024-01-15T09:00:00.000000Z",
                "started_at": null,
                "completed_at": null,
                "progress_percentage": 0
            }
        ],
        "created_at": "2024-01-15T09:00:00.000000Z",
        "updated_at": "2024-01-15T09:00:00.000000Z"
    }
}
```

### 4. Update Course

**PUT** `/api/courses/{id}`

**Description:** Update an existing course.

**Authentication:** Required

**Parameters:**

- `id` (integer) - Course ID

**Request Body:** Same as create course, but all fields are optional.

**Response:** Same format as create course response.

### 5. Delete Course

**DELETE** `/api/courses/{id}`

**Description:** Delete a course (only if no enrollments exist).

**Authentication:** Required

**Parameters:**

- `id` (integer) - Course ID

**Response:**

```json
{
    "success": true,
    "message": "Course deleted successfully.",
    "data": null
}
```

**Error Response (400) - Course has enrollments:**

```json
{
    "success": false,
    "message": "Cannot delete course with existing enrollments.",
    "data": null
}
```

### 6. Enroll in Course

**POST** `/api/courses/{id}/enroll`

**Description:** Enroll the authenticated user in a course.

**Authentication:** Required

**Parameters:**

- `id` (integer) - Course ID

**Response:**

```json
{
    "success": true,
    "message": "Successfully enrolled in course.",
    "data": {
        "enrollment_id": 1,
        "course_id": 1,
        "course_title": "Introduction to Sexual and Reproductive Health",
        "status": "enrolled",
        "enrolled_at": "2024-01-15T09:00:00.000000Z",
        "progress_percentage": 0
    }
}
```

**Error Response (400) - Already enrolled:**

```json
{
    "success": false,
    "message": "User is already enrolled in this course.",
    "data": null
}
```

### 7. Get My Enrolled Courses

**GET** `/api/courses/my/enrolled`

**Description:** Get all courses the authenticated user is enrolled in.

**Authentication:** Required

**Response:**

```json
{
    "success": true,
    "message": "Enrolled courses retrieved successfully.",
    "data": [
        {
            "id": 1,
            "course_code": "SRHR-001",
            "title": "Introduction to Sexual and Reproductive Health",
            "description": "A comprehensive course covering the basics of SRHR.",
            "category": "Health Education",
            "modules_count": 5,
            "lessons_count": 25,
            "enrollment": {
                "status": "enrolled",
                "enrolled_at": "2024-01-15T09:00:00.000000Z",
                "started_at": null,
                "completed_at": null,
                "progress_percentage": 0
            },
            "created_at": "2024-01-15T09:00:00.000000Z",
            "updated_at": "2024-01-15T09:00:00.000000Z"
        }
    ]
}
```

### 8. Update Course Progress

**PUT** `/api/courses/{id}/progress`

**Description:** Update the user's progress in a course.

**Authentication:** Required

**Parameters:**

- `id` (integer) - Course ID

**Request Body:**

```json
{
    "progress_percentage": 75,
    "status": "started"
}
```

**Required Fields:**

- `progress_percentage` (integer, 0-100) - Progress percentage

**Optional Fields:**

- `status` (string) - Enrollment status: `enrolled`, `started`, `completed`

**Response:**

```json
{
    "success": true,
    "message": "Progress updated successfully.",
    "data": {
        "enrollment_id": 1,
        "course_id": 1,
        "status": "started",
        "progress_percentage": 75,
        "started_at": "2024-01-15T10:00:00.000000Z",
        "completed_at": null
    }
}
```

## Validation Rules

### Course Creation/Update

- **course_code**: Required, string, max 50 characters, unique
- **title**: Required, string, max 255 characters
- **description**: Required, string, max 2000 characters
- **category**: Required, string, max 100 characters
- **order**: Optional, integer, minimum 0
- **is_active**: Optional, boolean

### Progress Update

- **progress_percentage**: Required, integer, 0-100
- **status**: Optional, must be one of: `enrolled`, `started`, `completed`

## Error Codes

- **200**: Success
- **201**: Created successfully
- **400**: Bad request (e.g., already enrolled, cannot delete with enrollments)
- **401**: Unauthorized (authentication required)
- **404**: Not found (course or enrollment not found)
- **422**: Validation error
- **500**: Server error

## Example Usage

### Creating a Course with cURL

```bash
curl -X POST http://your-domain.com/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "course_code": "SRHR-001",
    "title": "Introduction to Sexual and Reproductive Health",
    "description": "A comprehensive course covering the basics of SRHR.",
    "category": "Health Education",
    "order": 1,
    "is_active": true
  }'
```

### Enrolling in a Course

```bash
curl -X POST http://your-domain.com/api/courses/1/enroll \
  -H "Authorization: Bearer your-token"
```

### Updating Progress

```bash
curl -X PUT http://your-domain.com/api/courses/1/progress \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "progress_percentage": 75,
    "status": "started"
  }'
```

### Creating a Course with JavaScript (Fetch API)

```javascript
const response = await fetch('/api/courses', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    },
    body: JSON.stringify({
        course_code: 'SRHR-001',
        title: 'Introduction to Sexual and Reproductive Health',
        description: 'A comprehensive course covering the basics of SRHR.',
        category: 'Health Education',
        order: 1,
        is_active: true,
    }),
});

const data = await response.json();
console.log(data);
```

## Database Schema

### Courses Table

- `id` - Primary key
- `course_code` - Unique course code
- `title` - Course title
- `description` - Course description
- `category` - Course category
- `order` - Display order
- `is_active` - Active status
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Course Enrollments Table

- `id` - Primary key
- `user_id` - Foreign key to users table
- `course_id` - Foreign key to courses table
- `status` - Enrollment status (enrolled, started, completed)
- `enrolled_at` - Enrollment timestamp
- `started_at` - Start timestamp
- `completed_at` - Completion timestamp
- `progress_percentage` - Progress percentage (0-100)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Related Models

- **Course**: Main course entity
- **Module**: Course modules
- **Lesson**: Course lessons
- **CourseEnrollment**: User course enrollments
- **User**: Course participants

## Status Flow

1. **enrolled** - User has enrolled but not started
2. **started** - User has begun the course
3. **completed** - User has finished the course (progress_percentage = 100)

## Progress Tracking

- Progress is tracked as a percentage (0-100)
- When status changes to `started`, `started_at` is automatically set
- When status changes to `completed`, `completed_at` is automatically set and progress is set to 100
- Progress can be updated independently of status
