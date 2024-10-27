import { useState } from 'react';
import { Trip } from '@prisma/client';
import * as dbService from '../services/tripService';
import useTripStore from '../state-management/trip-store';

const useTripManager = () => {
  const { trip, setTrip } = useTripStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTrip = async (newTripData: Partial<Trip>) => {
    setLoading(true);
    setError(null);

    try {
      const newTrip = await dbService.createTrip(newTripData);
      setTrip(newTrip);
    } catch (err) {
      setError('Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  const updateTrip = async (tripId: number, updatedData: Partial<Trip>) => {
    setLoading(true);
    setError(null);

    try {
      const updatedTrip = await dbService.updateTrip(tripId, updatedData);
      setTrip(updatedTrip);
    } catch (err) {
      setError('Failed to update trip');
    } finally {
      setLoading(false);
    }
  };

  return {
    trip,
    createTrip,
    updateTrip,
    loading,
    error,
  };
};

export default useTripManager;
