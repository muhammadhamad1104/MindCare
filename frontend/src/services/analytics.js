import api from './api';
import { trackEvent } from '../utils/eventTracking';
import { EVENT_TYPES } from '../utils/constants';

export const analyticsService = {
  // Track any event
  track: async (eventData) => {
    try {
      // Send to backend for persistent storage
      const response = await api.post('/analytics/events', eventData);
      
      // Also track client-side if needed
      trackEvent(eventData.eventType, eventData);
      
      return response.data;
    } catch (error) {
      console.error('Analytics tracking failed', error);
      throw error;
    }
  },

  // Get platform-wide analytics
  getPlatformAnalytics: async (timeRange = '7d') => {
    try {
      const response = await api.get('/analytics/platform', { params: { range: timeRange } });
      return response.data;
    } catch (error) {
      console.error('Failed to get platform analytics', error);
      throw error;
    }
  },

  // Get psychologist-specific analytics
  getPsychologistAnalytics: async (psychologistId, timeRange = '7d') => {
    try {
      const response = await api.get(`/analytics/psychologists/${psychologistId}`, { 
        params: { range: timeRange } 
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get psychologist analytics', error);
      throw error;
    }
  },

  // Export analytics data as CSV
  exportAnalytics: async (params) => {
    try {
      const response = await api.get('/analytics/export', { 
        params,
        responseType: 'blob' // For file download
      });
      return response;
    } catch (error) {
      console.error('Export failed', error);
      throw error;
    }
  },

  // Track common events with helper methods
  trackPageView: (page, psychologistId = null) => {
    return analyticsService.track({
      eventType: EVENT_TYPES.PAGE_VIEW,
      page,
      psychologistId,
      timestamp: new Date().toISOString()
    });
  },

  trackBookingClick: (psychologistId) => {
    return analyticsService.track({
      eventType: EVENT_TYPES.BOOK_CLICK,
      psychologistId,
      timestamp: new Date().toISOString()
    });
  },

  trackFilterApplied: (filterType, value) => {
    return analyticsService.track({
      eventType: EVENT_TYPES.FILTER_APPLIED,
      filterType,
      value,
      timestamp: new Date().toISOString()
    });
  }
};