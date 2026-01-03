<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Question Has Been Answered - {{ $appName }}</title>
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
            font-size: 24px;
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

        .question-box {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            position: relative;
        }

        .question-box::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border-radius: 0 2px 2px 0;
        }

        .question-box h3 {
            color: #059669;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .question-box p {
            color: #1f2937;
            font-size: 15px;
            line-height: 1.6;
        }

        .answer-box {
            background-color: #ffffff;
            border: 2px solid #10b981;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            box-shadow: 0 2px 4px rgba(16, 185, 129, 0.1);
        }

        .answer-box h3 {
            color: #059669;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .answer-meta {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e5e7eb;
        }

        .answer-meta .expert-badge {
            background-color: #2563eb;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }

        .answer-meta .answerer-name {
            font-weight: 600;
            color: #1f2937;
        }

        .answer-meta .answer-date {
            color: #6b7280;
            font-size: 14px;
        }

        .answer-content {
            color: #374151;
            font-size: 15px;
            line-height: 1.7;
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
                font-size: 20px;
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
                Your Question Has Been Answered! 🎉
            </div>

            <div class="content-body">
                <p>Hello {{ $questionUser->name }},</p>

                <p>Great news! Someone has answered your question on our platform. We wanted to let you know so you can
                    review the response.</p>
            </div>

            <div class="question-box">
                <h3>❓ Your Question:</h3>
                <p>{{ \Illuminate\Support\Str::limit($question->question, 500) }}</p>
            </div>

            <div class="answer-box">
                <h3>💬 Answer:</h3>
                <div class="answer-meta">
                    <span class="answerer-name">{{ $answerUser->name }}</span>
                    @if ($answer->is_expert)
                        <span class="expert-badge">👩‍⚕️ Expert</span>
                    @endif
                    <span class="answer-date">{{ $answer->created_at->format('M j, Y g:i A') }}</span>
                </div>
                <div class="answer-content">
                    {{ \Illuminate\Support\Str::limit($answer->answer, 1000) }}
                </div>
            </div>

            <div style="text-align: center;">
                <a href="{{ config('app.url') }}/user/ask" class="cta-button">
                    View All Answers →
                </a>
            </div>

            <div class="content-body">
                <p>You can view this answer and any other responses on your question page. If you find an answer
                    helpful, you can mark it as accepted.</p>

                <p>Thank you for being part of our community!</p>
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
            </div>

            <div class="divider"></div>

            <p class="footer-text">
                © {{ date('Y') }} {{ $appName }}. All rights reserved.<br>
                This email was sent to {{ $questionUser->email }}.
            </p>
        </div>
    </div>
</body>

</html>
