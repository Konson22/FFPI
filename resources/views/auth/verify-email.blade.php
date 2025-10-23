<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} - Email Verification</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Figtree', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .verification-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
            max-width: 500px;
            width: 100%;
            text-align: center;
        }

        .verification-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
            font-size: 40px;
            color: white;
        }

        .verification-title {
            font-size: 28px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 15px;
        }

        .verification-message {
            font-size: 16px;
            color: #718096;
            line-height: 1.6;
            margin-bottom: 30px;
        }

        .verification-button {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            margin: 10px;
        }

        .verification-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .verification-button.secondary {
            background: #e2e8f0;
            color: #4a5568;
        }

        .verification-button.secondary:hover {
            background: #cbd5e0;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .verification-info {
            background: #f7fafc;
            border-radius: 10px;
            padding: 20px;
            margin-top: 30px;
            border-left: 4px solid #4CAF50;
        }

        .verification-info h3 {
            color: #2d3748;
            font-size: 18px;
            margin-bottom: 10px;
        }

        .verification-info p {
            color: #718096;
            font-size: 14px;
            line-height: 1.5;
        }

        .resend-section {
            margin-top: 30px;
            padding-top: 30px;
            border-top: 1px solid #e2e8f0;
        }

        .resend-form {
            display: inline-block;
        }

        .resend-button {
            background: transparent;
            color: #667eea;
            border: 2px solid #667eea;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .resend-button:hover {
            background: #667eea;
            color: white;
        }

        .resend-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .success-message {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 1px solid #c3e6cb;
        }

        .error-message {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 1px solid #f5c6cb;
        }

        @media (max-width: 600px) {
            .verification-container {
                padding: 30px 20px;
            }
            
            .verification-title {
                font-size: 24px;
            }
            
            .verification-button {
                padding: 12px 24px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="verification-container">
        @if (session('status') == 'verification-link-sent')
            <div class="success-message">
                A new verification link has been sent to your email address.
            </div>
        @endif

        @if (session('error'))
            <div class="error-message">
                {{ session('error') }}
            </div>
        @endif

        <div class="verification-icon">
            📧
        </div>

        <h1 class="verification-title">Verify Your Email Address</h1>
        
        <p class="verification-message">
            Before proceeding, please check your email for a verification link. 
            If you did not receive the email, we will gladly send you another.
        </p>

        <div class="verification-info">
            <h3>What's Next?</h3>
            <p>
                We've sent a verification link to <strong>{{ auth()->user()->email ?? 'your email address' }}</strong>. 
                Click the link in the email to verify your account and access all features.
            </p>
        </div>

        <div class="resend-section">
            <p style="color: #718096; margin-bottom: 15px;">
                Didn't receive the email?
            </p>
            
            <form method="POST" action="{{ route('verification.send') }}" class="resend-form">
                @csrf
                <button type="submit" class="resend-button" id="resendButton">
                    Resend Verification Email
                </button>
            </form>
        </div>

        <div style="margin-top: 30px;">
            <a href="{{ route('logout') }}" 
               onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
               class="verification-button secondary">
                Sign Out
            </a>
            
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
        </div>
    </div>

    <script>
        // Add some interactivity
        document.getElementById('resendButton').addEventListener('click', function() {
            this.disabled = true;
            this.textContent = 'Sending...';
            
            // Re-enable after 60 seconds
            setTimeout(() => {
                this.disabled = false;
                this.textContent = 'Resend Verification Email';
            }, 60000);
        });

        // Auto-refresh page every 30 seconds to check verification status
        setTimeout(() => {
            window.location.reload();
        }, 30000);
    </script>
</body>
</html>
