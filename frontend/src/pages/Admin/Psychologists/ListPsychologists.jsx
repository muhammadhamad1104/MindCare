import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import Table from '../../../components/common/Table';
import Button from '../../../components/common/Button';
import Chip from '../../../components/common/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faToggleOn, faToggleOff, faPlus } from '@fortawesome/free-solid-svg-icons';
import { usePsychologists } from '../../../hooks/usePsychologists';
import { useNavigate } from 'react-router-dom';

const ListPsychologists = () => {
  const { psychologists, loading, error } = usePsychologists();
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (psychologists) {
      setFilteredPsychologists(
        psychologists.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.specializations.some(s => 
            s.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }
  }, [psychologists, searchTerm]);

  const toggleStatus = (id, currentStatus) => {
    // In a real app, this would call an API to update the status
    console.log(`Toggling status for psychologist ${id} to ${currentStatus === 'published' ? 'unpublished' : 'published'}`);
  };

  const toggleFeatured = (id, isFeatured) => {
    // In a real app, this would call an API to update featured status
    console.log(`Toggling featured status for psychologist ${id} to ${!isFeatured}`);
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }) => (
        <div className="flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-gray-600 text-sm">{row.original.email}</p>
          </div>
        </div>
      )
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <Chip 
          label={value} 
          className={`${
            value === 'published' ? 'bg-green-100 text-green-800' : 
            value === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
          }`}
        />
      )
    },
    {
      Header: 'Featured',
      accessor: 'featured',
      Cell: ({ value, row }) => (
        <button 
          onClick={() => toggleFeatured(row.original.id, value)}
          className={`p-2 rounded-full ${
            value ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 bg-gray-100'
          }`}
        >
          <FontAwesomeIcon icon={value ? faToggleOn : faToggleOff} size="lg" />
        </button>
      )
    },
    {
      Header: 'Actions',
      accessor: 'id',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => navigate(`/admin/psychologists/edit/${row.original.id}`)}
            className="text-indigo-600 hover:text-indigo-800 p-2"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button 
            onClick={() => toggleStatus(row.original.id, row.original.status)}
            className="text-gray-600 hover:text-gray-800 p-2"
          >
            {row.original.status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading psychologists...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Manage Psychologists</h1>
          <Button 
            onClick={() => navigate('/admin/psychologists/create')}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Psychologist
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <input
            type="text"
            placeholder="Search psychologists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table 
            columns={columns} 
            data={filteredPsychologists} 
            emptyMessage="No psychologists found"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListPsychologists;