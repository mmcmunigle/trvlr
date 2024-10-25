'use client';

import React, { Suspense, useEffect } from 'react';
import useCityOptionStore from '@/app/state-management/city-options-store';
import useDestinationStore from '@/app/state-management/destination-store';
import useStepperStore, { TripStep } from '@/app/state-management/stepper-store';
import useTripStore from '@/app/state-management/trip-store';
import { TripWithDestinations } from '@/app/types/TripWithDestinations';

interface Props {
  trip: TripWithDestinations | null;
  children: React.ReactNode;
}

const TripLoader = ({ trip, children }: Props) => {
  const setStep = useStepperStore((store) => store.setStep);
  const setTripDetails = useTripStore((store) => store.setTrip);
  const setDestinations = useDestinationStore((store) => store.setDestinations);
  const setCities = useCityOptionStore((store) => store.setCities);

  useEffect(() => {
    if (!trip) {
      setStep(TripStep.TRIP_DETAILS);
      setCities([]);
    } else {
      setTripDetails(trip);
      setDestinations(trip.destinations);
    }
  }, [trip]);

  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default TripLoader;
