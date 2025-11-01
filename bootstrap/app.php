<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Middleware\RoleOrHigherMiddleware;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Auth\AuthenticationException;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

         // Add CORS and Sanctum Middleware for API
         $middleware->api(prepend: [
            HandleCors::class,
        ]);

        // Add CORS middleware to web routes as well for OAuth
        $middleware->web(prepend: [
            HandleCors::class,
        ]);

        // Exclude CSRF for specific API routes that use web auth
        $middleware->validateCsrfTokens(except: [
            'api/general-quizzes/generate',
            'api/general-quizzes/submit',
        ]);

        // Register middleware aliases
        $middleware->alias([
            'role' => RoleMiddleware::class,
            'role.or.higher' => RoleOrHigherMiddleware::class,
            'guest' => RedirectIfAuthenticated::class,
            'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Handle authentication exceptions for API routes
        $exceptions->render(function (AuthenticationException $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'error' => 'Unauthorized. Please log in.',
                    'message' => 'Unauthenticated.'
                ], 401);
            }
        });
    })->create();
