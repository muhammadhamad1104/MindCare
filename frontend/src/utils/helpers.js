import { 
  STORAGE_KEYS,
  PAGINATION_DEFAULTS,
  USER_ROLES
} from './constants';

// Get auth token from storage
export const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

// Store auth data
export const storeAuthData = (token, user) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
};

// Clear auth data
export const clearAuthData = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
};

// Get user data from storage
export const getUserData = () => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return userData ? JSON.parse(userData) : null;
};

// Check if user has specific role
export const hasRole = (role) => {
  const user = getUserData();
  return user?.role === role;
};

// Format experience string
export const formatExperience = (years) => {
  if (years === 0) return 'Newly qualified';
  if (years === 1) return '1 year experience';
  return `${years} years experience`;
};

// Format date
export const formatDate = (dateString, format = 'MMM d, yyyy') => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Generate page title
export const generatePageTitle = (title) => {
  return `${title} | MindConnect Psychology Platform`;
};

// Generate slug from name
export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/--+/g, '-')     // Replace multiple hyphens with single
    .trim();
};

// Handle API errors
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // The request was made and the server responded with a status code
    const { status, data } = error.response;
    
    if (status === 401) {
      return 'Session expired. Please log in again.';
    }
    
    if (status === 403) {
      return 'You do not have permission to perform this action.';
    }
    
    if (status === 404) {
      return 'Resource not found.';
    }
    
    if (data && data.message) {
      return data.message;
    }
  } else if (error.request) {
    // The request was made but no response was received
    return 'Network error. Please check your connection.';
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// Generate pagination metadata
export const getPaginationData = (response, params = {}) => {
  const { page = PAGINATION_DEFAULTS.PAGE, pageSize = PAGINATION_DEFAULTS.PAGE_SIZE } = params;
  
  return {
    items: response.data,
    totalItems: parseInt(response.headers['x-total-count'], 10) || 0,
    currentPage: parseInt(page, 10),
    pageSize: parseInt(pageSize, 10),
    totalPages: Math.ceil((parseInt(response.headers['x-total-count'], 10) || 0) / pageSize)
  };
};

// Debounce function for search inputs
export const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  return names.map(n => n[0]).join('').toUpperCase();
};