import * as Yup from 'yup';

// Common validation schemas
export const emailSchema = Yup.string()
  .email('Invalid email address')
  .required('Email is required');

export const passwordSchema = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required');

export const nameSchema = Yup.string()
  .min(2, 'Name must be at least 2 characters')
  .required('Name is required');

export const phoneSchema = Yup.string()
  .matches(/^[0-9+\-\s()]{10,15}$/, 'Invalid phone number');

// Form validation schemas
export const loginValidationSchema = Yup.object({
  email: emailSchema,
  password: passwordSchema
});

export const bookingValidationSchema = Yup.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
  preferredTimes: Yup.string()
    .nullable()
});

export const psychologistValidationSchema = Yup.object({
  name: nameSchema,
  credentials: Yup.string().required('Credentials are required'),
  yearsExperience: Yup.number()
    .min(0, 'Experience cannot be negative')
    .max(50, 'Maximum experience is 50 years')
    .required('Experience is required'),
  specializations: Yup.array()
    .min(1, 'Select at least one specialization')
    .required('Specializations are required'),
  languages: Yup.array()
    .min(1, 'Select at least one language')
    .required('Languages are required'),
  location: Yup.string().required('Location is required'),
  timezone: Yup.string().required('Timezone is required'),
  about: Yup.string()
    .min(100, 'About must be at least 100 characters')
    .required('About is required'),
  services: Yup.array()
    .min(1, 'List at least one service')
    .required('Services are required'),
  rate: Yup.string().required('Rate information is required'),
  availability: Yup.string().required('Availability note is required'),
  contactEmail: emailSchema,
  phone: phoneSchema,
  website: Yup.string().url('Invalid URL').nullable()
});

export const contactValidationSchema = Yup.object({
  name: nameSchema,
  email: emailSchema,
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
  inquiryType: Yup.string().required('Inquiry type is required')
});

export const psychologistSignupValidationSchema = Yup.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  practiceLocations: Yup.string().required('Practice locations are required'),
  description: Yup.string()
    .min(50, 'Description must be at least 50 characters')
    .required('Description is required'),
  yearsExperience: Yup.number()
    .min(0, 'Experience cannot be negative')
    .required('Experience is required'),
  specializations: Yup.array()
    .min(1, 'Select at least one specialization')
    .required('Specializations are required'),
  languages: Yup.array()
    .min(1, 'Select at least one language')
    .required('Languages are required'),
  website: Yup.string().url('Invalid URL').nullable()
});

// Validation functions
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9+\-\s()]{10,15}$/;
  return re.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

// File validation
export const validateImage = (file) => {
  if (!file) return true;
  
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!validTypes.includes(file.type)) {
    return 'Invalid file type. Only JPG, PNG, GIF are allowed.';
  }
  
  if (file.size > maxSize) {
    return 'File size too large. Max 5MB allowed.';
  }
  
  return true;
};