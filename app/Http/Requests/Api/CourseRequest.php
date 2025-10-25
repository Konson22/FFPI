<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
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
        $courseId = $this->route('course') ?? $this->route('id');
        
        return [
            'course_code' => 'required|string|max:50|unique:courses,course_code,' . $courseId,
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'category' => 'required|string|max:100',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
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
            'course_code.required' => 'Course code is required.',
            'course_code.string' => 'Course code must be a string.',
            'course_code.max' => 'Course code cannot exceed 50 characters.',
            'course_code.unique' => 'This course code is already taken.',
            'title.required' => 'Course title is required.',
            'title.string' => 'Course title must be a string.',
            'title.max' => 'Course title cannot exceed 255 characters.',
            'description.required' => 'Course description is required.',
            'description.string' => 'Course description must be a string.',
            'description.max' => 'Course description cannot exceed 2000 characters.',
            'category.required' => 'Course category is required.',
            'category.string' => 'Course category must be a string.',
            'category.max' => 'Course category cannot exceed 100 characters.',
            'order.integer' => 'Order must be an integer.',
            'order.min' => 'Order must be at least 0.',
            'is_active.boolean' => 'Is active must be true or false.',
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
            'course_code' => 'course code',
            'title' => 'course title',
            'description' => 'course description',
            'category' => 'course category',
            'order' => 'order',
            'is_active' => 'is active',
        ];
    }
}
