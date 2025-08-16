// src/context/AnalyticsContext.jsx
import React, { createContext, useState } from 'react';
import { analyticsService } from '../services/analytics';

// Export the context
export const AnalyticsContext = createContext(null);

export const AnalyticsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const trackEvent = async (eventType, data = {}) => {
    try {
      const newEvent = {
        id: Date.now().toString(),
        type: eventType,
        timestamp: new Date().toISOString(),
        ...data,
        status: 'pending'
      };
      
      setEvents(prev => [newEvent, ...prev]);
      
      const createdEvent = await analyticsService.track(eventType, data);
      
      setEvents(prev => 
        prev.map(e => e.id === newEvent.id ? createdEvent : e)
      );
      
      return createdEvent;
    } catch (err) {
      console.error('Analytics tracking error:', err);
      setEvents(prev => prev.filter(e => e.id !== newEvent.id));
      return null;
    }
  };

  const getPsychologistAnalytics = async (psychologistId, period = '30d') => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getForPsychologist(psychologistId, period);
      setStats(prev => ({ ...prev, [psychologistId]: data }));
      return data;
    } catch (err) {
      setError('Failed to load analytics. Please try again later.');
      console.error('Analytics load error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPlatformAnalytics = async (period = '30d') => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getPlatformAnalytics(period);
      setStats(prev => ({ ...prev, platform: data }));
      return data;
    } catch (err) {
      setError('Failed to load analytics. Please try again later.');
      console.error('Analytics load error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEvents = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getEvents(filters);
      setEvents(data);
      return data;
    } catch (err) {
      setError('Failed to load events. Please try again later.');
      console.error('Events load error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    events,
    stats,
    loading,
    error,
    trackEvent,
    getPsychologistAnalytics,
    getPlatformAnalytics,
    getEvents
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};