@extends('emails.layouts.base')

@section('title', 'Verify Your Email - ' . config('app.name'))

@section('content')
    <h1 class="content-title">🔐 Verify Your Email Address</h1>
    <p class="content-subtitle">Complete your registration to access all features of our platform</p>

    <div class="content-body">
        <p>Hello <strong>{{ $user->name }}</strong>,</p>

        <p>Thank you for registering with {{ config('app.name') }}! To complete your registration and start using our
            platform, please verify your email address.</p>
    </div>

    <div class="highlight-box">
        <h3>🛡️ Why verify your email?</h3>
        <ul style="margin: 15px 0; padding-left: 20px; color: #374151;">
            <li style="margin: 8px 0;">Secure your account and protect your data</li>
            <li style="margin: 8px 0;">Access all features of our platform</li>
            <li style="margin: 8px 0;">Receive important notifications and updates</li>
            <li style="margin: 8px 0;">Reset your password if needed</li>
        </ul>
    </div>

    <div style="text-align: center; margin: 40px 0;">
        <a href="{{ $user->account_type === 'user' ? str_replace(config('app.url'), 'https://etixss.com', $verificationUrl) : str_replace(config('app.url'), 'https://admin.etixss.com', $verificationUrl) }}"
            class="button button-secondary">Verify Email Address</a>
    </div>

    <div class="highlight-box" style="background-color: #f9fafb; border-color: #d1d5db;">
        <h3 style="color: #6b7280;">🔗 Alternative Method</h3>
        <p style="margin-bottom: 10px; color: #6b7280;">If the button doesn't work, copy and paste this link into your
            browser:</p>
        <div
            style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb; word-break: break-all; font-family: 'Courier New', monospace; font-size: 12px; color: #0a1e5e;">
            {{ $user->account_type === 'user' ? str_replace(config('app.url'), 'https://etixss.com', $verificationUrl) : str_replace(config('app.url'), 'https://admin.etixss.com', $verificationUrl) }}
        </div>
    </div>

    <div class="highlight-box"
        style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-color: #f59e0b;">
        <h3 style="color: #92400e;">⚠️ Security Note</h3>
        <p style="margin: 0; color: #92400e;">
            This verification link will expire in 60 minutes for security reasons. If you didn't create an account with us,
            please ignore this email.
        </p>
    </div>

    <div class="content-body">
        <p
            style="margin-top: 25px; padding: 20px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #0ea5e9;">
            <strong>📧 Need help?</strong> If you have any questions or need assistance, please don't hesitate to contact
            our support team.
        </p>
    </div>
@endsection
