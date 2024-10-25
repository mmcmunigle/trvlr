'use client';

import React, { Suspense, useEffect, useState } from 'react';
import useCityOptionStore from '@/app/state-management/city-options-store';
import useDestinationStore from '@/app/state-management/destination-store';
import useStepperStore, { TripStep } from '@/app/state-management/stepper-store';
import useTripStore from '@/app/state-management/trip-store';
import { TripWithDestinations } from '@/app/types/TripWithDestinations';

interface Props {
  trip: TripWithDestinations;
  children: React.ReactNode;
}

const TripLoader = ({ trip, children }: Props) => {
  const setStep = useStepperStore((store) => store.setStep);
  const setTripDetails = useTripStore((store) => store.setTrip);
  const setDestinations = useDestinationStore((store) => store.setDestinations);
  const setCities = useCityOptionStore((store) => store.setCities);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // This is a new trip
    if (!trip.country) {
      setStep(TripStep.TRIP_DETAILS);
      setCities([]);
      window.history.replaceState(null, 'New Trip', `/planner/${trip.id}`);
    }
    setTripDetails(trip);
    setDestinations(trip.destinations);
    setLoading(false);
  }, [trip]);

  if (loading) return <div>Loading...</div>;

  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default TripLoader;
