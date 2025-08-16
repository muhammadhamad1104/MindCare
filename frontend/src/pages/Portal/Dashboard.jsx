import React, { useEffect } from 'react';
import PortalLayout from '../../components/layout/PortalLayout';
import StatsOverview from '../../components/ui/StatsOverview';
import BookingLog from '../../components/ui/BookingLog';
import DashboardCard from '../../components/ui/DashboardCard';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useAuth } from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCalendarCheck, faUser, faClock } from '@fortawesome/free-solid-svg-icons';

const PortalDashboard = () => {
  const { user } = useAuth();
  const { getPsychologistAnalytics, stats } = useAnalytics();

  useEffect(() => {
    if (user?.psychologistId) {
      getPsychologistAnalytics(user.psychologistId, '30d');
    }
  }, [user, getPsychologistAnalytics]);

  const psychologistStats = stats[user?.psychologistId] || {};

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Last 30 days</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard 
            title="Profile Views"
            value={psychologistStats.views || '0'}
            change={psychologistStats.viewsChange || 0}
            changeType={psychologistStats.viewsChange >= 0 ? 'increase' : 'decrease'}
            icon={faUser}
            color="indigo"
          />
          <DashboardCard 
            title="Unique Visitors"
            value={psychologistStats.uniqueVisitors || '0'}
            change={psychologistStats.uniqueVisitorsChange || 0}
            changeType={psychologistStats.uniqueVisitorsChange >= 0 ? 'increase' : 'decrease'}
            icon={faUser}
            color="teal"
          />
          <DashboardCard 
            title="Avg. Time on Page"
            value={psychologistStats.avgTimeOnPage ? `${psychologistStats.avgTimeOnPage}m` : '0m'}
            change={psychologistStats.avgTimeOnPageChange || 0}
            changeType={psychologistStats.avgTimeOnPageChange >= 0 ? 'increase' : 'decrease'}
            icon={faClock}
            color="amber"
          />
          <DashboardCard 
            title="Booking Requests"
            value={psychologistStats.bookingRequests || '0'}
            change={psychologistStats.bookingRequestsChange || 0}
            changeType={psychologistStats.bookingRequestsChange >= 0 ? 'increase' : 'decrease'}
            icon={faEnvelope}
            color="violet"
          />
        </div>
        
        <StatsOverview 
          stats={{
            views: psychologistStats.views || 0,
            viewsChange: psychologistStats.viewsChange || 0,
            uniqueVisitors: psychologistStats.uniqueVisitors || 0,
            uniqueVisitorsChange: psychologistStats.uniqueVisitorsChange || 0,
            avgTimeOnPage: psychologistStats.avgTimeOnPage || 0,
            avgTimeOnPageChange: psychologistStats.avgTimeOnPageChange || 0,
            bookingRequests: psychologistStats.bookingRequests || 0,
            bookingRequestsChange: psychologistStats.bookingRequestsChange || 0,
            conversionRate: psychologistStats.conversionRate || 0,
            conversionRateChange: psychologistStats.conversionRateChange || 0,
            profileSaves: psychologistStats.profileSaves || 0,
            profileSavesChange: psychologistStats.profileSavesChange || 0,
          }}
          period="30d"
        />
        
        <BookingLog 
          bookings={psychologistStats.recentBookings || []} 
          showPsychologist={false}
        />
      </div>
    </PortalLayout>
  );
};

export default PortalDashboard;