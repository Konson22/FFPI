<?php

namespace App\Http\Controllers\User;

use App\Events\AnswerSubmitted;
use App\Http\Controllers\Controller;
use App\Models\HealthService;
use App\Models\LessonScore;
use App\Models\ModuleEnrollment;
use App\Models\Module;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\SupportContact;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Calculate learning scores and statistics
        $learningStats = $this->calculateLearningStats($user);
        
        // Get upcoming appointments
        $upcomingAppointments = \App\Models\Appointment::where('patient_id', $user->id)
            ->where('appointment_date', '>=', now())
            ->whereIn('status', ['scheduled', 'confirmed'])
            ->with('doctor:id,doctor_name,specialization')
            ->orderBy('appointment_date', 'asc')
            ->limit(5)
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'doctor_name' => $appointment->doctor->doctor_name,
                    'specialization' => $appointment->doctor->specialization,
                    'appointment_date' => $appointment->appointment_date->format('Y-m-d H:i'),
                    'appointment_date_formatted' => $appointment->appointment_date->format('M d, Y'),
                    'appointment_time_formatted' => $appointment->appointment_date->format('h:i A'),
                    'reason' => $appointment->reason,
                    'status' => $appointment->status,
                    'days_until' => now()->diffInDays($appointment->appointment_date, false),
                ];
            });
        
        // Get user-specific data
        $stats = [
            'welcome_message' => "Welcome back, {$user->name}!",
            'recent_activities' => [],
            'upcoming_appointments' => $upcomingAppointments,
            'health_tips' => [
                'Track your cycle regularly for better health insights',
                'Stay hydrated and maintain a balanced diet',
                'Regular exercise helps with hormonal balance'
            ],
            'learning' => $learningStats
        ];

        return Inertia::render('user/dashboard/index', [
            'user' => $user,
            'stats' => $stats,
            'learningStats' => $learningStats,
            'upcomingAppointments' => $upcomingAppointments,
        ]);
    }

    /**
     * Calculate learning statistics for the user
     */
    private function calculateLearningStats($user)
    {
        // Get all lesson scores for the user
        $lessonScores = LessonScore::where('user_id', $user->id)->get();
        
        // Get all enrollments for the user
        $enrollments = ModuleEnrollment::where('user_id', $user->id)
            ->with(['module' => function($query) {
                $query->withCount(['lessons' => function($query) {
                    $query->where('is_active', true);
                }]);
            }])
            ->get();
        
        // Calculate total lessons attempted
        $totalLessonsAttempted = $lessonScores->count();
        
        // Calculate completed lessons (where percentage >= 75%)
        $completedLessons = $lessonScores->where('percentage', '>=', 75)->count();
        
        // Calculate average quiz score (only from completed lessons)
        $completedScores = $lessonScores->where('percentage', '>=', 75)->pluck('percentage');
        $averageScore = $completedScores->count() > 0 
            ? round($completedScores->avg(), 1) 
            : 0;
        
        // Calculate total modules enrolled
        $totalModulesEnrolled = $enrollments->count();
        
        // Calculate completed modules
        $completedModules = $enrollments->where('status', 'completed')->count();
        
        // Calculate overall progress across all modules
        $totalLessonsInModules = $enrollments->sum(function($enrollment) {
            return $enrollment->module->lessons_count ?? 0;
        });
        
        $overallProgress = $totalLessonsInModules > 0
            ? round(($completedLessons / $totalLessonsInModules) * 100, 1)
            : 0;
        
        // Calculate learning streak (consecutive days with completed lessons)
        $streak = $this->calculateLearningStreak($user);
        
        // Get recent lesson completions (percentage >= 75%)
        $recentCompletions = LessonScore::where('user_id', $user->id)
            ->where('percentage', '>=', 75)
            ->with(['lesson:id,title', 'module:id,title'])
            ->orderBy('updated_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function($score) {
                return [
                    'id' => $score->id,
                    'lesson_title' => $score->lesson->title ?? 'Unknown Lesson',
                    'module_title' => $score->module->title ?? 'Unknown Module',
                    'score' => (int) round($score->percentage),
                    'completed_at' => $score->updated_at->format('M d, Y'),
                    'time_ago' => $score->updated_at->diffForHumans(),
                ];
            });
        
        return [
            'total_lessons_attempted' => $totalLessonsAttempted,
            'completed_lessons' => $completedLessons,
            'average_score' => $averageScore,
            'total_modules_enrolled' => $totalModulesEnrolled,
            'completed_modules' => $completedModules,
            'overall_progress' => $overallProgress,
            'learning_streak_days' => $streak,
            'recent_completions' => $recentCompletions,
        ];
    }

    /**
     * Calculate learning streak (consecutive days with completed lessons)
     */
    private function calculateLearningStreak($user)
    {
        // Get all completed lessons grouped by date (percentage >= 75%)
        $completedDates = LessonScore::where('user_id', $user->id)
            ->where('percentage', '>=', 75)
            ->selectRaw('DATE(updated_at) as completion_date')
            ->distinct()
            ->orderBy('completion_date', 'desc')
            ->pluck('completion_date')
            ->map(function($date) {
                return \Carbon\Carbon::parse($date)->format('Y-m-d');
            })
            ->toArray();
        
        if (empty($completedDates)) {
            return 0;
        }
        
        // Check if today or yesterday has a completion
        $today = \Carbon\Carbon::today()->format('Y-m-d');
        $yesterday = \Carbon\Carbon::yesterday()->format('Y-m-d');
        
        $streak = 0;
        $currentDate = \Carbon\Carbon::parse($completedDates[0]);
        $todayDate = \Carbon\Carbon::today();
        
        // If the most recent completion was today or yesterday, start counting
        if ($completedDates[0] === $today || $completedDates[0] === $yesterday) {
            $streak = 1;
            
            // Check consecutive days
            for ($i = 1; $i < count($completedDates); $i++) {
                $prevDate = \Carbon\Carbon::parse($completedDates[$i - 1]);
                $currentCheckDate = \Carbon\Carbon::parse($completedDates[$i]);
                
                // If dates are consecutive (difference of 1 day)
                if ($prevDate->diffInDays($currentCheckDate) === 1) {
                    $streak++;
                } else {
                    break;
                }
            }
        }
        
        return $streak;
    }

    public function profile()
    {
        $user = Auth::user();
        $user->load('profile');
        
        return Inertia::render('user/profile/index', [
            'user' => $user,
            'profile' => $user->profile
        ]);
    }

    public function profileSetup()
    {
        $user = Auth::user();
        $user->load('profile');
        
        // If profile already exists, redirect to profile page
        if ($user->profile) {
            return redirect()->route('user.profile');
        }
        
        return Inertia::render('user/profile/setup', [
            'user' => $user
        ]);
    }

    public function profileSetupStore(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'gender' => 'nullable|in:male,female,other',
            'date_of_birth' => 'nullable|date|before:today',
            'marital_status' => 'nullable|in:single,married,divorced,widowed',
            'cycle_length' => 'nullable|integer|min:21|max:35',
            'period_length' => 'nullable|integer|min:1|max:10',
            'health_notes' => 'nullable|string|max:1000',
        ]);

        // Create or update profile
        $profile = \App\Models\Profile::updateOrCreate(
            ['user_id' => $user->id],
            array_merge($validated, [
                'cycle_length' => $request->gender === 'female' ? ($request->cycle_length ?? 28) : null,
                'period_length' => $request->gender === 'female' ? ($request->period_length ?? 5) : null,
                'preferences' => [
                    'notifications' => true,
                    'reminders' => true,
                    'privacy_level' => 'normal',
                ],
            ])
        );

        return redirect()->route('user.dashboard')->with('success', 'Profile created successfully!');
    }

    public function familyPlanning()
    {
        $user = Auth::user();
        
        return Inertia::render('user/family-planning/index', [
            'user' => $user
        ]);
    }

    public function appointments(Request $request)
    {
        $user = Auth::user();
        
        // Get doctor ID from query parameter if provided
        $doctorId = $request->get('doctor');
        $doctor = null;
        
        if ($doctorId) {
            $doctor = \App\Models\Doctor::find($doctorId);
        }
        
        // Get all available doctors for selection
        $doctors = \App\Models\Doctor::where('status', 'active')
            ->orderBy('doctor_name', 'asc')
            ->get()
            ->map(function ($doc) {
                return [
                    'id' => $doc->id,
                    'name' => $doc->doctor_name,
                    'specialization' => $doc->specialization,
                ];
            });
        
        // Get user's appointments
        $appointments = \App\Models\Appointment::where('patient_id', $user->id)
            ->with('doctor:id,doctor_name,specialization')
            ->orderBy('appointment_date', 'desc')
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'doctor_name' => $appointment->doctor->doctor_name,
                    'specialization' => $appointment->doctor->specialization,
                    'appointment_date' => $appointment->appointment_date->format('Y-m-d H:i'),
                    'appointment_date_formatted' => $appointment->appointment_date->format('M d, Y h:i A'),
                    'reason' => $appointment->reason,
                    'status' => $appointment->status,
                ];
            });
        
        return Inertia::render('user/appointments/index', [
            'user' => $user,
            'doctor' => $doctor ? [
                'id' => $doctor->id,
                'name' => $doctor->doctor_name,
                'specialization' => $doctor->specialization,
            ] : null,
            'doctors' => $doctors,
            'appointments' => $appointments,
        ]);
    }
    
    public function storeAppointment(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date|after:now',
            'appointment_time' => 'required|string',
            'reason' => 'nullable|string|max:1000',
            'notes' => 'nullable|string|max:2000',
        ]);
        
        // Combine date and time
        $appointmentDateTime = $validated['appointment_date'] . ' ' . $validated['appointment_time'];
        $appointmentDate = \Carbon\Carbon::createFromFormat('Y-m-d H:i', $appointmentDateTime);
        
        // Check if doctor is available
        $doctor = \App\Models\Doctor::findOrFail($validated['doctor_id']);
        if (!$doctor->is_available || $doctor->status !== 'active') {
            return back()->withErrors(['doctor_id' => 'The selected doctor is not available for appointments.']);
        }
        
        // Check for conflicting appointments
        $conflictingAppointment = \App\Models\Appointment::where('doctor_id', $validated['doctor_id'])
            ->where('appointment_date', $appointmentDate)
            ->whereIn('status', ['scheduled', 'confirmed'])
            ->first();
        
        if ($conflictingAppointment) {
            return back()->withErrors(['appointment_date' => 'This time slot is already booked. Please choose another time.']);
        }
        
        // Create appointment
        $appointment = \App\Models\Appointment::create([
            'doctor_id' => $validated['doctor_id'],
            'patient_id' => $user->id,
            'appointment_date' => $appointmentDate,
            'reason' => $validated['reason'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'status' => 'scheduled',
        ]);
        
        return redirect()->route('user.appointments')
            ->with('success', 'Appointment booked successfully!');
    }

    public function resources()
    {
        $user = Auth::user();
        
        return Inertia::render('user/resources/index', [
            'user' => $user
        ]);
    }

    public function supportContacts()
    {
        $user = Auth::user();

        $supportContacts = SupportContact::orderBy('category')
            ->get()
            ->map(function (SupportContact $contact) {
                return [
                    'id' => $contact->id,
                    'category' => $contact->category,
                    'description' => $contact->description,
                    'contacts' => $contact->contacts ?? [],
                ];
            });

        return Inertia::render('user/support-contacts/index', [
            'user' => $user,
            'supportContacts' => $supportContacts,
        ]);
    }

    public function health()
    {
        $user = Auth::user();
        
        // Get upcoming appointments
        $appointments = \App\Models\Appointment::where('patient_id', $user->id)
            ->where('appointment_date', '>=', now())
            ->whereIn('status', ['scheduled', 'confirmed'])
            ->orderBy('appointment_date', 'asc')
            ->limit(5)
            ->with('doctor:id,name,specialization')
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'date' => $appointment->appointment_date->format('M d, Y'),
                    'time' => $appointment->appointment_date->format('h:i A'),
                    'reason' => $appointment->reason,
                    'doctor_name' => $appointment->doctor->name,
                    'status' => ucfirst($appointment->status),
                ];
            });

        return Inertia::render('user/health/index', [
            'user' => $user,
            'healthMetrics' => [],
            'symptoms' => [],
            'medications' => [],
            'recentTracking' => [],
            'appointments' => $appointments,
            'reminders' => [],
            'health' => [
                'cycle_length' => null,
                'last_period_start' => null,
                'symptoms' => [],
                'medications' => [],
                'period_logs' => [],
            ],
        ]);
    }

    public function trackPeriodForm()
    {
        $user = Auth::user();

        return Inertia::render('user/health/track', [
            'user' => $user,
        ]);
    }

    public function users()
    {
        $user = Auth::user();
        
        return Inertia::render('user/users/index', [
            'user' => $user
        ]);
    }

    public function quiz()
    {
        $user = Auth::user();
        
        return Inertia::render('user/quiz/index', [
            'user' => $user
        ]);
    }

    public function ask(Request $request)
    {
        $user = Auth::user();
        
        // Get filter parameters
        $category = $request->get('category', 'all');
        $status = $request->get('status', 'all');
        
        // Build query for questions
        $query = Question::with(['user:id,name', 'answers' => function($q) {
            $q->approved()
              ->with(['user:id,name'])
              ->orderBy('is_expert', 'desc')
              ->orderBy('is_accepted', 'desc')
              ->orderBy('created_at', 'asc');
        }]);
        
        // Filter by category
        if ($category !== 'all') {
            $query->byCategory($category);
        }
        
        // Filter by status
        if ($status !== 'all') {
            $query->where('status', $status);
        }
        
        // Get questions with pagination
        $questions = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($question) use ($user) {
                return [
                    'id' => $question->id,
                    'question' => $question->question,
                    'category' => $question->category,
                    'is_anonymous' => $question->is_anonymous,
                    'status' => $question->status,
                    'views_count' => $question->views_count,
                    'answers_count' => $question->answers_count,
                    'created_at' => $question->created_at->diffForHumans(),
                    'created_at_formatted' => $question->created_at->format('M d, Y'),
                    'user' => $question->is_anonymous ? null : [
                        'id' => $question->user->id,
                        'name' => $question->user->name,
                    ],
                    'is_owner' => $question->user_id === $user->id,
                    'answers' => $question->answers->map(function ($answer) use ($user) {
                        return [
                            'id' => $answer->id,
                            'answer' => $answer->answer,
                            'is_expert' => $answer->is_expert,
                            'is_accepted' => $answer->is_accepted,
                            'reactions_count' => $answer->reactions_count,
                            'created_at' => $answer->created_at->diffForHumans(),
                            'created_at_formatted' => $answer->created_at->format('M d, Y'),
                            'user' => [
                                'id' => $answer->user->id,
                                'name' => $answer->user->name,
                            ],
                            'is_owner' => $answer->user_id === $user->id,
                            'can_accept' => $question->user_id === $user->id && !$answer->is_accepted,
                        ];
                    }),
                ];
            });
        
        // Get user's questions count
        $userQuestionsCount = Question::where('user_id', $user->id)->count();
        $userAnswersCount = Answer::where('user_id', $user->id)->count();
        
        return Inertia::render('user/ask/index', [
            'user' => $user,
            'questions' => $questions,
            'userQuestionsCount' => $userQuestionsCount,
            'userAnswersCount' => $userAnswersCount,
            'filters' => [
                'category' => $category,
                'status' => $status,
            ],
        ]);
    }

    public function submitQuestion(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'question' => 'required|string|min:10|max:2000',
            'category' => 'required|in:general,contraception,relationships,mental-health,reproductive-health,stis',
            'is_anonymous' => 'boolean',
        ]);
        
        try {
            $question = Question::create([
                'user_id' => $user->id,
                'question' => $validated['question'],
                'category' => $validated['category'],
                'is_anonymous' => $validated['is_anonymous'] ?? false,
                'status' => 'pending',
            ]);
            
            return redirect()->route('user.ask')
                ->with('success', 'Your question has been submitted successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['question' => 'Failed to submit question. Please try again.'])->withInput();
        }
    }

    public function submitAnswer(Request $request, $questionId)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'answer' => 'required|string|min:10|max:5000',
        ]);
        
        $question = Question::with('user')->findOrFail($questionId);
        
        // Check if user is an expert
        $isExpert = $user->role === 'expert' || $user->isVerifiedDoctor();
        
        $answer = Answer::create([
            'question_id' => $question->id,
            'user_id' => $user->id,
            'answer' => $validated['answer'],
            'is_expert' => $isExpert,
            'is_approved' => $isExpert, // Auto-approve expert answers
        ]);
        
        // Reload question to ensure it has the latest data
        $question->refresh();
        
        // Load relationships for the event - ensure question.user is loaded
        $answer->load(['question.user', 'user']);
        
        // Refresh the question relationship to ensure it's loaded
        $answer->refresh();
        $answer->load(['question.user', 'user']);
        
        // Increment question's answers count and update status
        $question->incrementAnswers();
        
        // Dispatch event to notify question author
        event(new AnswerSubmitted($answer));
        
        return redirect()->route('user.ask')->with('success', 'Your answer has been submitted successfully!');
    }

    public function acceptAnswer($answerId)
    {
        $user = Auth::user();
        $answer = Answer::with('question')->findOrFail($answerId);
        
        // Check if user owns the question
        if ($answer->question->user_id !== $user->id) {
            return redirect()->route('user.ask')->with('error', 'You can only accept answers to your own questions.');
        }
        
        $answer->accept();
        
        return redirect()->route('user.ask')->with('success', 'Answer accepted!');
    }

    public function services(Request $request)
    {
        $user = Auth::user();
        
        // Get query parameters for filtering
        $category = $request->get('category', 'all');
        $search = $request->get('search', '');
        
        // Build query
        $query = HealthService::active()->public();
        
        // Filter by category
        if ($category !== 'all') {
            $query->where('service_category', $category);
        }
        
        // Search filter
        if ($search) {
            $query->search($search);
        }
        
        // Get services and format them for frontend
        $services = $query->get()->map(function ($service) {
            return [
                'id' => $service->id,
                'name' => $service->name,
                'type' => $service->service_category ?? 'all',
                'address' => $this->formatAddress($service),
                'distance' => $this->calculateDistance($service), // Placeholder - would need user location
                'rating' => (float) $service->rating ?? 0.0,
                'reviews' => $service->reviews_count ?? 0,
                'phone' => $service->phone ?? 'N/A',
                'hours' => $service->hours ?? 'Hours not available',
                'services' => $service->services_offered ?? [],
                'isOpen' => $service->is_open ?? true,
                'waitTime' => $service->wait_time ?? null,
                'coordinates' => [
                    'lat' => $service->latitude ? (float) $service->latitude : null,
                    'lng' => $service->longitude ? (float) $service->longitude : null,
                ],
            ];
        });
        
        // Get unique service categories for filter
        $serviceCategories = HealthService::active()
            ->whereNotNull('service_category')
            ->distinct()
            ->pluck('service_category')
            ->unique()
            ->values()
            ->toArray();
        
        return Inertia::render('user/services/index', [
            'user' => $user,
            'services' => $services,
            'serviceCategories' => $serviceCategories,
        ]);
    }
    
    /**
     * Format address from service location fields
     */
    private function formatAddress($service)
    {
        $parts = array_filter([
            $service->address,
            $service->city,
            $service->county,
            $service->state,
        ]);
        
        return $parts ? implode(', ', $parts) : 'Address not available';
    }
    
    /**
     * Calculate distance (placeholder - would need user's location)
     */
    private function calculateDistance($service)
    {
        // This is a placeholder - in a real app, you'd calculate based on user's location
        // For now, return null or a placeholder
        return null;
    }

    public function relationships()
    {
        $user = Auth::user();
        
        return Inertia::render('user/relationships/index', [
            'user' => $user
        ]);
    }

    public function experts(Request $request)
    {
        $user = Auth::user();
        
        // Get query parameters for filtering
        $specialization = $request->get('specialization', 'all');
        $search = $request->get('search', '');
        $availability = $request->get('availability', 'all');
        
        // Build query - Get all doctors from database
        // Only show active doctors (status = 'active')
        $query = \App\Models\Doctor::where('status', 'active');
        
        // Filter by specialization
        if ($specialization !== 'all') {
            $query->where('specialization', $specialization);
        }
        
        // Search filter
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('doctor_name', 'like', "%{$search}%")
                  ->orWhere('specialization', 'like', "%{$search}%")
                  ->orWhere('bio', 'like', "%{$search}%");
            });
        }
        
        // Filter by availability
        if ($availability === 'available') {
            $query->where('is_available', true);
        } elseif ($availability === 'unavailable') {
            $query->where('is_available', false);
        }
        
        // Order by verified first, then by name
        $query->orderBy('is_verified', 'desc')
              ->orderBy('doctor_name', 'asc');
        
        // Get doctors from database and format them for frontend
        $doctors = $query->get()->map(function ($doctor) {
            return [
                'id' => $doctor->id,
                'name' => $doctor->doctor_name,
                'specialization' => $doctor->specialization,
                'bio' => $doctor->bio,
                'years_of_experience' => $doctor->years_of_experience,
                'phone' => $doctor->phone,
                'email' => $doctor->email,
                'profile_picture' => $doctor->profile_picture,
                'is_available' => $doctor->is_available,
                'is_verified' => $doctor->is_verified,
                'average_rating' => $doctor->average_rating ?? 0,
                'total_reviews' => $doctor->total_reviews ?? 0,
                'certifications' => $doctor->certifications ?? [],
                'awards' => $doctor->awards ?? [],
                'working_hours' => $doctor->working_hours ?? [],
            ];
        });
        
        // Get unique specializations for filter from all active doctors
        $specializations = \App\Models\Doctor::where('status', 'active')
            ->whereNotNull('specialization')
            ->distinct()
            ->pluck('specialization')
            ->unique()
            ->values()
            ->toArray();
        
        return Inertia::render('user/experts/index', [
            'user' => $user,
            'doctors' => $doctors,
            'specializations' => $specializations,
            'filters' => [
                'specialization' => $specialization,
                'search' => $search,
                'availability' => $availability,
            ],
        ]);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();

        if ($user->password) {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);
        }

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

}
