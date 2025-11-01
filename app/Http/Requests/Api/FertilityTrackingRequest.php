<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class FertilityTrackingRequest extends FormRequest
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
            'period_start' => 'required|date',
            'period_end' => 'nullable|date|after:period_start',
            'cycle_length' => 'nullable|integer|min:21|max:45',
            'notes' => 'nullable|string|max:1000',
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
            'period_start.required' => 'Period start date is required.',
            'period_start.date' => 'Period start must be a valid date.',
            'period_end.date' => 'Period end must be a valid date.',
            'period_end.after' => 'Period end must be after period start.',
            'cycle_length.integer' => 'Cycle length must be a number.',
            'cycle_length.min' => 'Cycle length must be at least 21 days.',
            'cycle_length.max' => 'Cycle length must not exceed 45 days.',
            'notes.max' => 'Notes cannot exceed 1000 characters.',
        ];
    }
}

