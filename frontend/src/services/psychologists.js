import api from './api';
import { trackEvent } from '../utils/eventTracking';
import { EVENT_TYPES } from '../utils/constants';

export const psychologistsService = {
  // Get all psychologists
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/psychologists', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to get psychologists', error);
      throw error;
    }
  },

  // Get a single psychologist
  getById: async (id) => {
    try {
      const response = await api.get(`/psychologists/${id}`);
      
      // Track profile view
      trackEvent(EVENT_TYPES.PROFILE_VIEW, { psychologistId: id });
      
      return response.data;
    } catch (error) {
      console.error('Failed to get psychologist', error);
      throw error;
    }
  },

  // Get by slug
  getBySlug: async (slug) => {
    try {
      const response = await api.get(`/psychologists/slug/${slug}`);
      
      // Track profile view
      trackEvent(EVENT_TYPES.PROFILE_VIEW, { psychologistId: response.data.id });
      
      return response.data;
    } catch (error) {
      console.error('Failed to get psychologist by slug', error);
      throw error;
    }
  },

  // Create a psychologist (admin only)
  create: async (data) => {
    try {
      const response = await api.post('/psychologists', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create psychologist', error);
      throw error;
    }
  },

  // Update a psychologist
  update: async (id, data) => {
    try {
      const response = await api.put(`/psychologists/${id}`, data);
      
      // Track profile update
      trackEvent(EVENT_TYPES.PROFILE_UPDATED, { psychologistId: id });
      
      return response.data;
    } catch (error) {
      console.error('Failed to update psychologist', error);
      throw error;
    }
  },

  // Update psychologist status
  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/psychologists/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Failed to update status', error);
      throw error;
    }
  },

  // Toggle featured status
  toggleFeatured: async (id, isFeatured) => {
    try {
      const response = await api.patch(`/psychologists/${id}/featured`, { isFeatured });
      return response.data;
    } catch (error) {
      console.error('Failed to toggle featured status', error);
      throw error;
    }
  },

  // Delete a psychologist (admin only)
  delete: async (id) => {
    try {
      const response = await api.delete(`/psychologists/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete psychologist', error);
      throw error;
    }
  },

  // Get specializations
  getSpecializations: async () => {
    try {
      const response = await api.get('/psychologists/specializations');
      return response.data;
    } catch (error) {
      console.error('Failed to get specializations', error);
      throw error;
    }
  },

  // Get locations
  getLocations: async () => {
    try {
      const response = await api.get('/psychologists/locations');
      return response.data;
    } catch (error) {
      console.error('Failed to get locations', error);
      throw error;
    }
  }
};
