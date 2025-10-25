<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            // Redirect authenticated users to their appropriate dashboard
            $user = auth()->user();
            
            switch ($user->role) {
                case 'admin':
                    return redirect()->route('admin.dashboard');
                case 'expert':
                    return redirect()->route('expert.dashboard');
                case 'user':
                    return redirect()->route('user.dashboard');
                default:
                    return redirect()->route('home');
            }
        }

        return $next($request);
    }
}
