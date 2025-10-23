import * as yup from 'yup';

// Step 1: Organization Details
export const organizationSchema = yup.object({
    name: yup
        .string()
        .required('Organization name is required')
        .min(2, 'Organization name must be at least 2 characters')
        .max(255, 'Organization name must be less than 255 characters')
        .matches(/^[a-zA-Z0-9\s\-\'\.&]+$/, 'Organization name contains invalid characters'),
    email: yup
        .string()
        .required('Organization email is required')
        .email('Please enter a valid email address')
        .max(255, 'Email must be less than 255 characters'),
    phone: yup
        .string()
        .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
        .max(20, 'Phone number must be less than 20 characters')
        .nullable(),
    address: yup
        .string()
        .max(500, 'Address must be less than 500 characters')
        .nullable(),
    about: yup
        .string()
        .max(2000, 'About section must be less than 2000 characters')
        .nullable(),
    slogan: yup
        .string()
        .max(255, 'Slogan must be less than 255 characters')
        .nullable(),
    website: yup
        .string()
        .url('Please enter a valid website URL')
        .max(255, 'Website URL must be less than 255 characters')
        .nullable(),
    avatar: yup
        .mixed()
        .nullable()
        .test('fileSize', 'File size must be less than 50MB', function(value) {
            if (!value) return true;
            
            // Handle FileList or single File
            const file = value instanceof FileList ? value[0] : value;
            if (!file || !file.size) return true;
            
            const maxSize = 50 * 1024 * 1024; // 50MB in bytes
            const fileSize = file.size;
            
            if (fileSize > maxSize) {
                return this.createError({
                    message: `File size is ${(fileSize / (1024 * 1024)).toFixed(2)}MB. Maximum allowed size is 50MB.`
                });
            }
            
            return true;
        })
        .test('fileType', 'Only image files are allowed', function(value) {
            if (!value) return true;
            
            // Handle FileList or single File
            const file = value instanceof FileList ? value[0] : value;
            if (!file || !file.type) return true;
            
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                return this.createError({
                    message: `File type ${file.type} is not allowed. Please upload a JPEG, PNG, GIF, or WebP image.`
                });
            }
            
            return true;
        })
});

// Step 2: Social Media
export const socialMediaSchema = yup.object({
    social_media: yup.object({
        facebook: yup
            .string()
            .url('Please enter a valid Facebook URL')
            .nullable(),
        twitter: yup
            .string()
            .url('Please enter a valid Twitter URL')
            .nullable(),
        instagram: yup
            .string()
            .url('Please enter a valid Instagram URL')
            .nullable(),
        linkedin: yup
            .string()
            .url('Please enter a valid LinkedIn URL')
            .nullable(),
    })
});

// Step 3: User Account Details
export const userAccountSchema = yup.object({
    user_name: yup
        .string()
        .required('Your name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(255, 'Name must be less than 255 characters')
        .matches(/^[a-zA-Z\s\-\'\.]+$/, 'Name can only contain letters, spaces, hyphens, apostrophes, and periods'),
    user_email: yup
        .string()
        .required('Your email is required')
        .email('Please enter a valid email address')
        .max(255, 'Email must be less than 255 characters')
        .lowercase('Email must be in lowercase'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .test('password-strength', 'Password is too weak', function(value) {
            if (!value) return true;
            
            // Check for common weak passwords
            const weakPasswords = ['password', '123456', 'qwerty', 'abc123', 'password123'];
            if (weakPasswords.includes(value.toLowerCase())) {
                return this.createError({
                    message: 'This password is too common. Please choose a stronger password.'
                });
            }
            
            return true;
        }),
    password_confirmation: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match')
});

// Combined schema for final validation
export const completeRegistrationSchema = yup.object({
    ...organizationSchema.fields,
    ...socialMediaSchema.fields,
    ...userAccountSchema.fields,
});
