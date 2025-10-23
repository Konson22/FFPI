# eTix Admin Panel

A comprehensive event ticketing and management system built with Laravel and React. This admin panel provides powerful tools for event organizers to manage events, bookings, analytics, and more.

## 🚀 Features

### Core Functionality

- **Event Management**: Create, edit, and manage events with detailed information
- **Ticket Management**: Multiple ticket categories with pricing and availability
- **Booking System**: Complete booking workflow with payment integration
- **User Management**: Role-based access control for different user types
- **Analytics Dashboard**: Comprehensive reporting and analytics
- **Mobile API**: RESTful API for mobile applications
- **Email Notifications**: Automated email system for bookings and updates

### User Roles

- **eTix Owner**: Full system access and management
- **Organizer**: Event creation and management
- **Staff**: Limited access based on permissions
- **Customer**: Booking and ticket management

### Key Features

- 🎫 **Multi-category Tickets**: VIP, Premium, Regular, Student pricing tiers
- 📊 **Real-time Analytics**: Revenue tracking, attendance metrics, sales trends
- 💳 **Payment Integration**: Stripe and MTN Mobile Money support
- 📱 **Mobile Responsive**: Optimized for all devices
- 🔐 **Secure Authentication**: Laravel Sanctum with role-based permissions
- 📧 **Email System**: Automated notifications and confirmations
- 📈 **Reporting**: Comprehensive sales and event reports
- 🎨 **Modern UI**: Clean, intuitive interface with customizable themes

## 🛠️ Tech Stack

### Backend

- **Laravel 12**: PHP framework
- **MySQL**: Database
- **Laravel Sanctum**: API authentication
- **Stripe**: Payment processing
- **MTN Mobile Money**: Mobile payment integration

### Frontend

- **React 19**: UI library
- **Inertia.js**: SPA framework
- **Tailwind CSS**: Styling
- **ApexCharts**: Data visualization
- **Radix UI**: Component library
- **TypeScript**: Type safety

### Development Tools

- **Vite**: Build tool
- **ESLint & Prettier**: Code formatting
- **PHPUnit**: Testing
- **Laravel Pail**: Logging

## 📋 Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL 8.0+
- Git

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Konson22/etix-admin.git
cd etix-admin
```

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Database Configuration

Update your `.env` file with database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=etix_admin
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 5. Run Migrations and Seeders

```bash
# Run database migrations
php artisan migrate

# Seed the database with sample data
php artisan db:seed
```

### 6. Build Assets

```bash
# Build for development
npm run dev

# Or build for production
npm run build
```

### 7. Start the Application

```bash
# Start Laravel development server
php artisan serve

# In another terminal, start the queue worker
php artisan queue:work
```

The application will be available at `http://localhost:8000`

## 🔧 Configuration

### Email Configuration

Update your `.env` file with email settings:

```env
MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@etixss.com
MAIL_FROM_NAME="eTixss"
```

### Payment Configuration

Configure Stripe and MTN Mobile Money:

```env
STRIPE_KEY=your_stripe_public_key
STRIPE_SECRET=your_stripe_secret_key
MTN_MOMO_CALLBACK_URL=your_callback_url
```

## 📱 Mobile API

The application includes a comprehensive mobile API for mobile applications. See [Mobile API Documentation](docs/mobile-api.md) for detailed endpoint information.

### Key Endpoints

- `POST /api/mobile/login` - Mobile authentication
- `GET /api/mobile/events` - Get all events
- `GET /api/mobile/events/{id}` - Get specific event
- `POST /api/mobile/logout` - Logout

## 📊 Analytics & Reporting

### Dashboard Features

- **Revenue Tracking**: Real-time revenue monitoring
- **Attendance Metrics**: Event attendance analytics
- **Sales Trends**: Historical sales data
- **Event Performance**: Individual event analytics
- **User Statistics**: User engagement metrics

### Report Generation

- **Event Sales Reports**: Comprehensive sales analysis
- **Revenue Reports**: Financial performance tracking
- **Attendance Reports**: Event attendance analytics
- **Export Options**: PDF, Excel, CSV formats

## 🎨 Customization

### Theme Customization

The application supports customizable themes with a green color scheme as the default. You can modify:

- Color schemes in `resources/css/app.css`
- Component styles in individual React components
- Layout configurations in `resources/js/components/layout/`

### Branding

- Update logos in `public/images/icons/`
- Modify company information in settings
- Customize email templates in `resources/views/emails/`

## 🧪 Testing

### Run Tests

```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature

# Run with coverage
php artisan test --coverage
```

### Test Coverage

The application includes comprehensive tests for:

- Authentication and authorization
- API endpoints
- Email functionality
- Booking system
- Payment processing

## 🚀 Deployment

### Production Setup

See [Production Setup Guide](PRODUCTION_SETUP.md) for detailed deployment instructions.

### Key Production Considerations

- Update CORS settings for production domains
- Configure SSL certificates
- Set up proper database backups
- Configure email services
- Set up monitoring and logging

### Environment Variables

Use the provided `bluehost-production.env` as a template for production configuration.

## 📚 Documentation

- [Mobile API Documentation](docs/mobile-api.md)
- [Production Setup Guide](PRODUCTION_SETUP.md)
- [Event Sales Report Outline](Event_Sales_Report_Outline.md)
- [API Email Verification](API_EMAIL_VERIFICATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact: info@etixss.com
- Documentation: [docs/](docs/)

## 🔄 Changelog

### Version 1.0.0

- Initial release
- Complete event management system
- Mobile API implementation
- Analytics dashboard
- Payment integration
- Email notification system

## 🏗️ Architecture

### Backend Architecture

```
app/
├── Console/Commands/     # Artisan commands
├── Http/
│   ├── Controllers/      # API and web controllers
│   ├── Middleware/       # Custom middleware
│   ├── Requests/         # Form validation
│   └── Resources/        # API resources
├── Models/               # Eloquent models
├── Notifications/        # Email notifications
└── Services/             # Business logic services
```

### Frontend Architecture

```
resources/js/
├── components/           # Reusable UI components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── contexts/            # React contexts
├── utils/               # Utility functions
└── types/               # TypeScript definitions
```

## 🔐 Security Features

- **CSRF Protection**: Laravel's built-in CSRF protection
- **SQL Injection Prevention**: Eloquent ORM with parameterized queries
- **XSS Protection**: Input sanitization and output escaping
- **Authentication**: Secure token-based authentication
- **Authorization**: Role-based access control
- **Rate Limiting**: API rate limiting to prevent abuse
- **Data Validation**: Comprehensive input validation

## 📈 Performance

- **Database Optimization**: Efficient queries and indexing
- **Caching**: Redis caching for improved performance
- **Asset Optimization**: Minified and compressed assets
- **Lazy Loading**: Component and route lazy loading
- **Image Optimization**: Optimized images and lazy loading

---

**Built with ❤️ for event organizers worldwide**
#   F F P I  
 