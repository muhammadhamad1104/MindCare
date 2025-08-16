import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Filters from '../components/pages/Psychologists/Filters';
import ResultsGrid from '../components/pages/Psychologists/ResultsGrid';
import { usePsychologists } from '../hooks/usePsychologists';
import { useFilters } from '../hooks/useFilters';
import { usePagination } from '../hooks/usePagination';

const PsychologistsPage = () => {
  const { psychologists, loading, error } = usePsychologists();
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  
  // Get filter options from data
  const specializations = [...new Set(psychologists.flatMap(p => p.specializations))].sort();
  const languages = [...new Set(psychologists.flatMap(p => p.languages))].sort();
  const locations = [...new Set(psychologists.map(p => p.location))].sort();
  
  // Setup filters
  const { 
    filters, 
    appliedFilters, 
    updateFilter, 
    updateFilters, 
    resetFilters, 
    filterItems 
  } = useFilters({
    specializations: [],
    language: [],
    location: '',
    experience: [0, 30],
    acceptingNewClients: false
  });
  
  // Apply filters when psychologists or filters change
  useEffect(() => {
    if (psychologists.length > 0) {
      const filtered = filterItems(psychologists);
      setFilteredPsychologists(filtered);
    }
  }, [psychologists, appliedFilters, filterItems]);
  
  // Setup pagination
  const itemsPerPage = 12;
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage
  } = usePagination(filteredPsychologists, itemsPerPage);
  
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'experience-desc', label: 'Experience (High to Low)' },
    { value: 'featured', label: 'Featured First' }
  ];
  
  const [sortValue, setSortValue] = useState('relevance');

  return (
    <Layout>
      <div className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Find a Psychologist</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our directory of licensed professionals ready to support you
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Filters 
              specializations={specializations}
              languages={languages}
              locations={locations}
              filters={filters}
              onFilterChange={(action) => {
                if (action.type === 'RESET') {
                  resetFilters();
                } else {
                  updateFilters({ [action.type.split('_')[1].toLowerCase()]: action.value });
                }
              }}
            />
          </div>
          
          <div className="lg:w-3/4">
            <ResultsGrid 
              psychologists={paginatedItems}
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={filteredPsychologists.length}
              sortOptions={sortOptions}
              sortValue={sortValue}
              onPageChange={goToPage}
              onSortChange={setSortValue}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PsychologistsPage;