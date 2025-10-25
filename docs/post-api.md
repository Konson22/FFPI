# Post API Documentation

This document describes the Post API endpoints for creating, reading, updating, and deleting posts.

## Base URL

```
/api/posts
```

## Authentication

Most endpoints require authentication using Laravel Sanctum. Include the Bearer token in the Authorization header:

```
Authorization: Bearer {token}
```

## Endpoints

### 1. Get All Posts

**GET** `/api/posts`

**Description:** Retrieve all published posts with their comments and metadata.

**Authentication:** Not required

**Response:**

```json
[
    {
        "id": 1,
        "title": "Post Title",
        "content": "Post content...",
        "category": "Health",
        "author": "John Doe",
        "comments": [
            {
                "id": 1,
                "content": "Great post!",
                "reactions_count": 5,
                "replies_count": 2,
                "commented_at": "2024-01-15T10:30:00.000000Z"
            }
        ],
        "comments_count": 1,
        "allow_comments": true,
        "allow_sharing": true,
        "views_count": 150,
        "likes": 25,
        "timestamp": "2024-01-15T09:00:00.000000Z"
    }
]
```

### 2. Create Post

**POST** `/api/posts`

**Description:** Create a new post.

**Authentication:** Required

**Request Body:**

```json
{
    "title": "Post Title",
    "content": "Post content...",
    "category": "Health",
    "type": "article",
    "status": "published",
    "allow_comments": true,
    "allow_sharing": true,
    "is_featured": false
}
```

**Required Fields:**

- `title` (string, max: 255) - Post title
- `content` (string, max: 5000) - Post content
- `category` (string, max: 100) - Post category

**Optional Fields:**

- `type` (string) - Post type: `article`, `question`, `announcement`, `resource` (default: `article`)
- `status` (string) - Post status: `draft`, `published`, `archived` (default: `published`)
- `allow_comments` (boolean) - Allow comments (default: `true`)
- `allow_sharing` (boolean) - Allow sharing (default: `true`)
- `is_featured` (boolean) - Featured post (default: `false`)

**Success Response (201):**

```json
{
    "success": true,
    "message": "Post created successfully.",
    "data": {
        "id": 1,
        "title": "Post Title",
        "content": "Post content...",
        "category": "Health",
        "author": "John Doe",
        "comments": [],
        "comments_count": 0,
        "allow_comments": true,
        "allow_sharing": true,
        "views_count": 0,
        "likes": 0,
        "timestamp": "2024-01-15T09:00:00.000000Z"
    }
}
```

**Error Responses:**

**Validation Error (422):**

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "title": ["Post title is required."],
        "content": ["Post content is required."],
        "category": ["Post category is required."]
    }
}
```

**Unauthorized (401):**

```json
{
    "success": false,
    "message": "User not authenticated.",
    "data": null
}
```

**Server Error (500):**

```json
{
    "success": false,
    "message": "Failed to create post.",
    "error": "Database connection failed",
    "data": null
}
```

### 3. Get Single Post

**GET** `/api/posts/{id}`

**Description:** Retrieve a specific post by ID.

**Authentication:** Required

**Parameters:**

- `id` (integer) - Post ID

**Response:** Same format as the post object in the "Get All Posts" response.

### 4. Update Post

**PUT** `/api/posts/{id}`

**Description:** Update an existing post.

**Authentication:** Required

**Parameters:**

- `id` (integer) - Post ID

**Request Body:** Same as create post, but all fields are optional.

**Response:** Same format as create post response.

### 5. Delete Post

**DELETE** `/api/posts/{id}`

**Description:** Delete a post.

**Authentication:** Required

**Parameters:**

- `id` (integer) - Post ID

**Response:**

```json
{
    "success": true,
    "message": "Post deleted successfully."
}
```

## Validation Rules

### Post Creation/Update

- **title**: Required, string, max 255 characters
- **content**: Required, string, max 5000 characters
- **category**: Required, string, max 100 characters
- **type**: Optional, must be one of: `article`, `question`, `announcement`, `resource`
- **status**: Optional, must be one of: `draft`, `published`, `archived`
- **allow_comments**: Optional, boolean
- **allow_sharing**: Optional, boolean
- **is_featured**: Optional, boolean

## Error Codes

- **200**: Success
- **201**: Created successfully
- **401**: Unauthorized (authentication required)
- **422**: Validation error
- **500**: Server error

## Example Usage

### Creating a Post with cURL

```bash
curl -X POST http://your-domain.com/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post.",
    "category": "Health",
    "type": "article",
    "status": "published"
  }'
```

### Creating a Post with JavaScript (Fetch API)

```javascript
const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    },
    body: JSON.stringify({
        title: 'My First Post',
        content: 'This is the content of my first post.',
        category: 'Health',
        type: 'article',
        status: 'published',
    }),
});

const data = await response.json();
console.log(data);
```

## Database Schema

The posts table includes the following fields:

- `id` - Primary key
- `user_id` - Foreign key to users table
- `title` - Post title
- `content` - Post content
- `category` - Post category
- `type` - Post type
- `status` - Post status
- `is_featured` - Boolean for featured posts
- `allow_comments` - Boolean for comment permissions
- `allow_sharing` - Boolean for sharing permissions
- `views_count` - Number of views
- `reactions_count` - Number of reactions/likes
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Related Models

- **User**: Post author relationship
- **PostComments**: Post comments
- **PostReaction**: Post reactions/likes
- **PostShare**: Post shares
- **PostMedia**: Post media attachments
