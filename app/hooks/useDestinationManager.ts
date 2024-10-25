import { useState } from 'react';
import { Destination } from '@prisma/client';
import * as dbService from '../services/destinationService';
import useDestinationStore from '../state-management/destination-store';

const useDestinationManager = () => {
  const { destinations, addDestination, removeDestination, updateDestination } =
    useDestinationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddDestination = async (destination: Partial<Destination>) => {
    setLoading(true);
    setError(null);

    const detailedDestination: Partial<Destination> = {
      ...destination,
      stopNumber: destinations.length + 1,
      days: 2,
    };

    try {
      const newDestination = await dbService.addDestination(detailedDestination);
      addDestination(newDestination);
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
