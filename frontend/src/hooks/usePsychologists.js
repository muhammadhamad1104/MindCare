// src/hooks/usePsychologists.js
import { useContext } from 'react';
import { PsychologistsContext } from '../context/PsychologistsContext';

export const usePsychologists = () => {
  const context = useContext(PsychologistsContext);
  
  if (!context) {
    throw new Error('usePsychologists must be used within a PsychologistsProvider');
  }
  
  return context;
};