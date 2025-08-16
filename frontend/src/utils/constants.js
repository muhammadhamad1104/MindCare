// User roles
export const USER_ROLES = {
  VISITOR: 'visitor',
  PSYCHOLOGIST: 'psychologist',
  ADMIN: 'admin'
};

// Psychologist statuses
export const PSYCHOLOGIST_STATUS = {
  DRAFT: 'draft',
  REVIEW: 'review',
  PUBLISHED: 'published',
  UNLISTED: 'unlisted'
};

// Analytics event types
export const EVENT_TYPES = {
  PAGE_VIEW: 'page_view',
  DIRECTORY_VIEW: 'directory_view',
  PROFILE_VIEW: 'profile_view',
  BOOK_CLICK: 'book_click',
  BOOKING_CREATED: 'booking_created',
  BOOKING_FAILED: 'booking_failed',
  EMAIL_SENT: 'email_sent',
  EMAIL_FAILED: 'email_failed',
  EMAIL_RESENT: 'email_resent',
  EMAIL_RESEND_FAILED: 'email_resent_failed',
  SECTION_CLICK: 'section_click',
  TIME_ON_PAGE: 'time_on_page',
  FILTER_APPLIED: 'filter_applied',
  SEARCH_PERFORMED: 'search_performed',
  PROFILE_UPDATED: 'profile_updated',
  LOGIN: 'login',
  LOGOUT: 'logout'
};

// Booking statuses
export const BOOKING_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  FAILED: 'failed'
};

// API endpoints
export const API_ENDPOINTS = {
  PSYCHOLOGISTS: '/psychologists',
  BOOKING: '/booking',
  AUTH: '/auth',
  ANALYTICS: '/analytics'
};

// Time ranges for analytics
export const TIME_RANGES = {
  DAY: '24h',
  WEEK: '7d',
  MONTH: '30d',
  QUARTER: '90d',
  YEAR: '365d'
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'mindconnect_auth_token',
  USER_DATA: 'mindconnect_user_data',
  LAST_VISITED: 'mindconnect_last_visited'
};

// Default pagination settings
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 12,
  PAGE: 1,
  SORT: 'featured,desc'
};

// Default psychologist filters
export const DEFAULT_FILTERS = {
  specializations: [],
  languages: [],
  minExperience: 0,
  maxExperience: 50,
  location: '',
  availability: '',
  isFeatured: false
};

// Email templates
export const EMAIL_TEMPLATES = {
  BOOKING_CONFIRMATION: 'booking_confirmation',
  PSYCHOLOGIST_WELCOME: 'psychologist_welcome',
  PASSWORD_RESET: 'password_reset',
  CONTACT_INQUIRY: 'contact_inquiry'
};

// Form modes
export const FORM_MODES = {
  CREATE: 'create',
  EDIT: 'edit'
};