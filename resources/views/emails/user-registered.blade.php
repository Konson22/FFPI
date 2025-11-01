<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to {{ $appName }}</title>
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
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 40px 20px;
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

        .logo-text {
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .logo-subtitle {
            color: #d1fae5;
            font-size: 16px;
            margin-top: 8px;
            font-weight: 400;
        }

        .email-content {
            padding: 40px 30px;
        }

        .welcome-text {
            color: #10b981;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;
        }

        .content-body {
            color: #374151;
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 30px;
        }

        .features {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            position: relative;
        }

        .features::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border-radius: 0 2px 2px 0;
        }

        .features h3 {
            color: #059669;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .features ul {
            margin: 15px 0;
            padding-left: 20px;
        }

        .features li {
            margin: 10px 0;
            color: #6b7280;
            font-size: 15px;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 18px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
            margin: 20px 0;
        }

        .cta-button:hover {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(16, 185, 129, 0.4);
        }

        .account-info {
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            margin: 25px 0;
        }

        .account-info h4 {
            color: #1f2937;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .account-info p {
            color: #6b7280;
            font-size: 14px;
            margin: 5px 0;
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
            color: #10b981;
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

            .welcome-text {
                font-size: 24px;
            }

            .logo-text {
                font-size: 28px;
            }

            .cta-button {
                padding: 14px 28px;
                font-size: 16px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <div class="logo-container">
                <h1 class="logo-text">🌸 {{ $appName }}</h1>
                <p class="logo-subtitle">Future of Family Planning Initiative</p>
            </div>
        </div>

        <div class="email-content">
            <div class="welcome-text">
                Welcome, {{ $user->name }}! 🌟
            </div>

            <div class="content-body">
                <p>We're absolutely thrilled to have you join our family planning community! You've taken an important
                    step towards taking control of your reproductive health journey.</p>

                <p>Our platform is designed to support you every step of the way, whether you're planning for a family,
                    tracking your health, or simply want to understand your body better.</p>
            </div>

            <div style="text-align: center;">
                <a href="{{ config('app.url') }}/dashboard" class="cta-button">
                    Get Started →
                </a>
            </div>

            <div class="features">
                <h3>✨ What you can do with your account:</h3>
                <ul>
                    <li><strong>Cycle Tracking:</strong> Monitor your menstrual cycle and fertility indicators</li>
                    <li><strong>Expert Consultations:</strong> Connect with healthcare professionals and fertility
                        experts</li>
                    <li><strong>Health Monitoring:</strong> Track your reproductive health and wellness metrics</li>
                    <li><strong>Community Support:</strong> Join discussions and connect with others on similar journeys
                    </li>
                    <li><strong>Appointment Scheduling:</strong> Book consultations with trusted healthcare providers
                    </li>
                    <li><strong>Educational Resources:</strong> Access comprehensive guides and expert advice</li>
                </ul>
            </div>

            <div class="account-info">
                <h4>📧 Your Account Details</h4>
                <p><strong>Name:</strong> {{ $user->name }}</p>
                <p><strong>Email:</strong> {{ $user->email }}</p>
                <p><strong>Account Type:</strong> {{ ucfirst($user->role ?? 'User') }}</p>
                <p><strong>Registration Date:</strong>
                    {{ $user->created_at ? $user->created_at->format('F j, Y') : now()->format('F j, Y') }}</p>
            </div>

            <div class="content-body">
                <p>We're here to support you with reliable information, expert guidance, and a caring community. If you
                    have any questions or need assistance, our support team is always ready to help.</p>

                <p>Thank you for trusting us with your family planning needs. We're excited to be part of your health
                    journey!</p>
            </div>
        </div>

        <div class="email-footer">
            <p class="footer-text">
                Best regards,<br>
                The {{ $appName }} Team 💕
            </p>

            <div class="social-links">
                <a href="{{ config('app.url') }}/faq">Support Center</a>
                <a href="{{ config('app.url') }}/contact">Contact Us</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </div>

            <div class="divider"></div>

            <p class="footer-text">
                © {{ date('Y') }} {{ $appName }}. All rights reserved.<br>
                This email was sent to {{ $user->email }}. If you didn't create an account, please ignore this email.
            </p>
        </div>
    </div>
</body>

</html>
