// src/context/BookingContext.jsx
import React, { createContext, useState } from 'react';
import { bookingService } from '../services/booking';

// Export the context
export const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async (psychologistId, formData) => {
    setLoading(true);
    setError(null);
    try {
      const booking = await bookingService.create(psychologistId, formData);
      setBookings(prev => [booking, ...prev]);
      return booking;
    } catch (err) {
      setError(err.message || 'Failed to send booking request. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendBooking = async (bookingId) => {
    setLoading(true);
    setError(null);
    try {
      const updatedBooking = await bookingService.resend(bookingId);
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? updatedBooking : b)
      );
      return updatedBooking;
    } catch (err) {
      setError(err.message || 'Failed to resend booking request. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookingsForPsychologist = async (psychologistId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getForPsychologist(psychologistId);
      setBookings(data);
      return data;
    } catch (err) {
      setError('Failed to load booking history. Please try again later.');
      console.error('Bookings load error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getAll();
      setBookings(data);
      return data;
    } catch (err) {
      setError('Failed to load bookings. Please try again later.');
      console.error('Bookings load error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    bookings,
    loading,
    error,
    createBooking,
    resendBooking,
    getBookingsForPsychologist,
    getAllBookings
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};