import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export const useFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const debouncedFilters = useDebounce(filters, 500);

  // Update applied filters after debounce
  useEffect(() => {
    setAppliedFilters(debouncedFilters);
  }, [debouncedFilters]);

  const updateFilter = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  // Memoized filter function
  const filterItems = useCallback((items) => {
    if (!items || items.length === 0) return [];
    
    return items.filter(item => {
      return Object.entries(appliedFilters).every(([key, filterValue]) => {
        // Skip empty filters
        if (!filterValue || filterValue.length === 0) return true;
        
        const itemValue = item[key];
        
        // Handle different filter types
        switch (key) {
          case 'specializations':
            return filterValue.some(spec => 
              itemValue.map(s => s.toLowerCase()).includes(spec.toLowerCase())
            );
          
          case 'languages':
            return filterValue.every(lang => 
              itemValue.map(l => l.toLowerCase()).includes(lang.toLowerCase())
            );
          
          case 'experience':
            if (filterValue.min) {
              if (parseInt(itemValue) < filterValue.min) return false;
            }
            if (filterValue.max) {
              if (parseInt(itemValue) > filterValue.max) return false;
            }
            return true;
          
          case 'acceptingNewClients':
            return itemValue === filterValue;
          
          case 'search':
            const searchTerm = filterValue.toLowerCase();
            return (
              item.name.toLowerCase().includes(searchTerm) ||
              (item.credentials && item.credentials.toLowerCase().includes(searchTerm)) ||
              (item.about && item.about.toLowerCase().includes(searchTerm)) ||
              (item.specializations && item.specializations.some(
                s => s.toLowerCase().includes(searchTerm)
              ))
            );
          
          default:
            return true;
        }
      });
    });
  }, [appliedFilters]);

  return {
    filters,
    appliedFilters,
    updateFilter,
    updateFilters,
    resetFilters,
    filterItems
  };
};