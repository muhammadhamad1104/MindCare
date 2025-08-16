import React, { useState } from 'react';
import Table from '../common/Table';
import Pagination from '../common/Pagination';
import Chip from '../common/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

const BookingLog = ({ bookings, showPsychologist = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const currentBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const statusBadge = (status) => {
    switch(status) {
      case 'sent':
        return <Chip 
          label="Sent" 
          className="bg-green-100 text-green-800" 
          icon={faCheckCircle}
        />;
      case 'failed':
        return <Chip 
          label="Failed" 
          className="bg-red-100 text-red-800" 
          icon={faExclamationTriangle}
        />;
      case 'pending':
      default:
        return <Chip 
          label="Pending" 
          className="bg-yellow-100 text-yellow-800" 
        />;
    }
  };

  const columns = [
    ...(showPsychologist ? [
      { 
        Header: 'Psychologist', 
        accessor: 'psychologist',
        Cell: ({ value }) => (
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
            <span className="font-medium">{value.name}</span>
          </div>
        )
      }
    ] : []),
    { 
      Header: 'Client', 
      accessor: 'client',
      Cell: ({ value }) => (
        <div>
          <p className="font-medium">{value.name}</p>
          <p className="text-gray-600 text-sm">{value.email}</p>
        </div>
      )
    },
    { 
      Header: 'Date', 
      accessor: 'date',
      Cell: ({ value }) => format(new Date(value), 'MMM d, yyyy HH:mm')
    },
    { 
      Header: 'Status', 
      accessor: 'status',
      Cell: ({ value }) => statusBadge(value)
    },
    {
      Header: 'Actions',
      accessor: 'id',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button 
            className="text-indigo-600 hover:text-indigo-800"
            onClick={() => console.log('View details', row.original)}
          >
            View
          </button>
          {row.original.status === 'failed' && (
            <button 
              className="text-indigo-600 hover:text-indigo-800 flex items-center"
              onClick={() => console.log('Resend email', row.original)}
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
              Resend
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          Booking Requests
        </h3>
        <div className="text-sm text-gray-600">
          Showing {currentBookings.length} of {bookings.length} requests
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table 
          columns={columns} 
          data={currentBookings} 
          emptyMessage="No booking requests found"
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

export default BookingLog;