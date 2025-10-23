<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Check if user is authenticated
        if (!auth()->check()) {
            return redirect()->route('login')->with('error', 'Please log in to access this page.');
        }

        $user = auth()->user();
        
        // Check if user has the required role
        if ($user->role !== $role) {
            // Redirect based on user's actual role
            switch ($user->role) {
                case 'admin':
                    return redirect()->route('admin.dashboard')->with('error', 'Access denied. You do not have permission to access this resource.');
                case 'expert':
                    return redirect()->route('experts.dashboard')->with('error', 'Access denied. You do not have permission to access this resource.');
                case 'user':
                    return redirect()->route('user.dashboard')->with('error', 'Access denied. You do not have permission to access this resource.');
                default:
                    return redirect()->route('home')->with('error', 'Access denied. Invalid user role.');
            }
        }

        return $next($request);
    }
}
