<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SupportContact;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class SupportContactController extends Controller
{
    /**
     * Display a listing of support contacts.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $supportContacts = SupportContact::all();

            return response()->json([
                'success' => true,
                'message' => 'Support contacts retrieved successfully',
                'contacts' => $supportContacts
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve support contacts',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified support contact.
     */
    public function show($id): JsonResponse
    {
        try {
            $supportContact = SupportContact::findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Support contact retrieved successfully',
                'data' => [
                    'id' => $supportContact->id,
                    'category' => $supportContact->category,
                    'description' => $supportContact->description,
                    'contacts' => $supportContact->contacts,
                    'created_at' => $supportContact->created_at,
                    'updated_at' => $supportContact->updated_at,
                ]
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Support contact not found'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve support contact',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created support contact.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'category' => 'required|string|max:255|unique:support_contacts,category',
                'description' => 'nullable|string',
                'contacts' => 'required|array|min:1',
                'contacts.*.name' => 'required|string|max:255',
                'contacts.*.phone' => 'required|string|max:50',
                'contacts.*.location' => 'nullable|string|max:255',
                'contacts.*.services' => 'nullable|string|max:500',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $supportContact = SupportContact::create([
                'category' => $request->category,
                'description' => $request->description,
                'contacts' => $request->contacts,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Support contact created successfully',
                'data' => $supportContact
            ], 201);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create support contact',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified support contact.
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $supportContact = SupportContact::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'category' => 'sometimes|required|string|max:255|unique:support_contacts,category,' . $id,
                'description' => 'nullable|string',
                'contacts' => 'sometimes|required|array|min:1',
                'contacts.*.name' => 'required|string|max:255',
                'contacts.*.phone' => 'required|string|max:50',
                'contacts.*.location' => 'nullable|string|max:255',
                'contacts.*.services' => 'nullable|string|max:500',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $supportContact->update($request->only(['category', 'description', 'contacts']));

            return response()->json([
                'success' => true,
                'message' => 'Support contact updated successfully',
                'data' => $supportContact->fresh()
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Support contact not found'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update support contact',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified support contact.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $supportContact = SupportContact::findOrFail($id);
            $supportContact->delete();

            return response()->json([
                'success' => true,
                'message' => 'Support contact deleted successfully'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Support contact not found'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete support contact',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get all available categories.
     */
    public function categories(): JsonResponse
    {
        try {
            $categories = SupportContact::select('category', 'id')
                ->orderBy('category')
                ->get()
                ->map(function($contact) {
                    return [
                        'id' => $contact->id,
                        'category' => $contact->category,
                    ];
                });

            return response()->json([
                'success' => true,
                'message' => 'Categories retrieved successfully',
                'data' => $categories
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve categories',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}

