<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class CreateDoctorRequest extends FormRequest
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
            'doctor_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255|unique:doctors,email',
            'address' => 'required|string|max:500',
            'specialization' => 'required|string|max:255',
            'bio' => 'nullable|string|max:2000',
            'license_number' => 'required|string|max:100|unique:doctors,license_number',
            'qualification' => 'required|string|max:500',
            'years_of_experience' => 'required|integer|min:0|max:50',
            'working_hours' => 'nullable|array',
            'working_hours.*.start' => 'required_with:working_hours|date_format:H:i',
            'working_hours.*.end' => 'required_with:working_hours|date_format:H:i|after:working_hours.*.start',
            'is_available' => 'nullable|boolean',
            'consultation_fee' => 'required|numeric|min:0',
            'consultation_duration_minutes' => 'nullable|integer|min:15|max:240',
            'clinic_name' => 'nullable|string|max:255',
            'clinic_address' => 'nullable|string|max:500',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'languages_spoken' => 'nullable|array',
            'languages_spoken.*' => 'string|max:50',
            'certifications' => 'nullable|array',
            'certifications.*' => 'string|max:255',
            'awards' => 'nullable|array',
            'awards.*' => 'string|max:255',
            'profile_picture' => 'nullable|string|max:500',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'string|max:500',
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
            'doctor_name.required' => 'Doctor name is required.',
            'doctor_name.string' => 'Doctor name must be a string.',
            'doctor_name.max' => 'Doctor name cannot exceed 255 characters.',
            'phone.required' => 'Phone number is required.',
            'phone.string' => 'Phone number must be a string.',
            'phone.max' => 'Phone number cannot exceed 20 characters.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Email must be a valid email address.',
            'email.max' => 'Email cannot exceed 255 characters.',
            'email.unique' => 'This email address is already registered.',
            'address.required' => 'Address is required.',
            'address.string' => 'Address must be a string.',
            'address.max' => 'Address cannot exceed 500 characters.',
            'specialization.required' => 'Specialization is required.',
            'specialization.string' => 'Specialization must be a string.',
            'specialization.max' => 'Specialization cannot exceed 255 characters.',
            'bio.string' => 'Bio must be a string.',
            'bio.max' => 'Bio cannot exceed 2000 characters.',
            'license_number.required' => 'License number is required.',
            'license_number.string' => 'License number must be a string.',
            'license_number.max' => 'License number cannot exceed 100 characters.',
            'license_number.unique' => 'This license number is already registered.',
            'qualification.required' => 'Qualification is required.',
            'qualification.string' => 'Qualification must be a string.',
            'qualification.max' => 'Qualification cannot exceed 500 characters.',
            'years_of_experience.required' => 'Years of experience is required.',
            'years_of_experience.integer' => 'Years of experience must be an integer.',
            'years_of_experience.min' => 'Years of experience cannot be negative.',
            'years_of_experience.max' => 'Years of experience cannot exceed 50.',
            'working_hours.array' => 'Working hours must be an array.',
            'working_hours.*.start.required_with' => 'Start time is required for working hours.',
            'working_hours.*.start.date_format' => 'Start time must be in HH:MM format.',
            'working_hours.*.end.required_with' => 'End time is required for working hours.',
            'working_hours.*.end.date_format' => 'End time must be in HH:MM format.',
            'working_hours.*.end.after' => 'End time must be after start time.',
            'is_available.boolean' => 'Availability must be true or false.',
            'consultation_fee.required' => 'Consultation fee is required.',
            'consultation_fee.numeric' => 'Consultation fee must be a number.',
            'consultation_fee.min' => 'Consultation fee cannot be negative.',
            'consultation_duration_minutes.integer' => 'Consultation duration must be an integer.',
            'consultation_duration_minutes.min' => 'Consultation duration must be at least 15 minutes.',
            'consultation_duration_minutes.max' => 'Consultation duration cannot exceed 240 minutes.',
            'clinic_name.string' => 'Clinic name must be a string.',
            'clinic_name.max' => 'Clinic name cannot exceed 255 characters.',
            'clinic_address.string' => 'Clinic address must be a string.',
            'clinic_address.max' => 'Clinic address cannot exceed 500 characters.',
            'latitude.numeric' => 'Latitude must be a number.',
            'latitude.between' => 'Latitude must be between -90 and 90.',
            'longitude.numeric' => 'Longitude must be a number.',
            'longitude.between' => 'Longitude must be between -180 and 180.',
            'languages_spoken.array' => 'Languages spoken must be an array.',
            'languages_spoken.*.string' => 'Each language must be a string.',
            'languages_spoken.*.max' => 'Each language cannot exceed 50 characters.',
            'certifications.array' => 'Certifications must be an array.',
            'certifications.*.string' => 'Each certification must be a string.',
            'certifications.*.max' => 'Each certification cannot exceed 255 characters.',
            'awards.array' => 'Awards must be an array.',
            'awards.*.string' => 'Each award must be a string.',
            'awards.*.max' => 'Each award cannot exceed 255 characters.',
            'profile_picture.string' => 'Profile picture must be a string.',
            'profile_picture.max' => 'Profile picture path cannot exceed 500 characters.',
            'gallery_images.array' => 'Gallery images must be an array.',
            'gallery_images.*.string' => 'Each gallery image must be a string.',
            'gallery_images.*.max' => 'Each gallery image path cannot exceed 500 characters.',
        ];
    }
}
