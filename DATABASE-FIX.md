# Database Fix Guide

## Problem
The `modules` table is missing the `course_id` column, causing errors when trying to count modules per course.

## Solution

You need to run the database migrations to create the missing column. Here are the steps:

### Option 1: Run All Migrations (Recommended)
Open your terminal in the project directory and run:
```bash
php artisan migrate
```

This will run all pending migrations, including creating the `course_id` column in the `modules` table.

### Option 2: Manually Add the Column (Quick Fix)
If migrations are not working, you can manually add the column using SQL:

```sql
ALTER TABLE `modules` ADD COLUMN `course_id` BIGINT UNSIGNED NULL AFTER `id`;
ALTER TABLE `modules` ADD CONSTRAINT `modules_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;
```

### Option 3: Fresh Migration (Nuclear Option)
If you're in development and can lose data:
```bash
php artisan migrate:fresh
```
⚠️ **WARNING**: This will delete all data in your database!

## After Fixing

Once the `course_id` column is added, you can restore the full functionality in `CourseController` by:
1. Reverting the temporary changes in `app/Http/Controllers/Admin/CourseController.php`
2. Uncomment the `withCount` and `with` methods

## Current Status

The `CourseController` has been temporarily modified to work without the `course_id` column. The admin pages will load, but won't show module/lesson counts until the migration is run.
