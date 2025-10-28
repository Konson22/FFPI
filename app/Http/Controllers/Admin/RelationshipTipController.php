<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RelationshipTip;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelationshipTipController extends Controller
{
    /**
     * Display a listing of relationship tips.
     */
    public function index()
    {
        $tips = RelationshipTip::latest()->paginate(15);

        return Inertia::render('admin/relationship-tips/index', [
            'tips' => $tips,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for creating a new relationship tip.
     */
    public function create()
    {
        return Inertia::render('admin/relationship-tips/create', [
            'user' => auth()->user(),
        ]);
    }

    /**
     * Store a newly created relationship tip.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'full_description' => 'required|string',
            'category' => 'required|string',
            'difficulty' => 'required|string',
            'key_points' => 'required|array',
            'key_points.*' => 'required|string',
            'tips' => 'required|array',
            'tips.*' => 'required|string',
            'example' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        RelationshipTip::create($validated);

        return redirect()->route('admin.relationship-tips')->with('success', 'Relationship tip created successfully!');
    }

    /**
     * Show the form for editing the specified relationship tip.
     */
    public function edit($id)
    {
        $tip = RelationshipTip::findOrFail($id);

        return Inertia::render('admin/relationship-tips/edit', [
            'tip' => $tip,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Update the specified relationship tip.
     */
    public function update(Request $request, $id)
    {
        $tip = RelationshipTip::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'full_description' => 'required|string',
            'category' => 'required|string',
            'difficulty' => 'required|string',
            'key_points' => 'required|array',
            'key_points.*' => 'required|string',
            'tips' => 'required|array',
            'tips.*' => 'required|string',
            'example' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $tip->update($validated);

        return redirect()->route('admin.relationship-tips')->with('success', 'Relationship tip updated successfully!');
    }

    /**
     * Remove the specified relationship tip.
     */
    public function destroy($id)
    {
        $tip = RelationshipTip::findOrFail($id);
        $tip->delete();

        return redirect()->route('admin.relationship-tips')->with('success', 'Relationship tip deleted successfully!');
    }
}
