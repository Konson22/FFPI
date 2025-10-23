# Mobile API Documentation

## Overview

This document describes the mobile API endpoints specifically designed for EtixSS mobile applications. These endpoints are restricted to `etix_owner` users only.

## Base URL

```
https://your-domain.com/api/mobile
```

## Authentication

All endpoints (except login) require a Bearer token obtained from the login endpoint.

## Endpoints

### 1. Mobile Login

**POST** `/api/mobile/login`

Authenticate an etix_owner user for mobile access.

#### Request Body

```json
{
    "email": "owner@etixss.com",
    "password": "password123",
    "device_name": "iPhone 15 Pro"
}
```

#### Response (Success - 200)

```json
{
    "success": true,
    "message": "Mobile login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "EtixSS Owner",
            "email": "owner@etixss.com",
            "phone": "+1234567890",
            "user_type": "etix_owner",
            "status": "active",
            "email_verified_at": "2024-01-01T00:00:00.000000Z",
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
        },
        "token": "1|abcdef123456...",
        "token_type": "bearer",
        "expires_at": "2024-02-01T00:00:00.000000Z"
    }
}
```

#### Response (Error - 401)

```json
{
    "success": false,
    "message": "Invalid credentials",
    "error": "invalid_credentials"
}
```

#### Response (Error - 403)

```json
{
    "success": false,
    "message": "Access denied. This endpoint is only for EtixSS owners.",
    "error": "access_denied"
}
```

### 2. Mobile Logout

**POST** `/api/mobile/logout`

Logout the current user and revoke their token.

#### Headers

```
Authorization: Bearer {token}
```

#### Response (Success - 200)

```json
{
    "success": true,
    "message": "Logout successful"
}
```

### 3. Get Mobile Profile

**GET** `/api/mobile/profile`

Get the current user's profile information.

#### Headers

```
Authorization: Bearer {token}
```

#### Response (Success - 200)

```json
{
    "success": true,
    "message": "Profile retrieved successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "EtixSS Owner",
            "email": "owner@etixss.com",
            "phone": "+1234567890",
            "user_type": "etix_owner",
            "status": "active",
            "email_verified_at": "2024-01-01T00:00:00.000000Z",
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
        }
    }
}
```

### 4. Refresh Token

**POST** `/api/mobile/refresh-token`

Refresh the current user's authentication token.

#### Headers

```
Authorization: Bearer {token}
```

#### Request Body

```json
{
    "device_name": "iPhone 15 Pro"
}
```

#### Response (Success - 200)

```json
{
    "success": true,
    "message": "Token refreshed successfully",
    "data": {
        "token": "2|xyz789...",
        "token_type": "bearer",
        "expires_at": "2024-02-01T00:00:00.000000Z"
    }
}
```

### 5. Get All Events

**GET** `/api/mobile/events`

Get all events with their categories and bookings for etix_owner users. Only returns events where start_date >= today, sorted by start_date in ascending order.

#### Headers

```
Authorization: Bearer {token}
```

#### Response (Success - 200)

```json
{
    "success": true,
    "message": "Events retrieved successfully",
    "data": {
        "events": [
            {
                "id": 1,
                "name": "Tech Conference 2024",
                "description": "Annual technology conference",
                "location": "Convention Center",
                "latitude": "40.7128",
                "longitude": "-74.0060",
                "image": "https://example.com/image.jpg",
                "event_type": "conference",
                "start_date": "2024-06-15T09:00:00.000000Z",
                "end_date": "2024-06-15T17:00:00.000000Z",
                "status": "upcoming",
                "organization": {
                    "id": 1,
                    "name": "Tech Events Inc",
                    "email": "contact@techevents.com",
                    "phone": "+1234567890"
                },
                "categories": [
                    {
                        "id": 1,
                        "name": "General Admission",
                        "price": 100.0,
                        "quantity_available": 500,
                        "quantity_sold": 150,
                        "is_active": true
                    },
                    {
                        "id": 2,
                        "name": "VIP",
                        "price": 250.0,
                        "quantity_available": 50,
                        "quantity_sold": 25,
                        "is_active": true
                    }
                ],
                "bookings": [
                    {
                        "id": 1,
                        "user_id": 10,
                        "category_id": 1,
                        "category_name": "General Admission",
                        "quantity": 2,
                        "total_amount": 200.0,
                        "status": "confirmed",
                        "created_at": "2024-01-15T10:30:00.000000Z"
                    }
                ],
                "statistics": {
                    "total_bookings": 1,
                    "total_revenue": 200.0,
                    "total_tickets_sold": 2,
                    "total_tickets_available": 550,
                    "sold_out": false
                },
                "created_at": "2024-01-01T00:00:00.000000Z",
                "updated_at": "2024-01-15T10:30:00.000000Z"
            }
        ],
        "total_count": 75
    }
}
```

### 6. Get Single Event

**GET** `/api/mobile/events/{eventId}`

Get a specific event by ID with its categories and bookings.

#### Headers

```
Authorization: Bearer {token}
```

#### Path Parameters

- `eventId`: The ID of the event to retrieve

#### Response (Success - 200)

```json
{
    "success": true,
    "message": "Event retrieved successfully",
    "data": {
        "event": {
            "id": 1,
            "name": "Tech Conference 2024",
            "description": "Annual technology conference",
            "location": "Convention Center",
            "latitude": "40.7128",
            "longitude": "-74.0060",
            "image": "https://example.com/image.jpg",
            "event_type": "conference",
            "start_date": "2024-06-15T09:00:00.000000Z",
            "end_date": "2024-06-15T17:00:00.000000Z",
            "status": "upcoming",
            "organization": {
                "id": 1,
                "name": "Tech Events Inc",
                "email": "contact@techevents.com",
                "phone": "+1234567890"
            },
            "categories": [
                {
                    "id": 1,
                    "name": "General Admission",
                    "price": 100.0,
                    "quantity_available": 500,
                    "quantity_sold": 150,
                    "is_active": true
                }
            ],
            "bookings": [
                {
                    "id": 1,
                    "user_id": 10,
                    "user_name": "John Doe",
                    "user_email": "john@example.com",
                    "category_id": 1,
                    "category_name": "General Admission",
                    "quantity": 2,
                    "total_amount": 200.0,
                    "status": "confirmed",
                    "created_at": "2024-01-15T10:30:00.000000Z"
                }
            ],
            "statistics": {
                "total_bookings": 1,
                "total_revenue": 200.0,
                "total_tickets_sold": 2,
                "total_tickets_available": 500,
                "sold_out": false
            },
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-15T10:30:00.000000Z"
        }
    }
}
```

#### Response (Error - 404)

```json
{
    "success": false,
    "message": "Event not found",
    "error": "event_not_found"
}
```

## Error Codes

| Code | Description                                                |
| ---- | ---------------------------------------------------------- |
| 401  | Unauthenticated - Invalid or missing token                 |
| 403  | Access denied - User is not etix_owner or account inactive |
| 422  | Validation failed - Invalid request data                   |
| 500  | Internal server error                                      |

## Security Features

1. **Role-based Access**: Only `etix_owner` users can access these endpoints
2. **Email Verification**: Users must have verified email addresses
3. **Account Status**: Only active accounts can authenticate
4. **Token Expiration**: Tokens expire after 30 days
5. **Device Tracking**: Each login is associated with a device name
6. **Comprehensive Logging**: All authentication events are logged

## Usage Example

### JavaScript/React Native

```javascript
// Login
const loginResponse = await fetch('https://your-domain.com/api/mobile/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: 'owner@etixss.com',
        password: 'password123',
        device_name: 'iPhone 15 Pro',
    }),
});

const loginData = await loginResponse.json();
const token = loginData.data.token;

// Use token for subsequent requests
const profileResponse = await fetch('https://your-domain.com/api/mobile/profile', {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});
```

### cURL Examples

```bash
# Login
curl -X POST https://your-domain.com/api/mobile/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@etixss.com",
    "password": "password123"
  }'

# Get Profile
curl -X GET https://your-domain.com/api/mobile/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"

# Get All Events
curl -X GET https://your-domain.com/api/mobile/events \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"

# Get Single Event
curl -X GET https://your-domain.com/api/mobile/events/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"

# Logout
curl -X POST https://your-domain.com/api/mobile/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

## Notes

- All timestamps are in ISO 8601 format
- Tokens are valid for 30 days from creation
- Device names should be descriptive for security purposes
- All requests should include proper error handling
- Rate limiting may apply to prevent abuse
