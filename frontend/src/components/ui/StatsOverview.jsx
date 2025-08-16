import React from 'react';
import DashboardCard from './DashboardCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEye, 
  faEnvelope, 
  faClock,
  faChartLine,
  faHeart
} from '@fortawesome/free-solid-svg-icons';

const StatsOverview = ({ stats, period = '30d' }) => {
  const getPeriodText = () => {
    switch(period) {
      case '7d': return 'Last 7 days';
      case '30d': return 'Last 30 days';
      case '90d': return 'Last 90 days';
      default: return `Last ${period}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Statistics Overview</h3>
        <p className="text-gray-600">{getPeriodText()}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Profile Views"
          value={stats.views}
          change={stats.viewsChange}
          changeType={stats.viewsChange > 0 ? 'increase' : 'decrease'}
          icon={faEye}
          color="indigo"
          description="Total views of your profile"
        />
        
        <DashboardCard
          title="Unique Visitors"
          value={stats.uniqueVisitors}
          change={stats.uniqueVisitorsChange}
          changeType={stats.uniqueVisitorsChange > 0 ? 'increase' : 'decrease'}
          icon={faUser}
          color="teal"
          description="Different people who viewed your profile"
        />
        
        <DashboardCard
          title="Avg. Time on Page"
          value={`${stats.avgTimeOnPage}m`}
          change={stats.avgTimeOnPageChange}
          changeType={stats.avgTimeOnPageChange > 0 ? 'increase' : 'decrease'}
          icon={faClock}
          color="amber"
          description="Average time visitors spend on your profile"
        />
        
        <DashboardCard
          title="Booking Requests"
          value={stats.bookingRequests}
          change={stats.bookingRequestsChange}
          changeType={stats.bookingRequestsChange > 0 ? 'increase' : 'decrease'}
          icon={faEnvelope}
          color="violet"
          description="Total booking requests received"
        />
        
        <DashboardCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          change={stats.conversionRateChange}
          changeType={stats.conversionRateChange > 0 ? 'increase' : 'decrease'}
          icon={faChartLine}
          color="indigo"
          description="Booking requests per profile view"
        />
        
        <DashboardCard
          title="Profile Saves"
          value={stats.profileSaves}
          change={stats.profileSavesChange}
          changeType={stats.profileSavesChange > 0 ? 'increase' : 'decrease'}
          icon={faHeart}
          color="amber"
          description="Times your profile was saved"
        />
      </div>
    </div>
  );
};

export default StatsOverview;