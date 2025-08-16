import React, { useEffect } from 'react';
import PortalLayout from '../../components/layout/PortalLayout';
import ProfileEditor from '../../components/ui/ProfileEditor';
import { useAuth } from '../../hooks/useAuth';
import { usePsychologists } from '../../hooks/usePsychologists';
import Loading from '../../components/common/Loading';

const PortalProfile = () => {
  const { user } = useAuth();
  const { 
    currentPsychologist, 
    getPsychologistById,
    updatePsychologist 
  } = usePsychologists();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.psychologistId) {
      getPsychologistById(user.psychologistId)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, getPsychologistById]);

  const handleSubmit = async (updatedProfile) => {
    try {
      await updatePsychologist(user.psychologistId, updatedProfile);
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      return false;
    }
  };

  if (loading) {
    return (
      <PortalLayout>
        <div className="flex justify-center py-12">
          <Loading size="lg" />
        </div>
      </PortalLayout>
    );
  }

  if (!currentPsychologist) {
    return (
      <PortalLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          Psychologist profile not found
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <ProfileEditor 
        profile={currentPsychologist} 
        onSubmit={handleSubmit}
      />
    </PortalLayout>
  );
};

export default PortalProfile;