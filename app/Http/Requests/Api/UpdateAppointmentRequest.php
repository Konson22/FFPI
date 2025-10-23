<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAppointmentRequest extends FormRequest
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
            'appointment_date' => 'sometimes|required|date|after:now',
            'start_time' => 'sometimes|required|date_format:H:i',
            'end_time' => 'sometimes|required|date_format:H:i|after:start_time',
            'duration_minutes' => 'nullable|integer|min:15|max:240',
            'appointment_type' => 'sometimes|required|in:consultation,follow_up,emergency,routine_checkup,family_planning,prenatal,postnatal,contraception_counseling,fertility_assessment,general_health',
            'reason_for_visit' => 'nullable|string|max:1000',
            'symptoms' => 'nullable|string|max:2000',
            'notes' => 'nullable|string|max:2000',
            'priority' => 'nullable|in:low,normal,high,urgent',
            'consultation_type' => 'nullable|in:in_person,online,phone',
            'meeting_link' => 'nullable|url|required_if:consultation_type,online',
            'meeting_id' => 'nullable|string|max:255|required_if:consultation_type,online',
            'clinic_location' => 'nullable|string|max:255',
            'room_number' => 'nullable|string|max:50',
            'consultation_fee' => 'nullable|numeric|min:0',
            'contraception_method' => 'nullable|in:none,condom,birth_control_pill,iud,implant,injection,patch,ring,sterilization,natural_family_planning,emergency_contraception',
            'last_menstrual_period' => 'nullable|date|before_or_equal:today',
            'pregnancy_test_required' => 'nullable|boolean',
            'reminder_hours_before' => 'nullable|integer|min:1|max:168',
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
            'appointment_date.required' => 'Appointment date is required.',
            'appointment_date.date' => 'Appointment date must be a valid date.',
            'appointment_date.after' => 'Appointment date must be in the future.',
            'start_time.required' => 'Start time is required.',
            'start_time.date_format' => 'Start time must be in HH:MM format.',
            'end_time.required' => 'End time is required.',
            'end_time.date_format' => 'End time must be in HH:MM format.',
            'end_time.after' => 'End time must be after start time.',
            'duration_minutes.integer' => 'Duration must be an integer.',
            'duration_minutes.min' => 'Duration must be at least 15 minutes.',
            'duration_minutes.max' => 'Duration cannot exceed 240 minutes.',
            'appointment_type.required' => 'Appointment type is required.',
            'appointment_type.in' => 'Invalid appointment type selected.',
            'reason_for_visit.max' => 'Reason for visit cannot exceed 1000 characters.',
            'symptoms.max' => 'Symptoms cannot exceed 2000 characters.',
            'notes.max' => 'Notes cannot exceed 2000 characters.',
            'priority.in' => 'Priority must be one of: low, normal, high, urgent.',
            'consultation_type.in' => 'Consultation type must be one of: in_person, online, phone.',
            'meeting_link.url' => 'Meeting link must be a valid URL.',
            'meeting_link.required_if' => 'Meeting link is required for online consultations.',
            'meeting_id.required_if' => 'Meeting ID is required for online consultations.',
            'clinic_location.max' => 'Clinic location cannot exceed 255 characters.',
            'room_number.max' => 'Room number cannot exceed 50 characters.',
            'consultation_fee.numeric' => 'Consultation fee must be a number.',
            'consultation_fee.min' => 'Consultation fee cannot be negative.',
            'contraception_method.in' => 'Invalid contraception method selected.',
            'last_menstrual_period.date' => 'Last menstrual period must be a valid date.',
            'last_menstrual_period.before_or_equal' => 'Last menstrual period cannot be in the future.',
            'pregnancy_test_required.boolean' => 'Pregnancy test required must be true or false.',
            'reminder_hours_before.integer' => 'Reminder hours must be an integer.',
            'reminder_hours_before.min' => 'Reminder must be at least 1 hour before appointment.',
            'reminder_hours_before.max' => 'Reminder cannot be more than 168 hours (1 week) before appointment.',
        ];
    }
}
