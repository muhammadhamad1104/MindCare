import React, { useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import DashboardCard from '../../components/ui/DashboardCard';
import StatsOverview from '../../components/ui/StatsOverview';
import { useAnalytics } from '../../hooks/useAnalytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEye, 
  faEnvelope, 
  faClock,
  faChartLine,
  faHeart
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const { getPlatformAnalytics, stats } = useAnalytics();

  useEffect(() => {
    getPlatformAnalytics('30d');
  }, [getPlatformAnalytics]);

  const platformStats = stats.platform || {};

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard 
            title="Total Psychologists"
            value={platformStats.totalPsychologists || '0'}
            icon={faUser}
            color="indigo"
          />
          <DashboardCard 
            title="Profile Views"
            value={platformStats.totalViews || '0'}
            change={platformStats.viewsChange || 0}
            changeType={platformStats.viewsChange >= 0 ? 'increase' : 'decrease'}
            icon={faEye}
            color="teal"
          />
          <DashboardCard 
            title="Booking Requests"
            value={platformStats.totalBookings || '0'}
            change={platformStats.bookingsChange || 0}
            changeType={platformStats.bookingsChange >= 0 ? 'increase' : 'decrease'}
            icon={faEnvelope}
            color="violet"
          />
          <DashboardCard 
            title="Conversion Rate"
            value={platformStats.conversionRate ? `${platformStats.conversionRate}%` : '0%'}
            change={platformStats.conversionRateChange || 0}
            changeType={platformStats.conversionRateChange >= 0 ? 'increase' : 'decrease'}
            icon={faChartLine}
            color="amber"
          />
        </div>
        
        <StatsOverview 
          stats={{
            views: platformStats.totalViews || 0,
            viewsChange: platformStats.viewsChange || 0,
            uniqueVisitors: platformStats.uniqueVisitors || 0,
            uniqueVisitorsChange: platformStats.uniqueVisitorsChange || 0,
            avgTimeOnPage: platformStats.avgTimeOnPage || 0,
            avgTimeOnPageChange: platformStats.avgTimeOnPageChange || 0,
            bookingRequests: platformStats.totalBookings || 0,
            bookingRequestsChange: platformStats.bookingsChange || 0,
            conversionRate: platformStats.conversionRate || 0,
            conversionRateChange: platformStats.conversionRateChange || 0,
            profileSaves: platformStats.profileSaves || 0,
            profileSavesChange: platformStats.profileSavesChange || 0,
          }}
          period="30d"
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;