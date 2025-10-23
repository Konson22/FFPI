<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', config('app.name', 'eTix'))</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .email-header {
            background: linear-gradient(135deg, #0a1e5e 0%, #1e40af 100%);
            padding: 30px 20px;
            text-align: center;
            position: relative;
        }

        .email-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
            opacity: 0.1;
        }

        .logo-container {
            position: relative;
            z-index: 1;
        }

        .logo {
            max-width: 120px;
            height: auto;
            margin-bottom: 15px;
        }

        .logo-text {
            color: #ffffff;
            font-size: 24px;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .logo-subtitle {
            color: #e2e8f0;
            font-size: 14px;
            margin-top: 5px;
            font-weight: 400;
        }

        .email-content {
            padding: 40px 30px;
        }

        .content-title {
            color: #0a1e5e;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;
        }

        .content-subtitle {
            color: #6b7280;
            font-size: 16px;
            margin-bottom: 30px;
            text-align: center;
            line-height: 1.5;
        }

        .content-body {
            color: #374151;
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 30px;
        }

        .highlight-box {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            position: relative;
        }

        .highlight-box::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            border-radius: 0 2px 2px 0;
        }

        .highlight-box h3 {
            color: #0a1e5e;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .button {
            display: inline-block;
            background: linear-gradient(135deg, #0a1e5e 0%, #1e40af 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(10, 30, 94, 0.3);
        }

        .button:hover {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(10, 30, 94, 0.4);
        }

        .button-secondary {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
        }

        .button-secondary:hover {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            box-shadow: 0 6px 8px -1px rgba(16, 185, 129, 0.4);
        }

        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 25px 0;
        }

        .info-item {
            background-color: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }

        .info-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 5px;
        }

        .info-value {
            color: #1f2937;
            font-size: 16px;
            font-weight: 500;
        }

        .status-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .status-confirmed {
            background-color: #d1fae5;
            color: #065f46;
        }

        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
        }

        .status-cancelled {
            background-color: #fee2e2;
            color: #991b1b;
        }

        .email-footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }

        .footer-text {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 15px;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #6b7280;
            text-decoration: none;
            font-size: 14px;
        }

        .social-links a:hover {
            color: #0a1e5e;
        }

        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
            margin: 30px 0;
        }

        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }

            .email-content {
                padding: 30px 20px;
            }

            .info-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }

            .content-title {
                font-size: 24px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <div class="logo-container">
                <img src="{{ config('app.url') }}/images/dark-background-logo.png.png"
                    alt="{{ config('app.name', 'eTix') }}" class="logo"
                    style="display: block; max-width: 120px; height: auto;">
                <h1 class="logo-text">{{ config('app.name', 'eTix') }}</h1>
                <p class="logo-subtitle">
                    @if (isset($user) && $user->account_type === 'user')
                        Your Event Management Platform
                    @else
                        Admin Event Management Platform
                    @endif
                </p>
            </div>
        </div>

        <div class="email-content">
            @yield('content')
        </div>

        <div class="email-footer">
            <p class="footer-text">
                Thank you for using {{ config('app.name', 'eTix') }}!<br>
                If you have any questions, please don't hesitate to contact our support team.
            </p>

            <div class="social-links">
                <a href="#">Support</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </div>

            <div class="divider"></div>

            <p class="footer-text">
                © {{ date('Y') }} {{ config('app.name', 'eTix') }}. All rights reserved.<br>
                This email was sent to you because you have an account with us.
            </p>
        </div>
    </div>
</body>

</html>
