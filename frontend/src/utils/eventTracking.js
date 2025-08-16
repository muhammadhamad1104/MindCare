import { analyticsService } from '../services/analytics';
import { EVENT_TYPES } from './constants';

// Track an event
export const trackEvent = (eventType, eventData = {}) => {
  const baseData = {
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    screen: `${window.screen.width}x${window.screen.height}`
  };
  
  const fullEventData = {
    eventType,
    ...baseData,
    ...eventData
  };
  
  // Send to analytics service
  analyticsService.track(fullEventData);
  
  // Also log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${eventType}:`, fullEventData);
  }
};

// Track page view
export const trackPageView = () => {
  trackEvent(EVENT_TYPES.PAGE_VIEW, {
    page: window.location.pathname
  });
};

// Track profile view
export const trackProfileView = (psychologistId) => {
  trackEvent(EVENT_TYPES.PROFILE_VIEW, { psychologistId });
};

// Track booking click
export const trackBookingClick = (psychologistId) => {
  trackEvent(EVENT_TYPES.BOOK_CLICK, { psychologistId });
};

// Track filter application
export const trackFilterApplied = (filterType, value) => {
  trackEvent(EVENT_TYPES.FILTER_APPLIED, { filterType, value });
};

// Track search
export const trackSearch = (query) => {
  trackEvent(EVENT_TYPES.SEARCH_PERFORMED, { query });
};

// Track time on page
export const trackTimeOnPage = (page, duration) => {
  trackEvent(EVENT_TYPES.TIME_ON_PAGE, { 
    page,
    duration: Math.round(duration) 
  });
};

// Initialize time tracking
export const initTimeTracking = () => {
  let startTime = Date.now();
  let currentPage = window.location.pathname;
  
  // Track when page changes or unloads
  window.addEventListener('beforeunload', () => {
    const duration = (Date.now() - startTime) / 1000;
    if (duration > 1) {
      trackTimeOnPage(currentPage, duration);
    }
  });
  
  // Track when route changes
  if (window.history.pushState) {
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      const duration = (Date.now() - startTime) / 1000;
      if (duration > 1) {
        trackTimeOnPage(currentPage, duration);
      }
      originalPushState.apply(history, args);
      currentPage = window.location.pathname;
      startTime = Date.now();
    };
  }
  
  // Start timer for current page
  startTime = Date.now();
};

// Initialize event tracking
export const initEventTracking = () => {
  // Track initial page view
  trackPageView();
  
  // Initialize time tracking
  initTimeTracking();
  
  // Set up global error tracking
  window.addEventListener('error', (event) => {
    trackEvent('error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });
  
  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    trackEvent('unhandled_rejection', {
      reason: event.reason?.message || String(event.reason)
    });
  });
};