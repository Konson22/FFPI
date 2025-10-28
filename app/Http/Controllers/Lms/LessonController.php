<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Schema;

class LessonController extends Controller
{
    /**
     * List lessons for a course
     */
    public function index(Request $request, $courseId): JsonResponse
    {
        $query = Lesson::where('module_id', $courseId);
        
        // Only filter by published if column exists
        if (Schema::hasColumn('lessons', 'published')) {
            $query->where('published', true);
        } elseif (Schema::hasColumn('lessons', 'is_active')) {
            $query->where('is_active', true);
        }
        
        // Order by 'order' column if it exists, otherwise by id
        if (Schema::hasColumn('lessons', 'order')) {
            $query->orderBy('order');
        } else {
            $query->orderBy('id');
        }
        
        $lessons = $query->get()
            ->map(fn($lesson) => $this->transformLesson($lesson));
        
        return response()->json($lessons);
    }
    
    /**
     * Get single lesson details
     */
    public function show(Request $request, $id): JsonResponse
    {
        // Don't load quiz by default to avoid errors
        $lesson = Lesson::with(['resources'])->findOrFail($id);
        
        // Check if published, fallback to true
        $isPublished = isset($lesson->published) ? $lesson->published : true;
        if (!$isPublished) {
            abort(404);
        }
        
        return response()->json($this->transformLesson($lesson));
    }
    
    /**
     * Transform Lesson model
     */
    private function transformLesson($lesson): array
    {
        // Build base data with safe defaults
        $data = [
            'id' => $lesson->id,
            'courseId' => $lesson->module_id,
            'title' => $lesson->title ?? 'Untitled Lesson',
            'slug' => $lesson->slug ?? "lesson-{$lesson->id}",
            'description' => $lesson->description ?? $lesson->content ?? '',
            'type' => $lesson->type ?? ($lesson->media_type ?? 'html'),
            'order' => $lesson->order ?? 0,
            'durationSec' => $lesson->duration_seconds ?? ($lesson->duration_minutes ? $lesson->duration_minutes * 60 : 0),
            'isPreview' => isset($lesson->is_preview) ? (bool) $lesson->is_preview : false,
            'published' => isset($lesson->published) ? (bool) $lesson->published : (isset($lesson->is_active) ? (bool) $lesson->is_active : true),
            'createdAt' => optional($lesson->created_at)->toISOString() ?? now()->toISOString(),
            'updatedAt' => optional($lesson->updated_at)->toISOString() ?? now()->toISOString(),
        ];
        
        // Add media URLs (check multiple possible column names)
        if (!empty($lesson->video_url)) {
            $data['mediaUrl'] = asset('storage/' . $lesson->video_url);
        } elseif (!empty($lesson->media_url)) {
            $data['mediaUrl'] = $lesson->media_url;
        }
        
        if (!empty($lesson->document_url)) {
            $data['documentUrl'] = asset('storage/' . $lesson->document_url);
        }
        
        if (!empty($lesson->html_content)) {
            $data['htmlContent'] = $lesson->html_content;
        } elseif (!empty($lesson->content)) {
            $data['htmlContent'] = $lesson->content;
        }
        
        // Add resources if loaded
        if ($lesson->relationLoaded('resources') && $lesson->resources) {
            try {
                $data['resources'] = $lesson->resources->map(function ($resource) {
                    return [
                        'id' => $resource->id,
                        'lessonId' => $resource->lesson_id,
                        'title' => $resource->title ?? 'Resource',
                        'description' => $resource->description ?? '',
                        'fileUrl' => asset('storage/' . ($resource->file_path ?? $resource->url ?? '')),
                        'fileType' => $resource->file_type ?? 'file',
                        'fileSize' => $resource->file_size ?? 0,
                    ];
                })->toArray();
            } catch (\Exception $e) {
                $data['resources'] = [];
            }
        }
        
        return $data;
    }
}

