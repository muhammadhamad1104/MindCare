import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import BookingLog from '../../components/ui/BookingLog';
import Select from '../../components/common/Select';
import { useBooking } from '../../hooks/useBooking';

const AdminBookings = () => {
  const { getAllBookings, bookings, loading, error } = useBooking();
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    getAllBookings();
  }, [getAllBookings]);
  
  const filteredBookings = statusFilter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === statusFilter);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Booking Requests</h1>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Filter by Status:</span>
            <Select
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'sent', label: 'Sent' },
                { value: 'failed', label: 'Failed' },
                { value: 'pending', label: 'Pending' }
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-40"
            />
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}
        
        <BookingLog 
          bookings={filteredBookings} 
          showPsychologist={true}
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;