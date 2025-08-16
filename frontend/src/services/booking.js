import api from './api';
import { trackEvent } from '../utils/eventTracking';
import { EVENT_TYPES } from '../utils/constants';

export const bookingService = {
  // Create a new booking request
  createBooking: async (psychologistId, bookingData) => {
    try {
      const response = await api.post(`/booking/${psychologistId}`, bookingData);
      
      // Track successful booking
      trackEvent(EVENT_TYPES.BOOKING_CREATED, {
        psychologistId,
        bookingId: response.data.id
      });
      
      return response.data;
    } catch (error) {
      console.error('Booking creation failed', error);
      
      // Track failed booking
      trackEvent(EVENT_TYPES.BOOKING_FAILED, {
        psychologistId,
        error: error.message
      });
      
      throw error;
    }
  },

  // Get booking requests for a psychologist
  getBookingsForPsychologist: async (psychologistId, params = {}) => {
    try {
      const response = await api.get(`/booking/psychologist/${psychologistId}`, { params });
      return response.data;
    } catch (error) {
      console.error('Failed to get bookings', error);
      throw error;
    }
  },

  // Get all booking requests (admin only)
  getAllBookings: async (params = {}) => {
    try {
      const response = await api.get('/booking', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to get bookings', error);
      throw error;
    }
  },

  // Resend a booking email
  resendBookingEmail: async (bookingId) => {
    try {
      const response = await api.post(`/booking/${bookingId}/resend`);
      
      // Track resend event
      trackEvent(EVENT_TYPES.EMAIL_RESENT, {
        bookingId,
        status: 'success'
      });
      
      return response.data;
    } catch (error) {
      console.error('Failed to resend email', error);
      
      // Track failed resend
      trackEvent(EVENT_TYPES.EMAIL_RESEND_FAILED, {
        bookingId,
        error: error.message
      });
      
      throw error;
    }
  },

  // Get booking details
  getBookingDetails: async (bookingId) => {
    try {
      const response = await api.get(`/booking/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get booking details', error);
      throw error;
    }
  }
};