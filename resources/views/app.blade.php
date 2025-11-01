<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- SEO Meta Tags --}}
    <title>@yield('title', 'Family Planning Platform - Comprehensive Reproductive Health Services')</title>
    <meta name="description" content="@yield('description', 'Comprehensive family planning and reproductive health services with expert consultations, personalized care, and 24/7 support.')">
    <meta name="keywords" content="@yield('keywords', 'family planning, reproductive health, contraception, prenatal care, fertility, women health, online consultation, Suth Sudan, ffpi')">
    <meta name="author" content="Family Planning Platform">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

    {{-- Canonical URL --}}
    <link rel="canonical" href="@yield('canonical', request()->url())">

    {{-- Open Graph Meta Tags --}}
    <meta property="og:type" content="website">
    <meta property="og:title" content="@yield('og_title', 'Family Planning Platform - Comprehensive Reproductive Health Services')">
    <meta property="og:description" content="@yield('og_description', 'Expert family planning and reproductive health services with personalized care and support.')">
    <meta property="og:url" content="@yield('og_url', request()->url())">
    <meta property="og:site_name" content="Family Planning Platform">
    <meta property="og:image" content="@yield('og_image', asset('images/family-planning-og-image.jpg'))">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="en_US">

    {{-- Twitter Card Meta Tags --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="@yield('twitter_title', 'Family Planning Platform - Comprehensive Reproductive Health Services')">
    <meta name="twitter:description" content="@yield('twitter_description', 'Expert family planning and reproductive health services with personalized care and support.')">
    <meta name="twitter:image" content="@yield('twitter_image', asset('images/family-planning-twitter-image.jpg'))">
    <meta name="twitter:site" content="@FamilyPlanning">
    <meta name="twitter:creator" content="@FamilyPlanning">

    {{-- Additional SEO Meta Tags --}}
    <meta name="theme-color" content="#166534">
    <meta name="msapplication-TileColor" content="#166534">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Family Planning">

    {{-- Favicon and App Icons --}}
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('images/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">

    {{-- Preconnect for Performance --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="//www.google-analytics.com">
    <link rel="dns-prefetch" href="//www.googletagmanager.com">

    {{-- Fonts --}}
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&display=swap"
        rel="stylesheet">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia

    {{-- Google Analytics --}}
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-S3GRKMW90C"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-S3GRKMW90C');
    </script>
</body>

</html>
