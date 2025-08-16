// src/context/PsychologistsContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { psychologistsService } from '../services/psychologists';

export const PsychologistsContext = createContext(null);

export const PsychologistsProvider = ({ children }) => {
  const [psychologists, setPsychologists] = useState([]);
  const [featuredPsychologists, setFeaturedPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPsychologist, setCurrentPsychologist] = useState(null);

  // Load all psychologists
  useEffect(() => {
    const loadPsychologists = async () => {
      try {
        setLoading(true);
        const data = await psychologistsService.getAll();
        setPsychologists(data);
        
        // Extract featured psychologists
        const featured = data.filter(p => p.featured && p.status === 'published');
        setFeaturedPsychologists(featured);
      } catch (err) {
        setError('Failed to load psychologists. Please try again later.');
        console.error('Psychologists load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPsychologists();
  }, []);

  const getPsychologistById = (id) => {
    return psychologists.find(p => p.id === id);
  };

  const getPsychologistBySlug = async (slug) => {
    try {
      // Check if we already have this psychologist
      const existing = psychologists.find(p => p.slug === slug);
      if (existing) {
        setCurrentPsychologist(existing);
        return existing;
      }
      
      // Fetch from API if not in cache
      setLoading(true);
      const psychologist = await psychologistsService.getBySlug(slug);
      setCurrentPsychologist(psychologist);
      
      // Add to our list if not already present
      if (!psychologists.some(p => p.id === psychologist.id)) {
        setPsychologists(prev => [...prev, psychologist]);
      }
      
      return psychologist;
    } catch (err) {
      setError('Psychologist not found. It may have been removed or unpublished.');
      console.error('Psychologist fetch error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePsychologist = (id, updatedData) => {
    setPsychologists(prev => 
      prev.map(p => p.id === id ? { ...p, ...updatedData } : p)
    );
    
    if (currentPsychologist?.id === id) {
      setCurrentPsychologist(prev => ({ ...prev, ...updatedData }));
    }
    
    // Update featured list if needed
    if (updatedData.featured !== undefined || updatedData.status !== undefined) {
      const featured = psychologists
        .filter(p => p.featured && p.status === 'published')
        .map(p => p.id === id ? { ...p, ...updatedData } : p);
      setFeaturedPsychologists(featured);
    }
  };

  const value = {
    psychologists,
    featuredPsychologists,
    currentPsychologist,
    loading,
    error,
    getPsychologistById,
    getPsychologistBySlug,
    updatePsychologist
  };

  return (
    <PsychologistsContext.Provider value={value}>
      {children}
    </PsychologistsContext.Provider>
  );
};