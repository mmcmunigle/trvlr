import { useState } from 'react';
import { Activity } from '@prisma/client';
import * as dbService from '../services/activityService';
import useDestinationStore from '../state-management/destination-store';
import { DestinationWithDetails } from '../types/DestinationWithDetails';

// TODO: Do we need this?

const usePlacesManager = () => {
  // const { destinationDetails, updateDestination } = usePlaceStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddPlace = async (name: string) => {
    setLoading(true);
    setError(null);

    try {
      // const newActivity = await dbService.addActivity(detailedActivty);
      // const updatedActivities = [...destination.activities, newActivity];
      // updateDestination({ ...destination, activities: updatedActivities });
    } catch (err) {
      setError('Failed to add activity');
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePlace = async (activityId: number) => {
    setLoading(true);
    setError(null);

    try {
      // await dbService.removeActivity(activityId);
      // const updatedActivities = destination.activities.filter((a) => a.id !== activityId);
      // updateDestination({ ...destination, activities: updatedActivities });
    } catch (err) {
      setError('Failed to remove activity');
    } finally {
      setLoading(false);
    }
  };

  return {
    // places: destination?.activities || [],
    handleAddActivity: handleAddPlace,
    handleRemoveActivity: handleRemovePlace,
    // handleUpdateActivity,
    loading,
    error,
  };
};

export default usePlacesManager;
