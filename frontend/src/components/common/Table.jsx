import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const Table = ({ 
  columns, 
  data, 
  sortColumn, 
  sortDirection, 
  onSort,
  className = '',
  rowClassName = ''
}) => {
  const handleSort = (column) => {
    if (!column.sortable) return;
    
    if (sortColumn === column.key) {
      onSort(column.key, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(column.key, 'asc');
    }
  };
  
  const renderSortIcon = (column) => {
    if (column.key !== sortColumn) return <FontAwesomeIcon icon={faSort} className="ml-1 text-gray-300" />;
    
    return sortDirection === 'asc' ? (
      <FontAwesomeIcon icon={faSortUp} className="ml-1 text-blue-600" />
    ) : (
      <FontAwesomeIcon icon={faSortDown} className="ml-1 text-blue-600" />
    );
  };
  
  return (
    <div className={`overflow-x-auto rounded-lg shadow ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center">
                  {column.title}
                  {column.sortable && renderSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={rowClassName || 'hover:bg-blue-50 transition-colors'}
              >
                {columns.map((column) => (
                  <td 
                    key={column.key} 
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length} 
                className="px-6 py-8 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;