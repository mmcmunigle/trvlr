import { useState } from 'react';
import { Destination } from '@prisma/client';
import { getActivityRecommendations } from '../services/activityRecService';
import * as dbService from '../services/destinationService';
import useDestinationStore from '../state-management/destination-store';

enum DESTINATION_COLORS {
  '#264653' = 1,
  '#2a9d8f',
  '#e76f51',
  '#e2ab3d',
}

const useDestinationManager = () => {
  const { destinations, addDestination, removeDestination, updateDestination } =
    useDestinationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddDestination = async (destination: Partial<Destination>) => {
    setLoading(true);
    setError(null);

    // Ensure that destination is not empty and does not already exist in trip plans
    if (!destination.name || destinations.map((d) => d.name).includes(destination.name!)) return;

    const stopNumber = destinations.length + 1;

    const detailedDestination: Partial<Destination> = {
      ...destination,
      stopNumber: stopNumber,
      days: 2,
      color: DESTINATION_COLORS[stopNumber % Object.keys(DESTINATION_COLORS).length],
    };

    try {
      const newDestination = await dbService.addDestination(detailedDestination);
      addDestination(newDestination);

      // Start the activity recommendations as soon as the destination is selected
      // - this will cache the results on the backend
      getActivityRecommendations(destination.name);
    } catch (err) {
      setError('Failed to add destination');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDestination = async (destinationId: number) => {
    setLoading(true);
    setError(null);

    try {
      await dbService.removeDestination(destinationId);
      removeDestination(destinationId);
    } catch (err) {
      setError('Failed to remove destination');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDestination = async (
    destinationId: number,
    updatedData: Partial<Destination>
  ) => {
    setLoading(true);
    setError(null);

    try {
      const updatedDestination = await dbService.updateDestination(destinationId, updatedData);
      updateDestination(updatedDestination);
    } catch (err) {
      setError('Failed to update destination');
    } finally {
      setLoading(false);
    }
  };

  return {
    destinations,
    handleAddDestination,
    handleRemoveDestination,
    handleUpdateDestination,
    loading,
    error,
  };
};

export default useDestinationManager;
