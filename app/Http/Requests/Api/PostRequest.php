<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string|max:5000',
            'category' => 'nullable|string|max:100',
            'type' => 'nullable|string|in:article,question,announcement,resource',
            'status' => 'nullable|string|in:draft,published,archived',
            'allow_comments' => 'nullable|boolean',
            'allow_sharing' => 'nullable|boolean',
            'is_featured' => 'nullable|boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Post title is required.',
            'title.string' => 'Post title must be a string.',
            'title.max' => 'Post title cannot exceed 255 characters.',
            'content.required' => 'Post content is required.',
            'content.string' => 'Post content must be a string.',
            'content.max' => 'Post content cannot exceed 5000 characters.',
            'category.required' => 'Post category is required.',
            'category.string' => 'Post category must be a string.',
            'category.max' => 'Post category cannot exceed 100 characters.',
            'type.string' => 'Post type must be a string.',
            'type.in' => 'Post type must be one of: article, question, announcement, resource.',
            'status.string' => 'Post status must be a string.',
            'status.in' => 'Post status must be one of: draft, published, archived.',
            'allow_comments.boolean' => 'Allow comments must be true or false.',
            'allow_sharing.boolean' => 'Allow sharing must be true or false.',
            'is_featured.boolean' => 'Is featured must be true or false.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'title' => 'post title',
            'content' => 'post content',
            'category' => 'post category',
            'type' => 'post type',
            'status' => 'post status',
            'allow_comments' => 'allow comments',
            'allow_sharing' => 'allow sharing',
            'is_featured' => 'is featured',
        ];
    }
}
