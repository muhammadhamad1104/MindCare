import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import AnalyticsChart from '../../components/ui/AnalyticsChart';
import Select from '../../components/common/Select';
import { useAnalytics } from '../../hooks/useAnalytics';

const AdminAnalytics = () => {
  const { getPlatformAnalytics, stats } = useAnalytics();
  const [dateRange, setDateRange] = useState('30d');
  
  useEffect(() => {
    getPlatformAnalytics(dateRange);
  }, [dateRange, getPlatformAnalytics]);

  const platformStats = stats.platform || {};
  
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Profile Views',
        data: [1250, 1900, 1800, 2200, 2100, 2400, 2800],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        label: 'Booking Requests',
        data: [120, 180, 150, 200, 220, 240, 300],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
      }
    ]
  };

  const psychologistData = {
    labels: ['Dr. Smith', 'Dr. Johnson', 'Dr. Lee', 'Dr. Garcia', 'Dr. Chen'],
    datasets: [
      {
        label: 'Profile Views',
        data: [1250, 980, 850, 720, 650],
        backgroundColor: '#3b82f6',
      }
    ]
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Date Range:</span>
            <Select
              options={[
                { value: '7d', label: 'Last 7 Days' },
                { value: '30d', label: 'Last 30 Days' },
                { value: '90d', label: 'Last 90 Days' }
              ]}
              value={dateRange}
              onChange={setDateRange}
              className="w-40"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart 
            title="Platform Traffic Overview"
            data={chartData}
            type="line"
          />
          
          <AnalyticsChart 
            title="Top Psychologists by Views"
            data={psychologistData}
            type="bar"
            options={{
              indexAxis: 'y',
            }}
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Key Metrics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 mb-1">Total Profile Views</p>
              <p className="text-3xl font-bold">{platformStats.totalViews || '0'}</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 mb-1">Unique Visitors</p>
              <p className="text-3xl font-bold">{platformStats.uniqueVisitors || '0'}</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 mb-1">Booking Requests</p>
              <p className="text-3xl font-bold">{platformStats.totalBookings || '0'}</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 mb-1">Avg. Time on Page</p>
              <p className="text-3xl font-bold">{platformStats.avgTimeOnPage ? `${platformStats.avgTimeOnPage} min` : '0 min'}</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold">{platformStats.conversionRate ? `${platformStats.conversionRate}%` : '0%'}</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 mb-1">Featured Profiles CTR</p>
              <p className="text-3xl font-bold">{platformStats.featuredCTR ? `${platformStats.featuredCTR}%` : '0%'}</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;