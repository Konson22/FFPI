# Middleware Setup for Role-Based Authentication

This document explains the middleware setup for protecting pages based on user roles in the family planning application.

## Middleware Overview

### 1. RoleMiddleware (`app/Http/Middleware/RoleMiddleware.php`)

- **Purpose**: Ensures users have the exact required role to access a page
- **Usage**: `role:admin`, `role:expert`, `role:user`
- **Behavior**:
    - Redirects unauthenticated users to login
    - Redirects users with wrong roles to their appropriate dashboard
    - Allows access only if user has the exact required role

### 2. RoleOrHigherMiddleware (`app/Http/Middleware/RoleOrHigherMiddleware.php`)

- **Purpose**: Allows users with the required role or higher privileges
- **Usage**: `role.or.higher:user` (allows user, expert, and admin)
- **Role Hierarchy**: user (1) < expert (2) < admin (3)
- **Behavior**:
    - Redirects unauthenticated users to login
    - Allows access if user has required role or higher
    - Redirects users with insufficient privileges to their dashboard

### 3. RedirectIfAuthenticated (`app/Http/Middleware/RedirectIfAuthenticated.php`)

- **Purpose**: Redirects authenticated users away from guest pages
- **Usage**: `guest` middleware
- **Behavior**:
    - Redirects authenticated users to their role-appropriate dashboard
    - Allows guest users to access public pages

## Route Protection Structure

### Guest Routes (Public Access)

```
/ (home)
/about
/contact
/services
/users (public team page)
```

- **Middleware**: None (public access)
- **Pages**: `resources/js/pages/guest/`

### User Routes (Authenticated Users)

```
/user/dashboard
/user/health
/user/users
/user/profile
```

- **Middleware**: `['auth', 'role:user']`
- **Pages**: `resources/js/pages/user/`

### Expert Routes (Content Management)

```
/experts/dashboard
/experts/topics
/experts/topics/create
/experts/moderation
/experts/user-health
```

- **Middleware**: `['auth', 'role:expert']`
- **Pages**: `resources/js/pages/experts/`

### Admin Routes (Full System Access)

```
/admin/dashboard
/admin/users
/admin/content/topics
/admin/user-dashboard
/admin/expert-dashboard
```

- **Middleware**: `['auth', 'role:admin']`
- **Pages**: `resources/js/pages/admin/`

## Middleware Registration

All middlewares are registered in `bootstrap/app.php`:

```php
$middleware->alias([
    'role' => RoleMiddleware::class,
    'role.or.higher' => RoleOrHigherMiddleware::class,
    'guest' => RedirectIfAuthenticated::class,
]);
```

## Usage Examples

### Protecting a route with exact role requirement:

```php
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin-only', [Controller::class, 'method']);
});
```

### Protecting a route with role hierarchy:

```php
Route::middleware(['auth', 'role.or.higher:user'])->group(function () {
    Route::get('/user-and-above', [Controller::class, 'method']);
});
```

### Redirecting authenticated users from guest pages:

```php
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin']);
    Route::get('/register', [AuthController::class, 'showRegister']);
});
```

## Error Handling

- **Unauthenticated users**: Redirected to login page with error message
- **Wrong role access**: Redirected to appropriate dashboard with error message
- **Invalid role**: Redirected to home page with error message

## Frontend Integration

The middleware works seamlessly with Inertia.js and React components. Each protected route will render the appropriate React component based on the user's role and authentication status.

## Security Features

1. **Role-based access control**: Each page is protected by the appropriate role middleware
2. **Automatic redirects**: Users are automatically redirected to their appropriate dashboard
3. **Error messages**: Clear feedback when access is denied
4. **Hierarchical permissions**: Higher roles can access lower role pages when needed
