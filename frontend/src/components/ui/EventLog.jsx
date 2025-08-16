import React, { useState } from 'react';
import Table from '../common/Table';
import Pagination from '../common/Pagination';
import Chip from '../common/Chip';
import { format } from 'date-fns';

const EventLog = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const currentEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const eventTypeBadge = (type) => {
    const typeColors = {
      profile_view: 'blue',
      booking_request: 'indigo',
      email_sent: 'teal',
      click: 'violet',
      form_submit: 'amber',
      filter_applied: 'cyan'
    };
    
    return (
      <Chip 
        label={type.replace('_', ' ')} 
        className={`bg-${typeColors[type] || 'gray'}-100 text-${typeColors[type] || 'gray'}-800 capitalize`}
      />
    );
  };

  const columns = [
    { 
      Header: 'Event', 
      accessor: 'type',
      Cell: ({ value }) => eventTypeBadge(value)
    },
    { 
      Header: 'Details', 
      accessor: 'details',
      Cell: ({ value }) => (
        <div className="max-w-md">
          <p className="font-medium">{value.description}</p>
          {value.psychologist && (
            <p className="text-gray-600 text-sm">
              Psychologist: {value.psychologist.name}
            </p>
          )}
        </div>
      )
    },
    { 
      Header: 'Date', 
      accessor: 'timestamp',
      Cell: ({ value }) => format(new Date(value), 'MMM d, yyyy HH:mm:ss')
    },
    { 
      Header: 'Source', 
      accessor: 'source',
      Cell: ({ value }) => (
        <div>
          <p className="text-sm">{value.page}</p>
          <p className="text-gray-600 text-xs">{value.ip}</p>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          Event Log
        </h3>
        <div className="text-sm text-gray-600">
          {events.length} events recorded
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table 
          columns={columns} 
          data={currentEvents} 
          emptyMessage="No events recorded"
        />
      </div>
      
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default EventLog;