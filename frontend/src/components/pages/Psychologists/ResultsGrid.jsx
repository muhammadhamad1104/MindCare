import React from 'react';
import Pagination from '../../common/Pagination';
import Select from '../../common/Select';
import PsychologistCard from './PsychologistCard';
import directoryEmptyState from '../../../assets/images/illustrations/directory-empty-state.jpeg';

const ResultsGrid = ({ 
  psychologists, 
  currentPage, 
  totalPages,
  totalResults,
  sortOptions,
  sortValue,
  onPageChange,
  onSortChange,
  loading
}) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading professionals...</p>
      </div>
    );
  }

  if (psychologists.length === 0) {
    return (
      <div className="text-center py-12">
        <img 
          src={directoryEmptyState} 
          alt="No psychologists found" 
          className="w-64 mx-auto mb-6"
        />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          No professionals found
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Try adjusting your filters or search criteria to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <p className="text-gray-600 mb-4 md:mb-0">
          Showing <span className="font-medium">{psychologists.length}</span> of{' '}
          <span className="font-medium">{totalResults}</span> professionals
        </p>
        
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Sort by:</span>
          <Select
            options={sortOptions}
            value={sortValue}
            onChange={onSortChange}
            className="w-48"
            isSearchable={false}
          />
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {psychologists.map(psychologist => (
          <PsychologistCard 
            key={psychologist.id} 
            psychologist={psychologist} 
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ResultsGrid;