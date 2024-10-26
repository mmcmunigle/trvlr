import { useState } from 'react';
import { Activity } from '@prisma/client';
import * as dbService from '../services/activityService';
import useDestinationStore from '../state-management/destination-store';
import { DestinationWithDetails } from '../types/DestinationWithDetails';

const useActivityManager = (destinationId: number) => {
  const { destinationDetails, updateDestination } = useDestinationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const destination: DestinationWithDetails = destinationDetails.find(
    (d) => d.id === destinationId
  )!;

  const handleAddActivity = async (activity: Partial<Activity>) => {
    setLoading(true);
    setError(null);

    // Ensure that activity is not empty and does not already exist in trip plans
    if (!activity.title || destination.activities.map((a) => a.title).includes(activity.title!))
      return;

    const rank = Math.max(...destination.activities.map((a) => a.rank));
    const detailedActivty: Partial<Activity> = { ...activity, rank: rank };

    try {
      const newActivity = await dbService.addActivity(detailedActivty);
      const updatedActivities = [...destination.activities, newActivity];
      updateDestination({ ...destination, activities: updatedActivities });
    } catch (err) {
      setError('Failed to add activity');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveActivity = async (activityId: number) => {
    setLoading(true);
    setError(null);

    try {
      await dbService.removeActivity(activityId);
      const updatedActivities = destination.activities.filter((a) => a.id !== activityId);
      updateDestination({ ...destination, activities: updatedActivities });
    } catch (err) {
      setError('Failed to remove activity');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateActivity = async (activityId: number, updatedData: Partial<Activity>) => {
    setLoading(true);
    setError(null);

    try {
      const updatedActivity = await dbService.updateActivity(activityId, updatedData);
      const updatedActivities = destination.activities.map((a) =>
        a.id === activityId ? updatedActivity : a
      );
      updateDestination({ ...destination, activities: updatedActivities });
    } catch (err) {
      setError('Failed to update activity');
    } finally {
      setLoading(false);
    }
  };

  return {
    activities: destination?.activities || [],
    handleAddActivity,
    handleRemoveActivity,
    handleUpdateActivity,
    loading,
    error,
  };
};

export default useActivityManager;
