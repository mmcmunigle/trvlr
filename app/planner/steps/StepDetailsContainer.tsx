import React, { useEffect } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import useTripStore from '@/app/state-management/trip-store';
import useStepperStore, { TripStep } from '../../state-management/stepper-store';
import ActivityStep from './Activities/ActivityStep';
import DestinationsStep from './Destinations/DestinationsStep';
import PreferencesStep from './Preferences/PreferencesStep';
import TripDetailsStep from './TripDetails/TripDetailsStep';

const StepDetailsContainer = () => {
  const step = useStepperStore((store) => store.step);

  switch (step) {
    case TripStep.TRIP_DETAILS:
      return <TripDetailsStep />;
    case TripStep.PREFERENCES:
      return <PreferencesStep />;
    case TripStep.DESTINATIONS:
      return <DestinationsStep />;
    case TripStep.ACTIVITIES:
      return <ActivityStep />;
    case TripStep.TRANSPORTATION:
      return <>Trip Details</>;
    case TripStep.FINAL_REIVEW:
      return <>Trip Details</>;
    default:
      return null;
  }
};

export default StepDetailsContainer;
