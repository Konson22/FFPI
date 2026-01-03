<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class QuestionRequest extends FormRequest
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
            'question' => 'required|string|min:10|max:2000',
            'category' => 'required|string',
            'is_anonymous' => 'nullable|boolean',
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
            'question.required' => 'Question is required.',
            'question.string' => 'Question must be a string.',
            'question.min' => 'Question must be at least 10 characters.',
            'question.max' => 'Question cannot exceed 2000 characters.',
            'category.required' => 'Category is required.',
            'category.in' => 'Category must be one of: general, contraception, relationships, mental-health, reproductive-health, stis.',
            'is_anonymous.boolean' => 'Is anonymous must be true or false.',
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
            'question' => 'question',
            'category' => 'category',
            'is_anonymous' => 'is anonymous',
        ];
    }
}

