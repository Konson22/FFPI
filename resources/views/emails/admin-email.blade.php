<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject }} - {{ $appName }}</title>
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
            background: linear-gradient(135deg, #04324b 0%, #1d5472 100%);
            padding: 40px 20px;
            text-align: center;
            position: relative;
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

        .greeting {
            color: #04324b;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 20px;
        }

        .content-body {
            color: #374151;
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 30px;
        }

        .message-box {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 1px solid #bae6fd;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            position: relative;
        }

        .message-box::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(135deg, #04324b 0%, #1d5472 100%);
            border-radius: 0 2px 2px 0;
        }

        .message-content {
            color: #1e293b;
            font-size: 15px;
            line-height: 1.8;
            white-space: pre-line;
        }

        .cta-button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #d2a649 0%, #dcb45a 100%);
            color: #04324b;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px -1px rgba(0, 0, 0, 0.15);
        }

        .email-footer {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 30px 20px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }

        .footer-text {
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 15px;
        }

        .footer-links {
            margin-top: 20px;
        }

        .footer-links a {
            color: #04324b;
            text-decoration: none;
            margin: 0 10px;
            font-size: 14px;
        }

        .footer-links a:hover {
            text-decoration: underline;
        }

        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }

            .email-content {
                padding: 30px 20px;
            }

            .greeting {
                font-size: 20px;
            }

            .logo-text {
                font-size: 28px;
            }

            .cta-button {
                padding: 12px 24px;
                font-size: 15px;
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
            <div class="greeting">
                Hello, {{ $user->name }}!
            </div>

            <div class="content-body">
                <p>We hope this message finds you well. We have an important update to share with you.</p>
            </div>

            <div class="message-box">
                <div class="message-content">
                    {!! nl2br(e($message)) !!}
                </div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <a href="{{ config('app.url') }}/dashboard" class="cta-button">
                    Visit Dashboard →
                </a>
            </div>

            <div class="content-body" style="margin-top: 30px;">
                <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.
                </p>
                <p>Thank you for being part of our community!</p>
            </div>
        </div>

        <div class="email-footer">
            <div class="footer-text">
                <p><strong>{{ $appName }}</strong></p>
                <p>Supporting your family planning journey</p>
            </div>
            <div class="footer-links">
                <a href="{{ config('app.url') }}">Visit Website</a>
                <a href="{{ config('app.url') }}/support">Support</a>
                <a href="{{ config('app.url') }}/contact">Contact Us</a>
            </div>
            <div class="footer-text" style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                <p>This email was sent to {{ $user->email }}</p>
                <p>&copy; {{ date('Y') }} {{ $appName }}. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>

</html>
