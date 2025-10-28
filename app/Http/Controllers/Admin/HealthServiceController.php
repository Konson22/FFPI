<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HealthService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HealthServiceController extends Controller
{
    /**
     * Display a listing of health services.
     */
    public function index()
    {
        $services = HealthService::latest()->paginate(15);

        return Inertia::render('admin/health-services/index', [
            'services' => $services,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for creating a new health service.
     */
    public function create()
    {
        return Inertia::render('admin/health-services/create', [
            'user' => auth()->user(),
        ]);
    }

    /**
     * Store a newly created health service.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'address' => 'required|string',
            'distance' => 'nullable|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'reviews' => 'nullable|integer|min:0',
            'phone' => 'nullable|string',
            'hours' => 'nullable|string',
            'services_offered' => 'required|array',
            'services_offered.*' => 'required|string',
            'is_open' => 'boolean',
            'wait_time' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'is_active' => 'boolean',
        ]);

        HealthService::create($validated);

        return redirect()->route('admin.health-services')->with('success', 'Health service created successfully!');
    }

    /**
     * Show the form for editing the specified health service.
     */
    public function edit($id)
    {
        $service = HealthService::findOrFail($id);

        return Inertia::render('admin/health-services/edit', [
            'service' => $service,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Update the specified health service.
     */
    public function update(Request $request, $id)
    {
        $service = HealthService::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'address' => 'required|string',
            'distance' => 'nullable|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'reviews' => 'nullable|integer|min:0',
            'phone' => 'nullable|string',
            'hours' => 'nullable|string',
            'services_offered' => 'required|array',
            'services_offered.*' => 'required|string',
            'is_open' => 'boolean',
            'wait_time' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'is_active' => 'boolean',
        ]);

        $service->update($validated);

        return redirect()->route('admin.health-services')->with('success', 'Health service updated successfully!');
    }

    /**
     * Remove the specified health service.
     */
    public function destroy($id)
    {
        $service = HealthService::findOrFail($id);
        $service->delete();

        return redirect()->route('admin.health-services')->with('success', 'Health service deleted successfully!');
    }
}
