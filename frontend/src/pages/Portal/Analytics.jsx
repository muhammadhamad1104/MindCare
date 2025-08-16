import React, { useState, useEffect } from 'react';
import PortalLayout from '../../components/layout/PortalLayout';
import AnalyticsChart from '../../components/ui/AnalyticsChart';
import Select from '../../components/common/Select';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useAuth } from '../../hooks/useAuth';

const PortalAnalytics = () => {
  const { user } = useAuth();
  const { getPsychologistAnalytics, stats } = useAnalytics();
  const [dateRange, setDateRange] = useState('30d');
  const [chartType, setChartType] = useState('line');
  
  useEffect(() => {
    if (user?.psychologistId) {
      getPsychologistAnalytics(user.psychologistId, dateRange);
    }
  }, [user, dateRange, getPsychologistAnalytics]);

  const psychologistStats = stats[user?.psychologistId] || {};
  const chartData = psychologistStats.chartData || {
    labels: [],
    datasets: []
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Profile Analytics</h1>
          
          <div className="flex space-x-4">
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
            <Select
              options={[
                { value: 'line', label: 'Line Chart' },
                { value: 'bar', label: 'Bar Chart' }
              ]}
              value={chartType}
              onChange={setChartType}
              className="w-40"
            />
          </div>
        </div>
        
        <AnalyticsChart 
          title="Profile Views Over Time"
          data={chartData}
          type={chartType}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top Referrers</h3>
            <ul className="space-y-3">
              {psychologistStats.topReferrers?.length > 0 ? (
                psychologistStats.topReferrers.map((referrer, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{referrer.source}</span>
                    <span className="font-medium">{referrer.count} views</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-600">No referrer data available</p>
              )}
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Sections</h3>
            <ul className="space-y-3">
              {psychologistStats.popularSections?.length > 0 ? (
                psychologistStats.popularSections.map((section, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{section.name}</span>
                    <span className="font-medium">{section.clicks} clicks</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-600">No section data available</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalAnalytics;